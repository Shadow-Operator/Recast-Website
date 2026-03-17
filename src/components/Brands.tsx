import { motion } from "framer-motion";

const brandNames = [
  "Fanatics", "Papa John's", "Stake", "Betway", "DraftKings", "FanDuel", "888sport",
];

const Brands = () => {
  return (
    <section className="py-20 border-y border-border overflow-hidden">
      <motion.p
        className="text-center text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Brands we work with
      </motion.p>
      <div className="overflow-hidden">
        <div className="marquee-track animate-scroll-right">
          {[...brandNames, ...brandNames].map((name, i) => (
            <span key={i} className="flex items-center gap-16 md:gap-20 px-8 md:px-10">
              <motion.span
                className="text-xl md:text-[22px] font-bold tracking-[-0.5px] text-foreground/20 hover:text-primary/80 transition-colors whitespace-nowrap cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {name}
              </motion.span>
              <span className="text-primary/30">♠</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
