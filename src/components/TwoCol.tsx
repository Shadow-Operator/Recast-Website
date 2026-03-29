import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
          We handle the brand deals, negotiations, and campaign management so you can focus on creating the content your audience loves.
        </p>
        <Link
          to="/creators"
          className="inline-block border border-blue-accent text-blue-accent font-semibold text-[13px] px-6 md:px-8 py-3 md:py-3.5 hover:bg-blue-accent hover:text-white transition-all"
        >
          Join as a creator
        </Link>
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
          Reach engaged audiences through creators they already trust. We handle everything from creator selection to campaign management and performance reporting.
        </p>
        <Link
          to="/brands"
          className="inline-block border border-blue-accent text-blue-accent font-semibold text-[13px] px-6 md:px-8 py-3 md:py-3.5 hover:bg-blue-accent hover:text-white transition-all"
        >
          Partner with us
        </Link>
      </motion.div>
    </section>
  );
};

export default TwoCol;
