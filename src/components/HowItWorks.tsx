import { motion } from "framer-motion";
import FloatingSuits from "./FloatingSuits";
const steps = [
  {
    num: "Step 01",
    title: "Onboarding",
    body: "Creators join the Recast network in under 10 minutes. We handle all brand verification and Twitch compliance setup on your behalf.",
  },
  {
    num: "Step 02",
    title: "Campaign Match",
    body: "We match creators with brands that fit their audience, content style, and platform. No misaligned deals — every partnership is curated for performance.",
  },
  {
    num: "Step 03",
    title: "Go Live",
    body: "Brand deals, ad overlays, and content integrations go live across your channels. Fully passive — creators stream as normal while revenue builds in real time through their Recast dashboard.",
  },
  {
    num: "Step 04",
    title: "Get Paid",
    body: "Revenue is calculated on average concurrent viewership with no caps and no ceiling. Payments come directly to creators, transparently, every month.",
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
          Simple for creators.
          <br />
          Powerful for brands.
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
