import { motion } from "framer-motion";

const pillars = [
  { label: "Brand Sourcing", position: "top-left" },
  { label: "Tech Integration", position: "top-right" },
  { label: "Reporting & Support", position: "bottom-left" },
  { label: "Campaign Management", position: "bottom-right" },
];

const Partnership = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-12 max-w-[1200px] mx-auto">
      <motion.h2
        className="text-[clamp(28px,4vw,48px)] font-body font-bold tracking-[-1px] mb-12 md:mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        An End-to-End Partnership
      </motion.h2>

      {/* Hub layout */}
      <motion.div
        className="relative max-w-[700px] mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="glass-card p-5 md:p-6 text-center hover:border-primary/20 transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <p className="font-body font-semibold text-sm md:text-base">{pillar.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Center creator icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-foreground/20 bg-background flex items-center justify-center z-10">
          <div className="text-center">
            <span className="text-2xl md:text-3xl">🎮</span>
          </div>
        </div>

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
          <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="hsla(199,89%,58%,0.15)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="hsla(199,89%,58%,0.15)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="hsla(199,89%,58%,0.15)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="hsla(199,89%,58%,0.15)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Fee callout */}
      <motion.div
        className="glass-card-bright p-6 md:p-8 text-center max-w-[600px] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm md:text-base text-muted-foreground">
          Our fee is purely a percentage of earnings.
        </p>
        <p className="font-body font-bold text-lg md:text-xl mt-1">
          We only make money when you do.
        </p>
      </motion.div>
    </section>
  );
};

export default Partnership;
