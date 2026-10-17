import { ArrowRight, Facebook } from "lucide-react";
import { Eyebrow, FadeUp } from "./motion";
import { getContactUrl, DEFAULT_MESSAGE, BRAND } from "../config";

export default function FinalCta() {
    return (
        <section
            id="contato"
            data-testid="final-cta-section"
            className="relative py-24 lg:py-32"
        >
            <div className="mx-auto max-w-7xl px-5 lg:px-10">
                <FadeUp>
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-dune bg-sand">
                        <div className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-rose-soft/25 blur-3xl" />
                        <div className="relative grid items-center gap-10 lg:grid-cols-12">
                            <div className="p-10 sm:p-14 lg:col-span-7 lg:p-20">
                                <Eyebrow tone="rose">Fale com a artesã</Eyebrow>
                                <h2 className="mt-5 text-balance font-serif text-4xl leading-tight tracking-tight text-cocoa sm:text-5xl">
                                    Um pequeno presente feito com muito amor.
                                </h2>
                                <p className="mt-6 max-w-xl text-base leading-relaxed text-taupe sm:text-lg">
                                    Descubra os detalhes, conheça os modelos
                                    disponíveis e converse diretamente com a
                                    Estefany para encontrar a peça ideal para
                                    sua ocasião.
                                </p>
                                <div className="mt-9 flex flex-wrap items-center gap-4">
                                    <a
                                        data-testid="final-cta-order-btn"
                                        href={getContactUrl(DEFAULT_MESSAGE)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 rounded-full bg-cocoa px-8 py-4 text-sm font-semibold text-cream shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose"
                                    >
                                        Conhecer os polvinhos e encomendar
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </a>
                                    <a
                                        data-testid="final-cta-facebook-btn"
                                        href={BRAND.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-cocoa/25 px-8 py-4 text-sm font-semibold text-cocoa transition-all duration-300 hover:-translate-y-0.5 hover:border-rose hover:text-rose"
                                    >
                                        <Facebook className="h-4 w-4" />
                                        Visitar nossa página no Facebook
                                    </a>
                                </div>
                            </div>
                            <div className="relative h-72 lg:col-span-5 lg:h-full">
                                <div className="arch absolute inset-x-6 bottom-0 top-0 mx-auto h-[110%] overflow-hidden shadow-lift sm:inset-x-12">
                                    <img
                                        src="/photos/polvinhos-reais.webp"
                                        alt="Polvinhos de crochê feitos à mão em rosé e laranja — fotografia real do ateliê Estefany Gusmão"
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
