import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINE_COUNT = 12;

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
    const yBase = 20 + i * 38;
    const amplitude = 6 + (i % 4) * 3;
    const frequency = 1.5 + (i % 5) * 0.4;
    const phaseOffset = i * 0.7;
    return {
      path: generatePath(1400, yBase, amplitude, frequency, phase + phaseOffset),
      opacity: 0.07 + (i % 4) * 0.025,
      strokeWidth: 1 + (i % 3) * 0.4,
    };
  });

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none select-none z-0 blur-[0.5px]"
      style={{ filter: "blur(0.5px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1.2 }}
    >
      <svg
        viewBox="0 0 1400 480"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full"
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
