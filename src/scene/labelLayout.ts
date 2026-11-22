/**
 * Screen-space de-overlap for the tappable star names shown when a touch user
 * zooms into an area. Every name starts just under its star; when that spot
 * collides with a name already placed, it tries above, right, then left. A
 * name with no free spot is marked crowded (drawn faint and not tappable), so
 * the names you can read are also the ones a tap will hit.
 */

/** 0 below, 1 above, 2 right, 3 left of the star. */
export type Slot = 0 | 1 | 2 | 3;

export type LabelBox = {
  id: string;
  /** star position on screen, CSS px */
  x: number;
  y: number;
  /** text size (without the tap padding), CSS px */
  w: number;
  h: number;
  /** the slot used last frame, kept while it stays free so names don't jump */
  prev: Slot;
};

const GAP_Y = 16; // star center → text center, below/above
const GAP_X = 12; // star center → text edge, right/left
const PAD = 2; // breathing room between two names

/** Offset of the text center from the star for a slot. */
export function slotOffset(slot: Slot, w: number): [number, number] {
  switch (slot) {
    case 0:
      return [0, GAP_Y];
    case 1:
      return [0, -GAP_Y];
    case 2:
      return [w / 2 + GAP_X, 0];
    case 3:
      return [-(w / 2 + GAP_X), 0];
  }
}

type Rect = { l: number; t: number; r: number; b: number };

function rectAt(b: LabelBox, slot: Slot): Rect {
  const [dx, dy] = slotOffset(slot, b.w);
  const cx = b.x + dx;
  const cy = b.y + dy;
  return {
    l: cx - b.w / 2 - PAD,
    r: cx + b.w / 2 + PAD,
    t: cy - b.h / 2 - PAD,
    b: cy + b.h / 2 + PAD,
  };
}

const hits = (a: Rect, b: Rect) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;

/**
 * Greedy placement. `boxes` must be in priority order (most important first);
 * earlier names keep their preferred spot and later ones work around them.
 * Returns each id's slot, or null when every slot is taken (crowded).
 */
export function placeLabels(boxes: LabelBox[]): Map<string, Slot | null> {
  const placed: Rect[] = [];
  const out = new Map<string, Slot | null>();
  for (const b of boxes) {
    const order: Slot[] = [b.prev, 0, 1, 2, 3];
    let chosen: Slot | null = null;
    for (const slot of order) {
      const r = rectAt(b, slot);
      if (!placed.some((p) => hits(p, r))) {
        chosen = slot;
        placed.push(r);
        break;
      }
    }
    out.set(b.id, chosen);
  }
  return out;
}
