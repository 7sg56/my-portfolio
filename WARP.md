# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project: my-portfolio (Next.js + TypeScript + Tailwind CSS)

Commands
- Use npm in this repo (package-lock.json is present).
- Dev server (Turbopack):
  - npm run dev
  - Opens on http://localhost:3000
- Production build (Turbopack):
  - npm run build
- Start production server:
  - npm run start
- Lint (Flat config, Next presets):
  - npm run lint
- Type check (no script; uses local TypeScript):
  - npx tsc --noEmit
- Tests: not configured in this repo. If tests are added later, document commands here (e.g., vitest/jest and how to run a single test).

Architecture overview
- Runtime and framework
  - Next.js 15 with the App Router (app/ directory). React 19, TypeScript.
  - Turbopack is enabled in dev and build scripts.
  - Tailwind CSS v4 via PostCSS plugin (@tailwindcss/postcss) with global styles in app/globals.css. A custom animation (spotlight) is defined via @theme/@keyframes.
- Routing and layout
  - app/layout.tsx: Global HTML shell, font setup with next/font (Inter) using CSS variable --font-inter, and Metadata (title/description).
  - app/page.tsx: Home route; renders a top-level <main> wrapper and the Hero component.
- UI composition
  - components/hero.tsx: Section wrapper that composes multiple Spotlight layers for visual effect.
  - components/ui/Spotlight.tsx: Stateless SVG component rendering a blurred ellipse spotlight. Accepts className and fill; composes class names via cn().
- Utilities
  - lib/utils.ts: cn(...inputs) helper combines clsx and tailwind-merge to build Tailwind-friendly className strings.
- Configuration
  - tsconfig.json: strict, noEmit, bundler moduleResolution, path alias "@/*" -> repo root (import paths like "@/components/hero").
  - eslint.config.mjs: ESLint v9 FlatConfig using next/core-web-vitals and next/typescript presets; ignores common build artifacts (node_modules, .next, out, etc.).
  - next.config.ts: present with no custom options.
  - postcss.config.mjs: Tailwind CSS plugin enabled.
- Assets
  - public/: SVG assets available for use; not all are referenced yet.

Notes from README
- Start the dev server with npm run dev and open http://localhost:3000.
- The homepage content lives in app/page.tsx; editing it will hot-reload in dev.
