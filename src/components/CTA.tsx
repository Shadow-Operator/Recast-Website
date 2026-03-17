import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section id="contact" className="py-32 md:py-40 px-6 text-center relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_hsla(0,0%,100%,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <motion.h2
        className="text-[clamp(48px,7vw,96px)] font-body font-black tracking-[-3px] leading-none mb-8 max-w-[900px] mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ready to
        <br />
        get started?
      </motion.h2>
      <motion.p
        className="text-lg text-muted-foreground max-w-[480px] mx-auto mb-12 leading-relaxed relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        Whether you're a creator looking to monetise your stream or a brand looking to reach the right audience — let's talk.
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
          className="bg-foreground text-background font-bold text-[15px] px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity"
        >
          Get in touch
        </a>
        <a
          href="#about"
          className="border border-border text-foreground font-medium text-[15px] px-8 py-3.5 rounded-full hover:border-foreground/40 hover:bg-foreground/5 transition-all"
        >
          Learn more
        </a>
      </motion.div>
    </section>
  );
};

export default CTA;
