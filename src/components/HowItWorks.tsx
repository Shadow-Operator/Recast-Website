import { motion } from "framer-motion";
import FloatingSuits from "./FloatingSuits";

const steps = [
  {
    num: "Step 01",
    title: "Agreement",
    body: "Campaign agreement sent. Simple, transparent terms — our fee is purely a percentage of earnings. We only make money when you do.",
  },
  {
    num: "Step 02",
    title: "Setup Call",
    body: "A quick 1-on-1 call to walk through the technical integration. Standard identity and payment details collected for brand compliance.",
  },
  {
    num: "Step 03",
    title: "Go Live",
    body: "Non-intrusive ad overlays go live on your stream within 72 hours. Fully passive — stream exactly as you normally would while revenue builds in real time.",
  },
  {
    num: "Step 04",
    title: "Get Paid",
    body: "Revenue is calculated on average concurrent viewership at $15 CPM with no caps. Real-time visibility on earnings, impressions, and performance through your dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="border-t border-border py-16 md:py-32 px-4 md:px-12 relative overflow-hidden">
      <FloatingSuits suits={[
        { suit: "♥", x: "88%", y: "30%", className: "text-red-500", rotate: 8, delay: 0.3, duration: 9 },
        { suit: "♣", x: "2%", y: "65%", className: "text-foreground", size: "text-[90px] md:text-[130px]", rotate: -12, delay: 1.8 },
        { suit: "♠", x: "70%", y: "75%", className: "text-foreground", size: "text-[80px] md:text-[110px]", rotate: 20, delay: 3 },
      ]} />
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          className="text-[11px] font-semibold tracking-[0.15em] uppercase text-primary mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How it works
        </motion.p>
        <motion.h2
          className="text-[clamp(28px,4vw,60px)] font-body font-extrabold tracking-[-1px] md:tracking-[-2px] leading-[1.1] max-w-[780px] mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Live and earning
          <br />
          <span className="text-gradient-blue">within 72 hours.</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="border-t border-primary/30 pt-8 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <motion.p
                className="text-[11px] font-semibold text-primary tracking-[0.1em] mb-6"
                whileInView={{ opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.3 }}
              >
                {step.num}
              </motion.p>
              <h3 className="text-xl font-body font-bold tracking-[-0.3px] mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
