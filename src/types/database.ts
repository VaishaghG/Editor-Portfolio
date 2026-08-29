export interface DbProject {
  id: string;
  number: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  role: string;
  aspect_ratio: string;
  duration: string;
  fps: string;
  software: string[];
  short_description: string;
  description: string;
  deliverables: string[];
  metrics?: string | null;
  video_url: string;
  thumbnail_url: string;
  poster_url?: string | null;
  project_url?: string | null;
  color_grade: string;
  sort_order: number;
  featured: boolean;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbProfile {
  id: string;
  name: string;
  title: string;
  role_subtitle: string;
  editor_id: string;
  short_bio: string;
  long_bio: string;
  philosophy_quote: string;
  location: string;
  availability: string;
  profile_image_url: string;
  email: string;
  phone: string;
  instagram_handle: string;
  instagram_url: string;
  linkedin_handle: string;
  linkedin_url: string;
  behance_url?: string | null;
  youtube_handle: string;
  youtube_url: string;
  specializations: string[];
  updated_at?: string;
}

export interface DbService {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  software: string[];
  preview_image: string;
  turnaround: string;
  ideal_for: string;
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbProcessStep {
  id: string;
  number: string;
  phase: string;
  title: string;
  description: string;
  timeline_track: string;
  timeline_track_color: string;
  duration_percent: number;
  tasks: string[];
  output: string;
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbTool {
  id: string;
  tool_id: string;
  name: string;
  category: "PRIMARY NLE" | "MOTION & VFX" | "COLOR & AUDIO" | "DESIGN & GRAPHICS" | string;
  level: string;
  description: string;
  shortcut: string;
  role: string;
  featured_feature: string;
  sort_order: number;
  published: boolean;
}

export interface DbExperience {
  id: string;
  item_id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  type: "FREELANCE" | "EDUCATION" | "AGENCY / COLLAB" | string;
  highlights: string[];
  tools_used: string[];
  status?: string | null;
  sort_order: number;
  published: boolean;
}

export interface DbMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  sort_order: number;
}

export interface DbSiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  hero_tagline: string;
  hero_badge_text: string;
  hero_heading_line1: string;
  hero_heading_line2: string;
  hero_heading_line3: string;
  hero_heading_line4: string;
  hero_manifesto: string;
  hero_video_url: string;
  hero_poster_url: string;
  hero_cta_text: string;
  showreel_url: string;
  footer_headline: string;
  footer_manifesto: string;
  updated_at?: string;
}
