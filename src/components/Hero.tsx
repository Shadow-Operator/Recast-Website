import { motion } from "framer-motion";
import recastIcon from "@/assets/recast-icon.png";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden hud-grid">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_hsla(199,89%,58%,0.06)_0%,_transparent_60%)] pointer-events-none" />

      <div className="text-center px-4 max-w-[900px] relative z-10">
        {/* Logo */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src={recastIcon} alt="Recast" className="h-14 md:h-20 mx-auto" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-[clamp(36px,7vw,80px)] font-body font-bold tracking-[-2px] md:tracking-[-3px] leading-[1.05] mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Passive income for streamers.
          <br />
          <span className="text-gradient-blue">Major brands. No effort.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-sm md:text-base font-mono tracking-wide text-muted-foreground mb-10 md:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          A Recast Agency Briefing
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="#contact"
            className="gradient-blue text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity glow-blue"
          >
            Start earning
          </a>
          <a
            href="#mechanism"
            className="border border-border text-foreground font-medium text-sm px-8 py-3.5 rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            See how it works
          </a>
        </motion.div>

        {/* HUD label */}
        <motion.div
          className="mt-16 md:mt-24 flex items-center justify-center gap-6 text-[10px] md:text-xs font-mono text-muted-foreground/40 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span>Interface v1.0</span>
          <span className="w-8 h-px bg-primary/20" />
          <span>Signal Strength: <span className="text-primary/60">MAX</span></span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
