import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'lambo-black': '#0d0d0d',
                'lambo-gold': '#D4AF37',
                'lambo-gold-bright': '#FFD700',
                'lambo-carbon': '#2a2a2a',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                '7xl': '5rem',
                '8xl': '6rem',
                '9xl': '8rem',
            },
            letterSpacing: {
                'luxury': '0.1em',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out',
                'fade-out': 'fadeOut 0.8s ease-out',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeOut: {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(-20px)' },
                },
                glowPulse: {
                    '0%, 100%': { textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' },
                    '50%': { textShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
