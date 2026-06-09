/**
 * resolve-beatport.ts
 *
 * Scrapes Beatport for the *per-song* genre of each track in the artist seed
 * (src/data/artists.ts) and writes src/data/beatportGenres.ts — the overlay the
 * app merges in to show true per-track genres on artist pages. Beatport tags
 * every release with a genre, the EDM-native source of truth for "what genre is
 * this song?" that Spotify (artist-level only, and now mostly empty) can't give.
 *
 * How it works (one request per artist):
 *   1. Headless Chromium (Playwright) loads
 *      https://www.beatport.com/search?q=<artist>&type=tracks
 *      — needed because Beatport gates plain fetch behind a Cloudflare JS
 *      challenge (verified: fetch returns 403 "Just a moment"). Playwright
 *      clears it.
 *   2. The track results are server-rendered into a `.tracks-table`; each row
 *      carries the track title (/track/ link), its artists, and its genre
 *      (/genre/ link, e.g. "Melodic House & Techno"). We read those rows.
 *   3. Each seed track is matched to its best row and the raw genre recorded.
 *
 * Keys use trackKey(artistName, title) from trackKey.ts so the seed and this
 * output agree on identity. Raw Beatport genre names are stored as-is; the merge
 * layer maps them to atlas ids via genreAliases.ts.
 *
 * KNOWN LIMITATION: Beatport's artist search (used here for one cheap request
 * per artist) returns recent/remix releases ranked by relevance, NOT an
 * artist's iconic catalogue — so curated classics like deadmau5's "Strobe"
 * rarely appear and can't be tagged. To tag a *specific* track you'd search
 * per-track ("artist title") instead — far more complete, but ~one page load
 * per track (hundreds of loads, slow + flaky). Until that's built, the curated
 * per-song genres in artists.ts are the source and this output stays empty.
 *
 * Prereqs: Playwright + a browser —
 *   pnpm add -D playwright && npx playwright install chromium
 *
 * Run:
 *   node scripts/resolve-beatport.ts            # all artists
 *   node scripts/resolve-beatport.ts --limit 5  # smoke-test first 5 artists
 *
 * Tracks not on Beatport (lots of pop/crossover hits aren't) won't match and are
 * listed at the end. Node 23.6+ runs this .ts directly; else `npx tsx`.
 */

import { writeFileSync } from "node:fs";
import { ARTISTS } from "../src/data/artists.ts";
import { trackKey, normTitle } from "../src/data/trackKey.ts";

const DELAY_MS = 800;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const limitArg = process.argv.indexOf("--limit");
const LIMIT = limitArg >= 0 ? Number(process.argv[limitArg + 1]) : Infinity;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

type Candidate = { title: string; artistsText: string; genre: string };

/** Clean a Beatport genre label: de-double the a11y text, take the parent
 *  genre before any "|", drop "(Main Floor)"-style qualifiers. */
function cleanGenre(raw: string): string {
  let s = raw.replace(/\s+/g, " ").trim();
  const h = Math.floor(s.length / 2);
  if (s.length % 2 === 0 && s.slice(0, h) === s.slice(h)) s = s.slice(0, h).trim();
  s = s.split("|")[0].replace(/\(.*?\)/g, "");
  return s.replace(/\s+/g, " ").trim();
}

// ── Playwright (clears Cloudflare; Beatport blocks plain fetch) ───────────────
type PwBrowser = { newPage: (o?: unknown) => Promise<PwPage>; close: () => Promise<void> };
type PwPage = {
  goto: (url: string, o?: unknown) => Promise<unknown>;
  waitForTimeout: (ms: number) => Promise<void>;
  evaluate: <T>(fn: () => T) => Promise<T>;
  close: () => Promise<void>;
};

let browser: PwBrowser | null = null;

async function getBrowser(): Promise<PwBrowser> {
  if (browser) return browser;
  let pw: { chromium: { launch: (o?: unknown) => Promise<PwBrowser> } };
  try {
    pw = (await import("playwright")) as typeof pw;
  } catch {
    console.error(
      "\nPlaywright isn't installed. Enable the scraper with:\n" +
        "  pnpm add -D playwright && npx playwright install chromium\n",
    );
    process.exit(1);
  }
  browser = await pw.chromium.launch({ headless: true });
  return browser;
}

