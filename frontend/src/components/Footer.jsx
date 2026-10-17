import { Facebook } from "lucide-react";
import Logo from "./Logo";
import { BRAND } from "../config";

const NAV = [
    { label: "Início", href: "#inicio" },
    { label: "Polvinhos", href: "#polvinhos" },
    { label: "Nosso cuidado", href: "#cuidado" },
    { label: "Sobre a artesã", href: "#sobre" },
    { label: "Perguntas frequentes", href: "#faq" },
];

export default function Footer() {
    return (
        <footer
            data-testid="main-footer"
            className="relative bg-cocoa pt-16 text-cream/75"
        >
            <div className="mx-auto max-w-7xl px-5 lg:px-10">
                <div className="grid gap-12 pb-14 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <Logo light />
                        <p className="mt-5 max-w-sm font-serif text-xl italic leading-snug text-cream/90">
                            Artesanato feito à mão com carinho.
                        </p>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
                            {BRAND.sloganAlt}
                        </p>
                    </div>

                    <div className="lg:col-span-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-soft">
                            Navegação
                        </p>
                        <ul className="mt-5 space-y-2.5">
                            {NAV.map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        className="text-sm transition-colors duration-300 hover:text-rose-soft"
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-soft">
                            Atendimento
                        </p>
                        <ul className="mt-5 space-y-2.5 text-sm">
                            <li>
                                <a
                                    data-testid="footer-facebook-link"
                                    href={BRAND.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-rose-soft"
                                >
                                    <Facebook className="h-4 w-4" />
                                    Página do Facebook
                                </a>
                            </li>
                            <li className="text-cream/60">
                                Encomendas e dúvidas pelo nosso canal de
                                atendimento.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-cream/10 py-7">
                    <p className="max-w-2xl text-xs leading-relaxed text-cream/55">
                        Cada peça é artesanal e pode apresentar pequenas
                        variações de tonalidade e formato — é o que torna cada
                        polvinho único.
                    </p>
                    <p className="mt-3 text-xs text-cream/45">
                        © {new Date().getFullYear()} Estefany Gusmão Crochê.
                        Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
