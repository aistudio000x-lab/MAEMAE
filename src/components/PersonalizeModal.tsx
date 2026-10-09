import React, { useState } from 'react';
import { CoupleProfile } from '../types';
import { X, Check, RotateCcw, Heart, Calendar } from 'lucide-react';
import { triggerLoveBurst } from './CanvasPetals';
import { romanticAudio } from '../utils/audioPlayer';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CoupleProfile;
  onSaveProfile: (profile: CoupleProfile) => void;
  onResetDefaults: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetDefaults,
}) => {
  const [form, setForm] = useState<CoupleProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(form);
    romanticAudio.playTenderChime();
    triggerLoveBurst();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-700 uppercase">
          <Heart className="h-3.5 w-3.5 fill-rose-600" />
          <span>Personalize Your 100-Day Keepsake</span>
        </div>

        <h2 className="mt-2 font-serif-display text-2xl font-semibold text-stone-900">
          Make It Uniquely Yours
        </h2>
        <p className="mt-1 text-xs text-stone-500">
          Update your names, special nicknames, and starting date. All details are saved to your browser.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700">
                Her Name (Girlfriend)
              </label>
              <input
                type="text"
                required
                value={form.partnerName}
                onChange={(e) => setForm({ ...form, partnerName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-sm focus:border-rose-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700">
                Your Name
              </label>
              <input
                type="text"
                required
                value={form.senderName}
                onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-sm focus:border-rose-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700">
                Her Nickname
              </label>
              <input
                type="text"
                value={form.herNickname}
                onChange={(e) => setForm({ ...form, herNickname: e.target.value })}
                className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-sm focus:border-rose-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700">
                Your Nickname
              </label>
              <input
                type="text"
                value={form.hisNickname}
                onChange={(e) => setForm({ ...form, hisNickname: e.target.value })}
                className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-sm focus:border-rose-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">
              The Day You Started Talking (Start Date)
            </label>
            <div className="relative mt-1">
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full rounded-xl border border-stone-300 p-2.5 text-sm focus:border-rose-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">
              Hero Dedication Note
            </label>
            <textarea
              rows={3}
              value={form.relationshipNote}
              onChange={(e) => setForm({ ...form, relationshipNote: e.target.value })}
              className="mt-1 w-full rounded-xl border border-stone-300 p-2.5 text-sm focus:border-rose-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={() => {
                onResetDefaults();
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to demo</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full bg-stone-900 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-stone-800"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
