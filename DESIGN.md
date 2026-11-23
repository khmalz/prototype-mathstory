# DESIGN.md - RumusJadiCerita PBK

## Context (from discovery)

- Artifact type: interactive educational workbench and guided presentation app (Operate mode)
- Positioning: modern, approachable, smooth classroom workbench
- Audience: Indonesian middle and elementary math teachers plus students (classroom projector and laptop/mobile) | Primary action: generate, audit, curate, and verify personalized math word problems safely offline
- Adjectives: modern, smooth, approachable, tactile
- Visual word translations:
  - modern -> Bricolage Grotesque display headings paired with IBM Plex Sans UI and crisp tonal surface layering
  - smooth -> concentric border-radius hierarchy (`16px` panels, `12px` inner wells, `10px` controls, `9999px` pills) replacing sharp table cell borders
  - approachable -> mineral paper canvas (`#F5F7F6`) with soft elevated surfaces (`#FCFEFD`), open inner sections, and ample breathing room
  - tactile -> crisp multi-layered subtle elevation on active surfaces, `:active { transform: scale(0.97) }` press feedback, and Deep Petrol Teal accent
- Aesthetic essence (3 words): tactile, rounded, calm
- Single-minded proposition: make symbolic math verification feel as inviting and effortless as modern software without losing classroom readability or dashboard clarity
- Mode: light primary workbench plus smooth charcoal-spruce dark code surface for Modul B | Density: balanced
- Constraints: plain static HTML/CSS/JS running offline via `file://` without build tools, KaTeX 0.19.1 programmatic rendering only, WCAG 2.2 AA contrast, semi-casual Indonesian UI copy, preserve every existing DOM ID and PRD requirement

## Aesthetic

- Direction: Lembar Modern (Emil Kowalski tactile engineering + modern soft-rounded Operate UI layered onto OKLCH Deep Petrol Teal)
- Defining trait: concentric rounded surfaces using tonal surface steps and crisp micro-elevation rather than hard wireframe grid lines or nested card borders
- Signature move: floating pill-track 5-stage workflow bar (`stepper-inner` `14px` outer track with `4px` padding and `10px` elevated white active pill + Deep Petrol step index), paired with a `12px`-rounded serene paper specimen sheet for the generated word problem

## Typography

- Display: Bricolage Grotesque (opsz 12..96) | source: Google Fonts (fallback Segoe UI, sans-serif) | license: OFL
- Body: IBM Plex Sans | source: Google Fonts (fallback Segoe UI, sans-serif) | license: OFL
- Mono: IBM Plex Mono | source: Google Fonts (fallback Cascadia Code, Consolas, monospace) | license: OFL
- Scale: ratio 1.25 Major Third (compact Operate adjustments), base 16px

| step | size | line-height | use |
| --- | --- | --- | --- |
| h1 | 28px (1.75rem) | 1.15 | header masthead title |
| h2 | 20px (1.25rem) | 1.25 | panel titles and student exercise heading |
| h3 | 16px (1rem) | 1.35 | subsection and companion headings |
| problem | 19px (1.1875rem) | 1.72 | student reading passage and specimen preview |
| body | 16px (1rem) | 1.60 | standard UI text and form inputs |
| small | 14px (0.875rem) | 1.50 | labels, buttons, reasons, meta |
| micro | 12px (0.75rem) | 1.40 | module codes, compact status badges, step indices |

- Weights: 400 regular, 500 medium, 600 semibold, 700 bold (never switch font-weight between hover/selected states) | Measure: 65ch to 72ch on problem copy | Tracking notes: `-0.02em` on Bricolage Grotesque `h1`, `-0.015em` on `h2`, `0` on body, `+0.06em` on uppercase monospace module codes

## Color

