import { motion } from "framer-motion";
import { Users, Camera, Handshake } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Social Media Management",
    description: "Captivate your audience with compelling visuals and engaging posts that drive real growth.",
  },
  {
    icon: Camera,
    title: "Exclusive Content Management",
    description: "Unlock the full potential of your content, streamline interactions, and boost earnings on various platforms.",
  },
  {
    icon: Handshake,
    title: "Brand Partnerships",
    description: "Forge lucrative collaborations that amplify your influence. Experience digital success with us today!",
  },
];

const Services = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          OUR <span className="text-gradient-pink">SERVICES</span>
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Everything you need to dominate the digital landscape.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 rounded-xl gradient-pink flex items-center justify-center mb-6 group-hover:animate-pulse-glow transition-all">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
