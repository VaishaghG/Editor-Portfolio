import React, { useState, useEffect } from 'react';
import {
  Save,
  User,
  Upload,
  Check,
  AlertCircle,
  Plus,
  X,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '@/components/common/Icons';
import { usePortfolio } from '@/context/PortfolioContext';
import { supabase, isSupabaseConfigured, uploadMediaFile } from '@/lib/supabase';
import { DbProfile } from '@/types/database';

export const ProfileEdit: React.FC = () => {
  const { profile, refreshData } = usePortfolio();
  const [formData, setFormData] = useState<DbProfile>(profile);
  const [newSpec, setNewSpec] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        specializations: Array.isArray(profile.specializations) ? profile.specializations : [],
      });
    }
  }, [profile]);

  const handleAddSpec = () => {
    if (!newSpec.trim()) return;
    const current = formData.specializations || [];
    if (!current.includes(newSpec.trim())) {
      setFormData({ ...formData, specializations: [...current, newSpec.trim()] });
    }
    setNewSpec('');
  };

  const handleRemoveSpec = (spec: string) => {
    setFormData({
      ...formData,
      specializations: (formData.specializations || []).filter((s) => s !== spec),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const res = await uploadMediaFile(file, 'portfolio-images');
    setIsUploading(false);

    if (res.url) {
      setFormData((prev) => ({ ...prev, profile_image_url: res.url }));
      setFeedback({ type: 'success', message: 'Profile image uploaded!' });
    } else if (res.error) {
      setFeedback({ type: 'error', message: res.error });
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
      // Upsert profile record
      const { error } = await supabase
        .from('profile')
        .upsert({
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      await refreshData();
      setFeedback({ type: 'success', message: 'Profile changes saved successfully!' });
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
            PROFILE &amp; <span className="text-[#E50914]">BIOGRAPHY</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            Manage editor manifesto, portrait photo, contact details, and social links.
          </p>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'SAVING...' : 'SAVE CHANGES'}</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 font-mono-code text-xs ${feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}
        >
          {feedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 font-mono-code text-xs">

        {/* Editor Identification & Portrait */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="border-b border-white/10 pb-2 font-bold text-white uppercase flex items-center gap-2">
            <User className="w-4 h-4 text-[#E50914]" />
            <span>EDITOR IDENTITY &amp; PORTRAIT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">

            {/* Portrait Preview & Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-36 h-44 rounded-xl overflow-hidden border border-white/15 bg-black relative group shadow-xl">
                <img
                  src={formData.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'}
                  alt="Profile Preview"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>

              <label className="px-3.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer flex items-center gap-1.5 text-[11px]">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading...' : 'Change Photo'}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>

            {/* Identity Fields */}
            <div className="sm:col-span-2 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">FULL NAME</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">EDITOR ID STAMP</label>
                  <input
                    type="text"
                    value={formData.editor_id || ''}
                    onChange={(e) => setFormData({ ...formData, editor_id: e.target.value })}
                    placeholder="VG-2026"
                    className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PROFESSIONAL TITLE</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">ROLE SUBTITLE</label>
                <input
                  type="text"
                  value={formData.role_subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, role_subtitle: e.target.value })}
                  placeholder="POST-PRODUCTION LEAD"
                  className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Biography & Editorial Manifesto */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="border-b border-white/10 pb-2 font-bold text-white uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E50914]" />
            <span>EDITORIAL MANIFESTO &amp; BIOGRAPHY</span>
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PHILOSOPHY QUOTE</label>
            <input
              type="text"
              value={formData.philosophy_quote || ''}
              onChange={(e) => setFormData({ ...formData, philosophy_quote: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PRIMARY BIOGRAPHY (PARAGRAPH 1)</label>
            <textarea
              rows={3}
              value={formData.short_bio || ''}
              onChange={(e) => setFormData({ ...formData, short_bio: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">EXTENDED BIOGRAPHY (PARAGRAPH 2)</label>
            <textarea
              rows={3}
              value={formData.long_bio || ''}
              onChange={(e) => setFormData({ ...formData, long_bio: e.target.value })}
              className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none resize-none"
            />
          </div>

          {/* Specialization tags */}
          <div>
            <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">AREAS OF SPECIALIZATION</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSpec}
                onChange={(e) => setNewSpec(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSpec();
                  }
                }}
                placeholder="e.g. Commercial Brand Films &amp; Product Spots"
                className="flex-1 bg-[#161616] border border-white/10 rounded p-2 text-white outline-none"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="space-y-1.5">
              {(formData.specializations || []).map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-[#161616] border border-white/5 text-white"
                >
                  <span>{spec}</span>
                  <X
                    className="w-3.5 h-3.5 text-[#6B6862] hover:text-red-400 cursor-pointer"
                    onClick={() => handleRemoveSpec(spec)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location, Availability & Channels */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="border-b border-white/10 pb-2 font-bold text-white uppercase flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#E50914]" />
            <span>LOCATION &amp; CONTACT CHANNELS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">LOCATION BADGE</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="INDIA (IST / REMOTE)"
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">AVAILABILITY STATUS</label>
              <input
                type="text"
                value={formData.availability || ''}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                placeholder="AVAILABLE WORLDWIDE"
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1 flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#E50914]" /> EMAIL
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#E50914]" /> PHONE / WHATSAPP
              </label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1 flex items-center gap-1">
                <InstagramIcon className="w-3 h-3 text-[#E50914]" /> INSTAGRAM URL
              </label>
              <input
                type="text"
                value={formData.instagram_url || ''}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1 flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3 text-[#E50914]" /> LINKEDIN URL
              </label>
              <input
                type="text"
                value={formData.linkedin_url || ''}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 text-white outline-none"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
