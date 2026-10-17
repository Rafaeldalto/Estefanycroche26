import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeartHandshake, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Eyebrow, EASE } from "./motion";
import { getContactUrl, DEFAULT_MESSAGE } from "../config";

const HERO_IMG = "/photos/polvinhos-reais.webp";

const TITLE_LINES = ["Pequenos tentáculos,", "grandes abraços."];

const DIFFERENTIALS = [
    {
        icon: HeartHandshake,
        title: "Feito à mão",
        desc: "Cada ponto tecido individualmente, com dedicação.",
    },
    {
        icon: Sparkles,
        title: "Materiais selecionados",
        desc: "Fios e materiais escolhidos com critério.",
    },
    {
        icon: ShieldCheck,
        title: "Cuidado em cada detalhe",
        desc: "Acabamento atento, do início ao fim.",
    },
];

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const cardY = useTransform(scrollYProgress, [0, 1], [0, -70]);

    return (
        <section
            id="inicio"
            ref={ref}
            data-testid="hero-section"
            className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-44"
        >
            <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-sage-light/70 blur-3xl" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-rose-soft/20 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-12 lg:gap-12 lg:px-10">
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        <Eyebrow>Ateliê de crochê artesanal</Eyebrow>
                    </motion.div>

                    <h1
                        data-testid="hero-headline"
                        className="mt-6 text-balance font-serif text-5xl leading-[1.05] tracking-tight text-cocoa sm:text-6xl lg:text-[5rem]"
                    >
                        {TITLE_LINES.map((line, i) => (
                            <span key={i} className="block overflow-hidden pb-1">
                                <motion.span
                                    className={`block ${
                                        i === 1
                                            ? "italic text-rose"
                                            : "text-cocoa"
                                    }`}
                                    initial={{ y: "112%" }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 1.1,
                                        delay: 0.18 + i * 0.14,
                                        ease: EASE,
                                    }}
                                >
                                    {line}
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
                        className="mt-7 max-w-xl text-base leading-relaxed text-taupe sm:text-lg"
                    >
                        Polvinhos de crochê feitos à mão com carinho, delicadeza
                        e atenção a cada detalhe, para tornar os primeiros
                        momentos dos bebês ainda mais acolhedores.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
                        className="mt-4 max-w-xl text-sm leading-relaxed text-taupe/85 sm:text-base"
                    >
                        Conheça o trabalho artesanal da Estefany Gusmão e
                        descubra peças produzidas com cuidado na escolha dos
                        fios, dos materiais e de cada acabamento.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.78, ease: EASE }}
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <a
                            data-testid="hero-cta-explore-button"
                            href="#polvinhos"
                            className="group inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 text-sm font-semibold text-cream shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-cocoa"
                        >
                            Conhecer os polvinhos
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                        <a
                            data-testid="hero-cta-order-button"
                            href={getContactUrl(DEFAULT_MESSAGE)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-cocoa/25 bg-cream/60 px-7 py-3.5 text-sm font-semibold text-cocoa transition-all duration-300 hover:-translate-y-0.5 hover:border-rose hover:text-rose"
                        >
                            Fazer uma encomenda
                        </a>
                    </motion.div>

                    <motion.div
                        data-testid="hero-differentials-grid"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
                        className="mt-12 grid gap-6 border-t border-dune pt-8 sm:grid-cols-3"
                    >
                        {DIFFERENTIALS.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-soft/25 text-rose">
                                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-cocoa">
                                        {title}
                                    </span>
                                    <span className="mt-0.5 block text-xs leading-relaxed text-taupe">
                                        {desc}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="relative lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 28 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
                        className="relative"
                    >
                        <motion.div
                            style={{ y: imgY }}
                            className="arch relative overflow-hidden shadow-lift"
                        >
                            <img
                                src={HERO_IMG}
                                alt="Polvinhos de crochê feitos à mão em rosé e laranja — fotografia real das peças do ateliê Estefany Gusmão"
                                className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[600px]"
                                loading="eager"
                                decoding="async"
                            />
                        </motion.div>

                        <div className="absolute right-3 top-8 rounded-full bg-cocoa/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream backdrop-blur sm:right-5">
                            Feito à mão
                        </div>

                        <motion.div
                            style={{ y: cardY }}
                            className="absolute -left-2 bottom-10 sm:-left-8"
                        >
                            <div className="rounded-2xl border border-dune bg-cream/90 p-4 shadow-lift backdrop-blur-md">
                                <p className="font-serif text-lg italic text-cocoa">
                                    Ponto por ponto
                                </p>
                                <p className="mt-1 max-w-[190px] text-xs leading-relaxed text-taupe">
                                    Cada peça é única, feita inteiramente à
                                    mão.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
