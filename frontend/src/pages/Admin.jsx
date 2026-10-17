import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import {
    Eye,
    EyeOff,
    ImagePlus,
    Loader2,
    LogOut,
    Save,
    Trash2,
    ExternalLink,
} from "lucide-react";
import { LogoMark } from "../components/Logo";
import { BACKEND_URL, DEFAULT_CATALOG, catalogImgUrl } from "../catalog-context";

const AUTH = `${BACKEND_URL}/api/auth`;
const ADMIN_API = `${BACKEND_URL}/api/admin`;

function formatApiErrorDetail(detail) {
    if (detail == null) return "Algo deu errado. Tente novamente.";
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail))
        return detail
            .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
            .filter(Boolean)
            .join(" ");
    if (detail && typeof detail.msg === "string") return detail.msg;
    return String(detail);
}

function LoginView({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const r = await fetch(`${AUTH}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            const d = await r.json().catch(() => null);
            if (!r.ok) throw new Error(formatApiErrorDetail(d?.detail));
            toast.success("Bem-vinda de volta, Estefany!");
            onLogin(d);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-canvas px-5 py-16">
            <div
                data-testid="admin-login-card"
                className="w-full max-w-md rounded-3xl border border-dune bg-cream p-8 shadow-warm sm:p-10"
            >
                <div className="flex flex-col items-center text-center">
                    <LogoMark className="h-14 w-14" />
                    <h1 className="mt-4 font-serif text-3xl font-semibold text-cocoa">
                        Painel da artesã
                    </h1>
                    <p className="mt-2 text-sm text-taupe">
                        Atualize fotos e valores do site sem mexer em nada
                        atrás.
                    </p>
                </div>

                <form
                    data-testid="admin-login-form"
                    onSubmit={submit}
                    className="mt-8 space-y-4"
                >
                    <div>
                        <label
                            htmlFor="admin-email"
                            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-taupe"
                        >
                            E-mail
                        </label>
                        <input
                            id="admin-email"
                            data-testid="admin-email-input"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full rounded-2xl border border-dune bg-white px-4 py-3 text-sm text-cocoa outline-none transition-colors focus:border-rose"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="admin-password"
                            className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-taupe"
                        >
                            Senha
                        </label>
                        <div className="relative">
                            <input
                                id="admin-password"
                                data-testid="admin-password-input"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Sua senha"
                                className="w-full rounded-2xl border border-dune bg-white px-4 py-3 pr-12 text-sm text-cocoa outline-none transition-colors focus:border-rose"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe transition-colors hover:text-rose"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        data-testid="admin-login-submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-3.5 text-sm font-semibold text-cream shadow-warm transition-all duration-300 hover:bg-cocoa disabled:opacity-60"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : null}
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

function Thumb({ src, alt, onRemove, testId }) {
    return (
        <div className="group relative h-28 w-28 overflow-hidden rounded-2xl border border-dune shadow-warm">
            <img
                src={src}
                alt={alt || "Foto do catálogo"}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
            />
            <button
                type="button"
                data-testid={testId}
                onClick={onRemove}
                aria-label="Remover foto"
                className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cocoa/80 text-cream opacity-0 transition-all duration-300 hover:bg-rose group-hover:opacity-100"
            >
                <Trash2 className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}

function PanelView({ user, onLogout }) {
    const [price, setPrice] = useState(DEFAULT_CATALOG.polvinho.price);
    const [photos, setPhotos] = useState(DEFAULT_CATALOG.polvinho.photos);
    const [gallery, setGallery] = useState(DEFAULT_CATALOG.gallery);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const r = await fetch(`${BACKEND_URL}/api/catalog`);
                const d = await r.json();
                if (d?.polvinho) {
                    setPrice(d.polvinho.price || "Sob consulta");
                    setPhotos(d.polvinho.photos?.length ? d.polvinho.photos : DEFAULT_CATALOG.polvinho.photos);
                    setGallery(
                        Array.isArray(d.gallery) && d.gallery.length
                            ? d.gallery.map((g) => ({ src: g.src, alt: g.alt || "" }))
                            : []
                    );
                }
            } catch {
                toast.error("Não consegui carregar o catálogo atual.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const uploadPhoto = async (file) => {
        const fd = new FormData();
        fd.append("file", file);
        const r = await fetch(`${ADMIN_API}/upload`, {
            method: "POST",
            credentials: "include",
            body: fd,
        });
        const d = await r.json().catch(() => null);
        if (!r.ok) throw new Error(formatApiErrorDetail(d?.detail));
        return d;
    };

    const onPolvinhoPhotos = async (e) => {
        const files = Array.from(e.target.files || []);
        e.target.value = "";
        if (!files.length) return;
        setUploading("polvinho");
        try {
            const added = [];
            for (const f of files) added.push((await uploadPhoto(f)).url);
            setPhotos((prev) => [...prev, ...added]);
            toast.success("Foto adicionada. Salve para publicar no site.");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setUploading("");
        }
    };

    const onGalleryPhoto = async (e) => {
        const files = Array.from(e.target.files || []);
        e.target.value = "";
        if (!files.length) return;
        setUploading("gallery");
        try {
            const added = [];
            for (const f of files) {
                const up = await uploadPhoto(f);
                added.push({ src: up.url, alt: "" });
            }
            setGallery((prev) => [...prev, ...added]);
            toast.success("Foto adicionada à galeria. Escreva a descrição e salve.");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setUploading("");
        }
    };

    const save = async () => {
        setSaving(true);
        try {
            const r = await fetch(`${ADMIN_API}/catalog`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    polvinho: { price: price.trim() || "Sob consulta", photos },
                    gallery,
                }),
            });
            const d = await r.json().catch(() => null);
            if (!r.ok) throw new Error(formatApiErrorDetail(d?.detail));
            toast.success("Catálogo atualizado! O site já mostra as novidades.");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-canvas">
                <Loader2 className="h-8 w-8 animate-spin text-rose" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-canvas pb-20">
            <header className="border-b border-dune bg-cream">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
                    <div className="flex items-center gap-3">
                        <LogoMark className="h-10 w-10" />
                        <div className="leading-tight">
                            <p className="font-serif text-lg font-semibold text-cocoa">
                                Painel da artesã
                            </p>
                            <p className="text-[11px] text-taupe">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="admin-view-site-link"
                            className="inline-flex items-center gap-1.5 rounded-full border border-dune px-4 py-2 text-xs font-semibold text-cocoa transition-colors hover:border-rose hover:text-rose"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Ver site
                        </a>
                        <button
                            type="button"
                            data-testid="admin-logout-button"
                            onClick={onLogout}
                            className="inline-flex items-center gap-1.5 rounded-full border border-dune px-4 py-2 text-xs font-semibold text-taupe transition-colors hover:border-rose hover:text-rose"
                        >
                            <LogOut className="h-3.5 w-3.5" />
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-4xl space-y-6 px-5 py-10 sm:px-8">
                <section
                    data-testid="admin-price-card"
                    className="rounded-3xl border border-dune bg-cream p-6 sm:p-8"
                >
                    <h2 className="font-serif text-2xl font-semibold text-cocoa">
                        Valor do polvinho
                    </h2>
                    <p className="mt-1 text-xs text-taupe">
                        Este valor aparece na vitrine do site. Ex.: “R$ 45,00”
                        ou “Sob consulta”.
                    </p>
                    <input
                        data-testid="admin-price-input"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="R$ 45,00 ou Sob consulta"
                        className="mt-4 w-full rounded-2xl border border-dune bg-white px-4 py-3 text-sm text-cocoa outline-none transition-colors focus:border-rose sm:max-w-md"
                    />
                </section>

                <section
                    data-testid="admin-polvinho-photos-card"
                    className="rounded-3xl border border-dune bg-cream p-6 sm:p-8"
                >
                    <h2 className="font-serif text-2xl font-semibold text-cocoa">
                        Fotos do polvinho
                    </h2>
                    <p className="mt-1 text-xs text-taupe">
                        A primeira foto aparece no topo do site, na vitrine e
                        na chamada final. Passe o mouse e toque na lixeira para
                        remover.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                        {photos.map((p, i) => (
                            <Thumb
                                key={`${p}-${i}`}
                                src={catalogImgUrl(p)}
                                alt={`Foto ${i + 1} do polvinho`}
                                testId={`admin-polvinho-photo-remove-${i}`}
                                onRemove={() =>
                                    setPhotos((prev) =>
                                        prev.filter((_, j) => j !== i)
                                    )
                                }
                            />
                        ))}
                        <label
                            data-testid="admin-polvinho-photo-add"
                            className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-dune text-taupe transition-colors hover:border-rose hover:text-rose"
                        >
                            {uploading === "polvinho" ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <ImagePlus className="h-5 w-5" />
                            )}
                            <span className="px-2 text-center text-[11px] leading-tight">
                                Adicionar fotos
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={onPolvinhoPhotos}
                                className="hidden"
                            />
                        </label>
                    </div>
                </section>

                <section
                    data-testid="admin-gallery-card"
                    className="rounded-3xl border border-dune bg-cream p-6 sm:p-8"
                >
                    <h2 className="font-serif text-2xl font-semibold text-cocoa">
                        Galeria do ateliê
                    </h2>
                    <p className="mt-1 text-xs text-taupe">
                        Santinhos, toalhas e outras peças. Escreva uma
                        descrição para cada foto nova antes de salvar.
                    </p>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        {gallery.map((g, i) => (
                            <div
                                key={`${g.src}-${i}`}
                                data-testid={`admin-gallery-item-${i}`}
                                className="flex gap-4 rounded-2xl border border-dune bg-white p-3"
                            >
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                                    <img
                                        src={catalogImgUrl(g.src)}
                                        alt={g.alt || "Foto da galeria"}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col gap-2">
                                    <input
                                        data-testid={`admin-gallery-alt-input-${i}`}
                                        type="text"
                                        value={g.alt}
                                        onChange={(e) =>
                                            setGallery((prev) =>
                                                prev.map((item, j) =>
                                                    j === i
                                                        ? { ...item, alt: e.target.value }
                                                        : item
                                                )
                                            )
                                        }
                                        placeholder="Descrição da foto"
                                        className="w-full rounded-xl border border-dune bg-canvas px-3 py-2 text-xs text-cocoa outline-none transition-colors focus:border-rose"
                                    />
                                    <button
                                        type="button"
                                        data-testid={`admin-gallery-remove-${i}`}
                                        onClick={() =>
                                            setGallery((prev) =>
                                                prev.filter((_, j) => j !== i)
                                            )
                                        }
                                        className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-taupe transition-colors hover:text-rose"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}

                        <label
                            data-testid="admin-gallery-add"
                            className="flex min-h-[7rem] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-dune text-taupe transition-colors hover:border-rose hover:text-rose"
                        >
                            {uploading === "gallery" ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <ImagePlus className="h-5 w-5" />
                            )}
                            <span className="px-2 text-center text-[11px] leading-tight">
                                Adicionar foto à galeria
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={onGalleryPhoto}
                                className="hidden"
                            />
                        </label>
                    </div>
                </section>

                <div className="sticky bottom-5 flex justify-end">
                    <button
                        type="button"
                        data-testid="admin-save-button"
                        onClick={save}
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-full bg-cocoa px-8 py-4 text-sm font-semibold text-cream shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose disabled:opacity-60"
                    >
                        {saving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Salvar alterações
                    </button>
                </div>
            </main>
        </div>
    );
}

export default function Admin() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let r = await fetch(`${AUTH}/me`, { credentials: "include" });
                if (r.status === 401) {
                    const rf = await fetch(`${AUTH}/refresh`, {
                        method: "POST",
                        credentials: "include",
                    });
                    if (rf.ok)
                        r = await fetch(`${AUTH}/me`, { credentials: "include" });
                }
                setUser(r.ok ? await r.json() : false);
            } catch {
                setUser(false);
            }
        })();
    }, []);

    const logout = async () => {
        try {
            await fetch(`${AUTH}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch {}
        setUser(false);
    };

    return (
        <>
            <Toaster position="top-center" richColors />
            {user === null ? (
                <div className="flex min-h-screen items-center justify-center bg-canvas">
                    <Loader2 className="h-8 w-8 animate-spin text-rose" />
                </div>
            ) : user ? (
                <PanelView user={user} onLogout={logout} />
            ) : (
                <LoginView onLogin={setUser} />
            )}
        </>
    );
}
