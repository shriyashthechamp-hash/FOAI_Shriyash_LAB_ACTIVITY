"use client";

import { motion } from "framer-motion";

interface DesignSectionProps {
    scrollProgress: number;
}

export default function DesignSection({ scrollProgress }: DesignSectionProps) {
    // Design visible from 30-65% scroll
    const fadeInStart = 0.3;
    const fadeInEnd = 0.35;
    const fadeOutStart = 0.6;
    const fadeOutEnd = 0.65;

    let opacity = 0;

    if (scrollProgress >= fadeInStart && scrollProgress < fadeInEnd) {
        // Fade in
        opacity = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
    } else if (scrollProgress >= fadeInEnd && scrollProgress < fadeOutStart) {
        // Fully visible
        opacity = 1;
    } else if (scrollProgress >= fadeOutStart && scrollProgress < fadeOutEnd) {
        // Fade out
        opacity = 1 - (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    }

    const isVisible = scrollProgress >= fadeInStart && scrollProgress < fadeOutEnd;

    if (!isVisible && opacity === 0) return null;

    return (
        <motion.div
            style={{ opacity }}
            className="fixed inset-0 z-10 flex items-center justify-start pointer-events-none px-8 md:px-16 lg:px-24"
        >
            <div className="max-w-2xl">
                {/* HUD Line */}
                <div className="hud-line w-32 h-px mb-6"></div>

                {/* Heading */}
                <h2 className="luxury-heading text-5xl md:text-6xl lg:text-7xl text-lambo-gold mb-6">
                    DESIGN
                </h2>

                {/* Description */}
                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed font-light">
                    Aerodynamic Italian aggression sculpted in carbon and light.
                </p>

                {/* Decorative Lines */}
                <div className="mt-8 space-y-2">
                    <div className="w-48 h-px bg-gradient-to-r from-lambo-gold to-transparent"></div>
                    <div className="w-32 h-px bg-gradient-to-r from-lambo-gold to-transparent"></div>
                </div>
            </div>
        </motion.div>
    );
}
