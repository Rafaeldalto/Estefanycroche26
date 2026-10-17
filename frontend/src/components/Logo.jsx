export const LogoMark = ({ className = "h-10 w-10" }) => (
    <img
        src="/photos/logo-mark.png"
        alt="Logotipo da Estefany Gusmão Crochê — novelo de lã com agulha de crochê"
        className={`${className} rounded-full object-cover`}
        loading="eager"
        decoding="async"
    />
);

export default function Logo({ light = false }) {
    return (
        <a
            href="#inicio"
            data-testid="brand-logo"
            className="group inline-flex items-center gap-3"
            aria-label="Estefany Gusmão Crochê — voltar ao início"
        >
            <LogoMark className="h-10 w-10 transition-transform duration-500 group-hover:-rotate-6" />
            <span className="leading-tight">
                <span
                    className={`block font-serif text-xl font-semibold tracking-tight ${
                        light ? "text-cream" : "text-cocoa"
                    }`}
                >
                    Estefany Gusmão
                </span>
                <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.42em] text-rose">
                    Crochê
                </span>
            </span>
        </a>
    );
}
