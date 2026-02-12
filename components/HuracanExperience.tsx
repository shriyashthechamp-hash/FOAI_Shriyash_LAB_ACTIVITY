"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import HuracanCanvas from "./HuracanCanvas";

export default function HuracanExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll value for text animations
    // Note: For the canvas, we use raw scrollYProgress to avoid desync/latency
    // But for text, a little spring makes it feel "weighty" and premium
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // --- ANIMATION PHASES ---

    // Phase 1: HERO (0% - 25%)
    const heroOpacity = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 0.9]);
    const heroY = useTransform(smoothProgress, [0, 0.25], [0, -100]);

    // Phase 2: DESIGN (25% - 60%)
    const designOpacity = useTransform(smoothProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
    const designX = useTransform(smoothProgress, [0.25, 0.35], [-50, 0]);

    // Phase 3: ENGINE (60% - 100%)
    const engineOpacity = useTransform(smoothProgress, [0.65, 0.75, 0.9], [0, 1, 1]);
    const engineX = useTransform(smoothProgress, [0.65, 0.75], [50, 0]);

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-black">

            {/* STICKY CONTAINER FOR CANVAS & UI */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* BACKGROUND CANVAS */}
                <HuracanCanvas />

                {/* --- HERO SECTION --- */}
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
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
                        <button className="luxury-button px-10 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-rajdhani font-bold tracking-[0.2em] hover:bg-white/10 hover:border-gold/50 transition-all uppercase">
                            Configure Yours
                        </button>
                    </motion.div>
                </motion.div>


                {/* --- DESIGN SECTION --- */}
                <motion.div
                    style={{ opacity: designOpacity, x: designX }}
                    className="absolute inset-0 flex items-center z-10 pointer-events-none px-6 md:px-24"
                >
                    <div className="max-w-xl">
                        <div className="w-12 h-[2px] bg-gold mb-6"></div>
                        <h3 className="text-gold font-rajdhani tracking-[0.3em] text-lg mb-2">AERODYNAMICS</h3>
                        <h2 className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-6 leading-tight">
                            SCULPTED BY <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">WIND</span>
                        </h2>
                        <p className="text-white/70 font-rajdhani text-xl leading-relaxed max-w-md border-l-2 border-white/10 pl-6">
                            Every line is designed to cut through the air and master it. The Huracán doesn't just move through space; it consumes it.
                        </p>

                        {/* HUD Elements */}
                        <div className="mt-12 flex gap-8">
                            <div>
                                <div className="text-gold font-orbitron text-2xl">7x</div>
                                <div className="text-white/40 text-xs tracking-widest uppercase">Downforce</div>
                            </div>
                            <div>
                                <div className="text-gold font-orbitron text-2xl">16%</div>
                                <div className="text-white/40 text-xs tracking-widest uppercase">Cooling Efficiency</div>
                            </div>
                        </div>
                    </div>
                </motion.div>


                {/* --- ENGINE SECTION --- */}
                <motion.div
                    style={{ opacity: engineOpacity, x: engineX }}
                    className="absolute inset-0 flex items-center justify-end z-10 pointer-events-none px-6 md:px-24"
                >
                    <div className="max-w-xl text-right">
                        <div className="w-12 h-[2px] bg-gold mb-6 ml-auto"></div>
                        <h3 className="text-gold font-rajdhani tracking-[0.3em] text-lg mb-2">POWERTRAIN</h3>
                        <h2 className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-6 leading-tight">
                            V10 <span className="text-transparent bg-clip-text bg-gradient-to-l from-gold to-gold-bright">NA</span>
                        </h2>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-8 mt-10">
                            <div className="group">
                                <div className="text-white/40 text-xs tracking-widest uppercase mb-1 group-hover:text-gold transition-colors">Power</div>
                                <div className="text-4xl font-black font-orbitron text-white">640 <span className="text-lg font-light text-white/50">HP</span></div>
                                <div className="w-full h-[1px] bg-white/10 mt-2 group-hover:bg-gold/50 transition-colors"></div>
                            </div>

                            <div className="group">
                                <div className="text-white/40 text-xs tracking-widest uppercase mb-1 group-hover:text-gold transition-colors">0-100 km/h</div>
                                <div className="text-4xl font-black font-orbitron text-white">2.9 <span className="text-lg font-light text-white/50">s</span></div>
                                <div className="w-full h-[1px] bg-white/10 mt-2 group-hover:bg-gold/50 transition-colors"></div>
                            </div>

                            <div className="group">
                                <div className="text-white/40 text-xs tracking-widest uppercase mb-1 group-hover:text-gold transition-colors">Top Speed</div>
                                <div className="text-4xl font-black font-orbitron text-white">325 <span className="text-lg font-light text-white/50">km/h</span></div>
                                <div className="w-full h-[1px] bg-white/10 mt-2 group-hover:bg-gold/50 transition-colors"></div>
                            </div>

                            <div className="group">
                                <div className="text-white/40 text-xs tracking-widest uppercase mb-1 group-hover:text-gold transition-colors">Torque</div>
                                <div className="text-4xl font-black font-orbitron text-white">600 <span className="text-lg font-light text-white/50">Nm</span></div>
                                <div className="w-full h-[1px] bg-white/10 mt-2 group-hover:bg-gold/50 transition-colors"></div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="text-white/50 text-sm font-rajdhani italic">
                                *Natural Aspiration. No Turbos. Pure Emotion.
                            </p>
                        </div>

                    </div>
                </motion.div>

            </div>
        </div>
    );
}
