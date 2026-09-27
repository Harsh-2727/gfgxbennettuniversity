// Edit everything about the event here.
export const EVENT = {
  name: "ASSEMBLE 2026",
  organizer: "GeeksForGeeks Student Chapter",
  university: "Bennett University",
  tagline: "Every Great Power Needs a Team. Every Great Team Needs You.",
  subheadline:
    "GeeksForGeeks Student Chapter × Bennett University presents the ultimate tech showdown.",
  // ISO date-time of the event start (used by the countdown).
  startsAt: "2026-03-14T09:00:00+05:30",
  dateLabel: "14–15 March 2026",
  venue: "Bennett University, Greater Noida",
  registerUrl: "https://forms.gle/",
  slotsNote: "Limited slots — 500 recruits only",
  socials: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    discord: "https://discord.com/",
  },
  contact: "gfg@bennett.edu.in",
};

export const BRIEFING = [
  "ASSEMBLE 2026 is a 24-hour flagship tech offensive: one hackathon, a war-room of workshops, and a stage of speakers pulled from industry frontlines.",
  "Recruits arrive as individuals and leave as squads. Build across web, AI, security and systems, defend your build in front of mentors, and ship something that actually runs.",
  "No prior clearance required. Bring a laptop, a team of up to four, and the intent to out-build everyone in the room.",
];

export type Track = {
  code: string;
  title: string;
  description: string;
  stone: string;
  icon: string;
};

export const HIGHLIGHTS: Track[] = [
  {
    code: "OP-01",
    title: "24H Hackathon",
    description: "One night, one build, four problem statements that fight back.",
    stone: "var(--stone-power)",
    icon: "Cpu",
  },
  {
    code: "OP-02",
    title: "Mentor Warroom",
    description: "Live code reviews and architecture triage from industry engineers.",
    stone: "var(--stone-mind)",
    icon: "Brain",
  },
  {
    code: "OP-03",
    title: "Tech Talks",
    description: "Sharp, no-fluff sessions on systems that operate at real scale.",
    stone: "var(--stone-reality)",
    icon: "Mic",
  },
  {
    code: "OP-04",
    title: "Capture The Flag",
    description: "A security gauntlet of forensics, crypto and web exploitation.",
    stone: "var(--stone-soul)",
    icon: "ShieldHalf",
  },
  {
    code: "OP-05",
    title: "Speed Build Sprint",
    description: "Ninety minutes. One prompt. Ship or be dusted.",
    stone: "var(--stone-time)",
    icon: "Timer",
  },
  {
    code: "OP-06",
    title: "Showcase Expo",
    description: "Open floor demos judged by mentors, alumni and recruiters.",
    stone: "var(--stone-space)",
    icon: "Rocket",
  },
];

export const SCHEDULE = [
  {
    time: "08:30",
    day: "DAY 01",
    title: "Recruitment & Check-in",
    description: "Badge pickup, squad verification, and opening briefing in the main hall.",
  },
  {
    time: "10:00",
    day: "DAY 01",
    title: "Initiative Keynote",
    description: "Opening address plus problem statement declassification.",
  },
  {
    time: "11:30",
    day: "DAY 01",
    title: "Hack Window Opens",
    description: "Clock starts. 24 hours on the board, mentors on rotation.",
  },
  {
    time: "16:00",
    day: "DAY 01",
    title: "Workshop Sorties",
    description: "Parallel tracks on AI agents, cloud infra, and offensive security.",
  },
  {
    time: "22:00",
    day: "DAY 01",
    title: "Midnight Sprint",
    description: "Speed build challenge, caffeine drop, and the CTF scoreboard reset.",
  },
  {
    time: "11:30",
    day: "DAY 02",
    title: "Code Freeze",
    description: "Repos lock. Submissions pushed to the judging pipeline.",
  },
  {
    time: "13:00",
    day: "DAY 02",
    title: "Showcase Expo",
    description: "Open-floor demos to judges, mentors and the rest of the field.",
  },
  {
    time: "16:30",
    day: "DAY 02",
    title: "Final Verdict",
    description: "Winners announced, prizes handed over, group photo on the steps.",
  },
];

export const SQUADS = [
  {
    name: "The Engineer",
    domain: "AI / ML",
    color: "var(--stone-reality)",
    icon: "CircuitBoard",
    front: "Build the intelligence.",
    back: "Agents, retrieval systems, fine-tunes and anything that learns faster than you do.",
  },
  {
    name: "The Sentinel",
    domain: "Cybersecurity",
    color: "var(--stone-power)",
    icon: "Fingerprint",
    front: "Break it before they do.",
    back: "Threat modelling, exploitation, forensics and defensive tooling under live pressure.",
  },
  {
    name: "The Architect",
    domain: "Web & Systems",
    color: "var(--stone-space)",
    icon: "Layers",
    front: "Hold the whole thing up.",
    back: "Full-stack products, APIs, realtime infrastructure and deployments that survive traffic.",
  },
  {
    name: "The Visionary",
    domain: "Product & Design",
    color: "var(--stone-mind)",
    icon: "PenTool",
    front: "Make it worth using.",
    back: "Interface craft, research, prototyping and the story that sells the build on stage.",
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Recruits Assembling" },
  { value: 12, suffix: "+", label: "Missions & Workshops" },
  { value: 150000, prefix: "₹", label: "Prize Pool", compact: true },
  { value: 24, suffix: "H", label: "Non-stop Hackathon" },
];

export const SPEAKERS = [
  { name: "Speaker One", role: "Staff Engineer, Fintech", initials: "S1", link: "#" },
  { name: "Speaker Two", role: "Security Researcher", initials: "S2", link: "#" },
  { name: "Speaker Three", role: "ML Lead, Applied AI", initials: "S3", link: "#" },
  { name: "Speaker Four", role: "Founder & Product Lead", initials: "S4", link: "#" },
];

export const FAQS = [
  {
    q: "Who is cleared to participate?",
    a: "Any undergraduate or postgraduate student with a valid college ID. Teams of 1–4; solo recruits get matched on site.",
  },
  {
    q: "Is there a registration fee?",
    a: "No. Entry is free for all registered students. Meals and workspace are provided through the 24 hours.",
  },
  {
    q: "Do I need to be an expert?",
    a: "No. Tracks are graded for first-timers through finalists, and mentors rotate through the floor all night.",
  },
  {
    q: "What should I bring?",
    a: "Laptop, charger, college ID, and anything you need to stay awake. Sleeping bags are allowed in the rest zone.",
  },
  {
    q: "How is judging done?",
    a: "Working demo, technical depth, originality and presentation. Judges score at the expo, verdict follows the same day.",
  },
];
