import { motion } from "framer-motion";
import FloatingSuits from "./FloatingSuits";

const Mission = () => {
  return (
    <section id="about" className="py-16 md:py-32 px-4 md:px-12 max-w-[1400px] mx-auto relative">
      <FloatingSuits suits={[
        { suit: "♣", x: "85%", y: "10%", className: "text-primary", rotate: -15, delay: 0 },
        { suit: "♥", x: "75%", y: "60%", className: "text-primary", size: "text-[100px] md:text-[140px]", rotate: 10, delay: 1.5 },
      ]} />

      <motion.p
        className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-8 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="w-6 h-[1px] bg-muted-foreground" />
        Who we are
      </motion.p>
      <motion.h2
        className="text-[clamp(32px,4vw,56px)] font-display font-bold tracking-[-0.02em] leading-[1.05] max-w-[780px] mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        The bridge between the world's biggest <span className="text-primary">creators</span> and the world's biggest brands.
      </motion.h2>
      <motion.p
        className="text-lg text-muted-foreground font-light leading-[1.7] max-w-[580px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Recast was built for a space most agencies don't understand. We know the creators, we know the brands, and we know what it takes to make a partnership land in the betting and gaming world.{" "}
        <strong className="text-foreground font-medium">
          No wasted spend. No misaligned deals. Just the right creators, with the right brands, at the right time.
        </strong>
      </motion.p>
    </section>
  );
};

export default Mission;
