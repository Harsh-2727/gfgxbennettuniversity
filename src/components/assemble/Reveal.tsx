import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 32,
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
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  index,
}: {
  kicker: string;
  title: string;
  lead?: string;
  index?: string;
}) {
  return (
    <div className="relative mx-auto max-w-3xl text-center">
      {index ? (
        <span
          aria-hidden
          className="index-numeral pointer-events-none absolute left-1/2 -top-10 -z-10 -translate-x-1/2 text-[7rem] sm:-top-16 sm:text-[11rem]"
        >
          {index}
        </span>
      ) : null}
      <Reveal>
        <div className="hud-mono flex items-center justify-center gap-3 text-[0.6rem] text-arc">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-arc/70" />
          {kicker}
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-arc/70" />
        </div>
      </Reveal>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease, delay: 0.05 }}
          className="title-card mt-4 text-5xl leading-[0.9] sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h2>
      </div>
      {lead ? (
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
