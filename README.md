# EDM Atlas

Explore electronic dance music as a navigable 3D star map. Each of 31 subgenres
is a glowing star; related genres are linked into constellations and grouped into
8 family clusters. Click any star to read what defines that genre, hear a real
example on Spotify, and play a synthesized "building blocks" demo of its signature
rhythm, bass and effect.

Built with React + TypeScript + Vite, `@react-three/fiber` (three.js) for the
scene, `@react-three/postprocessing` for bloom, Zustand for state, and Tone.js for
the synthesized genre demos.

## Features

- **3D star map** — 31 genres laid out as family clusters in deep space, with a
  parallax starfield, per-family nebulae, constellation edges, bloom, and a
  cinematic fly-to camera.
- **Learn each genre** — a plain-language "what makes it unique" hook, the concrete
  signature elements, and BPM range.
- **Real examples** — two embedded Spotify tracks per genre (resolved to canonical,
  most-streamed official versions).
- **Hear the building blocks** — a Tone.js engine synthesizes each genre's
  defining loop (the wub, the pump, the 303, the log drum…) right next to the real
  track. Lazy-loaded — Tone.js only downloads when you press play.
- **Find your way** — search (`/`), a family legend that doubles as a filter, and
  clickable "connects to" chips that fly the camera between genres.
- **Accessible fallback** — a full 2D list view (also the no-WebGL path and the
  SEO surface), keyboard support, and `prefers-reduced-motion` handling.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check + production build to dist/
pnpm preview    # preview the production build
```

## Component library (Storybook)

The DOM overlay components are documented in **Storybook 10**. Stories live next
to each component (`src/**/*.stories.tsx`) and import the app's real stylesheets +
fonts, so they render identically to production on the same deep-space backdrop.

```bash
pnpm storybook        # dev server at http://localhost:6006
pnpm build-storybook  # static build to storybook-static/
```

Components read from the Zustand store, so each story seeds the state it needs
declaratively via a `parameters.atlas` patch that a `beforeEach` in
`.storybook/preview.tsx` applies before render. Nothing is mocked — the stories
stay fully interactive (follow "connects to" chips, type in search, toggle a
family filter), and the `@storybook/addon-a11y` addon runs accessibility checks on
every story. Start with **Overview / Detail Panel** and **Overview / List
Experience**.

## Project structure

```
src/
  data/
    genres.ts        # the 31-genre dataset (source of truth; spotifyId left null)
    families.ts      # 8 families: colors, blurbs, cluster centroids
    spotifyIds.ts    # resolved Spotify track IDs (keyed by genre, examples order)
    atlas.ts         # genres + resolved IDs, merged for display
    graph.ts         # unique edges, neighbor adjacency, deterministic 3D layout
  scene/             # the react-three-fiber scene
    Atlas.tsx        # the <Canvas>; composes everything below
    Starfield, Nebulae, Constellations, GenreStars, CameraController, Effects
    emphasis.ts      # focus/dim math, polled per-frame (no re-renders on hover)
  ui/                # DOM overlay: DetailPanel, SpotifyEmbed, SynthButton,
                     # SearchBox, FamilyLegend, Brand, Intro, ViewToggle, GenreList
  audio/
    synth.ts         # Tone.js engine (lazy) + public API
    builders.ts      # a signature-loop builder for each of the 31 genres
  state/store.ts     # Zustand store (selection, hover, filter, view, synth state)
scripts/
  resolve-spotify.ts # regenerate spotifyIds.ts from the official Spotify Web API
```

## Spotify track resolution

`src/data/genres.ts` ships every `spotifyId` as `null` on purpose — IDs are
resolved separately and live in `src/data/spotifyIds.ts` (a map keyed by genre id,
aligned to each genre's `examples` order). The current IDs were resolved via web
lookup to the canonical, most-streamed official version of each track.

To re-resolve everything against the official Spotify Web API (most accurate):

1. Create an app at https://developer.spotify.com/dashboard to get a client id/secret.
2. Run the resolver (Client Credentials flow — no user login needed):

   ```bash
   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/resolve-spotify.ts
   # or: npx tsx scripts/resolve-spotify.ts
   ```

   It searches each example track, writes `src/data/spotifyIds.ts`, and prints any
   tracks that didn't resolve for manual review.

Playback uses Spotify's embed iframe: logged-out listeners get the ~30s preview;
signed-in Spotify users get full tracks. Audio stays inside Spotify's player.

## Deploy

Static SPA — deploys to Vercel (or any static host) with zero config; Vercel
auto-detects Vite. `pnpm build` → `dist/`.

## Notes

Genre boundaries in electronic music are debated and overlapping. The families and
`related` links here are a reasonable, teachable structure — not a definitive
taxonomy — and are presented to users as such.
