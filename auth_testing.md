# Auth Testing Playbook — Estefany Gusmão Crochê (Painel da artesã)

## Stack
- FastAPI + MongoDB (motor), JWT httpOnly cookies (access 15 min + refresh 7 dias)
- bcrypt para hash de senha; seed do admin no startup (reconcilia com .env)
- Brute force: coleção `login_attempts`, 5 tentativas = bloqueio de 15 min

## Credenciais (também em /app/memory/test_credentials.md)
- Admin: estefany@croche.com / 547522 (de ADMIN_EMAIL / ADMIN_PASSWORD no backend/.env)

## Passo 1 — MongoDB
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verificar: hash bcrypt começa com `$2b$`; índice único em users.email; índice em login_attempts.identifier.

## Passo 2 — API
```
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl -s -c /tmp/ck.txt -X POST "$API_URL/api/auth/login" -H "Content-Type: application/json" -d '{"email":"estefany@croche.com","password":"547522"}'
curl -s -b /tmp/ck.txt "$API_URL/api/auth/me"
curl -s "$API_URL/api/catalog"
curl -s -b /tmp/ck.txt -X PUT "$API_URL/api/admin/catalog" -H "Content-Type: application/json" -d '{"polvinho":{"price":"R$ 45,00","photos":["/photos/polvinhos-reais.webp"]},"gallery":[]}'
curl -s -b /tmp/ck.txt -X POST "$API_URL/api/admin/upload" -F "file=@/app/frontend/public/photos/toalha-amarela.jpg"
```
Verificar: login retorna o usuário e grava cookies; /me retorna o admin; /catalog devolve o doc público; PUT exige cookie válido (401 sem cookie); upload retorna {path, url} e a URL responde 200 em GET.

## Passo 3 — Refresh / Logout
```
curl -s -b /tmp/ck.txt -c /tmp/ck.txt -X POST "$API_URL/api/auth/refresh"
curl -s -b /tmp/ck.txt -X POST "$API_URL/api/auth/logout"
```

## Painel (e2e)
- URL: {preview}/admin — login → painel → editar valor → salvar → verificar /api/catalog e a landing mostrando o valor novo.
