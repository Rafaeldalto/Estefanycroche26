import { createContext, useContext, useEffect, useState } from "react";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const DEFAULT_CATALOG = {
    polvinho: {
        price: "Sob consulta",
        photos: ["/photos/polvinhos-reais.webp"],
    },
    gallery: [
        {
            src: "/photos/aparecida-manto.jpg",
            alt: "Santinha em amigurumi de crochê com manto azul e coroa dourada — fotografia real do ateliê Estefany Gusmão",
        },
        {
            src: "/photos/aparecida-azul.webp",
            alt: "Santinha em amigurumi de crochê com vestido azul, cabelo preto e coroa — fotografia real do ateliê",
        },
        {
            src: "/photos/sao-francisco.jpg",
            alt: "Santinho em amigurumi de crochê em tons de marrom com cordeirinho — fotografia real do ateliê",
        },
        {
            src: "/photos/toalha-amarela.jpg",
            alt: "Toalha de mesa redonda em crochê amarelo com pratos — fotografia real do ateliê",
        },
    ],
};

export function catalogImgUrl(src) {
    if (!src) return src;
    return src.startsWith("/api/") ? `${BACKEND_URL}${src}` : src;
}

const CatalogContext = createContext(DEFAULT_CATALOG);

export function CatalogProvider({ children }) {
    const [catalog, setCatalog] = useState(DEFAULT_CATALOG);

    useEffect(() => {
        let alive = true;
        fetch(`${BACKEND_URL}/api/catalog`)
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (!alive || !d || !d.polvinho) return;
                setCatalog({
                    polvinho: {
                        price: d.polvinho.price || DEFAULT_CATALOG.polvinho.price,
                        photos: d.polvinho.photos?.length
                            ? d.polvinho.photos
                            : DEFAULT_CATALOG.polvinho.photos,
                    },
                    gallery: Array.isArray(d.gallery) && d.gallery.length
                        ? d.gallery.filter((g) => g && g.src)
                        : DEFAULT_CATALOG.gallery,
                });
            })
            .catch(() => {});
        return () => {
            alive = false;
        };
    }, []);

    return (
        <CatalogContext.Provider value={catalog}>
            {children}
        </CatalogContext.Provider>
    );
}

export const useCatalog = () => useContext(CatalogContext);
