import { motion } from "framer-motion";

const StreamDemo = () => {
  return (
    <section id="mechanism" className="py-20 md:py-32 px-4 md:px-12 max-w-[1200px] mx-auto">
      <motion.h2
        className="text-[clamp(28px,4vw,48px)] font-body font-bold tracking-[-1px] mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        The Mechanism: Non-Intrusive Ad Overlays
      </motion.h2>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 items-center">
        {/* Fake stream window */}
        <motion.div
          className="glass-card p-3 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {/* Stream viewport */}
          <div className="relative bg-card rounded-lg overflow-hidden aspect-video">
            {/* Fake game content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-lg bg-secondary/50 flex items-center justify-center">
                <div className="space-y-3 w-2/3">
                  <div className="h-3 rounded bg-muted-foreground/10 w-full" />
                  <div className="h-3 rounded bg-muted-foreground/10 w-4/5" />
                  <div className="flex gap-2 mt-4">
                    <div className="w-8 h-8 rounded-full bg-muted-foreground/10" />
                    <div className="w-8 h-8 rounded-full bg-muted-foreground/10" />
                    <div className="w-8 h-8 rounded-full bg-muted-foreground/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Ad overlay - bottom right */}
            <motion.div
              className="absolute bottom-4 right-4 w-28 md:w-36 h-16 md:h-20 rounded-lg gradient-blue glow-blue-intense"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />

            {/* Chat sidebar */}
            <div className="absolute top-0 right-0 w-1/4 h-full bg-card/80 border-l border-border/50 p-2">
              <p className="text-[10px] font-semibold text-muted-foreground/60 mb-2">Chat</p>
              <div className="space-y-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/15 mt-0.5 flex-shrink-0" />
                    <div className={`h-1.5 rounded bg-muted-foreground/10 ${i % 3 === 0 ? 'w-full' : i % 2 === 0 ? 'w-3/4' : 'w-1/2'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Callout points */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-primary font-bold text-sm mb-2">Zero effort required</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              — no scripts, no interruption to content, no change to your stream.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 }}
          >
            <h3 className="font-bold text-sm mb-2">
              Appears <span className="text-primary">briefly every 10 minutes.</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Non-intrusive overlay that viewers barely notice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="font-bold text-sm mb-2">
              <span className="text-primary">Bottom-right</span> corner placement.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Silent, small banner — never blocks gameplay or key content.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StreamDemo;
