import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-portal.jpg";
import { EVENT } from "@/data/event";
import { Countdown } from "./Countdown";

function Embers() {
  const embers = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        size: 1 + ((i * 7) % 3),
        duration: 12 + ((i * 5) % 14),
        delay: (i * 1.3) % 12,
        drift: ((i % 5) - 2) * 40,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e) => (
        <span
          key={e.id}
          className="animate-ember absolute bottom-0 rounded-full bg-accent"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            boxShadow: "0 0 8px 2px color-mix(in oklab, var(--gold) 60%, transparent)",
            ["--drift" as string]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="vignette grain relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: bgY, x: tilt.x * -18, scale: 1.12 }}
      >
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1088}
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </motion.div>

      <Embers />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-5 pt-28 pb-24 text-center"
        style={{ y: fgY, opacity: fade, x: tilt.x * 10 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.7 }}
          className="hud-mono inline-flex items-center gap-3 border border-arc/30 bg-surface/50 px-4 py-2 text-[0.55rem] text-arc backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          {EVENT.dateLabel} · {EVENT.venue}
        </motion.div>

        <div className="relative mt-8">
          <span className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px] animate-arc-pulse sm:h-96 sm:w-96" />
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(14px)" }}
            animate={{ opacity: 1, letterSpacing: "0.04em", filter: "blur(0px)" }}
            transition={{ delay: 2.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="title-card text-[3.4rem] leading-[0.85] sm:text-8xl md:text-[9rem]"
          >
            <span className="text-flare">ASSEMBLE</span>{" "}
            <span className="text-foreground">2026</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {EVENT.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="mt-10"
        >
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.a
            href={EVENT.registerUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hud-mono btn-sweep w-full border border-accent/60 bg-primary px-8 py-4 text-[0.65rem] text-primary-foreground shadow-[var(--shadow-glow)] sm:w-auto"
          >
            Assemble Now
          </motion.a>
          <motion.a
            href="#briefing"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hud-mono w-full border border-border px-8 py-4 text-[0.65rem] text-foreground transition-colors hover:border-arc hover:text-arc sm:w-auto"
          >
            View Mission Briefing
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#briefing"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground"
        aria-label="Scroll down"
      >
        <ArrowDown className="animate-bounce" size={18} />
      </motion.a>
    </section>
  );
}
