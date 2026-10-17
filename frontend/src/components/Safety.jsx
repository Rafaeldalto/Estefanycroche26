import { ShieldCheck, Check } from "lucide-react";
import { Eyebrow, FadeUp } from "./motion";

const GUIDELINES = [
    {
        title: "Materiais e acabamentos",
        desc: "Produtos destinados a bebês exigem atenção especial aos materiais, aos acabamentos e à adequação para a faixa etária.",
    },
    {
        title: "Orientações da equipe de saúde",
        desc: "A utilização por recém-nascidos, bebês prematuros ou internados deve seguir as orientações da equipe de saúde responsável.",
    },
    {
        title: "Sono seguro",
        desc: "Não recomendamos o uso de objetos soltos durante o sono do bebê. Prefira o polvinho para os momentos de colo e de supervisão.",
    },
    {
        title: "Ambiente hospitalar",
        desc: "Qualquer uso em ambiente hospitalar deve respeitar os protocolos da instituição.",
    },
];

const PIECE_INFO = [
    "Composição dos fios — informada pela artesã no atendimento.",
    "Higienização — instruções de cuidado enviadas junto com a peça.",
    "Advertências e certificações — informadas quando aplicáveis.",
];

export default function Safety() {
    return (
        <section
            id="seguranca"
            data-testid="safety-guidelines-section"
            className="relative border-y border-sage/20 bg-sage-light/50 py-24 lg:py-28"
        >
            <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:gap-16 lg:px-10">
                <FadeUp className="lg:col-span-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cream text-sage shadow-warm">
                        <ShieldCheck className="h-7 w-7" strokeWidth={1.6} />
                    </span>
                    <h2 className="mt-6 text-balance font-serif text-4xl leading-tight tracking-tight text-cocoa sm:text-5xl">
                        Carinho também é cuidar da segurança.
                    </h2>
                    <p className="mt-5 text-sm leading-relaxed text-taupe sm:text-base">
                        Aqui, a transparência faz parte do cuidado. Conheça as
                        orientações que acompanham cada peça.
                    </p>
                </FadeUp>

                <div className="lg:col-span-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                        {GUIDELINES.map((g, i) => (
                            <FadeUp
                                key={g.title}
                                delay={i * 0.08}
                                data-testid="safety-item-card"
                            >
                                <div className="h-full rounded-3xl border border-sage/25 bg-cream/80 p-6">
                                    <h3 className="font-serif text-xl font-semibold text-cocoa">
                                        {g.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-taupe">
                                        {g.desc}
                                    </p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>

                    <FadeUp delay={0.2}>
                        <div className="mt-6 rounded-3xl border border-dune bg-cream/80 p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">
                                Informações da peça
                            </p>
                            <ul className="mt-4 space-y-2.5">
                                {PIECE_INFO.map((info) => (
                                    <li
                                        key={info}
                                        className="flex items-start gap-2.5 text-sm leading-relaxed text-brown"
                                    >
                                        <Check
                                            className="mt-0.5 h-4 w-4 shrink-0 text-rose"
                                            strokeWidth={2}
                                        />
                                        {info}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}
