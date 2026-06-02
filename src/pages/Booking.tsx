import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getAvailableSlots, SERVICES } from "@/data/index";

type Step = "service" | "date" | "details" | "confirm";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function CalendarPicker({ onSelect, selected }: { onSelect: (d: string) => void; selected: string | null }) {
  const slots = getAvailableSlots();
  const availableDates = new Set(slots.map(s => s.date));

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const monthName = new Date(viewYear, viewMonth).toLocaleString("en-US", { month: "long", year: "numeric" });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  return (
    <div className="bg-white/3 border border-white/10 p-6" data-testid="calendar-picker">
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="text-white/40 hover:text-white transition-colors p-1">
          <ChevronLeft size={18} />
        </button>
        <p className="text-white text-sm tracking-wider">{monthName}</p>
        <button onClick={nextMonth} className="text-white/40 hover:text-white transition-colors p-1">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} className="text-center text-[10px] text-white/20 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isAvailable = availableDates.has(dateStr);
          const isSelected = selected === dateStr;
          const isPast = new Date(dateStr) <= today;
          return (
            <button
              key={dateStr}
              disabled={!isAvailable || isPast}
              onClick={() => onSelect(dateStr)}
              className={`aspect-square text-xs flex items-center justify-center transition-all ${
                isSelected
                  ? "bg-white text-black font-medium"
                  : isAvailable && !isPast
                  ? "text-white/80 hover:bg-white/10 border border-white/20"
                  : "text-white/15 cursor-not-allowed"
              }`}
              data-testid={`cal-day-${dateStr}`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex items-center gap-6 text-[10px] text-white/30">
        <span className="flex items-center gap-2"><span className="w-3 h-3 border border-white/20" />Available</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 bg-white" />Selected</span>
      </div>
    </div>
  );
}

export default function Booking() {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(".booking-header-el",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(".step-content",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [step]);

  const steps: { key: Step; label: string }[] = [
    { key: "service", label: "Service" },
    { key: "date", label: "Date" },
    { key: "details", label: "Details" },
    { key: "confirm", label: "Confirm" },
  ];
  const stepIndex = steps.findIndex(s => s.key === step);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6" data-testid="page-booking-submitted">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 border border-green-500/30 bg-green-500/10 flex items-center justify-center mx-auto mb-8">
            <Check size={24} className="text-green-400" />
          </div>
          <h2 className="font-serif text-4xl text-white mb-4">Booking Request Sent</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Thank you, <strong className="text-white">{form.name}</strong>. Your inquiry for <strong className="text-white">{selectedService}</strong> on <strong className="text-white">{selectedDate ? formatDate(selectedDate) : ""}</strong> has been received.
          </p>
          <p className="text-white/35 text-sm leading-relaxed">
            I'll be in touch within 24 hours to confirm availability and discuss the details.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-20" data-testid="page-booking">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        {/* Header */}
        <div className="mb-14">
          <p className="booking-header-el text-white/30 text-[10px] tracking-[0.35em] uppercase mb-4">Availability</p>
          <h1 className="booking-header-el font-serif text-5xl text-white mb-4">Book a Session</h1>
          <p className="booking-header-el text-white/40 text-sm leading-relaxed max-w-lg">
            Choose your service, check availability, and send an inquiry — I'll confirm within 24 hours.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-14 booking-header-el" data-testid="step-indicator">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div className={`flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-colors ${
                i < stepIndex ? "text-white/40" : i === stepIndex ? "text-white" : "text-white/20"
              }`}>
                <span className={`w-6 h-6 flex items-center justify-center text-xs border transition-colors ${
                  i < stepIndex ? "border-white/30 bg-white/10" : i === stepIndex ? "border-white bg-white text-black" : "border-white/15"
                }`}>
                  {i < stepIndex ? <Check size={10} /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className="w-8 sm:w-16 h-px bg-white/10 mx-2" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="step-content">
          {step === "service" && (
            <div data-testid="step-service">
              <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-8">Choose a service</p>
              <div className="grid md:grid-cols-2 gap-px bg-white/5">
                {SERVICES.map(svc => (
                  <button
                    key={svc.id}
                    onClick={() => { setSelectedService(svc.name); setStep("date"); }}
                    className={`group text-left bg-black p-7 hover:bg-white/3 transition-all flex items-start gap-5 ${
                      selectedService === svc.name ? "ring-1 ring-white/30" : ""
                    }`}
                    data-testid={`button-select-service-${svc.id}`}
                  >
                    <div className="flex-1">
                      <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1">{svc.category} — {svc.duration}</p>
                      <p className="font-serif text-xl text-white mb-1">{svc.name}</p>
                      <p className="text-white/40 text-xs leading-relaxed">{svc.description.slice(0, 80)}...</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white/30 text-[9px]">{svc.priceNote || "From"}</p>
                      <p className="font-serif text-xl text-white">${svc.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "date" && (
            <div data-testid="step-date">
              <div className="flex items-center justify-between mb-8">
                <p className="text-white/40 text-xs tracking-[0.25em] uppercase">Select an available date</p>
                <button onClick={() => setStep("service")} className="text-white/30 hover:text-white text-xs transition-colors">
                  ← Change service
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <CalendarPicker onSelect={setSelectedDate} selected={selectedDate} />
                <div>
                  <div className="border border-white/10 p-6 mb-6">
                    <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">Selected</p>
                    {selectedDate ? (
                      <>
                        <p className="font-serif text-xl text-white">{formatDate(selectedDate)}</p>
                        <p className="text-white/40 text-xs mt-1">
                          {getAvailableSlots().find(s => s.date === selectedDate)?.time}
                        </p>
                      </>
                    ) : (
                      <p className="text-white/30 text-sm">No date selected</p>
                    )}
                  </div>
                  <div className="border border-white/10 p-6">
                    <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">Service</p>
                    <p className="text-white text-sm">{selectedService}</p>
                  </div>
                  <button
                    onClick={() => setStep("details")}
                    disabled={!selectedDate}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-white text-black text-xs tracking-[0.18em] uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-all"
                    data-testid="button-next-details"
                  >
                    Continue <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "details" && (
            <div data-testid="step-details">
              <div className="flex items-center justify-between mb-8">
                <p className="text-white/40 text-xs tracking-[0.25em] uppercase">Your details</p>
                <button onClick={() => setStep("date")} className="text-white/30 hover:text-white text-xs transition-colors">
                  ← Change date
                </button>
              </div>
              <form className="max-w-xl space-y-5" onSubmit={e => { e.preventDefault(); setStep("confirm"); }}>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Full Name *</label>
                  <input type="text" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                    className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors"
                    placeholder="Your full name" data-testid="input-booking-name" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Email Address *</label>
                  <input type="email" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                    className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors"
                    placeholder="your@email.com" data-testid="input-booking-email" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Phone (optional)</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                    className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors"
                    placeholder="+1 (___) ___ ____" data-testid="input-booking-phone" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-3">Tell me about your project *</label>
                  <textarea required rows={4} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                    className="w-full bg-white/5 border border-white/12 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors resize-none"
                    placeholder="What are you envisioning?" data-testid="textarea-booking-message" />
                </div>
                <button type="submit"
                  disabled={!form.name || !form.email || !form.message}
                  className="flex items-center gap-2 px-10 py-3 bg-white text-black text-xs tracking-[0.18em] uppercase disabled:opacity-30 hover:bg-white/90 transition-all"
                  data-testid="button-next-confirm">
                  Review Booking <ArrowRight size={13} />
                </button>
              </form>
            </div>
          )}

          {step === "confirm" && (
            <div className="max-w-xl" data-testid="step-confirm">
              <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-8">Review & confirm</p>
              <div className="border border-white/12 divide-y divide-white/8 mb-8">
                {[
                  { label: "Service", value: selectedService },
                  { label: "Date", value: selectedDate ? formatDate(selectedDate) : "" },
                  { label: "Name", value: form.name },
                  { label: "Email", value: form.email },
                  { label: "Phone", value: form.phone || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between px-6 py-4">
                    <span className="text-white/30 text-xs tracking-[0.15em] uppercase">{label}</span>
                    <span className="text-white text-sm text-right max-w-xs">{value}</span>
                  </div>
                ))}
                <div className="px-6 py-4">
                  <p className="text-white/30 text-xs tracking-[0.15em] uppercase mb-2">Message</p>
                  <p className="text-white/60 text-sm leading-relaxed">{form.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setStep("details")} className="text-white/30 hover:text-white text-xs transition-colors">
                  ← Edit
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-10 py-3 bg-white text-black text-xs tracking-[0.18em] uppercase hover:bg-white/90 transition-all disabled:opacity-50"
                  data-testid="button-submit-booking"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>Confirm Booking <ArrowRight size={13} /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
