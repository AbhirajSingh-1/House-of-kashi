import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/siteData";

// ─── Service Detail Modal ─────────────────────────────────────────────────────
function ServiceModal({ service, onClose }) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-72 overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div className="absolute bottom-5 left-6">
                <p className="text-rose-300 text-xs font-[Poppins] tracking-widest uppercase mb-1">{service.subtitle}</p>
                <h3 id="modal-title" className="text-white text-2xl font-semibold font-[Poppins]">
                  {service.icon} {service.title}
                </h3>
              </div>
            </div>
            <div className="p-8 space-y-5">
              <p className="text-stone-600 leading-relaxed font-[Poppins] text-base">{service.description}</p>
              <div>
                <p className="font-semibold text-stone-800 font-[Poppins] mb-3 text-sm uppercase tracking-wider">What's Included</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-stone-600 text-sm font-[Poppins]">
                      <Check size={15} className="text-rose-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 pt-2">
                <Link
                  to="/contact"
                  className="flex-1 text-center py-3.5 bg-rose-600 text-white text-sm font-semibold tracking-wider uppercase rounded-xl font-[Poppins] hover:bg-rose-700 transition-colors"
                  onClick={onClose}
                >
                  Book This Service
                </Link>
                <a
                  href={`https://wa.me/919060299666?text=Hi!%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 border-2 border-stone-200 text-stone-600 text-sm font-semibold tracking-wider uppercase rounded-xl font-[Poppins] hover:border-rose-400 hover:text-rose-600 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500"
      onClick={() => onClick(service)}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${service.title}`}
      onKeyDown={(e) => e.key === "Enter" && onClick(service)}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading={index < 3 ? "eager" : "lazy"}
          decoding={index < 3 ? "sync" : "async"}
          fetchPriority={index < 3 ? "high" : "auto"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p className="text-4xl mb-3">{service.icon}</p>
        <p className="text-rose-300 text-[11px] font-[Poppins] tracking-[0.2em] uppercase mb-1.5">{service.subtitle}</p>
        <h3 className="text-white text-xl lg:text-2xl font-semibold font-[Poppins] mb-3">{service.title}</h3>
        <p className="text-stone-300 text-sm font-[Poppins] leading-relaxed mb-4 line-clamp-2">{service.description}</p>
        <span className="inline-flex items-center gap-1.5 text-rose-400 text-xs font-[Poppins] tracking-wider group-hover:text-rose-300 transition-colors">
          View Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </motion.article>
  );
}

// ─── Services Page ─────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Helmet>
        <title>Services – House of Kashi | Wedding & Event Photography</title>
        <meta name="description" content="Explore all services offered by House of Kashi – wedding photography, pre-wedding shoots, birthday events, corporate events, Mehndi & Sangeet, and destination weddings." />
      </Helmet>

      {/* Page Hero */}
      <section className="relative pt-36 pb-24 bg-stone-900 text-center overflow-hidden" aria-labelledby="services-hero-heading">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${services[0].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 to-stone-900" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-rose-400 text-xs tracking-[0.35em] uppercase font-[Poppins] mb-4"
          >
            What We Offer
          </motion.p>
          <motion.h1
            id="services-hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-light text-white font-[Poppins] leading-tight mb-5"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-stone-300 font-[Poppins] text-base max-w-xl mx-auto"
          >
            From intimate ceremonies to grand destination weddings – we bring the same passion and precision to every event we photograph.
          </motion.p>
        </div>
      </section>

      {/* Services We Offer (text banner, matches reference) */}
      <section className="py-20 bg-white text-center" aria-labelledby="services-text-heading">
        <div className="max-w-4xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400 mb-8 font-[Poppins]"
          >
            Services We Offer
          </motion.p>
          <motion.h2
            id="services-text-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-3xl lg:text-5xl font-light text-rose-600 font-[Poppins] leading-tight"
          >
            Make your dream wedding come true.<br />
            Let us handle the details
          </motion.h2>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 bg-stone-50" aria-label="Services grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} onClick={setSelected} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white" aria-labelledby="why-us-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-400 mb-3 font-[Poppins]"
            >
              Why House of Kashi
            </motion.p>
            <motion.h2
              id="why-us-heading"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl lg:text-4xl font-light text-stone-800 font-[Poppins]"
            >
              The <span className="text-rose-600 italic">House of Kashi</span> Difference
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🎨", title: "Cinematic Storytelling", desc: "Every frame is composed with a filmmaker's eye – not just photographs, but moving visual narratives." },
              { icon: "💎", title: "Premium Quality", desc: "We use only the finest cameras, lenses, and lighting to ensure every image is gallery-worthy." },
              { icon: "🤝", title: "Personal Approach", desc: "We take time to understand your vision, ensuring every photo reflects your unique personality." },
              { icon: "⚡", title: "Fast Delivery", desc: "We respect your excitement. Previews within 48 hours; full gallery within 3–4 weeks." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center p-7 rounded-2xl bg-stone-50 hover:bg-rose-50 transition-colors duration-300 group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-stone-800 font-[Poppins] mb-3 text-base group-hover:text-rose-700 transition-colors">{item.title}</h3>
                <p className="text-stone-500 text-sm font-[Poppins] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900 text-center" aria-labelledby="services-cta-heading">
        <div className="max-w-2xl mx-auto px-4">
          <motion.h2
            id="services-cta-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl lg:text-4xl font-light text-white font-[Poppins] mb-5"
          >
            Ready to book your session?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-stone-400 font-[Poppins] mb-8"
          >
            Get in touch today to check availability and discuss your dream event.
          </motion.p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-rose-600 text-white text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-rose-500 transition-colors font-[Poppins]"
          >
            Get a Free Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </>
  );
}
