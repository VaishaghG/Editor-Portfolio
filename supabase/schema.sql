-- ============================================================================
-- VAISHAGH G. CINEMATIC VIDEO EDITOR PORTFOLIO - SUPABASE DATABASE SCHEMA
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. TABLE: projects
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL DEFAULT '01',
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  year TEXT NOT NULL DEFAULT '2026',
  client TEXT DEFAULT 'SELECTED CLIENTS',
  role TEXT DEFAULT 'Lead Editor / Motion Designer',
  aspect_ratio TEXT DEFAULT '16:9',
  duration TEXT DEFAULT '01:00',
  fps TEXT DEFAULT '24.00 fps',
  software JSONB DEFAULT '["Premiere Pro", "After Effects"]'::jsonb,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  deliverables JSONB DEFAULT '["Master 4K Edit"]'::jsonb,
  metrics TEXT DEFAULT NULL,
  video_url TEXT DEFAULT '',
  thumbnail_url TEXT NOT NULL DEFAULT '',
  poster_url TEXT DEFAULT NULL,
  project_url TEXT DEFAULT NULL,
  color_grade TEXT DEFAULT 'Film Print Emulation',
  sort_order INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT true,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON public.projects(sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);

-- ============================================================================
-- 2. TABLE: profile
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'VAISHAGH G.',
  title TEXT NOT NULL DEFAULT 'VIDEO EDITOR / MOTION DESIGNER',
  role_subtitle TEXT NOT NULL DEFAULT 'POST-PRODUCTION LEAD',
  editor_id TEXT NOT NULL DEFAULT 'VG-2026',
  short_bio TEXT NOT NULL DEFAULT '',
  long_bio TEXT DEFAULT '',
  philosophy_quote TEXT DEFAULT 'Pacing is emotion. Every millisecond between cuts dictates how the viewer feels, remembers, and reacts.',
  location TEXT NOT NULL DEFAULT 'INDIA (IST / REMOTE)',
  availability TEXT NOT NULL DEFAULT 'AVAILABLE WORLDWIDE',
  profile_image_url TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT 'vaishagh.cut@gmail.com',
  phone TEXT DEFAULT '+91 98765 43210',
  instagram_handle TEXT DEFAULT '@vaishagh.edits',
  instagram_url TEXT DEFAULT 'https://instagram.com',
  linkedin_handle TEXT DEFAULT 'Vaishagh G.',
  linkedin_url TEXT DEFAULT 'https://linkedin.com',
  behance_url TEXT DEFAULT NULL,
  youtube_handle TEXT DEFAULT '@vaishaghedits',
  youtube_url TEXT DEFAULT 'https://youtube.com',
  specializations JSONB DEFAULT '["Instagram & High-Retention Short-Form Reels", "Commercial Brand Films & Product Spots", "Corporate Storytelling & Conference Recaps", "Kinetic Typography & Motion Graphics (After Effects)", "DaVinci Resolve Color Grading & Sound Polish"]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. TABLE: services
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL DEFAULT '01',
  title TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  deliverables JSONB DEFAULT '[]'::jsonb,
  software JSONB DEFAULT '[]'::jsonb,
  preview_image TEXT NOT NULL DEFAULT '',
  turnaround TEXT NOT NULL DEFAULT '2–4 Business Days',
  ideal_for TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_sort_order ON public.services(sort_order ASC);

-- ============================================================================
-- 4. TABLE: process_steps
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.process_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL DEFAULT '01',
  phase TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  timeline_track TEXT NOT NULL DEFAULT 'V1',
  timeline_track_color TEXT NOT NULL DEFAULT '#E50914',
  duration_percent INTEGER NOT NULL DEFAULT 20,
  tasks JSONB DEFAULT '[]'::jsonb,
  output TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_process_sort_order ON public.process_steps(sort_order ASC);

-- ============================================================================
-- 5. TABLE: tools
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'PRIMARY NLE',
  level TEXT NOT NULL DEFAULT 'ADVANCED',
  description TEXT NOT NULL DEFAULT '',
  shortcut TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  featured_feature TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_tools_sort_order ON public.tools(sort_order ASC);

-- ============================================================================
-- 6. TABLE: experience
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id TEXT UNIQUE NOT NULL,
  period TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'FREELANCE',
  highlights JSONB DEFAULT '[]'::jsonb,
  tools_used JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_experience_sort_order ON public.experience(sort_order ASC);

