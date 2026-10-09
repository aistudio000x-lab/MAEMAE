import React, { useState } from 'react';
import { BucketItem } from '../types';
import { Check, Plus, Trash2, Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';
import { triggerLoveBurst } from './CanvasPetals';

interface BucketListProps {
  bucketItems: BucketItem[];
  onUpdateBucket: (items: BucketItem[]) => void;
  partnerName: string;
}

export const BucketList: React.FC<BucketListProps> = ({
  bucketItems,
  onUpdateBucket,
  partnerName,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const toggleComplete = (id: string) => {
    const item = bucketItems.find((b) => b.id === id);
    if (!item) return;

    if (!item.completed) {
      romanticAudio.playTenderChime();
      triggerLoveBurst();
    }

    const updated = bucketItems.map((b) =>
      b.id === id ? { ...b, completed: !b.completed } : b
    );
    onUpdateBucket(updated);
  };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newItem: BucketItem = {
      id: `b-${Date.now()}`,
      title: newTitle.trim(),
      completed: false,
      targetDay: newTarget.trim() || 'Next 100 Days',
    };
    onUpdateBucket([...bucketItems, newItem]);
    setNewTitle('');
    setNewTarget('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    onUpdateBucket(bucketItems.filter((b) => b.id !== id));
  };

  const completedCount = bucketItems.filter((b) => b.completed).length;
  const progressPercent = Math.round((completedCount / (bucketItems.length || 1)) * 100);

  return (
    <section className="relative py-20 border-t border-stone-200/80 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-rose-700 uppercase">
              <span>Looking Ahead</span>
              <span aria-hidden="true">·</span>
              <span>The Next 100 Days</span>
            </div>
            <h2 className="mt-2 font-serif-display text-3xl font-medium text-stone-900 sm:text-4xl">
              Our Next 100 Days Bucket List
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Sweet promises and little adventures we cannot wait to check off together.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 hover:border-rose-400 hover:text-rose-700 shadow-xs whitespace-nowrap self-start sm:self-auto"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Promise</span>
          </button>
        </div>

        {/* Progress Overview Bar */}
        <div className="mt-6 rounded-2xl bg-[#FAF7F2] p-5 border border-stone-200/70">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-800">
              {completedCount} of {bucketItems.length} Milestones Achieved
            </span>
            <span className="font-mono text-rose-700 font-medium tabular-nums">{progressPercent}% Completed</span>
          </div>
          <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full bg-rose-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Add promise form */}
        {isAdding && (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/40 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What sweet thing should we do next?"
                className="sm:col-span-2 rounded-lg border border-stone-300 bg-white p-2 text-sm"
              />
              <input
                type="text"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="Target milestone (e.g. Day 120)"
                className="rounded-lg border border-stone-300 bg-white p-2 text-sm"
              />
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-3 py-1 text-xs text-stone-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="rounded-lg bg-stone-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
              >
                Save to Bucket List
              </button>
            </div>
          </div>
        )}

        {/* Checklist */}
        <div className="mt-6 space-y-3">
          {bucketItems.map((item) => (
            <div
              key={item.id}
              className={`group flex items-center justify-between rounded-xl border p-4 transition-all ${
                item.completed
                  ? 'border-emerald-200 bg-emerald-50/40 text-stone-500'
                  : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                    item.completed
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-stone-300 bg-white hover:border-rose-400'
                  }`}
                  aria-label={item.completed ? 'Mark incomplete' : 'Mark completed'}
                >
                  {item.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </button>
                <span
                  className={`text-sm ${
                    item.completed ? 'line-through text-stone-400' : 'text-stone-800'
                  }`}
                >
                  {item.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {item.targetDay && (
                  <span className="text-[11px] text-stone-400">{item.targetDay}</span>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500 transition-opacity p-1"
                  title="Remove item"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
