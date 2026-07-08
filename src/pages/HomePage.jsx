import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Heart } from "lucide-react";

import HeroSlider          from "../components/HeroSlider";
import SectionHeading      from "../components/SectionHeading";
import PortfolioGrid       from "../components/PortfolioGrid";
import TestimonialsSection from "../components/TestimonialsSection";

import {
  SITE,
  featuredPortfolio,
  services,
  about1,
  about2,
  about3,
} from "../data/siteData";

// ─── Viewport shorthand: fires quickly, no heavy scroll-tracking ──────────────
const VP = { once: true, amount: 0.1 };

// ─── Service Preview Card ─────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading={index < 3 ? "eager" : "lazy"}
          decoding={index < 3 ? "sync" : "async"}
          fetchPriority={index < 3 ? "high" : "auto"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-4xl mb-2">{service.icon}</p>
        <p className="text-rose-300 text-xs font-[Poppins] tracking-[0.2em] uppercase mb-1">{service.subtitle}</p>
        <h3 className="text-white text-xl font-semibold font-[Poppins] mb-3">{service.title}</h3>
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-white/70 text-xs font-[Poppins] tracking-wider hover:text-rose-300 transition-colors group/btn"
        >
          Learn More
          <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}

// ─── About / Wedding Planners Section ────────────────────────────────────────
// NO parallax (removes heavy scroll listener), NO "12+ Years" badge
function AboutSection() {
  return (
    <section className="py-24 bg-[#faf8f5]" aria-labelledby="about-home-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Images mosaic (static, no parallax) ── */}
          <div className="relative h-[460px] lg:h-[520px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.7 }}
              className="absolute top-0 left-0 w-[58%] h-[65%] rounded-2xl overflow-hidden shadow-2xl shadow-stone-200"
            >
              <img
                src={about1}
                alt="Wedding ceremony"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-2xl shadow-stone-200"
            >
              <img
                src={about2}
                alt="Bridal portrait"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </motion.div>
          </div>

          {/* ── Text ── */}
          <div className="space-y-7">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.6 }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-400 font-[Poppins]"
            >
              The Perfect Beginning to Your Happily Ever After
            </motion.p>
            <motion.h2
              id="about-home-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-3xl lg:text-5xl font-light text-stone-800 font-[Poppins] leading-tight"
            >
              Wedding <span className="text-rose-600 italic">Planners</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="text-stone-500 leading-relaxed font-[Poppins] text-base"
            >
              The wedding ceremony and the events leading up to it, such as the engagement and pre-wedding festivities, all serve as chapters in the story of the couple's journey together. Each element of the wedding, from the traditional customs and rituals to the selection of the attire and decorations, all serve to narrate the tale of the couple's love.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-500 leading-relaxed font-[Poppins] text-base"
            >
              At <strong className="text-stone-700">House of Kashi</strong>, we believe that every wedding has its own heartbeat. We listen to yours, and translate it into photographs and films that will make you feel the day all over again — forever.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-rose-600 text-white text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-rose-700 transition-colors duration-300 font-[Poppins]"
              >
                Our Story <ArrowRight size={16} />
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-stone-300 text-stone-600 text-sm font-semibold tracking-wider uppercase rounded-full hover:border-rose-400 hover:text-rose-600 transition-colors duration-300 font-[Poppins]"
              >
                Call Us Now
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Banner (text only, matching reference) ─────────────────────────
function ServicesBanner() {
  return (
    <section className="py-20 bg-white text-center" aria-labelledby="services-banner-heading">
      <div className="max-w-4xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.7 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400 mb-8 font-[Poppins]"
        >
          Services We Offer
        </motion.p>
        <motion.h2
          id="services-banner-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl lg:text-5xl font-light text-rose-600 font-[Poppins] leading-tight"
        >
          Make your dream wedding come true.<br />
          Let us handle the details
        </motion.h2>
      </div>
    </section>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>House of Kashi – Premium Wedding &amp; Event Photography</title>
        <meta
          name="description"
          content="House of Kashi – premium wedding photography and event planning in Varanasi. Capturing timeless love stories with a cinematic eye. Call +91 90602 99666."
        />
        <meta
          name="keywords"
          content="wedding photography, event planner, Varanasi, House of Kashi, wedding photographer India"
        />
      </Helmet>

      {/* ── Hero Slider ── */}
      <HeroSlider />

      {/* ── Portfolio Section ── */}
      <section className="py-20 bg-white" aria-labelledby="portfolio-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Portfolio"
            title={<>Our Best <span className="text-rose-600 italic">Memories</span></>}
            subtitle="Every time we bring a couple to exchange vows, we remind the world that true love exists and that fills many, many hearts with hope. We believe that love is the most powerful force in the world and we plan weddings as a manifestation of that force. And that's why every wedding we do is narrated for posterity, to remind us all that fairytale endings are possible. That's the atmosphere of our House of Kashi!"
            className="mb-12"
          />
          <PortfolioGrid images={featuredPortfolio} columns={3} />
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-10 py-4 bg-stone-900 text-white text-sm font-semibold tracking-[0.15em] uppercase font-[Poppins] hover:bg-rose-600 transition-colors duration-300 rounded-sm"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── About / Wedding Planners ── */}
      <AboutSection />

      {/* ── Services Banner ── */}
      <ServicesBanner />

      {/* ── Services Grid ── */}
      <section className="pb-20 bg-white" aria-label="Services overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-10 py-4 border-2 border-stone-300 text-stone-700 text-sm font-semibold tracking-[0.15em] uppercase font-[Poppins] hover:border-rose-500 hover:text-rose-600 transition-colors duration-300 rounded-full"
            >
              All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── CTA Section ── */}
      <section
        className="relative py-28 overflow-hidden"
        aria-labelledby="cta-heading"
        style={{
          backgroundImage: `url(${about3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6 }}
            className="text-rose-300 text-xs tracking-[0.3em] uppercase font-[Poppins] mb-4"
          >
            Ready to Begin?
          </motion.p>
          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl lg:text-5xl font-light text-white font-[Poppins] mb-8 leading-tight"
          >
            Let's tell your love story<br />the way it deserves.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-600 text-white text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-rose-500 transition-colors font-[Poppins]"
            >
              Book a Date <Heart size={16} fill="currentColor" />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-white/20 transition-colors font-[Poppins]"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
