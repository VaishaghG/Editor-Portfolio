import React, { useState, useEffect } from 'react';
import {
  Plus,
  Save,
  Trash2,
  Edit3,
  Check,
  AlertCircle,
  Wrench,
  X,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DbTool } from '@/types/database';

export const ToolsEdit: React.FC = () => {
  const { allTools, tools, refreshData } = usePortfolio();
  const [items, setItems] = useState<DbTool[]>([]);
  const [editingItem, setEditingItem] = useState<Partial<DbTool> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (allTools.length > 0) {
      setItems(allTools);
    } else {
      setItems(
        tools.map((t, idx) => ({
          id: `tool-${idx + 1}`,
          tool_id: t.id,
          name: t.name,
          category: t.category,
          level: t.level,
          description: t.description,
          shortcut: t.shortcut,
          role: t.role,
          featured_feature: t.featuredFeature,
          sort_order: idx + 1,
          published: true,
        }))
      );
    }
  }, [allTools, tools]);

  const handleOpenNew = () => {
    setEditingItem({
      tool_id: `tool-${Date.now()}`,
      name: '',
      category: 'PRIMARY NLE',
      level: 'ADVANCED / 3+ YEARS',
      description: '',
      shortcut: 'Ctrl+S / Alt+E',
      role: 'Post-Production Suite',
      featured_feature: 'Hardware Acceleration & Color Sync',
      sort_order: items.length + 1,
      published: true,
    });
  };

  const handleSaveModal = async () => {
    if (!editingItem?.name) {
      setFeedback({ type: 'error', message: 'Tool name is required.' });
      return;
    }

    if (!isSupabaseConfigured) {
      alert('Notice: Supabase credentials not set in .env.');
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      if (editingItem.id && !editingItem.id.startsWith('tool-')) {
        const { error } = await supabase
          .from('tools')
          .update(editingItem)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { id, ...newPayload } = editingItem;
        const { error } = await supabase.from('tools').insert([newPayload]);
        if (error) throw error;
      }

      await refreshData();
      setFeedback({ type: 'success', message: 'Tool saved successfully!' });
      setEditingItem(null);
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Save failed: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured) {
      setItems((prev) => prev.filter((t) => t.id !== id));
      setDeleteConfirmId(null);
      return;
    }

    try {
      if (id.startsWith('tool-')) {
        const itemToDelete = items.find((t) => t.id === id);
        if (itemToDelete?.tool_id) {
          await supabase.from('tools').delete().eq('tool_id', itemToDelete.tool_id);
        }
        setItems((prev) => prev.filter((t) => t.id !== id));
      } else {
        const { error } = await supabase.from('tools').delete().eq('id', id);
        if (error) throw error;
      }
      await refreshData();
      setFeedback({ type: 'success', message: 'Software tool deleted successfully.' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Delete failed: ${err.message}` });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const toolToDelete = items.find((t) => t.id === deleteConfirmId);

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-bebas text-3xl sm:text-5xl tracking-wide text-white">
            SOFTWARE &amp; <span className="text-[#E50914]">TOOLS STACK</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            Manage your editing software, keyboard shortcuts, and mastery ratings.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ADD SOFTWARE TOOL</span>
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

      {/* Tools Table */}
      <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono-code text-xs">
            <thead className="bg-[#141414] text-[#6B6862] uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Software Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Proficiency Level</th>
                <th className="py-3.5 px-4">Key Shortcuts</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((tool) => (
                <tr key={tool.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bebas text-base text-white block tracking-wide">
                      {tool.name}
                    </span>
                    <span className="text-[10px] text-[#9E9B93] block">{tool.role}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#9E9B93]">
                    <span className="bg-white/5 px-2 py-0.5 rounded text-[10px]">{tool.category}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#E50914] font-bold">{tool.level}</td>
                  <td className="py-3.5 px-4 text-white font-bold">{tool.shortcut}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingItem(tool)}
                        className="p-1.5 rounded hover:bg-white/10 text-[#9E9B93] hover:text-[#E50914]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(tool.id)}
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
          <div className="bg-[#121212] border border-white/15 p-6 rounded-2xl max-w-2xl w-full font-mono-code text-xs space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bebas text-2xl text-white">
                {editingItem.id ? 'EDIT SOFTWARE TOOL' : 'NEW SOFTWARE TOOL'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-[#9E9B93] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">TOOL NAME</label>
                <input
                  type="text"
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. ADOBE PREMIERE PRO"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">CATEGORY</label>
                <select
                  value={editingItem.category || 'PRIMARY NLE'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                >
                  <option value="PRIMARY NLE">PRIMARY NLE</option>
                  <option value="MOTION & VFX">MOTION &amp; VFX</option>
                  <option value="COLOR & AUDIO">COLOR &amp; AUDIO</option>
                  <option value="DESIGN & GRAPHICS">DESIGN &amp; GRAPHICS</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PROFICIENCY LEVEL</label>
                <input
                  type="text"
                  value={editingItem.level || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, level: e.target.value })}
                  placeholder="MASTER / 5+ YEARS"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">KEY SHORTCUTS</label>
                <input
                  type="text"
                  value={editingItem.shortcut || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, shortcut: e.target.value })}
                  placeholder="Q / W / C / V"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PIPELINE ROLE</label>
              <input
                type="text"
                value={editingItem.role || ''}
                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                placeholder="Core Narrative & Offline Editing Engine"
                className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">DESCRIPTION</label>
              <textarea
                rows={3}
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">FEATURED FOCUS CAPABILITY</label>
              <input
                type="text"
                value={editingItem.featured_feature || ''}
                onChange={(e) => setEditingItem({ ...editingItem, featured_feature: e.target.value })}
                placeholder="Lumetri Color Sync & Dynamic Link"
                className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
              />
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
                className="px-5 py-2 rounded bg-[#E50914] hover:bg-[#FF2A2A] text-white font-bold cursor-pointer"
              >
                {isSaving ? 'Saving...' : 'Save Tool'}
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
              Are you sure you want to delete <strong className="text-white">{toolToDelete?.name || 'this tool'}</strong>? This will remove it from your software stack.
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
