import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Download, CheckCircle, ArrowLeft, Heart, Clock, MessageCircle, Send } from "lucide-react";
import { getClientAlbumById, type Comment } from "@/data/index";

type DownloadState = "idle" | "downloading" | "done";

function daysUntil(dateStr: string): number {
  const expiry = new Date(dateStr);
  const now = new Date();
  return Math.max(0, Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

function timeAgo(isoStr: string): string {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "just now";
}

export default function ClientDelivery() {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();
  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadState>>({});
  const [bulkState, setBulkState] = useState<DownloadState>("idle");
  const [activeTab, setActiveTab] = useState<"gallery" | "comments" | "history">("gallery");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const album = albumId ? getClientAlbumById(albumId) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!album) return;
    setComments(album.comments);
    const ctx = gsap.context(() => {
      gsap.fromTo(".delivery-header-el",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(".delivery-photo",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.5, ease: "power2.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, [album]);

  if (!album) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground" data-testid="page-not-found">
        <p className="font-serif text-3xl text-white mb-4">Gallery not found</p>
        <Link to="/client" className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors">
          Back to Login
        </Link>
      </main>
    );
  }

  const daysLeft = daysUntil(album.expiryDate);
  const simulateDownload = (photoId: string) => {
    setDownloadStates(prev => ({ ...prev, [photoId]: "downloading" }));
    setTimeout(() => {
      setDownloadStates(prev => ({ ...prev, [photoId]: "done" }));
    }, 1200 + Math.random() * 800);
  };
  const simulateBulkDownload = () => {
    setBulkState("downloading");
    setTimeout(() => setBulkState("done"), 3000);
  };
  const doneCount = Object.values(downloadStates).filter(s => s === "done").length;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const c: Comment = {
      id: `new-${Date.now()}`,
      author: album.clientName,
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
      isPhotographer: false,
    };
    setComments(prev => [...prev, c]);
    setNewComment("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-20" data-testid="page-client-delivery">
      {/* Hero Banner */}
      <div className="relative h-48 overflow-hidden">
        <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="py-8 border-b border-white/8 mb-0">
          <button onClick={() => navigate("/client")}
            className="delivery-header-el flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase group mb-7"
            data-testid="button-back">
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Client Portal
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <p className="delivery-header-el text-white/30 text-[10px] tracking-[0.3em] uppercase mb-1.5">
                Delivered to {album.clientName}
              </p>
              <h1 className="delivery-header-el font-serif text-4xl md:text-5xl text-white">{album.title}</h1>
              <p className="delivery-header-el text-white/40 text-sm mt-2">{album.date} — {album.photos.length} photos</p>
              <p className="delivery-header-el text-white/35 text-sm leading-relaxed mt-4 max-w-2xl">{album.description}</p>
            </div>

            <div className="delivery-header-el flex flex-col gap-3 items-start md:items-end shrink-0">
              {/* Expiry */}
              <div className={`flex items-center gap-2 text-xs px-4 py-2 border ${
                daysLeft < 30 ? "border-amber-500/30 text-amber-400/80" : "border-white/15 text-white/40"
              }`}>
                <Clock size={12} />
                <span>Gallery expires in {daysLeft} days</span>
              </div>
              {doneCount > 0 && (
                <div className="flex items-center gap-2 text-green-400/70 text-xs">
                  <CheckCircle size={12} />
                  <span>{doneCount} photo{doneCount !== 1 ? "s" : ""} downloaded</span>
                </div>
              )}
              <div className="flex items-center gap-3 mt-1">
                <Link to={`/client/${album.id}/proof`}
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/20 text-xs tracking-[0.15em] uppercase text-white/60 hover:text-white hover:border-white/50 transition-all"
                  data-testid="link-proof">
                  <Heart size={12} /> Proof
                </Link>
                <button onClick={simulateBulkDownload} disabled={bulkState !== "idle"}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all ${
                    bulkState === "done" ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : bulkState === "downloading" ? "bg-white/10 text-white/50 border border-white/10 cursor-not-allowed"
                    : "bg-white text-black hover:bg-white/90"
                  }`} data-testid="button-download-all">
                  {bulkState === "done" ? <><CheckCircle size={12} /> All Downloaded</>
                    : bulkState === "downloading" ? <><span className="w-3 h-3 border border-white/30 border-t-white/70 rounded-full animate-spin" />Packaging...</>
                    : <><Download size={12} /> Download All</>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-white/8 mt-8 mb-8" data-testid="tabs-delivery">
          {([
            { key: "gallery", label: `Gallery (${album.photos.length})` },
            { key: "comments", label: `Comments (${comments.length})` },
            { key: "history", label: `Downloads (${album.downloadHistory.length})` },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-4 text-xs tracking-[0.18em] uppercase transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? "border-white text-white"
                  : "border-transparent text-white/35 hover:text-white/60"
              }`} data-testid={`tab-${tab.key}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Gallery */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5 mb-24" data-testid="grid-delivery-photos">
            {album.photos.map((photo) => {
              const state = downloadStates[photo.id] || "idle";
              return (
                <div key={photo.id}
                  className="delivery-photo group relative overflow-hidden aspect-square bg-neutral-900"
                  data-testid={`photo-delivery-${photo.id}`}>
                  <img
                    src={`${photo.url.split("?")[0]}?w=500&q=75`}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-75 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <button onClick={() => simulateDownload(photo.id)} disabled={state !== "idle"}
                      className={`opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.2em] uppercase ${
                        state === "done" ? "text-green-400"
                        : state === "downloading" ? "text-white/50"
                        : "bg-white text-black hover:bg-white/90"
                      }`} data-testid={`button-download-${photo.id}`}>
                      {state === "done" ? <><CheckCircle size={12} />Saved</>
                        : state === "downloading" ? <><span className="w-2.5 h-2.5 border border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                        : <><Download size={12} />Download</>}
                    </button>
                  </div>
                  {state === "done" && (
                    <div className="absolute top-2 right-2"><CheckCircle size={14} className="text-green-400" /></div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab: Comments */}
        {activeTab === "comments" && (
          <div className="max-w-2xl mb-24" data-testid="tab-panel-comments">
            <div className="space-y-6 mb-10">
              {comments.map(c => (
                <div key={c.id} className={`flex gap-4 ${c.isPhotographer ? "" : "flex-row-reverse"}`} data-testid={`comment-${c.id}`}>
                  <div className={`w-9 h-9 shrink-0 flex items-center justify-center text-xs font-medium ${
                    c.isPhotographer ? "bg-white text-black" : "bg-white/10 text-white"
                  }`}>
                    {c.isPhotographer ? "EV" : c.author.charAt(0)}
                  </div>
                  <div className={`flex-1 ${c.isPhotographer ? "" : "text-right"}`}>
                    <div className={`flex items-baseline gap-3 mb-2 ${c.isPhotographer ? "" : "flex-row-reverse"}`}>
                      <span className="text-white text-sm font-medium">{c.author}</span>
                      <span className="text-white/25 text-xs">{timeAgo(c.createdAt)}</span>
                      {c.isPhotographer && <span className="text-white/20 text-[9px] tracking-widest uppercase border border-white/10 px-2 py-0.5">Photographer</span>}
                    </div>
                    <div className={`inline-block text-sm text-white/70 leading-relaxed px-5 py-4 border ${
                      c.isPhotographer ? "border-white/10 bg-white/3 text-left" : "border-white/8 bg-white/2 text-left"
                    }`}>
                      {c.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit} className="flex gap-3" data-testid="form-comment">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Add a message..."
                className="flex-1 bg-white/5 border border-white/12 px-5 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors"
                data-testid="input-comment"
              />
              <button type="submit" disabled={!newComment.trim()}
                className="px-5 py-3 bg-white text-black text-xs uppercase tracking-wider hover:bg-white/90 transition-all disabled:opacity-30 flex items-center gap-2"
                data-testid="button-send-comment">
                <Send size={13} />
              </button>
            </form>
          </div>
        )}

        {/* Tab: Download History */}
        {activeTab === "history" && (
          <div className="max-w-2xl mb-24" data-testid="tab-panel-history">
            <div className="divide-y divide-white/5">
              {album.downloadHistory.map(event => (
                <div key={event.id} className="flex items-center justify-between py-5 gap-6" data-testid={`history-${event.id}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/5 flex items-center justify-center shrink-0">
                      <Download size={13} className="text-white/40" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">{event.photoTitle}</p>
                      <p className="text-white/30 text-xs mt-0.5">{event.device}</p>
                    </div>
                  </div>
                  <p className="text-white/25 text-xs text-right shrink-0">
                    {new Date(event.downloadedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </div>
            {album.downloadHistory.length === 0 && (
              <p className="text-white/30 text-sm py-10 text-center">No downloads yet.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
