import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TypeformApplication from "@/components/TypeformApplication";

const perks = [
  {
    title: "Premium Brand Deals",
    description: "Get matched with top-tier gaming and betting brands for high-value sponsorships.",
  },
  {
    title: "Creative Freedom",
    description: "We protect your voice. No forced scripts — just authentic partnerships that fit your brand.",
  },
  {
    title: "Full Support",
    description: "From contract negotiation to content strategy, we handle the business so you can create.",
  },
  {
    title: "Grow Your Reach",
    description: "Leverage our network to expand into new platforms, markets, and revenue streams.",
  },
];

const creatorQuestions = [
  { id: "name", label: "What's your name?", type: "text" as const, placeholder: "Your full name", required: true },
  { id: "email", label: "What's your email?", type: "email" as const, placeholder: "you@email.com", required: true },
  { id: "platform", label: "What's your primary platform?", type: "select" as const, placeholder: "", options: ["YouTube", "Twitch", "TikTok", "Instagram", "Twitter/X", "Multiple"], required: true },
  { id: "audience", label: "What's your audience size?", type: "select" as const, placeholder: "", options: ["Under 10k", "10k – 50k", "50k – 250k", "250k – 1M", "1M+"], required: true },
  { id: "handle", label: "Drop your main social handle", type: "text" as const, placeholder: "@yourhandle", required: true },
  { id: "about", label: "Tell us about yourself and your content", type: "textarea" as const, placeholder: "What kind of content do you create? What makes your audience unique?", required: false },
];

const CreatorsPage = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center px-5 md:px-12 pt-20 md:pt-32 pb-12 md:pb-24">
        <motion.p
          className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          — For Creators
        </motion.p>
        <h1 className="text-[clamp(30px,7vw,100px)] font-display font-extrabold tracking-[-0.03em] leading-[0.9] uppercase mb-6 md:mb-8">
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Monetise Your
            </motion.span>
          </motion.span>
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block text-blue-accent"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Influence.
            </motion.span>
          </motion.span>
        </h1>
        <motion.p
          className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-[600px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Join Recast's roster and unlock premium brand deals with the biggest names in gaming and betting.
        </motion.p>
        <motion.div
          className="h-[2px] mt-8 bg-blue-accent max-w-[120px]"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        />
      </section>

      {/* Perks */}
      <section className="py-16 md:py-32 px-5 md:px-12 border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            — What You Get
          </motion.p>
          <motion.h2
            className="text-3xl md:text-6xl font-display font-extrabold tracking-[-0.03em] uppercase mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Creators <span className="text-blue-accent">Choose Us</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                className="border border-border p-8 md:p-10 hover:border-blue-accent/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight uppercase mb-3">{p.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <TypeformApplication
        title="Join The Roster"
        subtitle="Apply to become a Recast creator. We'll review your profile and get back to you within 48 hours."
        questions={creatorQuestions}
      />

      <Footer />
    </main>
  );
};

export default CreatorsPage;
