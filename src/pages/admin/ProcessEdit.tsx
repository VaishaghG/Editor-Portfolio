import React, { useState, useEffect } from 'react';
import {
  Plus,
  Save,
  Trash2,
  Edit3,
  Check,
  AlertCircle,
  Workflow,
  X,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DbProcessStep } from '@/types/database';

export const ProcessEdit: React.FC = () => {
  const { allProcessSteps, processSteps, refreshData } = usePortfolio();
  const [items, setItems] = useState<DbProcessStep[]>([]);
  const [editingItem, setEditingItem] = useState<Partial<DbProcessStep> | null>(null);
  const [newTask, setNewTask] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (allProcessSteps.length > 0) {
      setItems(allProcessSteps);
    } else {
      setItems(
        processSteps.map((p, idx) => ({
          id: `step-${idx + 1}`,
          number: p.number,
          phase: p.phase,
          title: p.title,
          description: p.description,
          timeline_track: p.timelineTrack,
          timeline_track_color: p.timelineTrackColor,
          duration_percent: p.durationPercent,
          tasks: p.tasks,
          output: p.output,
          sort_order: idx + 1,
          published: true,
        }))
      );
    }
  }, [allProcessSteps, processSteps]);

  const handleOpenNew = () => {
    setEditingItem({
      number: `0${items.length + 1}`,
      phase: `PHASE 0${items.length + 1} // STAGE`,
      title: '',
      description: '',
      timeline_track: 'V1 / STORY',
      timeline_track_color: '#E50914',
      duration_percent: 20,
      tasks: ['Analyze brief', 'Assembly cut'],
      output: 'Stage Deliverable Master',
      sort_order: items.length + 1,
      published: true,
    });
  };

  const handleSaveModal = async () => {
    if (!editingItem?.title) {
      setFeedback({ type: 'error', message: 'Step title is required.' });
      return;
    }

    if (!isSupabaseConfigured) {
      alert('Notice: Supabase credentials not configured in .env.');
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      if (editingItem.id && !editingItem.id.startsWith('step-')) {
        const { error } = await supabase
          .from('process_steps')
          .update({
            ...editingItem,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { id, ...newPayload } = editingItem;
        const { error } = await supabase.from('process_steps').insert([newPayload]);
        if (error) throw error;
      }

      await refreshData();
      setFeedback({ type: 'success', message: 'Process step saved!' });
      setEditingItem(null);
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Save failed: ${err.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured) {
      setItems((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      return;
    }

    try {
      if (id.startsWith('step-')) {
        const itemToDelete = items.find((p) => p.id === id);
        if (itemToDelete?.number) {
          await supabase.from('process_steps').delete().eq('number', itemToDelete.number);
        }
        setItems((prev) => prev.filter((p) => p.id !== id));
      } else {
        const { error } = await supabase.from('process_steps').delete().eq('id', id);
        if (error) throw error;
      }
      await refreshData();
      setFeedback({ type: 'success', message: 'Process step deleted successfully.' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Delete failed: ${err.message}` });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const stepToDelete = items.find((p) => p.id === deleteConfirmId);

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-bebas text-3xl sm:text-5xl tracking-wide text-white">
            PROCESS &amp; <span className="text-[#E50914]">NLE WORKFLOW</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            Manage the 5-phase timeline sequence (Understand, Select, Edit, Design, Polish).
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ADD PROCESS STEP</span>
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

      {/* Process Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono-code text-xs">
        {items.map((step) => (
          <div
            key={step.id}
            className="bg-[#0f0f0f] border border-white/10 hover:border-white/25 rounded-xl p-5 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#E50914] font-bold text-sm">{step.number}</span>
                <span
                  className="px-2 py-0.5 rounded text-[9px] font-bold text-white"
                  style={{ backgroundColor: step.timeline_track_color || '#E50914' }}
                >
                  {step.timeline_track}
                </span>
              </div>

              <span className="text-[10px] text-[#6B6862] uppercase block">{step.phase}</span>
              <h3 className="font-bebas text-2xl text-white tracking-wide mt-0.5">{step.title}</h3>
              <p className="font-sans text-xs text-[#9E9B93] leading-relaxed mt-2 line-clamp-3">
                {step.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="text-[10px] text-[#6B6862]">
                <span className="text-[#E50914] font-bold block">OUTPUT:</span>
                <span className="text-white truncate block">{step.output}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-[#6B6862]">
                  {step.duration_percent}% timeline width
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingItem(step)}
                    className="p-1.5 rounded hover:bg-white/10 text-[#9E9B93] hover:text-[#E50914]"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(step.id)}
                    className="p-1.5 rounded hover:bg-red-500/20 text-[#9E9B93] hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#121212] border border-white/15 p-6 rounded-2xl max-w-2xl w-full font-mono-code text-xs space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bebas text-2xl text-white">
                {editingItem.id ? 'EDIT PROCESS STEP' : 'NEW PROCESS STEP'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-[#9E9B93] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">STEP TITLE</label>
                <input
                  type="text"
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. EDIT"
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

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">TIMELINE %</label>
                <input
                  type="number"
                  value={editingItem.duration_percent ?? 20}
                  onChange={(e) => setEditingItem({ ...editingItem, duration_percent: parseInt(e.target.value) || 20 })}
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">PHASE LABEL</label>
              <input
                type="text"
                value={editingItem.phase || ''}
                onChange={(e) => setEditingItem({ ...editingItem, phase: e.target.value })}
                placeholder="PHASE 03 // THE OFFLINE CUT"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">TIMELINE TRACK STAMP</label>
                <input
                  type="text"
                  value={editingItem.timeline_track || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, timeline_track: e.target.value })}
                  placeholder="V1 / MAIN STORY"
                  className="w-full bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">TRACK COLOR</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={editingItem.timeline_track_color || '#E50914'}
                    onChange={(e) => setEditingItem({ ...editingItem, timeline_track_color: e.target.value })}
                    className="w-10 h-10 rounded bg-[#181818] border border-white/10 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={editingItem.timeline_track_color || '#E50914'}
                    onChange={(e) => setEditingItem({ ...editingItem, timeline_track_color: e.target.value })}
                    className="flex-1 bg-[#181818] border border-white/10 rounded p-2.5 text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#9E9B93] uppercase text-[10px] mb-1">KEY OUTPUT DELIVERABLE</label>
              <input
                type="text"
                value={editingItem.output || ''}
                onChange={(e) => setEditingItem({ ...editingItem, output: e.target.value })}
                placeholder="Locked Offline Edit (V1 / Picture Lock)"
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
                className="px-5 py-2 rounded bg-[#E50914] hover:bg-[#FF2A2A] text-white font-bold"
              >
                {isSaving ? 'Saving...' : 'Save Step'}
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
              Are you sure you want to delete <strong className="text-white">{stepToDelete?.title || 'this step'}</strong>? This will remove it from your workflow timeline.
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
