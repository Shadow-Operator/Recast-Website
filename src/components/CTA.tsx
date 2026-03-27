import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import AnimatedUnderline from "./AnimatedUnderline";
import FloatingSuits from "./FloatingSuits";
import TypeformApplication from "./TypeformApplication";

const RollingDice = lazy(() => import("./RollingDice"));

const brandQuestions = [
  { id: "company", label: "What's the name of your company?", type: "text" as const, placeholder: "e.g. Betway, DraftKings...", required: true },
  { id: "name", label: "What's your name?", type: "text" as const, placeholder: "Your full name", required: true },
  { id: "email", label: "What's your work email?", type: "email" as const, placeholder: "you@company.com", required: true },
  { id: "budget", label: "What's your estimated campaign budget?", type: "select" as const, placeholder: "", options: ["Under £10k", "£10k – £50k", "£50k – £150k", "£150k+"], required: true },
  { id: "goals", label: "What are your campaign goals?", type: "textarea" as const, placeholder: "Tell us about what you're looking to achieve...", required: false },
  { id: "timeline", label: "When are you looking to launch?", type: "select" as const, placeholder: "", options: ["ASAP", "Within 1 month", "1-3 months", "3+ months"], required: true },
];

const creatorQuestions = [
  { id: "name", label: "What's your name?", type: "text" as const, placeholder: "Your full name", required: true },
  { id: "email", label: "What's your email?", type: "email" as const, placeholder: "you@email.com", required: true },
  { id: "platform", label: "What's your primary platform?", type: "select" as const, placeholder: "", options: ["YouTube", "Twitch", "TikTok", "Instagram", "Twitter/X", "Multiple"], required: true },
  { id: "audience", label: "What's your audience size?", type: "select" as const, placeholder: "", options: ["Under 10k", "10k – 50k", "50k – 250k", "250k – 1M", "1M+"], required: true },
  { id: "handle", label: "Drop your main social handle", type: "text" as const, placeholder: "@yourhandle", required: true },
  { id: "about", label: "Tell us about yourself and your content", type: "textarea" as const, placeholder: "What kind of content do you create? What makes your audience unique?", required: false },
];

const CTA = () => {
  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Visual header */}
      <div className="pt-2 pb-4 md:pt-4 md:pb-8 px-5 md:px-6 text-center relative overflow-hidden">
        {/* Depth layer */}
        <motion.div
          className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-accent/15 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 25, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute -right-20 bottom-6 h-72 w-72 rounded-full bg-blue-accent/10 blur-3xl"
          animate={{ x: [0, -36, 0], y: [0, -20, 0], scale: [1.05, 0.95, 1.05] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-35"
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 35%, hsl(var(--primary) / 0.12) 0%, transparent 45%), radial-gradient(circle at 78% 72%, hsl(var(--primary) / 0.1) 0%, transparent 42%)",
            backgroundSize: "140% 140%",
          }}
          aria-hidden="true"
        />

        <FloatingSuits suits={[
          { suit: "♠", x: "5%", y: "20%", className: "text-blue-accent", rotate: -15, delay: 0 },
          { suit: "♥", x: "90%", y: "15%", className: "text-blue-accent", size: "text-[100px] md:text-[140px]", rotate: 10, delay: 1 },
          { suit: "♦", x: "8%", y: "70%", className: "text-blue-accent", size: "text-[90px] md:text-[120px]", rotate: 20, delay: 2 },
          { suit: "♣", x: "85%", y: "65%", className: "text-blue-accent", size: "text-[100px] md:text-[150px]", rotate: -8, delay: 0.5 },
        ]} />

        {/* 3D Dice */}
        <motion.div
          className="relative z-10 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Suspense fallback={<div className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 mx-auto" />}>
            <RollingDice />
          </Suspense>
        </motion.div>

        <motion.h2
          className="text-[clamp(30px,7vw,96px)] font-display font-extrabold tracking-[-0.03em] leading-[0.9] mb-5 md:mb-8 max-w-[900px] mx-auto relative z-10 uppercase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to
          <br />
          <AnimatedUnderline delay={0.3}>
            <span className="text-blue-accent">roll the dice?</span>
          </AnimatedUnderline>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-muted-foreground font-light max-w-[480px] mx-auto mb-8 md:mb-12 leading-[1.7] relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Whether you're a creator looking to monetise your stream or a brand
          looking to reach the right audience — let's talk.
        </motion.p>
      </div>

      {/* Typeform with role selection */}
      <TypeformApplication
        title="Get In Touch"
        subtitle="Tell us who you are and we'll take it from there."
        questions={[]}
        roleSelection={{
          label: "Are you a brand or a creator?",
          options: [
            { value: "brand", label: "🏢  I'm a Brand", questions: brandQuestions },
            { value: "creator", label: "🎮  I'm a Creator", questions: creatorQuestions },
          ],
        }}
      />
    </section>
  );
};

export default CTA;
