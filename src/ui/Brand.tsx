import { useAtlas } from "../state/store";

/** Top-left wordmark. Clicking it returns to the overview. */
export default function Brand() {
  const select = useAtlas((s) => s.select);
  const setFamilyFilter = useAtlas((s) => s.setFamilyFilter);
  return (
    <button
      className="brand"
      onClick={() => {
        select(null);
        setFamilyFilter(null);
      }}
      aria-label="EDM Atlas — back to overview"
    >
      <span className="brand__mark">
        <span className="brand__star" />
      </span>
      <span className="brand__text">
        <span className="brand__title">EDM Atlas</span>
        <span className="brand__tag">a star map of electronic music</span>
      </span>
    </button>
  );
}
