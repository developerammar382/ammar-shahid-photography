import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { getAlbumsByCategory, CATEGORIES } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const albums = getAlbumsByCategory(activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".portfolio-header-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".album-grid-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }
    );
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-background text-foreground pt-24" data-testid="page-portfolio">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="py-16 border-b border-white/8 mb-14">
          <p className="portfolio-header-el text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="portfolio-header-el font-serif text-5xl md:text-6xl text-white">Selected Work</h1>
            <p className="portfolio-header-el text-white/40 text-sm max-w-xs leading-relaxed">
              A decade of shooting across six countries — weddings, editorials, portraits, and everything in between.
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="portfolio-header-el flex flex-wrap gap-2 mb-14" data-testid="filter-categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs tracking-[0.18em] uppercase transition-all duration-200 border ${
                activeCategory === cat
                  ? "border-white text-white bg-white/5"
                  : "border-white/15 text-white/40 hover:border-white/40 hover:text-white/70"
              }`}
              data-testid={`button-filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 mb-24"
          data-testid="grid-albums"
        >
          {albums.map((album) => (
            <Link
              key={album.id}
              to={`/portfolio/${album.id}`}
              className="album-grid-card group relative overflow-hidden bg-black"
              data-testid={`card-album-${album.id}`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-350">
                <p className="text-white/50 text-[10px] tracking-[0.25em] uppercase mb-1">{album.category} — {album.date}</p>
                <p className="font-serif text-xl text-white mb-1">{album.title}</p>
                <p className="text-white/40 text-xs">{album.location}</p>
                <div className="flex items-center gap-2 mt-4 text-white/60 group-hover:text-white transition-colors">
                  <span className="text-[10px] tracking-[0.2em] uppercase">View Album</span>
                  <ArrowRight size={12} />
                </div>
              </div>
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white/30 text-xs">{album.photoCount} photos</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
