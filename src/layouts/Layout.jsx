const Layout = ({ children, courseName = "Opal Platform" }) => {
    return (
        <div className="bg-white text-text-primary font-sans min-h-screen flex flex-col">
            <main className="relative overflow-hidden flex-grow bg-slate-50">
                {/* Header with watermark */}
                <header className="relative pt-12 pb-16 text-center max-w-4xl mx-auto px-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center z-0 select-none pointer-events-none">
                        <span className="font-serif font-bold text-accent-gold block text-[clamp(5rem,15vw,10rem)] leading-none opacity-5 select-none whitespace-nowrap">
                            CASA <br /> TORRES
                        </span>
                    </div>
                </header>

                {/* Content Area */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 prose prose-lg prose-headings:font-serif prose-headings:text-text-primary prose-a:text-accent-gold hover:prose-a:text-text-primary transition-colors">
                    {children}
                </div>
                <br /><br />
            </main>



            <footer className="bg-bg-light py-16 border-t border-gray-100 text-center mt-auto">
                <h4 className="text-xl font-serif text-gray-800">
                    Curso: {courseName}
                </h4>

                <span className="text-lg font-serif text-gray-800 font-bold block mt-2"><a href="https://torrhez.myportfolio.com/" target="_blank">Casa Torres</a></span>
                <small className="block mt-2 text-text-secondary">Todos los derechos reservados &copy; 2026</small>

                <img src="/vite.svg" alt="Logo de Casa Torres" className="w-12 h-12 mx-auto pt-4" />
            </footer>
        </div>


    );
};

export default Layout;
