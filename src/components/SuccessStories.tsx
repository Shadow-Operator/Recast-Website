import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Award } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "500%", label: "Average Growth" },
  { icon: BarChart3, value: "50M+", label: "Total Reach" },
  { icon: Award, value: "100+", label: "Brand Deals" },
];

const SuccessStories = () => {
  return (
    <section className="py-24 md:py-32 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <motion.p
          className="text-sm font-mono tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Results
        </motion.p>
        <motion.h2
          className="text-5xl md:text-7xl font-display tracking-wider text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          SUCCESS <span className="text-gradient-pink">STORIES</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-pink flex items-center justify-center mx-auto mb-6">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <p className="text-6xl md:text-7xl font-display tracking-wider text-gradient-pink mb-3">{stat.value}</p>
              <p className="text-muted-foreground font-medium tracking-wide uppercase text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
