import { useAtlas, type LabelMode } from "../state/store";

/** 3-step slider (bottom-left, above the family legend) controlling how many
 *  star titles stay visible: hover-only → the opened family → all of them. */
const MODES: LabelMode[] = ["hover", "family", "all"];
const TICKS: { label: string; hint: string }[] = [
  { label: "Hover", hint: "Only the star you point at is named" },
  { label: "Family", hint: "Name every genre in the constellation you open" },
  { label: "All", hint: "Name every star, all the time" },
];

export default function LabelSlider() {
  const mode = useAtlas((s) => s.labelMode);
  const setMode = useAtlas((s) => s.setLabelMode);
  const idx = Math.max(0, MODES.indexOf(mode));

  return (
    <div className="labels" role="group" aria-label="Star title visibility">
      <span className="labels__title mono">STAR TITLES</span>
      <div className="labels__slider">
        <input
          className="labels__range"
          type="range"
          min={0}
          max={2}
          step={1}
          value={idx}
          onChange={(e) => setMode(MODES[Number(e.target.value)])}
          aria-label="Star title visibility"
          aria-valuetext={TICKS[idx].label}
          title={TICKS[idx].hint}
          style={{ ["--p" as string]: `${(idx / 2) * 100}%` }}
        />
        <div className="labels__ticks" aria-hidden>
          {TICKS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              className={`labels__tick${i === idx ? " is-on" : ""}`}
              onClick={() => setMode(MODES[i])}
              title={t.hint}
              tabIndex={-1}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
