export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-black relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-50 text-sm font-rajdhani">
                <div className="text-white">
                    &copy; {new Date().getFullYear()} AUTOMOBILI LAMBORGHINI S.P.A.
                </div>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gold transition-colors">PRIVACY</a>
                    <a href="#" className="hover:text-gold transition-colors">LEGAL</a>
                    <a href="#" className="hover:text-gold transition-colors">CAREERS</a>
                </div>
            </div>
        </footer>
    );
}
