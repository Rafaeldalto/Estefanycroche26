from dotenv import load_dotenv

load_dotenv()

import os
import uuid
import logging
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import List

import bcrypt
import jwt
import requests
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, UploadFile, File
from pydantic import BaseModel, ConfigDict
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
APP_NAME = "estefany-croche"

STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ["EMERGENT_LLM_KEY"]

DEFAULT_CATALOG = {
    "polvinho": {
        "price": "Sob consulta",
        "photos": ["/photos/polvinhos-reais.webp"],
    },
    "gallery": [
        {
            "src": "/photos/aparecida-manto.jpg",
            "alt": "Santinha em amigurumi de crochê com manto azul e coroa dourada — fotografia real do ateliê Estefany Gusmão",
        },
        {
            "src": "/photos/aparecida-azul.webp",
            "alt": "Santinha em amigurumi de crochê com vestido azul, cabelo preto e coroa — fotografia real do ateliê",
        },
        {
            "src": "/photos/sao-francisco.jpg",
            "alt": "Santinho em amigurumi de crochê em tons de marrom com cordeirinho — fotografia real do ateliê",
        },
        {
            "src": "/photos/toalha-amarela.jpg",
            "alt": "Toalha de mesa redonda em crochê amarelo com pratos — fotografia real do ateliê",
        },
    ],
}

storage_key = None


def init_storage(force: bool = False):
    global storage_key
    if storage_key and not force:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, user_id: str, email: str):
    response.set_cookie(
        key="access_token",
        value=create_access_token(user_id, email),
        httponly=True,
        secure=True,
        samesite="none",
        max_age=900,
        path="/",
    )
    response.set_cookie(
        key="refresh_token",
        value=create_refresh_token(user_id),
        httponly=True,
        secure=True,
        samesite="none",
        max_age=604800,
        path="/",
    )


