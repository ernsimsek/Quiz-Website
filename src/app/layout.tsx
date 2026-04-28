import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bilgi Yarışması",
  description: "Kategorilerle bilgini ölç, kendini geliştir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fafaf9]">
        <header className="border-b border-stone-200/80 bg-[#fafaf9]/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-5 sm:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2.5">
                <span className="text-xl" style={{ fontFamily: 'serif' }}>Q</span>
                <h1 className="text-base font-semibold tracking-tight text-stone-800">
                  Bilgi <span className="text-amber-700">Yarışması</span>
                </h1>
              </div>
              <nav>
                <Link
                  href="/"
                  className="text-sm text-stone-500 hover:text-stone-800 transition-colors px-3 py-1"
                >
                  Ana Sayfa
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-5 sm:px-8 py-10 sm:py-16 max-w-5xl">
          {children}
        </main>

        <footer className="border-t border-stone-200/60 mt-auto">
          <div className="container mx-auto px-5 sm:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-stone-400">
                © 2026 — Bilgini ölç, kendini geliştir
              </p>
              <p className="text-xs text-stone-300">
                soruları çöz, öğren
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
