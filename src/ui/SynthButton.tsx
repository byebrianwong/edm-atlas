import { useState } from "react";
import { useAtlas } from "../state/store";
import { useSynthControls } from "../hooks/useSynth";

/** "Play the building blocks" — runs the synthesized signature loop for a genre.
 *  Lazy-loads Tone.js on first press (hence the brief busy state). */
export default function SynthButton({
  genreId,
  color,
}: {
  genreId: string;
  color: string;
}) {
  const synthId = useAtlas((s) => s.synthId);
  const { toggle } = useSynthControls();
  const [busy, setBusy] = useState(false);
  const playing = synthId === genreId;

  const onClick = async () => {
    setBusy(true);
    try {
      await toggle(genreId);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className={`synth-btn${playing ? " is-playing" : ""}`}
      onClick={onClick}
      aria-pressed={playing}
      style={{ ["--syn" as string]: color }}
    >
      <span className="synth-btn__icon" aria-hidden>
        {busy ? (
          <span className="synth-spinner" />
        ) : playing ? (
          <span className="eq">
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : (
          <svg viewBox="0 0 24 24" width="15" height="15">
            <path d="M7 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        )}
      </span>
      <span className="synth-btn__label">
        {playing ? "Stop building blocks" : "Play the building blocks"}
      </span>
    </button>
  );
}
