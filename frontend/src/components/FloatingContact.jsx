import { motion } from "framer-motion";
import { Facebook, MessageCircle } from "lucide-react";
import { EASE } from "./motion";
import { getContactUrl, DEFAULT_MESSAGE, WHATSAPP_NUMBER } from "../config";

export default function FloatingContact() {
    return (
        <motion.a
            data-testid="floating-contact-widget"
            href={getContactUrl(DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
                WHATSAPP_NUMBER
                    ? "Falar com a Estefany pelo WhatsApp"
                    : "Falar com a Estefany pela página do Facebook"
            }
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.7, ease: EASE }}
            className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 rounded-full bg-rose px-5 py-3.5 text-sm font-semibold text-cream shadow-lift transition-colors duration-300 hover:bg-cocoa"
        >
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-rose opacity-20" />
            {WHATSAPP_NUMBER ? (
                <MessageCircle className="h-5 w-5" />
            ) : (
                <Facebook className="h-5 w-5" />
            )}
            <span className="hidden sm:inline">Falar com a Estefany</span>
            <span className="sm:hidden">Encomendar</span>
        </motion.a>
    );
}
