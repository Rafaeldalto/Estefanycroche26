import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Eyebrow, FadeUp, EASE } from "./motion";

const FAQS = [
    {
        q: "Os polvinhos são feitos à mão?",
        a: "Sim. Cada polvinho é tecido à mão, ponto por ponto, pela artesã Estefany Gusmão, do primeiro ponto até o acabamento.",
    },
    {
        q: "Quais cores estão disponíveis?",
        a: "As cores disponíveis variam conforme os fios do ateliê no momento da encomenda. Consulte a Estefany para conhecer a paleta atual e as sugestões do momento.",
    },
    {
        q: "Posso encomendar uma cor específica?",
        a: "Sim! Conte a sua ideia no atendimento e a Estefany verificará a disponibilidade de fios na tonalidade desejada, sugerindo combinações que combinem com você.",
    },
    {
        q: "Quais materiais são utilizados?",
        a: "Trabalhamos com fios selecionados de acordo com a finalidade de cada peça. A composição exata dos materiais do seu polvinho é informada pela artesã no atendimento.",
    },
    {
        q: "Qual é o valor de cada modelo?",
        a: "Os valores dependem do modelo, do tamanho e da personalização. Consulte diretamente a Estefany para receber as informações atualizadas.",
    },
    {
        q: "Qual é o prazo de produção?",
        a: "Por ser uma peça artesanal feita sob encomenda, o prazo varia conforme a agenda do ateliê e o nível de detalhes de cada modelo. O prazo exato é combinado com você no momento da encomenda.",
    },
    {
        q: "Como funciona a entrega?",
        a: "A forma de entrega e o frete são combinados diretamente com a artesã, conforme a sua cidade e a sua preferência.",
    },
    {
        q: "Como devo higienizar a peça?",
        a: "Cada peça acompanha as orientações de higienização indicadas pela artesã, de acordo com os materiais utilizados. Em caso de dúvida, pergunte no atendimento antes de lavar.",
    },
    {
        q: "Para qual faixa etária o produto é indicado?",
        a: "O polvinho é um item artesanal de aconchego. A adequação à faixa etária do bebê deve ser avaliada pelos responsáveis, considerando as recomendações de segurança infantil e as orientações da equipe de saúde.",
    },
    {
        q: "O polvinho pode ser utilizado por bebês prematuros ou hospitalizados?",
        a: "Nesses casos, a utilização deve seguir as orientações da equipe de saúde responsável e os protocolos da instituição de saúde.",
    },
];

export default function Faq() {
    const [open, setOpen] = useState(0);

    return (
        <section
            id="faq"
            data-testid="faq-accordion-section"
            className="relative py-24 lg:py-32"
        >
            <div className="mx-auto max-w-3xl px-5 lg:px-10">
                <FadeUp>
                    <Eyebrow>Dúvidas frequentes</Eyebrow>
                    <h2 className="mt-5 text-balance font-serif text-4xl leading-tight tracking-tight text-cocoa sm:text-5xl">
                        Perguntas frequentes
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-taupe">
                        Respostas de referência — a Estefany pode ajustar cada
                        informação com os detalhes do ateliê.
                    </p>
                </FadeUp>

                <div className="mt-10">
                    {FAQS.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <FadeUp key={item.q} delay={i * 0.03}>
                                <div className="border-b border-dune first:border-t">
                                    <button
                                        data-testid={`faq-accordion-item-${i}`}
                                        onClick={() => setOpen(isOpen ? -1 : i)}
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-6 py-5 text-left"
                                    >
                                        <span
                                            className={`font-medium transition-colors duration-300 ${
                                                isOpen
                                                    ? "text-rose"
                                                    : "text-cocoa"
                                            }`}
                                        >
                                            {item.q}
                                        </span>
                                        <motion.span
                                            animate={{
                                                rotate: isOpen ? 45 : 0,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                ease: EASE,
                                            }}
                                            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                                                isOpen
                                                    ? "border-rose bg-rose text-cream"
                                                    : "border-dune text-taupe"
                                            }`}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                key="content"
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: 0.45,
                                                    ease: EASE,
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-6 pr-12 text-sm leading-relaxed text-taupe sm:text-base">
                                                    {item.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </FadeUp>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
