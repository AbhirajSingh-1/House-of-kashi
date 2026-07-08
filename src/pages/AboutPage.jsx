import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Camera, Award, Users } from "lucide-react";

import SectionHeading        from "../components/SectionHeading";
import TestimonialsSection   from "../components/TestimonialsSection";
import { about1, about2, about3 } from "../data/siteData";

// ─── Parallax Image Strip ─────────────────────────────────────────────────────
import img1 from "../assets/pexels-bertellifotografia-16985116.webp";
import img2 from "../assets/pexels-anna-pou-9345711.webp";
import img3 from "../assets/pexels-fotographiya-wedding-photography-823737813-30184620.webp";
import img4 from "../assets/pexels-vireshstudio-20720821.webp";

const team = [
  {
    name: "Aryan Kashi",
    role: "Lead Photographer & Creative Director",
    bio: "Aryan's cinematic eye and deep passion for storytelling transforms every wedding into a breathtaking visual masterpiece.",
    img: about1,
  },
  {
    name: "Priya Sharma",
    role: "Senior Photographer & Film Director",
    bio: "Priya specialises in candid storytelling – finding the magic in unscripted moments that make weddings uniquely beautiful.",
    img: about2,
  },
  {
    name: "Rohit Verma",
    role: "Event Coordinator & Second Shooter",
    bio: "Rohit ensures every logistic flows seamlessly, so the team captures every moment without missing a beat.",
    img: about3,
  },
];

const values = [
  { icon: <Heart size={28} className="text-rose-600" />, title: "Passion", desc: "We don't clock in and out – we fall in love with every couple's story and pour that into our work." },
  { icon: <Camera size={28} className="text-rose-600" />, title: "Artistry", desc: "Photography is painting with light. We treat every frame as a canvas deserving our finest craft." },
  { icon: <Award size={28} className="text-rose-600" />, title: "Excellence", desc: "From equipment to editing, we settle for nothing less than the absolute best in every deliverable." },
  { icon: <Users size={28} className="text-rose-600" />, title: "Family", desc: "When you book House of Kashi, you're not hiring a vendor – you're welcoming us into your family." },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <Helmet>
        <title>About Us – House of Kashi | Our Story & Team</title>
        <meta name="description" content="Meet the team behind House of Kashi – passionate photographers and storytellers based in Varanasi, dedicated to capturing your most cherished moments." />
      </Helmet>

      {/* ── Parallax Hero ── */}
      <section
        id="story"
        ref={heroRef}
        className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-center justify-center"
        aria-labelledby="about-hero-heading"
      >
        <motion.img
          src={img1}
          alt="Our photography team at work"
          style={{ y: yImg }}
          className="absolute inset-0 w-full h-[110%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-rose-300 text-xs tracking-[0.35em] uppercase font-[Poppins] mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            id="about-hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-light text-white font-[Poppins] leading-tight"
          >
            Born from a Love of<br />
            <span className="italic text-rose-300">Love Stories</span>
          </motion.h1>
        </div>
      </section>

      {/* ── Our Story Text ── */}
      <section className="py-24 bg-white" aria-label="Our story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image collage */}
            <div className="relative h-[480px]">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="absolute top-0 left-0 w-[60%] h-[65%] rounded-2xl overflow-hidden shadow-xl shadow-stone-200"
              >
                <img src={img2} alt="Wedding photography" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-xl shadow-stone-200"
              >
                <img src={img3} alt="Bridal portrait" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-400 font-[Poppins]"
              >
                About House of Kashi
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl lg:text-4xl font-light text-stone-800 font-[Poppins] leading-tight"
              >
                We Tell <span className="text-rose-600 italic">Your Story</span>,<br />Frame by Frame
              </motion.h2>
              {[
                "House of Kashi was founded on a simple but powerful belief: every love story is unique, and every wedding deserves to be remembered in its most authentic, beautiful form.",
                "Born in the sacred city of Varanasi – where every stone holds history and every sunrise glows with divine light – we bring that same depth of feeling to every celebration we document.",
                "Our philosophy is timeless: arrive early, listen deeply, and capture honestly. We don't create scenes – we recognise them, and preserve them forever.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  className="text-stone-500 leading-relaxed font-[Poppins] text-base"
                >
                  {para}
                </motion.p>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-600 text-white text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-rose-700 transition-colors font-[Poppins]"
                >
                  Work With Us <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Our Values ── */}
      <section className="py-24 bg-[#faf8f5]" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Values"
            title={<>What Drives <span className="text-rose-600 italic">Everything</span> We Do</>}
            subtitle="These are the four pillars on which House of Kashi was built and continues to thrive."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 hover:shadow-lg hover:border-rose-100 transition-all duration-400 text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-5 group-hover:bg-rose-100 transition-colors">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-stone-800 font-[Poppins] mb-3 text-lg">{v.title}</h3>
                <p className="text-stone-500 text-sm font-[Poppins] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section id="team" className="py-24 bg-white" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="The Team"
            title={<>Meet the <span className="text-rose-600 italic">Artists</span> Behind the Lens</>}
            subtitle="A passionate team of photographers, filmmakers, and storytellers who pour their hearts into every frame."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="relative mb-6 mx-auto w-48 h-48">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-rose-100 group-hover:border-rose-300 transition-colors duration-400 shadow-lg">
                    <img
                      src={member.img}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-stone-800 font-[Poppins] text-xl mb-1">{member.name}</h3>
                <p className="text-rose-500 text-xs font-[Poppins] tracking-wider uppercase mb-4">{member.role}</p>
                <p className="text-stone-500 text-sm font-[Poppins] leading-relaxed max-w-xs mx-auto">{member.bio}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>
    </>
  );
}
