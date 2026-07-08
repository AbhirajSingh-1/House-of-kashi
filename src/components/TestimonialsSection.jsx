import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "../data/siteData";

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#e11d48" className="text-rose-600" />
      ))}
    </div>
  );
}

function TestimonialCard({ name, location, text, rating, image, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative bg-white rounded-2xl p-7 shadow-md shadow-stone-100 border border-stone-100 flex flex-col gap-4 hover:shadow-xl hover:shadow-rose-100/40 transition-shadow duration-400 group"
    >
      {/* Quote mark */}
      <div className="absolute top-5 right-7 text-6xl leading-none text-rose-100 font-serif select-none group-hover:text-rose-200 transition-colors">
        "
      </div>

      <StarRating count={rating} />

      <p className="text-stone-600 text-sm leading-relaxed font-[Poppins] italic relative z-10">
        "{text}"
      </p>

      <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-11 h-11 rounded-full object-cover border-2 border-rose-100"
        />
        <div>
          <p className="font-semibold text-stone-800 text-sm font-[Poppins]">{name}</p>
          <p className="text-rose-500 text-xs font-[Poppins] tracking-wide">{location}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-stone-50" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-400 mb-3 font-[Poppins]"
          >
            Love Notes
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-light text-stone-800 font-[Poppins]"
          >
            What Our Couples Say
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
