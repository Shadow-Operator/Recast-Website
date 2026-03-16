import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Scrolling marquee headline */}
      <div className="relative z-10 w-full overflow-hidden mb-12">
        <motion.div
          className="marquee-track animate-scroll-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 mr-6">
              <span className="text-7xl md:text-[8rem] lg:text-[10rem] font-display tracking-wider text-foreground whitespace-nowrap">
                STRETCH YOUR REACH
              </span>
              <span className="text-5xl md:text-7xl text-primary">—</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl mb-10 text-muted-foreground font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Recast empowers you to efficiently and effectively streamline your brand by creating, managing, and facilitating content for you.
        </motion.p>

        <motion.a
          href="#work-with-us"
          className="inline-block gradient-pink text-primary-foreground font-display text-2xl tracking-wider px-10 py-4 rounded-full glow-pink hover:scale-105 transition-transform cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          APPLY NOW
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-10 h-10 rounded-full border border-muted-foreground/30 flex items-center justify-center">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
