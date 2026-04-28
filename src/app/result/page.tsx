'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface QuizResult {
  score: number;
  correct: number;
  total: number;
  category: string;
}

function getFeedback(percentage: number): { emoji: string; text: string; bg: string } {
  if (percentage >= 80) return { emoji: '🏆', text: 'Mükemmel bir sonuç', bg: 'bg-amber-50 border-amber-200' };
  if (percentage >= 60) return { emoji: '👏', text: 'İyi bir performans', bg: 'bg-emerald-50 border-emerald-200' };
  if (percentage >= 40) return { emoji: '💪', text: 'Gelişmeye açık', bg: 'bg-blue-50 border-blue-200' };
  return { emoji: '📚', text: 'Daha çok çalışmalısın', bg: 'bg-stone-50 border-stone-200' };
}

function ResultContent() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [visible, setVisible] = useState(false);
  const resultLoaded = useRef(false);

  useEffect(() => {
    if (resultLoaded.current) return;
    resultLoaded.current = true;

    const stored = sessionStorage.getItem('quizResult');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as QuizResult;
        setTimeout(() => {
          setResult(parsed);
        }, 0);
      } catch {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (result) {
      setTimeout(() => setVisible(true), 100);
    }
  }, [result]);

  if (!result) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-6 h-6 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-stone-400 text-sm">Yükleniyor...</p>
      </div>
    );
  }

  const wrong = result.total - result.correct;
  const percentage = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
  const feedback = getFeedback(percentage);

  return (
    <div className={`max-w-lg mx-auto transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className={`px-8 pt-10 pb-12 text-center ${feedback.bg} border-b`}>
          <div className="text-6xl mb-3">{feedback.emoji}</div>
          <h2 className="text-2xl font-bold text-stone-800 mb-1">Quiz Bitti</h2>
          {result.category && (
            <p className="text-sm text-stone-500">
              {result.category} kategorisi
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Skor</p>
              <p className="text-2xl font-bold text-stone-800">{result.score}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Doğru</p>
              <p className="text-2xl font-bold text-emerald-600">{result.correct}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Yanlış</p>
              <p className="text-2xl font-bold text-rose-600">{wrong}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-stone-500">Başarı</span>
              <span className={`font-semibold ${percentage >= 80 ? 'text-emerald-600' : percentage >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                %{percentage}
              </span>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <p className="text-center text-sm text-stone-500">
            {result.total} sorudan <strong className="text-stone-700">{result.correct}</strong> doğru
          </p>
        </div>

        {/* Feedback */}
        <div className={`mx-8 mb-6 p-4 rounded-xl border text-sm text-center font-medium ${feedback.bg}`}>
          {feedback.text}
        </div>

        {/* Actions */}
        <div className="px-8 pb-8 flex gap-3 justify-center">
          <button
            onClick={() => {
              sessionStorage.removeItem('quizResult');
              router.push('/');
            }}
            className="px-6 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 active:scale-[0.98] transition-all"
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem('quizResult');
              router.back();
            }}
            className="px-6 py-2.5 border border-stone-200 text-sm font-medium rounded-lg hover:bg-stone-50 transition-all"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto text-center py-16">
          <p className="text-stone-400 text-sm">Yükleniyor...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
