import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  side: "brand" | "creator" | "center";
}

interface Connection {
  from: string;
  to: string;
  delay: number;
}

const brands = ["Bet365", "DraftKings", "FanDuel", "PokerStars", "Stake", "888"];
const creators = ["Creator A", "Creator B", "Creator C", "Creator D", "Creator E", "Creator F"];

const ConnectionAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; fromX: number; fromY: number; toX: number; toY: number }[]>([]);

  // Generate nodes
  const brandNodes: Node[] = brands.map((label, i) => ({
    id: `brand-${i}`,
    label,
    x: 8 + (i % 3) * 12,
    y: 20 + Math.floor(i / 3) * 55,
    side: "brand",
  }));

  const creatorNodes: Node[] = creators.map((label, i) => ({
    id: `creator-${i}`,
    label,
    x: 68 + (i % 3) * 12,
    y: 20 + Math.floor(i / 3) * 55,
    side: "creator",
  }));

  const centerNode: Node = { id: "center", label: "RECAST", x: 50, y: 50, side: "center" };

  const allNodes = [...brandNodes, centerNode, ...creatorNodes];

  const connections: Connection[] = [
    ...brandNodes.map((b, i) => ({ from: b.id, to: "center", delay: i * 0.3 })),
    ...creatorNodes.map((c, i) => ({ from: "center", to: c.id, delay: i * 0.3 + 1.8 })),
  ];

  // Spawn flowing particles
  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      const brandIdx = Math.floor(Math.random() * brandNodes.length);
      const creatorIdx = Math.floor(Math.random() * creatorNodes.length);
      const b = brandNodes[brandIdx];
      const c = creatorNodes[creatorIdx];

      setParticles((prev) => [
        ...prev.slice(-12),
        { id: id++, fromX: b.x, fromY: b.y, toX: centerNode.x, toY: centerNode.y },
        { id: id++, fromX: centerNode.x, fromY: centerNode.y, toX: c.x, toY: c.y },
      ]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const getNode = (nodeId: string) => allNodes.find((n) => n.id === nodeId)!;

  return (
    <div ref={containerRef} className="relative w-full aspect-video bg-background border border-border/50 overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map((conn, i) => {
          const from = getNode(conn.from);
          const to = getNode(conn.to);
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="hsl(var(--primary))"
              strokeWidth="0.15"
              strokeOpacity={0.15}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: conn.delay + 0.5, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {/* Flowing particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary"
          style={{ left: `${p.fromX}%`, top: `${p.fromY}%` }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{
            left: `${p.toX}%`,
            top: `${p.toY}%`,
            opacity: [0.8, 1, 0],
            scale: [1, 1.5, 0.5],
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      ))}

      {/* Labels: BRANDS / CREATORS */}
      <motion.div
        className="absolute top-4 left-4 md:top-6 md:left-6 text-[10px] md:text-xs font-display uppercase tracking-[0.2em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Brands
      </motion.div>
      <motion.div
        className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] md:text-xs font-display uppercase tracking-[0.2em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Creators
      </motion.div>

      {/* Brand nodes */}
      {brandNodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center gap-1"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}
        >
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-[7px] md:text-[9px] text-muted-foreground font-medium whitespace-nowrap">
            {node.label}
          </span>
        </motion.div>
      ))}

      {/* Center node (RECAST) */}
      <motion.div
        className="absolute flex flex-col items-center gap-1.5"
        style={{ left: `${centerNode.x}%`, top: `${centerNode.y}%`, transform: "translate(-50%, -50%)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 150 }}
      >
        {/* Pulsing ring */}
        <motion.div
          className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary/20"
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center z-10">
          <span className="text-[6px] md:text-[8px] font-display font-bold text-primary tracking-wider">R</span>
        </div>
        <span className="text-[8px] md:text-[10px] font-display font-semibold text-primary tracking-[0.15em] uppercase">
          Recast
        </span>
      </motion.div>

      {/* Creator nodes */}
      {creatorNodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center gap-1"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 + i * 0.15, type: "spring", stiffness: 200 }}
        >
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-[7px] md:text-[9px] text-muted-foreground font-medium whitespace-nowrap">
            {node.label}
          </span>
        </motion.div>
      ))}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default ConnectionAnimation;
