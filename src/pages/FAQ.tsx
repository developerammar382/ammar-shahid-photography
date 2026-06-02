import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ChevronDown, ArrowRight } from "lucide-react";
import { getFAQItems } from "@/data/index";

const CATEGORIES = ["All", "Booking", "Process", "Delivery"];

export default function FAQ() {
  const items = getFAQItems();
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = activeCategory === "All" ? items : items.filter(i => i.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-header-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  return (
    <main className="min-h-screen bg-background text-foreground pt-24" data-testid="page-faq">
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="py-16 border-b border-white/8 mb-14">
          <p className="faq-header-el text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Questions</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="faq-header-el font-serif text-5xl md:text-6xl text-white">FAQ</h1>
            <p className="faq-header-el text-white/40 text-sm max-w-xs leading-relaxed">
              Answers to the questions I'm most frequently asked. Still wondering? Just reach out.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="faq-header-el flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs tracking-[0.18em] uppercase border transition-all ${
                activeCategory === cat
                  ? "border-white text-white bg-white/5"
                  : "border-white/15 text-white/40 hover:border-white/40 hover:text-white/70"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="divide-y divide-white/6 mb-24" data-testid="faq-list">
          {filtered.map(item => (
            <div key={item.id} data-testid={`faq-item-${item.id}`}>
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-start justify-between gap-8 py-7 text-left group"
                data-testid={`faq-toggle-${item.id}`}>
                <div className="flex items-start gap-5">
                  <span className="text-white/15 text-[10px] font-mono mt-1 shrink-0 w-6 text-right">
                    {String(filtered.indexOf(item) + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-serif text-lg leading-snug transition-colors ${
                    openId === item.id ? "text-white" : "text-white/70 group-hover:text-white"
                  }`}>
                    {item.question}
                  </span>
                </div>
                <ChevronDown size={16}
                  className={`text-white/30 shrink-0 mt-1 transition-transform duration-300 ${openId === item.id ? "rotate-180 text-white/60" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openId === item.id ? "max-h-96 pb-7" : "max-h-0"
              }`}>
                <p className="text-white/50 leading-relaxed text-[15px] ml-11 pr-8"
                  data-testid={`faq-answer-${item.id}`}>
                  {item.answer}
                </p>
                <div className="ml-11 mt-3">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/20 border border-white/10 px-2.5 py-1">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <section className="border-t border-white/6 py-20 text-center mb-10">
          <p className="font-serif text-3xl text-white mb-4">Still have questions?</p>
          <p className="text-white/40 text-sm mb-10 leading-relaxed max-w-sm mx-auto">
            I'm happy to chat through any specifics. Reach out via the contact form or book a discovery call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-all">
              Send a Message <ArrowRight size={13} />
            </Link>
            <Link to="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-xs tracking-[0.2em] uppercase text-white hover:border-white/50 transition-all">
              Book a Session
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
