import { Suspense, useRef } from "react";
import { Canvas, type RootState } from "@react-three/fiber";
import * as THREE from "three";
import Starfield from "./Starfield";
import Nebulae from "./Nebulae";
import Constellations from "./Constellations";
import GenreStars from "./GenreStars";
import CameraController from "./CameraController";
import Effects from "./Effects";
import { POSITIONS } from "../data/graph";
import { ATLAS_GENRES, ATLAS_BY_ID } from "../data/atlas";
import { useAtlas } from "../state/store";
import { lastPressWasTouch } from "../lib/pointer";

// How close (in CSS px) a tap that missed every star's hit sphere must land to
// a star to still count. Generous in the overview, where a tap just picks the
// area to zoom into; tight once zoomed in, where it opens a specific genre.
const OVERVIEW_REACH = 80;
const ZOOMED_REACH = 28;

const tmp = new THREE.Vector3();

/** The star drawn closest to a screen point, within `maxPx`. */
function nearestStar(st: RootState, e: MouseEvent, maxPx: number): string | null {
  const rect = st.gl.domElement.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  let best: string | null = null;
  let bestD = maxPx;
  for (const g of ATLAS_GENRES) {
    tmp.set(...POSITIONS[g.id]).project(st.camera);
    if (tmp.z > 1) continue; // behind the camera
    const sx = ((tmp.x + 1) / 2) * rect.width;
    const sy = ((1 - tmp.y) / 2) * rect.height;
    const d = Math.hypot(sx - x, sy - y);
    if (d < bestD) {
      bestD = d;
      best = g.id;
    }
  }
  return best;
}

/** The full-viewport 3D star map. */
export default function Atlas() {
  const r3f = useRef<RootState | null>(null);

  // A click/tap that hit no star. On touch, a near miss still counts (stars are
  // small under a thumb). Otherwise step back out one level: an open genre
  // closes first (landing on its area's names), then the area itself.
  const onMissed = (e: MouseEvent) => {
    const s = useAtlas.getState();
    const st = r3f.current;
    if (st && lastPressWasTouch()) {
      const overview = !s.area && !s.selectedId;
      const id = nearestStar(st, e, overview ? OVERVIEW_REACH : ZOOMED_REACH);
      if (id) {
        if (overview) s.setArea(ATLAS_BY_ID[id].family);
        else s.select(id);
        return;
      }
    }
    if (s.selectedId) s.select(null);
    else s.setArea(null);
  };

  return (
    <Canvas
      className="atlas-canvas"
      camera={{ position: [0, 36, 200], fov: 55, near: 1, far: 3000 }}
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      onCreated={(st) => {
        r3f.current = st;
      }}
      onPointerMissed={onMissed}
    >
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#070a18", 440, 1500]} />
      <Suspense fallback={null}>
        <Starfield />
        <Nebulae />
        <Constellations />
        <GenreStars />
      </Suspense>
      <CameraController />
      <Effects />
    </Canvas>
  );
}
