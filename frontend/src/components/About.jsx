import { Eyebrow, FadeUp } from "./motion";

export default function About() {
    return (
        <section
            id="sobre"
            data-testid="artisan-about-section"
            className="relative overflow-hidden py-24 lg:py-32"
        >
            <div className="pointer-events-none absolute -left-32 top-1/3 h-[360px] w-[360px] rounded-full bg-rose-soft/15 blur-3xl" />
            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-12 lg:gap-16 lg:px-10">
                <FadeUp className="lg:col-span-5">
                    <div className="relative">
                        <div className="overflow-hidden rounded-3xl shadow-lift">
                            <img
                                data-testid="artisan-portrait"
                                src="https://static.prod-images.emergentagent.com/jobs/19329ea2-7bf2-4210-83ee-f9eb9b846d35/images/5435467f759e29d47fee3757150f7b63fb549d74fff815607ce64e67a5843b78.jpeg"
                                alt="Mãos tecendo crochê com fios em tons pastel no ateliê (imagem ilustrativa do processo artesanal)"
                                loading="lazy"
                                decoding="async"
                                className="h-[440px] w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.03] sm:h-[540px]"
                            />
                        </div>
                        <p className="mt-4 text-[11px] leading-relaxed text-taupe/80">
                            Imagem ilustrativa do processo artesanal — a
                            fotografia da artesã será adicionada em breve.
                        </p>
                    </div>
                </FadeUp>

                <div className="lg:col-span-7">
                    <FadeUp>
                        <Eyebrow tone="rose">Sobre a artesã</Eyebrow>
                        <h2 className="mt-5 max-w-xl text-balance font-serif text-4xl leading-tight tracking-tight text-cocoa sm:text-5xl">
                            Por trás de cada peça, existe uma história feita à
                            mão.
                        </h2>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <div className="mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-taupe sm:text-lg">
                            <p>
                                Olá, sou Estefany Gusmão, artesã apaixonada
                                pela delicadeza do crochê e pela possibilidade
                                de transformar fios em peças cheias de
                                significado.
                            </p>
                            <p>
                                Cada criação é feita manualmente, com dedicação,
                                atenção aos detalhes e cuidado na escolha dos
                                materiais. Meu objetivo é oferecer peças
                                artesanais especiais, valorizando o trabalho
                                feito à mão e o carinho presente em cada
                                criação.
                            </p>
                            <p>
                                Será um prazer apresentar meu trabalho e ajudar
                                você a escolher uma peça especial.
                            </p>
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.18}>
                        <blockquote
                            data-testid="artisan-quote-text"
                            className="mt-9 border-l-2 border-rose pl-6"
                        >
                            <p className="max-w-lg font-serif text-2xl italic leading-snug text-cocoa sm:text-3xl">
                                “Pequenos detalhes, muito amor em cada ponto.”
                            </p>
                        </blockquote>
                        <p
                            data-testid="artisan-signature"
                            className="mt-6 font-serif text-3xl italic text-rose"
                        >
                            Estefany Gusmão
                        </p>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
                            Artesã
                        </p>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}
