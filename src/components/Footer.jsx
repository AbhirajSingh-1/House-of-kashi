import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import { SITE } from "../data/siteData";

const footerLinks = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home",       to: "/" },
      { label: "Gallery",    to: "/gallery" },
      { label: "Services",   to: "/services" },
      { label: "About Us",   to: "/about" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Wedding Photography",  to: "/services" },
      { label: "Pre-Wedding Shoots",   to: "/services" },
      { label: "Birthday Events",      to: "/services" },
      { label: "Corporate Events",     to: "/services" },
      { label: "Mehndi & Sangeet",     to: "/services" },
      { label: "Destination Weddings", to: "/services" },
    ],
  },
];

const socialLinks = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    href: SITE.facebook, label: "Facebook",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    href: SITE.instagram, label: "Instagram",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
    href: SITE.youtube, label: "YouTube",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
    href: SITE.pinterest, label: "Pinterest",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="bg-stone-950 text-stone-300 font-[Poppins]" role="contentinfo">
      {/* Top CTA Band */}
      <div className="bg-gradient-to-r from-rose-900/80 via-rose-800/60 to-rose-900/80 border-t border-rose-700/30 border-b border-rose-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300 mb-1">Begin Your Story</p>
            <h3 className="text-2xl lg:text-3xl font-light text-white">
              Let's create something <span className="italic font-semibold text-rose-200">timeless</span> together.
            </h3>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-stone-900 text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-rose-50 transition-colors duration-300 shadow-lg"
          >
            Book a Consultation
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {/* Brand Column */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full border-2 border-rose-700 bg-stone-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-wider">HK</span>
            </div>
            <div>
              <p className="font-bold text-white text-base tracking-wide">House of Kashi</p>
              <p className="text-[10px] text-rose-400 tracking-[0.2em] uppercase">Est. Excellence</p>
            </div>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">
            Capturing love stories with a cinematic eye. Every wedding deserves to be remembered in its full, timeless beauty.
          </p>
          <div className="space-y-3">
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 text-stone-400 hover:text-rose-400 transition-colors text-sm group">
              <Phone size={15} className="text-rose-600 group-hover:text-rose-400 shrink-0" />
              {SITE.phoneFormatted}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-stone-400 hover:text-rose-400 transition-colors text-sm group">
              <Mail size={15} className="text-rose-600 group-hover:text-rose-400 shrink-0" />
              {SITE.email}
            </a>
            <div className="flex items-start gap-3 text-stone-400 text-sm">
              <MapPin size={15} className="text-rose-600 shrink-0 mt-0.5" />
              {SITE.address}
            </div>
          </div>
        </motion.div>

        {/* Nav Columns */}
        {footerLinks.map((col) => (
          <motion.div key={col.heading} variants={itemVariants}>
            <h4 className="text-white text-xs font-semibold tracking-[0.25em] uppercase mb-5 pb-3 border-b border-stone-800">
              {col.heading}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-stone-400 hover:text-rose-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-rose-500 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Social + WhatsApp Column */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white text-xs font-semibold tracking-[0.25em] uppercase mb-5 pb-3 border-b border-stone-800">
            Follow Our Journey
          </h4>
          <div className="flex gap-3 mb-8">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-rose-600 hover:bg-rose-600/20 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=Hello%20House%20of%20Kashi!%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-green-900/30 border border-green-700/50 text-green-400 hover:bg-green-800/40 hover:text-green-300 transition-all duration-300 text-sm font-medium"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center text-xs text-stone-500">
          <p>
            © {currentYear} House of Kashi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
