import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import heroImg from "@/assets/hero-portal.jpg";
import { EVENT } from "@/data/event";
import { Countdown } from "./Countdown";
import { MagneticButton } from "./MagneticButton";
import { Sigil } from "./Sigil";

function Embers({ count }: { count: number }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        size: 1 + ((i * 7) % 3) * 0.7,
        duration: 14 + ((i * 5) % 14),
        delay: (i * 1.3) % 14,
        drift: ((i % 5) - 2) * 40,
      })),
    [count],
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
            boxShadow: "0 0 8px 2px color-mix(in oklab, var(--gold) 55%, transparent)",
            ["--drift" as string]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

const WORD = "ASSEMBLE".split("");
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const sigilY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const sigilScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const titleSpread = useTransform(scrollYProgress, [0, 0.7], ["0.02em", "0.18em"]);

  // Pointer parallax without React re-renders
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 20 });
  const spy = useSpring(py, { stiffness: 60, damping: 20 });
  const bgX = useTransform(spx, (v) => v * -22);
  const midX = useTransform(spx, (v) => v * 14);
  const midY = useTransform(spy, (v) => v * 10);
  const fgX = useTransform(spx, (v) => v * 6);
  const lx = useTransform(spx, (v) => `${50 + v * 18}%`);
  const ly = useTransform(spy, (v) => `${40 + v * 12}%`);
  const light = useMotionTemplate`radial-gradient(600px circle at ${lx} ${ly}, color-mix(in oklab, var(--arc) 14%, transparent), transparent 60%)`;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* L0 — plate */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY, x: bgX, scale: 1.14 }}>
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1088}
          fetchPriority="high"
          className="h-full w-full object-cover opacity-50 saturate-[0.85]"
        />
      </motion.div>

      {/* L1 — atmosphere */}
      <div className="hero-atmos absolute inset-0 -z-10" />
      <motion.div className="absolute inset-0 -z-10" style={{ background: light }} />
      <div className="hero-rays absolute inset-0 -z-10" />

      {/* L2 — sigil centerpiece */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[44%] -z-10 w-[min(125vw,760px)] -translate-x-1/2 -translate-y-1/2"
        style={{ y: sigilY, scale: sigilScale, x: midX }}
      >
        <motion.div
          style={{ y: midY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3, duration: 2, ease }}
        >
          <Sigil className="h-auto w-full" />
        </motion.div>
      </motion.div>

      <Embers count={reduce ? 0 : 18} />

      {/* Top meta rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="hud-mono relative z-10 mx-auto hidden w-full max-w-7xl items-center justify-between px-8 pt-28 text-[0.5rem] text-muted-foreground md:flex"
      >
        <span>Case File · A26-BU</span>
        <span className="text-arc">Signal Locked · 28.45°N 77.58°E</span>
        <span>{EVENT.organizer}</span>
      </motion.div>

      {/* Foreground */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pt-28 pb-10 text-center md:pt-10"
        style={{ y: fgY, opacity: fade, x: fgX }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8, ease }}
          className="hud-mono flex items-center gap-3 text-[0.55rem] text-accent sm:text-[0.62rem]"
        >
          <span className="h-px w-8 bg-accent/60" />
          {EVENT.organizer} presents
          <span className="h-px w-8 bg-accent/60" />
        </motion.p>

        <h1 className="relative mt-6 select-none" aria-label="Assemble 2026">
          <motion.span
            aria-hidden
            style={{ letterSpacing: titleSpread }}
            className="title-card hero-title flex justify-center text-[clamp(4.2rem,19vw,15rem)] leading-[0.8]"
          >
            {WORD.map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="text-flare inline-block"
                  initial={{ y: "105%", filter: "blur(8px)" }}
                  animate={{ y: "0%", filter: "blur(0px)" }}
                  transition={{ delay: 2.45 + i * 0.06, duration: 1.1, ease }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </motion.span>
          <motion.span
            aria-hidden
            initial={{ opacity: 0, letterSpacing: "1.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.6em" }}
            transition={{ delay: 3.1, duration: 1.4, ease }}
            className="hud-mono mt-3 block pl-[0.6em] text-sm text-foreground/90 sm:text-xl"
          >
            2026
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.9, ease }}
          className="mx-auto mt-7 max-w-md text-balance text-sm leading-relaxed text-muted-foreground sm:max-w-xl sm:text-base"
        >
          {EVENT.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.9, ease }}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <MagneticButton href={EVENT.registerUrl} external size="lg" className="w-full sm:w-auto">
            Assemble Now <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton href="#briefing" variant="ghost" className="w-full sm:w-auto">
            View Mission Briefing
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom HUD strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.7, duration: 1, ease }}
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-8 sm:px-8 sm:pb-10"
      >
        <div className="mb-4 flex items-center justify-between gap-4 text-muted-foreground">
          <span className="hud-mono text-[0.5rem] sm:text-[0.55rem]">
            <span className="text-primary">●</span> T-minus · {EVENT.dateLabel}
          </span>
          <span className="hud-mono hidden text-[0.55rem] sm:block">{EVENT.venue}</span>
        </div>
        <Countdown compact />
      </motion.div>

      {/* Floor fade into next scene */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
