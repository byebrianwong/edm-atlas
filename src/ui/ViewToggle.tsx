import { useAtlas } from "../state/store";

/** Atlas ⇄ List switch (top-right). The list is the accessible / no-WebGL view. */
export default function ViewToggle() {
  const view = useAtlas((s) => s.view);
  const setView = useAtlas((s) => s.setView);
  const webglOk = useAtlas((s) => s.webglOk);

  return (
    <div className="viewtoggle" role="group" aria-label="View mode">
      <button
        className={view === "atlas" ? "is-on" : ""}
        onClick={() => setView("atlas")}
        disabled={!webglOk}
        title={webglOk ? "3D atlas" : "3D unavailable on this device"}
      >
        Atlas
      </button>
      <button
        className={view === "list" ? "is-on" : ""}
        onClick={() => setView("list")}
      >
        List
      </button>
    </div>
  );
}
