# 6M Celebration Page — Standalone Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up an independent 6M celebration site at `C:\~projects\istoria-congrats-6m` by cloning the 5M app, repointing it at `/api/6million`, and replacing the dark theme with the approved Bright & Friendly light/blue education-brand design and tasteful animations.

**Architecture:** Copy the working tree (excluding `node_modules`, `.git`, `dist`, `.superpowers`) into a sibling folder, `git init` it fresh, then redesign the visual layer only — design-system CSS variables, Tailwind animation tokens, and per-component className/markup. No data-flow, routing, or `MilestoneData` changes. Confetti renders only in the celebration state (already gated by the `enabled` prop from `Index.tsx`).

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS, shadcn-ui, @tanstack/react-query.

**Verification note:** This project has no test runner (no `test` script, no test deps). TDD unit tests are not applicable to a pure visual restyle here. The verification gates for every task are `npm run lint` and `npm run build` from the new project folder, plus explicit manual state checks where noted. All commands run from `C:\~projects\istoria-congrats-6m` unless stated otherwise.

---

### Task 1: Create the standalone project copy

**Files:**
- Create: `C:\~projects\istoria-congrats-6m\` (full tree copy)

- [ ] **Step 1: Copy the working tree, excluding build/vcs/scratch dirs**

PowerShell (robocopy exit codes 0–7 are success, not failure):

```powershell
robocopy "C:\~projects\istoria-congrats-bash" "C:\~projects\istoria-congrats-6m" /E /XD node_modules .git dist .superpowers; if ($LASTEXITCODE -lt 8) { "COPY OK ($LASTEXITCODE)" } else { throw "robocopy failed: $LASTEXITCODE" }
```

Expected: `COPY OK (1)` (or 0–7).

- [ ] **Step 2: Verify the copy contents**

```powershell
Test-Path "C:\~projects\istoria-congrats-6m\package.json"; Test-Path "C:\~projects\istoria-congrats-6m\src\pages\Index.tsx"; Test-Path "C:\~projects\istoria-congrats-6m\node_modules"; Test-Path "C:\~projects\istoria-congrats-6m\.git"
```

Expected: `True`, `True`, `False`, `False`.

- [ ] **Step 3: Initialize a fresh independent git repo**

```powershell
cd "C:\~projects\istoria-congrats-6m"; git init; git add -A; git commit -m "Clone 5M celebration app as 6M project baseline`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

Expected: a new repo with one commit. (`.gitignore` already ignores `node_modules`, `dist`, `.superpowers`.)

---

### Task 2: Install dependencies and capture a clean baseline build

**Files:** none (environment only)

- [ ] **Step 1: Install dependencies**

Run: `npm install`
Expected: completes without error; `node_modules` present.

- [ ] **Step 2: Baseline lint**

Run: `npm run lint`
Expected: passes (note any pre-existing warnings; they are not introduced by this work).

- [ ] **Step 3: Baseline build**

Run: `npm run build`
Expected: `vite build` succeeds, `dist/` produced.

- [ ] **Step 4: Commit baseline note (no code change — skip commit if nothing changed)**

If `git status` shows nothing, skip. Otherwise:

```powershell
git add -A; git commit -m "chore: verified baseline install/build`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Point the app at the 6M endpoint

**Files:**
- Modify: `src/pages/Index.tsx` (fetch URL + query key)

- [ ] **Step 1: Swap the endpoint and query key**

In `src/pages/Index.tsx`, change the query:

```tsx
  const { data, isLoading, error } = useQuery<MilestoneData>({
    queryKey: ["milestone-6m"],
    queryFn: async () => {
      const response = await fetch("https://backend.istoria.app/api/6million");
      if (!response.ok) {
        throw new Error("Failed to fetch milestone data");
      }
      return response.json();
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });
```

- [ ] **Step 2: Build to verify no type/syntax break**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```powershell
git add src/pages/Index.tsx; git commit -m "feat: point 6M page at /api/6million endpoint`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Add Poppins font and update document metadata

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Read current `index.html`**

Run: `Get-Content index.html` (note the existing `<title>`, meta tags, and `<head>` structure so the edits below match real content).

- [ ] **Step 2: Add Poppins preconnect + stylesheet inside `<head>`**

