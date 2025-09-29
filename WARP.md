# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js (15.x) with the App Router
- Language: TypeScript (strict, noEmit); React 19
- Styling: Tailwind CSS v4 via PostCSS plugin
- Tooling: Turbopack for dev/build, ESLint (flat config with next/core-web-vitals + next/typescript)
- Monorepo: No (single app)
- Tests: Not configured

Commands
- Install dependencies (package-lock.json present, prefer npm):
  ```bash
  npm ci    # reproducible clean install
  # or, if you’re actively adding/updating deps
  npm install
  ```
- Run the dev server (Turbopack):
  ```bash
  npm run dev
  # app will be available at http://localhost:3000
  ```
- Build and start (Turbopack build):
  ```bash
  npm run build
  npm run start
  ```
- Lint:
  ```bash
  npm run lint                  # lint entire project
  npx eslint app/**/*.tsx       # lint a specific sub-tree
  npx eslint app/page.tsx --fix # auto-fix where possible
  ```
- Type check (no emit):
  ```bash
  npx tsc --noEmit
  ```
- Tests: No test runner is configured in package.json (e.g., Jest/Vitest). There is no command to run a single test at this time.

High-level architecture and structure
- App Router
  - Entry layout: app/layout.tsx defines RootLayout and global HTML/body wrappers.
  - Home route: app/page.tsx renders the landing page; uses next/image assets from public/.
  - Global styles: app/globals.css imports Tailwind v4 ("@tailwindcss/postcss") and defines CSS variables + inline theme. PostCSS configured in postcss.config.mjs.
- Fonts
  - Uses next/font to load Geist and Geist Mono (adds CSS variables used by Tailwind theme tokens).
- TypeScript config (tsconfig.json)
  - Strict, incremental, bundler moduleResolution.
  - Path alias: "@/*" -> project root (import root files as, e.g., `import x from "@/app/page"`).
- ESLint (eslint.config.mjs)
  - Flat config via @eslint/eslintrc FlatCompat, extending Next presets: next/core-web-vitals and next/typescript.
  - Ignores: node_modules, .next, out, build, next-env.d.ts.
- Next config (next.config.ts)
  - Default scaffold; no custom config enabled yet.

Notes from README
- Run the dev server with `npm run dev` and visit http://localhost:3000.
- Edit `app/page.tsx` for live-reload changes.

Absent/implicit items to be aware of
- No API routes, server actions, or middleware are present.
- No test runner or formatter configuration is present.
- No Docker or CI configuration is present.
