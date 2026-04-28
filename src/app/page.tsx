import type { Metadata } from "next";
import data from "@/data/questions.json";
import type { QuizData } from "@/types/quiz";
import CategoryCard from "@/components/CategoryCard";

export const metadata: Metadata = {
  title: "Ana Sayfa | Bilgi Yarışması",
  description: "Kategori seçin ve quize başlayın!",
};

const quizData = data as QuizData;

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-2xl mx-auto text-center py-12 sm:py-20">
        <p className="text-sm font-medium text-amber-700 tracking-wide uppercase mb-4 animate-reveal">
          Bilgi Yarışması
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-stone-800 tracking-tight leading-[1.1] mb-6 animate-reveal stagger-1">
          Bilgini
          <br />
          <span className="text-amber-700">ölç, geliştir</span>
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed max-w-lg mx-auto mb-10 animate-reveal stagger-2">
          {quizData.categories.length} kategori,{' '}
          {quizData.categories.reduce(
            (sum, c) => sum + c.questions.easy.length + c.questions.medium.length + c.questions.hard.length,
            0
          )}{' '}
          soru. Zorluk seç, başla.
        </p>

        {/* Inline stats — understated */}
        <div className="flex items-center justify-center gap-6 text-sm text-stone-400 animate-reveal stagger-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            Kolay
          </span>
          <span className="w-px h-3 bg-stone-200" />
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-amber-500" />
            Orta
          </span>
          <span className="w-px h-3 bg-stone-200" />
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-rose-500" />
            Zor
          </span>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {quizData.categories.map((category, i) => (
            <div
              key={category.id}
              className={`animate-reveal stagger-${Math.min(i + 1, 6)}`}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom note */}
      <section className="text-center mt-16 sm:mt-24 pb-8 animate-reveal stagger-6">
        <div className="inline-flex items-center gap-2 text-xs text-stone-400 bg-stone-100/60 px-4 py-2 rounded-full">
          <span>Her kategoride 3 zorluk seviyesi</span>
          <span className="w-px h-3 bg-stone-300" />
          <span>Toplam {quizData.categories.length * 3} farklı deneyim</span>
        </div>
      </section>
    </div>
  );
}
