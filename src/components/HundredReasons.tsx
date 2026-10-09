import React, { useState, useMemo } from 'react';
import { LoveReason } from '../types';
import { Heart, Search, Shuffle, Bookmark, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';
import { triggerLoveBurst } from './CanvasPetals';

interface HundredReasonsProps {
  reasons: LoveReason[];
  partnerName: string;
}

export const HundredReasons: React.FC<HundredReasonsProps> = ({
  reasons,
  partnerName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteMap, setFavoriteMap] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    reasons.forEach((r) => {
      if (r.isFavorite) initial[r.id] = true;
    });
    return initial;
  });
  const [drawnReason, setDrawnReason] = useState<LoveReason | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = [
    'All',
    'Favorites ❤️',
    'Late Nights',
    'Inside Jokes',
    'Her Smile & Heart',
    'The Little Things',
    'Our Future',
  ];

  const filteredReasons = useMemo(() => {
    return reasons.filter((r) => {
      const isFav = favoriteMap[r.id];
      const matchesCategory =
        selectedCategory === 'All'
          ? true
          : selectedCategory === 'Favorites ❤️'
          ? isFav
          : r.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : r.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [reasons, selectedCategory, searchQuery, favoriteMap]);

  const toggleFavorite = (id: number) => {
    romanticAudio.playTenderChime();
    setFavoriteMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const drawRandomReason = () => {
    const random = reasons[Math.floor(Math.random() * reasons.length)];
    setDrawnReason(random);
    romanticAudio.playTenderChime();
    triggerLoveBurst();
  };

  return (
    <section id="reasons" className="relative py-20 border-t border-stone-200/80 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-rose-700 uppercase">
              <span>Keepsake Compendium</span>
              <span aria-hidden="true">·</span>
              <span>100 Days · 100 Little Proofs</span>
            </div>
            <h2 className="mt-3 font-serif-display text-3xl font-medium text-stone-900 sm:text-4xl text-balance">
              100 Reasons Why I Love Talking to You
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-2xl">
              One genuine reason for every sunrise we have shared so far. Every smile, every voice note, every late-night reassurance.
            </p>
          </div>

          <button
            onClick={drawRandomReason}
            className="flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-700 hover:shadow-md active:scale-95 whitespace-nowrap self-start md:self-auto"
          >
            <Shuffle className="h-4 w-4" />
            <span>Draw Today&apos;s Reason</span>
          </button>
        </div>

        {/* Surprise Drawn Reason Feature Box */}
        {drawnReason && (
          <div className="mt-8 rounded-2xl border border-rose-300 bg-white p-6 shadow-md md:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-medium text-rose-700">
                <Sparkles className="h-4 w-4" />
                <span>Today&apos;s Featured Love Note · #{drawnReason.id}</span>
              </div>
              <button
                onClick={() => setDrawnReason(null)}
                className="text-xs text-stone-400 hover:text-stone-700"
              >
                Dismiss
              </button>
            </div>
            <p className="mt-4 font-serif-display text-xl text-stone-900 sm:text-2xl italic leading-relaxed">
              &ldquo;{drawnReason.text}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
              <span>{drawnReason.category}</span>
              <button
                onClick={() => toggleFavorite(drawnReason.id)}
                className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-medium"
              >
                <Heart
                  className={`h-4 w-4 ${favoriteMap[drawnReason.id] ? 'fill-rose-600' : ''}`}
                />
                <span>{favoriteMap[drawnReason.id] ? 'Saved to Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter Controls Bar & Search */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Segmented Filter Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in 100 reasons..."
              className="w-full rounded-xl border border-stone-200 bg-white py-2 pl-9 pr-4 text-xs placeholder:text-stone-400 focus:border-rose-400 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
          <span>
            Showing {Math.min(visibleCount, filteredReasons.length)} of {filteredReasons.length} reasons
          </span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-rose-600 hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Reasons Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReasons.slice(0, visibleCount).map((r) => {
            const isFav = favoriteMap[r.id];
            const numStr = String(r.id).padStart(2, '0');

            return (
              <div
                key={r.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs transition-all hover:border-rose-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="font-mono font-medium text-stone-500">#{numStr}</span>
                    <button
                      onClick={() => toggleFavorite(r.id)}
                      className={`p-1 transition-transform group-hover:scale-110 ${
                        isFav ? 'text-rose-600' : 'text-stone-300 hover:text-rose-600'
                      }`}
                      title={isFav ? 'Remove favorite' : 'Bookmark favorite'}
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-rose-600' : ''}`} />
                    </button>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-stone-800">
                    {r.text}
                  </p>
                </div>

                <div className="mt-5 border-t border-stone-100 pt-3 text-[11px] text-stone-400">
                  {r.category}
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {visibleCount < filteredReasons.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="rounded-full border border-stone-300 bg-white px-6 py-2.5 text-xs font-semibold text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50 shadow-xs"
            >
              Load More Reasons ({filteredReasons.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
