import { useAtlas } from "../state/store";

/** Subtle bottom-center controls hint, shown until the first genre is opened.
 *  Touch screens get their own wording: there's no hover, so the first tap
 *  zooms into an area and names its stars, and the next tap opens one. */
export default function ControlsHint() {
  const introSeen = useAtlas((s) => s.introSeen);
  const selectedId = useAtlas((s) => s.selectedId);
  const area = useAtlas((s) => s.area);
  if (!introSeen || selectedId) return null;
  return (
    <>
      <div className="hint hint--mouse" aria-hidden>
        <span>Drag to orbit</span>
        <i />
        <span>Scroll to zoom</span>
        <i />
        <span>Click a star</span>
      </div>
      <div className="hint hint--touch" aria-hidden>
        {area ? (
          <>
            <span>Tap a name to open it</span>
            <i />
            <span>Tap empty space to zoom out</span>
          </>
        ) : (
          <>
            <span>Drag to orbit</span>
            <i />
            <span>Tap an area to see its genres</span>
          </>
        )}
      </div>
    </>
  );
}
