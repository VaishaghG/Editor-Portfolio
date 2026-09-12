import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Project } from '@/data/projects';
import { Service } from '@/data/services';
import { ProcessStep } from '@/data/process';
import { ToolItem } from '@/data/tools';
import { TimelineItem } from '@/data/experience';
import { DbProject, DbProfile, DbService, DbProcessStep, DbTool, DbExperience, DbMetric, DbSiteSettings } from '@/types/database';
import {
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_TOOLS,
  DEFAULT_TIMELINE,
  DEFAULT_METRICS,
  mapDbProjectToProject,
  mapDbServiceToService,
  mapDbProcessToProcess,
  mapDbToolToTool,
  mapDbExperienceToTimeline,
} from '@/data/portfolioDefaults';

export {
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_TOOLS,
  DEFAULT_TIMELINE,
  DEFAULT_METRICS,
  mapDbProjectToProject,
  mapDbServiceToService,
  mapDbProcessToProcess,
  mapDbToolToTool,
  mapDbExperienceToTimeline,
};

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
        const p = { ...(profileRes.data as DbProfile) };
        if (!p.instagram_handle || p.instagram_handle === '@vaishagh.edits' || p.instagram_handle === 'vaishagh.edits') {
          p.instagram_handle = '@vaish.aep';
        }
        if (!p.instagram_url || p.instagram_url === 'https://instagram.com' || p.instagram_url.includes('vaishagh.edits')) {
          p.instagram_url = 'https://instagram.com/vaish.aep';
        }
        setProfile(p);
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

  // Derive public lists (Projects use DB as single source of truth without template fallbacks)
  const projects: Project[] = allProjects.filter((p) => p.published).map(mapDbProjectToProject);
  const services: Service[] = allServices.length > 0 ? allServices.filter((s) => s.published).map(mapDbServiceToService) : DEFAULT_SERVICES;
  const processSteps: ProcessStep[] = allProcessSteps.length > 0 ? allProcessSteps.filter((p) => p.published).map(mapDbProcessToProcess) : DEFAULT_PROCESS_STEPS;
  const tools: ToolItem[] = allTools.length > 0 ? allTools.filter((t) => t.published).map(mapDbToolToTool) : DEFAULT_TOOLS;
  const timeline: TimelineItem[] = allExperience.length > 0 ? allExperience.filter((e) => e.published).map(mapDbExperienceToTimeline) : DEFAULT_TIMELINE;

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
