import { motion } from "framer-motion";

const brandNames = [
  "Fanatics", "Papa John's", "Stake", "Betway", "DraftKings", "FanDuel", "888sport",
];

const Brands = () => {
  return (
    <section className="py-10 md:py-16 border-y border-border/30 overflow-hidden">
      <motion.p
        className="text-center text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/40 mb-8 md:mb-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Premium brand partners
      </motion.p>
      <div className="overflow-hidden">
        <div className="marquee-track animate-scroll-right">
          {[...brandNames, ...brandNames].map((name, i) => (
            <span key={i} className="flex items-center gap-16 md:gap-20 px-8 md:px-10">
              <motion.span
                className="text-lg md:text-xl font-bold tracking-[-0.5px] text-foreground/15 hover:text-primary/60 transition-colors whitespace-nowrap cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {name}
              </motion.span>
              <span className="text-primary/15 text-sm">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
