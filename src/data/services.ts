export interface Service {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  software: string[];
  previewImage: string;
  turnaround: string;
  idealFor: string;
}

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "LONG-FORM & COMMERCIAL EDITING",
    tagline: "Rhythm, pacing, and narrative architecture.",
    description: "Transforming hours of raw footage into polished, emotionally gripping stories. I handle everything from multicam sync, narrative pacing, and story structure to final sound and color balance.",
    deliverables: ["4K Master ProRes/H.264", "Full Multicam Offline Edits", "Project Archive (.prproj / .drp)", "Multiple Aspect Ratios"],
    software: ["Adobe Premiere Pro", "DaVinci Resolve"],
    previewImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    turnaround: "3–7 Business Days",
    idealFor: "Brand films, documentaries, YouTube long-form, commercial spots",
  },
  {
    number: "02",
    title: "VIRAL SHORT-FORM & REELS",
    tagline: "Sub-3-second hooks and retention-engineered pacing.",
    description: "High-retention vertical editing (9:16) tailored for Instagram Reels, TikTok, and YouTube Shorts. Built with pattern interrupts, animated kinetic captions, sound design hits, and pacing that maximizes average view duration.",
    deliverables: ["9:16 4K Ultra-Sharp Exports", "Burned-in Animated Captions", "Audio Stems & Sound FX", "Batch Content Delivery"],
    software: ["Premiere Pro", "After Effects", "Photoshop"],
    previewImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    turnaround: "24–48 Hours per Batch",
    idealFor: "Creators, founders, personal brands, agency clients",
  },
  {
    number: "03",
    title: "MOTION GRAPHICS & KINETIC TYPOGRAPHY",
    tagline: "Visual identity that moves with weight and elegance.",
    description: "Custom lower-thirds, title sequences, 2D/3D kinetic typography, logo reveals, UI animation mockups, and infographic motion tracking that elevate static footage into dynamic visuals.",
    deliverables: ["Custom After Effects Comps", "MOGRT Motion Templates", "Transparent Alpha Video (ProRes 4444)", "Vector Animation Assets"],
    software: ["Adobe After Effects", "Illustrator", "Photoshop"],
    previewImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    turnaround: "2–4 Days",
    idealFor: "Title sequences, tech explainers, advertising overlays, HUD designs",
  },
  {
    number: "04",
    title: "SOCIAL MEDIA & CREATOR SYSTEMS",
    tagline: "End-to-end content pipeline for consistent output.",
    description: "A complete post-production ecosystem for high-volume content creators. Developing brand visual guidelines, reusable motion kits, automated caption styles, and fast turnaround workflows.",
    deliverables: ["Weekly/Monthly Content Batches", "Thumbnail Graphic Direction", "Asset Library & Presets", "Dedicated Slack/Discord Sync"],
    software: ["Premiere Pro", "After Effects", "Photoshop"],
    previewImage: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80",
    turnaround: "Weekly Retainer Schedule",
    idealFor: "Agencies, high-growth podcasters, creator ecosystems",
  },
  {
    number: "05",
    title: "CORPORATE & EVENT RECAPS",
    tagline: "High-energy pacing meets professional corporate polish.",
    description: "Capturing the energy of live conferences, product launches, summits, and festival stages. Crafting dynamic montage recaps that hype audiences and generate future sponsor buy-in.",
    deliverables: ["Same-Day / Next-Day Teaser Cut", "Full Event Recap (2-3 mins)", "Speaker Highlight Snippets", "Sponsor-Branded Vertical Stories"],
    software: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    previewImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    turnaround: "24–72 Hours",
    idealFor: "Tech conferences, product reveals, festivals, corporate summits",
  },
  {
    number: "06",
    title: "COLOR GRADING & SOUND DESIGN",
    tagline: "Cinematic depth, film emulation, and punchy acoustic transients.",
    description: "The finishing touch that separates amateur edits from cinema. Precise skin-tone isolation, film print emulation (Kodak/Fuji), atmospheric foley, whoosh risers, sub-drops, and broadcast-standard loudness leveling (-14 LUFS).",
    deliverables: ["DaVinci Resolve Color Grade", "Custom 3D LUTs (.cube)", "Full Sound Design Mix (Dialogue, SFX, Music Stems)", "Master Stereo & 5.1 Stems"],
    software: ["DaVinci Resolve Studio", "Adobe Audition"],
    previewImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    turnaround: "1–3 Days",
    idealFor: "Commercial spots, short films, music videos, premium reels",
  },
];
