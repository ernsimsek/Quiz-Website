'use client';

interface LivesProps {
  lives: number;
  maxLives?: number;
}

export default function Lives({ lives, maxLives = 3 }: LivesProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Can</span>
      <div className="flex gap-1">
        {Array.from({ length: maxLives }, (_, i) => (
          <span
            key={i}
            className={`text-xl transition-all duration-300 ${
              i < lives ? 'opacity-100' : 'opacity-20 grayscale'
            }`}
          >
            {i < lives ? '♥' : '♡'}
          </span>
        ))}
      </div>
    </div>
  );
}
