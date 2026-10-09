import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, RotateCcw, Award, Heart, Edit3, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';
import { triggerLoveBurst } from './CanvasPetals';

interface CoupleQuizProps {
  quizQuestions: QuizQuestion[];
  onUpdateQuiz: (questions: QuizQuestion[]) => void;
  partnerName: string;
}

export const CoupleQuiz: React.FC<CoupleQuizProps> = ({
  quizQuestions,
  onUpdateQuiz,
  partnerName,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableQuestions, setEditableQuestions] = useState<QuizQuestion[]>(quizQuestions);

  const currentQ = quizQuestions[currentIdx];
  const hasAnsweredCurrent = selectedAnswers[currentIdx] !== undefined;

  const handleSelect = (optionIdx: number) => {
    if (hasAnsweredCurrent) return;
    romanticAudio.playTenderChime();

    const newAnswers = { ...selectedAnswers, [currentIdx]: optionIdx };
    setSelectedAnswers(newAnswers);

    if (optionIdx === currentQ.correctIndex) {
      triggerLoveBurst();
    }
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResult(true);
      triggerLoveBurst();
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [idx, ans]) => {
    const qIndex = Number(idx);
    return ans === quizQuestions[qIndex]?.correctIndex ? acc + 1 : acc;
  }, 0);

  const handleSaveQuestions = () => {
    onUpdateQuiz(editableQuestions);
    setIsEditing(false);
    handleRestart();
  };

  return (
    <section id="quiz" className="relative py-20 border-t border-stone-200/80 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wider text-rose-700 uppercase">
            <span>Playful Memory Challenge</span>
            <span aria-hidden="true">·</span>
            <span>Test Your Memory</span>
          </div>
          <h2 className="mt-3 font-serif-display text-3xl font-medium text-stone-900 sm:text-4xl">
            How Well Do You Know Our 100 Days?
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            A playful little quiz to celebrate our inside memories, midnight talks, and favorite habits.
          </p>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>{isEditing ? 'Cancel Editing' : 'Customize Quiz Questions'}</span>
            </button>
          </div>
        </div>

        {/* Editing Mode */}
        {isEditing ? (
          <div className="mt-8 space-y-6 rounded-2xl border border-stone-200 bg-[#FAF7F2] p-6 sm:p-8">
            <h3 className="font-serif-display text-lg font-medium text-stone-900">
              Customize Quiz for {partnerName}
            </h3>
            {editableQuestions.map((q, qIndex) => (
              <div key={q.id} className="border-b border-stone-200 pb-4 space-y-3">
                <label className="block text-xs font-semibold text-stone-700">
                  Question {qIndex + 1}
                </label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => {
                    const copy = [...editableQuestions];
                    copy[qIndex].question = e.target.value;
                    setEditableQuestions(copy);
                  }}
                  className="w-full rounded-lg border border-stone-300 bg-white p-2 text-sm"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={q.correctIndex === optIndex}
                        onChange={() => {
                          const copy = [...editableQuestions];
                          copy[qIndex].correctIndex = optIndex;
                          setEditableQuestions(copy);
                        }}
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const copy = [...editableQuestions];
                          copy[qIndex].options[optIndex] = e.target.value;
                          setEditableQuestions(copy);
                        }}
                        className="flex-1 rounded-md border border-stone-300 bg-white p-1.5 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveQuestions}
                className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-5 py-2 text-xs font-semibold text-white hover:bg-stone-800"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Save Quiz Changes</span>
              </button>
            </div>
          </div>
        ) : showResult ? (
          /* Quiz Results Card */
          <div className="mt-10 rounded-3xl border border-rose-200 bg-[#FAF7F2] p-8 text-center shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-700">
              <Award className="h-8 w-8" />
            </div>

            <h3 className="mt-4 font-serif-display text-2xl font-bold text-stone-900 sm:text-3xl">
              Score: {score} of {quizQuestions.length} Correct!
            </h3>

            <p className="mt-3 text-sm text-stone-600 max-w-md mx-auto">
              {score === quizQuestions.length
                ? `100% Perfection! You know every single memory by heart. Here's to 1,000 more days together! ❤️`
                : score >= 3
                ? `You passed with flying colors! Our 100 days have been so full of memories, it's hard to keep track of every little detail.`
                : `A sweet attempt! But the best part is we have endless days ahead to make even more memories.`}
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-semibold text-stone-700 hover:border-stone-400"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Play Again</span>
              </button>
              <a
                href="#letter"
                className="flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-rose-700"
              >
                <Heart className="h-3.5 w-3.5 fill-white" />
                <span>Open Our Love Letter</span>
              </a>
            </div>
          </div>
        ) : (
          /* Active Question Card */
          <div className="mt-10 rounded-3xl border border-stone-200/90 bg-[#FAF7F2] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-200 pb-3">
              <span className="font-medium text-rose-700">
                Question {currentIdx + 1} of {quizQuestions.length}
              </span>
              <span>Score: {score}</span>
            </div>

            <h3 className="mt-5 font-serif-display text-xl font-medium text-stone-900 sm:text-2xl">
              {currentQ.question}
            </h3>

            {/* Answer Options */}
            <div className="mt-6 space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const isCorrect = currentQ.correctIndex === optIdx;

                let cardStyle =
                  'border-stone-200 bg-white text-stone-800 hover:border-stone-400 hover:bg-stone-50';

                if (hasAnsweredCurrent) {
                  if (isCorrect) {
                    cardStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-900';
                  } else if (isSelected) {
                    cardStyle = 'border-rose-400 bg-rose-50/70 text-rose-900';
                  } else {
                    cardStyle = 'border-stone-100 bg-stone-50/50 text-stone-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(optIdx)}
                    disabled={hasAnsweredCurrent}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm transition-all ${cardStyle}`}
                  >
                    <span>{option}</span>
                    {hasAnsweredCurrent && (
                      <div>
                        {isCorrect ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : isSelected ? (
                          <XCircle className="h-4 w-4 text-rose-500" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Note when answered */}
            {hasAnsweredCurrent && (
              <div className="mt-5 rounded-xl border border-stone-200 bg-white p-4 text-xs text-stone-600">
                <span className="font-semibold text-stone-900">Why this is special: </span>
                {currentQ.explanation}
              </div>
            )}

            {/* Next Button */}
            {hasAnsweredCurrent && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  className="rounded-full bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-stone-800"
                >
                  {currentIdx < quizQuestions.length - 1 ? 'Next Question →' : 'See Final Results'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
