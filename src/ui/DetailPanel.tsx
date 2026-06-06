import { useEffect } from "react";
import { useAtlas } from "../state/store";
import { ATLAS_BY_ID } from "../data/atlas";
import { FAMILY_BY_ID } from "../data/families";
import SpotifyEmbed from "./SpotifyEmbed";
import SynthButton from "./SynthButton";

export default function DetailPanel() {
  const selectedId = useAtlas((s) => s.selectedId);
  const select = useAtlas((s) => s.select);

  // Esc closes the panel.
  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") select(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, select]);

  if (!selectedId) return null;
  const g = ATLAS_BY_ID[selectedId];
  if (!g) return null;
  const fam = FAMILY_BY_ID[g.family];

  return (
    <aside
      className="panel"
      style={{ ["--fam" as string]: fam.color, ["--fam-glow" as string]: fam.glow }}
      aria-label={`${g.name} details`}
    >
      <button className="panel__close" onClick={() => select(null)} aria-label="Close">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="panel__scroll">
        <header className="panel__head">
          <div className="panel__meta">
            <span className="fam-chip" style={{ color: fam.color }}>
              <span className="fam-chip__dot" style={{ background: fam.color }} />
              {fam.id}
            </span>
            <span className="panel__bpm mono">{g.typicalBpm} BPM</span>
          </div>
          <h2 className="panel__name">{g.name}</h2>
          <p className="panel__range mono">
            {g.bpm[0]}–{g.bpm[1]} BPM range
          </p>
        </header>

        <p className="panel__unique">{g.unique}</p>

        <section className="panel__block">
          <h3 className="panel__label">Signature elements</h3>
          <p className="panel__signature">{g.signature}</p>
        </section>

        <section className="panel__block">
          <h3 className="panel__label">Hear it</h3>
          <div className="panel__tracks">
            {g.examples
              .filter((e) => !e.recent)
              .map((ex, i) => (
                <SpotifyEmbed key={`e${i}`} track={ex} compact={i > 0} />
              ))}
          </div>
          {!g.examples.some((e) => e.recent) && (
            <p className="panel__note">
              Spotify plays a ~30s preview when you’re logged out — sign in to
              Spotify for full tracks.
            </p>
          )}
        </section>

        {g.examples.some((e) => e.recent) && (
          <section className="panel__block">
            <h3 className="panel__label">
              Recent tracks <span className="panel__badge">last few years</span>
            </h3>
            <div className="panel__tracks">
              {g.examples
                .filter((e) => e.recent)
                .map((ex, i) => (
                  <SpotifyEmbed key={`r${i}`} track={ex} compact />
                ))}
            </div>
            <p className="panel__note">
              Spotify plays a ~30s preview when you’re logged out — sign in to
              Spotify for full tracks.
            </p>
          </section>
        )}

        <section className="panel__block">
          <h3 className="panel__label">Building blocks</h3>
          <SynthButton genreId={g.id} color={fam.color} />
          <p className="panel__note">
            An original synthesis of this genre’s defining rhythm, bass and signature
            effect — a teaching demo, not the real song.
          </p>
        </section>

        {g.related.length > 0 && (
          <section className="panel__block">
            <h3 className="panel__label">Connects to</h3>
            <div className="panel__related">
              {g.related.map((rid) => {
                const r = ATLAS_BY_ID[rid];
                if (!r) return null;
                const rf = FAMILY_BY_ID[r.family];
                return (
                  <button
                    key={rid}
                    className="related-chip"
                    onClick={() => select(rid)}
                    style={{ ["--c" as string]: rf.color }}
                  >
                    <span className="related-chip__dot" />
                    {r.name}
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
