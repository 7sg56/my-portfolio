# Sourish Ghosh — Terminal Portfolio

A single-page, terminal-style portfolio. Type `help` to explore.

## ⚠️ Important Notes

**This is NOT the final product** - This portfolio is currently in development and is not mobile-friendly. Please view on desktop for the best experience.

### Mobile Users
- This portfolio is **not optimized for mobile devices**
- Mobile users will see a warning notice
- For the best experience, please view on desktop/laptop
- Mobile responsiveness will be added in future updates

### Final Product
- The final, production-ready version will be available in a separate repository
- This current version is for development and testing purposes
- Final product will include mobile responsiveness and additional features

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

## Development Status

- ✅ Desktop experience optimized
- ❌ Mobile responsiveness (coming soon)
- ✅ Terminal-style UI
- ✅ Interactive commands
- ✅ About window with tabs
- 🔄 Additional features in development

No tests configured in this repo yet.
