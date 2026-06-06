import { useEffect } from "react";
import { useAtlas } from "../state/store";

/** Mirrors the OS "reduce motion" preference into the store. */
export function useReducedMotion() {
  const setReducedMotion = useAtlas((s) => s.setReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [setReducedMotion]);
}
