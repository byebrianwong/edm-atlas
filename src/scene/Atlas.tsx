import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Starfield from "./Starfield";
import Nebulae from "./Nebulae";
import Constellations from "./Constellations";
import GenreStars from "./GenreStars";
import CameraController from "./CameraController";
import Effects from "./Effects";
import { useAtlas } from "../state/store";

/** The full-viewport 3D star map. */
export default function Atlas() {
  const select = useAtlas((s) => s.select);
  return (
    <Canvas
      className="atlas-canvas"
      camera={{ position: [0, 36, 200], fov: 55, near: 1, far: 3000 }}
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      onPointerMissed={() => select(null)}
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