-- ============================================================================
-- 7. TABLE: metrics
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  change TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_metrics_sort_order ON public.metrics(sort_order ASC);

-- ============================================================================
-- 8. TABLE: site_settings
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_title TEXT NOT NULL DEFAULT 'Vaishagh G. | Video Editor & Motion Designer Portfolio',
  site_description TEXT NOT NULL DEFAULT 'Vaishagh G. - Professional Video Editor & Motion Designer specializing in high-retention commercial cuts, cinematic storytelling, and kinetic typography.',
  hero_tagline TEXT DEFAULT '[ 2026 REEL ] POST-PRODUCTION • MOTION • COLOR',
  hero_badge_text TEXT DEFAULT 'AVAILABLE FOR HIRE',
  hero_heading_line1 TEXT DEFAULT 'I CUT',
  hero_heading_line2 TEXT DEFAULT 'MOMENTS',
  hero_heading_line3 TEXT DEFAULT 'INTO',
  hero_heading_line4 TEXT DEFAULT 'STORIES.',
  hero_manifesto TEXT DEFAULT 'Turning raw, chaotic footage into high-retention stories that leave an indelible mark on the screen.',
  hero_video_url TEXT DEFAULT 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4',
  hero_poster_url TEXT DEFAULT 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
  hero_cta_text TEXT DEFAULT 'WATCH 2026 SHOWREEL',
  showreel_url TEXT DEFAULT 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4',
  footer_headline TEXT DEFAULT 'VAISHAGH G.',
  footer_manifesto TEXT DEFAULT 'Turning raw, unstructured footage into cinematic visual experiences that captivate audiences and drive action.',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 1. PROJECTS POLICIES
-- Public: Read only published projects
CREATE POLICY "Public users can view published projects"
  ON public.projects FOR SELECT
  USING (published = true);

-- Admin (Authenticated): Full access
CREATE POLICY "Admin has full access to projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 2. PROFILE POLICIES
-- Public: Read profile
CREATE POLICY "Public users can view profile"
  ON public.profile FOR SELECT
  USING (true);

-- Admin: Full access
CREATE POLICY "Admin has full access to profile"
  ON public.profile FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. SERVICES POLICIES
-- Public: Read published services
CREATE POLICY "Public users can view published services"
  ON public.services FOR SELECT
  USING (published = true);

-- Admin: Full access
CREATE POLICY "Admin has full access to services"
  ON public.services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. PROCESS STEPS POLICIES
-- Public: Read published process steps
CREATE POLICY "Public users can view published process steps"
  ON public.process_steps FOR SELECT
  USING (published = true);

-- Admin: Full access
CREATE POLICY "Admin has full access to process steps"
  ON public.process_steps FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. TOOLS POLICIES
-- Public: Read published tools
CREATE POLICY "Public users can view published tools"
  ON public.tools FOR SELECT
  USING (published = true);

-- Admin: Full access
CREATE POLICY "Admin has full access to tools"
  ON public.tools FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. EXPERIENCE POLICIES
-- Public: Read published experience
CREATE POLICY "Public users can view published experience"
  ON public.experience FOR SELECT
  USING (published = true);

-- Admin: Full access
CREATE POLICY "Admin has full access to experience"
  ON public.experience FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. METRICS POLICIES
-- Public: Read metrics
CREATE POLICY "Public users can view metrics"
  ON public.metrics FOR SELECT
  USING (true);

-- Admin: Full access
CREATE POLICY "Admin has full access to metrics"
  ON public.metrics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 8. SITE SETTINGS POLICIES
-- Public: Read settings
CREATE POLICY "Public users can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- Admin: Full access
CREATE POLICY "Admin has full access to site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- STORAGE BUCKETS (portfolio-images & portfolio-videos)
-- Note: Run in Supabase SQL editor or create via Storage dashboard
-- ============================================================================

-- Insert storage buckets if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('portfolio-images', 'portfolio-images', true),
  ('portfolio-videos', 'portfolio-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: Public can read, Authenticated can upload/delete
CREATE POLICY "Public can view portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admin can upload portfolio images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Admin can update portfolio images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admin can delete portfolio images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Public can view portfolio videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-videos');

CREATE POLICY "Admin can upload portfolio videos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-videos');

CREATE POLICY "Admin can update portfolio videos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-videos');

CREATE POLICY "Admin can delete portfolio videos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-videos');
