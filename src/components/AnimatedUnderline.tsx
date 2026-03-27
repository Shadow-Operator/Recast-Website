import { motion } from "framer-motion";

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "primary";
  delay?: number;
}

const AnimatedUnderline = ({ children, className = "", color = "blue", delay = 0 }: AnimatedUnderlineProps) => {
  const underlineColor = color === "blue" ? "bg-blue-accent" : "bg-primary";

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        className={`absolute bottom-0 left-0 h-[2px] md:h-[3px] ${underlineColor}`}
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
};

export default AnimatedUnderline;
