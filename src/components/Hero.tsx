import { motion } from "framer-motion";
import AnimatedUnderline from "./AnimatedUnderline";
import WobblyLines from "./WobblyLines";

const cardSuits = ["♠", "♥", "♦", "♣"];

const Hero = () => {
  return (
    <section className="min-h-[85vh] md:min-h-screen flex flex-col justify-center px-5 md:px-12 pt-20 md:pt-32 pb-10 md:pb-20 relative overflow-hidden">
      {/* Wobbly lines background - behind everything */}
      <WobblyLines />

      {/* Animated card suits that fan out */}
      <div className="absolute -right-4 md:right-20 top-1/2 -translate-y-1/2 hidden sm:flex items-center z-[1]">
        {cardSuits.map((suit, i) => (
          <motion.span
            key={i}
            className="absolute text-5xl md:text-7xl select-none pointer-events-none text-blue-accent"
            style={{ opacity: 0.08 }}
            initial={{ rotate: 0, x: 0, y: 0, scale: 0 }}
            animate={{
              rotate: -20 + i * 15,
              x: (i - 1.5) * 45,
              y: Math.sin(i * 1.2) * 20,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 1.2 + i * 0.15,
              type: "spring",
              stiffness: 120,
            }}
          >
            {suit}
          </motion.span>
        ))}
      </div>

      {/* Headline */}
      <div className="relative mb-6 md:mb-16 z-[2]">
        <h1 className="text-[clamp(36px,7vw,110px)] font-display font-extrabold tracking-[-0.03em] leading-[0.9] uppercase">
          <motion.span
            className="block text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              We Represent
            </motion.span>
          </motion.span>
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hidden md:inline">CREATORS WHO{" "}</span>
              <span className="md:hidden text-3xl">CREATORS WHO</span>
              <span className="block md:inline">
                <AnimatedUnderline delay={0.6} color="blue">
                  <span className="text-blue-accent text-3xl">Move Culture.</span>
                </AnimatedUnderline>
              </span>
            </motion.span>
          </motion.span>
        </h1>
      </div>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center relative z-[2] mb-6 md:mb-10"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <a
          href="#contact"
          className="bg-blue-accent text-white font-semibold text-sm md:text-[15px] px-6 md:px-8 py-3 md:py-3.5 rounded-none hover:bg-blue-glow transition-colors text-center"
        >
          Get started
        </a>
        <a
          href="#how"
          className="border border-border text-foreground font-medium text-sm md:text-[15px] px-6 md:px-8 py-3 md:py-3.5 rounded-none hover:border-blue-accent/40 hover:text-blue-accent transition-all text-center"
        >
          How it works
        </a>
      </motion.div>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-[580px] relative z-[2]"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.95 }}
      >
        <strong className="text-foreground font-medium">
          Recast is the talent agency connecting the world's top content creators with leading betting and gaming brands.
        </strong>{" "}
        We specialise in high-value partnerships that perform — built on real audiences, real influence, and real results.
      </motion.p>
    </section>
  );
};

export default Hero;
