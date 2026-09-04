export interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  timelineTrack: string;
  timelineTrackColor: string;
  durationPercent: number;
  tasks: string[];
  output: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    phase: "PHASE 01 // DISCOVERY & INGEST",
    title: "UNDERSTAND",
    description: "Deconstructing the core brief, target audience psychology, emotional rhythm, and brand aesthetic guidelines before placing a single cut.",
    timelineTrack: "BIN / INGEST",
    timelineTrackColor: "#3B82F6",
    durationPercent: 15,
    tasks: [
      "Brief & Reference Analysis",
      "Asset Ingest & Proxy Generation",
      "Audio / Multicam Sync",
      "Pacing & Moodboard Alignment"
    ],
    output: "Organized NLE Project & Creative Blueprint"
  },
  {
    number: "02",
    phase: "PHASE 02 // SELECTION & SCRIPTING",
    title: "SELECT",
    description: "Sifting through hours of footage to isolate golden soundbites, micro-expressions, dynamic b-roll angles, and decisive emotional beats.",
    timelineTrack: "SELECTS REEL",
    timelineTrackColor: "#EAB308",
    durationPercent: 20,
    tasks: [
      "String-out of A-Roll dialogue",
      "B-Roll rating & tagging",
      "Hook selection (first 3 seconds)",
      "Audio transcription & keyword search"
    ],
    output: "Pristine Selects Sequence (Top 10% Footage)"
  },
  {
    number: "03",
    phase: "PHASE 03 // THE OFFLINE CUT",
    title: "EDIT",
    description: "Building the skeletal rhythm, narrative arc, dynamic match cuts, speed ramps, and scene pacing. This is where footage transforms into an irresistible story.",
    timelineTrack: "V1 / MAIN STORY",
    timelineTrackColor: "#10B981",
    durationPercent: 35,
    tasks: [
      "Rough cut assembly",
      "Beat & tempo synchronization",
      "Pattern interrupts & jump cuts",
      "Pacing refinement with client feedback"
    ],
    output: "Locked Offline Edit (V1 / Picture Lock)"
  },
  {
    number: "04",
    phase: "PHASE 04 // MOTION & TYPOGRAPHY",
    title: "DESIGN",
    description: "Layering custom kinetic typography, animated lower thirds, screen mockups, visual effects, and graphic callouts that keep viewer attention locked.",
    timelineTrack: "V2 / MOGRT & VFX",
    timelineTrackColor: "#8B5CF6",
    durationPercent: 15,
    tasks: [
      "Kinetic title animations",
      "Motion tracking & rotoscoping",
      "Graphic callouts & UI elements",
      "Custom transition design"
    ],
    output: "Motion Compositions & Visual Polish"
  },
  {
    number: "05",
    phase: "PHASE 05 // SOUND & COLOR GRADE",
    title: "POLISH",
    description: "The cinema standard finish. Custom sound effects, sub-bass impacts, vocal equalization, and precise color grading.",
    timelineTrack: "A1-A3 / COLOR LUT",
    timelineTrackColor: "#E50914",
    durationPercent: 15,
    tasks: [
      "Color grading & film tone balance",
      "Dialogue cleanup & noise reduction",
      "Layered SFX (whooshes, hits, ambient foley)",
      "Master loudness normalization (-14 LUFS)"
    ],
    output: "Final 4K ProRes Master + Social Deliverables"
  }
];
