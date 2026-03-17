import { motion } from "framer-motion";

interface SuitConfig {
  suit: string;
  className: string;
  x: string;
  y: string;
  size?: string;
  delay?: number;
  duration?: number;
  rotate?: number;
}

const defaultColor: Record<string, string> = {
  "♠": "text-foreground",
  "♥": "text-red-500",
  "♦": "text-primary",
  "♣": "text-foreground",
};

const FloatingSuits = ({ suits }: { suits: SuitConfig[] }) => {
  return (
    <>
      {suits.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute pointer-events-none select-none hidden sm:block ${s.size || "text-[120px] md:text-[180px]"} ${s.className || defaultColor[s.suit] || "text-foreground"} opacity-[0.04]`}
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.04, scale: 1 }}
          viewport={{ once: true }}
          animate={{
            y: [0, -12, 0, 12, 0],
            rotate: [s.rotate || 0, (s.rotate || 0) + 6, s.rotate || 0, (s.rotate || 0) - 6, s.rotate || 0],
          }}
          transition={{
            y: { duration: s.duration || 7, repeat: Infinity, ease: "easeInOut", delay: s.delay || 0 },
            rotate: { duration: (s.duration || 7) + 2, repeat: Infinity, ease: "easeInOut", delay: s.delay || 0 },
            opacity: { duration: 1 },
            scale: { duration: 1 },
          }}
        >
          {s.suit}
        </motion.span>
      ))}
    </>
  );
};

export default FloatingSuits;
