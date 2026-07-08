import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { heroSlides } from "../data/siteData";

const AUTOPLAY_INTERVAL = 3500;

// Slide variants: ONLY x-axis translation — zero opacity changes = no white flash
const makeSlideVariants = (dir) => ({
  enter:  { x: dir > 0 ? "100%" : "-100%" },
  center: { x: 0 },
  exit:   { x: dir > 0 ? "-100%" : "100%" },
});

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = heroSlides.length;

  const goTo = useCallback(
    (index, dir) => {
      setDirection(dir);
      setCurrent((index + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Preload adjacent images for smooth transitions
  useEffect(() => {
    const nextIndex = (current + 1) % total;
    const prevIndex = (current - 1 + total) % total;
    
    // Preload next and previous images
    const nextImg = new Image();
    const prevImg = new Image();
    nextImg.src = heroSlides[nextIndex].image;
    prevImg.src = heroSlides[prevIndex].image;
  }, [current, total]);

  // Steady 2-second autoplay loop (functional update avoids timer resets)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [total]);

  const slide = heroSlides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100svh", minHeight: "600px" }}
      aria-label="Hero image slider"
    >
      {/* ── Slides ── */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: direction > 0 ? "-100%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          {/* Image fills the entire slide frame with proper object-fit */}
          <img
            src={slide.image}
            alt={slide.label}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Preload all hero images (hidden) */}
      <div className="hidden">
        {heroSlides.map((s, i) => (
          i !== current && (
            <link key={i} rel="preload" as="image" href={s.image} />
          )
        ))}
      </div>

      {/* ── Text Content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-5 max-w-4xl"
          >
            {/* Label */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.4em] text-rose-300 uppercase font-[Poppins]">
              {slide.label}
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight font-[Poppins] whitespace-pre-line">
              {slide.title}
            </h1>

            {/* CTA */}
            <div className="pt-2">
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-700/80 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-rose-600 transition-all duration-300 border border-rose-500/50 hover:border-rose-400 font-[Poppins]"
              >
                {slide.cta}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Prev Arrow ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-all duration-200"
      >
        <ChevronLeft size={20} />
      </button>

      {/* ── Next Arrow ── */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-all duration-200"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dot Indicators ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ── Counter ── */}
      <div className="absolute bottom-8 right-8 z-10 text-white/50 text-xs font-[Poppins] tracking-widest hidden sm:block">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </section>
  );
}
