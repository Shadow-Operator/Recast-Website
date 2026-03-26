import { motion } from "framer-motion";

const oldWayItems = [
  "Reading scripts",
  "Negotiating briefs",
  "Pausing gameplay",
  "Chasing invoices",
];

const OldVsNew = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-12 max-w-[1200px] mx-auto">
      <motion.h2
        className="text-[clamp(28px,4vw,48px)] font-body font-bold tracking-[-1px] leading-[1.15] mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Passive income from major brands.
        <br />
        <span className="text-muted-foreground">Zero effort required.</span>
      </motion.h2>
      <motion.p
        className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-[700px] mb-12 md:mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Recast is a specialized talent agency connecting Twitch and Kick streamers with global brands across sports, entertainment, and lifestyle. You earn simply by doing what you already do.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* The Old Way */}
        <motion.div
          className="glass-card p-8 md:p-10 relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-body font-semibold text-muted-foreground/60 mb-8">
            The Old Way
          </h3>
          <ul className="space-y-5">
            {oldWayItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-muted-foreground/50">
                <span className="w-5 h-5 rounded-sm border border-muted-foreground/20 flex items-center justify-center text-xs">✕</span>
                <span className="line-through text-base font-mono">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* The Recast Way */}
        <motion.div
          className="glass-card-bright p-8 md:p-10 relative animate-border-glow"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-body font-semibold text-primary mb-8">
            The Recast Way
          </h3>
          <div className="flex items-center justify-center h-[calc(100%-60px)]">
            <p className="text-[clamp(28px,4vw,44px)] font-body font-bold tracking-[-1px] leading-[1.15] text-center">
              Stream. We handle
              <br />the rest.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OldVsNew;
