import { motion } from "framer-motion";
import FloatingSuits from "./FloatingSuits";
const capabilities = [
  {
    num: "01",
    title: "Creator Monetisation",
    sub: "For Creators",
    icon: "🎰",
    body: "We connect Twitch and YouTube creators with diverse revenue streams — from brand deals and sponsorships to ad overlays, affiliate partnerships, and integrated content campaigns. Multiple income channels, zero extra effort.",
  },
  {
    num: "02",
    title: "Brand Partnerships",
    sub: "For Brands",
    icon: "🃏",
    body: "Access a curated network of gaming and betting-aligned creators with real, engaged audiences. We manage the full campaign lifecycle — creator selection, deal negotiation, content integration, ad placement, and performance reporting.",
  },
  {
    num: "03",
    title: "Betting & Gaming Specialists",
    sub: "Our Speciality",
    icon: "🎲",
    body: "From securing sponsorship deals and managing ad overlays to coordinating content integrations and tracking affiliate performance — we are the only agency built end-to-end for the betting and gaming creator space.",
  },
];

const Services = () => {
  return (
    <section id="brands" className="border-t border-border">
      <div className="px-6 md:px-12 py-16 md:py-20 max-w-[1400px] mx-auto">
        <motion.p
          className="text-[11px] font-semibold tracking-[0.15em] uppercase text-primary mb-8"
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
            className="px-6 md:px-12 py-14 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0 hover:bg-card group transition-colors duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_hsla(199,89%,58%,0.06)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <p className="text-3xl mb-6">{cap.icon}</p>
            <p className="text-[11px] font-semibold tracking-[0.1em] text-primary mb-12 relative z-10">
              {cap.num}
            </p>
            <h3 className="text-[28px] font-body font-extrabold tracking-[-0.5px] mb-4 relative z-10">
              {cap.title}
            </h3>
            <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-5 relative z-10">
              {cap.sub}
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed relative z-10">
              {cap.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
