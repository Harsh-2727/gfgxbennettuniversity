import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode, PointerEvent } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
  size?: "md" | "lg";
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  external,
  className = "",
  size = "md",
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.22);
    y.set(dy * 0.3);
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const pad = size === "lg" ? "px-10 py-5 text-[0.72rem] sm:px-14 sm:py-6" : "px-8 py-4 text-[0.65rem]";
  const look =
    variant === "primary"
      ? "btn-primary text-primary-foreground"
      : "btn-ghost text-foreground";

  return (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      data-cursor-hover
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.96 }}
      style={{ x: sx, y: sy }}
      className={`hud-mono group relative inline-flex items-center justify-center gap-3 ${pad} ${look} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3 transition-transform duration-500 group-hover:tracking-[0.3em]">
        {children}
      </span>
    </motion.a>
  );
}
