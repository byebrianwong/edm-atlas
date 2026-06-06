import { useEffect, useMemo, useRef, useState } from "react";
import { useAtlas } from "../state/store";
import { ATLAS_GENRES } from "../data/atlas";
import { FAMILY_BY_ID } from "../data/families";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Search-and-fly: filter the 31 genres by name/family and select one. "/" opens. */
export default function SearchBox() {
  const open = useAtlas((s) => s.searchOpen);
  const setOpen = useAtlas((s) => s.setSearchOpen);
  const select = useAtlas((s) => s.select);
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

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return ATLAS_GENRES.filter((g) =>
      `${g.name} ${g.family}`.toLowerCase().includes(t),
    ).slice(0, 7);
  }, [q]);

  const pick = (id: string) => {
    select(id);
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
          aria-label="Search genres"
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
              placeholder="Search 31 genres…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) pick(results[0].id);
              }}
              aria-label="Search genres"
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
              {results.map((g) => {
                const f = FAMILY_BY_ID[g.family];
                return (
                  <li key={g.id}>
                    <button onClick={() => pick(g.id)}>
                      <span className="search__dot" style={{ background: f.color }} />
                      <span className="search__name">{g.name}</span>
                      <em className="mono">{f.short}</em>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
