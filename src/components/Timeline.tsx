import { motion } from "framer-motion";

const steps = [
  { label: "Agreement", desc: "Campaign agreement sent for simple e-signature." },
  { label: "Setup Call", desc: "A quick 1-on-1 call to walk through the technical integration." },
  { label: "Verification", desc: "Standard identity and payment details collected for brand compliance." },
  { label: "Go Live", desc: "The passive income engine runs.", highlight: true },
];

const Timeline = () => {
  return (
    <section id="how" className="py-20 md:py-32 px-4 md:px-12 max-w-[1200px] mx-auto">
      <motion.h2
        className="text-[clamp(28px,4vw,48px)] font-body font-bold tracking-[-1px] mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Live and Earning Within 72 Hours
      </motion.h2>

      {/* Steps */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-14">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
          >
            <h3 className={`font-body font-bold text-base md:text-lg mb-2 ${step.highlight ? "text-primary" : ""}`}>
              {step.label}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div
        className="glass-card p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-muted-foreground/60">Time-to-Live</span>
        </div>

        <div className="relative h-3 rounded-full bg-secondary overflow-hidden">
          {/* Track */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full gradient-blue"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
          />

          {/* Dot markers */}
          {[0, 33, 66, 100].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${
                i === 3
                  ? "border-primary bg-primary glow-blue-intense"
                  : "border-muted-foreground/30 bg-secondary"
              }`}
              style={{ left: `${pos}%`, transform: `translate(-50%, -50%)` }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.2, type: "spring" }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-mono text-muted-foreground/50">Now</span>
          <span className="text-xs font-mono text-primary font-semibold">72 Hours</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Timeline;
