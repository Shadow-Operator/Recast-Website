import { motion } from "framer-motion";
import { ToggleRight, Lock, BarChart3 } from "lucide-react";

const features = [
  {
    icon: ToggleRight,
    title: "Fully On/Off",
    body: "Turn campaigns on or off whenever you want. Zero penalties.",
    glowing: true,
  },
  {
    icon: Lock,
    title: "Premium Partners Only",
    body: "Rotating campaigns with major global brands across sports, entertainment, and lifestyle. No content restrictions on your end.",
    glowing: false,
  },
  {
    icon: BarChart3,
    title: "Full Transparency",
    body: "Real-time visibility on earnings, impressions, and performance directly through your dashboard.",
    glowing: false,
  },
];

const ChannelControl = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-12 max-w-[1200px] mx-auto">
      <motion.h2
        className="text-[clamp(28px,4vw,48px)] font-body font-bold tracking-[-1px] mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Total Channel Control
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            className={`glass-card p-8 md:p-10 text-center group hover:border-primary/20 transition-all duration-500 ${
              feat.glowing ? "glow-blue-intense" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
              feat.glowing
                ? "bg-primary/15 text-primary"
                : "bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors"
            }`}>
              <feat.icon className="w-7 h-7" />
            </div>
            <h3 className="font-body font-bold text-lg mb-3">{feat.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feat.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ChannelControl;
