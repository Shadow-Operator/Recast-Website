import { motion } from "framer-motion";

const TwoCol = () => {
  return (
    <section id="creators" className="grid md:grid-cols-2 border-y border-border">
      <motion.div
        className="px-5 md:px-12 py-10 md:py-20 border-b md:border-b-0 md:border-r border-border group"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-[22px] md:text-[28px] font-display font-bold tracking-[-0.01em] mb-4 md:mb-5">
          For creators
        </h3>
        <p className="text-sm md:text-[15px] text-muted-foreground font-light leading-[1.7] mb-6 md:mb-8">
          Stop leaving money on the table. Recast turns your existing stream into a passive revenue engine — with no extra work, no brand scripts, and no compromise on your content.
        </p>
        <a
          href="#contact"
          className="inline-block border border-primary text-primary font-semibold text-[13px] px-6 md:px-8 py-3 md:py-3.5 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          Join as a creator
        </a>
      </motion.div>
      <motion.div
        className="px-5 md:px-12 py-10 md:py-20 group"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-[22px] md:text-[28px] font-display font-bold tracking-[-0.01em] mb-4 md:mb-5">
          For brands
        </h3>
        <p className="text-sm md:text-[15px] text-muted-foreground font-light leading-[1.7] mb-6 md:mb-8">
          Reach highly engaged betting and gaming audiences through creators they already trust. We handle the entire partnership lifecycle — from creator selection to live campaign management and performance reporting.
        </p>
        <a
          href="#contact"
          className="inline-block border border-primary text-primary font-semibold text-[13px] px-6 md:px-8 py-3 md:py-3.5 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          Partner with us
        </a>
      </motion.div>
    </section>
  );
};

export default TwoCol;
