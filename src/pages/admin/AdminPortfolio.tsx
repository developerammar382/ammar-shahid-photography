import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Plus, Edit2, Trash2, Check, X, Image as ImageIcon } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { Album } from "@/data/index";

const CATEGORIES = ["Weddings", "Editorial", "Commercial", "Portraits", "Landscapes"];

function AlbumModal({ album, onSave, onClose }: {
  album: Partial<Album>; onSave: (a: Album) => void; onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: album.title || "",
    category: album.category || "Weddings",
    date: album.date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    location: album.location || "",
    description: album.description || "",
    coverImage: album.coverImage || "",
  });

  const handleSave = () => {
    onSave({
      id: album.id || `a${Date.now()}`,
      title: form.title,
      category: form.category,
      date: form.date,
      location: form.location,
      description: form.description,
      coverImage: form.coverImage || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
      photoCount: album.photos?.length || 0,
      photos: album.photos || [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-start justify-center overflow-y-auto py-10 px-4">
      <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-lg">
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8">
          <p className="text-white font-medium">{album.id ? "Edit Album" : "New Album"}</p>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="p-7 space-y-5">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Title *</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35"
              placeholder="Album title" data-testid="input-album-title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none appearance-none">
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Date</label>
              <input type="text" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35"
                placeholder="Month YYYY" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Location</label>
            <input type="text" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35"
              placeholder="City, Country" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Cover Image URL</label>
            <input type="text" value={form.coverImage} onChange={e => setForm(f => ({...f, coverImage: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35"
              placeholder="https://images.unsplash.com/..." />
            {form.coverImage && (
              <div className="mt-2 aspect-video overflow-hidden">
                <img src={`${form.coverImage.split("?")[0]}?w=600&q=70`} alt="Preview"
                  className="w-full h-full object-cover opacity-70" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 resize-none" />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-6 py-2.5 border border-white/12 text-white/40 text-xs uppercase tracking-wider hover:text-white transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} disabled={!form.title}
              className="px-6 py-2.5 bg-white text-black text-xs uppercase tracking-wider hover:bg-white/90 transition-all disabled:opacity-40 flex items-center gap-2"
              data-testid="button-save-album">
              <Check size={13} /> Save Album
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPortfolio() {
  const { portfolioAlbums, setPortfolioAlbums } = useAdmin();
  const [editAlbum, setEditAlbum] = useState<Partial<Album> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState("All");

  const filtered = filterCat === "All" ? portfolioAlbums : portfolioAlbums.filter(a => a.category === filterCat);

  const handleSave = (album: Album) => {
    setPortfolioAlbums(prev =>
      prev.some(a => a.id === album.id) ? prev.map(a => a.id === album.id ? album : a) : [...prev, album]
    );
    setEditAlbum(null);
  };

  const handleDelete = (id: string) => {
    setPortfolioAlbums(prev => prev.filter(a => a.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="p-8 md:p-10" data-testid="page-admin-portfolio">
      {editAlbum !== null && (
        <AlbumModal album={editAlbum} onSave={handleSave} onClose={() => setEditAlbum(null)} />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">Admin</p>
          <h1 className="font-serif text-4xl text-white">Portfolio</h1>
        </div>
        <button onClick={() => setEditAlbum({})}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs uppercase tracking-wider hover:bg-white/90 transition-all"
          data-testid="button-new-album">
          <Plus size={13} /> New Album
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            className={`px-4 py-1.5 text-[10px] tracking-[0.18em] uppercase border transition-all ${
              filterCat === cat ? "border-white text-white" : "border-white/15 text-white/35 hover:border-white/40 hover:text-white/60"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5" data-testid="portfolio-grid">
        {filtered.map(album => (
          <div key={album.id} className="bg-[#0a0a0a] overflow-hidden group relative" data-testid={`portfolio-row-${album.id}`}>
            <div className="aspect-[3/2] overflow-hidden">
              <img src={`${album.coverImage.split("?")[0]}?w=600&q=75`} alt={album.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-75" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1">{album.category} — {album.date}</p>
                  <p className="text-white font-medium truncate">{album.title}</p>
                  <p className="text-white/30 text-xs mt-0.5">{album.location}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <div className="flex items-center gap-1 text-white/25 text-xs mr-2">
                    <ImageIcon size={10} /><span>{album.photoCount}</span>
                  </div>
                  <Link to={`/portfolio/${album.id}`} target="_blank"
                    className="p-1.5 text-white/20 hover:text-white/60 transition-colors"
                    data-testid={`link-view-album-${album.id}`}>
                    <ExternalLink size={13} />
                  </Link>
                  <button onClick={() => setEditAlbum(album)}
                    className="p-1.5 text-white/20 hover:text-white/60 transition-colors"
                    data-testid={`button-edit-album-${album.id}`}>
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => setDeleteId(album.id)}
                    className="p-1.5 text-white/20 hover:text-red-400/60 transition-colors"
                    data-testid={`button-delete-album-${album.id}`}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="bg-[#111] border border-white/10 p-8 max-w-sm w-full text-center">
            <p className="font-serif text-xl text-white mb-3">Delete this album?</p>
            <p className="text-white/40 text-sm mb-8">This will remove it from the portfolio permanently.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)}
                className="px-6 py-2.5 border border-white/12 text-white/40 text-xs uppercase tracking-wider hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="px-6 py-2.5 bg-red-500/80 text-white text-xs uppercase tracking-wider hover:bg-red-500 transition-colors"
                data-testid="button-confirm-delete-album">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
