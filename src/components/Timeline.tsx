import React, { useState } from 'react';
import { Milestone } from '../types';
import { Plus, Edit2, Heart, Check, Trash2 } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';

interface TimelineProps {
  milestones: Milestone[];
  onUpdateMilestones: (milestones: Milestone[]) => void;
  partnerName: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  milestones,
  onUpdateMilestones,
  partnerName,
}) => {
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    dayNumber: 100,
    date: 'Today',
    title: '',
    tagline: '',
    description: '',
    category: 'sweet-moment',
  });
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const toggleHeart = (id: string) => {
    romanticAudio.playTenderChime();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveEdit = () => {
    if (!editingMilestone) return;
    const updated = milestones.map((m) =>
      m.id === editingMilestone.id ? editingMilestone : m
    );
    onUpdateMilestones(updated);
    setEditingMilestone(null);
  };

  const handleAddNew = () => {
    if (!newMilestone.title || !newMilestone.description) return;
    const created: Milestone = {
      id: `m-${Date.now()}`,
      dayNumber: Number(newMilestone.dayNumber) || 100,
      date: newMilestone.date || 'Today',
      title: newMilestone.title,
      tagline: newMilestone.tagline || 'A precious memory',
      description: newMilestone.description,
      category: newMilestone.category || 'sweet-moment',
    };
    onUpdateMilestones([...milestones, created].sort((a, b) => a.dayNumber - b.dayNumber));
    setIsAdding(false);
    setNewMilestone({
      dayNumber: 100,
      date: 'Today',
      title: '',
      tagline: '',
      description: '',
      category: 'sweet-moment',
    });
  };

  const handleDelete = (id: string) => {
    onUpdateMilestones(milestones.filter((m) => m.id !== id));
    if (editingMilestone?.id === id) setEditingMilestone(null);
  };

  return (
    <section id="story" className="relative py-20 border-t border-stone-200/80 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-rose-700 uppercase">
              <span>Chapter Timeline</span>
              <span aria-hidden="true">·</span>
              <span>The 100-Day Evolution</span>
            </div>
            <h2 className="mt-3 font-serif-display text-3xl font-medium text-stone-900 sm:text-4xl text-balance">
              How a Simple Hello Became Everything
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-xl">
              Every chapter brought us closer. Here are the defining milestones of our first 100 days talking together.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-semibold text-stone-800 transition-colors hover:border-rose-400 hover:text-rose-700 shadow-xs whitespace-nowrap self-start md:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add Our Memory</span>
          </button>
        </div>

        {/* Add New Milestone Card */}
        {isAdding && (
          <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50/50 p-6 shadow-sm">
            <h3 className="font-serif-display text-lg font-medium text-stone-900">
              Record a New Milestone for {partnerName} &amp; You
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-stone-700">Day Number</label>
                <input
                  type="number"
                  value={newMilestone.dayNumber}
                  onChange={(e) => setNewMilestone({ ...newMilestone, dayNumber: parseInt(e.target.value) || 0 })}
                  className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                  placeholder="e.g. 42"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700">Date or Month</label>
                <input
                  type="text"
                  value={newMilestone.date}
                  onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                  placeholder="e.g. August 14"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700">Milestone Title</label>
                <input
                  type="text"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                  placeholder="e.g. The Rainy Evening Video Call"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-stone-700">Tagline / Short Note</label>
              <input
                type="text"
                value={newMilestone.tagline}
                onChange={(e) => setNewMilestone({ ...newMilestone, tagline: e.target.value })}
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                placeholder="e.g. When neither of us wanted to say goodnight"
              />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-stone-700">Story / Full Memory</label>
              <textarea
                value={newMilestone.description}
                onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                rows={3}
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                placeholder="Describe what happened and how special it felt..."
              />
            </div>
            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsAdding(false)}
                className="rounded-lg px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNew}
                className="rounded-lg bg-rose-600 px-5 py-2 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Save Milestone
              </button>
            </div>
          </div>
        )}

        {/* Milestone Cards Grid */}
        <div className="mt-12 space-y-8">
          {milestones.map((m, idx) => {
            const isEditingThis = editingMilestone?.id === m.id;
            const indexStr = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={m.id}
                className="group relative rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs transition-all hover:border-rose-200 hover:shadow-md md:p-8"
              >
                {isEditingThis ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-600">Day #</label>
                        <input
                          type="number"
                          value={editingMilestone.dayNumber}
                          onChange={(e) =>
                            setEditingMilestone({
                              ...editingMilestone,
                              dayNumber: parseInt(e.target.value) || 0,
                            })
                          }
                          className="mt-1 w-full rounded-md border border-stone-300 p-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-600">Date</label>
                        <input
                          type="text"
                          value={editingMilestone.date}
                          onChange={(e) =>
                            setEditingMilestone({ ...editingMilestone, date: e.target.value })
                          }
                          className="mt-1 w-full rounded-md border border-stone-300 p-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-600">Title</label>
                        <input
                          type="text"
                          value={editingMilestone.title}
                          onChange={(e) =>
                            setEditingMilestone({ ...editingMilestone, title: e.target.value })
                          }
                          className="mt-1 w-full rounded-md border border-stone-300 p-2 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-600">Story</label>
                      <textarea
                        value={editingMilestone.description}
                        onChange={(e) =>
                          setEditingMilestone({
                            ...editingMilestone,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="mt-1 w-full rounded-md border border-stone-300 p-2 text-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="flex items-center gap-1 text-xs text-red-600 hover:underline"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete memory</span>
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingMilestone(null)}
                          className="px-3 py-1.5 text-xs text-stone-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center gap-1 rounded-md bg-stone-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-stone-800"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Update</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Unboxed Metadata Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-rose-700">Day {m.dayNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{m.date}</span>
                        <span aria-hidden="true">·</span>
                        <span className="italic">{m.tagline}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleHeart(m.id)}
                          className={`flex items-center gap-1 rounded-full p-1.5 transition-colors ${
                            likedIds[m.id]
                              ? 'text-rose-600'
                              : 'text-stone-400 hover:text-rose-600'
                          }`}
                          title="Heart this memory"
                        >
                          <Heart
                            className={`h-4 w-4 ${likedIds[m.id] ? 'fill-rose-600' : ''}`}
                          />
                        </button>
                        <button
                          onClick={() => setEditingMilestone(m)}
                          className="text-stone-400 hover:text-stone-700 p-1"
                          title="Edit memory"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Natural human editorial numbering */}
                    <h3 className="mt-3 font-serif-display text-xl font-medium text-stone-900 sm:text-2xl">
                      {indexStr}. {m.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
                      {m.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
