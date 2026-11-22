/**
 * Remembers what kind of pointer started the latest interaction. A `click`
 * event doesn't reliably carry `pointerType` across browsers (older Safari
 * dispatches a plain MouseEvent), so we record it on `pointerdown` in the
 * capture phase, before any scene or overlay handler runs.
 */

let lastType: string = "mouse";

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointerdown",
    (e) => {
      lastType = e.pointerType || "mouse";
    },
    { capture: true, passive: true },
  );
}

/** True when the most recent press came from a finger (phone or tablet). */
export function lastPressWasTouch(): boolean {
  return lastType === "touch";
}
