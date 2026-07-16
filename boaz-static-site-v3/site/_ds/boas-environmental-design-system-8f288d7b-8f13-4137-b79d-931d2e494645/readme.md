# 보아스환경기술 · Boaz Environmental Design System

The design system for **㈜보아스환경기술 (Boaz Environmental Technology Co., Ltd.)** — a Korean B2B firm specialising in air-quality measurement and analysis. Based in Ulsan; primary audience is environmental / EHS managers at industrial facilities who commission emission measurements.

## Company context

- **What they do.** 대기측정 및 분석 전문 기업. Ambient- and stack-emission measurement, laboratory analysis, odour reduction consulting, and general environmental-work outsourcing (자가측정 대행, 인허가 자료 작성 등).
- **Who they serve.** 산업체 대상 — factory environmental / safety managers, small compliance teams. Not consumers.
- **Where they operate.** 울산 소재 (Ulsan HQ); serves the wider south-east Korean industrial belt.
- **Brand promise.** Trustworthy, evidence-based, precise. The user shouldn't have to convince their internal auditor that the measurement is valid.

## Sources used

- **Company description** — provided by the requester in Korean (see the top of this repo's conversation).
- **Brand colour** — `#01737D` (teal), specified by the requester.
- **Logo** — supplied by the user (`uploads/boaz_logo.svg`) and copied to `assets/logo.svg`. Used in the site header, footer, portal sidebar, and brand cards. On dark surfaces, apply `filter: brightness(0) invert(1)` to render it in white.
- **Fonts** — Pretendard Variable (Korean + Latin, CDN via jsdelivr) and IBM Plex Mono (Google Fonts). See "Font substitutions" below.
- No codebase, Figma file, or existing components were provided — the component inventory below is a standard B2B set authored to fit the domain.

## Font substitutions ⚠️

No font binaries were provided. The system uses two open-licence webfonts loaded from CDN:

- **Sans (Korean + Latin):** [Pretendard Variable](https://github.com/orioncactus/pretendard) via jsdelivr — chosen as the de-facto standard for modern Korean product UI.
- **Mono (numeric readouts):** IBM Plex Mono via Google Fonts.

Both `@import` from `tokens/fonts.css`. If the brand has an owned typeface, supply the `.woff2` binaries and update `tokens/fonts.css` — the semantic aliases (`--font-sans` / `--font-mono`) don't need to change.

---

## Content fundamentals

The tone is written for a **compliance-minded professional**. Every sentence should read as if it will be forwarded to an auditor.

**Voice.**

- **정중하지만 담백하게.** 문어체 존댓말 (`-합니다`, `-됩니다`) — 구어체 (`요`) 사용 지양. 감정을 앞세우지 않고, 사실·수치·근거를 앞세운다.
- **정확한 명사, 정량 표현.** "빠르게" 대신 "3영업일 이내에". "정확한" 대신 "KOLAS 인정 방법에 따라". 형용사보다 숫자.
- **책임 소재 명시.** "확인이 필요합니다" (책임 요청) > "확인 요망". Passive not evasive.
- **1인칭 대명사 지양.** "저희"보다 "보아스환경기술"; "여러분"보다 "담당자". 브랜드 이름을 그대로 사용.

**Do / Don't examples.**

- ✅ "2025년 10월 15일 09:41에 배출구 A-3에서 시료를 채취했습니다."
- ✅ "질소산화물 측정값이 허용기준 대비 94.8% 수준입니다."
- ✅ "보고서는 3영업일 이내 이메일로 송부됩니다."
- ❌ "🌱 지구를 위한 우리의 특별한 여정에 함께해요!"
- ❌ "더 나은 미래를 향한 혁신적 솔루션 ✨"
- ❌ "놀라운 정확도로 여러분의 공기를 지켜드립니다."

**Casing & punctuation.**

- Numerals: always Arabic (10월, not 시월). Units on the right of the value, mono-font, thin space: `18.4 mg/m³`, `142 ppm`. Decimal point (not comma) for numbers ≥ 4 digits use a comma: `24,180 건`.
- Dates: `YYYY.MM.DD` (`2025.10.14`) in UI + reports; `YYYY년 M월 D일` in prose sentences.
- Time: `24h HH:MM` in mono; `2025.10.14 09:41 KST`.
- English tech names: keep them English (KOLAS, NOx, VOCs, ISO 9001, TSP, PM2.5) — Korean around them.
- Section eyebrows in latin caps with wide tracking (`SERVICES · 서비스`); headings and body in Hangul.
- **No emoji anywhere.** They break the auditor tone. Status is carried by badge colour + text.
- **No exclamation marks** in product copy.

**Vocabulary.**

- "측정" (measurement) · "분석" (analysis) · "판정" (verdict) · "기준" (limit) · "배출허용기준" · "정기측정" · "자가측정 대행".
- Verdict words are fixed: **기준 이내** / **주의** / **초과** — reflected 1:1 in the `Badge` tone vocabulary (ok / warn / danger).

---

## Visual foundations

The system is built for **credibility at a glance**. Everything below the aesthetic keeps that primary function honest.

**Colour.**

- One brand hue — teal `#01737D`, extended into an 11-step ramp (see `tokens/colors.css`). This carries the entire brand — no secondary hue.
- Cool blue-gray neutrals to sit next to the teal without clashing warm.
- Semantic status colours mapped directly to the domain: green = 기준 이내, amber = 주의, red = 초과, blue = info. Never used decoratively.
- Backgrounds default to warm off-white `#FBFAF7` (`--paper`) — pure white feels clinical; the paper tone stays professional but not cold.
- Dark mode is intentionally out of scope: measurement reports are printed and read on desktop.

**Type.**

- Sans (`--font-sans`) = **Pretendard Variable** for all UI and text. Handles Hangul + Latin at one metric.
- Mono (`--font-mono`) = **IBM Plex Mono** for every numeric readout, measurement value, unit, code, and mono-critical UI (table numbers, timestamps, hex tokens, IDs). Tabular-nums always on.
- Scale is body-oriented — measurement reports live in tables. Display sizes exist for hero + section titles only.
- Weights: 400 body, 500 medium (labels), 600 semibold (headings), 700 bold (display), 800 hero.
- Tight tracking on display Hangul (`-0.02em` to `-0.03em`); relaxed on caps eyebrows (`+0.06em to +0.14em`).

**Imagery.**

- No photography or illustration in the current iteration — the industry doesn't have compelling brand imagery, and generic stock (smokestacks, green leaves) would harm credibility.
- Decorative content = **data as visual**: layered translucent teal bars evoking atmospheric layers / measurement scales; live-looking readouts; measurement tables presented as focal.
- No hand-drawn illustrations, no gradients over photos, no dot patterns, no floating 3D shapes.

**Backgrounds & surfaces.**

- Marketing pages sit on `--paper`. Product / portal sits on `--surface-sunken` with cards raised to `--gray-0`.
- Full-bleed hero band is dark teal (`--teal-800` → `--teal-600` gradient) — used sparingly, at most twice per page. All other surfaces are quiet.
- No repeating patterns or textures.

**Cards.**

- Default: white background, `1px solid --border-subtle`, radius `--radius-xl` (12px), no shadow.
- Raised: `--shadow-sm` — used for lifted content in a busy panel.
- Brand: solid teal with inverse text — used sparingly for CTAs.
- **Never**: left-border-only accent stripe. That is a common trope and is banned here.

**Borders.**

- 1px, cool gray (`--border-subtle` inside cards; `--border-default` on inputs).
- Focus state = teal border + 3px teal-toned ring (`--ring-focus`).

**Corner radii.**

- Small: 6px (`--radius-md`) — buttons, inputs.
- Section cards: 12px (`--radius-xl`).
- Hero panels / CTA banners: 16px (`--radius-2xl`).
- Pills: 999px (`--radius-pill`) — for badges with dot + numeric badges.

**Shadows.**

- Cool-gray tinted, y-axis only, subtle. Elevation is used for state (hover, floating), never as decoration.
- No colored glows; no teal shadows.

**Interactions.**

- Hover: darker background one step (`--teal-500` → `--teal-600`), or `--gray-50` on white surfaces. Never opacity fades.
- Press: 0.5px translateY down; no scale shrink.
- Focus: teal ring (`--ring-focus`) — always visible on keyboard, always on inputs and buttons.
- Disabled: light gray fill + `--text-disabled` fg. Not opacity 0.5.

**Motion.**

- Short. `--duration-fast` (140ms) for hovers, `--duration-base` (200ms) for state changes, `--duration-slow` (320ms) for chart / progress fills.
- Easing: `--ease-out` for everything user-initiated. No bounces. No pulsing / breathing / infinite loops on content.

**Transparency & blur.**

- Sticky site header uses a semi-opaque paper background with slight backdrop-blur — the only backdrop-filter usage.
- Otherwise, opacity is used to fade auxiliary metadata (`opacity: 0.7`) — never to build depth.

**Layout.**

- Marketing page container width: 1240px (`--container-wide`), 32px side padding.
- Portal shell: 240px sidebar + fluid main area, min-width protected against dense tables.
- Standard vertical rhythm: 72px between major sections on marketing pages; 24px between cards inside the portal.
- Grids: 4-column service grid at 1240; 2-column split for hero and CTAs; forms use 2-column responsive.

**Fixed elements.**

- Sticky top nav on marketing pages.
- Sticky portal sidebar.
- Sticky headers on wide tables (`stickyHeader` on `DataTable`).
- No sticky bottom bars (feels app-y).

---

## Iconography

The system uses **Lucide-style stroked icons** — 1.5px stroke width, `currentColor`, 24×24 base viewBox. Rendered inline SVG (no icon font). Small, precise, geometric.

- The icon set is **not** an external dependency; icons used in the UI kit are hand-rolled inline SVG in `ui_kits/website/Icons.jsx`, matching Lucide's geometry so the set can be swapped 1:1 with Lucide if desired.
- **No emoji** used as icons. **No unicode arrows or checkmarks** used as icons (the small `▲ ▼` glyphs on `StatCard` trend indicators are the intentional exception — they are dense enough to sit inline with mono numerals).
- Sizes: 14px (dense UI, table row actions), 16px (default button icons, nav), 20px (card headers), 22–28px (section icons in service cards).
- Colours: default `currentColor`. Section-header icons sit inside a `--teal-50` chip with `--teal-600` foreground.

**Iconography inventory.** Available in `ui_kits/website/Icons.jsx`, exported to `window` for reuse: `IconWind`, `IconFlask`, `IconLeaf`, `IconShield`, `IconClipboard`, `IconChart`, `IconDownload`, `IconArrowRight`, `IconCheck`, `IconMapPin`, `IconPhone`, `IconMail`, `IconCalendar`, `IconSearch`, `IconBell`, `IconHome`, `IconFolder`, `IconFileText`, `IconSettings`, `IconUser`, `IconChevronRight`, `IconLogo`.

If the set needs to expand, prefer copying additional Lucide icons at 1.5px stroke rather than mixing in a different family.

---

## Components

The reusable primitives live under `components/<group>/`. Each is a self-contained React component with props declared in a sibling `.d.ts` and usage notes in `.prompt.md`. All styling is inline referencing the CSS custom properties in `styles.css`.

- **Buttons** — `Button`, `IconButton`
- **Forms** — `FormField`, `Input`, `Select`, `Checkbox`
- **Feedback** — `Badge`, `Alert`, `Tooltip`
- **Layout** — `Card`, `Divider`
- **Data** — `DataTable`, `StatCard`, `Readout`, `ProgressBar`
- **Navigation** — `Tabs`, `Breadcrumb`

**Intentional additions.** No source component library was provided, so this is an authored inventory — sized to the measurement-and-report domain. The four **Data** primitives (`DataTable`, `StatCard`, `Readout`, `ProgressBar`) are the domain-specific pieces the standard B2B set would miss: measurement readings need mono numerals, tabular alignment, and status-coloured compliance bars.

**No dependencies.** Every component uses React only — no icon library, no styling library, no motion library. Consumers get the whole system by linking `styles.css` and importing components.

---

## UI kits

- **`ui_kits/website/`** — the full corporate site + client portal. Five screens (home, services, request, portal dashboard, report), interactive click-through router, marketing chrome vs. portal chrome layout switching. Composes every component primitive. See `ui_kits/website/README.md` for structure.

---

## Index

- `readme.md` — this file. The system's manifest.
- `styles.css` — global entry, import-only.
- `tokens/` — CSS custom-property token files (`fonts`, `colors`, `typography`, `spacing`, `radii`, `shadows`, `motion`, `semantic`).
- `components/<group>/<Name>.{jsx,d.ts,prompt.md}` — 17 reusable primitives across 6 groups.
- `components/<group>/*.card.html` — the Design System tab specimen for each group.
- `guidelines/*.card.html` — 13 foundation specimen cards (colors, type, spacing, brand).
- `assets/` — official `logo.svg` (uploaded by user) + `README.md`.
- `ui_kits/website/` — full click-through corporate site + client portal (5 screens).
- `SKILL.md` — the skill definition for downloading and using this system in Claude Code.

**Namespace.** In `@dsCard` HTML pages: `const { Button, DataTable, … } = window.BoasEnvironmentalDesignSystem_8f288d`.
