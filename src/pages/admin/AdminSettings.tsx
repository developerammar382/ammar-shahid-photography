import { useState } from "react";
import { Check, Save, Globe, Mail, Phone, MapPin, AtSign } from "lucide-react";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/data/index";

function Field({ label, value, onChange, multiline = false, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string;
}) {
  const cls = "w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 transition-colors placeholder-white/20";
  return (
    <div>
      <label className="block text-[10px] tracking-[0.22em] uppercase text-white/35 mb-2">{label}</label>
      {multiline
        ? <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none`} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "contact" | "social" | "seo">("profile");

  const set = (key: keyof SiteSettings) => (value: string) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { key: "profile" as const, label: "Profile" },
    { key: "contact" as const, label: "Contact" },
    { key: "social" as const, label: "Social" },
    { key: "seo" as const, label: "SEO" },
  ];

  return (
    <div className="p-8 md:p-10" data-testid="page-admin-settings">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">Admin</p>
          <h1 className="font-serif text-4xl text-white">Site Settings</h1>
          <p className="text-white/30 text-xs mt-2">Changes apply to the live site appearance and metadata.</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.18em] uppercase transition-all ${
            saved ? "bg-green-500/20 border border-green-500/30 text-green-400" : "bg-white text-black hover:bg-white/90"
          }`}
          data-testid="button-save-settings">
          {saved ? <><Check size={13} /> Saved</> : <><Save size={13} /> Save Changes</>}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-white/8 mb-10">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-3 text-xs tracking-[0.18em] uppercase transition-colors border-b-2 -mb-px ${
              activeTab === tab.key ? "border-white text-white" : "border-transparent text-white/30 hover:text-white/60"
            }`}
            data-testid={`settings-tab-${tab.key}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-xl">

        {/* Profile tab */}
        {activeTab === "profile" && (
          <div className="space-y-5" data-testid="settings-profile">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
                  alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white/70 text-sm">{settings.name}</p>
                <p className="text-white/30 text-xs mt-0.5">{settings.tagline}</p>
                <button className="mt-2 text-[10px] tracking-wider uppercase text-white/30 border border-white/15 px-3 py-1.5 hover:text-white/60 transition-colors">
                  Change Photo
                </button>
              </div>
            </div>
            <Field label="Full Name" value={settings.name} onChange={set("name")} />
            <Field label="Tagline / Title" value={settings.tagline} onChange={set("tagline")}
              placeholder="Photography & Editorial" />
            <Field label="Short Bio" value={settings.bio} onChange={set("bio")} multiline
              placeholder="One or two sentences about your work..." />
            <Field label="Availability" value={settings.availability} onChange={set("availability")}
              placeholder="Currently booking 2025–2026" />
          </div>
        )}

        {/* Contact tab */}
        {activeTab === "contact" && (
          <div className="space-y-5" data-testid="settings-contact">
            <div className="flex items-center gap-3 mb-6 py-4 border-b border-white/6">
              <Mail size={14} className="text-white/30" />
              <p className="text-white/50 text-xs">Contact details shown on the contact page and footer.</p>
            </div>
            <Field label="Email Address" value={settings.email} onChange={set("email")}
              placeholder="hello@example.com" />
            <Field label="Phone Number" value={settings.phone} onChange={set("phone")}
              placeholder="+1 (___) ___ ____" />
            <Field label="Studio Location" value={settings.location} onChange={set("location")}
              placeholder="City, State" />
          </div>
        )}

        {/* Social tab */}
        {activeTab === "social" && (
          <div className="space-y-5" data-testid="settings-social">
            <div className="flex items-center gap-3 mb-6 py-4 border-b border-white/6">
              <AtSign size={14} className="text-white/30" />
              <p className="text-white/50 text-xs">Social handles shown in the footer and about page.</p>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.22em] uppercase text-white/35 mb-2">Instagram</label>
              <div className="flex items-center bg-white/5 border border-white/12 focus-within:border-white/35 transition-colors">
                <span className="px-4 text-white/25 text-sm border-r border-white/10 py-3">@</span>
                <input type="text" value={settings.instagram.replace("@", "")}
                  onChange={e => set("instagram")(`@${e.target.value}`)}
                  className="flex-1 bg-transparent px-4 py-3 text-white text-sm focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.22em] uppercase text-white/35 mb-2">Behance</label>
              <div className="flex items-center bg-white/5 border border-white/12 focus-within:border-white/35 transition-colors">
                <span className="px-4 text-white/25 text-sm border-r border-white/10 py-3 text-xs">behance.net/</span>
                <input type="text" value={settings.behance}
                  onChange={e => set("behance")(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-white text-sm focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.22em] uppercase text-white/35 mb-2">LinkedIn</label>
              <div className="flex items-center bg-white/5 border border-white/12 focus-within:border-white/35 transition-colors">
                <span className="px-4 text-white/25 text-sm border-r border-white/10 py-3 text-xs">linkedin.com/in/</span>
                <input type="text" value={settings.linkedin}
                  onChange={e => set("linkedin")(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-white text-sm focus:outline-none" />
              </div>
            </div>
          </div>
        )}

        {/* SEO tab */}
        {activeTab === "seo" && (
          <div className="space-y-5" data-testid="settings-seo">
            <div className="flex items-center gap-3 mb-6 py-4 border-b border-white/6">
              <Globe size={14} className="text-white/30" />
              <p className="text-white/50 text-xs">Controls what search engines and social platforms show when linking your site.</p>
            </div>
            <Field label="Page Title" value={settings.metaTitle} onChange={set("metaTitle")}
              placeholder="Your Name Photography — Location" />
            <div className="text-white/20 text-[10px] flex justify-between">
              <span>Recommended: 50–60 characters</span>
              <span className={settings.metaTitle.length > 60 ? "text-amber-400" : ""}>{settings.metaTitle.length}</span>
            </div>
            <Field label="Meta Description" value={settings.metaDescription} onChange={set("metaDescription")} multiline
              placeholder="A short description of your photography business..." />
            <div className="text-white/20 text-[10px] flex justify-between">
              <span>Recommended: 120–160 characters</span>
              <span className={settings.metaDescription.length > 160 ? "text-amber-400" : ""}>{settings.metaDescription.length}</span>
            </div>

            {/* Preview card */}
            <div className="mt-8 border border-white/10 p-5 rounded-none bg-white/3">
              <p className="text-white/25 text-[10px] tracking-wider uppercase mb-4">Search preview</p>
              <p className="text-blue-400/80 text-sm mb-0.5 truncate">https://ammarshahid.pk</p>
              <p className="text-white/80 text-base mb-1">{settings.metaTitle || "Page Title"}</p>
              <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">{settings.metaDescription || "Meta description..."}</p>
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-white/6 flex justify-end">
          <button onClick={handleSave}
            className={`flex items-center gap-2 px-8 py-3 text-xs tracking-[0.18em] uppercase transition-all ${
              saved ? "bg-green-500/20 border border-green-500/30 text-green-400" : "bg-white text-black hover:bg-white/90"
            }`}>
            {saved ? <><Check size={13} /> Saved!</> : <><Save size={13} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
