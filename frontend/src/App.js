import { Component, useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Products from "./components/Products";
import Care from "./components/Care";
import About from "./components/About";
import Steps from "./components/Steps";
import Safety from "./components/Safety";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import "./App.css";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error) {
        console.error(error);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-cream px-6 text-center">
                    <div>
                        <p className="font-serif text-3xl text-cocoa">
                            Algo saiu do ponto...
                        </p>
                        <p className="mt-3 text-taupe">
                            Recarregue a página para voltar ao ateliê.
                        </p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function App() {
    useEffect(() => {
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        let lenis;
        let rafId;

        if (!reduced) {
            lenis = new Lenis({ duration: 1.15, smoothWheel: true });
            const raf = (time) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
        }

        const onClick = (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            const id = anchor.getAttribute("href");
            if (!id || id === "#") return;
            const el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            if (lenis) {
                lenis.scrollTo(el, { offset: -72, duration: 1.2 });
            } else {
                el.scrollIntoView({ behavior: "smooth" });
            }
        };
        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
            if (rafId) cancelAnimationFrame(rafId);
            if (lenis) lenis.destroy();
        };
    }, []);

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-cream font-sans text-brown antialiased">
                <Navbar />
                <main>
                    <Hero />
                    <Marquee />
                    <Products />
                    <Care />
                    <About />
                    <Steps />
                    <Safety />
                    <Faq />
                    <FinalCta />
                </main>
                <Footer />
                <FloatingContact />
            </div>
        </ErrorBoundary>
    );
}

export default App;
