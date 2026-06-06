import { useAtlas } from "../state/store";
import { FAMILIES } from "../data/families";

/** Bottom-left family legend that doubles as a filter: click a family to dim
 *  everything else; click again to clear. */
export default function FamilyLegend() {
  const familyFilter = useAtlas((s) => s.familyFilter);
  const toggle = useAtlas((s) => s.toggleFamilyFilter);

  return (
    <div className="legend" role="group" aria-label="Filter by family">
      <span className="legend__title mono">FAMILIES</span>
      <div className="legend__items">
        {FAMILIES.map((f) => {
          const active = familyFilter === f.id;
          const dim = familyFilter !== null && !active;
          return (
            <button
              key={f.id}
              className={`legend__item${active ? " is-active" : ""}${
                dim ? " is-dim" : ""
              }`}
              onClick={() => toggle(f.id)}
              style={{ ["--c" as string]: f.color }}
              title={f.blurb}
              aria-pressed={active}
            >
              <span className="legend__dot" style={{ background: f.color }} />
              <span className="legend__label">{f.short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
