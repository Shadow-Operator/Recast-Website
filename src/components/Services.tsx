import { motion } from "framer-motion";
import FloatingSuits from "./FloatingSuits";

const capabilities = [
  {
    num: "01",
    title: "Non-Intrusive Ad Overlays",
    sub: "The Mechanism",
    icon: "🎰",
    body: "A small branded overlay appears in the bottom-right corner of your stream every 10 minutes. No scripts, no interruptions to content, no change to your stream. It's seamless, silent, and fully passive.",
  },
  {
    num: "02",
    title: "Uncapped Earnings at $15 CPM",
    sub: "The Earnings Engine",
    icon: "💰",
    body: "Earn $15 per 1,000 viewers per ad, with 6 ads running every hour. Revenue scales infinitely with your audience — no caps, no ceiling. A streamer with 5,000 viewers can earn over $100K annually.",
  },
  {
    num: "03",
    title: "Premium Brand Partners",
    sub: "Major Brands",
    icon: "🃏",
    body: "Rotating campaigns with major global brands across sports, entertainment, and lifestyle. Full transparency on earnings, impressions, and performance through your real-time dashboard. No content restrictions on your end.",
  },
];

const Services = () => {
  return (
    <section id="brands" className="border-t border-border relative overflow-hidden">
      <FloatingSuits suits={[
        { suit: "♠", x: "90%", y: "15%", className: "text-foreground", rotate: -10, delay: 0.5, duration: 8 },
        { suit: "♦", x: "5%", y: "55%", className: "text-primary", size: "text-[100px] md:text-[150px]", rotate: 12, delay: 2 },
      ]} />
      <div className="px-4 md:px-12 py-12 md:py-20 max-w-[1400px] mx-auto">
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
          Passive income from major brands.
          <br />
          <span className="text-gradient-blue">Zero effort required.</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-3 border-y border-border">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.num}
            className="px-4 md:px-12 py-10 md:py-14 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0 hover:bg-card group transition-colors duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_hsla(199,89%,58%,0.06)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <p className="text-2xl md:text-3xl mb-4 md:mb-6">{cap.icon}</p>
            <p className="text-[11px] font-semibold tracking-[0.1em] text-primary mb-6 md:mb-12 relative z-10">
              {cap.num}
            </p>
            <h3 className="text-[22px] md:text-[28px] font-body font-extrabold tracking-[-0.5px] mb-3 md:mb-4 relative z-10">
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
