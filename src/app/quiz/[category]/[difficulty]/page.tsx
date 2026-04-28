'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import data from '@/data/questions.json';
import type { QuizData, Difficulty, Question } from '@/types/quiz';
import QuestionCard from '@/components/QuestionCard';
import Timer from '@/components/Timer';
import Lives from '@/components/Lives';
import Score from '@/components/Score';

const quizData = data as QuizData;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const difficultyLabels: Record<Difficulty, { label: string; tag: string }> = {
  easy: { label: 'Kolay', tag: 'bg-emerald-50 text-emerald-700' },
  medium: { label: 'Orta', tag: 'bg-amber-50 text-amber-700' },
  hard: { label: 'Zor', tag: 'bg-rose-50 text-rose-700' },
};

const difficultyMultiplier: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.category as string;
  const difficulty = params.difficulty as Difficulty;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timerKey, setTimerKey] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  const livesRef = useRef(lives);
  const scoreRef = useRef(score);
  const correctCountRef = useRef(correctCount);
  const totalAnsweredRef = useRef(totalAnswered);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { correctCountRef.current = correctCount; }, [correctCount]);
  useEffect(() => { totalAnsweredRef.current = totalAnswered; }, [totalAnswered]);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

  const category = quizData.categories.find((c) => c.id === categoryId);
  const diffInfo = difficultyLabels[difficulty];
  const questions = useMemo<Question[]>(
    () => (category && difficulty ? shuffleArray(category.questions[difficulty]) : []),
    [category, difficulty]
  );

  const endQuiz = useCallback(() => {
    setIsEnding(true);
    const result = {
      score: scoreRef.current,
      correct: correctCountRef.current,
      total: totalAnsweredRef.current,
      category: category?.name || '',
    };
    sessionStorage.setItem('quizResult', JSON.stringify(result));
    setTimeout(() => {
      router.push('/result');
    }, 1500);
  }, [router, category?.name]);

  const moveToNextQuestion = useCallback(() => {
    if (livesRef.current <= 0) {
      endQuiz();
      return;
    }

    if (currentIndexRef.current < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setTimerKey((prev) => prev + 1);
    } else {
      endQuiz();
    }
  }, [questions.length, endQuiz]);

  const handleTimeUp = useCallback(() => {
    if (answered) return;
    setAnswered(true);
    setLives((prev) => prev - 1);
    setTotalAnswered((prev) => prev + 1);

    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  }, [answered, moveToNextQuestion]);

  const handleAnswer = (selectedIndex: number) => {
    if (answered) return;

    setSelectedAnswer(selectedIndex);
    setAnswered(true);
    setTotalAnswered((prev) => prev + 1);

    const isCorrect = selectedIndex === questions[currentIndex].correctAnswer;
    const newLives = isCorrect ? lives : lives - 1;

    if (isCorrect) {
      const points = 10 * difficultyMultiplier[difficulty] + 30;
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
    }
    setLives(newLives);

    setTimeout(() => {
      if (newLives <= 0) {
        endQuiz();
        return;
      }
      moveToNextQuestion();
    }, 2000);
  };

  if (!category) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <p className="text-5xl mb-4">?</p>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">Kategori bulunamadı</h2>
        <button onClick={() => router.push('/')} className="mt-6 text-sm text-amber-700 underline underline-offset-4">
          ← Ana sayfaya dön
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-500">Yükleniyor...</p>
      </div>
    );
  }

  if (isEnding) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <p className="text-5xl mb-4">...</p>
        <p className="text-stone-500">Sonuçlar hesaplanıyor</p>
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin mx-auto mt-4" />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <div>
            <h2 className="font-semibold text-stone-800">{category.name}</h2>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${diffInfo.tag}`}>
              {diffInfo.label}
            </span>
          </div>
        </div>
        <Score score={score} />
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 bg-white border border-stone-200/80 rounded-xl px-5 py-3 mb-6">
        <Timer key={timerKey} duration={30} onTimeUp={handleTimeUp} />
        <div className="w-px h-8 bg-stone-200" />
        <Lives lives={lives} />
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        answered={answered}
        selectedAnswer={selectedAnswer}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
      />

      {/* Footer info */}
      <div className="mt-5 flex items-center justify-center gap-4 text-xs text-stone-400">
        <span>Doğru: <strong className="text-emerald-600">{correctCount}</strong></span>
        <span className="w-px h-3 bg-stone-200" />
        <span>Yanlış: <strong className="text-rose-600">{totalAnswered - correctCount}</strong></span>
        <span className="w-px h-3 bg-stone-200" />
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>
    </div>
  );
}
