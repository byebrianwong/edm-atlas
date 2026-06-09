/**
 * The display dataset for artist pages: the hand-authored seed (artists.ts)
 * overlaid with whatever the resolver pipeline has produced —
 *   - ARTIST_SPOTIFY  (artistsSpotify.ts)  → verified genres + top tracks
 *   - BEATPORT_GENRES (beatportGenres.ts)  → per-song genre tags
 * — and back-filled with Spotify track ids already resolved for the genre atlas
 * (so embeds light up for free where a song overlaps the two datasets).
 *
 * Components render from ARTISTS_FULL / ARTIST_BY_ID. The seed alone is enough
 * to render the pages; the generated overlays only ever improve fidelity.
 */

import { ATLAS_GENRES } from "./atlas";
import { ARTISTS, type SeedArtist } from "./artists";
import { ARTIST_SPOTIFY } from "./artistsSpotify";
import { BEATPORT_GENRES } from "./beatportGenres";
import {
  toAtlasGenres,
  type AtlasGenreId,
} from "./genreAliases";
import { FAMILY_BY_ID } from "./families";
import type { Genre } from "./genres";
import { slug, normTitle, trackKey } from "./trackKey";

// Re-export the track-key helpers (defined in the dependency-free leaf module so
// the Node resolver scripts can share them) for existing import sites.
export { slug, normTitle, trackKey };

// ── Spotify-id back-fill from the genre atlas ────────────────────────────────

// normTitle → [{ artistSlug, spotifyId }] for every already-resolved atlas track.
const ATLAS_TRACK_INDEX: Record<string, { artistSlug: string; spotifyId: string }[]> =
  {};
for (const g of ATLAS_GENRES) {
  for (const ex of g.examples) {
    if (!ex.spotifyId) continue;
    const key = slug(normTitle(ex.title));
    (ATLAS_TRACK_INDEX[key] ??= []).push({
      artistSlug: slug(ex.artist),
      spotifyId: ex.spotifyId,
    });
  }
}

/** Find a Spotify id for (artist, title) among tracks resolved for the atlas. */
function backfillSpotifyId(artistName: string, title: string): string | null {
  const candidates = ATLAS_TRACK_INDEX[slug(normTitle(title))];
  if (!candidates) return null;
  const want = `-${slug(artistName)}-`;
  // Whole-token containment: the atlas artist string may add features.
  const hit = candidates.find((c) => `-${c.artistSlug}-`.includes(want));
  return hit?.spotifyId ?? null;
}

// ── Types ────────────────────────────────────────────────────────────────────

export type FullArtistTrack = {
  title: string;
  /** Atlas genre ids this song maps to (linkable to stars). */
  genres: AtlasGenreId[];
  /** Raw external genre tags (Beatport) for display, when richer than the map. */
  rawGenres?: string[];
  spotifyId: string | null;
};

export type FullArtist = {
  id: string;
  name: string;
  aka: string[];
  genres: AtlasGenreId[];
  /** Raw Spotify artist tags, for display alongside the mapped atlas genres. */
  rawGenres: string[];
  spotifyArtistId?: string;
  blurb: string;
  topTracks: FullArtistTrack[];
};

const MAX_TRACKS = 8;

function dedupe<T>(xs: T[]): T[] {
  return [...new Set(xs)];
}

function buildArtist(seed: SeedArtist): FullArtist {
  const sp = ARTIST_SPOTIFY[seed.id];

  // Artist-level genres: seed first, then any new ones Spotify's tags map to.
  const genres = dedupe<AtlasGenreId>([
    ...seed.genres,
    ...(sp ? toAtlasGenres(sp.genres) : []),
  ]);

  // Spotify top tracks, indexed by normalized title for matching + appending.
  const spByTitle: Record<string, { title: string; spotifyId: string }> = {};
  for (const t of sp?.tracks ?? []) spByTitle[slug(normTitle(t.title))] = t;

  const seenTitles = new Set<string>();
  const tracks: FullArtistTrack[] = seed.topTracks.map((t) => {
    const tkey = slug(normTitle(t.title));
    seenTitles.add(tkey);
    const beatportRaw = BEATPORT_GENRES[trackKey(seed.name, t.title)];
    const trackGenres = dedupe<AtlasGenreId>([
      ...t.genres,
      ...(beatportRaw ? toAtlasGenres(beatportRaw) : []),
    ]);
    return {
      title: t.title,
      genres: trackGenres,
      rawGenres: beatportRaw,
      spotifyId:
        t.spotifyId ??
        spByTitle[tkey]?.spotifyId ??
        backfillSpotifyId(seed.name, t.title) ??
        null,
    };
  });

  // Append Spotify-verified tracks the seed didn't list (up to the cap).
  for (const t of sp?.tracks ?? []) {
    if (tracks.length >= MAX_TRACKS) break;
    const tkey = slug(normTitle(t.title));
    if (seenTitles.has(tkey)) continue;
    seenTitles.add(tkey);
    const beatportRaw = BEATPORT_GENRES[trackKey(seed.name, t.title)];
    tracks.push({
      title: t.title,
      genres: dedupe<AtlasGenreId>([
        ...(beatportRaw ? toAtlasGenres(beatportRaw) : []),
        ...genres, // fall back to the artist's genres when the song has none
      ]).slice(0, 2),
      rawGenres: beatportRaw,
      spotifyId: t.spotifyId,
    });
  }

  return {
    id: seed.id,
    name: seed.name,
    aka: seed.aka ?? [],
    genres,
    rawGenres: sp?.genres ?? [],
    spotifyArtistId: sp?.spotifyArtistId,
    blurb: seed.blurb,
    topTracks: tracks.slice(0, MAX_TRACKS),
  };
}

export const ARTISTS_FULL: FullArtist[] = ARTISTS.map(buildArtist).sort((a, b) =>
  a.name.localeCompare(b.name),
);

export const ARTIST_BY_ID: Record<string, FullArtist> = Object.fromEntries(
  ARTISTS_FULL.map((a) => [a.id, a]),
);

// ── Genre chip helper ────────────────────────────────────────────────────────

const GENRE_BY_ID: Record<string, Genre> = Object.fromEntries(
  ATLAS_GENRES.map((g) => [g.id, g]),
);

export type GenreChip = { id: string; name: string; color: string };

/** Resolve an atlas genre id to display name + family color for a chip. */
export function genreChip(id: string): GenreChip | null {
  const g = GENRE_BY_ID[id];
  if (!g) return null;
  return { id: g.id, name: g.name, color: FAMILY_BY_ID[g.family].color };
}
