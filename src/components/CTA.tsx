import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RollingDice from "./RollingDice";

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Update the mutable ref for the dice
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      scrollProgress.current = v;
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const diceOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-40 px-6 text-center relative overflow-hidden"
    >
      {/* Blue radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_hsla(199,89%,58%,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <motion.h2
        className="text-[clamp(48px,7vw,96px)] font-body font-black tracking-[-3px] leading-none mb-4 max-w-[900px] mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ready to
      </motion.h2>

      {/* 3D Dice */}
      <motion.div style={{ opacity: diceOpacity }} className="relative z-10 my-6">
        <RollingDice scrollProgress={scrollProgress} />
      </motion.div>

      <motion.h2
        className="text-[clamp(48px,7vw,96px)] font-body font-black tracking-[-3px] leading-none mb-8 max-w-[900px] mx-auto relative z-10"
        style={{ opacity: textOpacity }}
      >
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