Insert immediately before the closing `</head>`:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet" />
```

- [ ] **Step 3: Update the page title and description**

Set `<title>` to `iStoria — 6 Million Users 🎉` and, if a `<meta name="description">` exists, set its content to `Celebrating 6,000,000 learners on iStoria.` (Also update `og:title`/`og:description`/`twitter:*` if present, to the same text.)

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```powershell
git add index.html; git commit -m "feat: load Poppins font and update 6M page metadata`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Replace the design system (light Bright & Friendly theme)

**Files:**
- Modify: `src/index.css` (replace `:root` token block + base body styles)

- [ ] **Step 1: Replace the full contents of `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* iStoria 6M — Bright & Friendly design system. All colors HSL. */

@layer base {
  :root {
    --background: 210 60% 98%;
    --foreground: 217 33% 17%;

    --card: 0 0% 100%;
    --card-foreground: 217 33% 17%;

    --popover: 0 0% 100%;
    --popover-foreground: 217 33% 17%;

    --primary: 211 100% 55%;
    --primary-foreground: 0 0% 100%;

    --secondary: 142 71% 45%;
    --secondary-foreground: 0 0% 100%;

    --muted: 214 32% 95%;
    --muted-foreground: 215 16% 47%;

    --accent: 39 100% 56%;
    --accent-foreground: 217 33% 17%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 211 100% 55%;

    --radius: 1.25rem;

    --celebration-gold: 39 100% 56%;
    --celebration-blue: 211 100% 55%;
    --celebration-purple: 142 71% 45%;
    --celebration-pink: 330 81% 70%;

    --gradient-celebration: linear-gradient(135deg, hsl(var(--celebration-blue)), hsl(var(--celebration-purple)));
    --gradient-hero: linear-gradient(180deg, hsl(210 60% 99%), hsl(214 60% 96%));

    --shadow-glow: 0 0 50px hsl(var(--celebration-blue) / 0.25);
    --shadow-card: 0 24px 60px hsl(211 60% 50% / 0.16);

    --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 217 33% 25%;
    --sidebar-primary: 211 100% 55%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 214 32% 95%;
    --sidebar-accent-foreground: 217 33% 17%;
    --sidebar-border: 214 32% 91%;
    --sidebar-ring: 211 100% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply text-foreground;
    font-family: "Poppins", system-ui, -apple-system, sans-serif;
    background:
      radial-gradient(1200px 600px at 50% -10%, hsl(214 100% 95%) 0%, hsl(210 60% 98%) 45%, hsl(0 0% 100%) 100%);
    background-attachment: fixed;
    min-height: 100vh;
  }
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```powershell
git add src/index.css; git commit -m "feat: replace dark theme with Bright & Friendly light design system`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Add animation tokens to Tailwind config

**Files:**
- Modify: `tailwind.config.ts` (extend `keyframes` and `animation`)

- [ ] **Step 1: Add new keyframes**

In `tailwind.config.ts`, inside `theme.extend.keyframes`, add these alongside the existing entries (keep `float`, `pulse-glow`, `confetti-fall`, `scale-in`, accordion ones):

```ts
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(40px, 30px) scale(1.1)" },
        },
        "bar-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-target, 100%)" },
        },
```

- [ ] **Step 2: Add matching animation utilities**

Inside `theme.extend.animation`, add alongside the existing entries:

```ts
        "fade-rise": "fade-rise 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "blob-drift": "blob-drift 16s ease-in-out infinite",
        "bar-fill": "bar-fill 1.8s cubic-bezier(0.16,1,0.3,1) 0.4s both",
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```powershell
git add tailwind.config.ts; git commit -m "feat: add fade-rise, blob-drift, bar-fill animation tokens`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Add the drifting background decor component

**Files:**
- Create: `src/components/BackgroundDecor.tsx`

- [ ] **Step 1: Create `src/components/BackgroundDecor.tsx`**

```tsx
export const BackgroundDecor = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-[340px] h-[340px] rounded-full bg-celebration-blue/30 blur-[70px] animate-blob-drift" />
      <div className="absolute -bottom-28 -right-20 w-[300px] h-[300px] rounded-full bg-celebration-purple/30 blur-[70px] animate-blob-drift [animation-direction:reverse]" />
    </div>
  );
};
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```powershell
git add src/components/BackgroundDecor.tsx; git commit -m "feat: add drifting background blobs decor`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Restyle the Confetti to the brand palette (celebration-only confirmed)

