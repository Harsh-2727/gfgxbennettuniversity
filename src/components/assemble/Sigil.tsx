import { motion } from "motion/react";

/**
 * Original "assembly sigil": concentric HUD rings with a geometric chevron
 * that reads as an abstract "A". No trademarked marks.
 */
export function Sigil({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: 72 }, (_, i) => i);
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="sg-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sg-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="300" fill="url(#sg-core)" />

      <g className="sigil-spin-slow" style={{ transformOrigin: "300px 300px" }}>
        {ticks.map((i) => (
          <line
            key={i}
            x1="300"
            y1="22"
            x2="300"
            y2={i % 6 === 0 ? 40 : 30}
            stroke="var(--arc)"
            strokeOpacity={i % 6 === 0 ? 0.55 : 0.2}
            strokeWidth="1"
            transform={`rotate(${i * 5} 300 300)`}
          />
        ))}
      </g>

      <motion.circle
        cx="300"
        cy="300"
        r="238"
        fill="none"
        stroke="url(#sg-edge)"
        strokeWidth="1.2"
        strokeOpacity="0.7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2.4, duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
      />
      <g className="sigil-spin-rev" style={{ transformOrigin: "300px 300px" }}>
        <circle
          cx="300"
          cy="300"
          r="205"
          fill="none"
          stroke="var(--gold)"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeDasharray="2 10 60 10"
        />
      </g>

      <motion.path
        d="M300 110 L452 440 M300 110 L148 440 M205 360 L470 360"
        fill="none"
        stroke="url(#sg-edge)"
        strokeWidth="2"
        strokeLinecap="square"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2.7, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
