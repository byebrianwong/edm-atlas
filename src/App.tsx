import { lazy, Suspense, useEffect } from "react";
import AtlasLoading from "./ui/AtlasLoading";
import Brand from "./ui/Brand";
import SearchBox from "./ui/SearchBox";
import ViewToggle from "./ui/ViewToggle";
import FamilyLegend from "./ui/FamilyLegend";
import DetailPanel from "./ui/DetailPanel";
import ControlsHint from "./ui/ControlsHint";
import Intro from "./ui/Intro";
import GenreList from "./ui/GenreList";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { detectWebGL } from "./lib/webgl";
import { useAtlas } from "./state/store";
import { subscribe, stopGenre } from "./audio/synth";
import "./styles/app.css";
import "./styles/ui.css";

// The 3D scene pulls in three/r3f/drei/postprocessing — lazy-load it so the
// intro + HUD paint immediately and the list-only (no-WebGL) path stays lean.
const Atlas = lazy(() => import("./scene/Atlas"));

export default function App() {
  useReducedMotion();
  const view = useAtlas((s) => s.view);
  const webglOk = useAtlas((s) => s.webglOk);
  const selectedId = useAtlas((s) => s.selectedId);
  const introSeen = useAtlas((s) => s.introSeen);
  const dismissIntro = useAtlas((s) => s.dismissIntro);
  const setSynthId = useAtlas((s) => s.setSynthId);

  // WebGL support → fall back to the list view if absent.
  useEffect(() => {
    const ok = detectWebGL();
    useAtlas.getState().setWebglOk(ok);
    if (!ok) useAtlas.getState().setView("list");
  }, []);

  // Mirror the audio engine's play-state into the store.
  useEffect(() => subscribe(setSynthId), [setSynthId]);

  // Opening a genre dismisses the intro; changing genres stops the prior demo.
  useEffect(() => {
    if (selectedId && !introSeen) dismissIntro();
  }, [selectedId, introSeen, dismissIntro]);
  useEffect(() => {
    stopGenre();
  }, [selectedId]);

  const showAtlas = webglOk && view === "atlas";

  return (
    <div className="app">
      {showAtlas ? (
        <Suspense fallback={<AtlasLoading />}>
          <Atlas />
        </Suspense>
      ) : (
        <GenreList />
      )}

      <Brand />
      <SearchBox />
      <ViewToggle />
      {showAtlas && <FamilyLegend />}
      <DetailPanel />
      {showAtlas && <ControlsHint />}
      {showAtlas && <Intro />}
    </div>
  );
}
