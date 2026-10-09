import React, { useState } from 'react';
import { ChatSnippet } from '../types';
import { Play, Pause, Heart, MessageSquare, Plus, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';
import polaroidImg from '../assets/images/polaroid_keepsake_memories_1791526570556.jpg';

interface ChatVaultProps {
  chatSnippets: ChatSnippet[];
  onUpdateSnippets: (snippets: ChatSnippet[]) => void;
  partnerName: string;
  senderName: string;
}

export const ChatVault: React.FC<ChatVaultProps> = ({
  chatSnippets,
  onUpdateSnippets,
  partnerName,
  senderName,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const [newSender, setNewSender] = useState<'partner' | 'user'>('user');

  const handlePlayVoice = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    setAudioProgress(0);

    const interval = setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    romanticAudio.playVoiceSnippet(3, () => {
      setIsPlayingAudio(false);
      setAudioProgress(100);
      clearInterval(interval);
    });
  };

  const handleReaction = (id: string, emoji: string) => {
    romanticAudio.playTenderChime();
    setReactions((prev) => ({ ...prev, [id]: prev[id] === emoji ? '' : emoji }));
  };

  const handleAddSnippet = () => {
    if (!newText.trim()) return;
    const item: ChatSnippet = {
      id: `c-${Date.now()}`,
      sender: newSender,
      text: newText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Day 100 · Today',
      reaction: '❤️',
    };
    onUpdateSnippets([...chatSnippets, item]);
    setNewText('');
    setIsAdding(false);
  };

  return (
    <section id="memories" className="relative py-20 border-t border-stone-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Polaroid Visual & Keepsake Notes */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-rose-700 uppercase">
                <span>The Chat Vault</span>
                <span aria-hidden="true">·</span>
                <span>Our Favorite Texts</span>
              </div>

              <h2 className="font-serif-display text-3xl font-medium text-stone-900 sm:text-4xl text-balance">
                Words We Whispered Across the Screen
              </h2>

              <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
                Before we spoke in person, we lived inside these little blue and white bubbles.
                Late nights, inside jokes, sleepy confessions, and voice notes that saved tough days.
              </p>

              {/* Polaroid Frame */}
              <div className="relative mt-6 rounded-2xl border border-stone-200 bg-[#FAF7F2] p-4 shadow-md rotate-[-1deg] transition-transform hover:rotate-0">
                <div className="overflow-hidden rounded-xl bg-stone-100">
                  <img
                    src={polaroidImg}
                    alt="Polaroid keepsake memories"
                    referrerPolicy="no-referrer"
                    className="h-64 w-full object-cover"
                  />
                </div>
                <div className="mt-4 px-2 pb-1">
                  <p className="font-handwriting text-base text-stone-700 sm:text-lg">
                    &ldquo;Saved every voice memo because hearing you feels like sunshine.&rdquo;
                  </p>
                  <div className="mt-2 text-xs text-stone-400">
                    Day 100 · Keepsake Artifact
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chat Stream Simulation */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-stone-200/90 bg-[#FAF7F2]/60 p-6 shadow-xs backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-serif-display font-semibold">
                    {partnerName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900">{partnerName}</h3>
                    <p className="text-xs text-stone-500">100 consecutive days in conversation</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAdding(!isAdding)}
                  className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:border-rose-400 hover:text-rose-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Text</span>
                </button>
              </div>

              {/* Add message input */}
              {isAdding && (
                <div className="mt-4 rounded-xl border border-rose-200 bg-white p-4 shadow-sm">
                  <div className="flex gap-4 text-xs font-medium text-stone-600 mb-2">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        checked={newSender === 'user'}
                        onChange={() => setNewSender('user')}
                      />
                      <span>Sent by {senderName} (Me)</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        checked={newSender === 'partner'}
                        onChange={() => setNewSender('partner')}
                      />
                      <span>Sent by {partnerName}</span>
                    </label>
                  </div>
                  <textarea
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    rows={2}
                    placeholder="Type an iconic text message from your 100 days..."
                    className="w-full rounded-lg border border-stone-300 p-2 text-sm"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setIsAdding(false)}
                      className="px-3 py-1 text-xs text-stone-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSnippet}
                      className="rounded-lg bg-stone-900 px-4 py-1 text-xs font-medium text-white hover:bg-stone-800"
                    >
                      Save Text
                    </button>
                  </div>
                </div>
              )}

              {/* Message Feed */}
              <div className="mt-6 space-y-4">
                {chatSnippets.map((c) => {
                  const isUser = c.sender === 'user';
                  const activeReaction = reactions[c.id] || c.reaction;

                  return (
                    <div
                      key={c.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className="mb-1 text-[11px] text-stone-400">
                        <span>{isUser ? senderName : partnerName}</span>
                        <span className="mx-1">·</span>
                        <span>{c.date}</span>
                      </div>

                      <div
                        className={`group relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs transition-shadow sm:max-w-[75%] ${
                          isUser
                            ? 'rounded-br-xs bg-stone-900 text-stone-50'
                            : 'rounded-bl-xs bg-white text-stone-800 border border-stone-200/80'
                        }`}
                      >
                        {c.isAudio ? (
                          <div className="flex items-center gap-3 py-1">
                            <button
                              onClick={handlePlayVoice}
                              className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform active:scale-95 ${
                                isUser ? 'bg-white text-stone-900' : 'bg-rose-600 text-white'
                              }`}
                              aria-label="Play voice note"
                            >
                              {isPlayingAudio ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4 ml-0.5" />
                              )}
                            </button>

                            <div className="flex-1">
                              {/* Animated Simulated Audio Waveform */}
                              <div className="flex items-center gap-1 h-6">
                                {[35, 60, 95, 45, 80, 50, 100, 75, 40, 90, 65, 30].map((h, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      height: isPlayingAudio ? `${Math.min(100, h * (0.6 + Math.random() * 0.8))}%` : `${h}%`,
                                    }}
                                    className={`w-1 rounded-full transition-all duration-150 ${
                                      isUser ? 'bg-stone-400' : 'bg-rose-400'
                                    }`}
                                  />
                                ))}
                              </div>
                              <div className="flex justify-between text-[10px] opacity-75 mt-0.5">
                                <span>Voice Note</span>
                                <span>{c.audioDuration || '0:42'}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p>{c.text}</p>
                        )}

                        <div className="mt-1 flex items-center justify-end gap-2 text-[10px] opacity-65">
                          <span>{c.time}</span>
                        </div>

                        {/* Reaction sticker if present */}
                        {activeReaction && (
                          <div
                            onClick={() => handleReaction(c.id, activeReaction)}
                            className="absolute -bottom-2.5 right-2 flex h-5 w-5 items-center justify-center rounded-full border border-stone-200 bg-white text-xs shadow-xs cursor-pointer transition-transform hover:scale-125"
                            title="Reaction"
                          >
                            {activeReaction}
                          </div>
                        )}
                      </div>

                      {/* Quick reaction trigger on hover */}
                      <div className="mt-1 flex gap-1 opacity-40 hover:opacity-100 transition-opacity">
                        {['❤️', '✨', '🥺', '😂'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(c.id, emoji)}
                            className="text-xs p-0.5 hover:scale-125 transition-transform"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
