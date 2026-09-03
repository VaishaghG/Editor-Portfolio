import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Project, PROJECTS as DEFAULT_PROJECTS } from '@/data/projects';
import { Service, SERVICES as DEFAULT_SERVICES } from '@/data/services';
import { ProcessStep, PROCESS_STEPS as DEFAULT_PROCESS_STEPS } from '@/data/process';
import { ToolItem, TOOLS as DEFAULT_TOOLS } from '@/data/tools';
import { TimelineItem, TIMELINE as DEFAULT_TIMELINE, METRICS as DEFAULT_METRICS } from '@/data/experience';
import { DbProject, DbProfile, DbService, DbProcessStep, DbTool, DbExperience, DbMetric, DbSiteSettings } from '@/types/database';

export const DEFAULT_PROFILE: DbProfile = {
  id: 'vg-profile-01',
  name: 'VAISHAGH G.',
  title: 'VIDEO EDITOR / MOTION DESIGNER',
  role_subtitle: 'POST-PRODUCTION LEAD',
  editor_id: 'VG-2026',
  short_bio: 'I am a freelance video editor and motion designer obsessed with the craft of visual storytelling. Whether it\'s cutting a high-octane 30-second commercial reel that converts, or editing a nuanced brand documentary, I treat every frame with mathematical precision.',
  long_bio: 'My process combines non-linear editing mastery, dynamic audio engineering, bespoke motion graphics, and ACES-standard color grading to ensure your footage looks like an international cinema release.',
  philosophy_quote: 'Pacing is emotion. Every millisecond between cuts dictates how the viewer feels, remembers, and reacts.',
  location: 'INDIA (IST / REMOTE)',
  availability: 'AVAILABLE WORLDWIDE',
  profile_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  email: 'vaishagh.cut@gmail.com',
  phone: '+91 98765 43210',
  instagram_handle: '@vaishagh.edits',
  instagram_url: 'https://instagram.com',
  linkedin_handle: 'Vaishagh G.',
  linkedin_url: 'https://linkedin.com',
  behance_url: null,
  youtube_handle: '@vaishaghedits',
  youtube_url: 'https://youtube.com',
  specializations: [
    'Instagram & High-Retention Short-Form Reels',
    'Commercial Brand Films & Product Spots',
    'Corporate Storytelling & Conference Recaps',
    'Kinetic Typography & Motion Graphics (After Effects)',
    'DaVinci Resolve Color Grading & Sound Polish',
  ],
};

export const DEFAULT_SETTINGS: DbSiteSettings = {
  id: 'vg-settings-01',
  site_title: 'Vaishagh G. | Video Editor & Motion Designer Portfolio',
  site_description: 'Vaishagh G. - Professional Video Editor & Motion Designer specializing in high-retention commercial cuts, cinematic storytelling, and kinetic typography.',
  hero_tagline: '[ 2026 REEL ] POST-PRODUCTION • MOTION • COLOR',
  hero_badge_text: 'AVAILABLE FOR HIRE',
  hero_heading_line1: 'I CUT',
  hero_heading_line2: 'MOMENTS',
  hero_heading_line3: 'INTO',
  hero_heading_line4: 'STORIES.',
  hero_manifesto: 'Turning raw, chaotic footage into high-retention stories that leave an indelible mark on the screen.',
  hero_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4',
  hero_poster_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
  hero_cta_text: 'WATCH 2026 SHOWREEL',
  showreel_url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4',
  footer_headline: 'VAISHAGH G.',
  footer_manifesto: 'Turning raw, unstructured footage into cinematic visual experiences that captivate audiences and drive action.',
};

/** Convert DB project to UI Project */
export function mapDbProjectToProject(db: DbProject): Project {
  return {
    id: db.slug || db.id,
    number: db.number,
    title: db.title,
    subtitle: db.subtitle,
    category: db.category,
    year: db.year,
    client: db.client || 'SELECTED CLIENTS',
    role: db.role || 'Lead Editor / Motion Designer',
    aspectRatio: db.aspect_ratio || '16:9',
    duration: db.duration || '01:00',
    fps: db.fps || '24.00 fps',
    software: Array.isArray(db.software) ? db.software : [],
    description: db.description,
    shortDescription: db.short_description || db.description,
    deliverables: Array.isArray(db.deliverables) ? db.deliverables : [],
    metrics: db.metrics || undefined,
    videoUrl: db.video_url,
    thumbnailUrl: db.thumbnail_url,
    colorGrade: db.color_grade || 'Film Print Emulation',
    featured: db.featured,
  };
}

/** Convert DB service to UI Service */
export function mapDbServiceToService(db: DbService): Service {
  return {
    number: db.number,
    title: db.title,
    tagline: db.tagline,
    description: db.description,
    deliverables: Array.isArray(db.deliverables) ? db.deliverables : [],
    software: Array.isArray(db.software) ? db.software : [],
    previewImage: db.preview_image,
    turnaround: db.turnaround,
    idealFor: db.ideal_for,
  };
}

