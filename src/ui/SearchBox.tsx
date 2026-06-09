import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtlas } from "../state/store";
import { ATLAS_GENRES } from "../data/atlas";
import { FAMILY_BY_ID } from "../data/families";
import { ARTISTS_FULL, genreChip } from "../data/artistsAtlas";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type Result =
  | { kind: "genre"; id: string; name: string; tag: string; color: string; score: number }
  | { kind: "artist"; id: string; name: string; tag: string; color: string; score: number };

/** Search-and-fly: filter genres + artists. Genres select a star; artists open
 *  /artist/:id. "/" opens the box. */
export default function SearchBox() {
  const open = useAtlas((s) => s.searchOpen);
  const setOpen = useAtlas((s) => s.setSearchOpen);
  const select = useAtlas((s) => s.select);
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement;
      if (e.key === "/" && !open && !typing) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];

    const genres: Result[] = ATLAS_GENRES.filter((g) =>
      `${g.name} ${g.family}`.toLowerCase().includes(t),
    ).map((g) => ({
      kind: "genre",
      id: g.id,
      name: g.name,
      tag: FAMILY_BY_ID[g.family].short,
      color: FAMILY_BY_ID[g.family].color,
      score: g.name.toLowerCase().startsWith(t) ? 0 : 1,
    }));

    const artists: Result[] = ARTISTS_FULL.filter(
      (a) =>
        a.name.toLowerCase().includes(t) ||
        a.aka.some((k) => k.toLowerCase().includes(t)),
    ).map((a) => ({
      kind: "artist",
      id: a.id,
      name: a.name,
      tag: "Artist",
      color: genreChip(a.genres[0] ?? "")?.color ?? "var(--accent)",
      score: a.name.toLowerCase().startsWith(t) ? 0 : 1,
    }));

    return [...artists, ...genres]
      .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name))
      .slice(0, 8);
  }, [q]);

  const pick = (r: Result) => {
    if (r.kind === "artist") navigate(`/artist/${r.id}`);
    else select(r.id);
    setOpen(false);
  };

  return (
    <div className={`search${open ? " is-open" : ""}`}>
      {!open ? (
        <button
          className="search__trigger"
          onClick={() => {
            setQ("");
            setOpen(true);
          }}
          aria-label="Search genres and artists"
        >
          <SearchIcon />
          <span>Search</span>
          <kbd>/</kbd>
        </button>
      ) : (
        <div className="search__panel">
          <div className="search__field">
            <SearchIcon />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search genres & artists…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) pick(results[0]);
              }}
              aria-label="Search genres and artists"
            />
            <button
              className="search__close"
              onClick={() => setOpen(false)}
              aria-label="Close search"
            >
              esc
            </button>
          </div>
          {results.length > 0 && (
            <ul className="search__results">
              {results.map((r) => (
                <li key={`${r.kind}:${r.id}`}>
                  <button onClick={() => pick(r)}>
                    <span className="search__dot" style={{ background: r.color }} />
                    <span className="search__name">{r.name}</span>
                    <em className="mono">{r.tag}</em>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
