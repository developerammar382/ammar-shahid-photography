import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDownRight, Star, Clock } from "lucide-react";
import { getAlbums, getTestimonials, getServices, getBlogPosts } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obj = { value: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(obj, {
          value: end, duration,
          ease: "power2.out",
          onUpdate: () => setVal(Math.floor(obj.value)),
        });
      },
    });
    return () => st.kill();
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Home() {
  const albums = getAlbums().slice(0, 4);
  const testimonials = getTestimonials().slice(0, 3);
  const featuredServices = getServices().slice(0, 3);
  const latestPosts = getBlogPosts().slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-line",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(".hero-sub",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out", delay: 1 }
      );
      gsap.fromTo(".hero-scroll-hint",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out", delay: 1.5 }
      );
      gsap.utils.toArray<Element>(".reveal-up").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
      gsap.utils.toArray<Element>(".reveal-stagger").forEach((group) => {
        gsap.fromTo((group as HTMLElement).children,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, stagger: 0.09, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 85%", toggleActions: "play none none none" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-background text-foreground min-h-screen" data-testid="page-home">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end pb-20 px-6 md:px-16 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=85)` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        <div className="relative z-10 max-w-5xl">
          <p className="hero-sub text-white/40 text-xs tracking-[0.35em] uppercase mb-8">
            Ammar Shahid — Photography & Visual Storytelling
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[108px] leading-[0.9] text-white mb-10">
            <span className="hero-line block">Pakistan</span>
            <span className="hero-line block italic text-white/70">through</span>
            <span className="hero-line block">the lens.</span>
          </h1>
          <div className="hero-sub flex items-center gap-8 mt-10">
            <Link to="/portfolio"
              className="flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1 hover:border-white transition-all group"
              data-testid="link-hero-portfolio">
              View Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/booking"
              className="text-sm tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
              data-testid="link-hero-booking">
              Book a Session
            </Link>
          </div>
        </div>
        <div className="hero-scroll-hint absolute bottom-8 right-10 flex items-center gap-2 text-white/30">
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <ArrowDownRight size={14} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-white/6 py-14 px-6 md:px-16" data-testid="section-stats">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/6">
          {[
            { end: 12, suffix: "+", label: "Years Shooting" },
            { end: 300, suffix: "+", label: "Weddings Covered" },
            { end: 4, suffix: "", label: "Provinces Worked" },
            { end: 8, suffix: "", label: "Awards & Features" },
          ].map((stat, i) => (
            <div key={i} className="px-8 md:px-12 py-6 text-center first:pl-0 last:pr-0">
              <p className="font-serif text-4xl md:text-5xl text-white mb-2">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </p>
              <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="py-28 px-6 md:px-16" data-testid="section-featured">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up flex items-end justify-between mb-16">
            <div>
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Selected Work</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Recent Projects</h2>
            </div>
            <Link to="/portfolio"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors group"
              data-testid="link-all-work">
              All Work <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {albums.map((album, i) => (
              <Link key={album.id} to={`/portfolio/${album.id}`}
                className="reveal-up group relative overflow-hidden aspect-[4/3] bg-black"
                data-testid={`card-album-${album.id}`}>
                <img src={album.coverImage} alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white/60 text-[10px] tracking-[0.25em] uppercase mb-1">{album.category}</p>
                  <p className="font-serif text-2xl text-white">{album.title}</p>
                  <p className="text-white/50 text-xs mt-1">{album.location}</p>
                </div>
                <div className="absolute top-5 left-5">
                  <span className="text-white/30 text-xs tabular-nums font-mono">0{i + 1}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 md:hidden text-center">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors">
              View All Work <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-24 px-6 md:px-16 border-t border-white/5" data-testid="section-services-preview">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up flex items-end justify-between mb-14">
            <div>
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">What I Offer</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Services</h2>
            </div>
            <Link to="/services"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors group">
              All Packages <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/5 reveal-stagger">
            {featuredServices.map(svc => (
              <Link key={svc.id} to="/services"
                className="group bg-black p-9 flex flex-col justify-between hover:bg-white/3 transition-colors">
                <div>
                  <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-2">{svc.category}</p>
                  <h3 className="font-serif text-2xl text-white mb-3">{svc.name}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{svc.description.slice(0, 90)}…</p>
                </div>
                <div className="flex items-end justify-between mt-10">
                  <div>
                    {svc.priceNote && <p className="text-white/25 text-[9px] tracking-wider uppercase">{svc.priceNote}</p>}
                    <p className="font-serif text-2xl text-white">${svc.price.toLocaleString()}</p>
                  </div>
                  <ArrowRight size={16} className="text-white/25 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="py-28 px-6 md:px-16 border-t border-white/5" data-testid="section-about-teaser">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="reveal-up text-white/30 text-xs tracking-[0.3em] uppercase mb-6">About</p>
            <h2 className="reveal-up font-serif text-4xl md:text-5xl text-white leading-snug mb-8">
              Pakistan is a<br /><em className="text-white/60">photographer's country.</em>
            </h2>
            <p className="reveal-up text-white/50 leading-relaxed mb-6">
              Based in Lahore, working across Pakistan and internationally. A decade spent documenting the country's weddings, landscapes, people, and stories — from the lanes of the Walled City to the peaks of Gilgit-Baltistan.
            </p>
            <p className="reveal-up text-white/40 leading-relaxed mb-10 text-sm">
              I believe in photographs that are true to what they show. No heavy filters, no manufactured mood — just the light that was there, the expression that happened, the moment as it was.
            </p>
            <Link to="/about"
              className="reveal-up inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors border-b border-white/20 pb-1 hover:border-white/60"
              data-testid="link-about">
              Read More <ArrowRight size={13} />
            </Link>
          </div>
          <div className="reveal-up relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80" alt="Ammar Shahid"
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-white/10" />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 md:px-16 border-t border-white/5 bg-white/[0.01]" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up mb-14 flex items-end justify-between">
            <div>
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Kind Words</p>
              <h2 className="font-serif text-4xl text-white">From Clients</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/5 reveal-stagger">
            {testimonials.map(t => (
              <div key={t.id} className="bg-black p-10 flex flex-col gap-5">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={10} className="text-white/35 fill-white/35" />
                  ))}
                </div>
                <p className="text-white/55 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  {t.avatar && (
                    <div className="w-9 h-9 overflow-hidden shrink-0">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="text-white text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNAL PREVIEW ── */}
      <section className="py-24 px-6 md:px-16 border-t border-white/5" data-testid="section-journal-preview">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up flex items-end justify-between mb-14">
            <div>
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Journal</p>
              <h2 className="font-serif text-4xl text-white">Behind the Work</h2>
            </div>
            <Link to="/journal"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors group">
              All Posts <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/5 reveal-stagger">
            {latestPosts.map(post => (
              <Link key={post.id} to={`/journal/${post.slug}`} className="group bg-black overflow-hidden">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={post.coverImage} alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-2">{post.category}</p>
                  <p className="font-serif text-xl text-white mb-2 group-hover:text-white/80 transition-colors">{post.title}</p>
                  <p className="text-white/35 text-sm line-clamp-2 leading-relaxed">{post.subtitle}</p>
                  <div className="flex items-center gap-2 mt-5 text-white/25 text-xs">
                    <Clock size={11} /><span>{post.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS STRIP ── */}
      <section className="py-16 px-6 md:px-16 border-t border-white/5" data-testid="section-press-strip">
        <div className="max-w-7xl mx-auto">
          <p className="reveal-up text-center text-white/20 text-[10px] tracking-[0.4em] uppercase mb-10">As Featured In</p>
          <div className="reveal-stagger flex flex-wrap justify-center gap-x-14 gap-y-4">
            {["Aurora Magazine", "Dawn Images", "Instep — The News", "National Gallery of Pakistan", "Asia Photography Awards", "Pakistan Wedding Awards"].map(pub => (
              <span key={pub} className="text-white/20 text-sm tracking-wider hover:text-white/50 transition-colors cursor-default">{pub}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 md:px-16 border-t border-white/5 text-center" data-testid="section-cta">
        <p className="reveal-up text-white/30 text-xs tracking-[0.35em] uppercase mb-6">Start a Project</p>
        <h2 className="reveal-up font-serif text-5xl md:text-7xl text-white mb-10">
          Aaj baat<br /><em className="text-white/50">karte hain.</em>
        </h2>
        <div className="reveal-up flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/booking"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
            data-testid="link-cta-booking">
            Book a Session <ArrowRight size={14} />
          </Link>
          <Link to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-xs tracking-[0.2em] uppercase text-white hover:border-white/50 transition-all"
            data-testid="link-cta-contact">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
