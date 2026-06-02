import { useState } from "react";
import { Clock, Download, MessageCircle, Eye, Copy, Check, Plus, X, Trash2 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { ClientAlbum } from "@/data/index";
import { WEDDING_PHOTOS_EXPORT } from "@/data/adminExports";

function NewGalleryModal({ onSave, onClose }: { onSave: (a: ClientAlbum) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    clientName: "", title: "", date: "", password: "", expiryDate: "", description: "",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80",
  });

  const isValid = form.clientName && form.title && form.password && form.expiryDate;

  const handleSave = () => {
    const album: ClientAlbum = {
      id: `c${Date.now()}`,
      title: form.title,
      clientName: form.clientName,
      date: form.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      coverImage: form.coverImage,
      description: form.description,
      password: form.password,
      expiryDate: form.expiryDate,
      downloadHistory: [],
      comments: [
        {
          id: `cm${Date.now()}`,
          author: "Ammar Shahid",
          text: "Your gallery is ready! Take a look and let me know if you have any questions.",
          createdAt: new Date().toISOString(),
          isPhotographer: true,
        },
      ],
      photos: WEDDING_PHOTOS_EXPORT,
    };
    onSave(album);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-start justify-center overflow-y-auto py-10 px-4">
      <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-lg">
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8">
          <p className="text-white font-medium">New Client Gallery</p>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="p-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Client Name *</label>
              <input type="text" value={form.clientName} onChange={e => setForm(f => ({...f, clientName: e.target.value}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35"
                placeholder="Client or couple name" data-testid="input-client-name" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Gallery Title *</label>
              <input type="text" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35"
                placeholder="Wedding title, project name..." />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Shoot Date</label>
              <input type="text" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35"
                placeholder="June 1, 2025" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Expiry Date *</label>
              <input type="date" value={form.expiryDate} onChange={e => setForm(f => ({...f, expiryDate: e.target.value}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35"
                data-testid="input-expiry-date" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Gallery Password *</label>
            <input type="text" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-white/35"
              placeholder="e.g. smith2025" data-testid="input-gallery-password" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Cover Image URL</label>
            <input type="text" value={form.coverImage} onChange={e => setForm(f => ({...f, coverImage: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35"
              placeholder="https://images.unsplash.com/..." />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 resize-none"
              placeholder="Message to the client about their gallery..." />
          </div>
          <p className="text-white/20 text-xs">The gallery will be pre-populated with 10 sample wedding photos. Replace photos as needed.</p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-6 py-2.5 border border-white/12 text-white/40 text-xs uppercase tracking-wider hover:text-white transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} disabled={!isValid}
              className="px-6 py-2.5 bg-white text-black text-xs uppercase tracking-wider hover:bg-white/90 transition-all disabled:opacity-40 flex items-center gap-2"
              data-testid="button-create-gallery">
              <Check size={13} /> Create Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminClients() {
  const { clientAlbums, setClientAlbums } = useAdmin();
  const [copied, setCopied] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const copyPassword = (albumId: string, password: string) => {
    navigator.clipboard.writeText(password).catch(() => {});
    setCopied(albumId);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCreate = (album: ClientAlbum) => {
    setClientAlbums([...clientAlbums, album]);
    setShowNew(false);
  };

  const handleDelete = (id: string) => {
    setClientAlbums(clientAlbums.filter(a => a.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="p-8 md:p-10" data-testid="page-admin-clients">
      {showNew && <NewGalleryModal onSave={handleCreate} onClose={() => setShowNew(false)} />}

      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">Admin</p>
          <h1 className="font-serif text-4xl text-white">Client Galleries</h1>
        </div>
        <button onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs uppercase tracking-wider hover:bg-white/90 transition-all"
          data-testid="button-new-gallery">
          <Plus size={13} /> New Gallery
        </button>
      </div>

      <div className="space-y-px bg-white/5" data-testid="clients-list">
        {clientAlbums.map(album => {
          const days = Math.max(0, Math.ceil((new Date(album.expiryDate).getTime() - Date.now()) / 86400000));

          return (
            <div key={album.id} className="bg-[#0a0a0a] p-7" data-testid={`client-row-${album.id}`}>
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                <div className="w-24 h-18 overflow-hidden shrink-0">
                  <img src={`${album.coverImage.split("?")[0]}?w=200&q=70`} alt={album.title}
                    className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-white font-medium mb-0.5">{album.title}</p>
                      <p className="text-white/40 text-sm">{album.clientName} · {album.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border ${
                        days === 0 ? "border-red-500/30 text-red-400"
                        : days < 30 ? "border-amber-500/30 text-amber-400"
                        : "border-green-500/20 text-green-400/70"
                      }`}>
                        {days > 0 ? `${days} days left` : "Expired"}
                      </span>
                      <button onClick={() => setDeleteId(album.id)}
                        className="p-1.5 text-white/20 hover:text-red-400/60 transition-colors"
                        data-testid={`button-delete-gallery-${album.id}`}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Eye size={12} /><span>{album.photos.length} photos</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Download size={12} /><span>{album.downloadHistory.length} downloads</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <MessageCircle size={12} /><span>{album.comments.length} comments</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Clock size={12} />
                      <span>Expires {new Date(album.expiryDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-5">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2">
                      <span className="text-white/25 text-[10px] tracking-[0.2em] uppercase">Password:</span>
                      <span className="font-mono text-white/60 text-xs">{album.password}</span>
                      <button onClick={() => copyPassword(album.id, album.password)}
                        className="text-white/30 hover:text-white/60 transition-colors ml-1"
                        data-testid={`button-copy-${album.id}`}>
                        {copied === album.id ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <a href={`/client/${album.id}`} target="_blank"
                      className="flex items-center gap-2 px-4 py-2 border border-white/12 text-[10px] uppercase tracking-wider text-white/40 hover:text-white transition-colors"
                      data-testid={`link-view-gallery-${album.id}`}>
                      <Eye size={11} /> View Gallery
                    </a>
                  </div>
                </div>
              </div>

              {album.comments.length > 0 && (
                <div className="mt-5 border-t border-white/5 pt-5">
                  <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase mb-3">Recent comments</p>
                  <div className="space-y-2.5">
                    {album.comments.slice(-2).map(c => (
                      <div key={c.id} className="flex items-start gap-3">
                        <div className={`w-5 h-5 shrink-0 flex items-center justify-center text-[9px] ${
                          c.isPhotographer ? "bg-white text-black" : "bg-white/10 text-white"
                        }`}>
                          {c.author.charAt(0)}
                        </div>
                        <div>
                          <span className="text-white/40 text-xs font-medium">{c.author}</span>
                          <p className="text-white/25 text-xs leading-relaxed mt-0.5">{c.text.slice(0, 100)}{c.text.length > 100 ? "..." : ""}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="bg-[#111] border border-white/10 p-8 max-w-sm w-full text-center">
            <p className="font-serif text-xl text-white mb-3">Delete this gallery?</p>
            <p className="text-white/40 text-sm mb-8">The client will lose access to their photos.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)}
                className="px-6 py-2.5 border border-white/12 text-white/40 text-xs uppercase tracking-wider hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="px-6 py-2.5 bg-red-500/80 text-white text-xs uppercase tracking-wider hover:bg-red-500 transition-colors"
                data-testid="button-confirm-delete-gallery">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
