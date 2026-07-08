import { motion } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { AnimatePresence } from "framer-motion";

/**
 * ImageCard – single portfolio card with hover overlay and lightbox.
 */
export function ImageCard({ src, alt, category, index }) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
        className="relative group overflow-hidden rounded-xl cursor-pointer bg-stone-100"
        onClick={() => setLightbox(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${alt}`}
        onKeyDown={(e) => e.key === "Enter" && setLightbox(true)}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img
            src={src}
            alt={alt}
            loading={index < 6 ? "eager" : "lazy"}
            decoding={index < 6 ? "sync" : "async"}
            fetchPriority={index < 6 ? "high" : "auto"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/80 text-xs font-[Poppins] tracking-widest uppercase mb-1">{category}</p>
              <p className="text-white font-medium text-sm font-[Poppins]">{alt}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <ZoomIn size={16} className="text-white" />
            </div>
          </div>
        </div>
      </motion.article>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightbox(false)}
              aria-label="Close lightbox"
            >
              <X size={18} />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4 }}
              src={src}
              alt={alt}
              loading="eager"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-[Poppins] tracking-wider">
              {alt} • {category}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * PortfolioGrid – masonry-style responsive grid of ImageCards.
 */
export default function PortfolioGrid({ images, columns = 3 }) {
  return (
    <div
      className={`grid gap-4 ${
        columns === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {images.map((img, i) => (
        <ImageCard key={img.id} {...img} index={i} />
      ))}
    </div>
  );
}
