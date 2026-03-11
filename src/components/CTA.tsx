import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section id="work-with-us" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-pink opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(0,0%,100%,0.15),transparent_60%)]" />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          WORK WITH US
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Our team works closely with you to manage your brand and distribute content in a way that best serves your unique business while staying in step with your mission and style.
        </motion.p>
        <motion.a
          href="https://recast.gg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary-foreground text-primary font-display font-semibold px-10 py-4 rounded-full text-lg hover:scale-105 transition-transform cursor-pointer shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Apply Now
        </motion.a>
      </div>
    </section>
  );
};

export default CTA;
