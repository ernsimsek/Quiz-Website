'use client';

import type { Question } from '@/types/quiz';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedIndex: number) => void;
  answered: boolean;
  selectedAnswer: number | null;
  questionNumber: number;
  totalQuestions: number;
}

const optionLabels = ['A', 'B', 'C', 'D', 'E'];

export default function QuestionCard({
  question,
  onAnswer,
  answered,
  selectedAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden">
      {/* Progress */}
      <div className="px-6 py-3.5 border-b border-stone-100 bg-stone-50/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-500">
            Soru <span className="font-semibold text-stone-700">{questionNumber}</span> / {totalQuestions}
          </span>
          <span className="text-xs text-stone-400 font-mono">
            %{Math.round(progress)}
          </span>
        </div>
        <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-800 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-stone-800 leading-relaxed mb-8">
          {question.question}
        </h2>

        {/* Options */}
        <div className="grid gap-2.5">
          {question.options.map((option, index) => {
            let borderClass = 'border-stone-200 bg-white hover:border-stone-400';
            let labelBg = 'bg-stone-100 text-stone-600';
            let icon = null;

            if (answered) {
              if (index === question.correctAnswer) {
                borderClass = 'border-emerald-400 bg-emerald-50/50';
                labelBg = 'bg-emerald-500 text-white';
                icon = <span className="text-emerald-600 text-lg">✓</span>;
              } else if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
                borderClass = 'border-rose-400 bg-rose-50/50';
                labelBg = 'bg-rose-500 text-white';
                icon = <span className="text-rose-600 text-lg">✗</span>;
              } else {
                borderClass = 'border-stone-100 bg-stone-50/30 text-stone-400';
                labelBg = 'bg-stone-200 text-stone-400';
              }
            }

            return (
              <button
                key={index}
                onClick={() => !answered && onAnswer(index)}
                disabled={answered}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  answered ? '' : 'hover:bg-stone-50 active:scale-[0.985] cursor-pointer'
                } ${borderClass}`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${labelBg}`}>
                  {optionLabels[index]}
                </span>
                <span className="flex-1 text-[15px] leading-relaxed">{option}</span>
                {icon && <span className="flex-shrink-0">{icon}</span>}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`mt-5 p-4 rounded-xl text-sm font-medium ${
            selectedAnswer === question.correctAnswer
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-700'
          }`}>
            {selectedAnswer === question.correctAnswer ? (
              <span>Doğru!</span>
            ) : (
              <span>
                Doğru cevap: <strong>{optionLabels[question.correctAnswer]}</strong> — {question.options[question.correctAnswer]}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
