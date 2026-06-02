import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Award, Mic, BookOpen, Image } from "lucide-react";
import { getPressFeatures, type PressFeature } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ICON: Record<PressFeature["category"], typeof Award> = {
  Award: Award,
  Interview: Mic,
  Feature: BookOpen,
  Exhibition: Image,
};

const CATEGORY_COLOR: Record<PressFeature["category"], string> = {
  Award: "text-amber-400/70 border-amber-400/20",
  Interview: "text-blue-400/70 border-blue-400/20",
  Feature: "text-white/50 border-white/15",
  Exhibition: "text-purple-400/70 border-purple-400/20",
};

export default function Press() {
  const features = getPressFeatures();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".press-header-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
      gsap.utils.toArray<Element>(".press-card").forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const awards = features.filter(f => f.category === "Award");
  const rest = features.filter(f => f.category !== "Award");

  return (
    <main className="min-h-screen bg-background text-foreground pt-24" data-testid="page-press">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="py-16 border-b border-white/8 mb-16">
          <p className="press-header-el text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Recognition</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="press-header-el font-serif text-5xl md:text-6xl text-white">Press & Awards</h1>
            <p className="press-header-el text-white/40 text-sm max-w-xs leading-relaxed">
              Publications, features, awards, and exhibitions from 2021 to present.
            </p>
          </div>
        </div>

        {/* Publications strip */}
        <div className="press-header-el mb-16 py-10 border-y border-white/6">
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-8 text-center">Featured In</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {["Vogue Italia", "Aperture Magazine", "Brides Magazine", "The New Yorker", "Photography Masters Cup", "Wedding Photographer Journal"].map(pub => (
              <span key={pub} className="text-white/30 text-sm tracking-wider">{pub}</span>
            ))}
          </div>
        </div>

        {/* Awards highlight */}
        {awards.length > 0 && (
          <section className="mb-20" data-testid="section-awards">
            <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-8">Awards</p>
            <div className="grid md:grid-cols-2 gap-px bg-white/5">
              {awards.map(f => {
                const Icon = CATEGORY_ICON[f.category];
                return (
                  <div key={f.id} className="press-card group bg-black overflow-hidden flex flex-col md:flex-row">
                    {f.coverImage && (
                      <div className="md:w-48 aspect-square md:aspect-auto overflow-hidden shrink-0">
                        <img src={`${f.coverImage.split("?")[0]}?w=400&q=80`} alt={f.publication}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-400" />
                      </div>
                    )}
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase border px-2.5 py-1 ${CATEGORY_COLOR[f.category]}`}>
                            <Icon size={9} /> {f.category}
                          </span>
                          <span className="text-white/20 text-[10px]">{f.date}</span>
                        </div>
                        <p className="text-white/40 text-xs tracking-wider uppercase mb-2">{f.publication}</p>
                        <h3 className="font-serif text-xl text-white mb-3 leading-snug">{f.title}</h3>
                        <p className="text-white/45 text-sm leading-relaxed">{f.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Features & interviews */}
        <section className="mb-24" data-testid="section-features">
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-8">Features & Exhibitions</p>
          <div className="space-y-px bg-white/5">
            {rest.map(f => {
              const Icon = CATEGORY_ICON[f.category];
              return (
                <div key={f.id} className="press-card group bg-black flex flex-col md:flex-row md:items-center gap-0">
                  {f.coverImage && (
                    <div className="md:w-36 h-36 overflow-hidden shrink-0">
                      <img src={`${f.coverImage.split("?")[0]}?w=300&q=80`} alt={f.publication}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-400" />
                    </div>
                  )}
                  <div className="p-7 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`flex items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase border px-2 py-0.5 ${CATEGORY_COLOR[f.category]}`}>
                        <Icon size={9} /> {f.category}
                      </span>
                      <span className="text-white/20 text-[10px]">{f.date}</span>
                    </div>
                    <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase mb-1.5">{f.publication}</p>
                    <h3 className="font-serif text-xl text-white mb-2">{f.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center mb-10">
          <p className="font-serif text-4xl text-white mb-5">Working on a story?</p>
          <p className="text-white/40 text-sm mb-10 max-w-md mx-auto leading-relaxed">
            Press inquiries, interview requests, and licensing can be directed to the contact form.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-xs tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300">
            Contact for Press <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </main>
  );
}
