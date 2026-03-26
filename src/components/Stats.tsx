import { motion } from "framer-motion";

const stats = [
  { number: "$15", label: "CPM per 1,000 viewers" },
  { number: "6", label: "Ads per hour, every 10 minutes" },
  { number: "72hrs", label: "From signup to live and earning" },
  { number: "100%", label: "Passive — zero content obligations" },
];

const Stats = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 border-y border-border">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="px-4 md:px-12 py-8 md:py-16 border-r border-border last:border-r-0 even:border-r-0 md:even:border-r md:last:border-r-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <p className="text-[clamp(32px,4vw,64px)] font-body font-black tracking-[-1px] md:tracking-[-2px] leading-none mb-1 md:mb-2">
            {stat.number}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default Stats;