**Files:**
- Modify: `src/components/Confetti.tsx`

- [ ] **Step 1: Confirm the gate and update colors/shape**

The component already returns `null` unless `enabled`, and `Index.tsx` passes `showCelebration && data.celebration_effects.confetti_enabled` — so it is already celebration-only. Keep that gate. Update the colors array and piece styling to the friendly palette. Replace the `colors` array and the piece `className`:

```tsx
      const colors = [
        "hsl(var(--celebration-blue))",
        "hsl(var(--celebration-gold))",
        "hsl(var(--celebration-purple))",
        "hsl(var(--celebration-pink))",
      ];
```

And change the rendered piece element to softer rounded confetti:

```tsx
        <div
          key={piece.id}
          className="absolute w-2.5 h-3.5 rounded-[2px] animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: piece.color,
          }}
        />
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```powershell
git add src/components/Confetti.tsx; git commit -m "feat: friendly brand-palette confetti (celebration-only)`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Restyle CounterDisplay (blue gradient + eased count-up)

**Files:**
- Modify: `src/components/CounterDisplay.tsx`

- [ ] **Step 1: Replace the returned JSX block**

Keep the existing count-up `useEffect` and `formatNumber`. Replace only the `return (...)`:

```tsx
  return (
    <div className="text-center space-y-3">
      <div className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none bg-gradient-to-br from-primary to-celebration-blue/70 bg-clip-text text-transparent">
        {formatNumber(count)}
      </div>
      <div className="text-lg md:text-2xl text-muted-foreground font-semibold">
        learners and counting
      </div>
    </div>
  );
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```powershell
git add src/components/CounterDisplay.tsx; git commit -m "feat: friendly blue gradient counter`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Restyle WinnerCard (light friendly card)

**Files:**
- Modify: `src/components/WinnerCard.tsx`

- [ ] **Step 1: Replace the `<Card>` wrapper and inner styling**

Replace the returned JSX with the friendly light treatment (keep all `winner`/`prize` field references identical):

```tsx
  return (
    <Card className="p-8 md:p-10 bg-gradient-to-b from-card to-celebration-blue/5 border border-border rounded-[2rem] shadow-[var(--shadow-card)] animate-scale-in">
      <div className="text-center space-y-6">
        <div className="inline-block">
          <Badge className="text-sm px-5 py-2 rounded-full font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            🏆 Milestone Winner
          </Badge>
        </div>

        <Avatar className="w-28 h-28 mx-auto border-4 border-card shadow-[0_10px_26px_hsl(var(--celebration-blue)/0.28)]">
          <AvatarImage src={winner.profile_picture || undefined} />
          <AvatarFallback className="text-4xl font-extrabold bg-celebration-blue/10 text-primary">
            {winner.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            {winner.name}
          </h2>
          <p className="text-lg text-muted-foreground">
            Learner #{winner.user_id.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            📍 {winner.location}
          </p>
        </div>

        <div className="border-t border-dashed border-border pt-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src={prize.prize_image}
              alt={prize.prize_name}
              className="w-16 h-16 object-contain"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold text-foreground">
                {prize.prize_model}
              </h3>
              <p className="text-muted-foreground">{prize.prize_name}</p>
            </div>
          </div>

          <div className="bg-celebration-blue/5 rounded-2xl p-4 mb-4">
            <p className="text-lg text-foreground">
              {prize.announcement_message}
            </p>
          </div>

          <Badge variant="secondary" className="text-sm rounded-full">
            {prize.delivery_status}
          </Badge>
        </div>
      </div>
    </Card>
  );
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```powershell
git add src/components/WinnerCard.tsx; git commit -m "feat: light friendly winner card`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Restyle SocialShare (rounded pill buttons)

**Files:**
- Modify: `src/components/SocialShare.tsx`

- [ ] **Step 1: Replace the returned button row**

Keep `handleCopyLink`/`handleShare` logic unchanged. Replace only the returned JSX:

