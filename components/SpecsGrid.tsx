"use client";

import { motion } from "framer-motion";

export default function SpecsGrid() {
    const specs = [
        { label: "Engine Composition", value: "Aluminum & Carbon" },
        { label: "Transmission", value: "LDF 7-Speed Dual Clutch" },
        { label: "Chassis", value: "Hybrid Aluminum/Carbon" },
        { label: "Dry Weight", value: "1,422 kg" },
        { label: "Max Speed", value: "> 325 km/h" },
        { label: "Acceleration 0-200", value: "9.0 s" },
    ];

    return (
        <section className="py-32 px-6 md:px-24 bg-lambo-black relative z-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-16 text-center">
                    TECHNICAL <span className="text-gold">SPECIFICATIONS</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specs.map((spec, index) => (
                        <motion.div // Using simple in-view animation
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 border border-white/5 bg-white/5 backdrop-blur-sm hover:border-gold/30 transition-all duration-500"
                        >
                            <h3 className="text-white/40 font-rajdhani tracking-widest text-sm uppercase mb-2 group-hover:text-gold transition-colors">
                                {spec.label}
                            </h3>
                            <p className="text-2xl md:text-3xl font-orbitron text-white">
                                {spec.value}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
