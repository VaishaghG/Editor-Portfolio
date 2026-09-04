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
      "Specializing in high-retention short-form reels, commercial cuts, and creative post-production storytelling.",
      "Architected custom automated motion templates (MOGRTs) that shortened post-production turnaround."
    ],
    toolsUsed: ["Adobe Premiere Pro", "Adobe After Effects", "Adobe Lightroom"],
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
      "Synthesizing technical problem-solving with creative post-production workflows and video rendering pipelines."
    ],
    toolsUsed: ["Algorithms", "Web Technologies", "Digital Signal Processing"],
    status: "IN PROGRESS"
  },
  {
    id: "content-lead-past",
    period: "2024 — 2026",
    role: "VIDEO EDITOR & MOTION DESIGNER",
    organization: "DIGITAL MEDIA & CREATIVE PRACTICE",
    location: "INDIA",
    type: "AGENCY / COLLAB",
    highlights: [
      "Created fast-turnaround video edits, corporate reels, and event recaps.",
      "Managed offline assembly, color balance, and sound design across multicamera setups.",
      "Crafted dynamic rhythm pacing, speed ramps, and keyframe motion graphics in After Effects."
    ],
    toolsUsed: ["Adobe Premiere Pro", "Adobe After Effects", "Adobe Lightroom"]
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
  { label: "YEARS EDITING", value: "03+", change: "Hands-on experience with video editing and creative post-production." },
  { label: "CREATIVE TOOLS", value: "03", change: "Adobe Premiere Pro, After Effects and Lightroom." },
  { label: "VERTICAL-FIRST", value: "9:16", change: "Built for reels, short-form content and social-first storytelling." },
  { label: "DELIVERY READY", value: "4K", change: "High-resolution exports with attention to quality and detail." }
];
