import { motion } from "framer-motion";
import RollingDice from "./RollingDice";
import FloatingSuits from "./FloatingSuits";

const CTA = () => {
  return (
    <section id="contact" className="pt-6 pb-16 md:pt-8 md:pb-24 px-6 text-center relative overflow-hidden">
      {/* Blue radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_hsla(199,89%,58%,0.08)_0%,_transparent_70%)] pointer-events-none" />

      {/* 3D Dice */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <RollingDice />
      </motion.div>

      <motion.h2
        className="text-[clamp(48px,7vw,96px)] font-body font-black tracking-[-3px] leading-none mb-8 max-w-[900px] mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ready to
        <br />
        <span className="text-gradient-blue">roll the dice?</span>
      </motion.h2>

      <motion.p
        className="text-lg text-muted-foreground max-w-[480px] mx-auto mb-12 leading-relaxed relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        Whether you're a creator looking to monetise your stream or a brand
        looking to reach the right audience — let's talk.
      </motion.p>
      <motion.div
        className="flex gap-4 justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="mailto:harry@recast.gg"
          className="gradient-blue text-primary-foreground font-bold text-[15px] px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity glow-blue"
        >
          Get in touch
        </a>
        <a
          href="#about"
          className="border border-primary/40 text-primary font-medium text-[15px] px-8 py-3.5 rounded-full hover:bg-primary/10 transition-all"
        >
          Learn more
        </a>
      </motion.div>
    </section>
  );
};

export default CTA;
