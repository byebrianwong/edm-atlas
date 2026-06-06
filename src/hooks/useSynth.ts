import { useCallback } from "react";
import { playGenre, stopGenre } from "../audio/synth";

/** Thin React wrapper over the audio engine. Play-state is mirrored into the
 *  store (store.synthId) by a single subscription in App, so components just
 *  read that and call these toggles. */
export function useSynthControls() {
  const toggle = useCallback((id: string) => playGenre(id), []);
  const stop = useCallback(() => stopGenre(), []);
  return { toggle, stop };
}
