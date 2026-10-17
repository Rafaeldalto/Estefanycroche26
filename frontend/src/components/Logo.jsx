export const LogoMark = ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <g fill="none" stroke="#C5837B" strokeWidth="4.5" strokeLinecap="round">
            <path d="M17 37c-3 6-9 6-9 13" />
            <path d="M26 42c-1 6-6 8-4 15" />
            <path d="M38 42c1 6 6 8 4 15" />
            <path d="M47 37c3 6 9 6 9 13" />
        </g>
        <circle cx="32" cy="23" r="15" fill="#C5837B" />
        <path
            d="M20 19c4-5 11-6 15-3"
            stroke="#FCFBF7"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity=".55"
        />
        <circle cx="27" cy="24" r="1.8" fill="#2B211B" />
        <circle cx="37" cy="24" r="1.8" fill="#2B211B" />
        <path
            d="M29.5 29.5c1.6 1.4 3.4 1.4 5 0"
            stroke="#2B211B"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
        />
    </svg>
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
