import React, { useState, useEffect } from 'react';
import {
  Plus,
  Save,
  Trash2,
  Edit3,
  Check,
  AlertCircle,
  Layers,
  ArrowUp,
  ArrowDown,
  X,
  Upload,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { supabase, isSupabaseConfigured, uploadMediaFile } from '@/lib/supabase';
import { DbService } from '@/types/database';

export const ServicesEdit: React.FC = () => {
  const { allServices, services, refreshData } = usePortfolio();
  const [items, setItems] = useState<DbService[]>([]);
  const [editingItem, setEditingItem] = useState<Partial<DbService> | null>(null);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [newSoftware, setNewSoftware] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (allServices.length > 0) {
      setItems(allServices);
    } else {
      // Map from default services
      setItems(
        services.map((s, idx) => ({
          id: `srv-${idx + 1}`,
          number: s.number,
          title: s.title,
          tagline: s.tagline,
          description: s.description,
          deliverables: s.deliverables,
          software: s.software,
          preview_image: s.previewImage,
          turnaround: s.turnaround,
          ideal_for: s.idealFor,
          sort_order: idx + 1,
          published: true,
        }))
      );
    }
  }, [allServices, services]);

  const handleOpenNew = () => {
    setEditingItem({
      number: `0${items.length + 1}`,
      title: '',
      tagline: '',
      description: '',
      deliverables: ['4K Master Delivery'],
      software: ['Adobe Premiere Pro'],
      preview_image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      turnaround: '3–5 Business Days',
      ideal_for: 'Commercial brands & creators',
      sort_order: items.length + 1,
      published: true,
    });
  };

  const handleSaveModal = async () => {
    if (!editingItem?.title) {
      setFeedback({ type: 'error', message: 'Service title is required.' });
      return;
    }

    if (!isSupabaseConfigured) {
      alert('Notice: Supabase credentials not set in .env.');
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      if (editingItem.id && !editingItem.id.startsWith('srv-')) {
        const { error } = await supabase
          .from('services')
          .update({
            ...editingItem,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { id, ...newPayload } = editingItem;
        const { error } = await supabase.from('services').insert([newPayload]);
        if (error) throw error;
      }

      await refreshData();
      setFeedback({ type: 'success', message: 'Service saved successfully!' });
      setEditingItem(null);
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Save failed: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured) {
      setItems((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirmId(null);
      return;
    }

    try {
      if (id.startsWith('srv-')) {
        const itemToDelete = items.find((s) => s.id === id);
        if (itemToDelete?.number) {
          await supabase.from('services').delete().eq('number', itemToDelete.number);
        }
        setItems((prev) => prev.filter((s) => s.id !== id));
      } else {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) throw error;
      }
      await refreshData();
      setFeedback({ type: 'success', message: 'Service deleted successfully.' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Delete failed: ${err.message}` });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const serviceToDelete = items.find((s) => s.id === deleteConfirmId);

  const handleTogglePublish = async (item: DbService) => {
    if (!isSupabaseConfigured) return;

    try {
      await supabase
        .from('services')
        .update({ published: !item.published })
        .eq('id', item.id);
      await refreshData();
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-bebas text-3xl sm:text-5xl tracking-wide text-white">
            SERVICES &amp; <span className="text-[#E50914]">CAPABILITIES</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            Manage your 6 core editing offers, turnaround times, software stacks, and previews.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW SERVICE</span>
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

      {/* Services List Table */}
      <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono-code text-xs">
            <thead className="bg-[#141414] text-[#6B6862] uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Turnaround</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((srv) => (
                <tr key={srv.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 text-center text-[#E50914] font-bold">
                    {srv.number}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={srv.preview_image}
                        alt={srv.title}
                        className="w-12 h-8 rounded object-cover border border-white/10 bg-black shrink-0"
                      />
                      <div>
                        <span className="font-bebas text-base text-white block tracking-wide">
                          {srv.title}
                        </span>
                        <span className="text-[10px] text-[#9E9B93] truncate block max-w-sm">
                          {srv.tagline}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#9E9B93]">{srv.turnaround}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleTogglePublish(srv)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                        srv.published
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {srv.published ? 'PUBLISHED' : 'DRAFT'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingItem(srv)}
                        className="p-1.5 rounded hover:bg-white/10 text-[#9E9B93] hover:text-[#E50914]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(srv.id)}
                        className="p-1.5 rounded hover:bg-red-500/20 text-[#9E9B93] hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#121212] border border-white/15 p-6 rounded-2xl max-w-2xl w-full font-mono-code text-xs space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bebas text-2xl text-white">
                {editingItem.id ? 'EDIT SERVICE' : 'NEW SERVICE'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded text-[#9E9B93] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">SERVICE TITLE</label>
                <input
                  type="text"
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. VIRAL SHORT-FORM & REELS"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">NUMBER</label>
                <input
                  type="text"
                  value={editingItem.number || '01'}
                  onChange={(e) => setEditingItem({ ...editingItem, number: e.target.value })}
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">TAGLINE</label>
              <input
                type="text"
                value={editingItem.tagline || ''}
                onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                placeholder="Sub-3-second hooks and retention-engineered pacing."
                className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">FULL DESCRIPTION</label>
              <textarea
                rows={3}
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">ESTIMATED TURNAROUND</label>
                <input
                  type="text"
                  value={editingItem.turnaround || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, turnaround: e.target.value })}
                  placeholder="24–48 Hours per Batch"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">IDEAL CLIENT USE-CASE</label>
                <input
                  type="text"
                  value={editingItem.ideal_for || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, ideal_for: e.target.value })}
                  placeholder="Creators, founders, personal brands"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PREVIEW IMAGE URL</label>
              <input
                type="text"
                value={editingItem.preview_image || ''}
                onChange={(e) => setEditingItem({ ...editingItem, preview_image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
              />
            </div>

            {/* Deliverables */}
            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">DELIVERABLES</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="e.g. 9:16 4K Ultra-Sharp Exports"
                  className="flex-1 bg-[#181818] border border-white/10 rounded p-2 text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newDeliverable.trim()) {
                      setEditingItem({
                        ...editingItem,
                        deliverables: [...(editingItem.deliverables || []), newDeliverable.trim()],
                      });
                      setNewDeliverable('');
                    }
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(editingItem.deliverables || []).map((del, idx) => (
                  <span
                    key={idx}
                    className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white flex items-center gap-1.5"
                  >
                    <span>{del}</span>
                    <X
                      className="w-3 h-3 text-[#6B6862] hover:text-red-400 cursor-pointer"
                      onClick={() => {
                        setEditingItem({
                          ...editingItem,
                          deliverables: (editingItem.deliverables || []).filter((_, dIdx) => dIdx !== idx),
                        });
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded bg-white/10 text-white font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveModal}
                className="px-5 py-2 rounded bg-[#E50914] hover:bg-[#FF2A2A] text-white font-bold"
              >
                {isSaving ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121212] border border-white/15 p-6 rounded-xl max-w-md w-full font-mono-code text-xs space-y-4">
            <h3 className="font-bebas text-2xl text-white">CONFIRM DELETION</h3>
            <p className="text-[#9E9B93] leading-relaxed">
              Are you sure you want to delete <strong className="text-white">{serviceToDelete?.title || 'this service'}</strong>? This will remove it from your offerings.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
