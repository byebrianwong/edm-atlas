import type { Track } from "../data/genres";

/** A Spotify track embed. Logged-out users get the ~30s preview; that's stated
 *  near the players in the panel. Falls back to a search link if unresolved. */
export default function SpotifyEmbed({
  track,
  compact,
}: {
  track: Track;
  compact?: boolean;
}) {
  if (!track.spotifyId) {
    const q = encodeURIComponent(`${track.artist} ${track.title}`);
    return (
      <a
        className="spotify-fallback"
        href={`https://open.spotify.com/search/${q}`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="spotify-fallback__title">
          {track.artist} — {track.title}
        </span>
        <span className="spotify-fallback__cta">Open in Spotify ↗</span>
      </a>
    );
  }
  return (
    <iframe
      className="spotify-embed"
      title={`${track.artist} — ${track.title}`}
      src={`https://open.spotify.com/embed/track/${track.spotifyId}?theme=0`}
      width="100%"
      height={compact ? 80 : 152}
      frameBorder={0}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  );
}
