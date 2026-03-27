import { motion } from "framer-motion";
import AnimatedUnderline from "./AnimatedUnderline";
import RollingDice from "./RollingDice";
import FloatingSuits from "./FloatingSuits";

const CTA = () => {
  return (
    <section id="contact" className="pt-4 pb-10 md:pt-8 md:pb-24 px-5 md:px-6 text-center relative overflow-hidden">
      <FloatingSuits suits={[
        { suit: "♠", x: "5%", y: "20%", className: "text-blue-accent", rotate: -15, delay: 0 },
        { suit: "♥", x: "90%", y: "15%", className: "text-blue-accent", size: "text-[100px] md:text-[140px]", rotate: 10, delay: 1 },
        { suit: "♦", x: "8%", y: "70%", className: "text-blue-accent", size: "text-[90px] md:text-[120px]", rotate: 20, delay: 2 },
        { suit: "♣", x: "85%", y: "65%", className: "text-blue-accent", size: "text-[100px] md:text-[150px]", rotate: -8, delay: 0.5 },
      ]} />

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
        className="text-[clamp(30px,7vw,96px)] font-display font-extrabold tracking-[-0.03em] leading-[0.9] mb-5 md:mb-8 max-w-[900px] mx-auto relative z-10 uppercase"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ready to
        <br />
        <AnimatedUnderline delay={0.3}>
          <span className="text-blue-accent">roll the dice?</span>
        </AnimatedUnderline>
      </motion.h2>

      <motion.p
        className="text-base md:text-lg text-muted-foreground font-light max-w-[480px] mx-auto mb-8 md:mb-12 leading-[1.7] relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        Whether you're a creator looking to monetise your stream or a brand
        looking to reach the right audience — let's talk.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="mailto:harry@recast.gg"
          className="bg-blue-accent text-white font-semibold text-sm md:text-[15px] px-6 md:px-8 py-3 md:py-3.5 hover:bg-blue-glow transition-colors"
        >
          Get in touch
        </a>
        <a
          href="#about"
          className="border border-blue-accent text-blue-accent font-semibold text-sm md:text-[15px] px-6 md:px-8 py-3 md:py-3.5 hover:bg-blue-accent hover:text-white transition-all"
        >
          Learn more
        </a>
      </motion.div>
    </section>
  );
};

export default CTA;
