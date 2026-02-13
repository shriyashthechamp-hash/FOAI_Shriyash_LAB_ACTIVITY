"use client";

import { motion } from "framer-motion";

export default function HistorySection() {
    return (
        <section className="py-32 px-6 md:px-24 bg-carbon border-t border-white/5 relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-gold font-rajdhani tracking-[0.5em] mb-4">HERITAGE</h2>
                        <h3 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-8">
                            BORN FROM <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">AMBITION</span>
                        </h3>
                        <p className="text-white/70 font-rajdhani text-lg leading-relaxed mb-8">
                            Ferruccio Lamborghini was a man who believed that excellent was not enough. He wanted perfection.
                            The Huracán EVO Spyder is the evolution of the most successful V10-powered Lamborghini ever.
                            It is the result of a process of fine-tuning and consolidation which develops the existing features
                            and performance of the Huracán EVO, combined with the open-air driving excitement.
                        </p>

                        <button className="text-gold font-orbitron border-b border-gold pb-1 hover:text-white hover:border-white transition-colors">
                            READ THE FULL STORY
                        </button>
                    </motion.div>
                </div>

                <div className="md:w-1/2 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="aspect-video bg-black/50 border border-white/10 flex items-center justify-center relative overflow-hidden group"
                    >
                        {/* Abstract graphic placeholder since we don't have generic historical images */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-transparent group-hover:scale-110 transition-transform duration-700"></div>
                        <span className="font-orbitron text-7xl text-white/5 font-black z-10">LEGACY</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
