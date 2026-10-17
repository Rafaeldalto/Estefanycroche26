export const BRAND = {
    name: "Estefany Gusmão Crochê",
    artisan: "Estefany Gusmão",
    slogan: "Pequenos detalhes, muito amor em cada ponto.",
    sloganAlt: "Feito à mão para acolher os primeiros momentos da vida.",
    facebook: "https://www.facebook.com/estefanygusmaocroche",
};

// EDITÁVEL: número da artesã com DDI+DDD, apenas dígitos (ex.: "5511999999999").
// Enquanto estiver vazio, todos os botões de contato apontam para o Facebook.
export const WHATSAPP_NUMBER = "";

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
