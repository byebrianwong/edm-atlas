/**
 * resolve-artists-spotify.ts
 *
 * For every artist in src/data/artists.ts, resolves a real Spotify track id for
 * each of their seed top-tracks (via track search) and the artist's Spotify id,
 * then writes src/data/artistsSpotify.ts — the overlay the merge layer
 * (artistsAtlas.ts) uses to light up the embeds on artist pages.
 *
 * Why track search (not /artists/{id}/top-tracks): Spotify's late-2024 Web API
 * change blocks top-tracks, artist `genres`, related-artists, etc. for apps
 * created after the cutoff under the Client Credentials flow (verified: those
 * return 403 / empty). Track search still works and is exactly how the genre
 * atlas resolves its ids (see scripts/resolve-spotify.ts). Per-song *genres*
 * come from the Beatport resolver; the curated atlas genres in artists.ts are
 * the source for genre links either way, so leaving Spotify `genres` empty is
 * fine.
 *
 * Prereqs:
 *   - Node 18+ (global fetch). Node 23.6+ runs this .ts directly; else `npx tsx`.
 *   - A Spotify app (https://developer.spotify.com/dashboard) with
 *     SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in the environment.
 *
 * Run:
 *   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/resolve-artists-spotify.ts
 *
 * Tracks that don't resolve are left out and listed at the end for review.
 */

import { writeFileSync } from "node:fs";
import { ARTISTS } from "../src/data/artists.ts";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET before running.");
  process.exit(1);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

type SpotifyArtist = {
  id: string;
  name: string;
  followers?: { total: number };
};

async function getToken(): Promise<string> {
  const creds = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

async function api<T>(token: string, url: string): Promise<T | null> {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 429) {
    const retry = Number(res.headers.get("Retry-After") ?? "1");
    await sleep((retry + 1) * 1000);
    return api<T>(token, url);
  }
  if (!res.ok) {
    console.warn(`  Request failed (${res.status}): ${url}`);
    return null;
  }
  return (await res.json()) as T;
}

/** Resolve the artist's Spotify id (for a deep link), best-effort. */
async function findArtistId(
  token: string,
  name: string,
  aka: string[],
): Promise<string | undefined> {
  const q = encodeURIComponent(`artist:"${name}"`);
  const data = await api<{ artists?: { items?: SpotifyArtist[] } }>(
    token,
    `https://api.spotify.com/v1/search?q=${q}&type=artist&limit=10`,
  );
  const items = data?.artists?.items ?? [];
  if (!items.length) return undefined;
  const wanted = new Set([norm(name), ...aka.map(norm)]);
  const exact = items.filter((a) => wanted.has(norm(a.name)));
  const pool = exact.length ? exact : items;
  return pool.sort(
    (a, b) => (b.followers?.total ?? 0) - (a.followers?.total ?? 0),
  )[0]?.id;
}

type TrackItem = { id: string; name: string; artists?: { name: string }[] };

/**
 * Resolve a single track id. Tries a strict field query first (high precision);
 * if that misses (common for remixes/collabs where the field artist differs),
 * falls back to a plain query and accepts the first result whose credited
 * artists actually include the seed artist — so we never embed a wrong song.
 */
async function searchTrack(
  token: string,
  artist: string,
  title: string,
): Promise<string | null> {
  const strict = await api<{ tracks?: { items?: TrackItem[] } }>(
    token,
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      `track:"${title}" artist:"${artist}"`,
    )}&type=track&limit=1`,
  );
  const hit = strict?.tracks?.items?.[0];
  if (hit) return hit.id;

  const loose = await api<{ tracks?: { items?: TrackItem[] } }>(
    token,
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      `${title} ${artist}`,
    )}&type=track&limit=5`,
  );
  const a = norm(artist);
  const match = (loose?.tracks?.items ?? []).find((it) =>
    (it.artists ?? []).some((ar) => {
      const n = norm(ar.name);
      return n.length > 1 && (n.includes(a) || a.includes(n));
    }),
  );
  return match?.id ?? null;
}

async function main() {
  const token = await getToken();
  const out: Record<string, unknown> = {};
  const misses: string[] = [];

  for (const seed of ARTISTS) {
    const spotifyArtistId = await findArtistId(token, seed.name, seed.aka ?? []);
    await sleep(110);

    const tracks: { title: string; spotifyId: string }[] = [];
    for (const t of seed.topTracks) {
      const id = await searchTrack(token, seed.name, t.title);
      if (id) tracks.push({ title: t.title, spotifyId: id });
      else misses.push(`${seed.name} — ${t.title}`);
      await sleep(110);
    }

    out[seed.id] = { genres: [], spotifyArtistId, tracks };
    console.log(
      `${seed.name}: ${tracks.length}/${seed.topTracks.length} tracks resolved`,
    );
  }

  const fileBody =
    `/* Generated by scripts/resolve-artists-spotify.ts — do not edit by hand. */\n\n` +
    `export type SpotifyArtistData = {\n` +
    `  genres: string[];\n` +
    `  spotifyArtistId?: string;\n` +
    `  tracks: { title: string; spotifyId: string }[];\n` +
    `};\n\n` +
    `export const ARTIST_SPOTIFY: Record<string, SpotifyArtistData> = ${JSON.stringify(
      out,
      null,
      2,
    )};\n`;
  writeFileSync(new URL("../src/data/artistsSpotify.ts", import.meta.url), fileBody);

  const resolved = Object.values(out).reduce(
    (n, a) => n + (a as { tracks: unknown[] }).tracks.length,
    0,
  );
  console.log(
    `\nWrote src/data/artistsSpotify.ts (${Object.keys(out).length} artists, ${resolved} tracks resolved).`,
  );
  if (misses.length) {
    console.log(`\n${misses.length} tracks unresolved:`);
    misses.slice(0, 40).forEach((m) => console.log("  - " + m));
    if (misses.length > 40) console.log(`  …and ${misses.length - 40} more`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
