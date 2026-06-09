import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ARTIST_BY_ID, genreChip } from "../data/artistsAtlas";
import { useAtlas } from "../state/store";
import SpotifyEmbed from "./SpotifyEmbed";

/** Small clickable genre pill that flies the atlas to that genre's star. */
function GenreChip({ id, onPick }: { id: string; onPick: (id: string) => void }) {
  const chip = genreChip(id);
  if (!chip) return null;
  return (
    <button
      className="related-chip"
      style={{ ["--c" as string]: chip.color }}
      onClick={() => onPick(chip.id)}
      title={`Go to ${chip.name} on the atlas`}
    >
      <span className="related-chip__dot" />
      {chip.name}
    </button>
  );
}

/**
 * Full-screen artist page at /artist/:id. Renders over the persistent atlas:
 * the artist's genres and each top track's genres link back to stars on the map.
 */
export default function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const select = useAtlas((s) => s.select);

  const artist = id ? ARTIST_BY_ID[id] : undefined;

  // Close the genre detail panel while a full artist page is up.
  useEffect(() => {
    select(null);
  }, [select, id]);

  // Title + Esc-to-close.
  useEffect(() => {
    const prev = document.title;
    if (artist) document.title = `${artist.name} — EDM Atlas`;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.title = prev;
    };
  }, [artist, navigate]);

  // Pick a genre: drop back to the atlas and select its star.
  const goToGenre = (genreId: string) => {
    select(genreId);
    navigate("/");
  };

  if (!artist) {
    return (
      <div className="artist-overlay" onClick={() => navigate("/")}>
        <div className="artist-page artist-page--empty" onClick={(e) => e.stopPropagation()}>
          <p className="artist-empty__msg">No artist found for “{id}”.</p>
          <button className="related-chip" onClick={() => navigate("/")}>
            ← Back to the atlas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="artist-overlay" onClick={() => navigate("/")}>
      <article
        className="artist-page"
        onClick={(e) => e.stopPropagation()}
        aria-label={`${artist.name} details`}
      >
        <button
          className="panel__close artist-page__close"
          onClick={() => navigate("/")}
          aria-label="Back to atlas"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="artist-page__scroll">
          <header className="artist-head">
            <span className="artist-head__kicker mono">Artist</span>
            <h1 className="artist-head__name">{artist.name}</h1>
            <p className="artist-head__blurb">{artist.blurb}</p>

            <div className="artist-head__genres">
              {artist.genres.map((g) => (
                <GenreChip key={g} id={g} onPick={goToGenre} />
              ))}
            </div>
            {artist.rawGenres.length > 0 && (
              <p className="artist-head__raw mono">
                Spotify tags: {artist.rawGenres.join(" · ")}
              </p>
            )}
            {artist.spotifyArtistId && (
              <a
                className="artist-head__spotify"
                href={`https://open.spotify.com/artist/${artist.spotifyArtistId}`}
                target="_blank"
                rel="noreferrer"
              >
                Open on Spotify ↗
              </a>
            )}
          </header>

          <section className="panel__block">
            <h2 className="panel__label">Top tracks · genres per song</h2>
            <div className="artist-tracks">
              {artist.topTracks.map((t, i) => (
                <div className="artist-track" key={`${t.title}-${i}`}>
                  <div className="artist-track__genres">
                    {t.genres.map((g) => (
                      <GenreChip key={g} id={g} onPick={goToGenre} />
                    ))}
                    {t.rawGenres && t.rawGenres.length > 0 && (
                      <span className="artist-track__raw mono">{t.rawGenres.join(" · ")}</span>
                    )}
                  </div>
                  <SpotifyEmbed
                    track={{ artist: artist.name, title: t.title, spotifyId: t.spotifyId ?? null }}
                    compact={i > 0}
                  />
                </div>
              ))}
            </div>
            <p className="panel__note">
              Spotify plays a ~30s preview when you’re logged out — sign in to
              Spotify for full tracks. Tap a genre chip to fly to it on the atlas.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