- Strategy: cool mineral paper neutrals paired with Deep Petrol Teal (OKLCH H=202), avoiding the AI default indigo/violet band (250 to 320), generic `#1D4ED8`, and warm cream tropes. Browser chrome (`::selection`, `caret-color`, scrollbar thumb) inherits the same Deep Petrol Teal ink.
- Distribution: 60% mineral paper neutrals / 30% deep slate ink and soft layered structure / 10% Deep Petrol Teal accent
- Palette (role -> OKLCH | hex):
  - bg: `oklch(0.974 0.004 180)` | `#F5F7F6`
  - surface: `oklch(0.996 0.002 180)` | `#FCFEFD`
  - subtle: `oklch(0.948 0.006 185)` | `#EBF0EF`
  - fg: `oklch(0.215 0.012 205)` | `#141D1E`
  - fg-secondary: `oklch(0.365 0.015 205)` | `#344446`
  - muted: `oklch(0.478 0.016 205)` | `#516365`
  - border: `oklch(0.865 0.009 185)` | `#CED8D6`
  - border-strong: `oklch(0.618 0.015 188)` | `#7B8C8A`
  - accent: `oklch(0.45 0.088 202)` | `#0E5E6A`
  - accent-hover: `oklch(0.38 0.078 202)` | `#094A54`
  - accent-fg: `oklch(0.985 0.003 198)` | `#F8FAFA`
  - accent-soft: `oklch(0.945 0.022 198)` | `#E3F1F2`
  - accent-soft-fg: `oklch(0.355 0.072 202)` | `#0A444D`
  - accent-border: `oklch(0.76 0.048 198)` | `#8EBEC4`
  - pass bg/border/fg: `oklch(0.955 0.020 152)` `#EBF5EE` / `oklch(0.51 0.105 152)` `#23784C` / `oklch(0.37 0.082 152)` `#154D31`
  - fail bg/border/fg: `oklch(0.952 0.018 24)` `#FBEFED` / `oklch(0.50 0.155 24)` `#B8382B` / `oklch(0.37 0.125 24)` `#7C2219`
  - warn bg/border/fg: `oklch(0.96 0.026 78)` `#FBF4E4` / `oklch(0.56 0.125 68)` `#A86812` / `oklch(0.39 0.095 66)` `#6B3F06`
- Modul B dark code surface overrides:
  - code-bg: `oklch(0.23 0.012 205)` | `#171F21`
  - code-elevated: `oklch(0.275 0.013 205)` | `#1F292B`
  - code-well: `oklch(0.195 0.011 205)` | `#12181A`
  - code-border: `oklch(0.365 0.016 205)` | `#324043`
  - code-fg: `oklch(0.945 0.007 195)` | `#E8F0F0`
  - code-muted: `oklch(0.755 0.015 198)` | `#A4B4B6`
  - code-accent: `oklch(0.77 0.085 198)` | `#63C5CE`

## Spacing, radius, shadow

- Spacing base: 4px, scale tokens in `0.25rem` increments (`4px, 8px, 12px, 16px, 20px, 24px`)
- Radius (concentric system, `R_outer = R_inner + padding`):
  - `--radius-panel: 16px` (main workbench panels, dark Modul B surface, student card)
  - `--radius-inner: 12px` (inner tonal summary strips, specimen box, agent matrix, refinement bar, formula/code blocks, banners, segmented outer tracks)
  - `--radius-control: 10px` (buttons, inputs, selects, textareas, stepper buttons inside 14px-rounded 4px-padded track)
  - `--radius-pill: 9999px` (presets, quick move chips, compact status badges, PBK mark)
- Shadow approach: single crisp soft-ring elevation (`0 0 0 1px rgba(20, 29, 30, 0.07), 0 2px 6px rgba(14, 24, 26, 0.03), 0 10px 26px -10px rgba(14, 24, 26, 0.07)`) on top-level floating panels instead of stacking heavy 1px opaque borders under wide shadows. Inner tracks lift active pills cleanly with `0 1px 3px rgba(14, 24, 26, 0.08), 0 0 0 1px rgba(14, 24, 26, 0.06)`.

## Layout and composition

- Grid: 1280px max-width studio shell (`guided` shows asymmetric 2-column working stage + companion proofsheet; `overview` shows balanced 2-column 4-module workbench)
- Spacing rhythm: tight within form groups (`0.75rem` grid gaps), structured section dividers, comfortable breathing room inside panels (`1.5rem` desktop, `1.05rem` mobile)
- Signature layout move: unboxed inner parameter groups (`param-fieldset`), calm rounded `12px` agent rows & 2x2 matrix cells (`8px` gap / `10px` rounded soft cards or crisp `12px` unified frame), and pill-track workflow rail eliminating blocky rectangular borders
- Density: balanced | Scanning: F-pattern header/rail into left-to-right workbench + companion sheet
- Responsive: desktop-first breakpoints at `1023px` (single column stages, 3+2 wrapped rounded stepper pills) and `639px` (single-column form grids, 2+2+1 full-width rounded stepper pills, stacked navigation footer)

## Components and states

- Button hierarchy: one primary solid Deep Petrol CTA per view (`.btn-primary`, `.btn-accent`) with subtle top specular inset sheen (`inset 0 1px 0 rgba(255, 255, 255, 0.18)`), high-contrast slate-ink step forward (`.btn-nav-next`), secondary crisp outlined/tonal controls (`.btn-secondary`, `.btn-chip`), tertiary ghost buttons (`.btn-ghost`), tactile `:active { transform: scale(0.97) }` press feedback without changing `font-weight`
- Inputs: visible `<label>` above every control (`16px` input text to avoid iOS zoom), smooth `10px` corners, clear hover, focus dual-ring, and tabular numerals on numeric fields
- Tables/Matrices: Modul C uses cleanly rounded `12px` agent cells in a `2x2` grid (`0.75rem` gap) where passing cards stay clean soft tint/paper and failing cards carry soft fail-tint + `GAGAL` pill
- Banners & Feedback: `12px` rounded full-border semantic banners with leading SVG icon, never `border-left-width: 4px`
- Focus ring: `outline: 2px solid transparent; box-shadow: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-accent)`