/** Convert DB process step to UI ProcessStep */
export function mapDbProcessToProcess(db: DbProcessStep): ProcessStep {
  return {
    number: db.number,
    phase: db.phase,
    title: db.title,
    description: db.description,
    timelineTrack: db.timeline_track,
    timelineTrackColor: db.timeline_track_color,
    durationPercent: db.duration_percent,
    tasks: Array.isArray(db.tasks) ? db.tasks : [],
    output: db.output,
  };
}

/** Convert DB tool to UI ToolItem */
export function mapDbToolToTool(db: DbTool): ToolItem {
  return {
    id: db.tool_id || db.id,
    name: db.name,
    category: db.category as any,
    level: db.level,
    description: db.description,
    shortcut: db.shortcut,
    role: db.role,
    featuredFeature: db.featured_feature,
  };
}

/** Convert DB experience to UI TimelineItem */
export function mapDbExperienceToTimeline(db: DbExperience): TimelineItem {
  return {
    id: db.item_id || db.id,
    period: db.period,
    role: db.role,
    organization: db.organization,
    location: db.location,
    type: db.type as any,
    highlights: Array.isArray(db.highlights) ? db.highlights : [],
    toolsUsed: Array.isArray(db.tools_used) ? db.tools_used : [],
    status: db.status || undefined,
  };
}

interface PortfolioContextType {
  // Public-ready formatted lists (only published)
  projects: Project[];
  allProjects: DbProject[]; // Raw including drafts for admin
  services: Service[];
  allServices: DbService[];
  processSteps: ProcessStep[];
  allProcessSteps: DbProcessStep[];
  tools: ToolItem[];
  allTools: DbTool[];
  timeline: TimelineItem[];
  allExperience: DbExperience[];
  metrics: DbMetric[];
  profile: DbProfile;
  settings: DbSiteSettings;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allProjects, setAllProjects] = useState<DbProject[]>([]);
  const [allServices, setAllServices] = useState<DbService[]>([]);
  const [allProcessSteps, setAllProcessSteps] = useState<DbProcessStep[]>([]);
  const [allTools, setAllTools] = useState<DbTool[]>([]);
  const [allExperience, setAllExperience] = useState<DbExperience[]>([]);
  const [metrics, setMetrics] = useState<DbMetric[]>(
    DEFAULT_METRICS.map((m, idx) => ({ id: `metric-${idx}`, label: m.label, value: m.value, change: m.change, sort_order: idx + 1 }))
  );
  const [profile, setProfile] = useState<DbProfile>(DEFAULT_PROFILE);
  const [settings, setSettings] = useState<DbSiteSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch all in parallel
      const [
        projectsRes,
        servicesRes,
        processRes,
        toolsRes,
        expRes,
        metricsRes,
        profileRes,
        settingsRes,
      ] = await Promise.all([
        supabase.from('projects').select('*').order('sort_order', { ascending: true }),
        supabase.from('services').select('*').order('sort_order', { ascending: true }),
        supabase.from('process_steps').select('*').order('sort_order', { ascending: true }),
        supabase.from('tools').select('*').order('sort_order', { ascending: true }),
        supabase.from('experience').select('*').order('sort_order', { ascending: true }),
        supabase.from('metrics').select('*').order('sort_order', { ascending: true }),
        supabase.from('profile').select('*').limit(1).maybeSingle(),
        supabase.from('site_settings').select('*').limit(1).maybeSingle(),
      ]);

      if (projectsRes.data && projectsRes.data.length > 0) {
        setAllProjects(projectsRes.data as DbProject[]);
      }
      if (servicesRes.data && servicesRes.data.length > 0) {
        setAllServices(servicesRes.data as DbService[]);
      }
      if (processRes.data && processRes.data.length > 0) {
        setAllProcessSteps(processRes.data as DbProcessStep[]);
      }
      if (toolsRes.data && toolsRes.data.length > 0) {
        setAllTools(toolsRes.data as DbTool[]);
      }
      if (expRes.data && expRes.data.length > 0) {
        setAllExperience(expRes.data as DbExperience[]);
      }
      if (metricsRes.data && metricsRes.data.length > 0) {
        setMetrics(metricsRes.data as DbMetric[]);
      }
      if (profileRes.data) {
        setProfile(profileRes.data as DbProfile);
      }
      if (settingsRes.data) {
        setSettings(settingsRes.data as DbSiteSettings);
      }

      // Refresh ScrollTrigger calculations after content load
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    } catch (err: any) {
      console.warn('Supabase fetch notice: using fallback defaults.', err);
      setError(err.message || 'Error fetching data from database');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derive public lists (without fallback to static constants to ensure DB is the source of truth)
  const projects: Project[] = allProjects.filter((p) => p.published).map(mapDbProjectToProject);
  const services: Service[] = allServices.filter((s) => s.published).map(mapDbServiceToService);
  const processSteps: ProcessStep[] = allProcessSteps.filter((p) => p.published).map(mapDbProcessToProcess);
  const tools: ToolItem[] = allTools.filter((t) => t.published).map(mapDbToolToTool);
  const timeline: TimelineItem[] = allExperience.filter((e) => e.published).map(mapDbExperienceToTimeline);

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        allProjects,
        services,
        allServices,
        processSteps,
        allProcessSteps,
        tools,
        allTools,
        timeline,
        allExperience,
        metrics,
        profile,
        settings,
        isLoading,
        error,
        refreshData: fetchData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
