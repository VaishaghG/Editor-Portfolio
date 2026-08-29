import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  ArrowUp,
  ArrowDown,
  Edit3,
  Trash2,
  Eye,
  Star,
  StarOff,
  Filter,
} from 'lucide-react';
import { usePortfolio, mapDbProjectToProject } from '@/context/PortfolioContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CinemaModal } from '@/components/common/CinemaModal';
import { Project } from '@/data/projects';
import { DbProject } from '@/types/database';

export const ProjectsList: React.FC = () => {
  const { allProjects, refreshData } = usePortfolio();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter projects
  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || p.category.includes(selectedCategory);

    const matchesStatus =
      selectedStatus === 'ALL' ||
      (selectedStatus === 'PUBLISHED' && p.published) ||
      (selectedStatus === 'DRAFT' && !p.published) ||
      (selectedStatus === 'FEATURED' && p.featured);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleTogglePublish = async (project: DbProject) => {
    if (!isSupabaseConfigured) {
      alert('Supabase not connected. To save updates, configure .env credentials.');
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

  const handleToggleFeatured = async (project: DbProject) => {
    if (!isSupabaseConfigured) {
      alert('Supabase not connected. To save updates, configure .env credentials.');
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .update({ featured: !project.featured })
        .eq('id', project.id);
      if (error) throw error;
      await refreshData();
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    if (!isSupabaseConfigured) {
      alert('Supabase not connected. To save order changes, configure .env credentials.');
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allProjects.length) return;

    const currentProject = allProjects[index];
    const targetProject = allProjects[targetIndex];

    try {
      setIsProcessing(true);
      // Swap sort_order
      await supabase
        .from('projects')
        .update({ sort_order: targetProject.sort_order })
        .eq('id', currentProject.id);

      await supabase
        .from('projects')
        .update({ sort_order: currentProject.sort_order })
        .eq('id', targetProject.id);

      await refreshData();
    } catch (err: any) {
      alert(`Reorder failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured) {
      alert('Supabase not connected. To delete live records, configure .env credentials.');
      setDeleteConfirmId(null);
      return;
    }

    try {
      setIsProcessing(true);
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      await refreshData();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-bebas text-3xl sm:text-5xl tracking-wide text-white">
            PROJECTS <span className="text-[#E50914]">CATALOG</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            Create, edit, reorder, and publish portfolio showreel pieces.
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PROJECT</span>
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 font-mono-code text-xs">
        
        {/* Search Bar */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6862]" />
          <input
            type="text"
            placeholder="Search projects by title, category, client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 focus:border-[#E50914] rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-white/20 outline-none transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 focus:border-[#E50914] rounded-lg py-2.5 px-3 text-white outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="SHOWREEL">Showreel</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="MOTION">Motion Graphics</option>
            <option value="SHORT">Short-Form</option>
            <option value="NARRATIVE">Narrative</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 focus:border-[#E50914] rounded-lg py-2.5 px-3 text-white outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Drafts Only</option>
            <option value="FEATURED">Featured Only</option>
          </select>
        </div>

      </div>

      {/* Projects List Table */}
      <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono-code text-xs">
            <thead className="bg-[#141414] text-[#6B6862] uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Reorder</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#6B6862]">
                    No projects found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project, index) => {
                  const uiProject = mapDbProjectToProject(project);

                  return (
                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                      
                      {/* Number */}
                      <td className="py-3.5 px-4 text-center text-[#E50914] font-bold">
                        {project.number || `0${index + 1}`}
                      </td>

                      {/* Project title + thumb */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            className="w-14 h-9 rounded object-cover border border-white/10 bg-black shrink-0"
                          />
                          <div>
                            <span className="font-bebas text-lg text-white block tracking-wide">
                              {project.title}
                            </span>
                            <span className="text-[10px] text-[#9E9B93] truncate block max-w-xs">
                              {project.subtitle}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-[#9E9B93]">
                        <span className="bg-white/5 px-2 py-0.5 rounded text-[10px]">
                          {project.category}
                        </span>
                      </td>

                      {/* Featured */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(project)}
                          className={`p-1.5 rounded transition-colors ${
                            project.featured
                              ? 'text-amber-400 hover:text-white'
                              : 'text-[#6B6862] hover:text-amber-400'
                          }`}
                          title="Toggle featured status"
                        >
                          {project.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                        </button>
                      </td>

                      {/* Published Status */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleTogglePublish(project)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            project.published
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {project.published ? 'PUBLISHED' : 'DRAFT'}
                        </button>
                      </td>

                      {/* Move Up / Down */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1">
                          <button
                            disabled={index === 0 || isProcessing}
                            onClick={() => handleMoveOrder(index, 'up')}
                            className="p-1 rounded hover:bg-white/10 text-[#9E9B93] disabled:opacity-20 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={index === filteredProjects.length - 1 || isProcessing}
                            onClick={() => handleMoveOrder(index, 'down')}
                            className="p-1 rounded hover:bg-white/10 text-[#9E9B93] disabled:opacity-20 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setPreviewProject(uiProject)}
                            className="p-1.5 rounded hover:bg-white/10 text-[#9E9B93] hover:text-white"
                            title="Live Cinema Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => navigate(`/admin/projects/${project.id}`)}
                            className="p-1.5 rounded hover:bg-white/10 text-[#9E9B93] hover:text-[#E50914]"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(project.id)}
                            className="p-1.5 rounded hover:bg-red-500/20 text-[#9E9B93] hover:text-red-400"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121212] border border-white/15 p-6 rounded-xl max-w-md w-full font-mono-code text-xs space-y-4">
            <h3 className="font-bebas text-2xl text-white">CONFIRM DELETION</h3>
            <p className="text-[#9E9B93] leading-relaxed">
              Are you sure you want to delete this project? This will remove it from your live showcase.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-bold"
              >
                Cancel
              </button>
              <button
                disabled={isProcessing}
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2"
              >
                {isProcessing ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <CinemaModal
        project={previewProject}
        isOpen={Boolean(previewProject)}
        onClose={() => setPreviewProject(null)}
        onOpenContact={() => setPreviewProject(null)}
      />

    </div>
  );
};
