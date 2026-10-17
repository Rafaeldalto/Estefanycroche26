import { Sparkle } from "lucide-react";

const ITEMS = [
    "Feito à mão",
    "Ponto por ponto",
    "Pequenos detalhes, muito amor em cada ponto",
    "Fios selecionados",
    "Cada peça é única",
];

const Row = ({ hidden }) => (
    <div
        aria-hidden={hidden || undefined}
        className="flex shrink-0 items-center"
    >
        {ITEMS.map((item, i) => (
            <span key={i} className="flex items-center">
                <span className="whitespace-nowrap px-7 font-serif text-xl italic text-cream/95 sm:text-2xl">
                    {item}
                </span>
                <Sparkle
                    className="h-4 w-4 shrink-0 text-rose-soft"
                    aria-hidden="true"
                />
            </span>
        ))}
    </div>
);

export default function Marquee() {
    return (
        <section
            aria-label="Diferenciais do ateliê"
            className="relative overflow-hidden bg-cocoa py-5"
        >
            <div className="marquee-track">
                <Row />
                <Row hidden />
            </div>
        </section>
    );
}
