import { useAtlas } from "../state/store";

/** Subtle bottom-center controls hint, shown until the first genre is opened. */
export default function ControlsHint() {
  const introSeen = useAtlas((s) => s.introSeen);
  const selectedId = useAtlas((s) => s.selectedId);
  if (!introSeen || selectedId) return null;
  return (
    <div className="hint" aria-hidden>
      <span>Drag to orbit</span>
      <i />
      <span>Scroll to zoom</span>
      <i />
      <span>Click a star</span>
    </div>
  );
}
