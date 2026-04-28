'use client';

import type { Difficulty } from '@/types/quiz';

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficulties: {
  value: Difficulty;
  label: string;
  emoji: string;
  activeBg: string;
  activeText: string;
}[] = [
  { value: 'easy', label: 'Kolay', emoji: '↓', activeBg: 'bg-emerald-600', activeText: 'text-white' },
  { value: 'medium', label: 'Orta', emoji: '→', activeBg: 'bg-amber-600', activeText: 'text-white' },
  { value: 'hard', label: 'Zor', emoji: '↑', activeBg: 'bg-rose-600', activeText: 'text-white' },
];

export default function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Zorluk seviyesi">
      {difficulties.map((diff) => {
        const isActive = value === diff.value;
        return (
          <button
            key={diff.value}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(diff.value)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
              isActive
                ? `${diff.activeBg} ${diff.activeText} border-transparent shadow-sm`
                : 'border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700 bg-white'
            }`}
          >
            <span className="text-xs">{diff.emoji}</span>
            <span>{diff.label}</span>
          </button>
        );
      })}
    </div>
  );
}
