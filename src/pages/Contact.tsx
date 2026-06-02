import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowRight, Check } from "lucide-react";

const SERVICES = [
  "Wedding Photography (Full Package)",
  "Mehndi / Single Event",
  "Portrait Session",
  "Fashion & Editorial",
  "Commercial / Brand",
  "Landscape / Fine Art",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", date: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6" data-testid="page-contact-submitted">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 border border-green-500/30 bg-green-500/10 flex items-center justify-center mx-auto mb-8">
            <Check size={24} className="text-green-400" />
          </div>
          <h2 className="font-serif text-4xl text-white mb-4">Message Received</h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Shukriya, <strong className="text-white">{form.name}</strong>. I'll review your inquiry and get back to you within 24–48 hours. Looking forward to learning more about your project.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-20" data-testid="page-contact">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-5 gap-20">

          {/* Left info */}
          <div className="md:col-span-2">
            <p className="contact-el text-white/30 text-[10px] tracking-[0.35em] uppercase mb-6">Contact</p>
            <h1 className="contact-el font-serif text-5xl text-white leading-snug mb-8">
              Baat<br />karte<br /><em className="text-white/50">hain.</em>
            </h1>
            <p className="contact-el text-white/45 text-sm leading-relaxed mb-10">
              I take on a limited number of projects each season. Whether it's a multi-day wedding, a fashion campaign, a portrait session, or a landscape trip into the north — I'd love to hear what you have in mind.
            </p>

            <div className="contact-el space-y-5 text-sm">
              <div>
                <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-1">Email</p>
                <a href="mailto:hello@ammarshahid.pk" className="text-white/60 hover:text-white transition-colors" data-testid="link-email">
                  hello@ammarshahid.pk
                </a>
              </div>
              <div>
                <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-1">WhatsApp / Phone</p>
                <a href="tel:+923001234567" className="text-white/60 hover:text-white transition-colors">
                  +92 300 123 4567
                </a>
              </div>
              <div>
                <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-1">Studio</p>
                <span className="text-white/60">DHA Phase 5, Lahore, Pakistan</span>
              </div>
              <div>
                <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-1">Availability</p>
                <span className="text-white/60">Booking Nov 2025 – Feb 2026</span>
              </div>
              <div>
                <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-1">Travel</p>
                <span className="text-white/60">Available nationwide & internationally</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="contact-el">
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Your Name *</label>
                  <input name="name" type="text" value={form.name} onChange={handleChange} required
                    placeholder="Full name"
                    className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors"
                    data-testid="input-name" />
                </div>
                <div className="contact-el">
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors"
                    data-testid="input-email" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="contact-el">
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">WhatsApp / Phone</label>
                  <input name="phone" type="text" value={form.phone} onChange={handleChange}
                    placeholder="+92 3__ ___ ____"
                    className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors" />
                </div>
                <div className="contact-el">
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Service Type</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white text-sm focus:outline-none focus:border-white/35 transition-colors appearance-none"
                    data-testid="select-service">
                    <option value="" className="bg-black">Select a service</option>
                    {SERVICES.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="contact-el">
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Event / Project Date</label>
                <input name="date" type="text" value={form.date} onChange={handleChange}
                  placeholder="Month & Year (e.g. December 2025)"
                  className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors"
                  data-testid="input-date" />
              </div>

              <div className="contact-el">
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Tell me about your project *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={6}
                  placeholder="Share as much as you'd like — venue, city, guest count, style references, anything that helps me understand what you're planning."
                  className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors resize-none"
                  data-testid="textarea-message" />
              </div>

              <div className="contact-el">
                <button type="submit"
                  disabled={!form.name || !form.email || !form.message || loading}
                  className="flex items-center gap-3 px-10 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  data-testid="button-submit-contact">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>Send Inquiry <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
