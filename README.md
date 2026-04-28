# Quiz Website

A modern quiz application built with Next.js App Router.  
Players choose a category and difficulty, answer timed questions, and see a final score/accuracy summary.

## Features

- Category-based quiz flow
- Three difficulty levels (`easy`, `medium`, `hard`)
- 30-second countdown timer per question
- Lives system and score tracking
- Result page with feedback and percentage success
- Responsive UI with Tailwind CSS

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start local development server
- `npm run lint` - run ESLint checks
- `npm run build` - create production build
- `npm run start` - start production server

## Production Readiness

This project is ready for GitHub + Vercel deployment:

- Production build passes with `npm run build`
- Lint checks pass with `npm run lint`
- Sensitive files are ignored via `.gitignore` (including `.env*` and `.vercel`)

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Keep default build settings for Next.js.
5. Click **Deploy**.

Vercel will automatically create previews for new commits and pull requests.

## Notes

- Quiz content is stored in `src/data/questions.json`.
- Types are defined in `src/types/quiz.ts`.
