import { motion } from "framer-motion";

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
    body: "Brand overlays and campaigns go live during streams. Fully passive — creators stream as normal while revenue builds in real time through their Recast dashboard.",
  },
  {
    num: "Step 04",
    title: "Get Paid",
    body: "Revenue is calculated on average concurrent viewership with no caps and no ceiling. Payments come directly to creators, transparently, every month.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="border-t border-border py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How it works
        </motion.p>
        <motion.h2
          className="text-[clamp(36px,4vw,60px)] font-body font-extrabold tracking-[-2px] leading-[1.1] max-w-[780px] mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple for creators.
          <br />
          Powerful for brands.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="border-t border-border pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-[11px] font-semibold text-muted-foreground tracking-[0.1em] mb-6">
                {step.num}
              </p>
              <h3 className="text-xl font-body font-bold tracking-[-0.3px] mb-3">
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
