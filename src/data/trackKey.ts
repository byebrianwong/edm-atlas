/**
 * Track-identity helpers, kept in a dependency-free leaf module so both the app
 * (via artistsAtlas.ts) and the Node resolver scripts (run directly, no Vite)
 * can import them and agree byte-for-byte on how a track is keyed. Don't add
 * imports here — the scripts rely on this file resolving under plain Node.
 */

/** Slug: lower-case, de-accent, non-alphanumerics → hyphens, trimmed. */
export function slug(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Strip "feat./with" credits and trailing noise so titles compare cleanly. */
export function normTitle(title: string): string {
  return title
    .replace(/\((?:feat|ft|with)\.?[^)]*\)/gi, "")
    .replace(/\b(?:feat|ft)\.?\s.*$/gi, "")
    .trim();
}

/** Stable per-track key used by the seed and the Beatport resolver alike. */
export function trackKey(artistName: string, title: string): string {
  return `${slug(artistName)}|${slug(normTitle(title))}`;
}
