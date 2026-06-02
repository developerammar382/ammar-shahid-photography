import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    gsap.fromTo(".notfound-el",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6" data-testid="page-not-found">
      <div className="text-center max-w-lg">
        <p className="notfound-el font-serif text-[120px] md:text-[180px] leading-none text-white/6 select-none mb-0">
          404
        </p>
        <p className="notfound-el text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4 -mt-4">
          Page Not Found
        </p>
        <h1 className="notfound-el font-serif text-3xl md:text-4xl text-white mb-5 leading-snug">
          This page doesn&apos;t exist.
        </h1>
        <p className="notfound-el text-white/40 text-sm leading-relaxed mb-10">
          The link may be broken, or the page may have moved. Head back to the portfolio or reach out if you're looking for something specific.
        </p>
        <div className="notfound-el flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/"
            className="flex items-center gap-2 px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
            data-testid="link-home">
            <ArrowLeft size={13} /> Back Home
          </Link>
          <Link to="/portfolio"
            className="flex items-center gap-2 px-8 py-3.5 border border-white/20 text-xs tracking-[0.2em] uppercase text-white hover:border-white/50 transition-all"
            data-testid="link-portfolio">
            View Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
