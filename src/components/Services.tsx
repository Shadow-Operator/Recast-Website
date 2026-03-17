import { motion } from "framer-motion";

const capabilities = [
  {
    num: "01",
    title: "Creator Monetisation",
    sub: "For Creators",
    body: "We connect Twitch and YouTube creators with passive revenue streams that require zero extra effort. Overlay deals, affiliate partnerships, and brand campaigns that run in the background while you stream.",
  },
  {
    num: "02",
    title: "Brand Partnerships",
    sub: "For Brands",
    body: "Access a curated network of gaming and betting-aligned creators with real, engaged audiences. We handle everything — creator selection, onboarding, compliance, campaign management, and performance reporting.",
  },
  {
    num: "03",
    title: "Gambling Niche Specialists",
    sub: "Our Speciality",
    body: "From securing deals to negotiating terms, retaining partnerships, and managing affiliate stats — we are the only agency that truly specialises in the betting and gaming creator space end to end.",
  },
];

const Services = () => {
  return (
    <section id="brands" className="border-t border-border">
      <div className="px-6 md:px-12 py-16 md:py-20 max-w-[1400px] mx-auto">
        <motion.p
          className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What we do
        </motion.p>
        <motion.h2
          className="text-[clamp(36px,4vw,60px)] font-body font-extrabold tracking-[-2px] leading-[1.1] max-w-[780px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Everything a creator needs.
          <br />
          Everything a brand wants.
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-3 border-y border-border">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.num}
            className="px-6 md:px-12 py-14 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0 hover:bg-card transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground mb-12">
              {cap.num}
            </p>
            <h3 className="text-[28px] font-body font-extrabold tracking-[-0.5px] mb-4">
              {cap.title}
            </h3>
            <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-5">
              {cap.sub}
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              {cap.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
