# 6M Celebration Page — Standalone Redesign (Design Spec)

**Date:** 2026-05-19
**Status:** Approved
**Author:** Brainstorm session (visual companion)

## Summary

Create a new, fully independent project that celebrates iStoria reaching
**6,000,000** users, by cloning the existing 5M celebration app into a separate
folder and replacing its visual layer with a bright, friendly, education-brand
design with tasteful animations. No data-flow or architectural rewrite — this is
a visual redesign on top of the proven 5M scaffold.

## Goals

- A standalone codebase/deploy at `C:\~projects\istoria-congrats-6m`,
  independent of the 5M project (separate git history).
- Data sourced from `https://backend.istoria.app/api/6million`, milestone
  target `6,000,000`, same JSON response shape as the 5M endpoint.
- A redesigned page that is light, on-brand (iStoria bright blue), friendly,
  trustworthy, and celebratory — appropriate for an education app.
- "Fancy" but wholesome animations.
- Correctly handle both the **approaching** state (counting up toward 6M) and
  the **celebration** state (`milestone_reached === true`).

## Non-Goals

- No backend changes.
- No change to the `MilestoneData` shape, react-query polling, or the
  count-up / celebration state machine.
- No new routes or multi-page structure (single route `/`).
- No unrelated refactoring of shadcn UI primitives.

## Approach

Copy the current project into `C:\~projects\istoria-congrats-6m`, excluding
`node_modules`, `dist`, `.git`, and `.superpowers`. Run `git init` in the new
folder for a fresh, independent history. Restyle in place.

Rejected alternatives: a fresh `npm create vite` scaffold (more work/risk, no
upside); a git branch/worktree (user explicitly wants a separate independent
codebase).

## Architecture

Unchanged stack: Vite + React 18 + TypeScript + Tailwind + shadcn-ui SPA,
single route `/` → `src/pages/Index.tsx`.

- **Endpoint:** `Index.tsx` fetch URL → `https://backend.istoria.app/api/6million`.
- **Target milestone:** driven by API `target_milestone` (expected `6000000`);
  no hardcoded milestone logic changes.
- **State machine:** existing `displayCount` count-up effect and
  `showCelebration` flag are kept verbatim.

## Visual Design System

Replaces the dark theme in `src/index.css` (CSS variables) and animation tokens
in `tailwind.config.ts`.

- **Background:** `radial-gradient` soft blue → white
  (`#eaf2ff → #f4f8ff → #fdfdff`).
- **Palette:** primary brand blue `#1a87ff` (dark `#1565d8`); ink `#1e293b`;
  muted `#64748b`; accents gold `#ffb020`, green `#22c55e`, pink `#f472b6`.
  All defined as HSL CSS variables per the existing design-system convention.
- **Typography:** Poppins (weights 400/600/700/800) via Google Fonts `<link>`
  in `index.html`; applied as the base font family.
- **Shape & depth:** large border radii, soft blue-tinted shadows, pill buttons.
- **Decor:** two large, slowly drifting blurred background blobs (fixed,
  behind content, non-interactive).

## Components (restyle in place — no API changes)

- **Header (`Index.tsx`):** floating logo tile, bold headline
  ("iStoria reached 6 Million"), pulsing thank-you pill; celebration
  announcement when milestone reached.
- **`CounterDisplay`:** blue gradient number, eased spring count-up, progress
  bar filling toward the target.
- **Stats trio (`Index.tsx`):** soft white rounded cards, colored figures
  (blue / green / gold), hover lift.
- **`WinnerCard`:** light friendly card, gradient badge, soft avatar ring,
  dashed divider, prize message.
- **`SocialShare`:** rounded pill buttons — primary gradient + outline
  variants; same copy/share/tweet behavior.
- **`Confetti`:** brand-palette pieces; rendered **only** in the celebration
  state (`showCelebration && data.celebration_effects.confetti_enabled`).
  Never always-on.

## Animation Spec

Implemented as Tailwind keyframes/utilities (extending `tailwind.config.ts`):

- Eased/spring count-up on the hero number.
- Staggered fade-rise on mount for sections (delays `d1..d6`).
- Progress bar fill on load.
- Floating logo (gentle vertical loop).
- Badge glow pulse.
- Card hover lift (stats cards).
- Slow background blob drift.
- **Confetti — celebration state only.**

## States

- **Approaching:** counter ticks toward 6M; progress bar + stats visible;
  no winner card, no share row, no confetti.
- **Celebration** (`milestone_reached === true`): special announcement,
  winner + prize card, share row, confetti.
- **Loading:** friendly centered spinner on the light background.
- **Error:** friendly centered card ("Error Loading Data").

## Verification

- `npm install` succeeds in the new folder.
- `npm run build` and `npm run lint` are clean.
- Manual check of both states by temporarily forcing
  `milestone_reached` true/false against mocked data.
- Responsive sanity check at mobile and desktop widths.
- New folder has its own `git` repo with an initial commit.

## Risks / Notes

- The `/api/6million` endpoint is assumed to exist with the same shape as
  `/api/5million`. If unavailable at build time, the page still renders
  loading/error states gracefully; no code change needed when it goes live.
- README still references Lovable boilerplate; it will be updated to describe
  the 6M project but no Lovable integration is added or removed.
