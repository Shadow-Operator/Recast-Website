import { motion } from "framer-motion";
import ConnectionAnimation from "./ConnectionAnimation";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 pt-24 md:pt-32 pb-12 md:pb-20 relative overflow-hidden">
      {/* Headline */}
      <div className="relative mb-6 md:mb-10">
        <h1 className="text-[clamp(28px,5vw,64px)] font-display font-extrabold tracking-[-0.02em] leading-[1.1] uppercase max-w-[900px]">
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              We Exist To Close The Gap
            </motion.span>
          </motion.span>
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block text-primary"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Between The World's Biggest
            </motion.span>
          </motion.span>
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block text-primary"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Creators And Brands.
            </motion.span>
          </motion.span>
        </h1>

        {/* Accent rule */}
        <motion.div
          className="h-[2px] mt-6 bg-primary max-w-[120px]"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        />
      </div>

      {/* Connection Animation — 16:9 */}
      <motion.div
        className="w-full max-w-[1200px] mb-8 md:mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <ConnectionAnimation />
      </motion.div>

      {/* Bottom two-col */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-end max-w-[1400px]">
        <motion.p
          className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-[520px]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <strong className="text-foreground font-medium">
            Recast is the talent agency connecting the world's top content creators with leading betting and gaming brands.
          </strong>{" "}
          We specialise in high-value partnerships that perform — built on real audiences, real influence, and real results.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 md:justify-end"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
        >
          <a
            href="#contact"
            className="bg-primary text-primary-foreground font-semibold text-sm md:text-[15px] px-6 md:px-8 py-3 md:py-3.5 rounded-none hover:opacity-85 transition-opacity text-center"
          >
            Get started
          </a>
          <a
            href="#how"
            className="border border-border text-foreground font-medium text-sm md:text-[15px] px-6 md:px-8 py-3 md:py-3.5 rounded-none hover:border-primary/40 hover:text-primary transition-all text-center"
          >
            How it works
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
