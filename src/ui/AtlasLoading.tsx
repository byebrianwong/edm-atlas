/** Shown while the (heavy) 3D scene chunk streams in. */
export default function AtlasLoading() {
  return (
    <div className="atlas-loading" aria-label="Loading the atlas">
      <span className="atlas-loading__star" />
      <span className="atlas-loading__text mono">CHARTING THE ATLAS</span>
    </div>
  );
}
