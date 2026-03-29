import { motion } from "framer-motion";
import { useMemo } from "react";

const TOP_LINES = [30, 60, 90, 115];
const BOTTOM_LINES = [370, 400, 430, 455];

const generatePath = (width: number, yBase: number, amplitude: number, frequency: number, phase: number) => {
  const points: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const y = yBase + Math.sin((i / steps) * Math.PI * frequency + phase) * amplitude;
    points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
  }
  return points.join(" ");
};

const WobblyLines = () => {
  const yPositions = [...TOP_LINES, ...BOTTOM_LINES];

  const lines = useMemo(() => yPositions.map((yBase, i) => {
    const amplitude = 6 + (i % 3) * 3;
    const frequency = 1.5 + (i % 4) * 0.4;
    const phaseOffset = i * 0.7;
    return {
      path: generatePath(1400, yBase, amplitude, frequency, phaseOffset),
      opacity: 0.07 + (i % 3) * 0.025,
      strokeWidth: 1 + (i % 3) * 0.4,
    };
  }), []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none select-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1.2 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1400 480"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full"
        role="presentation"
      >
        {lines.map((line, i) => (
          <path
            key={i}
            d={line.path}
            stroke="hsl(var(--blue-accent))"
            strokeWidth={line.strokeWidth}
            opacity={line.opacity}
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default WobblyLines;