## Motion

- Duration scale: `--duration-instant: 120ms`, `--duration-fast: 160ms`, `--duration-normal: 200ms`
- Easing: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
- What animates: transform, opacity, background-color, border-color, box-shadow opt-in transitions strictly inside `@media (prefers-reduced-motion: no-preference)`, pointer-fine hover lifts behind `@media (hover: hover) and (pointer: fine)`, tactile `scale(0.97)` on active press, zero `transition: all`, zero hidden-at-rest elements

## Iconography

- Set: customized unified offline SVG stroke dictionary (`ICONS` in `script.js`) | grid: 24x24px | stroke: 1.75px | caps/joins: round | radius match: aligned to soft rounded UI geometry

## Imagery and illustration

- Mode: pure typographic and symbolic mathematics workbench (KaTeX equations plus syntax-highlighted Python anchor code)
- Rules: zero decorative grid backgrounds, zero SVG mascot placeholders, zero fake hero screenshots

## Accessibility

- Contrast: WCAG 2.2 AA verified (>= 4.5:1 body text, >= 3:1 UI borders and large display text) | Focus: visible dual-ring `box-shadow` plus transparent `outline` fallback
- Keyboard: native `<button>`, `<select>`, `<input>`, `<textarea>` controls with logical source order and skip link | Targets: minimum 40px to 44px height across interactive buttons and inputs
- Color independence: semantic pass/fail/warn states always pair hue with SVG icons and uppercase text labels (`LULUS`, `GAGAL`, `4/4`) | Reduced motion: opt-in motion only under `prefers-reduced-motion: no-preference`

## Tokens (source of truth)

```css
:root {
  --font-display: "Bricolage Grotesque", "Segoe UI", -apple-system, sans-serif;
  --font-body: "IBM Plex Sans", "Segoe UI", -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", "Cascadia Code", Consolas, monospace;

  --radius-panel: 16px;
  --radius-inner: 12px;
  --radius-control: 10px;
  --radius-pill: 9999px;

  --duration-instant: 120ms;
  --duration-fast: 160ms;
  --duration-normal: 200ms;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);

  --color-bg: #F5F7F6;
  --color-surface: #FCFEFD;
  --color-subtle: #EBF0EF;
  --color-border: #CED8D6;
  --color-border-strong: #7B8C8A;

  --color-fg: #141D1E;
  --color-fg-secondary: #344446;
  --color-muted: #516365;

  --color-accent: #0E5E6A;
  --color-accent-hover: #094A54;
  --color-accent-fg: #F8FAFA;
  --color-accent-soft: #E3F1F2;
  --color-accent-soft-fg: #0A444D;
  --color-accent-border: #8EBEC4;

  --color-code-bg: #171F21;
  --color-code-elevated: #1F292B;
  --color-code-well: #12181A;
  --color-code-border: #324043;
  --color-code-fg: #E8F0F0;
  --color-code-muted: #A4B4B6;
  --color-code-accent: #63C5CE;
}
```

- Adapter: plain CSS (`style.css`) with `@supports (color: oklch(0 0 0))` progressive OKLCH overrides over hex fallbacks

## Cards and surfaces

- Cards/surfaces: subtle micro-ring elevation on panels (`16px` radius, zero hard thick wireframe borders), clean `12px` inner tonal wells and `10px` controls | nesting: avoid heavy card-in-card border stacks by pairing soft surface contrast with hairline dividers and spacing

## Slop audit

- Date: 2026-11-23 | Result: pass (Lembar Modern browser-verified across 1440px, 768px, and 375px with 0 console errors and 0 horizontal overflow)
- Notes: Applied concentric radii (`16px/12px/10px/9999px`), Bricolage Grotesque + IBM Plex Sans/Mono typography, floating pill-track stepper (switching mobile `<= 639px` to `flex-wrap` pills so zero labels truncate), soft micro-ring elevation (border XOR shadow), tactile `:active { transform: scale(0.97) }` press feedback, Deep Petrol `::selection` / `caret-color`, and zero `border-left-width: 4px` or `transition: all`.

## Changelog

- 2026-11-23: Upgraded Lembar to Lembar Modern with concentric rounded radii (`16px/12px/10px/9999px`), Bricolage Grotesque display headings, pill-track workflow stepper, subtle soft elevation, tactile `:active` `scale(0.97)` press physics, and styled browser selection/caret tokens.
- 2026-11-23: Initialized Lembar design system in `DESIGN.md` to replace generic Tailwind-blue SaaS card defaults with an unboxed editorial proofsheet workbench.
