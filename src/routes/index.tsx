import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/assemble/Preloader";
import { CustomCursor } from "@/components/assemble/CustomCursor";
import { Navbar } from "@/components/assemble/Navbar";
import { Hero } from "@/components/assemble/Hero";
import { About } from "@/components/assemble/About";
import { Highlights } from "@/components/assemble/Highlights";
import { Timeline } from "@/components/assemble/Timeline";
import { Squads } from "@/components/assemble/Squads";
import { Stats } from "@/components/assemble/Stats";
import { Speakers } from "@/components/assemble/Speakers";
import { Registration } from "@/components/assemble/Registration";
import { Faq } from "@/components/assemble/Faq";
import { Footer } from "@/components/assemble/Footer";
import { Atmosphere, Seam, StickyCta } from "@/components/assemble/Atmosphere";

const TITLE = "ASSEMBLE 2026 — GFG Student Chapter, Bennett University";
const DESCRIPTION =
  "A 24-hour hackathon, workshops and tech talks by the GeeksForGeeks Student Chapter at Bennett University. Every great power needs a team. Assemble 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen md:cursor-none">
      <Preloader />
      <CustomCursor />
      <Atmosphere />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Seam label="Transmission 02 · Operations" />
        <Highlights />
        <Seam label="Transmission 03 · Timeline" />
        <Timeline />
        <Seam label="Transmission 04 · Squads" />
        <Squads />
        <Stats />
        <Speakers />
        <Registration />
        <Seam label="Transmission 07 · Intel" />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}
