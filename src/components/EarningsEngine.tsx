import { motion } from "framer-motion";

const cards = [
  {
    value: "$15 CPM",
    label: "Cost per 1,000 viewers per ad",
    highlighted: false,
  },
  {
    value: "6 Ads / Hour",
    label: "Running seamlessly every 10 minutes",
    highlighted: false,
  },
  {
    value: "Passive Hourly Revenue",
    label: "Scaling infinitely with your audience size",
    highlighted: true,
  },
];

const EarningsEngine = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-12 max-w-[1200px] mx-auto">
      <motion.h2
        className="text-[clamp(28px,4vw,48px)] font-body font-bold tracking-[-1px] mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        The Earnings Engine
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-stretch">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="relative flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            {/* Operator between cards */}
            {i > 0 && (
              <div className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-background border border-border items-center justify-center">
                <span className="text-muted-foreground font-bold text-sm">
                  {i === 1 ? "×" : "="}
                </span>
              </div>
            )}

            <div
              className={`flex-1 rounded-xl p-8 md:p-10 flex flex-col items-center justify-center text-center ${
                card.highlighted
                  ? "glass-card-bright glow-blue-intense"
                  : "glass-card"
              }`}
            >
              <p className={`text-[clamp(24px,3vw,36px)] font-body font-bold tracking-[-1px] mb-3 ${
                card.highlighted ? "text-foreground" : "text-foreground"
              }`}>
                {card.value}
              </p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EarningsEngine;
