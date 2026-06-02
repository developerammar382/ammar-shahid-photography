import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";
import { getAlbumById } from "@/data/index";
import Lightbox from "@/components/Lightbox";

export default function AlbumDetail() {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const album = albumId ? getAlbumById(albumId) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!album) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".album-detail-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(".photo-thumb",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: "power2.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, [album]);

  if (!album) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground" data-testid="page-not-found">
        <p className="font-serif text-3xl text-white mb-4">Album not found</p>
        <Link to="/portfolio" className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors">
          Back to Portfolio
        </Link>
      </main>
    );
  }

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % album.photos.length);
  };
  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + album.photos.length) % album.photos.length);
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-20" data-testid="page-album-detail">
      {/* Hero */}
      <div className="relative h-[55vh] overflow-hidden mb-16" data-testid="album-hero">
        <img
          src={album.coverImage}
          alt={album.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-14">
          <p className="album-detail-header text-white/40 text-[10px] tracking-[0.35em] uppercase mb-3">
            {album.category} — {album.date} — {album.location}
          </p>
          <h1 className="album-detail-header font-serif text-5xl md:text-6xl text-white">{album.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Back + Description */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-14">
          <button
            onClick={() => navigate(-1)}
            className="album-detail-header flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase group shrink-0"
            data-testid="button-back"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Portfolio
          </button>
          <p className="album-detail-header text-white/50 leading-relaxed max-w-xl text-sm">
            {album.description}
          </p>
          <div className="ml-auto text-right shrink-0">
            <p className="text-white/20 text-xs tracking-widest uppercase">Photos</p>
            <p className="font-serif text-3xl text-white/60">{album.photos.length}</p>
          </div>
        </div>

        {/* Photo Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 mb-24"
          data-testid="grid-photos"
        >
          {album.photos.map((photo, i) => (
            <button
              key={photo.id}
              className="photo-thumb group relative overflow-hidden aspect-square bg-neutral-900 cursor-pointer"
              onClick={() => setLightboxIndex(i)}
              data-testid={`thumb-photo-${photo.id}`}
            >
              <img
                src={`${photo.url.split("?")[0]}?w=600&q=75`}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-[10px] tracking-[0.25em] uppercase">{photo.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={album.photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </main>
  );
}
