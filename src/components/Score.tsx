'use client';

import { useEffect, useState } from 'react';

interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDisplay((prev) => {
        if (prev === score) {
          clearInterval(id);
          return prev;
        }

        const diff = score - prev;
        if (Math.abs(diff) <= 1) {
          clearInterval(id);
          return score;
        }

        const step = Math.max(1, Math.floor(Math.abs(diff) / 4));
        return prev + Math.sign(diff) * step;
      });
    }, 50);

    return () => clearInterval(id);
  }, [score]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">⚡</span>
      <div>
        <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider leading-none block">Skor</span>
        <span className="text-lg font-bold text-stone-800 leading-none">{display}</span>
      </div>
    </div>
  );
}
