import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani } from "next/font/google"; // [NEW] Added Rajdhani
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const orbitron = Orbitron({
    subsets: ["latin"],
    variable: "--font-orbitron",
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
    subsets: ["latin"],
    variable: "--font-rajdhani",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Lamborghini Huracán | Italian Supercar Excellence",
    description: "Experience the Lamborghini Huracán - V10 naturally aspirated power.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${orbitron.variable} ${rajdhani.variable}`}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