async function getCandidates(artist: string): Promise<Candidate[]> {
  const b = await getBrowser();
  const page = await b.newPage({ userAgent: UA });
  try {
    await page.goto(
      `https://www.beatport.com/search?q=${encodeURIComponent(artist)}&type=tracks`,
      { waitUntil: "domcontentloaded", timeout: 45000 },
    );
    await page.waitForTimeout(7000);
    // Read each track row in the results table: title (from /track/ slug),
    // artists, and genre (from /genre/ link).
    const rows = await page.evaluate(() => {
      const table = document.querySelector(".tracks-table");
      if (!table) return [] as { title: string; artistsText: string; genre: string }[];
      const out: { title: string; artistsText: string; genre: string }[] = [];
      const seen = new Set<Element>();
      table.querySelectorAll('a[href*="/track/"]').forEach((ta) => {
        let row: Element = ta;
        while (row.parentElement && row.parentElement !== table) row = row.parentElement;
        if (row.parentElement !== table || seen.has(row)) return;
        seen.add(row);
        const ga = row.querySelector('a[href*="/genre/"]');
        const href = ta.getAttribute("href") || "";
        const m = href.match(/\/track\/([^/]+)\//);
        const title = m ? m[1].replace(/-/g, " ") : (ta.textContent || "").trim();
        const artistsText = [...row.querySelectorAll('a[href*="/artist/"]')]
          .map((a) => (a.textContent || "").trim())
          .join(" ");
        out.push({ title, artistsText, genre: ga ? (ga.textContent || "").trim() : "" });
      });
      return out;
    });
    return rows
      .filter((r) => r.genre)
      .map((r) => ({ ...r, genre: cleanGenre(r.genre) }));
  } catch {
    return [];
  } finally {
    await page.close();
  }
}

/** Best genre for a seed track given the artist's Beatport rows. */
function matchGenre(
  artistName: string,
  title: string,
  candidates: Candidate[],
): string | null {
  const wantTitle = norm(normTitle(title));
  const wantArtist = norm(artistName);
  let best: { score: number; genre: string } | null = null;
  for (const c of candidates) {
    const ct = norm(c.title);
    let score = 0;
    if (ct === wantTitle) score += 3;
    else if (ct.includes(wantTitle) || wantTitle.includes(ct)) score += 2;
    if (score === 0) continue;
    if (norm(c.artistsText).includes(wantArtist)) score += 2;
    if (!best || score > best.score) best = { score, genre: c.genre };
  }
  return best && best.score >= 3 ? best.genre : null;
}

async function main() {
  const out: Record<string, string[]> = {};
  const misses: string[] = [];
  const artists = ARTISTS.slice(0, LIMIT);

  for (const artist of artists) {
    const candidates = await getCandidates(artist.name);
    let hits = 0;
    for (const t of artist.topTracks) {
      const genre = matchGenre(artist.name, t.title, candidates);
      if (genre) {
        out[trackKey(artist.name, t.title)] = [genre];
        hits++;
      } else {
        misses.push(`${artist.name} — ${t.title}`);
      }
    }
    console.log(
      `${artist.name}: ${hits}/${artist.topTracks.length} tagged (${candidates.length} rows)`,
    );
    await sleep(DELAY_MS);
  }

  if (browser) await browser.close();

  const fileBody =
    `/* Generated by scripts/resolve-beatport.ts — do not edit by hand. */\n\n` +
    `export const BEATPORT_GENRES: Record<string, string[]> = ${JSON.stringify(
      out,
      null,
      2,
    )};\n`;
  writeFileSync(new URL("../src/data/beatportGenres.ts", import.meta.url), fileBody);

  console.log(`\nWrote src/data/beatportGenres.ts (${Object.keys(out).length} tracks tagged).`);
  if (misses.length) {
    console.log(`\n${misses.length} tracks unmatched (likely not on Beatport):`);
    misses.slice(0, 30).forEach((m) => console.log("  - " + m));
    if (misses.length > 30) console.log(`  …and ${misses.length - 30} more`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
