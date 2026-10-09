import React, { useState } from 'react';
import { Mail, Heart, Printer, Edit2, Check, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';
import { triggerLoveBurst } from './CanvasPetals';
import nightImg from '../assets/images/night_starlight_whispers_1791526586622.jpg';

interface LoveLetterProps {
  letterText: string;
  onUpdateLetterText: (text: string) => void;
  partnerName: string;
  senderName: string;
  startDate: string;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  letterText,
  onUpdateLetterText,
  partnerName,
  senderName,
  startDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(letterText);
  const [activeTab, setActiveTab] = useState<'letter' | 'certificate'>('letter');

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    romanticAudio.playTenderChime();
    triggerLoveBurst();
  };

  const handleSaveEdit = () => {
    onUpdateLetterText(draftText);
    setIsEditing(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="letter" className="relative py-20 border-t border-stone-200/80 bg-[#FAF7F2]">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wider text-rose-700 uppercase">
            <span>The 100th Day Keepsake</span>
            <span aria-hidden="true">·</span>
            <span>Unconditional Words</span>
          </div>
          <h2 className="mt-3 font-serif-display text-3xl font-medium text-stone-900 sm:text-4xl">
            A Letter for My Favorite Notification
          </h2>
          <p className="mt-2 text-sm text-stone-600 max-w-xl mx-auto">
            Written especially for {partnerName} on our 100th consecutive day together.
          </p>

          {/* Toggle between Letter & Official Certificate */}
          <div className="mt-8 inline-flex items-center gap-1 p-1 bg-stone-200/70 rounded-xl">
            <button
              onClick={() => setActiveTab('letter')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'letter'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Handwritten Love Letter
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'certificate'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Official 100-Day Certificate
            </button>
          </div>
        </div>

        {activeTab === 'letter' ? (
          /* Love Letter Section */
          <div className="mt-12">
            {!isOpen ? (
              /* Closed Envelope with Wax Seal */
              <div className="mx-auto max-w-lg cursor-pointer text-center" onClick={handleOpenEnvelope}>
                <div className="group relative rounded-3xl border-2 border-dashed border-rose-300 bg-white p-12 shadow-md transition-all hover:border-rose-400 hover:shadow-xl hover:-translate-y-1">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 border border-rose-200 text-rose-700">
                    <Mail className="h-10 w-10 text-rose-600 transition-transform group-hover:scale-110" />
                  </div>

                  <h3 className="mt-6 font-serif-display text-2xl font-semibold text-stone-900">
                    A Sealed Letter for {partnerName}
                  </h3>
                  <p className="mt-2 text-xs text-stone-500">
                    Day 100 Keepsake · Tap the red wax seal below to break the seal and read
                  </p>

                  {/* Wax Seal Badge */}
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-700 text-rose-100 shadow-lg ring-4 ring-rose-200 transition-transform active:scale-95 group-hover:scale-105"
                      aria-label="Break Wax Seal"
                    >
                      <span className="font-serif-display font-bold text-lg">100</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Open Letter Paper */
              <div className="relative mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white p-8 shadow-xl sm:p-12 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <span className="text-xs font-serif-display italic text-stone-400">
                    100 Days Celebration Edition
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>{isEditing ? 'Cancel' : 'Edit Letter'}</span>
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="mt-6 space-y-4">
                    <textarea
                      value={draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                      rows={14}
                      className="w-full rounded-xl border border-stone-300 p-4 font-serif-display text-base leading-relaxed focus:outline-hidden"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="flex items-center gap-1 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Save Letter</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6">
                    <div className="whitespace-pre-line font-serif-display text-base sm:text-lg leading-relaxed text-stone-800">
                      {letterText}
                    </div>

                    <div className="mt-10 border-t border-stone-100 pt-6 flex items-center justify-between">
                      <div className="font-handwriting text-xl text-rose-700 sm:text-2xl">
                        With all my heart, {senderName}
                      </div>
                      <div className="text-xs text-stone-400">
                        Day 100 · Forever &amp; Always
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Official Printable 100-Day Certificate */
          <div className="mt-12 space-y-6">
            <div className="flex justify-end">
              <button
                onClick={handlePrintCertificate}
                className="flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-stone-800"
              >
                <Printer className="h-4 w-4" />
                <span>Print or Save as PDF</span>
              </button>
            </div>

            <div
              id="printable-certificate"
              className="relative mx-auto max-w-3xl rounded-3xl border-8 border-[#EADBC8] bg-white p-8 sm:p-14 text-center shadow-xl"
            >
              {/* Inner Double Hairline Frame */}
              <div className="rounded-2xl border-2 border-stone-300 p-6 sm:p-10">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-amber-700 uppercase">
                  <Sparkles className="h-4 w-4" />
                  <span>Official Certificate of Milestone Completion</span>
                  <Sparkles className="h-4 w-4" />
                </div>

                <h3 className="mt-4 font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
                  100 Days of Endless Conversations
                </h3>

                <p className="mt-4 text-xs tracking-wider text-stone-500 uppercase">
                  Presented with endless admiration to
                </p>

                <div className="mt-3 font-serif-display text-2xl sm:text-3xl font-semibold text-rose-700 italic">
                  {partnerName} &amp; {senderName}
                </div>

                <p className="mt-6 text-sm leading-relaxed text-stone-600 sm:text-base max-w-lg mx-auto">
                  For completing 100 consecutive days of talking, sharing vulnerable dreams, laughing through midnight calls, sending comforting voice notes, and choosing each other every single day.
                </p>

                <div className="mt-10 grid grid-cols-3 items-end border-t border-stone-200 pt-8 text-xs text-stone-600">
                  <div>
                    <div className="font-serif-display text-sm font-semibold text-stone-900">
                      {startDate}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-1">Commencement Date</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-white font-serif-display font-bold shadow-md">
                      100
                    </div>
                    <div className="text-[10px] text-stone-400 mt-1">Certified Seal</div>
                  </div>

                  <div>
                    <div className="font-handwriting text-base text-rose-700">
                      {senderName}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-1">Signed with Love</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ambient Twilight Photo Accent */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 sm:p-12">
              <span className="text-xs font-medium text-rose-700 uppercase tracking-wider">
                Looking Ahead
              </span>
              <h3 className="mt-2 font-serif-display text-2xl font-medium text-stone-900 sm:text-3xl">
                Here&apos;s to the Next 100 Days and Beyond
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                100 days was just the prelude. The real adventure is all the conversations, road trips, midnight talks, and morning coffees still waiting for us in the future.
              </p>
            </div>
            <div className="h-64 sm:h-80 overflow-hidden">
              <img
                src={nightImg}
                alt="Romantic rooftop stargazing conversation"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
