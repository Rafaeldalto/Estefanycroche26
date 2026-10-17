import { ArrowRight } from "lucide-react";
import { Eyebrow, FadeUp } from "./motion";
import { getContactUrl, DEFAULT_MESSAGE } from "../config";

const STEPS = [
    {
        number: "01",
        title: "Escolha seu modelo",
        desc: "Conheça as opções disponíveis e escolha sua cor favorita.",
    },
    {
        number: "02",
        title: "Converse com a Estefany",
        desc: "Tire suas dúvidas, consulte valores e confirme a disponibilidade.",
    },
    {
        number: "03",
        title: "Combine sua encomenda",
        desc: "Confirme os detalhes, o prazo e a forma de entrega diretamente com a artesã.",
    },
];

export default function Steps() {
    return (
        <section
            id="etapas"
            data-testid="order-steps-section"
            className="relative py-24 lg:py-32"
        >
            <div className="mx-auto max-w-7xl px-5 lg:px-10">
                <FadeUp className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <Eyebrow>Como encomendar</Eyebrow>
                        <h2 className="mt-5 max-w-xl text-balance font-serif text-4xl leading-tight tracking-tight text-cocoa sm:text-5xl">
                            Seu polvinho começa com uma conversa.
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-taupe sm:text-base">
                        Sem formulários e sem burocracia: você fala direto com
                        quem vai tecer cada ponto da sua peça.
                    </p>
                </FadeUp>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {STEPS.map((s, i) => (
                        <FadeUp
                            key={s.number}
                            delay={i * 0.12}
                            data-testid={`order-step-item-${i + 1}`}
                        >
                            <div className="group relative h-full rounded-3xl border border-dune bg-cream p-8 transition-all duration-500 hover:-translate-y-1 hover:border-rose-soft hover:shadow-lift">
                                <span className="font-serif text-5xl italic text-rose-soft transition-colors duration-500 group-hover:text-rose">
                                    {s.number}
                                </span>
                                <h3 className="mt-5 font-serif text-2xl font-semibold text-cocoa">
                                    {s.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-taupe">
                                    {s.desc}
                                </p>
                            </div>
                        </FadeUp>
                    ))}
                </div>

                <FadeUp delay={0.2} className="mt-12 text-center">
                    <a
                        data-testid="order-steps-cta-button"
                        href={getContactUrl(DEFAULT_MESSAGE)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-cocoa px-9 py-4 text-sm font-semibold text-cream shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose"
                    >
                        Quero fazer minha encomenda
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </FadeUp>
            </div>
        </section>
    );
}
