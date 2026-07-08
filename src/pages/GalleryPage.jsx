import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { X, ZoomIn } from "lucide-react";
import { fullGallery } from "../data/siteData";

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ img, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      {img && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-colors z-10"
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-colors z-10"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-colors z-10"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Image */}
          <motion.img
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            src={img.src}
            alt={img.alt}
            className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs font-[Poppins] tracking-wider">
            {img.alt} · {img.category}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



// ─── Gallery Page ─────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openLightbox = useCallback((idx) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevImage = useCallback(
    () => setLightboxIdx((i) => (i - 1 + fullGallery.length) % fullGallery.length),
    []
  );
  const nextImage = useCallback(
    () => setLightboxIdx((i) => (i + 1) % fullGallery.length),
    []
  );

  // 2 cols on mobile, 3 on md, 4 on lg — handled via responsive render
  // We compute three column sets statically; CSS grid gap handles spacing

  return (
    <>
      <Helmet>
        <title>Gallery – House of Kashi | Wedding Photography Portfolio</title>
        <meta
          name="description"
          content="Explore the House of Kashi photography gallery – weddings, ceremonies, pre-shoots, portraits, décor and more."
        />
      </Helmet>

      {/* ── Page Hero ── */}
      <section
        className="relative pt-32 pb-20 bg-stone-900 overflow-hidden"
        aria-labelledby="gallery-hero-heading"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${fullGallery[0]?.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/50 to-stone-900" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-rose-400 text-xs tracking-[0.35em] uppercase font-[Poppins] mb-4"
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            id="gallery-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl lg:text-6xl font-light text-white font-[Poppins] leading-tight mb-5"
          >
            Frames of Forever
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="text-stone-300 text-base font-[Poppins] max-w-xl mx-auto"
          >
            {fullGallery.length}+ hand-curated images across weddings, ceremonies, portraits &amp; more.
          </motion.p>
        </div>
      </section>

      {/* ── Masonry Gallery Grid ── */}
      <section className="py-10 bg-stone-50" aria-label="Photo gallery">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
          {/*
            CSS columns masonry: images flow top-to-bottom, no bottom gaps ever.
            2 cols mobile → 3 cols tablet → 4 cols desktop
          */}
          <style>{`
            .masonry-grid { columns: 2; column-gap: 10px; }
            @media (min-width: 640px)  { .masonry-grid { columns: 3; } }
            @media (min-width: 1024px) { .masonry-grid { columns: 4; } }
          `}</style>
          <div className="masonry-grid">
            {fullGallery.map((img, idx) => (
              <GalleryCard key={img.id} img={img} idx={idx} onOpen={openLightbox} masonry />
            ))}
          </div>
        </div>
      </section>


      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <Lightbox
          img={fullGallery[lightboxIdx]}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}

// ─── Single Gallery Card ──────────────────────────────────────────────────────
function GalleryCard({ img, idx, onOpen, masonry = false }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.4, delay: (idx % 8) * 0.03 }}
      style={{ breakInside: "avoid" }}
      className="relative group overflow-hidden rounded-xl cursor-pointer bg-stone-200 mb-2.5"
      onClick={() => onOpen(idx)}
      role="button"
      tabIndex={0}
      aria-label={`View ${img.alt}`}
      onKeyDown={(e) => e.key === "Enter" && onOpen(idx)}
    >
      {/* masonry = natural height; grid = fixed aspect */}
      <div className={masonry ? "w-full" : "aspect-[4/3] overflow-hidden"}>
        <img
          src={img.src}
          alt={img.alt}
          loading={idx < 12 ? "eager" : "lazy"}
          decoding={idx < 12 ? "sync" : "async"}
          fetchPriority={idx < 12 ? "high" : "auto"}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            masonry ? "h-auto" : "h-full"
          }`}
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <ZoomIn size={16} className="text-white" />
          </div>
          <span className="text-white text-[10px] font-[Poppins] tracking-widest uppercase">
            {img.category}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
