import { useAtlas } from "../state/store";
import { FAMILIES } from "../data/families";
import { ATLAS_GENRES } from "../data/atlas";

/** 2D fallback: every genre as a card, grouped by family. Works without WebGL,
 *  is keyboard/screen-reader friendly, and gives crawlers real text content.
 *  Selecting a card opens the same detail panel. */
export default function GenreList() {
  const select = useAtlas((s) => s.select);

  return (
    <div className="genrelist">
      <div className="genrelist__inner">
        <header className="genrelist__head">
          <h1 className="genrelist__title">The EDM Atlas</h1>
          <p className="genrelist__lead">
            31 subgenres of electronic dance music across 8 families. Pick any one
            to read what defines it, hear a real example, and see what it connects
            to.
          </p>
        </header>

        {FAMILIES.map((f) => {
          const members = ATLAS_GENRES.filter((g) => g.family === f.id);
          return (
            <section key={f.id} className="famgroup">
              <h2 className="famgroup__title" style={{ color: f.color }}>
                <span className="famgroup__dot" style={{ background: f.color }} />
                {f.id}
                <span className="famgroup__blurb">{f.blurb}</span>
              </h2>
              <div className="famgroup__grid">
                {members.map((g) => (
                  <button
                    key={g.id}
                    className="gcard"
                    onClick={() => select(g.id)}
                    style={{ ["--c" as string]: f.color }}
                  >
                    <span className="gcard__top">
                      <span className="gcard__name">{g.name}</span>
                      <span className="gcard__bpm mono">{g.typicalBpm}</span>
                    </span>
                    <span className="gcard__unique">{g.unique}</span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}

        <footer className="genrelist__foot">
          Genre boundaries in electronic music are debated and overlapping — these
          families and links are a reasonable, teachable structure, not a
          definitive taxonomy.
        </footer>
      </div>
    </div>
  );
}
