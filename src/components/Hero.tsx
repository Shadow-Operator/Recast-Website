import { motion } from "framer-motion";

const cardSuits = ["♠", "♥", "♦", "♣"];

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 pt-24 md:pt-32 pb-12 md:pb-20 relative overflow-hidden">
      {/* Ambient blue glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_hsla(199,89%,58%,0.08)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_hsla(199,89%,58%,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* Headline */}
      <div className="relative mb-8 md:mb-16">
        {/* Animated card suits that fan out - hidden on small mobile */}
        <div className="absolute -right-4 md:right-20 top-1/2 -translate-y-1/2 hidden sm:flex items-center">
          {cardSuits.map((suit, i) => (
            <motion.span
              key={i}
              className={`absolute text-5xl md:text-7xl select-none pointer-events-none ${
                i === 1 ? "text-red-500" : i === 2 ? "text-primary" : "text-foreground"
              }`}
              style={{ opacity: 0.12 }}
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

        <h1 className="text-[clamp(40px,9vw,120px)] font-body font-black tracking-[-2px] md:tracking-[-4px] leading-[0.95] capitalize">
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
              where gaming
            </motion.span>
          </motion.span>
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block text-gradient-blue"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              meets gambling
            </motion.span>
          </motion.span>
        </h1>

        {/* Horizontal line wipe */}
        <motion.div
          className="h-[2px] mt-6 rounded-full gradient-blue"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        />
      </div>

      {/* Bottom two-col */}
      <div className="grid md:grid-cols-2 gap-12 items-end max-w-[1400px]">
        <motion.p
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[520px]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <strong className="text-foreground font-semibold">
            Recast is the talent agency connecting the world's top content creators with leading betting and gaming brands.
          </strong>{" "}
          We specialise in high-value partnerships that perform — built on real audiences, real influence, and real results.
        </motion.p>

        <motion.div
          className="flex gap-4 md:justify-end"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
        >
          <a
            href="#contact"
            className="gradient-blue text-primary-foreground font-bold text-[15px] px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity glow-blue"
          >
            Get started
          </a>
          <a
            href="#how"
            className="border border-border text-foreground font-medium text-[15px] px-8 py-3.5 rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            How it works
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
