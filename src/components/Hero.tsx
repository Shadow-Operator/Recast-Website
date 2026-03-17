import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const suits = ["♠", "♥", "♦", "♣"];
const suitColors = [
  "text-foreground",
  "text-red-500",
  "text-primary",
  "text-foreground",
];

const FloatingSuit = ({ index }: { index: number }) => {
  const positions = [
    { x: "-10%", y: "-20%" },
    { x: "85%", y: "-15%" },
    { x: "75%", y: "60%" },
    { x: "-5%", y: "55%" },
  ];

  return (
    <motion.span
      className={`absolute text-6xl md:text-8xl ${suitColors[index]} opacity-[0.07] pointer-events-none select-none font-bold`}
      style={{ left: positions[index].x, top: positions[index].y }}
      animate={{
        y: [0, -15, 0, 15, 0],
        rotate: [0, 10, 0, -10, 0],
        scale: [1, 1.1, 1, 0.95, 1],
      }}
      transition={{
        duration: 5 + index,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.7,
      }}
    >
      {suits[index]}
    </motion.span>
  );
};

const SlotLetter = ({ char, index }: { char: string; index: number }) => {
  const [revealed, setRevealed] = useState(false);
  const scrambleChars = "♠♥♦♣★●◆▲";

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 800 + index * 60);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 + index * 0.04 }}
    >
      {char === " " ? "\u00A0" : (
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.span
              key="scramble"
              className="text-primary"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            >
              {scrambleChars[index % scrambleChars.length]}
            </motion.span>
          ) : (
            <motion.span
              key="real"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            >
              {char}
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </motion.span>
  );
};

const Hero = () => {
  const headline = "where gaming meets gambling";

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 relative overflow-hidden">
      {/* Ambient blue glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_hsla(199,89%,58%,0.08)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_hsla(199,89%,58%,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* Static headline with slot-machine reveal */}
      <div className="relative mb-16">
        {suits.map((_, i) => (
          <FloatingSuit key={i} index={i} />
        ))}
        <h1 className="text-[clamp(52px,8vw,110px)] font-body font-black tracking-[-3px] leading-none lowercase text-center md:text-left">
          {headline.split("").map((char, i) => (
            <SlotLetter key={i} char={char} index={i} />
          ))}
        </h1>
        {/* Shimmer line under headline */}
        <motion.div
          className="h-[2px] mt-6 rounded-full gradient-blue"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
        />
      </div>

      {/* Bottom two-col */}
      <div className="grid md:grid-cols-2 gap-12 items-end max-w-[1400px]">
        <motion.p
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[520px]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <strong className="text-foreground font-semibold">
            Recast is the talent agency connecting the world's top content creators with leading betting and gaming brands.
          </strong>{" "}
          We specialise in high-value partnerships that perform — built on real audiences, real influence, and real results.
        </motion.p>

        <motion.div
          className="flex gap-4 md:justify-end"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <a
            href="#contact"
            className="gradient-blue text-primary-foreground font-bold text-[15px] px-8 py-3.5 rounded-full hover:opacity-85 transition-opacity glow-blue"
          >
            Get started
          </a>
          <a
            href="#how"
            className="border border-border text-foreground font-medium text-[15px] px-8 py-3.5 rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            How it works
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
