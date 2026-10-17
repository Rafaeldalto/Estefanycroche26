import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";
import { Eyebrow, FadeUp, EASE } from "./motion";
import { getContactUrl } from "../config";

const PRODUCTS = [
    {
        id: "aconchego",
        name: "Polvinho Aconchego",
        tag: "Tons de rosé e laranja",
        real: true,
        desc: "Feitos à mão, ponto por ponto, com rostinhos bordados — cada peça é única. Outras tonalidades sob consulta.",
        colors: [
            ["Rosé", "#C5837B"],
            ["Laranja", "#E08A4C"],
        ],
        img: "/photos/polvinhos-reais.webp",
        span: "lg:col-span-7",
        aspect: "aspect-[4/3]",
    },
    {
        id: "nuvem",
        name: "Polvinho Nuvem",
        tag: "Neutro e atemporal",
        desc: "Off-white e tons suaves de areia, para presentear em qualquer ocasião e combinar com todo o enxoval.",
        colors: [
            ["Off-white", "#F5F1E8"],
            ["Cru", "#EFE6D8"],
            ["Areia", "#DCCDB4"],
        ],
        img: "https://static.prod-images.emergentagent.com/jobs/19329ea2-7bf2-4210-83ee-f9eb9b846d35/images/91806ab15d935b58ff57a3f53d3bc6615fcaf0a7dba4b247f692b6f0b4e8c0f8.jpeg",
        span: "lg:col-span-5",
        aspect: "aspect-[4/3]",
    },
    {
        id: "jardim",
        name: "Polvinho Jardim",
        tag: "Inspiração botânica",
        desc: "Verde-sálvia e tons naturais, pensados para quartinhos leves, serenos e cheios de calma.",
        colors: [
            ["Verde-sálvia", "#7A9A8B"],
            ["Cru", "#EFE6D8"],
            ["Areia", "#DCCDB4"],
        ],
        img: "https://static.prod-images.emergentagent.com/jobs/19329ea2-7bf2-4210-83ee-f9eb9b846d35/images/8f9cfa82b62699e03380f62428fd3b84e8a3d7cfb9806daed4723cab4ad17646.jpeg",
        span: "lg:col-span-5",
        aspect: "aspect-[4/3]",
    },
    {
        id: "soninho",
        name: "Polvinho Soninho",
        tag: "Momento de ninar",
        desc: "Areia e mel em tons envolventes, suaves como um fim de tarde de sono tranquilo.",
        colors: [
            ["Areia", "#DCCDB4"],
            ["Mel", "#D4A373"],
            ["Baunilha", "#F3EAD9"],
        ],
        img: "https://static.prod-images.emergentagent.com/jobs/19329ea2-7bf2-4210-83ee-f9eb9b846d35/images/8c0a6081c821eca4d1cc98016581974700c1cf479296870d1e4aa330a6f88caf.jpeg",
        span: "lg:col-span-7",
        aspect: "aspect-[16/10]",
    },
];

const OTHER_PIECES = [
    {
        src: "/photos/santinhas-amigurumi.jpg",
        alt: "Santinhos em amigurumi de crochê — fotografia real das peças do ateliê Estefany Gusmão",
    },
    {
        src: "/photos/santinha-rita.jpg",
        alt: "Santinha em amigurumi de crochê com rosa e terço — fotografia real de peça do ateliê",
    },
    {
        src: "/photos/toalha-creme.jpg",
        alt: "Toalha de mesa redonda em crochê creme com sousplat — fotografia real de peça do ateliê",
    },
    {
        src: "/photos/toalha-verde.jpg",
        alt: "Toalha de mesa redonda em crochê verde com sousplat — fotografia real de peça do ateliê",
    },
];

function ProductCard({ p, index }) {
    return (
        <motion.article
            data-testid={`product-card-${p.id}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: EASE }}
            className={`group flex flex-col ${p.span}`}
        >
            <div
                className={`relative overflow-hidden rounded-3xl shadow-warm ${p.aspect}`}
            >
                <img
                    src={p.img}
                    alt={`${p.name} — peça artesanal de crochê (imagem ilustrativa)`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cocoa backdrop-blur">
                    {p.tag}
                </span>
                <span
                    className={`absolute bottom-4 right-4 rounded-full px-3 py-1 text-[10px] font-medium text-cream backdrop-blur ${
                        p.real ? "bg-sage/80" : "bg-cocoa/55"
                    }`}
                >
                    {p.real ? "Foto real do ateliê" : "Foto ilustrativa"}
                </span>
            </div>

            <div className="flex flex-1 flex-col px-1 pt-6">
                <h3 className="font-serif text-2xl font-semibold text-cocoa sm:text-3xl">
                    {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">
                    {p.desc}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">
                        Cores
                    </span>
                    <span className="flex flex-wrap items-center gap-2">
                        {p.colors.map(([name, hex]) => (
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

                <div className="mt-5 flex items-center justify-between border-t border-dune pt-4">
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
                    data-testid={`product-order-btn-${p.id}`}
                    href={getContactUrl(
                        `Olá, Estefany! Vi o ${p.name} no site e quero saber mais sobre a encomenda.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose/50 px-6 py-3.5 text-sm font-semibold text-rose transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose hover:text-cream"
                >
                    Quero este polvinho
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
            </div>
        </motion.article>
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

                <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
                    {PRODUCTS.map((p, i) => (
                        <ProductCard key={p.id} p={p} index={i} />
                    ))}
                </div>

                <FadeUp delay={0.1} className="mt-16">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h3 className="font-serif text-2xl font-semibold text-cocoa sm:text-3xl">
                            Também feito à mão no ateliê
                        </h3>
                        <p className="max-w-md text-xs leading-relaxed text-taupe sm:text-sm">
                            Santinhos em amigurumi e peças de mesa em crochê —
                            fotografias reais das criações da Estefany.
                        </p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {OTHER_PIECES.map((o) => (
                            <figure
                                key={o.src}
                                className="group overflow-hidden rounded-2xl shadow-warm"
                            >
                                <img
                                    src={o.src}
                                    alt={o.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                />
                            </figure>
                        ))}
                    </div>
                    <p className="mt-10 max-w-3xl border-l-2 border-rose-soft pl-4 text-xs leading-relaxed text-taupe sm:text-sm">
                        Os modelos, nomes e cores são referências iniciais — o
                        catálogo final, as cores disponíveis e os valores são
                        definidos pela artesã no atendimento. Os polvinhos em
                        rosé e laranja aparecem em fotografia real do ateliê;
                        as demais fotos são ilustrativas até as próximas
                        fotografias das peças.
                    </p>
                </FadeUp>
            </div>
        </section>
    );
}
