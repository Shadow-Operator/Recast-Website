import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section id="work-with-us" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Scrolling marquee */}
      <div className="w-full overflow-hidden mb-16">
        <div className="marquee-track animate-scroll-left">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 mr-6">
              <span className="text-5xl md:text-7xl font-display tracking-wider text-foreground/10 whitespace-nowrap">
                READY TO GROW?
              </span>
              <span className="text-3xl md:text-5xl text-primary/20">—</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h2
          className="text-5xl md:text-7xl font-display tracking-wider text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          WORK <span className="text-gradient-pink">WITH US</span>
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Bring your ideas, and we'll bring the strategy. We'll unlock the creator space for you and create something designed for real impact.
        </motion.p>
        <motion.a
          href="https://recast.gg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block gradient-pink text-primary-foreground font-display text-2xl tracking-wider px-10 py-4 rounded-full glow-pink hover:scale-105 transition-transform cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          GET STARTED
        </motion.a>
      </div>
    </section>
  );
};

export default CTA;