def clear_auth_cookies(response: Response):
    response.delete_cookie(key="access_token", path="/", secure=True, httponly=True, samesite="none")
    response.delete_cookie(key="refresh_token", path="/", secure=True, httponly=True, samesite="none")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Não autenticado.")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Sessão inválida.")
        user = await db.users.find_one({"_id": __import__("bson").ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="Usuário não encontrado.")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return {"id": user["_id"], "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Sessão expirada.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Sessão inválida.")


async def register_failed_attempt(email: str, request: Request):
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    now = datetime.now(timezone.utc)
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    count = (attempt or {}).get("count", 0) + 1
    await db.login_attempts.update_one(
        {"identifier": identifier},
        {"$set": {"count": count, "locked_until": now + timedelta(minutes=15)}},
        upsert=True,
    )


async def check_lockout(email: str, request: Request):
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("count", 0) >= 5 and datetime.now(timezone.utc) < attempt.get("locked_until", datetime.now(timezone.utc) - timedelta(seconds=1)):
        raise HTTPException(status_code=429, detail="Muitas tentativas. Tente novamente em 15 minutos.")


class LoginRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    email: str
    password: str


class GalleryItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    src: str
    alt: str = ""


class PolvinhoData(BaseModel):
    model_config = ConfigDict(extra="ignore")
    price: str = "Sob consulta"
    photos: List[str] = []


class CatalogData(BaseModel):
    model_config = ConfigDict(extra="ignore")
    polvinho: PolvinhoData
    gallery: List[GalleryItem] = []


app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000"), "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.get("/catalog")
async def get_catalog():
    doc = await db.catalog.find_one({}, {"_id": 0, "updated_at": 0})
    return doc or DEFAULT_CATALOG


@api_router.put("/admin/catalog")
async def update_catalog(data: CatalogData, request: Request):
    await get_current_user(request)
    doc = {
        "polvinho": data.polvinho.model_dump(),
        "gallery": [g.model_dump() for g in data.gallery],
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.catalog.update_one({}, {"$set": doc}, upsert=True)
    return {"ok": True}


@api_router.post("/admin/upload")
async def upload_catalog_photo(request: Request, file: UploadFile = File(...)):
    await get_current_user(request)
    content_type = file.content_type or "application/octet-stream"
    if not content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Envie um arquivo de imagem (JPG, PNG ou WebP).")
    data = await file.read()
    if len(data) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Imagem muito grande (máximo 5 MB).")
    ext = (file.filename.split(".")[-1].lower() if "." in file.filename else "jpg")
    if ext not in {"jpg", "jpeg", "png", "webp"}:
        ext = "jpg"
    path = f"{APP_NAME}/uploads/catalog/{uuid.uuid4()}.{ext}"
    try:
        result = put_object = None
        key = init_storage()
        resp = requests.put(
            f"{STORAGE_URL}/objects/{path}",
            headers={"X-Storage-Key": key, "Content-Type": content_type},
            data=data,
            timeout=120,
        )
        resp.raise_for_status()
        result = resp.json()
    except requests.HTTPError as e:
        if e.response is not None and e.response.status_code in (403, 404):
            try:
                init_storage(force=True)
                resp = requests.put(
                    f"{STORAGE_URL}/objects/{path}",
                    headers={"X-Storage-Key": storage_key, "Content-Type": content_type},
                    data=data,
                    timeout=120,
                )
                resp.raise_for_status()
                result = resp.json()
            except Exception:
                raise HTTPException(status_code=500, detail="Falha ao salvar a imagem. Tente novamente.")
        else:
            raise HTTPException(status_code=500, detail="Falha ao salvar a imagem. Tente novamente.")
    await db.files.insert_one(
        {
            "id": str(uuid.uuid4()),
            "storage_path": result["path"],
            "original_filename": file.filename,
            "content_type": content_type,
            "size": result.get("size"),
            "is_deleted": False,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
    )
    return {"path": result["path"], "url": f"/api/files/{result['path']}"}


@api_router.get("/files/{path:path}")
async def download_file(path: str):
    record = await db.files.find_one({"storage_path": path, "is_deleted": False})
    if not record:
        raise HTTPException(status_code=404, detail="Arquivo não encontrado.")
    key = init_storage()
    resp = requests.get(f"{STORAGE_URL}/objects/{path}", headers={"X-Storage-Key": key}, timeout=60)
    if resp.status_code == 404:
        raise HTTPException(status_code=404, detail="Arquivo não encontrado.")
    resp.raise_for_status()
    return Response(
        content=resp.content,
        media_type=record.get("content_type") or resp.headers.get("Content-Type", "application/octet-stream"),
        headers={"Cache-Control": "public, max-age=31536000, immutable"},
    )


@api_router.post("/auth/login")
async def login(body: LoginRequest, request: Request, response: Response):
    email = body.email.strip().lower()
    await check_lockout(email, request)
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user.get("password_hash", "")):
        await register_failed_attempt(email, request)
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")
    ip = request.client.host if request.client else "unknown"
    await db.login_attempts.delete_many({"identifier": f"{ip}:{email}"})
    user_id = str(user["_id"])
    set_auth_cookies(response, user_id, user["email"])
    return {"id": user_id, "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


@api_router.get("/auth/me")
async def me(request: Request):
    return await get_current_user(request)


@api_router.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Não autenticado.")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Sessão inválida.")
        user = await db.users.find_one({"_id": __import__("bson").ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="Usuário não encontrado.")
        user_id = str(user["_id"])
        set_auth_cookies(response, user_id, user["email"])
        return {"id": user_id, "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Sessão expirada.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Sessão inválida.")


@api_router.post("/auth/logout")
async def logout(response: Response):
    clear_auth_cookies(response)
    return {"ok": True}


async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one(
            {
                "email": admin_email,
                "password_hash": hash_password(admin_password),
                "name": "Estefany Gusmão",
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        )
        logger.info("Admin seeded: %s", admin_email)
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
        logger.info("Admin password updated from env.")


async def seed_catalog():
    if await db.catalog.count_documents({}) == 0:
        await db.catalog.insert_one({**DEFAULT_CATALOG, "updated_at": datetime.now(timezone.utc).isoformat()})
        logger.info("Catalog seeded with defaults.")


@app.on_event("startup")
async def startup():
    await seed_admin()
    await seed_catalog()
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    try:
        init_storage()
        logger.info("Storage initialized")
    except Exception as e:
        logger.error("Storage init failed: %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


app.include_router(api_router)
