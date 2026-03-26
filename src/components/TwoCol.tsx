import { motion } from "framer-motion";

const TwoCol = () => {
  return (
    <section id="creators" className="grid md:grid-cols-2 border-y border-border">
      <motion.div
        className="px-4 md:px-12 py-12 md:py-20 border-b md:border-b-0 md:border-r border-border relative overflow-hidden group"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,_hsla(199,89%,58%,0.05)_0%,_transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-[22px] md:text-[28px] font-body font-extrabold tracking-[-0.5px] mb-4 md:mb-5 relative z-10">
          For Creators
        </h3>
        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-6 md:mb-8 relative z-10">
          Stop leaving money on the table. Recast turns your existing stream into a passive revenue engine — with no extra work, no brand scripts, and no compromise on your content.
        </p>
        <a
          href="#contact"
          className="inline-block border border-primary/40 text-primary font-medium text-sm md:text-[15px] px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-primary/10 transition-all relative z-10"
        >
          Join as a creator
        </a>
      </motion.div>
      <motion.div
        className="px-4 md:px-12 py-12 md:py-20 relative overflow-hidden group"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_hsla(199,89%,58%,0.05)_0%,_transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-[22px] md:text-[28px] font-body font-extrabold tracking-[-0.5px] mb-4 md:mb-5 relative z-10">
          For Brands
        </h3>
        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-6 md:mb-8 relative z-10">
          Reach highly engaged betting and gaming audiences through creators they already trust. We handle the entire partnership lifecycle — from creator selection to live campaign management and performance reporting.
        </p>
        <a
          href="#contact"
          className="inline-block border border-primary/40 text-primary font-medium text-sm md:text-[15px] px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-primary/10 transition-all relative z-10"
        >
          Partner with us
        </a>
      </motion.div>
    </section>
  );
};

export default TwoCol;
