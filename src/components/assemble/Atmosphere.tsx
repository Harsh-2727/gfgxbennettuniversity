import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Zap } from "lucide-react";
import { EVENT } from "@/data/event";

/** Page-wide film grain, vignette, scroll progress and card spotlight tracking. */
export function Atmosphere() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[85] h-[2px] origin-left"
        style={{ scaleX: progress, background: "var(--gradient-flare)" }}
      />
      <div aria-hidden className="page-grain pointer-events-none fixed inset-0 z-[70]" />
      <div aria-hidden className="page-vignette pointer-events-none fixed inset-0 z-[69]" />
    </>
  );
}

/** Persistent registration CTA that appears after the hero and hides near the register section. */
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const reg = document.getElementById("register");
      const past = window.scrollY > window.innerHeight * 0.85;
      let nearReg = false;
      if (reg) {
        const r = reg.getBoundingClientRect();
        nearReg = r.top < window.innerHeight && r.bottom > 0;
      }
      setShow(past && !nearReg);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href={EVENT.registerUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor-hover
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="btn-primary hud-mono fixed inset-x-4 bottom-4 z-[80] flex items-center justify-center gap-3 px-6 py-4 text-[0.62rem] text-primary-foreground sm:inset-x-auto sm:right-6 sm:bottom-6"
        >
          <span className="relative z-10 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Register · {EVENT.slotsNote}
            <Zap size={14} />
          </span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}

/** Connective tissue between sections: a light seam with a transmission label. */
export function Seam({ label }: { label: string }) {
  return (
    <div aria-hidden className="relative mx-auto flex max-w-6xl items-center gap-4 px-5 sm:px-8">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="h-px flex-1 origin-right bg-gradient-to-l from-primary/60 to-transparent"
      />
      <span className="hud-mono text-[0.5rem] text-muted-foreground/70">{label}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="h-px flex-1 origin-left bg-gradient-to-r from-primary/60 to-transparent"
      />
    </div>
  );
}
