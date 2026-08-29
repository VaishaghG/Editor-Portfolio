export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  type: "FREELANCE" | "EDUCATION" | "AGENCY / COLLAB";
  highlights: string[];
  toolsUsed: string[];
  status?: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    id: "freelance-lead",
    period: "2026 — PRESENT",
    role: "FREELANCE VIDEO EDITOR & MOTION DESIGNER",
    organization: "INDEPENDENT CREATIVE PRACTICE",
    location: "INDIA (REMOTE / GLOBAL CLIENTS)",
    type: "FREELANCE",
    highlights: [
      "Partnering directly with founders, brand agencies, and content creators worldwide to produce cinematic commercial edits and high-retention social campaigns.",
      "Delivered over 120+ finished video cuts with an aggregate 50M+ organic views across Instagram, YouTube, and digital ad campaigns.",
      "Architected custom automated motion templates (MOGRTs) that shortened client post-production turnaround by 40%."
    ],
    toolsUsed: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Photoshop"],
    status: "CURRENTLY ACTIVE"
  },
  {
    id: "mca-degree",
    period: "2026 — 2028",
    role: "MASTER OF COMPUTER APPLICATIONS (MCA)",
    organization: "KRISTU JAYANTI UNIVERSITY",
    location: "BANGALORE, INDIA",
    type: "EDUCATION",
    highlights: [
      "Pursuing postgraduate studies in Computer Science, focusing on Software Architecture, Digital Media Processing, and Computational Graphics.",
      "Synthesizing technical problem-solving with high-end creative post-production workflows and video rendering pipelines."
    ],
    toolsUsed: ["Algorithms", "Web Technologies", "Digital Signal Processing"],
    status: "IN PROGRESS"
  },
  {
    id: "content-lead-past",
    period: "2024 — 2026",
    role: "LEAD VIDEO EDITOR & CONTENT STRATEGIST",
    organization: "DIGITAL MEDIA & CREATIVE LABS",
    location: "INDIA",
    type: "AGENCY / COLLAB",
    highlights: [
      "Led end-to-end post-production for fast-turnaround corporate reels, product launches, and brand summit aftermovies.",
      "Managed offline assembly, color grading pipelines, and sound design tracks across multicamera setups.",
      "Mentored junior editors on rhythm pacing, speed ramps, and keyframe easing in After Effects."
    ],
    toolsUsed: ["Premiere Pro", "After Effects", "Audition", "Photoshop"]
  },
  {
    id: "bachelor-degree",
    period: "2021 — 2024",
    role: "BACHELOR'S DEGREE IN COMPUTER APPLICATIONS (BCA)",
    organization: "UNIVERSITY CAMPUS",
    location: "INDIA",
    type: "EDUCATION",
    highlights: [
      "Graduated with foundational excellence in programming, multimedia computing, and interactive user interfaces.",
      "Directed multimedia club visual productions and edited institutional event films."
    ],
    toolsUsed: ["Computer Graphics", "UI/UX Foundations", "Video Production"]
  }
];

export const METRICS = [
  { label: "ORGANIC VIEWS GENERATED", value: "50M+", change: "+12M in 2025/26" },
  { label: "COMMERCIAL CUTS DELIVERED", value: "120+", change: "Zero missed deadlines" },
  { label: "AVERAGE RETENTION BOOST", value: "82%", change: "Above platform baseline" },
  { label: "YEARS OF FRAME OBSESSION", value: "4+", change: "Precision in every cut" },
];
