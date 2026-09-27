import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [charge, setCharge] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 1900) * 100);
      setCharge(p);
      if (p >= 100) window.clearInterval(id);
    }, 40);
    const t = window.setTimeout(() => setDone(true), 2400);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background grain"
          exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex h-40 w-40 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-primary/40"
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="absolute inset-4 rounded-full bg-arc/10 blur-xl animate-arc-pulse" />
            <svg viewBox="0 0 120 120" className="relative h-32 w-32">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - charge / 100)}
                transform="rotate(-90 60 60)"
              />
              <circle
                cx="60"
                cy="60"
                r="28"
                fill="none"
                stroke="var(--arc)"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M60 26 L84 92 L70 92 L60 66 L50 92 L36 92 Z"
                fill="var(--gold)"
              />
              <rect x="46" y="74" width="28" height="5" fill="var(--background)" />
            </svg>
          </div>
          <p className="hud-mono mt-8 text-[0.6rem] text-muted-foreground">
            Initializing Assemble Protocol · {Math.round(charge)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
