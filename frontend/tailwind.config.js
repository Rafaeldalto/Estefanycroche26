/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Cormorant Garamond"', "Georgia", "serif"],
                sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
            },
            colors: {
                cream: "#FCFBF7",
                canvas: "#F7F4EE",
                sand: "#EFE9DE",
                dune: "#E4DDD0",
                rose: {
                    DEFAULT: "#C5837B",
                    soft: "#DFABA3",
                },
                sage: {
                    DEFAULT: "#7A9A8B",
                    light: "#E8EFEA",
                },
                cocoa: "#2B211B",
                brown: "#4A3B32",
                taupe: "#75665D",
                gold: "#D4A373",
            },
            boxShadow: {
                warm: "0 12px 32px rgba(74,59,50,0.06)",
                lift: "0 24px 48px -12px rgba(74,59,50,0.14)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
