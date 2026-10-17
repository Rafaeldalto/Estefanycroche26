export const BRAND = {
    name: "Estefany Gusmão Crochê",
    artisan: "Estefany Gusmão",
    slogan: "Pequenos detalhes, muito amor em cada ponto.",
    sloganAlt: "Feito à mão para acolher os primeiros momentos da vida.",
    facebook: "https://www.facebook.com/estefanygusmaocroche",
};

// Número da artesã com DDI+DDD, apenas dígitos: (21) 99196-1267.
export const WHATSAPP_NUMBER = "5521991961267";
export const WHATSAPP_DISPLAY = "(21) 99196-1267";

export function getContactUrl(message) {
    if (WHATSAPP_NUMBER) {
        const text = message ? `?text=${encodeURIComponent(message)}` : "";
        return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
    }
    return BRAND.facebook;
}

export const CONTACT_CHANNEL = WHATSAPP_NUMBER ? "WhatsApp" : "Facebook";

export const DEFAULT_MESSAGE =
    "Olá, Estefany! Vim pelo site e quero encomendar um polvinho de crochê.";
