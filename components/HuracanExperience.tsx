"use client";

import { motion, useTransform, useSpring, MotionValue } from "framer-motion";
import HuracanCanvas from "./HuracanCanvas";

interface HuracanExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function HuracanExperience({ scrollYProgress }: HuracanExperienceProps) {
    // Smooth out the scroll value for text animations
    // Note: For the canvas, we use raw scrollYProgress to avoid desync/latency
    // But for text, a little spring makes it feel "weighty" and premium
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // --- ANIMATION PHASES (New 33% Split) ---

    // Phase 1: HERO (0% - 33%)
    const heroOpacity = useTransform(smoothProgress, [0, 0.20, 0.30], [1, 1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.30], [1, 0.9]);
    const heroY = useTransform(smoothProgress, [0, 0.30], [0, -100]);

    // Phase 2: DESIGN (33% - 66%)
    const designOpacity = useTransform(smoothProgress, [0.30, 0.35, 0.60, 0.66], [0, 1, 1, 0]);
    const designX = useTransform(smoothProgress, [0.30, 0.40], [-50, 0]);

    // Phase 3: ENGINE (66% - 100%)
    const engineOpacity = useTransform(smoothProgress, [0.66, 0.70, 0.95], [0, 1, 1]);
    const engineX = useTransform(smoothProgress, [0.66, 0.75], [50, 0]);

    return (
        <div className="relative h-full w-full pointer-events-none">
            {/* --- HERO SECTION --- */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
            >
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-gold font-rajdhani tracking-[0.5em] text-sm md:text-base mb-4 uppercase"
                    >
                        Beyond the Concrete
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                        className="text-6xl md:text-9xl font-black font-orbitron text-white tracking-tighter mb-2 glow-text"
                    >
                        HURACÁN
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="text-white/60 font-rajdhani text-lg tracking-widest"
                    >
                        EVO SPYDER
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-20 flex flex-col items-center gap-4 pointer-events-auto"
                >
                    <div className="text-gold font-orbitron text-2xl font-bold">₹4.5 Cr*</div>
                    <button className="luxury-button">
                        Inquire Now
                    </button>
                </motion.div>
            </motion.div>


            {/* --- DESIGN SECTION --- */}
            <motion.div
                style={{ opacity: designOpacity, x: designX }}
                className="absolute inset-0 flex items-center z-10 px-6 md:px-24"
            >
                <div className="max-w-xl bg-black/40 backdrop-blur-sm p-8 border border-white/5">
                    <div className="w-12 h-[2px] bg-gold mb-6"></div>
                    <h3 className="text-gold font-rajdhani tracking-[0.3em] text-lg mb-2">DESIGN</h3>
                    <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6 leading-tight">
                        AERODYNAMIC<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">ITALIAN AGGRESSION</span>
                    </h2>
                    <p className="text-white/70 font-rajdhani text-xl leading-relaxed max-w-md border-l-2 border-white/10 pl-6">
                        Sculpted in carbon and light. Every line is designed to cut through the air and master it.
                    </p>
                </div>
            </motion.div>


            {/* --- ENGINE SECTION --- */}
            <motion.div
                style={{ opacity: engineOpacity, x: engineX }}
                className="absolute inset-0 flex items-center justify-end z-10 px-6 md:px-24"
            >
                <div className="max-w-xl text-right bg-black/40 backdrop-blur-sm p-8 border border-white/5">
                    <div className="w-12 h-[2px] bg-gold mb-6 ml-auto"></div>
                    <h3 className="text-gold font-rajdhani tracking-[0.3em] text-lg mb-2">ENGINE</h3>
                    <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6 leading-tight">
                        V10 <span className="text-transparent bg-clip-text bg-gradient-to-l from-gold to-gold-bright">NATURAL</span>
                    </h2>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-8 mt-10">
                        <div className="group">
                            <div className="text-white/40 text-xs tracking-widest uppercase mb-1 group-hover:text-gold transition-colors">Power</div>
                            <div className="text-4xl font-black font-orbitron text-white">630 <span className="text-lg font-light text-white/50">HP</span></div>
                            <div className="w-full h-[1px] bg-white/10 mt-2 group-hover:bg-gold/50 transition-colors"></div>
                        </div>

                        <div className="group">
                            <div className="text-white/40 text-xs tracking-widest uppercase mb-1 group-hover:text-gold transition-colors">0-100 km/h</div>
                            <div className="text-4xl font-black font-orbitron text-white">3.2 <span className="text-lg font-light text-white/50">s</span></div>
                            <div className="w-full h-[1px] bg-white/10 mt-2 group-hover:bg-gold/50 transition-colors"></div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
