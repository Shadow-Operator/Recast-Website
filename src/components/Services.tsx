import { motion } from "framer-motion";
import AnimatedUnderline from "./AnimatedUnderline";
import FloatingSuits from "./FloatingSuits";

const capabilities = [
  {
    num: "01",
    title: "Creator monetisation",
    sub: "For Creators",
    body: "We connect Twitch and YouTube creators with diverse revenue streams — from brand deals and sponsorships to ad overlays, affiliate partnerships, and integrated content campaigns.",
  },
  {
    num: "02",
    title: "Brand partnerships",
    sub: "For Brands",
    body: "Access a curated network of gaming and betting-aligned creators with real, engaged audiences. We manage the full campaign lifecycle — creator selection, deal negotiation, content integration, and performance reporting.",
  },
  {
    num: "03",
    title: "Betting & gaming specialists",
    sub: "Our Speciality",
    body: "From securing sponsorship deals and managing ad overlays to coordinating content integrations and tracking affiliate performance — we are the only agency built end-to-end for the betting and gaming creator space.",
  },
];

const Services = () => {
  return (
    <section id="brands" className="border-t border-border relative overflow-hidden">
      <FloatingSuits suits={[
        { suit: "♠", x: "90%", y: "15%", className: "text-blue-accent", rotate: -10, delay: 0.5, duration: 8 },
        { suit: "♦", x: "5%", y: "55%", className: "text-blue-accent", size: "text-[100px] md:text-[150px]", rotate: 12, delay: 2 },
      ]} />
      <div className="px-5 md:px-12 py-10 md:py-20 max-w-[1400px] mx-auto">
        <motion.p
          className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="w-6 h-[1px] bg-blue-accent" />
          What we do
        </motion.p>
        <motion.h2
          className="font-display font-bold tracking-[-0.02em] leading-[1.05] max-w-[780px] text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Everything a creator{" "}
          <AnimatedUnderline delay={0.1}>
            <span className="text-blue-accent">needs.</span>
          </AnimatedUnderline>
          <br />
          Everything a brand{" "}
          <AnimatedUnderline delay={0.2}>
            <span className="text-blue-accent">wants.</span>
          </AnimatedUnderline>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-3 border-y border-border">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.num}
            className="px-5 md:px-12 py-10 md:py-14 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0 hover:bg-card group transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground mb-6 md:mb-12 uppercase">
              {cap.num}
            </p>
            <h3 className="text-[22px] md:text-[28px] font-display font-bold tracking-[-0.01em] mb-3 md:mb-4 group-hover:text-blue-accent transition-colors">
              {cap.title}
            </h3>
            <p className="text-[11px] font-semibold text-blue-accent uppercase tracking-[0.15em] mb-5">
              {cap.sub}
            </p>
            <p className="text-[15px] text-muted-foreground font-light leading-[1.7]">
              {cap.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
