import { motion } from "framer-motion";
import { Target, Lightbulb, Heart, Sparkles, Shield } from "lucide-react";

const values = [
  { icon: Shield, label: "Integrity" },
  { icon: Sparkles, label: "Creativity" },
  { icon: Heart, label: "Empowerment" },
  { icon: Target, label: "Collaboration" },
  { icon: Lightbulb, label: "Innovation" },
];

const Mission = () => {
  return (
    <section className="py-24 md:py-32 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <motion.p
          className="text-sm font-mono tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Who we are
        </motion.p>
        <motion.h2
          className="text-5xl md:text-7xl font-display tracking-wider text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          MISSION & <span className="text-gradient-pink">VALUES</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            className="text-lg text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            We are dedicated to providing innovative solutions that enhance creators' online journeys. Our purpose is to empower them to authentically connect with their audience while optimizing monetization across diverse platforms.
          </motion.p>
          <motion.p
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We promise to deliver unwavering support, cutting-edge strategies, and a collaborative partnership that fuels your digital success.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              className="rounded-xl px-6 py-4 flex items-center gap-3 border border-border bg-background hover:border-primary/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <v.icon className="w-5 h-5 text-primary" />
              <span className="font-display text-lg tracking-wide">{v.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
