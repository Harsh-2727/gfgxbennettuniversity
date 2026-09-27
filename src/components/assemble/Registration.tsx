import { motion } from "motion/react";
import { CalendarDays, MapPin, Zap } from "lucide-react";
import { EVENT } from "@/data/event";
import { Countdown } from "./Countdown";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

export function Registration() {
  return (
    <section id="register" className="relative overflow-hidden py-28 sm:py-40">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--primary) 32%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="hud-mono text-[0.58rem] text-accent">Final Call · {EVENT.slotsNote}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="title-card mt-5 text-4xl leading-[0.95] sm:text-6xl md:text-7xl">
            The Fate Of The Universe
            <br />
            <span className="text-flare">Needs You</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
            {EVENT.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.24} className="mt-10">
          <Countdown compact />
        </Reveal>

        <Reveal delay={0.3} className="relative mt-12 inline-block w-full sm:w-auto">
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-3xl"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <MagneticButton href={EVENT.registerUrl} external size="lg" className="w-full sm:w-auto">
            <Zap size={16} />
            Assemble Now — Register
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.36}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-muted-foreground">
            <span className="hud-mono flex items-center gap-2 text-[0.55rem]">
              <CalendarDays size={14} className="text-arc" />
              {EVENT.dateLabel}
            </span>
            <span className="hud-mono flex items-center gap-2 text-[0.55rem]">
              <MapPin size={14} className="text-arc" />
              {EVENT.venue}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
