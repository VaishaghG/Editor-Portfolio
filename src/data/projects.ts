export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  role: string;
  aspectRatio: string;
  duration: string;
  fps: string;
  software: string[];
  description: string;
  shortDescription: string;
  deliverables: string[];
  metrics?: string;
  videoUrl: string;
  thumbnailUrl: string;
  colorGrade: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "cinematic-reel-2026",
    number: "01",
    title: "NEO VISIONS",
    subtitle: "SHOWREEL 2026 // COMMERCIAL & SHORT-FORM",
    category: "SHOWREEL / BRAND",
    year: "2026",
    client: "SELECTED CLIENTS",
    role: "Lead Editor / Sound Design / Colorist",
    aspectRatio: "16:9",
    duration: "01:24",
    fps: "23.976 fps",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    shortDescription: "A high-octane visual showcase blending fast-paced rhythmic cuts, kinetic typography, and deep cinematic sound design.",
    description: "Curated collection of high-energy commercial cuts, short-form viral storytelling, and narrative moments. Designed to test the limits of audio-visual synchronization, dynamic speed ramps, and seamless invisible transitions.",
    deliverables: ["Master 4K 16:9 Edit", "Social 9:16 Cuts", "Custom Sound Design Stems", "Color LUT Package"],
    metrics: "2.4M+ Organic Impressions across channels",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    colorGrade: "Kodak 2383 / Cyber Cyan & Red Punch",
    featured: true,
  },
  {
    id: "urban-drift-tokyo",
    number: "02",
    title: "REDLINE APEX",
    subtitle: "STREET CULTURE // COMMERCIAL EDIT",
    category: "COMMERCIAL EDIT",
    year: "2025",
    client: "HYPERDRIVE GEAR",
    role: "Offline Editor & Kinetic Motion",
    aspectRatio: "16:9",
    duration: "00:48",
    fps: "59.94 fps",
    software: ["Premiere Pro", "After Effects", "Photoshop"],
    shortDescription: "Adrenaline-fueled automotive brand film cutting to roaring engine transients and heavy bass impacts.",
    description: "Built for maximum retention. Leveraged micro-match cuts on wheel rotations, custom motion blur tracking, and glitch sound design to elevate a nighttime street drift film into a stylized brand anthem.",
    deliverables: ["4K Master Commercial", "3x 9:16 Viral Reels", "Sound Mix & SFX Stems"],
    metrics: "480K Views / 18% Higher Engagement",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-neon-lights-42997-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    colorGrade: "Deep Shadow Noir & High Contrast Sodium",
    featured: true,
  },
  {
    id: "apex-motion-system",
    number: "03",
    title: "KINETIC MATRIX",
    subtitle: "3D TITLE SEQUENCE // MOTION GRAPHICS",
    category: "MOTION GRAPHICS",
    year: "2025",
    client: "SYNAPSE STUDIOS",
    role: "Motion Designer & Compositor",
    aspectRatio: "2.39:1",
    duration: "00:36",
    fps: "24.00 fps",
    software: ["After Effects", "Illustrator", "Premiere Pro"],
    shortDescription: "Futuristic typography title sequence with brutalist UI overlays and fluid camera inertia.",
    description: "An experimental typographic exploration combining parametric grid distortion, custom timecode HUDs, and mechanical typography reveals for a sci-fi documentary title sequence.",
    deliverables: ["Title Sequence", "Lower Thirds Package", "MOGRT Templates for Premiere"],
    metrics: "Official Selection Design Showcase 2025",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-mesh-42999-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    colorGrade: "Monochrome Graphite & Crimson Laser",
    featured: true,
  },
  {
    id: "echoes-of-silence",
    number: "04",
    title: "ECHOES OF SILENCE",
    subtitle: "NARRATIVE SHORT FILM // COLOR & PACING",
    category: "NARRATIVE / SHORT",
    year: "2025",
    client: "INDEPENDENT FILMMAKERS",
    role: "Picture Editor & DaVinci Colorist",
    aspectRatio: "2.35:1",
    duration: "04:12",
    fps: "23.976 fps",
    software: ["DaVinci Resolve", "Premiere Pro"],
    shortDescription: "A haunting, atmospheric narrative cut where silence and micro-expressions carry the tension.",
    description: "Pacing was dialed down to create visceral suspense. Every cut respects character eyelines and breathing rhythms, finished with a custom film emulation color pipeline built in DaVinci Resolve.",
    deliverables: ["DCI 4K Film Master", "Color Grading Project (.drp)", "ProRes 4444 Master"],
    metrics: "Winner: Best Editing (Regional Indie Fest)",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
    colorGrade: "Fuji Eterna 250D Print Emulation",
    featured: true,
  },
  {
    id: "viral-reels-engine",
    number: "05",
    title: "VELOCITY REELS",
    subtitle: "HIGH-RETENTION SOCIAL // VIRAL CAMPAIGN",
    category: "INSTAGRAM / SHORT FORM",
    year: "2026",
    client: "FOUNDER & CREATOR ACCOUNTS",
    role: "Short-Form Specialist & Script Editor",
    aspectRatio: "9:16",
    duration: "00:32",
    fps: "60.00 fps",
    software: ["Premiere Pro", "After Effects", "Photoshop"],
    shortDescription: "Sub-3-second hook structure, custom graphic callouts, and hypnotic audio triggers for viral reach.",
    description: "Crafted for maximum watch time and 85%+ retention rate. Engineered with dynamic caption animations, B-roll jump-cuts every 1.8 seconds, and punchy whooshes/risers to keep audiences hooked until the final loop.",
    deliverables: ["15x 9:16 Master Reels", "CapCut / MOGRT Templates", "Sound FX Library"],
    metrics: "12.8M+ Total Views / 4.2x Retention Spike",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41534-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    colorGrade: "Vibrant Social Saturation & Clean Skin Tones",
    featured: true,
  },
  {
    id: "soundwave-noir",
    number: "06",
    title: "CHRONO PULSE",
    subtitle: "AUDIO-VISUAL SYNTHESIS // MUSIC RECAP",
    category: "MUSIC / EVENT",
    year: "2025",
    client: "SONIC NIGHTS",
    role: "Offline Editor & Sound Designer",
    aspectRatio: "16:9",
    duration: "01:15",
    fps: "24.00 fps",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    shortDescription: "Strobe cuts, bass drop warp transitions, and crowd euphoria captured with frame-accurate precision.",
    description: "An explosive live music recap synchronizing multi-camera concert footage with audio stem transients. Utilized speed ramping, lens distortion flashes, and camera whip pans to simulate being front row in the crowd.",
    deliverables: ["Concert Aftermovie 4K", "3x Teaser Clips", "Vertical Story Edits"],
    metrics: "Over 350K Views in first 48 hours",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-at-a-club-41484-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    colorGrade: "Deep Magenta & Amber Stage Glow",
    featured: false,
  },
];
