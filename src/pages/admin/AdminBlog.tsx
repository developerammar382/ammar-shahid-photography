import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, Clock, ExternalLink, X, Check } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { BlogPost } from "@/data/index";

function PostModal({ post, onSave, onClose }: {
  post: Partial<BlogPost>;
  onSave: (p: BlogPost) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: post.title || "",
    subtitle: post.subtitle || "",
    category: post.category || "Behind the Scenes",
    date: post.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: post.readTime || 5,
    body: post.body || "",
    tags: post.tags?.join(", ") || "",
  });

  const categories = ["Behind the Scenes", "Craft", "Business", "Travel"];

  const handleSave = () => {
    const saved: BlogPost = {
      id: post.id || `b${Date.now()}`,
      slug: form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      title: form.title,
      subtitle: form.subtitle,
      category: form.category,
      date: form.date,
      readTime: Number(form.readTime),
      body: form.body,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      coverImage: post.coverImage || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
      photos: post.photos || [],
    };
    onSave(saved);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-start justify-center overflow-y-auto py-10 px-4" data-testid="modal-post">
      <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl">
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/8">
          <p className="text-white font-medium">{post.id ? "Edit Post" : "New Post"}</p>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="p-8 space-y-5">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Title *</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 transition-colors"
              placeholder="Post title" data-testid="input-post-title" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={e => setForm(f => ({...f, subtitle: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 transition-colors"
              placeholder="Short description" data-testid="input-post-subtitle" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none appearance-none">
                {categories.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Read Time (mins)</label>
              <input type="number" min={1} max={60} value={form.readTime} onChange={e => setForm(f => ({...f, readTime: Number(e.target.value)}))}
                className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Tags (comma-separated)</label>
            <input type="text" value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 transition-colors"
              placeholder="landscape, travel, personal" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">Body *</label>
            <textarea rows={10} value={form.body} onChange={e => setForm(f => ({...f, body: e.target.value}))}
              className="w-full bg-white/5 border border-white/12 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/35 transition-colors resize-none font-mono"
              placeholder="Write your post here. Use **Heading** for bold headings." data-testid="textarea-post-body" />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-6 py-2.5 border border-white/12 text-white/40 text-xs uppercase tracking-wider hover:text-white transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} disabled={!form.title || !form.body}
              className="px-6 py-2.5 bg-white text-black text-xs uppercase tracking-wider hover:bg-white/90 transition-all disabled:opacity-40 flex items-center gap-2"
              data-testid="button-save-post">
              <Check size={13} /> Save Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlog() {
  const { posts, setPosts } = useAdmin();
  const [editPost, setEditPost] = useState<Partial<BlogPost> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = (p: BlogPost) => {
    setPosts(prev => prev.some(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [p, ...prev]);
    setEditPost(null);
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="p-8 md:p-10" data-testid="page-admin-blog">
      {editPost !== null && (
        <PostModal post={editPost} onSave={handleSave} onClose={() => setEditPost(null)} />
      )}

      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">Admin</p>
          <h1 className="font-serif text-4xl text-white">Journal</h1>
        </div>
        <button onClick={() => setEditPost({})}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs uppercase tracking-wider hover:bg-white/90 transition-all"
          data-testid="button-new-post">
          <Plus size={13} /> New Post
        </button>
      </div>

      <div className="divide-y divide-white/5" data-testid="posts-list">
        {posts.map(p => (
          <div key={p.id} className="flex items-center gap-5 py-5" data-testid={`post-row-${p.id}`}>
            <div className="w-16 h-12 overflow-hidden shrink-0">
              <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/90 text-sm font-medium truncate">{p.title}</p>
              <div className="flex items-center gap-3 text-white/30 text-xs mt-0.5">
                <span>{p.category}</span>
                <span>·</span>
                <span>{p.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={10} />{p.readTime} min</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link to={`/journal/${p.slug}`} target="_blank"
                className="p-2 text-white/25 hover:text-white/60 transition-colors"
                data-testid={`link-preview-${p.id}`}>
                <ExternalLink size={13} />
              </Link>
              <button onClick={() => setEditPost(p)}
                className="p-2 text-white/25 hover:text-white/60 transition-colors"
                data-testid={`button-edit-${p.id}`}>
                <Edit2 size={13} />
              </button>
              <button onClick={() => setDeleteId(p.id)}
                className="p-2 text-white/25 hover:text-red-400/60 transition-colors"
                data-testid={`button-delete-${p.id}`}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="bg-[#111] border border-white/10 p-8 max-w-sm w-full text-center">
            <p className="font-serif text-xl text-white mb-3">Delete this post?</p>
            <p className="text-white/40 text-sm mb-8">This can't be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)}
                className="px-6 py-2.5 border border-white/12 text-white/40 text-xs uppercase tracking-wider hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="px-6 py-2.5 bg-red-500/80 text-white text-xs uppercase tracking-wider hover:bg-red-500 transition-colors"
                data-testid="button-confirm-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
