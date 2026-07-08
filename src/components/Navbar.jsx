import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Menu, ChevronDown } from "lucide-react";
import { SITE } from "../data/siteData";

const navLinks = [
  { label: "Home",     to: "/" },
  { label: "Gallery",  to: "/gallery" },
  { label: "Services", to: "/services" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "Our Story",    to: "/about#story" },
      { label: "Our Team",     to: "/about#team" },
      { label: "Testimonials", to: "/about#testimonials" },
    ],
  },
  { label: "Contact Us", to: "/contact" },
];

const socialLinks = [
  { icon: "facebook",   href: SITE.facebook,   label: "Facebook" },
  { icon: "instagram",  href: SITE.instagram,  label: "Instagram" },
  { icon: "youtube",    href: SITE.youtube,    label: "YouTube" },
  { icon: "pinterest",  href: SITE.pinterest,  label: "Pinterest" },
];

function SocialIcon({ icon }) {
  const icons = {
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
    pinterest: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  };
  return icons[icon] || null;
}

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dropOpen, setDropOpen]        = useState(false);
  const location                       = useLocation();
  const dropRef                        = useRef(null);

  // Detect scroll for background switch
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isHero = location.pathname === "/";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHero
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ── */}
            <Link
              to="/"
              aria-label="House of Kashi – Home"
              className="flex items-center gap-3 shrink-0 group"
            >
              <div className="relative w-12 h-12 rounded-full border-2 border-rose-300 flex items-center justify-center bg-stone-900/80 group-hover:border-rose-400 transition-colors duration-300">
                <div className="text-center leading-none">
                  <p className={`text-[8px] font-bold tracking-widest ${scrolled || !isHero ? "text-stone-800" : "text-white"} transition-colors duration-300`} style={{ color: scrolled || !isHero ? "#1c1917" : "white" }}>
                  </p>
                  <p className="text-white font-bold text-sm tracking-wider">HK</p>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className={`font-bold text-base leading-tight tracking-wider font-[Poppins] transition-colors duration-300 ${scrolled || !isHero ? "text-stone-800" : "text-white"}`}>
                  House of Kashi
                </p>
                <p className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled || !isHero ? "text-rose-500" : "text-rose-300"}`}>
                  Est. Excellence
                </p>
              </div>
            </Link>

            {/* ── Social Icons (Left cluster) ── */}
            <div className="hidden lg:flex items-center gap-3 ml-4">
              {socialLinks.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`transition-colors duration-200 hover:text-rose-500 ${scrolled || !isHero ? "text-stone-500" : "text-white/80"}`}
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative" ref={dropRef}>
                    <button
                      onClick={() => setDropOpen((p) => !p)}
                      className={`flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors duration-200 font-[Poppins] cursor-pointer ${
                        scrolled || !isHero
                          ? "text-stone-600 hover:text-rose-600"
                          : "text-white/90 hover:text-white"
                      }`}
                      aria-expanded={dropOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-3 w-44 bg-white rounded-xl shadow-xl shadow-stone-200 border border-stone-100 overflow-hidden"
                          role="menu"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.to}
                              onClick={() => {
                                setDropOpen(false);
                                // Handle hash navigation
                                if (child.to.includes('#')) {
                                  const [path, hash] = child.to.split('#');
                                  if (window.location.pathname === path) {
                                    setTimeout(() => {
                                      const element = document.getElementById(hash);
                                      if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                      }
                                    }, 100);
                                  }
                                }
                              }}
                              role="menuitem"
                              className="block px-4 py-3 text-sm text-stone-600 hover:bg-rose-50 hover:text-rose-600 transition-colors font-[Poppins]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `text-sm font-medium tracking-wide uppercase transition-colors duration-200 font-[Poppins] relative group ${
                        isActive
                          ? "text-rose-500"
                          : scrolled || !isHero
                          ? "text-stone-600 hover:text-rose-600"
                          : "text-white/90 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-rose-500 transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                )
              )}
            </div>

            {/* ── WhatsApp CTA ── */}
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
              className={`hidden lg:flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                scrolled || !isHero
                  ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  : "border-white/70 text-white/80 hover:border-white hover:text-white"
              }`}
            >
              <Phone size={16} />
            </a>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled || !isHero ? "text-stone-700" : "text-white"
              }`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-white z-50 shadow-2xl lg:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
                <div>
                  <p className="font-bold text-stone-800 font-[Poppins]">House of Kashi</p>
                  <p className="text-xs text-rose-500 tracking-wider uppercase">Est. Excellence</p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-stone-500 hover:bg-stone-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    {link.children ? (
                      <div>
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest px-3 pt-4 pb-1">
                          {link.label}
                        </p>
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            className="block px-3 py-2.5 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-[Poppins] text-sm"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-3 rounded-lg text-sm font-medium font-[Poppins] transition-colors ${
                            isActive
                              ? "bg-rose-50 text-rose-600 font-semibold"
                              : "text-stone-600 hover:text-rose-600 hover:bg-stone-50"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="px-6 py-6 border-t border-stone-100 space-y-4">
                <div className="flex gap-4">
                  {socialLinks.map((s) => (
                    <a
                      key={s.icon}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-rose-500 hover:border-rose-300 transition-colors"
                    >
                      <SocialIcon icon={s.icon} />
                    </a>
                  ))}
                </div>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-2 text-sm font-medium text-stone-600 font-[Poppins]"
                >
                  <Phone size={16} className="text-rose-500" />
                  {SITE.phoneFormatted}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
