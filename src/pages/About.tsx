import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  { year: "2024", title: "Wedding Photographer of the Year", org: "Pakistan Wedding Awards" },
  { year: "2024", title: "Gold — Documentary Series, South Asia", org: "Asia Photography Awards" },
  { year: "2024", title: "Featured Photographer", org: "Aurora Magazine" },
  { year: "2023", title: "Selected Work — 'Terrain' Exhibition", org: "National Gallery of Pakistan" },
  { year: "2022", title: "Best Wedding Coverage", org: "Desi Weddings Magazine" },
];

const GEAR = [
  { label: "Primary", items: ["Sony A7R V", "Nikon Z8", "Sony A7S III (low light)"] },
  { label: "Lenses", items: ["Sony 35mm f/1.4 GM", "Sony 85mm f/1.4 GM", "Nikon 50mm f/1.2 S"] },
  { label: "Lighting", items: ["Godox AD600 Pro", "Godox V1 (on-camera)", "Profoto B2 (studio)"] },
];

const TIMELINE = [
  { year: "2012", text: "Started shooting street photography in the Walled City of Lahore with a borrowed Canon 450D." },
  { year: "2015", text: "First paid wedding commission. Shot sixty more that year. Haven't stopped since." },
  { year: "2018", text: "First editorial commission for a major Pakistani fashion brand. Expanded into commercial work." },
  { year: "2021", text: "First international assignment — editorial coverage in Dubai and Istanbul." },
  { year: "2023", text: "Twenty-day solo landscape project in Gilgit-Baltistan. Exhibited at the National Gallery of Pakistan." },
  { year: "2024", text: "Named Wedding Photographer of the Year by Pakistan Wedding Awards. Covered Pakistan Fashion Week." },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-hero-el",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.2 }
      );
      gsap.utils.toArray<Element>(".about-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 35 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground pt-20" data-testid="page-about">

      {/* Hero */}
      <div ref={heroRef} className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="about-hero-el text-white/30 text-[10px] tracking-[0.35em] uppercase mb-6">About</p>
          <h1 className="about-hero-el font-serif text-6xl md:text-7xl text-white leading-[0.95] mb-10">
            Ammar<br /><em className="text-white/50">Shahid</em>
          </h1>
          <p className="about-hero-el text-white/60 text-lg leading-relaxed mb-6">
            Lahore-based photographer with over a decade of work spanning weddings, editorial, portrait, and commercial photography — across Pakistan and internationally.
          </p>
          <p className="about-hero-el text-white/40 leading-relaxed mb-6">
            I started shooting at nineteen in the lanes of the Walled City — a borrowed Canon, no plan, and more curiosity than skill. Lahore taught me to see. Every project since has been an attempt to see more clearly.
          </p>
          <p className="about-hero-el text-white/40 leading-relaxed mb-10">
            I work in weddings because Pakistani ceremonies are among the most emotionally rich events a photographer can document — three days of colour, movement, and real feeling. I work in landscapes because Pakistan is one of the most visually extraordinary countries on earth and most of it goes unphotographed. I take commercial work seriously because clients deserve images that do real work in the world.
          </p>
          <Link to="/contact"
            className="about-hero-el inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors border-b border-white/20 pb-1 hover:border-white/60"
            data-testid="link-contact">
            Get in Touch <ArrowRight size={13} />
          </Link>
        </div>

        <div className="about-hero-el relative">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80"
              alt="Ammar Shahid"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-white/10" />
          <div className="absolute top-6 -right-4 bg-black border border-white/8 px-5 py-4">
            <p className="font-serif text-3xl text-white">12+</p>
            <p className="text-white/30 text-[10px] tracking-widest uppercase mt-1">Years Shooting</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <section className="py-24 px-6 md:px-10 border-t border-white/6" data-testid="section-timeline">
        <div className="max-w-7xl mx-auto">
          <p className="about-reveal text-white/30 text-[10px] tracking-[0.35em] uppercase mb-12">Career</p>
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="about-reveal flex gap-6 py-7 border-b border-white/6 last:border-0">
                <span className="font-mono text-white/20 text-sm shrink-0 w-12 pt-0.5">{item.year}</span>
                <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 md:px-10 border-t border-white/6 bg-white/[0.01]" data-testid="section-philosophy">
        <div className="max-w-4xl mx-auto text-center">
          <p className="about-reveal text-white/30 text-[10px] tracking-[0.35em] uppercase mb-8">Philosophy</p>
          <blockquote className="about-reveal font-serif text-3xl md:text-4xl text-white leading-snug mb-10">
            "Pakistan is one of the most visually extraordinary countries in the world.<br />
            <em className="text-white/50">Most of it goes unphotographed.</em>"
          </blockquote>
          <p className="about-reveal text-white/40 leading-relaxed max-w-xl mx-auto">
            I believe in photographs that are true to what they document. No heavy presets, no manufactured emotion — just the light that was there, the expression that happened, the moment as it was. That standard applies to weddings, landscapes, editorial, and everything in between.
          </p>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 px-6 md:px-10 border-t border-white/6" data-testid="section-awards">
        <div className="max-w-7xl mx-auto">
          <p className="about-reveal text-white/30 text-[10px] tracking-[0.35em] uppercase mb-10">Recognition</p>
          <div className="divide-y divide-white/6">
            {AWARDS.map((award, i) => (
              <div key={i} className="about-reveal flex items-start gap-8 py-6">
                <span className="text-white/20 font-mono text-sm w-12 shrink-0">{award.year}</span>
                <div>
                  <p className="text-white/70 text-sm">{award.title}</p>
                  <p className="text-white/30 text-xs mt-1 tracking-wider">{award.org}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link to="/press" className="about-reveal inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors">
              Full press & awards <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gear */}
      <section className="py-24 px-6 md:px-10 border-t border-white/6" data-testid="section-gear">
        <div className="max-w-7xl mx-auto">
          <p className="about-reveal text-white/30 text-[10px] tracking-[0.35em] uppercase mb-10">Equipment</p>
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {GEAR.map((g) => (
              <div key={g.label} className="about-reveal bg-black p-8">
                <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-5">{g.label}</p>
                <ul className="space-y-3">
                  {g.items.map((item) => (
                    <li key={item} className="text-white/55 text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 md:px-10 border-t border-white/6 text-center">
        <p className="about-reveal font-serif text-4xl text-white mb-5">Let's make something together.</p>
        <p className="about-reveal text-white/40 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
          Whether it's a wedding, a campaign, a portrait, or a landscape project — I'd love to hear what you're working on.
        </p>
        <Link to="/contact"
          className="about-reveal inline-flex items-center gap-3 px-10 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
          data-testid="link-cta-contact">
          Get in Touch <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
