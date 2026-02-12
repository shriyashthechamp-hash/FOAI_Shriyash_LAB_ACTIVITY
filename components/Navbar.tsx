"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-500 ${scrolled ? "glass-panel py-4" : "bg-transparent"
                }`}
        >
            <div className="max-w-[1800px] mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="group">
                    <h1 className="text-2xl font-bold tracking-[0.2em] font-orbitron text-white group-hover:text-gold transition-colors duration-300">
                        LAMBORGHINI
                    </h1>
                </Link>

                {/* Right Action */}
                <button className="hidden md:flex items-center gap-2 group">
                    <span className="text-sm font-medium tracking-[0.15em] text-white/80 group-hover:text-white transition-colors duration-300">
                        INQUIRE
                    </span>
                    <div className="w-8 h-[1px] bg-white/30 group-hover:bg-gold transition-colors duration-300" />
                </button>

                {/* Mobile Menu Icon (Simple placeholder for now) */}
                <div className="md:hidden space-y-1 cursor-pointer">
                    <div className="w-6 h-[2px] bg-white"></div>
                    <div className="w-4 h-[2px] bg-white ml-auto"></div>
                </div>
            </div>
        </motion.nav>
    );
}
