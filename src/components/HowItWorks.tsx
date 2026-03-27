import { motion } from "framer-motion";
import AnimatedUnderline from "./AnimatedUnderline";
import FloatingSuits from "./FloatingSuits";

const steps = [
  {
    num: "Step 01",
    title: "Onboarding",
    body: "Creators join the Recast network in under 10 minutes. We handle all brand verification and Twitch compliance setup on your behalf.",
  },
  {
    num: "Step 02",
    title: "Campaign match",
    body: "We match creators with brands that fit their audience, content style, and platform. No misaligned deals — every partnership is curated for performance.",
  },
  {
    num: "Step 03",
    title: "Go live",
    body: "Brand deals, ad overlays, and content integrations go live across your channels. Fully passive — creators stream as normal while revenue builds in real time.",
  },
  {
    num: "Step 04",
    title: "Get paid",
    body: "Revenue is calculated on average concurrent viewership with no caps and no ceiling. Payments come directly to creators, transparently, every month.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="border-t border-border py-12 md:py-32 px-5 md:px-12 relative overflow-hidden">
      <FloatingSuits suits={[
        { suit: "♥", x: "88%", y: "30%", className: "text-blue-accent", rotate: 8, delay: 0.3, duration: 9 },
        { suit: "♣", x: "2%", y: "65%", className: "text-blue-accent", size: "text-[90px] md:text-[130px]", rotate: -12, delay: 1.8 },
      ]} />
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="w-6 h-[1px] bg-blue-accent" />
          How it works
        </motion.p>
        <motion.h2
          className="text-[clamp(28px,4vw,56px)] font-display font-bold tracking-[-0.02em] leading-[1.05] max-w-[780px] mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple for creators.
          <br />
          <AnimatedUnderline delay={0.2}>
            <span className="text-blue-accent">Powerful</span>
          </AnimatedUnderline>{" "}
          for brands.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="border-t border-border pt-8 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <p className="text-[10px] font-semibold text-blue-accent tracking-[0.15em] mb-6 uppercase">
                {step.num}
              </p>
              <h3 className="text-xl font-display font-bold tracking-[-0.01em] mb-3 group-hover:text-blue-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-[1.7]">
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
