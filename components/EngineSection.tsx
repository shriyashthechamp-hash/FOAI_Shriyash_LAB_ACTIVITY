"use client";

import { motion } from "framer-motion";

interface EngineSectionProps {
    scrollProgress: number;
}

export default function EngineSection({ scrollProgress }: EngineSectionProps) {
    // Engine visible from 65-100% scroll
    const fadeInStart = 0.65;
    const fadeInEnd = 0.7;

    let opacity = 0;

    if (scrollProgress >= fadeInStart && scrollProgress < fadeInEnd) {
        // Fade in
        opacity = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
    } else if (scrollProgress >= fadeInEnd) {
        // Fully visible
        opacity = 1;
    }

    const isVisible = scrollProgress >= fadeInStart;

    if (!isVisible && opacity === 0) return null;

    const specs = [
        { label: "V10 Naturally Aspirated", delay: 0 },
        { label: "630 Horsepower", delay: 0.1 },
        { label: "0–100 in 3.2s", delay: 0.2 },
    ];

    return (
        <motion.div
            style={{ opacity }}
            className="fixed inset-0 z-10 flex items-center justify-end pointer-events-none px-8 md:px-16 lg:px-24"
        >
            <div className="max-w-2xl text-right">
                {/* HUD Line */}
                <div className="hud-line w-32 h-px ml-auto mb-6"></div>

                {/* Heading */}
                <h2 className="luxury-heading text-5xl md:text-6xl lg:text-7xl text-lambo-gold mb-8">
                    ENGINE
                </h2>

                {/* Specs List */}
                <div className="space-y-4">
                    {specs.map((spec, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: opacity, x: 0 }}
                            transition={{ duration: 0.6, delay: spec.delay }}
                            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light"
                        >
                            {spec.label}
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Lines */}
                <div className="mt-8 space-y-2 flex flex-col items-end">
                    <div className="w-48 h-px bg-gradient-to-l from-lambo-gold to-transparent"></div>
                    <div className="w-32 h-px bg-gradient-to-l from-lambo-gold to-transparent"></div>
                    <div className="w-16 h-px bg-gradient-to-l from-lambo-gold to-transparent"></div>
                </div>
            </div>
        </motion.div>
    );
}
