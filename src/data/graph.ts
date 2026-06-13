/**
 * Graph + layout. Derives the unique undirected constellation edges from the
 * `related` arrays, builds neighbor adjacency, and computes a deterministic 3D
 * position for every genre: art-directed family centroids with members spread
 * on a jittered Fibonacci sphere around each centroid (anchors pulled toward
 * the bright core). Deterministic, so the atlas looks identical on every load.
 */

import { GENRES, GENRE_BY_ID, type Genre } from "./genres";
import { FAMILY_BY_ID, FAMILY_IDS } from "./families";
import type { FamilyId } from "./genres";

export type Vec3 = [number, number, number];
export type Edge = { source: string; target: string; cross: boolean };

// ---- deterministic helpers -------------------------------------------------

function hashId(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a: number): () => number {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function norm(v: Vec3): Vec3 {
  const m = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / m, v[1] / m, v[2] / m];
}
// evenly distributed point i of n on a unit sphere
function fibSphere(i: number, n: number): Vec3 {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
  return [
    Math.cos(theta) * Math.sin(phi),
    Math.sin(theta) * Math.sin(phi),
    Math.cos(phi),
  ];
}

// ---- edges + adjacency -----------------------------------------------------

export const EDGES: Edge[] = (() => {
  const seen = new Set<string>();
  const edges: Edge[] = [];
  for (const g of GENRES) {
    for (const r of g.related) {
      const other = GENRE_BY_ID[r];
      if (!other) continue;
      const key = [g.id, r].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ source: g.id, target: r, cross: g.family !== other.family });
    }
  }
  return edges;
})();

export const NEIGHBORS: Record<string, string[]> = (() => {
  const m: Record<string, Set<string>> = {};
  for (const g of GENRES) m[g.id] = new Set();
  for (const e of EDGES) {
    m[e.source].add(e.target);
    m[e.target].add(e.source);
  }
  return Object.fromEntries(Object.entries(m).map(([k, v]) => [k, [...v]]));
})();

/** Star radius: foundational + well-connected genres render bigger. */
export function starSize(g: Genre): number {
  const degree = NEIGHBORS[g.id]?.length ?? 0;
  return (0.95 + degree * 0.12) * (1 + (g.weight ?? 0) * 0.85);
}

/**
 * The single "main" genre id of each family — its brightest, most foundational
 * star (the weighted anchor where one exists, else the best-connected member).
 * Ties resolve to the earliest-listed genre, keeping the pick deterministic.
 * Used to label one representative star per colored cluster in "family" mode.
 */
export const FAMILY_MAIN: Record<FamilyId, string> = (() => {
  const out = {} as Record<FamilyId, string>;
  for (const fid of FAMILY_IDS) {
    const members = GENRES.filter((g) => g.family === fid);
    if (members.length === 0) continue;
    let best = members[0];
    let bestSize = starSize(best);
    for (const g of members.slice(1)) {
      const sz = starSize(g);
      if (sz > bestSize) {
        best = g;
        bestSize = sz;
      }
    }
    out[fid] = best.id;
  }
  return out;
})();

// ---- layout ----------------------------------------------------------------

const SPREAD = 64; // distance from origin to each family centroid

export const FAMILY_CENTROIDS: Record<FamilyId, Vec3> = (() => {
  const out = {} as Record<FamilyId, Vec3>;
  for (const fid of FAMILY_IDS) {
    const d = FAMILY_BY_ID[fid].dir;
    const len = Math.hypot(d[0], d[1], d[2]);
    out[fid] = len === 0 ? [0, 0, 0] : (norm(d).map((c) => c * SPREAD) as Vec3);
  }
  return out;
})();

export const POSITIONS: Record<string, Vec3> = (() => {
  const pos: Record<string, Vec3> = {};
  for (const fid of FAMILY_IDS) {
    const members = GENRES.filter((g) => g.family === fid);
    const centroid = FAMILY_CENTROIDS[fid];
    const clusterR = 9 + members.length * 1.45;
    members.forEach((g, i) => {
      const rand = mulberry32(hashId(g.id));
      const dir = norm([
        ...fibSphere(i, members.length),
      ] as Vec3);
      // jitter direction a touch so it doesn't read as a perfect shell
      const jitter: Vec3 = [
        dir[0] + (rand() - 0.5) * 0.35,
        dir[1] + (rand() - 0.5) * 0.35,
        dir[2] + (rand() - 0.5) * 0.35,
      ];
      const nd = norm(jitter);
      // anchors sit near the cluster core; others fill the volume
      const isAnchor = (g.weight ?? 0) > 0;
      const radius = isAnchor
        ? clusterR * 0.16
        : clusterR * (0.5 + 0.5 * rand());
      pos[g.id] = [
        centroid[0] + nd[0] * radius,
        centroid[1] + nd[1] * radius,
        centroid[2] + nd[2] * radius,
      ];
    });
  }
  return pos;
})();

/** Rough radius of the whole scene — used to frame the overview camera. */
export const SCENE_RADIUS = (() => {
  let max = 1;
  for (const id in POSITIONS) {
    const p = POSITIONS[id];
    max = Math.max(max, Math.hypot(p[0], p[1], p[2]));
  }
  return max;
})();
