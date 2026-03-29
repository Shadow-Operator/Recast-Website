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

const FloatingSuits = ({ suits }: { suits: SuitConfig[] }) => {
  return (
    <>
      {suits.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute pointer-events-none select-none hidden sm:block ${s.size || "text-[120px] md:text-[180px]"} ${s.className || "text-primary"} opacity-[0.03] animate-float-suit`}
          style={{
            left: s.x,
            top: s.y,
            transform: `rotate(${s.rotate || 0}deg)`,
            animationDelay: `${s.delay || 0}s`,
            animationDuration: `${s.duration || 7}s`,
            willChange: "transform",
          }}
        >
          {s.suit}
        </span>
      ))}
    </>
  );
};

export default FloatingSuits;
