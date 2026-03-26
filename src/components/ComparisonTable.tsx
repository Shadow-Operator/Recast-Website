import { motion } from "framer-motion";
import { Check } from "lucide-react";

const rows = [
  {
    category: "Deliverables",
    old: "Reading scripts and forced shoutouts.",
    recast: "Zero effort required.",
  },
  {
    category: "Viewer Experience",
    old: "Intrusive video breaks.",
    recast: "Silent, bottom-right banner.",
  },
  {
    category: "Content Control",
    old: "Strict content restrictions.",
    recast: "Stream exactly as you normally would.",
  },
];

const ComparisonTable = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-12 max-w-[1200px] mx-auto">
      <motion.h2
        className="text-[clamp(28px,4vw,48px)] font-body font-bold tracking-[-1px] mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Frictionless Value
      </motion.h2>

      <motion.div
        className="glass-card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        {/* Header */}
        <div className="grid grid-cols-3 border-b border-border/50">
          <div className="p-4 md:p-6" />
          <div className="p-4 md:p-6 text-center border-x border-border/50">
            <p className="font-body font-semibold text-muted-foreground/60 text-sm md:text-base">
              Traditional Sponsorships
            </p>
          </div>
          <div className="p-4 md:p-6 text-center bg-primary/5">
            <p className="font-body font-bold text-primary text-sm md:text-base">
              Recast Overlays
            </p>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 ${i < rows.length - 1 ? "border-b border-border/30" : ""}`}
          >
            <div className="p-4 md:p-6 flex items-center">
              <p className="font-body font-semibold text-sm md:text-base">{row.category}</p>
            </div>
            <div className="p-4 md:p-6 flex items-center border-x border-border/30">
              <p className="text-muted-foreground/50 text-sm">{row.old}</p>
            </div>
            <div className="p-4 md:p-6 flex items-center gap-3 bg-primary/5">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-primary" />
              </span>
              <p className="text-sm font-medium">{row.recast}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ComparisonTable;
