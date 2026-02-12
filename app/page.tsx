"use client";

import Navbar from "@/components/Navbar";
import HuracanExperience from "@/components/HuracanExperience";

export default function Home() {
    return (
        <main className="min-h-screen bg-black overflow-x-hidden selection:bg-gold selection:text-black">
            <Navbar />
            <HuracanExperience />
        </main>
    );
}
