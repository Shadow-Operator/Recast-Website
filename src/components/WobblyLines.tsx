import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINE_COUNT = 5;

const generatePath = (width: number, yBase: number, amplitude: number, frequency: number, phase: number) => {
  const points: string[] = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const y = yBase + Math.sin((i / steps) * Math.PI * frequency + phase) * amplitude;
    points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
  }
  return points.join(" ");
};

const WobblyLines = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setPhase((p) => p + 0.015);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const lines = Array.from({ length: LINE_COUNT }, (_, i) => {
    const yBase = 30 + i * 25;
    const amplitude = 8 + i * 3;
    const frequency = 2 + i * 0.5;
    const phaseOffset = i * 0.8;
    return {
      path: generatePath(1400, yBase, amplitude, frequency, phase + phaseOffset),
      opacity: 0.04 + i * 0.015,
      strokeWidth: 1 + i * 0.3,
    };
  });

  return (
    <motion.div
      className="absolute inset-x-0 top-[55%] md:top-[50%] pointer-events-none select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1.2 }}
    >
      <svg
        viewBox="0 0 1400 180"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-[120px] md:h-[180px]"
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
