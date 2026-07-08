import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider }    from "react-helmet-async";
import { useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar      from "./components/Navbar";
import Footer      from "./components/Footer";

// Lazy load pages for faster initial load
const HomePage = lazy(() => import("./pages/HomePage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-stone-600 font-[Poppins]">Loading...</p>
      </div>
    </div>
  );
}

// ── Scroll to top on route change + handle hash anchors ──────────────────────
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      // If there's a hash, scroll to that element after a short delay
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Otherwise scroll to top
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  
  return null;
}

// ── Scroll to top on page load/reload ─────────────────────────────────────────
function ScrollToTopOnLoad() {
  useEffect(() => {
    // Scroll to top immediately on component mount (page load/reload)
    window.scrollTo(0, 0);
  }, []);
  
  return null;
}

// ── Page transition wrapper ───────────────────────────────────────────────────
const pageVariants = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit:     { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/"        element={<HomePage    />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about"   element={<AboutPage   />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-center px-4 pt-24">
                  <p className="text-8xl font-bold text-stone-100 font-[Poppins] select-none mb-4">404</p>
                  <h1 className="text-2xl font-semibold text-stone-800 font-[Poppins] mb-3">Page Not Found</h1>
                  <p className="text-stone-500 font-[Poppins] mb-8">The page you're looking for doesn't exist.</p>
                  <a href="/" className="px-8 py-3.5 bg-rose-600 text-white rounded-full text-sm font-semibold font-[Poppins] hover:bg-rose-700 transition-colors">
                    Go Home
                  </a>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

// ── WhatsApp Floating Button ──────────────────────────────────────────────────
function WhatsAppFAB() {
  return (
    <motion.a
      href="https://wa.me/919060299666"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 shadow-2xl shadow-green-300/60 flex items-center justify-center hover:bg-green-600 transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ScrollToTopOnLoad />
        <div className="flex flex-col min-h-screen font-[Poppins] bg-white text-stone-800 antialiased">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
          <WhatsAppFAB />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
