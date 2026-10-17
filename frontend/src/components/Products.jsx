import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";
import { Eyebrow, FadeUp, EASE } from "./motion";
import { getContactUrl } from "../config";

const POLVINHO = {
    id: "polvinho",
    name: "Polvinho de crochê",
    tag: "Feito à mão, ponto por ponto",
    desc: "Tecido à mão, ponto por ponto, com fios selecionados e acabamento cuidadoso. Disponível em rosé e laranja — outras tonalidades sob consulta.",
    colors: [
        ["Rosé", "#C5837B"],
        ["Laranja", "#E08A4C"],
    ],
    img: "/photos/polvinhos-reais.webp",
};

const SANTINHOS_IMG = {
    src: "/photos/santinhas-amigurumi.jpg",
    alt: "Santinhos em amigurumi de crochê — fotografia real das peças do ateliê Estefany Gusmão",
};

function PolvinhoSpotlight() {
    return (
        <motion.div
            data-testid="product-card-polvinho"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="grid items-center gap-10 lg:grid-cols-12"
        >
            <div className="relative lg:col-span-7">
                <div className="overflow-hidden rounded-3xl shadow-lift">
                    <img
                        src={POLVINHO.img}
                        alt="Polvinhos de crochê feitos à mão em rosé e laranja — fotografia real do ateliê Estefany Gusmão"
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                    />
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cocoa backdrop-blur">
                    {POLVINHO.tag}
                </span>
            </div>

            <div className="lg:col-span-5">
                <h3 className="font-serif text-3xl font-semibold text-cocoa sm:text-4xl">
                    {POLVINHO.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-taupe sm:text-base">
                    {POLVINHO.desc}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">
                        Cores
                    </span>
                    <span className="flex flex-wrap items-center gap-2">
                        {POLVINHO.colors.map(([name, hex]) => (
                            <span
                                key={name}
                                className="inline-flex items-center gap-1.5 rounded-full border border-dune bg-canvas px-2.5 py-1 text-[11px] text-brown"
                            >
                                <span
                                    className="h-3 w-3 rounded-full border border-dune"
                                    style={{ backgroundColor: hex }}
                                />
                                {name}
                            </span>
                        ))}
                    </span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-dune pt-4">
                    <span className="text-xs text-taupe">
                        Valor{" "}
                        <span className="font-serif text-lg italic text-cocoa">
                            sob consulta
                        </span>
                    </span>
                    <span className="rounded-full border border-sage/40 bg-sage-light/60 px-3 py-1 text-[11px] font-medium text-sage">
                        Feito sob encomenda
                    </span>
                </div>

                <a
                    data-testid="product-order-btn-polvinho"
                    href={getContactUrl(
                        "Olá, Estefany! Vim pelo site e quero encomendar um polvinho de crochê.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-4 text-sm font-semibold text-cream shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-cocoa"
                >
                    Quero este polvinho
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
            </div>
        </motion.div>
    );
}

export default function Products() {
    return (
        <section
            id="polvinhos"
            data-testid="catalog-section"
            className="relative py-24 lg:py-32"
        >
            <div className="mx-auto max-w-7xl px-5 lg:px-10">
                <FadeUp>
                    <Eyebrow>O nosso produto</Eyebrow>
                    <h2 className="mt-5 max-w-2xl text-balance font-serif text-4xl leading-tight tracking-tight text-cocoa sm:text-5xl">
                        Conheça nossos polvinhos de crochê
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-taupe sm:text-lg">
                        Cada polvinho é confeccionado artesanalmente, ponto por
                        ponto, com atenção à escolha dos materiais, ao
                        acabamento e à finalidade de uso da peça.
                    </p>
                </FadeUp>

                <FadeUp delay={0.15} className="mt-8">
                    <div className="flex max-w-3xl items-start gap-4 rounded-3xl border border-sage/25 bg-sage-light/50 p-6 sm:p-7">
                        <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage">
                            <Heart className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        <p className="text-sm leading-relaxed text-brown sm:text-[15px]">
                            Os tentáculos enroladinhos são inspirados na forma
                            do cordão umbilical e podem proporcionar, para
                            alguns bebês, uma experiência sensorial de toque e
                            preensão. O polvinho é um item artesanal, criado
                            para contextos apropriados — sempre seguindo as
                            orientações da equipe de saúde e as recomendações
                            de segurança infantil.
                        </p>
                    </div>
                </FadeUp>

                <PolvinhoSpotlight />

                <FadeUp delay={0.1} className="mt-16">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h3 className="font-serif text-2xl font-semibold text-cocoa sm:text-3xl">
                            Também feito à mão no ateliê
                        </h3>
                        <p className="max-w-md text-xs leading-relaxed text-taupe sm:text-sm">
                            Santinhos em amigurumi, feitos ponto por ponto —
                            fotografias reais das criações da Estefany.
                        </p>
                    </div>
                    <div className="mt-6 overflow-hidden rounded-3xl shadow-warm">
                        <img
                            src={SANTINHOS_IMG.src}
                            alt={SANTINHOS_IMG.alt}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[16/9] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                        />
                    </div>
                    <p className="mt-10 max-w-3xl border-l-2 border-rose-soft pl-4 text-xs leading-relaxed text-taupe sm:text-sm">
                        Os valores, as cores disponíveis e o catálogo são
                        definidos pela artesã no atendimento. Fotografias
                        reais das peças do ateliê Estefany Gusmão.
                    </p>
                </FadeUp>
            </div>
        </section>
    );
}
