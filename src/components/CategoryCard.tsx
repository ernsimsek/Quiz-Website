'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category, Difficulty } from '@/types/quiz';
import DifficultySelector from './DifficultySelector';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const total =
    category.questions.easy.length +
    category.questions.medium.length +
    category.questions.hard.length;

  const handleStart = () => {
    router.push(`/quiz/${category.id}/${difficulty}`);
  };

  return (
    <div
      className="group bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 transition-all duration-300"
      style={{
        boxShadow: hovered
          ? '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)'
          : '0 1px 3px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-3px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300"
          style={{ transform: hovered ? 'scale(1.08)' : 'none' }}>
          {category.icon}
        </div>
        <div className="pt-0.5">
          <h2 className="text-lg font-semibold text-stone-800 leading-tight">
            {category.name}
          </h2>
          <p className="text-sm text-stone-400 mt-0.5">
            {total} soru
          </p>
        </div>
      </div>

      {/* Difficulty counts — quiet, inline */}
      <div className="flex gap-3 mb-5">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => {
          const count = category.questions[diff];
          const isActive = diff === difficulty;
          const colorMap: Record<Difficulty, string> = {
            easy: isActive ? 'text-emerald-600 bg-emerald-50' : 'text-stone-400',
            medium: isActive ? 'text-amber-600 bg-amber-50' : 'text-stone-400',
            hard: isActive ? 'text-rose-600 bg-rose-50' : 'text-stone-400',
          };
          return (
            <div
              key={diff}
              className={`flex-1 text-center py-2 rounded-lg text-xs font-medium transition-all duration-200 ${colorMap[diff]}`}
            >
              {count.length}
            </div>
          );
        })}
      </div>

      {/* Difficulty selector */}
      <div className="mb-5">
        <DifficultySelector value={difficulty} onChange={setDifficulty} />
      </div>

      {/* Start button — warm, understated */}
      <button
        onClick={handleStart}
        className="w-full py-3 px-4 rounded-xl bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 active:bg-stone-900 transition-all duration-200 active:scale-[0.98]"
      >
        Quize Başla →
      </button>
    </div>
  );
}
