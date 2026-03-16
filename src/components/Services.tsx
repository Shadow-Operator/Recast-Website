import { motion } from "framer-motion";
import { Users, Camera, Handshake } from "lucide-react";

const services = [
  {
    icon: Users,
    label: "Agents",
    title: "Not all eyeballs are created equal",
    description: "We hand-select creators with loyal, highly-engaged audiences so your messaging resonates with the right people and drives real results.",
  },
  {
    icon: Camera,
    label: "Content",
    title: "Born outside the box",
    description: "Our team brings brands and creators together through relatable, entertaining content that makes lasting impressions and delivers measurable impact.",
  },
  {
    icon: Handshake,
    label: "Partnerships",
    title: "Measure smarter, scale bigger",
    description: "We go beyond surface-level metrics with insights from audience engagement and sentiment to deliver scalable, adaptable partnerships.",
  },
];

const Services = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.p
          className="text-sm font-mono tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What we do
        </motion.p>
        <motion.h2
          className="text-5xl md:text-7xl font-display tracking-wider text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          BUILD YOUR BRAND
          <br />
          <span className="text-gradient-pink">UNDER ONE ROOF</span>
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground mb-20 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          With world-class creators and decades of experience, we streamline the entire process. We turn ideas into meaningful moments.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="rounded-2xl p-8 border border-border bg-card hover:border-primary/30 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 rounded-xl gradient-pink flex items-center justify-center mb-6 group-hover:glow-pink transition-all">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-3">{service.label}</p>
              <h3 className="text-2xl font-display tracking-wide mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
