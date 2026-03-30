import { motion } from "framer-motion";
import AnimatedUnderline from "./AnimatedUnderline";
import { GlobeLive } from "./ui/globe";
import TypeformApplication from "./TypeformApplication";

const brandQuestions = [
  { id: "brand-contact", label: "Let's start with the basics.", type: "group" as const, placeholder: "", required: true, fields: [
    { id: "company", label: "Company name (if applicable)", type: "text" as const, placeholder: "Your company name", required: false },
    { id: "name", label: "Your name", type: "text" as const, placeholder: "Your full name", required: true },
    { id: "email", label: "Work email", type: "email" as const, placeholder: "you@company.com", required: true },
  ]},
  { id: "budget", label: "What's your estimated campaign budget?", type: "select" as const, placeholder: "", options: ["Under £10k", "£10k - £50k", "£50k - £150k", "£150k+", "I'm not sure / Prefer not to say"], required: true },
  { id: "timeline", label: "When are you looking to launch?", type: "select" as const, placeholder: "", options: ["Under a month", "1-3 months", "3+ months", "Specific date or timeframe"], required: true },
  { id: "goals", label: "Tell us about your campaign", type: "textarea" as const, placeholder: "What are you looking to achieve? Any specific goals or ideas? (optional)", required: false },
];

const creatorQuestions = [
  { id: "creator-contact", label: "Let's start with the basics.", type: "group" as const, placeholder: "", required: true, fields: [
    { id: "name", label: "Your name", type: "text" as const, placeholder: "Your full name", required: true },
    { id: "email", label: "Email", type: "email" as const, placeholder: "you@email.com", required: true },
    { id: "phone", label: "Phone number", type: "text" as const, placeholder: "Your phone number", required: false },
  ]},
  { id: "platforms", label: "What platforms do you use?", type: "multi-select" as const, placeholder: "", options: ["TikTok", "Instagram", "X", "YouTube", "Twitch", "Kick"], required: true },
  { id: "about", label: "Tell us about yourself and your content", type: "textarea" as const, placeholder: "What kind of content do you create? (optional)", required: false },
];

const CTA = () => {
  return (
    <section className="relative overflow-visible">
      {/* Visual header */}
      <div className="pt-0 pb-4 md:pt-0 md:pb-8 px-5 md:px-6 text-center relative overflow-visible">
        {/* Interactive globe */}
        <motion.div
          className="relative z-10 mb-8 md:mb-12 mx-auto w-56 h-56 sm:w-72 sm:h-72 md:w-[420px] md:h-[420px]"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GlobeLive />
        </motion.div>

        <motion.h2
          className="font-display font-extrabold tracking-[-0.03em] leading-[0.9] mb-5 md:mb-8 max-w-[900px] mx-auto relative z-10 uppercase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="block text-[clamp(30px,7vw,96px)]">Ready to</span>
          <AnimatedUnderline delay={0.3}>
            <span className="block text-blue-accent whitespace-nowrap text-[clamp(22px,4.8vw,68px)]">get started?</span>
          </AnimatedUnderline>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-muted-foreground font-light max-w-[480px] mx-auto mb-8 md:mb-12 leading-[1.7] relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Creator or brand, let's talk about what Recast can do for you.
        </motion.p>
      </div>

      {/* Typeform with role selection */}
      <div id="contact" className="scroll-mt-20" />
      <TypeformApplication
        title="Get In Touch"
        subtitle="Tell us who you are and we'll take it from there."
        questions={[]}
        roleSelection={{
          label: "Are you a brand or a creator?",
          options: [
            { value: "brand", label: "I'm a Brand", questions: brandQuestions },
            { value: "creator", label: "I'm a Creator", questions: creatorQuestions },
          ],
        }}
      />
    </section>
  );
};

export default CTA;
