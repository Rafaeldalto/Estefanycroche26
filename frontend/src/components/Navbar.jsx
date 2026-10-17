import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { EASE } from "./motion";
import { getContactUrl, DEFAULT_MESSAGE } from "../config";

const LINKS = [
    { label: "Início", href: "#inicio" },
    { label: "Polvinhos", href: "#polvinhos" },
    { label: "Nosso cuidado", href: "#cuidado" },
    { label: "Sobre a artesã", href: "#sobre" },
    { label: "Perguntas frequentes", href: "#faq" },
    { label: "Contato", href: "#contato" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <header
                data-testid="main-header"
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "border-b border-dune bg-cream/85 shadow-warm backdrop-blur-xl"
                        : "border-b border-transparent bg-transparent"
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
                    <Logo />
                    <nav
                        data-testid="desktop-nav-menu"
                        className="hidden items-center gap-7 lg:flex"
                        aria-label="Navegação principal"
                    >
                        {LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="relative text-sm font-medium text-brown/80 transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-rose after:transition-all after:duration-300 hover:text-rose hover:after:w-full"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <a
                            data-testid="nav-cta-order-button"
                            href={getContactUrl(DEFAULT_MESSAGE)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden rounded-full bg-rose px-6 py-2.5 text-sm font-semibold text-cream shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-cocoa sm:inline-flex"
                        >
                            Quero encomendar
                        </a>
                        <button
                            data-testid="mobile-menu-toggle"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-label={open ? "Fechar menu" : "Abrir menu"}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-dune bg-cream/80 text-cocoa transition-colors duration-300 hover:border-rose hover:text-rose lg:hidden"
                        >
                            {open ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="fixed inset-0 z-40 flex flex-col bg-cream pt-28 lg:hidden"
                    >
                        <nav
                            className="flex flex-1 flex-col gap-2 px-8"
                            aria-label="Menu móvel"
                        >
                            {LINKS.map((l, i) => (
                                <motion.a
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    initial={{ opacity: 0, x: -18 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.08 + i * 0.06,
                                        duration: 0.5,
                                        ease: EASE,
                                    }}
                                    className="border-b border-dune/70 py-4 font-serif text-3xl text-cocoa transition-colors duration-300 hover:text-rose"
                                >
                                    {l.label}
                                </motion.a>
                            ))}
                        </nav>
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
                            className="px-8 pb-10"
                        >
                            <a
                                data-testid="mobile-cta-order-button"
                                href={getContactUrl(DEFAULT_MESSAGE)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                                className="flex w-full items-center justify-center rounded-full bg-rose px-6 py-4 text-sm font-semibold text-cream shadow-warm"
                            >
                                Quero encomendar
                            </a>
                            <p className="mt-5 text-center font-serif text-sm italic text-taupe">
                                Pequenos detalhes, muito amor em cada ponto.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
