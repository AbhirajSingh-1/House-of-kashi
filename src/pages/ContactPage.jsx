import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { SITE } from "../data/siteData";

const contactInfo = [
  {
    icon: <Phone size={22} className="text-rose-600" />,
    label: "Phone / WhatsApp",
    value: SITE.phoneFormatted,
    href: `tel:${SITE.phone}`,
  },
  {
    icon: <Mail size={22} className="text-rose-600" />,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: <MapPin size={22} className="text-rose-600" />,
    label: "Studio Address",
    value: SITE.address,
    href: "https://maps.google.com/?q=Varanasi+Uttar+Pradesh+India",
  },
  {
    icon: <Clock size={22} className="text-rose-600" />,
    label: "Studio Hours",
    value: "Mon – Sat: 10:00 AM – 7:00 PM",
    href: null,
  },
];

const services = [
  "Wedding Photography",
  "Pre-Wedding Shoot",
  "Birthday Event",
  "Corporate Event",
  "Mehndi & Sangeet",
  "Destination Wedding",
  "Other",
];

function ContactInfoCard({ icon, label, value, href, index }) {
  const Inner = (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-stone-400 font-[Poppins] uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-stone-700 font-medium font-[Poppins] text-sm">{value}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-5 rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-rose-100 transition-all duration-300"
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group">{Inner}</a>
      ) : (
        Inner
      )}
    </motion.div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", date: "", message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1800);
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm font-[Poppins] placeholder:text-stone-400 focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-200";

  return (
    <>
      <Helmet>
        <title>Contact Us – House of Kashi | Book Your Wedding Photography</title>
        <meta name="description" content="Contact House of Kashi to book your wedding photography session. Call +91 90602 99666 or fill out our enquiry form. Based in Varanasi, serving all of India." />
      </Helmet>

      {/* Page Hero */}
      <section className="relative pt-36 pb-20 bg-stone-900 text-center overflow-hidden" aria-labelledby="contact-hero-heading">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/30 via-transparent to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-rose-400 text-xs tracking-[0.35em] uppercase font-[Poppins] mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            id="contact-hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-light text-white font-[Poppins] leading-tight mb-5"
          >
            Let's Start Your<br />
            <span className="italic text-rose-300">Love Story</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-stone-300 font-[Poppins] text-base"
          >
            Reach out to us and let's plan something extraordinary together.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#faf8f5]" aria-labelledby="contact-form-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* ── Left: Info ── */}
            <div className="lg:col-span-2 space-y-5">
              <div className="mb-8">
                <motion.h2
                  id="contact-form-heading"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-2xl lg:text-3xl font-light text-stone-800 font-[Poppins] mb-3"
                >
                  We'd love to hear <span className="text-rose-600 italic">from you</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-stone-500 font-[Poppins] text-sm leading-relaxed"
                >
                  Whether you're planning a grand wedding or an intimate ceremony, we are here to listen and help create memories you'll cherish forever.
                </motion.p>
              </div>

              {contactInfo.map((info, i) => (
                <ContactInfoCard key={info.label} {...info} index={i} />
              ))}

              {/* WhatsApp quick CTA */}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                href={`https://wa.me/${SITE.whatsapp}?text=Hello%20House%20of%20Kashi!%20I%20would%20like%20to%20book%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 shadow-lg shadow-green-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p className="font-semibold font-[Poppins] text-sm">Chat on WhatsApp</p>
                  <p className="text-green-100 text-xs font-[Poppins]">Quickest way to reach us!</p>
                </div>
              </motion.a>
            </div>

            {/* ── Right: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-stone-100 border border-stone-100"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-5"
                >
                  <CheckCircle2 size={56} className="text-green-500 mx-auto" />
                  <h3 className="text-2xl font-semibold text-stone-800 font-[Poppins]">Message Sent!</h3>
                  <p className="text-stone-500 font-[Poppins] max-w-sm mx-auto">
                    Thank you for reaching out. We'll get back to you within 24 hours to discuss your dream event!
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", service: "", date: "", message: "" }); }}
                    className="px-8 py-3 bg-rose-600 text-white rounded-full text-sm font-semibold font-[Poppins] hover:bg-rose-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact form">
                  <h3 className="text-xl font-semibold text-stone-800 font-[Poppins] mb-6">Send an Enquiry</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-stone-600 font-[Poppins] uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Priya Sharma"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-stone-600 font-[Poppins] uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="priya@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-stone-600 font-[Poppins] uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-xs font-semibold text-stone-600 font-[Poppins] uppercase tracking-wider mb-2">
                        Event Date
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs font-semibold text-stone-600 font-[Poppins] uppercase tracking-wider mb-2">
                      Service Required *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Select a service…</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-stone-600 font-[Poppins] uppercase tracking-wider mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your event – venue, guest count, vision, and anything else we should know…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 py-4 bg-rose-600 text-white text-sm font-bold tracking-[0.15em] uppercase font-[Poppins] rounded-xl hover:bg-rose-700 disabled:opacity-70 transition-all duration-300 shadow-lg shadow-rose-200 hover:shadow-rose-300"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Map Embed */}
      <section aria-label="Studio location map" className="h-72 w-full">
        <iframe
          title="House of Kashi Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57744.11297853456!2d82.97318505!3d25.31780655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68a5f174a84c7a8a!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
