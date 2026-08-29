import React, { useState, useEffect } from 'react';
import {
  Plus,
  Save,
  Trash2,
  Edit3,
  Check,
  AlertCircle,
  GraduationCap,
  Briefcase,
  X,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DbExperience, DbMetric } from '@/types/database';

export const ExperienceEdit: React.FC = () => {
  const { allExperience, timeline, metrics, refreshData } = usePortfolio();
  const [expItems, setExpItems] = useState<DbExperience[]>([]);
  const [metricItems, setMetricItems] = useState<DbMetric[]>([]);
  const [editingExp, setEditingExp] = useState<Partial<DbExperience> | null>(null);
  const [newHighlight, setNewHighlight] = useState('');
  const [newTool, setNewTool] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (allExperience.length > 0) {
      setExpItems(allExperience);
    } else {
      setExpItems(
        timeline.map((t, idx) => ({
          id: `exp-${idx + 1}`,
          item_id: t.id,
          period: t.period,
          role: t.role,
          organization: t.organization,
          location: t.location,
          type: t.type,
          highlights: t.highlights,
          tools_used: t.toolsUsed,
          status: t.status,
          sort_order: idx + 1,
          published: true,
        }))
      );
    }

    if (metrics) {
      setMetricItems(metrics);
    }
  }, [allExperience, timeline, metrics]);

  const handleOpenNewExp = () => {
    setEditingExp({
      item_id: `exp-${Date.now()}`,
      period: '2026 — PRESENT',
      role: '',
      organization: '',
      location: 'INDIA (REMOTE)',
      type: 'FREELANCE',
      highlights: ['Led post-production for high-retention campaigns.'],
      tools_used: ['Premiere Pro', 'After Effects'],
      status: 'CURRENTLY ACTIVE',
      sort_order: expItems.length + 1,
      published: true,
    });
  };

  const handleSaveExp = async () => {
    if (!editingExp?.role || !editingExp?.organization) {
      setFeedback({ type: 'error', message: 'Role and Organization are required.' });
      return;
    }

    if (!isSupabaseConfigured) {
      alert('Notice: Supabase credentials not set in .env.');
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      if (editingExp.id && !editingExp.id.startsWith('exp-')) {
        const { error } = await supabase
          .from('experience')
          .update(editingExp)
          .eq('id', editingExp.id);
        if (error) throw error;
      } else {
        const { id, ...newPayload } = editingExp;
        const { error } = await supabase.from('experience').insert([newPayload]);
        if (error) throw error;
      }

      await refreshData();
      setFeedback({ type: 'success', message: 'Experience item saved!' });
      setEditingExp(null);
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Save failed: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!isSupabaseConfigured) {
      setExpItems((prev) => prev.filter((e) => e.id !== id));
      setDeleteConfirmId(null);
      return;
    }

    try {
      if (id.startsWith('exp-')) {
        const itemToDelete = expItems.find((e) => e.id === id);
        if (itemToDelete?.item_id) {
          await supabase.from('experience').delete().eq('item_id', itemToDelete.item_id);
        }
        setExpItems((prev) => prev.filter((e) => e.id !== id));
      } else {
        const { error } = await supabase.from('experience').delete().eq('id', id);
        if (error) throw error;
      }
      await refreshData();
      setFeedback({ type: 'success', message: 'Timeline item deleted successfully.' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Delete failed: ${err.message}` });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const expToDelete = expItems.find((e) => e.id === deleteConfirmId);

  const handleSaveMetrics = async () => {
    if (!isSupabaseConfigured) {
      alert('Notice: Supabase credentials not set.');
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      for (const m of metricItems) {
        if (!m.id.startsWith('metric-')) {
          await supabase.from('metrics').upsert(m);
        }
      }
      await refreshData();
      setFeedback({ type: 'success', message: 'Metrics updated successfully!' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Failed to save metrics: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-bebas text-3xl sm:text-5xl tracking-wide text-white">
            EXPERIENCE &amp; <span className="text-[#E50914]">METRICS</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            Manage your career timeline milestones, education, and proof statistics.
          </p>
        </div>

        <button
          onClick={handleOpenNewExp}
          className="px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ADD TIMELINE ITEM</span>
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

      {/* Key Proof Metrics Editor */}
      <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 space-y-4 font-mono-code text-xs">
        <div className="border-b border-white/10 pb-2 flex items-center justify-between">
          <span className="font-bold text-white uppercase">KEY PROOF METRICS (ABOUT SECTION)</span>
          <button
            onClick={handleSaveMetrics}
            disabled={isSaving}
            className="px-3 py-1 bg-white/10 hover:bg-[#E50914] text-white rounded text-[11px] font-bold"
          >
            Save Metrics
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricItems.map((metric, idx) => (
            <div key={metric.id || idx} className="bg-[#141414] border border-white/10 p-3 rounded-lg space-y-2">
              <div>
                <label className="block text-[#6B6862] text-[9px] uppercase">METRIC VALUE</label>
                <input
                  type="text"
                  value={metric.value}
                  onChange={(e) => {
                    const next = [...metricItems];
                    next[idx].value = e.target.value;
                    setMetricItems(next);
                  }}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded p-1.5 text-white font-bebas text-2xl"
                />
              </div>

              <div>
                <label className="block text-[#6B6862] text-[9px] uppercase">LABEL</label>
                <input
                  type="text"
                  value={metric.label}
                  onChange={(e) => {
                    const next = [...metricItems];
                    next[idx].label = e.target.value;
                    setMetricItems(next);
                  }}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded p-1.5 text-white text-[10px]"
                />
              </div>

              <div>
                <label className="block text-[#6B6862] text-[9px] uppercase">SUBTITLE / CHANGE</label>
                <input
                  type="text"
                  value={metric.change}
                  onChange={(e) => {
                    const next = [...metricItems];
                    next[idx].change = e.target.value;
                    setMetricItems(next);
                  }}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded p-1.5 text-[#9E9B93] text-[10px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Entries Table */}
      <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono-code text-xs">
            <thead className="bg-[#141414] text-[#6B6862] uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Period</th>
                <th className="py-3.5 px-4">Role &amp; Organization</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {expItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 text-[#F2F0EC] font-bold">{item.period}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bebas text-base text-white block tracking-wide">
                      {item.role}
                    </span>
                    <span className="text-[10px] text-[#9E9B93] block">{item.organization}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-[#E50914] font-bold">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#9E9B93]">
                    {item.status ? (
                      <span className="text-emerald-400 font-bold">{item.status}</span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingExp(item)}
                        className="p-1.5 rounded hover:bg-white/10 text-[#9E9B93] hover:text-[#E50914]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
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

      {/* Edit/Create Timeline Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#121212] border border-white/15 p-6 rounded-2xl max-w-2xl w-full font-mono-code text-xs space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bebas text-2xl text-white">
                {editingExp.id ? 'EDIT TIMELINE ITEM' : 'NEW TIMELINE ITEM'}
              </h3>
              <button onClick={() => setEditingExp(null)} className="text-[#9E9B93] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">ROLE / TITLE</label>
                <input
                  type="text"
                  value={editingExp.role || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                  placeholder="FREELANCE VIDEO EDITOR"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">ORGANIZATION</label>
                <input
                  type="text"
                  value={editingExp.organization || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                  placeholder="INDEPENDENT CREATIVE PRACTICE"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PERIOD</label>
                <input
                  type="text"
                  value={editingExp.period || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                  placeholder="2026 — PRESENT"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">TYPE</label>
                <select
                  value={editingExp.type || 'FREELANCE'}
                  onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value })}
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                >
                  <option value="FREELANCE">FREELANCE</option>
                  <option value="EDUCATION">EDUCATION</option>
                  <option value="AGENCY / COLLAB">AGENCY / COLLAB</option>
                </select>
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">STATUS BADGE</label>
                <input
                  type="text"
                  value={editingExp.status || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, status: e.target.value })}
                  placeholder="CURRENTLY ACTIVE"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">LOCATION</label>
              <input
                type="text"
                value={editingExp.location || ''}
                onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                placeholder="INDIA (REMOTE / GLOBAL CLIENTS)"
                className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
              />
            </div>

            {/* Highlights Builder */}
            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">HIGHLIGHTS &amp; ACHIEVEMENTS</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="Add bullet highlight..."
                  className="flex-1 bg-[#181818] border border-white/10 rounded p-2 text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newHighlight.trim()) {
                      setEditingExp({
                        ...editingExp,
                        highlights: [...(editingExp.highlights || []), newHighlight.trim()],
                      });
                      setNewHighlight('');
                    }
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded"
                >
                  Add
                </button>
              </div>

              <div className="space-y-1.5">
                {(editingExp.highlights || []).map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-white/5 text-white">
                    <span>&bull; {h}</span>
                    <X
                      className="w-3.5 h-3.5 text-[#6B6862] hover:text-red-400 cursor-pointer"
                      onClick={() => {
                        setEditingExp({
                          ...editingExp,
                          highlights: (editingExp.highlights || []).filter((_, hIdx) => hIdx !== idx),
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Used Tags */}
            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">TOOLS &amp; COMPETENCIES USED</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  placeholder="e.g. Premiere Pro"
                  className="flex-1 bg-[#181818] border border-white/10 rounded p-2 text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newTool.trim()) {
                      setEditingExp({
                        ...editingExp,
                        tools_used: [...(editingExp.tools_used || []), newTool.trim()],
                      });
                      setNewTool('');
                    }
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(editingExp.tools_used || []).map((tool, idx) => (
                  <span key={idx} className="bg-[#181818] border border-white/10 px-2 py-0.5 rounded text-white flex items-center gap-1.5">
                    <span>{tool}</span>
                    <X
                      className="w-3 h-3 text-[#6B6862] hover:text-red-400 cursor-pointer"
                      onClick={() => {
                        setEditingExp({
                          ...editingExp,
                          tools_used: (editingExp.tools_used || []).filter((_, tIdx) => tIdx !== idx),
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
                onClick={() => setEditingExp(null)}
                className="px-4 py-2 rounded bg-white/10 text-white font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveExp}
                className="px-5 py-2 rounded bg-[#E50914] hover:bg-[#FF2A2A] text-white font-bold"
              >
                {isSaving ? 'Saving...' : 'Save Milestone'}
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
              Are you sure you want to delete <strong className="text-white">{expToDelete?.role || 'this item'}</strong> ({expToDelete?.organization})? This will remove it from your timeline.
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
                onClick={() => handleDeleteExp(deleteConfirmId)}
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
