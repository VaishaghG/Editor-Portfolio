import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Film,
  Plus,
  ExternalLink,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Wrench,
  GraduationCap,
  Settings,
  ArrowUpRight,
} from 'lucide-react';
import { usePortfolio, mapDbProjectToProject } from '@/context/PortfolioContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CinemaModal } from '@/components/common/CinemaModal';
import { Project } from '@/data/projects';
import { DbProject } from '@/types/database';

export const AdminDashboard: React.FC = () => {
  const { allProjects, projects, refreshData } = usePortfolio();
  const navigate = useNavigate();

  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Compute metrics
  const totalProjects = allProjects.length > 0 ? allProjects.length : projects.length;
  const publishedProjects = allProjects.length > 0
    ? allProjects.filter((p) => p.published).length
    : projects.length;
  const draftProjects = totalProjects - publishedProjects;

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured) {
      alert('Supabase not connected. To delete live records, configure .env credentials.');
      setDeleteConfirmId(null);
      return;
    }

    try {
      setIsDeleting(true);
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      await refreshData();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  const handleTogglePublish = async (project: DbProject) => {
    if (!isSupabaseConfigured) {
      alert('Supabase not connected. To modify live records, configure .env credentials.');
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .update({ published: !project.published })
        .eq('id', project.id);
      if (error) throw error;
      await refreshData();
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-bebas text-3xl sm:text-5xl tracking-wide text-white">
            OVERVIEW <span className="text-[#E50914]">DASHBOARD</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            Manage public portfolio content, media assets, and site settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects/new"
            className="px-4 py-2.5 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>NEW PROJECT</span>
          </Link>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#141414] hover:bg-white/10 border border-white/10 text-white font-mono-code text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
          >
            <span>LIVE WEBSITE</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E50914]" />
          </a>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-mono-code">
        
        {/* Total Projects */}
        <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-xl">
          <div className="flex justify-between items-center text-[#6B6862] text-xs mb-2">
            <span>TOTAL PROJECTS</span>
            <Film className="w-4 h-4 text-[#E50914]" />
          </div>
          <div className="font-bebas text-4xl sm:text-5xl text-white">
            {totalProjects}
          </div>
          <span className="text-[10px] text-[#9E9B93] block mt-1">In portfolio archive</span>
        </div>

        {/* Published Projects */}
        <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-xl">
          <div className="flex justify-between items-center text-[#6B6862] text-xs mb-2">
            <span>PUBLISHED</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-bebas text-4xl sm:text-5xl text-emerald-400">
            {publishedProjects}
          </div>
          <span className="text-[10px] text-[#9E9B93] block mt-1">Live on public website</span>
        </div>

        {/* Draft Projects */}
        <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-xl">
          <div className="flex justify-between items-center text-[#6B6862] text-xs mb-2">
            <span>DRAFT PROJECTS</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-bebas text-4xl sm:text-5xl text-amber-400">
            {draftProjects}
          </div>
          <span className="text-[10px] text-[#9E9B93] block mt-1">Hidden from public</span>
        </div>

        {/* Media Files */}
        <div className="bg-[#0f0f0f] border border-white/10 p-5 rounded-xl">
          <div className="flex justify-between items-center text-[#6B6862] text-xs mb-2">
            <span>STORAGE BUCKETS</span>
            <ImageIcon className="w-4 h-4 text-purple-400" />
          </div>
          <div className="font-bebas text-4xl sm:text-5xl text-purple-400">
            READY
          </div>
          <span className="text-[10px] text-[#9E9B93] block mt-1">Images &amp; 4K Videos</span>
        </div>

      </div>

      {/* Recent Projects Table Section */}
      <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono-code text-xs">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            <span className="text-white font-bold">RECENT PORTFOLIO PROJECTS</span>
          </div>
          <Link
            to="/admin/projects"
            className="text-xs font-mono-code text-[#E50914] hover:underline flex items-center gap-1"
          >
            <span>View All Projects</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono-code text-xs">
            <thead className="bg-[#141414] text-[#6B6862] uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allProjects.slice(0, 6).map((project) => {
                const uiProject = mapDbProjectToProject(project);

                return (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.thumbnail_url}
                          alt={project.title}
                          className="w-12 h-8 rounded object-cover border border-white/10 bg-black"
                        />
                        <div>
                          <span className="font-bebas text-base text-white block tracking-wide">
                            {project.title}
                          </span>
                          <span className="text-[10px] text-[#9E9B93] truncate block max-w-xs">
                            {project.subtitle}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#9E9B93]">
                      <span className="bg-white/5 px-2 py-0.5 rounded text-[10px]">
                        {project.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#6B6862]">{project.year}</td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(project)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          project.published
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                        title="Click to toggle status"
                      >
                        {project.published ? 'PUBLISHED' : 'DRAFT'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setPreviewProject(uiProject)}
                          className="p-1.5 rounded hover:bg-white/10 text-[#9E9B93] hover:text-white transition-colors"
                          title="Preview project in cinema player"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => navigate(`/admin/projects/${project.id}`)}
                          className="p-1.5 rounded hover:bg-white/10 text-[#9E9B93] hover:text-[#E50914] transition-colors"
                          title="Edit project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(project.id)}
                          className="p-1.5 rounded hover:bg-red-500/20 text-[#9E9B93] hover:text-red-400 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick CMS Navigation Hub */}
      <div>
        <div className="flex items-center gap-2 font-mono-code text-xs text-[#6B6862] mb-4 uppercase tracking-wider font-bold">
          <span>QUICK SECTION SHORTCUTS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono-code">
          
          <Link
            to="/admin/profile"
            className="p-4 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-[#E50914] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#E50914]" />
              <div>
                <span className="text-white font-bold block text-xs">Profile &amp; Biography</span>
                <span className="text-[10px] text-[#6B6862]">Editor bio, stats, and socials</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#6B6862] group-hover:text-[#E50914] transition-colors" />
          </Link>

          <Link
            to="/admin/services"
            className="p-4 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-[#E50914] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#E50914]" />
              <div>
                <span className="text-white font-bold block text-xs">Capabilities &amp; Services</span>
                <span className="text-[10px] text-[#6B6862]">Edit 6 core post-production offers</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#6B6862] group-hover:text-[#E50914] transition-colors" />
          </Link>

          <Link
            to="/admin/process"
            className="p-4 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-[#E50914] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#E50914]" />
              <div>
                <span className="text-white font-bold block text-xs">Editing Process Pipeline</span>
                <span className="text-[10px] text-[#6B6862]">5-phase NLE timeline scrubber</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#6B6862] group-hover:text-[#E50914] transition-colors" />
          </Link>

          <Link
            to="/admin/tools"
            className="p-4 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-[#E50914] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-[#E50914]" />
              <div>
                <span className="text-white font-bold block text-xs">Software &amp; Tools Stack</span>
                <span className="text-[10px] text-[#6B6862]">NLEs, shortcuts, and capabilities</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#6B6862] group-hover:text-[#E50914] transition-colors" />
          </Link>

          <Link
            to="/admin/experience"
            className="p-4 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-[#E50914] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-[#E50914]" />
              <div>
                <span className="text-white font-bold block text-xs">Experience &amp; Timeline</span>
                <span className="text-[10px] text-[#6B6862]">Career timeline and key metrics</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#6B6862] group-hover:text-[#E50914] transition-colors" />
          </Link>

          <Link
            to="/admin/settings"
            className="p-4 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-[#E50914] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-[#E50914]" />
              <div>
                <span className="text-white font-bold block text-xs">Global Site Settings</span>
                <span className="text-[10px] text-[#6B6862]">Hero text, showreel URL, SEO</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#6B6862] group-hover:text-[#E50914] transition-colors" />
          </Link>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121212] border border-white/15 p-6 rounded-xl max-w-md w-full font-mono-code text-xs space-y-4">
            <h3 className="font-bebas text-2xl text-white">CONFIRM DELETION</h3>
            <p className="text-[#9E9B93] leading-relaxed">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-bold"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cinema Live Preview Modal (Reusing existing component) */}
      <CinemaModal
        project={previewProject}
        isOpen={Boolean(previewProject)}
        onClose={() => setPreviewProject(null)}
        onOpenContact={() => setPreviewProject(null)}
      />

    </div>
  );
};
