import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight, Star } from "lucide-react";
import { getServices, getTestimonials, CATEGORIES } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_CATS = ["All", "Weddings", "Portraits", "Editorial", "Commercial", "Landscapes"];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const services = getServices();
  const testimonials = getTestimonials();
  const filtered = activeCategory === "All" ? services : services.filter(s => s.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-header-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
      gsap.utils.toArray<Element>(".svc-card").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
      gsap.utils.toArray<Element>(".testimonial-card").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".svc-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" }
    );
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-background text-foreground pt-24" data-testid="page-services">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="py-16 border-b border-white/8 mb-14">
          <p className="svc-header-el text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Services</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="svc-header-el font-serif text-5xl md:text-6xl text-white">Rates & Packages</h1>
            <p className="svc-header-el text-white/40 text-sm max-w-sm leading-relaxed">
              Every project is different. Rates here are a starting point — get in touch for a tailored quote.
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="svc-header-el flex flex-wrap gap-2 mb-14">
          {SERVICE_CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs tracking-[0.18em] uppercase transition-all border ${
                activeCategory === cat
                  ? "border-white text-white bg-white/5"
                  : "border-white/15 text-white/40 hover:border-white/40 hover:text-white/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 mb-24">
          {filtered.map(svc => (
            <div
              key={svc.id}
              className={`svc-card group relative bg-black overflow-hidden flex flex-col ${svc.popular ? "ring-1 ring-white/20" : ""}`}
              data-testid={`card-service-${svc.id}`}
            >
              {svc.popular && (
                <div className="absolute top-4 right-4 z-10 bg-white text-black text-[9px] tracking-[0.2em] uppercase px-3 py-1">
                  Most popular
                </div>
              )}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={svc.coverImage}
                  alt={svc.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-1">{svc.category} — {svc.duration}</p>
                    <h3 className="font-serif text-2xl text-white">{svc.name}</h3>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    {svc.priceNote && <p className="text-white/30 text-[9px] tracking-wider uppercase">{svc.priceNote}</p>}
                    <p className="font-serif text-2xl text-white">${svc.price.toLocaleString()}</p>
                  </div>
                </div>

                <p className="text-white/45 text-sm leading-relaxed mb-6">{svc.description}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {svc.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                      <Check size={13} className="text-white/40 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {svc.addOns && svc.addOns.length > 0 && (
                  <div className="border-t border-white/8 pt-5 mb-6">
                    <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-3">Add-ons available</p>
                    <ul className="space-y-1.5">
                      {svc.addOns.map((a, i) => (
                        <li key={i} className="text-white/35 text-xs">{a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  to="/booking"
                  className="flex items-center justify-center gap-2 py-3 border border-white/15 text-xs tracking-[0.18em] uppercase text-white/50 hover:text-white hover:border-white/50 transition-all group/btn mt-auto"
                  data-testid={`link-book-${svc.id}`}
                >
                  Book This Package <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <section className="border-t border-white/8 py-24" data-testid="section-testimonials">
          <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase mb-12">Client Words</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card bg-black p-10 flex flex-col gap-5">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={11} className="text-white/40 fill-white/40" />
                  ))}
                </div>
                <p className="text-white/60 leading-relaxed text-sm flex-1">&ldquo;{t.text}&rdquo;</p>
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
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-white/5 text-center mb-16">
          <p className="font-serif text-4xl md:text-5xl text-white mb-6">Not sure which fits?</p>
          <p className="text-white/40 text-sm mb-10 max-w-md mx-auto leading-relaxed">
            Every project is different. Let's talk through what you're planning and find the right approach together.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
          >
            Start an Inquiry <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </main>
  );
}
