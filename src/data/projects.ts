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

// Single Source of Truth: Projects are loaded exclusively from Supabase / CMS.
// No template, placeholder, or demo projects are hardcoded here.
export const PROJECTS: Project[] = [];
