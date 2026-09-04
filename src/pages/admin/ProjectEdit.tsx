import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Trash2,
  Eye,
  Upload,
  Film,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Plus,
  X,
} from 'lucide-react';
import { usePortfolio, mapDbProjectToProject } from '@/context/PortfolioContext';
import { supabase, isSupabaseConfigured, uploadMediaFile } from '@/lib/supabase';
import { CinemaModal } from '@/components/common/CinemaModal';
import { DbProject } from '@/types/database';
import { Project } from '@/data/projects';

export const ProjectEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const { allProjects, refreshData } = usePortfolio();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<DbProject>>({
    number: '01',
    title: '',
    slug: '',
    subtitle: '',
    category: 'COMMERCIAL EDIT',
    year: '2026',
    client: 'SELECTED CLIENTS',
    role: 'Lead Editor / Motion Designer',
    aspect_ratio: '16:9',
    duration: '01:00',
    fps: '24.00 fps',
    software: ['Premiere Pro', 'After Effects'],
    short_description: '',
    description: '',
    deliverables: ['Master 4K Edit', 'Social 9:16 Cuts'],
    metrics: '',
    video_url: '',
    thumbnail_url: '',
    poster_url: '',
    project_url: '',
    color_grade: 'Kodak 2383 Film Print Emulation',
    sort_order: allProjects.length + 1,
    featured: true,
    published: true,
  });

  const [newSoftware, setNewSoftware] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: boolean }>({});
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load existing project if editing
  useEffect(() => {
    if (!isNew && id) {
      const existing = allProjects.find((p) => p.id === id || p.slug === id);
      if (existing) {
        setFormData({
          ...existing,
          software: Array.isArray(existing.software) ? existing.software : [],
          deliverables: Array.isArray(existing.deliverables) ? existing.deliverables : [],
        });
      }
    }
  }, [id, isNew, allProjects]);

  // Auto-generate slug from title if new
  const handleTitleChange = (val: string) => {
    const updates: Partial<DbProject> = { title: val };
    if (isNew) {
      updates.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleAddSoftware = () => {
    if (!newSoftware.trim()) return;
    const current = formData.software || [];
    if (!current.includes(newSoftware.trim())) {
      setFormData({ ...formData, software: [...current, newSoftware.trim()] });
    }
    setNewSoftware('');
  };

  const handleRemoveSoftware = (item: string) => {
    setFormData({
      ...formData,
      software: (formData.software || []).filter((s) => s !== item),
    });
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    const current = formData.deliverables || [];
    if (!current.includes(newDeliverable.trim())) {
      setFormData({ ...formData, deliverables: [...current, newDeliverable.trim()] });
    }
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (item: string) => {
    setFormData({
      ...formData,
      deliverables: (formData.deliverables || []).filter((d) => d !== item),
    });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'thumbnail_url' | 'video_url' | 'poster_url',
    bucket: 'portfolio-images' | 'portfolio-videos'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size warning
    if (bucket === 'portfolio-videos' && file.size > 50 * 1024 * 1024) {
      if (!confirm(`Warning: Video file is large (${(file.size / (1024 * 1024)).toFixed(1)}MB). For optimal web streaming, under 25MB is recommended. Continue?`)) {
        return;
      }
    }

    setUploadProgress((prev) => ({ ...prev, [field]: true }));
    const result = await uploadMediaFile(file, bucket);
    setUploadProgress((prev) => ({ ...prev, [field]: false }));

    if (result.error) {
      setFeedback({ type: 'error', message: `Upload failed: ${result.error}` });
    } else {
      setFormData((prev) => ({ ...prev, [field]: result.url }));
      setFeedback({ type: 'success', message: 'File uploaded successfully!' });
    }
  };

  const handleSave = async (publishStatus?: boolean) => {
    if (!formData.title || !formData.slug) {
      setFeedback({ type: 'error', message: 'Project Title and Slug are required.' });
      return;
    }

    if (!isSupabaseConfigured) {
      alert('Notice: Supabase credentials not set in .env. Live saving requires Supabase configuration.');
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const payload: Partial<DbProject> = {
      ...formData,
      published: publishStatus !== undefined ? publishStatus : formData.published,
      updated_at: new Date().toISOString(),
    };

    try {
      if (isNew) {
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) throw error;
        setFeedback({ type: 'success', message: 'Project created successfully!' });
      } else {
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', id);
        if (error) throw error;
        setFeedback({ type: 'success', message: 'Project updated successfully!' });
      }

      await refreshData();
      setTimeout(() => {
        navigate('/admin/projects');
      }, 1000);
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Save failed: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || isNew) return;
    if (!isSupabaseConfigured) {
      alert('Supabase not connected.');
      return;
    }

    try {
      setIsSaving(true);
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      await refreshData();
      navigate('/admin/projects');
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Delete failed: ${err.message}` });
    } finally {
      setIsSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleOpenLivePreview = () => {
    const previewData = mapDbProjectToProject({
      ...formData,
      id: formData.id || 'preview-id',
      number: formData.number || '01',
      title: formData.title || 'PREVIEW TITLE',
      slug: formData.slug || 'preview-slug',
      subtitle: formData.subtitle || '',
      category: formData.category || 'COMMERCIAL',
      year: formData.year || '2026',
      client: formData.client || 'CLIENT',
      role: formData.role || 'Lead Editor',
      aspect_ratio: formData.aspect_ratio || '16:9',
      duration: formData.duration || '01:00',
      fps: formData.fps || '24 fps',
      software: formData.software || [],
      short_description: formData.short_description || '',
      description: formData.description || '',
      deliverables: formData.deliverables || [],
      video_url: formData.video_url || '',
      thumbnail_url: formData.thumbnail_url || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
      color_grade: formData.color_grade || 'Kodak 2383',
      sort_order: formData.sort_order || 1,
      featured: formData.featured ?? true,
      published: formData.published ?? true,
    });

    setPreviewProject(previewData);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="p-2 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-bebas text-3xl sm:text-4xl tracking-wide text-white">
              {isNew ? 'CREATE NEW PROJECT' : `EDIT: ${formData.title || 'PROJECT'}`}
            </h1>
            <span className="font-mono-code text-[11px] text-[#9E9B93]">
              {isNew ? 'Add a new showcase cut' : `SLUG: /${formData.slug}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleOpenLivePreview}
            className="px-3.5 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-mono-code text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>PREVIEW</span>
          </button>

          {!isNew && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3.5 py-2 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 font-mono-code text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>DELETE</span>
            </button>
          )}

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave(false)}
            className="px-4 py-2 rounded bg-[#161616] hover:bg-white/10 border border-white/10 text-white font-mono-code text-xs uppercase cursor-pointer"
          >
            SAVE DRAFT
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave(true)}
            className="px-5 py-2 rounded bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'SAVING...' : 'PUBLISH / UPDATE'}</span>
          </button>
        </div>
      </div>

      {/* Notification banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 font-mono-code text-xs ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {feedback.type === 'success' ? (
            <Check className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Project Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-code text-xs">
        
        {/* Left Column: Core Metadata & Descriptions (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Info Card */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
            <div className="border-b border-white/10 pb-2 font-bold text-white uppercase flex items-center justify-between">
              <span>PROJECT ESSENTIALS</span>
              <span className="text-[#E50914] text-[10px]">REQUIRED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PROJECT TITLE</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. COMMERCIAL CUT"
                  className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">URL SLUG</label>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="neo-visions-showreel"
                  className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">EDITORIAL SUBTITLE</label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="SHOWREEL 2026 // COMMERCIAL & SHORT-FORM"
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">CATEGORY</label>
                <select
                  value={formData.category || 'COMMERCIAL EDIT'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                >
                  <option value="SHOWREEL / BRAND">SHOWREEL / BRAND</option>
                  <option value="COMMERCIAL EDIT">COMMERCIAL EDIT</option>
                  <option value="MOTION GRAPHICS">MOTION GRAPHICS</option>
                  <option value="NARRATIVE / SHORT">NARRATIVE / SHORT</option>
                  <option value="INSTAGRAM / SHORT FORM">INSTAGRAM / SHORT FORM</option>
                  <option value="MUSIC / EVENT">MUSIC / EVENT</option>
                </select>
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">YEAR</label>
                <input
                  type="text"
                  value={formData.year || '2026'}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">NUMBER STAMP</label>
                <input
                  type="text"
                  value={formData.number || '01'}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="01"
                  className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">CLIENT NAME</label>
                <input
                  type="text"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="SELECTED CLIENTS"
                  className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">EDITOR ROLE</label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Lead Editor / Colorist"
                  className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">SHORT SUMMARY (CARD VIEW)</label>
              <textarea
                rows={2}
                value={formData.short_description || ''}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Punchy 1-2 sentence description for grid cards..."
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">FULL CASE STUDY DESCRIPTION</label>
              <textarea
                rows={4}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Comprehensive breakdown of pacing, editing decisions, and story..."
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none resize-none"
              />
            </div>

          </div>

          {/* Media Links & Uploads */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
            <div className="border-b border-white/10 pb-2 font-bold text-white uppercase flex items-center justify-between">
              <span>MEDIA &amp; VIDEO ASSETS</span>
              <Film className="w-4 h-4 text-[#E50914]" />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">THUMBNAIL IMAGE URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.thumbnail_url || ''}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
                <label className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadProgress['thumbnail_url'] ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'thumbnail_url', 'portfolio-images')}
                  />
                </label>
              </div>
              {formData.thumbnail_url && (
                <div className="mt-2 w-32 h-20 rounded border border-white/10 overflow-hidden bg-black">
                  <img src={formData.thumbnail_url} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">VIDEO STREAM URL (MP4 / WebM)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.video_url || ''}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="Supabase storage video URL or direct video MP4"
                  className="flex-1 bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
                <label className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadProgress['video_url'] ? 'Uploading...' : 'Upload Video'}</span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'video_url', 'portfolio-videos')}
                  />
                </label>
              </div>
            </div>

            {/* Poster URL */}
            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">POSTER IMAGE URL (OPTIONAL)</label>
              <input
                type="text"
                value={formData.poster_url || ''}
                onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
                placeholder="Optional fallback poster frame URL"
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>
          </div>

          {/* Software & Deliverables Tags */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
            <div className="border-b border-white/10 pb-2 font-bold text-white uppercase">
              TECHNICAL TAGS &amp; DELIVERABLES
            </div>

            {/* Software Tag Builder */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[#9E9B93] uppercase text-[10px]">SOFTWARE TOOLS</label>
                <span className="text-[10px] text-[#6B6862]">ALLOWED: PREMIERE PRO, AFTER EFFECTS, LIGHTROOM</span>
              </div>

              {/* Quick Select Buttons */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Lightroom'].map((toolName) => {
                  const isAdded = (formData.software || []).includes(toolName);
                  return (
                    <button
                      key={toolName}
                      type="button"
                      onClick={() => {
                        if (isAdded) {
                          handleRemoveSoftware(toolName);
                        } else {
                          setFormData({
                            ...formData,
                            software: [...(formData.software || []), toolName],
                          });
                        }
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono-code transition-colors cursor-pointer border ${
                        isAdded
                          ? 'bg-[#E50914] text-white border-[#E50914]'
                          : 'bg-white/5 text-[#9E9B93] border-white/10 hover:text-white'
                      }`}
                    >
                      {isAdded ? `✓ ${toolName}` : `+ ${toolName}`}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSoftware}
                  onChange={(e) => setNewSoftware(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSoftware();
                    }
                  }}
                  placeholder="e.g. Adobe Premiere Pro"
                  className="flex-1 bg-[#161616] border border-white/10 rounded p-2 text-white outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSoftware}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(formData.software || []).map((sw, idx) => (
                  <span
                    key={idx}
                    className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-white flex items-center gap-1.5"
                  >
                    <span>{sw}</span>
                    <X
                      className="w-3 h-3 hover:text-red-400 cursor-pointer"
                      onClick={() => handleRemoveSoftware(sw)}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables Tag Builder */}
            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">DELIVERABLES</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDeliverable();
                    }
                  }}
                  placeholder="e.g. 4K Master ProRes / 9:16 Cuts"
                  className="flex-1 bg-[#161616] border border-white/10 rounded p-2 text-white outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(formData.deliverables || []).map((del, idx) => (
                  <span
                    key={idx}
                    className="bg-[#181818] border border-white/10 px-2.5 py-1 rounded text-white flex items-center gap-1.5"
                  >
                    <span>{del}</span>
                    <X
                      className="w-3 h-3 hover:text-red-400 cursor-pointer"
                      onClick={() => handleRemoveDeliverable(del)}
                    />
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Specifications & Publishing Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status Card */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
            <div className="border-b border-white/10 pb-2 font-bold text-white uppercase">
              PUBLISHING STATUS
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-2.5 rounded bg-[#161616] border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.published)}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 accent-[#E50914]"
                />
                <div>
                  <span className="text-white font-bold block">Published</span>
                  <span className="text-[10px] text-[#9E9B93]">Visible on public portfolio</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-2.5 rounded bg-[#161616] border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.featured)}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#E50914]"
                />
                <div>
                  <span className="text-white font-bold block">Featured Piece</span>
                  <span className="text-[10px] text-[#9E9B93]">Showcase in pinned reel section</span>
                </div>
              </label>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">SORT ORDER</label>
                <input
                  type="number"
                  value={formData.sort_order ?? 1}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Technical Specs Card */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
            <div className="border-b border-white/10 pb-2 font-bold text-white uppercase">
              TECHNICAL HUD SPECS
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">ASPECT RATIO</label>
              <input
                type="text"
                value={formData.aspect_ratio || '16:9'}
                onChange={(e) => setFormData({ ...formData, aspect_ratio: e.target.value })}
                placeholder="16:9 or 9:16 or 2.39:1"
                className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">TIMELINE DURATION</label>
              <input
                type="text"
                value={formData.duration || '01:00'}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="01:24"
                className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">FRAME RATE (FPS)</label>
              <input
                type="text"
                value={formData.fps || '23.976 fps'}
                onChange={(e) => setFormData({ ...formData, fps: e.target.value })}
                placeholder="23.976 fps or 59.94 fps"
                className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">COLOR GRADE PROFILE</label>
              <input
                type="text"
                value={formData.color_grade || 'Kodak 2383'}
                onChange={(e) => setFormData({ ...formData, color_grade: e.target.value })}
                placeholder="Kodak 2383 / Cyber Cyan"
                className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">IMPACT METRIC BADGE (OPTIONAL)</label>
              <input
                type="text"
                value={formData.metrics || ''}
                onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                placeholder="2.4M+ Views / Winner Indie Fest"
                className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white outline-none"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121212] border border-white/15 p-6 rounded-xl max-w-md w-full font-mono-code text-xs space-y-4">
            <h3 className="font-bebas text-2xl text-white">CONFIRM DELETION</h3>
            <p className="text-[#9E9B93] leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white">{formData.title}</strong>?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded bg-white/10 text-white font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                {isSaving ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cinema Modal Live Preview */}
      <CinemaModal
        project={previewProject}
        isOpen={Boolean(previewProject)}
        onClose={() => setPreviewProject(null)}
        onOpenContact={() => setPreviewProject(null)}
      />

    </div>
  );
};