```tsx
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Button
        onClick={handleCopyLink}
        size="lg"
        variant="outline"
        className="rounded-full border-2 border-border bg-card text-primary hover:bg-celebration-blue/5 font-bold"
      >
        <Copy className="mr-2 h-5 w-5" />
        Copy Link
      </Button>
      <Button
        onClick={handleShare}
        size="lg"
        className="rounded-full font-bold bg-gradient-to-r from-primary to-celebration-blue hover:opacity-90 transition-opacity text-primary-foreground"
      >
        <Share2 className="mr-2 h-5 w-5" />
        Share the News
      </Button>
      <Button
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags.join(",")}`,
            "_blank"
          )
        }
        size="lg"
        variant="outline"
        className="rounded-full border-2 border-border bg-card text-foreground hover:bg-muted font-bold"
      >
        <Twitter className="mr-2 h-5 w-5" />
        Tweet
      </Button>
    </div>
  );
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```powershell
git add src/components/SocialShare.tsx; git commit -m "feat: rounded pill share buttons`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Restyle the Index page (header, hero, stats, progress bar, states, decor + staggered reveal)

**Files:**
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Add the BackgroundDecor import**

At the top with the other imports:

```tsx
import { BackgroundDecor } from "@/components/BackgroundDecor";
```

- [ ] **Step 2: Replace the loading state JSX**

```tsx
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
```

- [ ] **Step 3: Replace the error state JSX**

```tsx
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-card rounded-[2rem] shadow-[var(--shadow-card)] px-10 py-12">
          <h1 className="text-2xl font-extrabold text-foreground mb-2">Couldn’t load the numbers</h1>
          <p className="text-muted-foreground">Please try again in a moment.</p>
        </div>
      </div>
    );
  }
```

- [ ] **Step 4: Replace the main `return (...)` block**

Uses `data.stats.progress_percentage` for the progress bar via a CSS var consumed by the `animate-bar-fill` token from Task 6. Keeps all existing data fields and the `showCelebration` gating exactly.

