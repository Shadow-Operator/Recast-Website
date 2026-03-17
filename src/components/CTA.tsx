import { motion } from "framer-motion";
import RollingDice from "./RollingDice";
import FloatingSuits from "./FloatingSuits";

const CTA = () => {
  return (
    <section id="contact" className="pt-4 pb-12 md:pt-8 md:pb-24 px-4 md:px-6 text-center relative overflow-hidden">
      <FloatingSuits suits={[
        { suit: "♠", x: "5%", y: "20%", className: "text-foreground", rotate: -15, delay: 0 },
        { suit: "♥", x: "90%", y: "15%", className: "text-red-500", size: "text-[100px] md:text-[140px]", rotate: 10, delay: 1 },
        { suit: "♦", x: "8%", y: "70%", className: "text-primary", size: "text-[90px] md:text-[120px]", rotate: 20, delay: 2 },
        { suit: "♣", x: "85%", y: "65%", className: "text-foreground", size: "text-[100px] md:text-[150px]", rotate: -8, delay: 0.5 },
      ]} />
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
