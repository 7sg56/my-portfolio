# Sourish Ghosh — Terminal Portfolio

A single-page, terminal-style portfolio. Type `help` to explore.

## Getting Started

- Dev server: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`
- Type check: `npx tsc --noEmit`

## Usage (in the terminal UI)

- `about [summary|details]`
- `projects [list|view <slug|#>]` — e.g., `projects view stamped` or `projects view 1`
- `skills`
- `socials`
- `resume`
- `clear`

## Content & Customization

- Commands and content live in `components/terminal/commands.tsx`.
  - Update your bio, socials, skills, and projects there.
- Terminal UI in `components/terminal/Terminal.tsx`.
  - Prompt is `s0urishg@7sg56:~`.
  - Theme: Catppuccin Mocha.

No tests configured in this repo yet.
