/**
 * The display dataset: genre content merged with resolved Spotify IDs.
 * Components render from ATLAS_GENRES / ATLAS_BY_ID. The raw GENRES (with null
 * ids) stays the source of truth for structure + the resolve script.
 */

import { GENRES, type Genre } from "./genres";
import { SPOTIFY_IDS } from "./spotifyIds";

export const ATLAS_GENRES: Genre[] = GENRES.map((g) => ({
  ...g,
  examples: g.examples.map((ex, i) => ({
    ...ex,
    spotifyId: SPOTIFY_IDS[g.id]?.[i] ?? ex.spotifyId,
  })),
}));

export const ATLAS_BY_ID: Record<string, Genre> = Object.fromEntries(
  ATLAS_GENRES.map((g) => [g.id, g]),
);
