"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
    scrollProgress: number;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
    // Hero visible from 0-30% scroll
    const opacity = scrollProgress < 0.3 ? 1 - (scrollProgress / 0.3) : 0;
    const isVisible = scrollProgress < 0.3;

    if (!isVisible && opacity === 0) return null;

    return (
        <motion.div
            style={{ opacity }}
            className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
            <div className="text-center px-6">
                {/* HUD Line Top */}
                <div className="hud-line w-64 h-px mx-auto mb-8"></div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="luxury-heading text-6xl md:text-8xl lg:text-9xl text-white mb-4 gold-glow"
                >
                    LAMBORGHINI
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="luxury-heading text-4xl md:text-6xl lg:text-7xl text-lambo-gold mb-8"
                >
                    HURACÁN
                </motion.h2>

                {/* Price */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-2xl md:text-3xl text-white/90 mb-12 tracking-luxury"
                >
                    ₹4.5 <span className="text-lambo-gold">CRORE</span>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="luxury-button pointer-events-auto px-10 py-4 bg-lambo-gold text-lambo-black font-bold text-lg tracking-wide hover:bg-lambo-gold-bright transition-all duration-300 shadow-lg hover:shadow-lambo-gold/50"
                >
                    INQUIRE NOW
                </motion.button>

                {/* HUD Line Bottom */}
                <div className="hud-line w-64 h-px mx-auto mt-8"></div>
            </div>
        </motion.div>
    );
}
