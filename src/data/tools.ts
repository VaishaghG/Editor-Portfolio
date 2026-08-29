export interface ToolItem {
  id: string;
  name: string;
  category: "PRIMARY NLE" | "MOTION & VFX" | "COLOR & AUDIO" | "DESIGN & GRAPHICS";
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
    level: "MASTER / 5+ YEARS",
    description: "Lightning-fast ripple edits, dynamic multicam assemblies, nested sequences, and audio-reactive speed ramping.",
    shortcut: "Q / W / C / V",
    role: "Core Narrative & Offline Editing Engine",
    featuredFeature: "Lumetri Color Sync & Dynamic Link"
  },
  {
    id: "after-effects",
    name: "ADOBE AFTER EFFECTS",
    category: "MOTION & VFX",
    level: "ADVANCED / 4+ YEARS",
    description: "Complex keyframe easing, 3D camera tracking, kinetic typography expressions, rotoscoping, and bespoke visual effects.",
    shortcut: "F9 / U / Alt+[ / Ctrl+D",
    role: "Motion Graphics & Compositing Powerhouse",
    featuredFeature: "Graph Editor Precision & Expressions"
  },
  {
    id: "davinci-resolve",
    name: "DAVINCI RESOLVE STUDIO",
    category: "COLOR & AUDIO",
    level: "PROFESSIONAL / 3+ YEARS",
    description: "Node-based color grading, ACES color management, skin-tone isolation, film print emulation, and Fairlight sound mixing.",
    shortcut: "Alt+S / Shift+H / Ctrl+D",
    role: "Colorist Suite & Final Picture Finish",
    featuredFeature: "Color Wheels, Curves & 3D LUTs"
  },
  {
    id: "photoshop",
    name: "ADOBE PHOTOSHOP",
    category: "DESIGN & GRAPHICS",
    level: "ADVANCED / 5+ YEARS",
    description: "Asset cutouts, background matte painting, high-CTR YouTube thumbnail composite art, and frame-by-frame texture painting.",
    shortcut: "Ctrl+J / Ctrl+T / B / M",
    role: "Visual Direction & Poster Design",
    featuredFeature: "Layer Masking & Generative Polish"
  },
  {
    id: "illustrator",
    name: "ADOBE ILLUSTRATOR",
    category: "DESIGN & GRAPHICS",
    level: "PROFICIENT / 3+ YEARS",
    description: "Crisp vector iconography, typography glyph manipulation, and custom badge assets ready for After Effects animation.",
    shortcut: "P / V / A / Ctrl+G",
    role: "Vector Identity & Typography Customization",
    featuredFeature: "Infinite Scale Vector Shapes"
  },
  {
    id: "audition",
    name: "ADOBE AUDITION",
    category: "COLOR & AUDIO",
    level: "PROFICIENT / 3+ YEARS",
    description: "Spectral frequency cleanup, room reverb reduction, multiband compression, and loudness normalization for broadcast.",
    shortcut: "R / S / Shift+P",
    role: "Acoustic Cleanup & Transient Polishing",
    featuredFeature: "Spectral Repair & Parametric EQ"
  }
];
