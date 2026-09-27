import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <div className="hud-mono flex items-center justify-center gap-3 text-[0.65rem] text-arc">
          <span className="h-px w-8 bg-arc/50" />
          {kicker}
          <span className="h-px w-8 bg-arc/50" />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="title-card mt-4 text-4xl sm:text-5xl md:text-6xl">{title}</h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.16}>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
