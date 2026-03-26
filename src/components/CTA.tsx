import { motion } from "framer-motion";
import RollingDice from "./RollingDice";

const CTA = () => {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-6 text-center relative overflow-hidden hud-grid">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_hsla(199,89%,58%,0.08)_0%,_transparent_60%)] pointer-events-none" />

      {/* 3D Dice */}
      <motion.div
        className="relative z-10 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <RollingDice />
      </motion.div>

      <motion.h2
        className="text-[clamp(36px,7vw,80px)] font-body font-bold tracking-[-2px] md:tracking-[-3px] leading-none mb-6 md:mb-8 max-w-[800px] mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ready to
        <br />
        <span className="text-gradient-blue">roll the dice?</span>
      </motion.h2>

      <motion.p
        className="text-sm md:text-base text-muted-foreground max-w-[480px] mx-auto mb-10 md:mb-14 leading-relaxed relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        Whether you're a streamer looking for passive income or a brand
        wanting to reach engaged gaming audiences — let's talk.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="mailto:harry@recast.gg"
          className="gradient-blue text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity glow-blue"
        >
          Initialize Setup
        </a>
        <a
          href="#about"
          className="border border-primary/30 text-primary font-medium text-sm px-8 py-3.5 rounded-full hover:bg-primary/10 transition-all"
        >
          Learn more
        </a>
      </motion.div>

      <motion.p
        className="mt-16 text-xs font-mono text-muted-foreground/30 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Recast. The standard for creator monetization.
      </motion.p>
    </section>
  );
};

export default CTA;
