import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Heart, Star, ArrowLeft, Check, Send } from "lucide-react";
import { getClientAlbumById } from "@/data/index";

type SelectState = "none" | "heart" | "star";

export default function ClientProofing() {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();
  const [selections, setSelections] = useState<Record<string, SelectState>>({});
  const [submitted, setSubmitted] = useState(false);

  const album = albumId ? getClientAlbumById(albumId) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!album) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".proof-header-el",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(".proof-photo",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, stagger: 0.04, duration: 0.5, ease: "power2.out", delay: 0.2 }
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

  const toggle = (photoId: string, type: "heart" | "star") => {
    setSelections(prev => {
      const current = prev[photoId] || "none";
      const next: SelectState = current === type ? "none" : type;
      return { ...prev, [photoId]: next };
    });
  };

  const hearts = Object.values(selections).filter(s => s === "heart").length;
  const stars = Object.values(selections).filter(s => s === "star").length;
  const total = hearts + stars;

  const handleSubmit = () => {
    const ctx = gsap.context(() => {
      gsap.to(".proof-submit-btn", {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => setSubmitted(true)
      });
    });
    ctx.revert();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6" data-testid="page-proof-submitted">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 border border-green-500/30 bg-green-500/10 flex items-center justify-center mx-auto mb-8">
            <Check size={24} className="text-green-400" />
          </div>
          <h2 className="font-serif text-4xl text-white mb-4">Selections Submitted</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Your picks have been sent to Ammar. You selected <strong className="text-white">{total} photos</strong> — {stars} priority and {hearts} favorites. Retouching will begin within 3-5 business days.
          </p>
          <Link
            to={`/client/${album.id}`}
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white hover:border-white/50 transition-all"
            data-testid="link-back-delivery"
          >
            <ArrowLeft size={13} /> Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-20" data-testid="page-client-proofing">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="py-10 border-b border-white/8 mb-10">
          <button
            onClick={() => navigate(`/client/${album.id}`)}
            className="proof-header-el flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase group mb-8"
            data-testid="button-back"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Delivery
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="proof-header-el text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">Proofing Gallery</p>
              <h1 className="proof-header-el font-serif text-4xl md:text-5xl text-white">{album.title}</h1>
              <p className="proof-header-el text-white/40 text-sm mt-3 max-w-lg leading-relaxed">
                Mark your favorites with a heart, and your priority retouching picks with a star. Submit when you're done.
              </p>
            </div>

            <div className="proof-header-el flex items-center gap-4 shrink-0">
              <div className="text-center">
                <div className="flex items-center gap-1.5 text-pink-400/80">
                  <Heart size={13} fill="currentColor" />
                  <span className="font-mono text-lg text-white">{hearts}</span>
                </div>
                <p className="text-white/25 text-[10px] tracking-wider uppercase mt-1">Favorites</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="flex items-center gap-1.5 text-yellow-400/80">
                  <Star size={13} fill="currentColor" />
                  <span className="font-mono text-lg text-white">{stars}</span>
                </div>
                <p className="text-white/25 text-[10px] tracking-wider uppercase mt-1">Priority</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <button
                onClick={handleSubmit}
                disabled={total === 0}
                className="proof-submit-btn flex items-center gap-2 px-6 py-3 bg-white text-black text-xs tracking-[0.15em] uppercase hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                data-testid="button-submit-proofing"
              >
                <Send size={12} /> Submit Picks ({total})
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-8 mb-8 proof-header-el">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Heart size={13} className="text-pink-400/60" />
            <span>Favorite</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Star size={13} className="text-yellow-400/60" />
            <span>Priority retouch</span>
          </div>
        </div>

        {/* Photo Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5 mb-24"
          data-testid="grid-proofing-photos"
        >
          {album.photos.map((photo) => {
            const state = selections[photo.id] || "none";
            return (
              <div
                key={photo.id}
                className={`proof-photo group relative overflow-hidden aspect-square bg-neutral-900 ${
                  state !== "none" ? "ring-1 ring-inset ring-white/20" : ""
                }`}
                data-testid={`photo-proof-${photo.id}`}
              >
                <img
                  src={`${photo.url.split("?")[0]}?w=500&q=75`}
                  alt={photo.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${state !== "none" ? "opacity-90" : "group-hover:opacity-80"}`}
                />

                {/* Selection overlay */}
                <div className={`absolute inset-0 transition-all duration-200 ${
                  state !== "none" ? "bg-black/20" : "bg-black/0 group-hover:bg-black/40"
                }`} />

                {/* Action buttons */}
                <div className={`absolute bottom-3 left-3 flex items-center gap-2 transition-all duration-200 ${
                  state !== "none" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                  <button
                    onClick={() => toggle(photo.id, "heart")}
                    className={`p-2 transition-all duration-150 ${
                      state === "heart"
                        ? "bg-pink-500/90 text-white scale-110"
                        : "bg-black/60 text-white/70 hover:text-pink-400 hover:bg-black/80"
                    }`}
                    data-testid={`button-heart-${photo.id}`}
                  >
                    <Heart size={13} fill={state === "heart" ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => toggle(photo.id, "star")}
                    className={`p-2 transition-all duration-150 ${
                      state === "star"
                        ? "bg-yellow-500/90 text-white scale-110"
                        : "bg-black/60 text-white/70 hover:text-yellow-400 hover:bg-black/80"
                    }`}
                    data-testid={`button-star-${photo.id}`}
                  >
                    <Star size={13} fill={state === "star" ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Selected indicator */}
                {state !== "none" && (
                  <div className="absolute top-2 right-2">
                    {state === "heart"
                      ? <Heart size={14} className="text-pink-400" fill="currentColor" />
                      : <Star size={14} className="text-yellow-400" fill="currentColor" />
                    }
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
