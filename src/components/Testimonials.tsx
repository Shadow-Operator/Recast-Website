import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Recast matched us with creators who genuinely understood our product and audience. Conversion rates exceeded every benchmark we set. The quality of placement was on another level.",
    name: "Marketing Director",
    company: "Leading Brand Partner",
    type: "Brand",
  },
  {
    quote: "The team handled everything from creator brief to compliance across three markets. We went live in under two weeks with zero back-and-forth on our end. That kind of execution is rare.",
    name: "Head of Partnerships",
    company: "Global Gaming Operator",
    type: "Brand",
  },
  {
    quote: "I went from chasing brand deals myself to having a full pipeline managed for me. My monthly revenue from partnerships alone doubled within 90 days. Recast genuinely gets the creator side of this.",
    name: "FaZe Jarvis",
    company: "YouTube · 5.69M",
    type: "Creator",
  },
  {
    quote: "Every brand Recast has put me with actually fits my audience. No awkward integrations, no scripts that feel off. Just deals that make sense for my content and convert for the brand.",
    name: "Harriet Parkes",
    company: "Instagram · 165K",
    type: "Creator",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-32 px-5 md:px-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          . What they say
        </motion.p>
        <motion.h2
          className="text-[clamp(28px,4vw,56px)] font-display font-extrabold tracking-[-0.03em] leading-[0.95] uppercase mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Trusted by <span className="text-blue-accent">creators</span><br />and brands alike.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="border border-border p-6 md:p-8 bg-card/10 flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-blue-accent">
                {t.type}
              </span>
              <p className="text-sm md:text-base text-muted-foreground font-light leading-[1.8] flex-1">
                "{t.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-[11px] text-muted-foreground tracking-[0.05em] mt-0.5">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
