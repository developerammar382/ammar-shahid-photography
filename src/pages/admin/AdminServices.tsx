import { useState } from "react";
import { Edit2, Check, X, Star } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { ServicePackage } from "@/data/index";

function ServiceEditModal({ service, onSave, onClose }: {
  service: ServicePackage;
  onSave: (s: ServicePackage) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: service.name,
    price: service.price,
    priceNote: service.priceNote || "",
    duration: service.duration,
    description: service.description,
    includes: service.includes.join("\n"),
    addOns: service.addOns?.join("\n") || "",
    popular: service.popular || false,
  });

  const handleSave = () => {
    onSave({
      ...service,
      name: form.name,
      price: Number(form.price),
      priceNote: form.priceNote || undefined,
      duration: form.duration,
      description: form.description,
      includes: form.includes.split("\n").map(s => s.trim()).filter(Boolean),
      addOns: form.addOns ? form.addOns.split("\n").map(s => s.trim()).filter(Boolean) : undefined,
      popular: form.popular,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-start justify-center overflow-y-auto py-10 px-4" data-testid="modal-service">
      <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-xl">
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8">
          <p className="text-white font-medium">Edit Package: {service.name}</p>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="p-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Package Name</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Base Price ($)</label>
              <input type="number" value={form.price} onChange={e => setForm(f => ({...f, price: Number(e.target.value)}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Price Note (optional)</label>
              <input type="text" value={form.priceNote} onChange={e => setForm(f => ({...f, priceNote: e.target.value}))}
                placeholder="e.g. Starting at"
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Duration</label>
              <input type="text" value={form.duration} onChange={e => setForm(f => ({...f, duration: e.target.value}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 resize-none" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Includes (one per line)</label>
            <textarea rows={6} value={form.includes} onChange={e => setForm(f => ({...f, includes: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 resize-none font-mono text-xs" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Add-ons (one per line)</label>
            <textarea rows={4} value={form.addOns} onChange={e => setForm(f => ({...f, addOns: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 resize-none font-mono text-xs" />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.popular} onChange={e => setForm(f => ({...f, popular: e.target.checked}))}
              className="w-4 h-4 accent-white" />
            <span className="text-white/60 text-sm">Mark as most popular</span>
          </label>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-6 py-2.5 border border-white/12 text-white/40 text-xs uppercase tracking-wider hover:text-white transition-colors">
              Cancel
            </button>
            <button onClick={handleSave}
              className="px-6 py-2.5 bg-white text-black text-xs uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-2"
              data-testid="button-save-service">
              <Check size={13} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminServices() {
  const { services, setServices } = useAdmin();
  const [editing, setEditing] = useState<ServicePackage | null>(null);

  const handleSave = (updated: ServicePackage) => {
    setServices(services.map(s => s.id === updated.id ? updated : s));
    setEditing(null);
  };

  return (
    <div className="p-8 md:p-10" data-testid="page-admin-services">
      {editing && <ServiceEditModal service={editing} onSave={handleSave} onClose={() => setEditing(null)} />}

      <div className="mb-10">
        <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">Admin</p>
        <h1 className="font-serif text-4xl text-white">Services & Pricing</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-white/5" data-testid="services-grid">
        {services.map(svc => (
          <div key={svc.id} className={`bg-[#0a0a0a] p-7 relative ${svc.popular ? "ring-1 ring-white/15" : ""}`}
            data-testid={`service-row-${svc.id}`}>
            {svc.popular && (
              <span className="absolute top-4 right-14 flex items-center gap-1 text-[9px] tracking-[0.15em] uppercase text-amber-400/70">
                <Star size={9} fill="currentColor" /> Popular
              </span>
            )}
            <button onClick={() => setEditing(svc)}
              className="absolute top-4 right-4 p-2 text-white/25 hover:text-white/60 transition-colors"
              data-testid={`button-edit-service-${svc.id}`}>
              <Edit2 size={13} />
            </button>
            <div className="flex items-start justify-between mb-4 pr-8">
              <div>
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1">{svc.category} — {svc.duration}</p>
                <p className="font-serif text-xl text-white">{svc.name}</p>
              </div>
              <div className="text-right">
                {svc.priceNote && <p className="text-white/25 text-[9px]">{svc.priceNote}</p>}
                <p className="font-serif text-2xl text-white">${svc.price.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-4">{svc.description}</p>
            <ul className="space-y-1.5">
              {svc.includes.slice(0, 4).map((item, i) => (
                <li key={i} className="text-white/35 text-xs flex items-start gap-2">
                  <Check size={11} className="text-white/25 mt-0.5 shrink-0" /> {item}
                </li>
              ))}
              {svc.includes.length > 4 && (
                <li className="text-white/20 text-xs">+{svc.includes.length - 4} more...</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
