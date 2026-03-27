import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TypeformApplication from "@/components/TypeformApplication";

const stats = [
  { value: "50+", label: "Brand Partners" },
  { value: "200M+", label: "Audience Reach" },
  { value: "98%", label: "Campaign Success Rate" },
  { value: "3x", label: "Average ROI" },
];

const benefits = [
  {
    title: "Authentic Audiences",
    description: "Access creators with deeply engaged communities in gaming, betting, and lifestyle verticals.",
  },
  {
    title: "Performance-Driven",
    description: "Every campaign is built around measurable KPIs — from signups and deposits to brand lift.",
  },
  {
    title: "Compliance First",
    description: "We handle regulatory requirements across jurisdictions so you can scale with confidence.",
  },
  {
    title: "End-To-End Management",
    description: "From creator selection to content approval and reporting — we manage the entire process.",
  },
];

const brandQuestions = [
  { id: "company", label: "What's the name of your company?", type: "text" as const, placeholder: "e.g. Betway, DraftKings...", required: true },
  { id: "name", label: "What's your name?", type: "text" as const, placeholder: "Your full name", required: true },
  { id: "email", label: "What's your work email?", type: "email" as const, placeholder: "you@company.com", required: true },
  { id: "budget", label: "What's your estimated campaign budget?", type: "select" as const, placeholder: "", options: ["Under £10k", "£10k – £50k", "£50k – £150k", "£150k+"], required: true },
  { id: "goals", label: "What are your campaign goals?", type: "textarea" as const, placeholder: "Tell us about what you're looking to achieve...", required: false },
  { id: "timeline", label: "When are you looking to launch?", type: "select" as const, placeholder: "", options: ["ASAP", "Within 1 month", "1-3 months", "3+ months"], required: true },
];

const BrandsPage = () => {
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
          — For Brands
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
              Connect With
            </motion.span>
          </motion.span>
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="block text-primary"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              The Right Creators.
            </motion.span>
          </motion.span>
        </h1>
        <motion.p
          className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-[600px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          We match brands with influential creators who deliver real, measurable results in the gaming and betting space.
        </motion.p>
        <motion.div
          className="h-[2px] mt-8 bg-primary max-w-[120px]"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        />
      </section>

      {/* Stats */}
      <section className="border-y border-border py-16 md:py-24 px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-[1400px] mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-4xl md:text-6xl font-display font-extrabold text-primary tracking-tight">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground tracking-[0.1em] uppercase mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-32 px-5 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            — Why Recast
          </motion.p>
          <motion.h2
            className="text-3xl md:text-6xl font-display font-extrabold tracking-[-0.03em] uppercase mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Built For <span className="text-primary">Performance</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="border border-border p-8 md:p-10 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight uppercase mb-3">{b.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <TypeformApplication
        title="Partner With Us"
        subtitle="Tell us about your brand and campaign goals. We'll match you with the perfect creators."
        questions={brandQuestions}
      />

      <Footer />
    </main>
  );
};

export default BrandsPage;
