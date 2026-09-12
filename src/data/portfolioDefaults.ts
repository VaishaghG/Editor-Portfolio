import { Project, PROJECTS as DEFAULT_PROJECTS } from '@/data/projects';
import { Service, SERVICES as DEFAULT_SERVICES } from '@/data/services';
import { ProcessStep, PROCESS_STEPS as DEFAULT_PROCESS_STEPS } from '@/data/process';
import { ToolItem, TOOLS as DEFAULT_TOOLS } from '@/data/tools';
import { TimelineItem, TIMELINE as DEFAULT_TIMELINE, METRICS as DEFAULT_METRICS } from '@/data/experience';
import { DbProject, DbProfile, DbService, DbProcessStep, DbTool, DbExperience, DbMetric, DbSiteSettings } from '@/types/database';

export { DEFAULT_PROJECTS, DEFAULT_SERVICES, DEFAULT_PROCESS_STEPS, DEFAULT_TOOLS, DEFAULT_TIMELINE, DEFAULT_METRICS };

export const DEFAULT_PROFILE: DbProfile = {
  id: 'vg-profile-01',
  name: 'VAISHAGH G.',
  title: 'VIDEO EDITOR / MOTION DESIGNER',
  role_subtitle: 'POST-PRODUCTION LEAD',
  editor_id: 'VG-2026',
  short_bio: 'I am a freelance video editor and motion designer obsessed with the craft of visual storytelling. Whether it\'s cutting a high-octane 30-second commercial reel that converts, or editing a nuanced brand documentary, I treat every frame with mathematical precision.',
  long_bio: 'My process combines non-linear editing mastery, dynamic audio engineering, bespoke motion graphics, and clean color grading to ensure your footage looks like an international cinema release.',
  philosophy_quote: 'Pacing is emotion. Every millisecond between cuts dictates how the viewer feels, remembers, and reacts.',
  location: 'INDIA (IST / REMOTE)',
  availability: 'AVAILABLE WORLDWIDE',
  profile_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  email: 'vaishagh.cut@gmail.com',
  phone: '+91 98765 43210',
  instagram_handle: '@vaish.aep',
  instagram_url: 'https://instagram.com/vaish.aep',
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
    'Adobe Premiere Pro & Lightroom Color Polish',
  ],
};

export const DEFAULT_SETTINGS: DbSiteSettings = {
  id: 'vg-settings-01',
  site_title: 'Vaish. | Video Editor & Motion Designer Portfolio',
  site_description: 'Vaishagh G. - Professional Video Editor & Motion Designer specializing in high-retention commercial cuts, cinematic storytelling, and kinetic typography.',
  hero_tagline: '[ 2026 REEL ] POST-PRODUCTION • MOTION • COLOR',
  hero_badge_text: 'AVAILABLE FOR HIRE',
  hero_heading_line1: 'I CUT',
  hero_heading_line2: 'MOMENTS',
  hero_heading_line3: 'INTO',
  hero_heading_line4: 'STORIES.',
  hero_manifesto: 'Turning raw, chaotic footage into high-retention stories that leave an indelible mark on the screen.',
  hero_video_url: '',
  hero_poster_url: '',
  hero_cta_text: 'WATCH 2026 SHOWREEL',
  showreel_url: '',
  footer_headline: 'VAISH.',
  footer_manifesto: 'Turning raw, unstructured footage into cinematic visual experiences that captivate audiences and drive action.',
};

/** Convert DB project to UI Project */
export function mapDbProjectToProject(db: DbProject): Project {
  const deliverables = Array.isArray(db.deliverables) && db.deliverables.length > 0
    ? db.deliverables
    : ['Cinematic Cut', 'Color Grade'];
  
  const software = Array.isArray(db.software) && db.software.length > 0
    ? db.software
    : ['Premiere Pro', 'After Effects'];

  return {
    id: db.slug || db.id,
    number: db.number || '01',
    title: db.title || 'UNTITLED PROJECT',
    subtitle: db.subtitle || 'COMMERCIAL / REEL',
    category: db.category || 'COMMERCIAL',
    year: db.year || '2026',
    client: db.client || 'SELECTED CLIENTS',
    role: db.role || 'Lead Editor / Motion Designer',
    aspectRatio: db.aspect_ratio || '16:9',
    duration: db.duration || '01:00',
    fps: db.fps || '24.00 fps',
    software,
    description: db.description || '',
    shortDescription: db.short_description || db.description || '',
    deliverables,
    metrics: typeof db.metrics === 'string' ? db.metrics : undefined,
    videoUrl: db.video_url || '',
    thumbnailUrl: db.thumbnail_url || '',
    colorGrade: db.color_grade || 'Film Print Emulation',
    featured: Boolean(db.featured),
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
