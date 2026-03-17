import { motion } from "framer-motion";

const TwoCol = () => {
  return (
    <section id="creators" className="grid md:grid-cols-2 border-y border-border">
      <motion.div
        className="px-6 md:px-12 py-16 md:py-20 border-b md:border-b-0 md:border-r border-border"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-[28px] font-body font-extrabold tracking-[-0.5px] mb-5">
          For Creators
        </h3>
        <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
          Stop leaving money on the table. Recast turns your existing stream into a passive revenue engine — with no extra work, no brand scripts, and no compromise on your content.
        </p>
        <a
          href="#contact"
          className="inline-block border border-border text-foreground font-medium text-[15px] px-8 py-3.5 rounded-full hover:border-foreground/40 hover:bg-foreground/5 transition-all"
        >
          Join as a creator
        </a>
      </motion.div>
      <motion.div
        className="px-6 md:px-12 py-16 md:py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-[28px] font-body font-extrabold tracking-[-0.5px] mb-5">
          For Brands
        </h3>
        <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
          Reach highly engaged betting and gaming audiences through creators they already trust. We handle the entire partnership lifecycle — from creator selection to live campaign management and performance reporting.
        </p>
        <a
          href="#contact"
          className="inline-block border border-border text-foreground font-medium text-[15px] px-8 py-3.5 rounded-full hover:border-foreground/40 hover:bg-foreground/5 transition-all"
        >
          Partner with us
        </a>
      </motion.div>
    </section>
  );
};

export default TwoCol;
