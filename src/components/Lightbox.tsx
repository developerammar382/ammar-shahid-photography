import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/data/index";

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ photos, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    }
  }, [currentIndex]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const photo = photos[currentIndex];
  if (!photo) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/97 flex items-center justify-center"
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <button
        className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors p-2 z-10"
        onClick={onClose}
        data-testid="button-lightbox-close"
      >
        <X size={24} />
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-3 z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        data-testid="button-lightbox-prev"
      >
        <ChevronLeft size={32} />
      </button>

      <div className="relative max-w-5xl max-h-screen w-full h-full flex items-center justify-center p-10" onClick={(e) => e.stopPropagation()}>
        <img
          ref={imgRef}
          src={photo.url}
          alt={photo.title}
          className="max-w-full max-h-[85vh] object-contain"
          data-testid="lightbox-image"
        />
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase">{photo.title}</p>
          <p className="text-white/20 text-xs mt-1">{currentIndex + 1} / {photos.length}</p>
        </div>
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-3 z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        data-testid="button-lightbox-next"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
