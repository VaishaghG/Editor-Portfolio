import React, { useState, useEffect } from 'react';
import {
  Save,
  Settings,
  Upload,
  Check,
  AlertCircle,
  Film,
  Sparkles,
  Search,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { supabase, isSupabaseConfigured, uploadMediaFile } from '@/lib/supabase';
import { DbSiteSettings } from '@/types/database';

export const SettingsEdit: React.FC = () => {
  const { settings, refreshData } = usePortfolio();
  const [formData, setFormData] = useState<DbSiteSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: boolean }>({});
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DbSiteSettings,
    bucket: 'portfolio-images' | 'portfolio-videos'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress((prev) => ({ ...prev, [field as string]: true }));
    const result = await uploadMediaFile(file, bucket);
    setUploadProgress((prev) => ({ ...prev, [field as string]: false }));

    if (result.url) {
      setFormData((prev) => ({ ...prev, [field]: result.url }));
      setFeedback({ type: 'success', message: 'Asset uploaded successfully!' });
    } else if (result.error) {
      setFeedback({ type: 'error', message: result.error });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      alert('Notice: Supabase credentials not configured in .env.');
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      await refreshData();
      setFeedback({ type: 'success', message: 'Site settings saved successfully!' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Failed to save: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-bebas text-3xl sm:text-5xl tracking-wide text-white">
            GLOBAL <span className="text-[#E50914]">SITE SETTINGS</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            Configure SEO metadata, hero typography, showreel links, and footer manifestos.
          </p>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'SAVING...' : 'SAVE SETTINGS'}</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 font-mono-code text-xs ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {feedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 font-mono-code text-xs">
        
        {/* SEO & Site Metadata */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="border-b border-white/10 pb-2 font-bold text-white uppercase flex items-center gap-2">
            <Search className="w-4 h-4 text-[#E50914]" />
            <span>SEO &amp; DOCUMENT METADATA</span>
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PAGE TITLE (&lt;TITLE&gt;)</label>
            <input
              type="text"
              value={formData.site_title || ''}
              onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">META DESCRIPTION</label>
            <textarea
              rows={2}
              value={formData.site_description || ''}
              onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none resize-none"
            />
          </div>
        </div>

        {/* Hero Section Copy & Heading Typography */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="border-b border-white/10 pb-2 font-bold text-white uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E50914]" />
            <span>HERO STAGE COPY &amp; MANIFESTO</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">TOP HUD TAGLINE</label>
              <input
                type="text"
                value={formData.hero_tagline || ''}
                onChange={(e) => setFormData({ ...formData, hero_tagline: e.target.value })}
                placeholder="[ 2026 REEL ] POST-PRODUCTION • MOTION • COLOR"
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">AVAILABILITY BADGE TEXT</label>
              <input
                type="text"
                value={formData.hero_badge_text || ''}
                onChange={(e) => setFormData({ ...formData, hero_badge_text: e.target.value })}
                placeholder="AVAILABLE FOR HIRE"
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>
          </div>

          {/* Heading Lines */}
          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1.5">
              GIANT CONDENSED HERO HEADLINE LINES
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[9px] text-[#6B6862] block mb-1">LINE 1</span>
                <input
                  type="text"
                  value={formData.hero_heading_line1 || 'I CUT'}
                  onChange={(e) => setFormData({ ...formData, hero_heading_line1: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white font-bebas text-xl"
                />
              </div>

              <div>
                <span className="text-[9px] text-[#6B6862] block mb-1">LINE 2</span>
                <input
                  type="text"
                  value={formData.hero_heading_line2 || 'MOMENTS'}
                  onChange={(e) => setFormData({ ...formData, hero_heading_line2: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white font-bebas text-xl"
                />
              </div>

              <div>
                <span className="text-[9px] text-[#6B6862] block mb-1">LINE 3</span>
                <input
                  type="text"
                  value={formData.hero_heading_line3 || 'INTO'}
                  onChange={(e) => setFormData({ ...formData, hero_heading_line3: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white font-bebas text-xl text-[#E50914]"
                />
              </div>

              <div>
                <span className="text-[9px] text-[#6B6862] block mb-1">LINE 4</span>
                <input
                  type="text"
                  value={formData.hero_heading_line4 || 'STORIES.'}
                  onChange={(e) => setFormData({ ...formData, hero_heading_line4: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 rounded p-2 text-white font-bebas text-xl"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">HERO EDITORIAL MANIFESTO</label>
            <textarea
              rows={2}
              value={formData.hero_manifesto || ''}
              onChange={(e) => setFormData({ ...formData, hero_manifesto: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">HERO CTA BUTTON TEXT</label>
            <input
              type="text"
              value={formData.hero_cta_text || 'WATCH 2026 SHOWREEL'}
              onChange={(e) => setFormData({ ...formData, hero_cta_text: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 rounded p-2.5 text-white outline-none"
            />
          </div>
        </div>

        {/* Hero Showreel Video Media Assets */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="border-b border-white/10 pb-2 font-bold text-white uppercase flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-[#E50914]" />
              <span>HERO SHOWREEL &amp; MEDIA ASSETS</span>
            </div>
            <span className="text-[10px] text-[#9E9B93] font-normal font-mono-code">One-click presets below</span>
          </div>

          {/* Quick Presets Bar */}
          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-2 font-bold">
              CINEMATIC HIGH-ENERGY PRESETS (CLICK TO APPLY)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  hero_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-neon-lights-42997-large.mp4',
                  hero_poster_url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
                  showreel_url: 'https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-neon-lights-42997-large.mp4',
                })}
                className="p-2 bg-[#161616] hover:bg-[#E50914]/20 border border-white/10 hover:border-[#E50914] rounded text-left transition-all cursor-pointer group"
              >
                <span className="text-white group-hover:text-[#E50914] font-bold block text-[11px]">⚡ SPEED DRIFT</span>
                <span className="text-[#6B6862] text-[9px] block">High Contrast Neon</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  hero_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4',
                  hero_poster_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
                  showreel_url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4',
                })}
                className="p-2 bg-[#161616] hover:bg-[#E50914]/20 border border-white/10 hover:border-[#E50914] rounded text-left transition-all cursor-pointer group"
              >
                <span className="text-white group-hover:text-[#E50914] font-bold block text-[11px]">🏙️ CYBER METROPOLIS</span>
                <span className="text-[#6B6862] text-[9px] block">4K Anamorphic City</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  hero_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-mesh-42999-large.mp4',
                  hero_poster_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                  showreel_url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-mesh-42999-large.mp4',
                })}
                className="p-2 bg-[#161616] hover:bg-[#E50914]/20 border border-white/10 hover:border-[#E50914] rounded text-left transition-all cursor-pointer group"
              >
                <span className="text-white group-hover:text-[#E50914] font-bold block text-[11px]">🔮 KINETIC MOTION</span>
                <span className="text-[#6B6862] text-[9px] block">3D VFX & Typography</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  hero_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-at-a-club-41484-large.mp4',
                  hero_poster_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
                  showreel_url: 'https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-at-a-club-41484-large.mp4',
                })}
                className="p-2 bg-[#161616] hover:bg-[#E50914]/20 border border-white/10 hover:border-[#E50914] rounded text-left transition-all cursor-pointer group"
              >
                <span className="text-white group-hover:text-[#E50914] font-bold block text-[11px]">🎆 CONCERT RECAP</span>
                <span className="text-[#6B6862] text-[9px] block">Live Lasers & Drops</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">HERO BACKGROUND VIDEO URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.hero_video_url || ''}
                onChange={(e) => setFormData({ ...formData, hero_video_url: e.target.value })}
                className="flex-1 bg-[#161616] border border-white/10 rounded p-2.5 text-white outline-none"
              />
              <label className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer flex items-center gap-1.5 shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadProgress['hero_video_url'] ? 'Uploading...' : 'Upload Video'}</span>
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'hero_video_url', 'portfolio-videos')}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">HERO POSTER FRAME IMAGE URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.hero_poster_url || ''}
                onChange={(e) => setFormData({ ...formData, hero_poster_url: e.target.value })}
                className="flex-1 bg-[#161616] border border-white/10 rounded p-2.5 text-white outline-none"
              />
              <label className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer flex items-center gap-1.5 shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadProgress['hero_poster_url'] ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'hero_poster_url', 'portfolio-images')}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">FULL CINEMA SHOWREEL STREAM URL</label>
            <input
              type="text"
              value={formData.showreel_url || ''}
              onChange={(e) => setFormData({ ...formData, showreel_url: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 rounded p-2.5 text-white outline-none"
            />
          </div>
        </div>

        {/* Footer Manifesto */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="border-b border-white/10 pb-2 font-bold text-white uppercase">
            FOOTER BRANDING
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">FOOTER HEADLINE</label>
            <input
              type="text"
              value={formData.footer_headline || 'VAISHAGH G.'}
              onChange={(e) => setFormData({ ...formData, footer_headline: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 rounded p-2.5 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">FOOTER MANIFESTO</label>
            <textarea
              rows={2}
              value={formData.footer_manifesto || ''}
              onChange={(e) => setFormData({ ...formData, footer_manifesto: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 rounded p-2.5 text-white outline-none resize-none"
            />
          </div>
        </div>

      </form>
    </div>
  );
};
