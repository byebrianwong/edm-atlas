/**
 * Maps external genre tags (Spotify artist `genres`, Beatport release genres,
 * MusicBrainz tags) onto the atlas's own 31 genre ids — so a song or artist
 * sourced from those services can still link back to a star on the map.
 *
 * Keys are lower-cased, punctuation-stripped tag strings; values are atlas
 * genre ids (see src/data/genres.ts). Used by the Spotify + Beatport resolver
 * scripts and as a shared fallback when normalizing any free-text tag.
 *
 * Unmapped tags are intentionally dropped at the link layer (kept only as raw
 * display text) rather than force-fit — better an honest "no star" than a wrong
 * one. Add aliases here as new tags show up in the wild.
 */

/** Atlas genre ids, mirrored from genres.ts for a compile-time sanity check. */
export type AtlasGenreId =
  | "house" | "tech" | "deep" | "prog" | "melodic" | "futurehouse"
  | "bigroom" | "basshouse" | "electrohouse" | "frenchhouse" | "acidhouse"
  | "tropical" | "techno" | "trance" | "psytrance" | "dnb" | "ukg" | "bigbeat"
  | "jungle" | "dubstep" | "futurebass" | "trap" | "meldubstep" | "glitchhop"
  | "hardstyle" | "happyhardcore" | "gabber" | "phonk" | "amapiano"
  | "moombahton" | "synthwave";

/** Normalize a raw tag: lower-case, drop punctuation, collapse whitespace. */
export function normalizeTag(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ALIASES: Record<string, AtlasGenreId> = {
  // ── House family ──────────────────────────────────────────────────────────
  "house": "house",
  "filter house": "frenchhouse",
  "french house": "frenchhouse",
  "nu disco": "frenchhouse",
  "disco house": "frenchhouse",
  "tech house": "tech",
  "deep house": "deep",
  "soulful house": "deep",
  "organic house": "deep",
  "progressive house": "prog",
  "melodic house": "melodic",
  "melodic techno": "melodic",
  "melodic house and techno": "melodic",
  "future house": "futurehouse",
  "slap house": "futurehouse",
  "brazilian bass": "futurehouse",
  "big room": "bigroom",
  "big room house": "bigroom",
  "festival": "bigroom",
  "festival progressive house": "bigroom",
  "bass house": "basshouse",
  "fidget house": "basshouse",
  "electro house": "electrohouse",
  "complextro": "electrohouse",
  "dutch house": "electrohouse",
  "acid house": "acidhouse",
  "acid": "acidhouse",
  "tropical house": "tropical",

  // ── Techno / Trance ───────────────────────────────────────────────────────
  "techno": "techno",
  "minimal techno": "techno",
  "minimal": "techno",
  "peak time techno": "techno",
  "hard techno": "techno",
  "detroit techno": "techno",
  "trance": "trance",
  "uplifting trance": "trance",
  "vocal trance": "trance",
  "progressive trance": "trance",
  "psytrance": "psytrance",
  "psy trance": "psytrance",
  "psychedelic trance": "psytrance",
  "goa trance": "psytrance",
  "full on": "psytrance",

  // ── Breakbeat & jungle ────────────────────────────────────────────────────
  "drum and bass": "dnb",
  "dnb": "dnb",
  "liquid funk": "dnb",
  "liquid dnb": "dnb",
  "neurofunk": "dnb",
  "uk garage": "ukg",
  "garage": "ukg",
  "2 step": "ukg",
  "speed garage": "ukg",
  "future garage": "ukg",
  "big beat": "bigbeat",
  "breakbeat": "bigbeat",
  "breaks": "bigbeat",
  "jungle": "jungle",
  "ragga jungle": "jungle",

  // ── Bass music ────────────────────────────────────────────────────────────
  "dubstep": "dubstep",
  "brostep": "dubstep",
  "riddim": "dubstep",
  "future bass": "futurebass",
  "kawaii future bass": "futurebass",
  "trap": "trap",
  "edm trap": "trap",
  "festival trap": "trap",
  "hybrid trap": "trap",
  "melodic dubstep": "meldubstep",
  "chillstep": "meldubstep",
  "glitch hop": "glitchhop",
  "midtempo": "glitchhop",
  "midtempo bass": "glitchhop",
  "neuro": "glitchhop",

  // ── Hard dance ────────────────────────────────────────────────────────────
  "hardstyle": "hardstyle",
  "rawstyle": "hardstyle",
  "euphoric hardstyle": "hardstyle",
  "happy hardcore": "happyhardcore",
  "uk hardcore": "happyhardcore",
  "gabber": "gabber",
  "hardcore": "gabber",
  "frenchcore": "gabber",
  "uptempo": "gabber",

  // ── Global & trap-adjacent ────────────────────────────────────────────────
  "phonk": "phonk",
  "drift phonk": "phonk",
  "amapiano": "amapiano",
  "moombahton": "moombahton",

  // ── Retro / other ─────────────────────────────────────────────────────────
  "synthwave": "synthwave",
  "retrowave": "synthwave",
  "outrun": "synthwave",
  "darksynth": "synthwave",

  // ── Beatport taxonomy odds-and-ends → nearest atlas star ──────────────────
  "afro house": "deep",
  "organic house downtempo": "deep",
  "jackin house": "house",
  "funky house": "house",
  "minimal deep tech": "tech",
  "hard dance": "hardstyle",
  "indie dance": "frenchhouse",
  "uk garage bassline": "ukg",
  "bassline": "ukg",

  // ── Common umbrella tags Spotify hands back — best-effort home ─────────────
  "edm": "bigroom",
  "electro": "electrohouse",
  "pop dance": "house",
  "dance pop": "house",
  "dance": "house",
};

/** Resolve a single external tag to an atlas genre id, or null if unmapped. */
export function toAtlasGenre(raw: string): AtlasGenreId | null {
  return ALIASES[normalizeTag(raw)] ?? null;
}

/** Resolve a list of external tags to deduped atlas genre ids (order kept). */
export function toAtlasGenres(raws: string[]): AtlasGenreId[] {
  const out: AtlasGenreId[] = [];
  for (const raw of raws) {
    const id = toAtlasGenre(raw);
    if (id && !out.includes(id)) out.push(id);
  }
  return out;
}