```tsx
  return (
    <div className="min-h-screen overflow-hidden">
      <BackgroundDecor />
      <Confetti enabled={showCelebration && data.celebration_effects.confetti_enabled} />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <img
              src={iStoriaLogo}
              alt="iStoria"
              className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-2 animate-float drop-shadow-[0_14px_30px_hsl(var(--celebration-blue)/0.3)]"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground animate-fade-rise">
              iStoria reached{" "}
              <span className="text-primary">6 Million</span>
            </h1>
            <div className="animate-fade-rise [animation-delay:120ms]">
              <span className="inline-block px-5 py-2 rounded-full bg-celebration-blue/10 text-primary font-semibold text-sm md:text-base animate-pulse-glow">
                🎉 {showCelebration
                  ? data.celebration_effects.special_announcement
                  : "Thank you for learning with us"}
              </span>
            </div>
          </div>

          {/* Counter + progress */}
          <div className="bg-card rounded-[2.5rem] shadow-[var(--shadow-card)] px-6 py-12 md:py-16 animate-fade-rise [animation-delay:220ms]">
            <CounterDisplay targetCount={displayCount} />
            <div className="max-w-xl mx-auto mt-8">
              <div className="h-3.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary animate-bar-fill"
                  style={{ ["--bar-target" as string]: `${Math.min(data.stats.progress_percentage, 100)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center font-medium">
                on the way to <span className="text-foreground font-bold">6,000,000</span> learners worldwide
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <div className="bg-card rounded-3xl p-6 text-center shadow-[0_12px_30px_hsl(217_33%_17%/0.07)] transition-transform duration-200 hover:-translate-y-1.5 animate-fade-rise [animation-delay:300ms]">
              <div className="text-3xl font-extrabold text-primary">
                {data.stats.progress_percentage}%
              </div>
              <div className="text-muted-foreground mt-2 font-semibold text-sm">Progress</div>
            </div>
            <div className="bg-card rounded-3xl p-6 text-center shadow-[0_12px_30px_hsl(217_33%_17%/0.07)] transition-transform duration-200 hover:-translate-y-1.5 animate-fade-rise [animation-delay:380ms]">
              <div className="text-3xl font-extrabold text-secondary">
                +{data.growth_rate.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-2 font-semibold text-sm">Growth Rate</div>
            </div>
            <div className="bg-card rounded-3xl p-6 text-center shadow-[0_12px_30px_hsl(217_33%_17%/0.07)] transition-transform duration-200 hover:-translate-y-1.5 animate-fade-rise [animation-delay:460ms]">
              <div className="text-3xl font-extrabold text-accent">
                {data.stats.average_daily_growth.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-2 font-semibold text-sm">Daily Average</div>
            </div>
          </div>

          {/* Winner Card */}
          {showCelebration && data.winner_info && data.prize_info && (
            <div className="animate-scale-in">
              <WinnerCard winner={data.winner_info} prize={data.prize_info} />
            </div>
          )}

          {/* Social Share */}
          {showCelebration && (
            <div className="animate-scale-in">
              <SocialShare
                shareUrl={data.social_sharing.share_url}
                shareText={data.social_sharing.share_text}
                hashtags={data.social_sharing.hashtags}
              />
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-6">
            Last updated: {new Date(data.last_updated).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
```

- [ ] **Step 5: Lint and build**

Run: `npm run lint`
Expected: passes (no new errors).
Run: `npm run build`
Expected: succeeds.

- [ ] **Step 6: Commit**

```powershell
git add src/pages/Index.tsx; git commit -m "feat: redesign 6M page — header, hero, progress, stats, states`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 13: Update README for the 6M project

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace README content**

```markdown
# iStoria — 6 Million Users 🎉

A standalone celebration site for iStoria reaching 6,000,000 learners.

Live milestone data is polled from `https://backend.istoria.app/api/6million`
every 5 seconds. The page handles both the approaching state (counting up
toward 6M with a live progress bar) and the celebration state (winner, prize,
and confetti once the milestone is reached).

## Tech

- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui
- @tanstack/react-query

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Lint

```sh
npm run lint
```
```

- [ ] **Step 2: Commit**

```powershell
git add README.md; git commit -m "docs: README for the 6M celebration project`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 14: Final verification (both states + responsive)

**Files:** none (verification only)

- [ ] **Step 1: Clean lint + build**

Run: `npm run lint` → passes.
Run: `npm run build` → succeeds.

- [ ] **Step 2: Manual approaching-state check**

Run: `npm run dev`, open the local URL. With the live endpoint returning `milestone_reached: false` (or unreachable → loading/error), confirm: light theme, floating logo, headline, "Thank you for learning with us" pill, counter + progress bar, three stat cards lifting on hover, drifting blobs, NO confetti, NO winner/share. Note result.

- [ ] **Step 3: Manual celebration-state check**

Temporarily force celebration by editing the `useEffect` in `src/pages/Index.tsx` to `setShowCelebration(true)` (or mock `data`), reload, confirm: announcement text, winner + prize card, share pill buttons, confetti falling in brand colors. **Revert the temporary change.** Confirm `git status` is clean after revert.

- [ ] **Step 4: Responsive check**

In dev tools, check mobile (~390px) and desktop (~1280px): single-column → 3-column stats, no overflow, readable type.

- [ ] **Step 5: Final commit if anything changed**

```powershell
git add -A; git commit -m "chore: final verification pass for 6M redesign`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```
(Skip if `git status` is clean.)

---

## Self-Review

**1. Spec coverage:**
- Standalone copy at `C:\~projects\istoria-congrats-6m` + fresh git → Task 1 ✓
- `/api/6million`, target 6,000,000 (API-driven), same shape → Task 3 ✓
- Light/blue/friendly system, Poppins, gradient bg, blobs → Tasks 4, 5, 7 ✓
- Animation tokens (fade-rise/blob-drift/bar-fill) + float/pulse/scale reused → Task 6, used in 12 ✓
- Sections: header → counter+progress → stats → winner → share → footer → Task 12 ✓
- Both approaching & celebration states; loading/error → Task 12 ✓
- Confetti celebration-only (brand palette) → Task 8 + gating preserved in Task 12 ✓
- README update → Task 13 ✓
- Verification (install/build/lint, both states, responsive) → Tasks 2, 14 ✓

**2. Placeholder scan:** No TBD/TODO; every code step has full code. ✓

**3. Type consistency:** No `MilestoneData` shape change. `--bar-target` set in Task 12 matches the `var(--bar-target, 100%)` consumed by `bar-fill` in Task 6. `BackgroundDecor` created in Task 7 matches the import/use in Task 12. Confetti gate prop (`enabled`) unchanged between Task 8 and Task 12. ✓

No gaps found.
```
