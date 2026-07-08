import { motion } from "framer-motion";

// Fast viewport — fires as soon as 10% of the element is visible
const VP = { once: true, amount: 0.1 };

/**
 * SectionHeading – reusable animated section title block.
 *
 * Props:
 *  label    – small uppercase text above the heading (e.g. "PORTFOLIO")
 *  title    – main heading (string or JSX)
 *  subtitle – optional paragraph below heading
 *  center   – boolean, center-align when true (default: true)
 *  light    – boolean, white text variant for dark backgrounds
 *  className – extra classes on the wrapper
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  center = true,
  light = false,
  className = "",
}) {
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {label && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.6 }}
          className={`text-xs font-semibold uppercase tracking-[0.25em] mb-3 font-[Poppins] ${
            light ? "text-rose-300" : "text-rose-400"
          }`}
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        transition={{ duration: 0.6, delay: 0.07 }}
        className={`font-[Poppins] font-light leading-tight ${
          light ? "text-white" : "text-stone-800"
        }`}
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, delay: 0.14 }}
          className={`mt-5 leading-relaxed font-[Poppins] max-w-2xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-stone-300 text-base" : "text-stone-500 text-base"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
