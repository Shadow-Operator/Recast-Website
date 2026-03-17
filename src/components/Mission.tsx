import { motion } from "framer-motion";

const Mission = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative">
      {/* Decorative element */}
      <motion.div
        className="absolute top-20 right-10 text-primary/10 text-8xl font-bold select-none pointer-events-none hidden md:block"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        ♣
      </motion.div>

      <motion.p
        className="text-[11px] font-semibold tracking-[0.15em] uppercase text-primary mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Who we are
      </motion.p>
      <motion.h2
        className="text-[clamp(36px,4vw,60px)] font-body font-extrabold tracking-[-2px] leading-[1.1] max-w-[780px] mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        The bridge between <span className="text-gradient-blue">gambling brands</span> and gaming creators.
      </motion.h2>
      <motion.p
        className="text-lg text-muted-foreground leading-relaxed max-w-[580px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Recast was built for a space most agencies don't understand. We know the creators, we know the brands, and we know what it takes to make a partnership land in the betting and gaming world.{" "}
        <strong className="text-foreground">
          No wasted spend. No misaligned deals. Just the right creators, with the right brands, at the right time.
        </strong>
      </motion.p>
    </section>
  );
};

export default Mission;
