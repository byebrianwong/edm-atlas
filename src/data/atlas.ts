/**
 * The display dataset: genre content merged with the full example track list
 * (classics from genres.ts + the extras from examples.ts) and resolved Spotify
 * IDs. Components render from ATLAS_GENRES / ATLAS_BY_ID.
 */

import { GENRES, type Genre, type Track } from "./genres";
import { SPOTIFY_IDS } from "./spotifyIds";
import { MORE_EXAMPLES } from "./examples";

export const ATLAS_GENRES: Genre[] = GENRES.map((g) => {
  const extras: Track[] = (MORE_EXAMPLES[g.id] ?? []).map((e) => ({
    artist: e.artist,
    title: e.title,
    spotifyId: null,
    recent: e.recent,
  }));
  const combined: Track[] = [...g.examples, ...extras];
  return {
    ...g,
    examples: combined.map((ex, i) => ({
      ...ex,
      spotifyId: SPOTIFY_IDS[g.id]?.[i] ?? ex.spotifyId ?? null,
    })),
  };
});

export const ATLAS_BY_ID: Record<string, Genre> = Object.fromEntries(
  ATLAS_GENRES.map((g) => [g.id, g]),
);
