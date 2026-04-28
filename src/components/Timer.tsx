'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

export default function Timer({ duration, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const isLow = timeLeft <= 10;

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="flex items-center gap-3">
      {/* Minimal SVG ring */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#e7e5e4" stroke-width="2.5" />
          <circle
            cx="20" cy="20" r="16"
            fill="none"
            stroke={isLow ? '#dc2626' : '#292524'}
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-dasharray={2 * Math.PI * 16}
            stroke-dashoffset={2 * Math.PI * 16 * (1 - percentage / 100)}
            className="transition-all duration-1000 linear"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
          isLow ? 'text-red-500' : 'text-stone-700'
        }`}>
          {timeLeft}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-xs font-medium ${isLow ? 'text-red-500' : 'text-stone-400'}`}>
            {isLow ? 'Süre!' : 'Kalan'}
          </span>
        </div>
        <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 linear ${
              isLow ? 'bg-red-500' : 'bg-stone-800'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
