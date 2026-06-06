import { useAtlas } from "../state/store";

/** First-load welcome overlay. Fades out on "Enter" or first star selection. */
export default function Intro() {
  const introSeen = useAtlas((s) => s.introSeen);
  const dismiss = useAtlas((s) => s.dismissIntro);
  if (introSeen) return null;

  return (
    <div className="intro" role="dialog" aria-label="Welcome to EDM Atlas">
      <div className="intro__card">
        <span className="intro__kicker mono">EDM ATLAS</span>
        <h2 className="intro__title">Electronic music as a star map.</h2>
        <p className="intro__lead">
          31 subgenres across 8 families, drifting in deep space. Each star is a
          genre — what makes it sound the way it does, a real track to hear it,
          and the constellation of genres it connects to.
        </p>
        <ul className="intro__controls">
          <li>
            <b>Drag</b> to orbit
          </li>
          <li>
            <b>Scroll</b> to zoom
          </li>
          <li>
            <b>Click a star</b> to dive in
          </li>
        </ul>
        <button className="intro__cta" onClick={dismiss}>
          Enter the atlas
        </button>
      </div>
    </div>
  );
}
