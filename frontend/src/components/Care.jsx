import {
    Hand,
    Sparkles,
    Layers,
    Scissors,
    Gift,
    ShieldCheck,
} from "lucide-react";
import { Eyebrow, FadeUp } from "./motion";

const PILLARS = [
    {
        icon: Hand,
        title: "Produção manual",
        desc: "Cada peça é tecida à mão, com atenção aos detalhes do primeiro ponto ao acabamento.",
    },
    {
        icon: Sparkles,
        title: "Seleção criteriosa dos fios",
        desc: "Fios escolhidos com cuidado, pensando na maciez, na durabilidade e na beleza de cada peça.",
    },
    {
        icon: Layers,
        title: "Materiais adequados a cada uso",
        desc: "Os materiais são selecionados de acordo com a finalidade de cada peça, e a composição é informada pela artesã.",
    },
    {
        icon: Scissors,
        title: "Acabamento cuidadoso",
        desc: "Terminações firmes, bordados e detalhes revisados com calma e responsabilidade.",
    },
    {
        icon: Gift,
        title: "Qualidade e apresentação",
        desc: "Cada peça é conferida e preparada com capricho para chegar como um presente.",
    },
];

export default function Care() {
    return (
        <section
            id="cuidado"
            data-testid="craft-care-section"
            className="relative border-y border-dune bg-canvas py-24 lg:py-32"
        >
            <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:gap-16 lg:px-10">
                <FadeUp className="lg:col-span-5">
                    <div className="relative">
                        <div className="arch overflow-hidden shadow-lift">
                            <img
                                src="https://static.prod-images.emergentagent.com/jobs/19329ea2-7bf2-4210-83ee-f9eb9b846d35/images/d4c7e1d66fdb7279de6c499971071966b7d63dbf3d395c65c3479ec9ebd3c9eb.jpeg"
                                alt="Close dos pontos e tentáculos enroladinhos de um polvinho de crochê em rosé (imagem ilustrativa)"
                                loading="lazy"
                                decoding="async"
                                className="h-[420px] w-full object-cover sm:h-[500px]"
                            />
                        </div>
                        <div className="absolute -bottom-8 -right-2 w-40 overflow-hidden rounded-3xl border-4 border-canvas shadow-lift sm:-right-6 sm:w-52">
                            <img
                                src="https://images.unsplash.com/photo-1602773984044-3ecbed81556d?auto=format&fit=crop&w=640&q=80"
                                alt="Textura de crochê artesanal em rosa e branco (imagem ilustrativa)"
                                loading="lazy"
                                decoding="async"
                                className="aspect-square w-full object-cover"
                            />
                        </div>
                        <p className="mt-12 text-left text-[11px] text-taupe/80 sm:mt-10">
                            Texturas e acabamentos — imagens ilustrativas
                        </p>
                    </div>
                </FadeUp>

                <div className="lg:col-span-7">
                    <FadeUp>
                        <Eyebrow>Nosso cuidado</Eyebrow>
                        <h2 className="mt-5 max-w-xl text-balance font-serif text-4xl leading-tight tracking-tight text-cocoa sm:text-5xl">
                            Cada ponto carrega um cuidado especial.
                        </h2>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-taupe sm:text-lg">
                            Peças feitas com tempo, calma e responsabilidade —
                            da escolha dos fios ao último acabamento.
                        </p>
                    </FadeUp>

                    <div className="mt-10">
                        {PILLARS.map(({ icon: Icon, title, desc }, i) => (
                            <FadeUp
                                key={title}
                                delay={i * 0.06}
                                data-testid="care-pillar-card"
                            >
                                <div className="flex items-start gap-5 border-b border-dune py-5 first:pt-0">
                                    <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-soft/20 text-rose">
                                        <Icon
                                            className="h-5 w-5"
                                            strokeWidth={1.8}
                                        />
                                    </span>
                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-cocoa">
                                            {title}
                                        </h3>
                                        <p className="mt-1 text-sm leading-relaxed text-taupe">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>

                    <FadeUp delay={0.15}>
                        <p className="mt-8 flex items-start gap-3 rounded-2xl bg-sage-light/60 p-5 text-xs leading-relaxed text-brown sm:text-sm">
                            <ShieldCheck
                                className="mt-0.5 h-5 w-5 shrink-0 text-sage"
                                strokeWidth={1.8}
                            />
                            <span>
                                Só declaramos características como antialérgico,
                                hipoalergênico, atóxico, certificado ou próprio
                                para uso neonatal quando houver documentação ou
                                confirmação confiável que sustente a
                                informação. A composição dos materiais de cada
                                peça é sempre informada pela artesã.
                            </span>
                        </p>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}
