import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const FadeUp = ({ children, delay = 0, className = "", y = 32 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
    >
        {children}
    </motion.div>
);

export const Eyebrow = ({ children, tone = "sage" }) => (
    <span
        className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] ${
            tone === "rose" ? "text-rose" : "text-sage"
        }`}
    >
        <span className="h-px w-8 bg-current opacity-60" />
        {children}
    </span>
);
