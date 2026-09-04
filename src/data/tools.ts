export interface ToolItem {
  id: string;
  name: string;
  category: "PRIMARY NLE" | "MOTION & VFX" | "COLOR & FINISHING";
  level: string;
  description: string;
  shortcut: string;
  role: string;
  featuredFeature: string;
}

export const TOOLS: ToolItem[] = [
  {
    id: "premiere-pro",
    name: "ADOBE PREMIERE PRO",
    category: "PRIMARY NLE",
    level: "EXPERIENCED / 3+ YEARS",
    description: "Lightning-fast ripple edits, dynamic multicam assemblies, nested sequences, and audio-reactive speed ramping.",
    shortcut: "Q / W / C / V",
    role: "Core Narrative & Offline Editing Engine",
    featuredFeature: "Lumetri Color Sync & Dynamic Link"
  },
  {
    id: "after-effects",
    name: "ADOBE AFTER EFFECTS",
    category: "MOTION & VFX",
    level: "EXPERIENCED / 3+ YEARS",
    description: "Complex keyframe easing, 3D camera tracking, kinetic typography expressions, rotoscoping, and bespoke visual effects.",
    shortcut: "F9 / U / Alt+[ / Ctrl+D",
    role: "Motion Graphics & Compositing Powerhouse",
    featuredFeature: "Graph Editor Precision & Expressions"
  },
  {
    id: "lightroom",
    name: "ADOBE LIGHTROOM",
    category: "COLOR & FINISHING",
    level: "EXPERIENCED / 3+ YEARS",
    description: "Precise color grading, tone curve adjustments, selective masking, and film look color styling for visual consistency.",
    shortcut: "D / G / E / Y",
    role: "Color Grading & Photographic Visual Styling",
    featuredFeature: "Tone Curves, Masking & Color Grading Wheels"
  }
];
