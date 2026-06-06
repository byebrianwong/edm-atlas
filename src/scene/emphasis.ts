/**
 * Pure focus/dim math, polled by stars + edges inside useFrame (so hovering a
 * star animates the highlight without triggering React re-renders).
 *
 * Priority: an active focus (hover, else selection) lights that node, its
 * neighbors, and its edges, dimming the rest. With no focus, a family filter
 * dims everything outside the chosen family. Otherwise: calm baseline.
 */

import { NEIGHBORS } from "../data/graph";
import type { FamilyId } from "../data/genres";

export type Snapshot = {
  hoveredId: string | null;
  selectedId: string | null;
  familyFilter: FamilyId | null;
};

export type StarTarget = { opacity: number; scale: number; hot: boolean };

export function focusOf(s: Snapshot): string | null {
  return s.hoveredId ?? s.selectedId;
}

export function starTarget(
  id: string,
  family: FamilyId,
  s: Snapshot,
): StarTarget {
  const focus = focusOf(s);
  if (focus) {
    if (id === focus) return { opacity: 1, scale: 1.22, hot: true };
    if (NEIGHBORS[focus]?.includes(id)) return { opacity: 1, scale: 1.0, hot: true };
    return { opacity: 0.14, scale: 0.78, hot: false };
  }
  if (s.familyFilter) {
    if (family === s.familyFilter) return { opacity: 1, scale: 1.05, hot: true };
    return { opacity: 0.1, scale: 0.76, hot: false };
  }
  return { opacity: 0.94, scale: 1, hot: false };
}

/** Returns target opacity for an edge given the current focus/filter. */
export function edgeTarget(
  srcId: string,
  tgtId: string,
  srcFam: FamilyId,
  tgtFam: FamilyId,
  cross: boolean,
  s: Snapshot,
): number {
  const focus = focusOf(s);
  if (focus) {
    return srcId === focus || tgtId === focus ? 0.9 : 0.025;
  }
  if (s.familyFilter) {
    if (srcFam === s.familyFilter && tgtFam === s.familyFilter) return 0.5;
    if (srcFam === s.familyFilter || tgtFam === s.familyFilter) return 0.14;
    return 0.03;
  }
  return cross ? 0.11 : 0.2;
}
