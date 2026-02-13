"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import HuracanCanvas from "@/components/HuracanCanvas";
import HuracanExperience from "@/components/HuracanExperience";
import SpecsGrid from "@/components/SpecsGrid";
import HistorySection from "@/components/HistorySection";
import Footer from "@/components/Footer";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    // MASTER SCROLL CONTROL
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main className="bg-lambo-black min-h-screen text-white selection:bg-lambo-gold selection:text-black">
            <Navbar />

            {/* MASTER SCROLL CONTAINER (600vh) */}
            <section ref={containerRef} className="relative h-[600vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* The Canvas and HUD allow synchronized consumption of scrollYProgress */}
                    <HuracanCanvas scrollYProgress={scrollYProgress} />
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <HuracanExperience scrollYProgress={scrollYProgress} />
                    </div>
                </div>
            </section>

            {/* ADDITIONAL CONTENT SECTIONS */}
            <div id="specs">
                <SpecsGrid />
            </div>

            <div id="history">
                <HistorySection />
            </div>

            <Footer />
        </main>
    );
}
