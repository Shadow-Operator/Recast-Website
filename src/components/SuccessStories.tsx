import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Award } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "500%", label: "Average Growth" },
  { icon: BarChart3, value: "50M+", label: "Total Reach" },
  { icon: Award, value: "100+", label: "Brand Deals" },
];

const SuccessStories = () => {
  return (
    <section className="py-24 md:py-32" style={{ background: "linear-gradient(180deg, hsl(0,0%,100%) 0%, hsl(340,60%,95%) 100%)" }}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          SUCCESS <span className="text-gradient-pink">STORIES</span>
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Our proven strategies and comprehensive management solutions will propel your brand forward, giving you the competitive edge you need.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-pink flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <p className="text-5xl font-display font-bold text-gradient-pink mb-2">{stat.value}</p>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
