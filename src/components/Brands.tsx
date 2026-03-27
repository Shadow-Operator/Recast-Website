import { motion } from "framer-motion";

const brandNames = [
  "Fanatics", "Papa John's", "Stake", "Betway", "DraftKings", "FanDuel", "888sport",
];

const Brands = () => {
  return (
    <section className="py-12 md:py-20 border-y border-border overflow-hidden">
      <motion.p
        className="text-center text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-8 md:mb-12"
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
                className="text-xl md:text-[22px] font-display font-bold tracking-[-0.5px] text-foreground/15 hover:text-blue-accent/60 transition-colors whitespace-nowrap cursor-default uppercase"
                whileHover={{ scale: 1.05 }}
              >
                {name}
              </motion.span>
              <span className="text-blue-accent/20">♠</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
