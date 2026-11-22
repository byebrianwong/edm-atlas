import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  POSITIONS,
  SCENE_RADIUS,
  FAMILY_CENTROIDS,
  FAMILY_RADIUS,
} from "../data/graph";
import { useAtlas } from "../state/store";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Flight = {
  t: number;
  dur: number;
  fromCam: THREE.Vector3;
  toCam: THREE.Vector3;
  fromTar: THREE.Vector3;
  toTar: THREE.Vector3;
};

/** OrbitControls + a smooth fly-to that frames the selected genre, or (on
 *  touch) the whole cluster of the area you zoomed into. */
export default function CameraController() {
  const controls = useRef<any>(null);
  const camera = useThree((s) => s.camera);
  const selectedId = useAtlas((s) => s.selectedId);
  const area = useAtlas((s) => s.area);
  const reduced = useAtlas((s) => s.reducedMotion);
  const flight = useRef<Flight | null>(null);

  const overviewCam = new THREE.Vector3(0, SCENE_RADIUS * 0.42, SCENE_RADIUS * 2.4);
  const overviewTar = new THREE.Vector3(0, 0, 0);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const curTar = c.target.clone();

    let toCam: THREE.Vector3;
    let toTar: THREE.Vector3;
    if (selectedId && POSITIONS[selectedId]) {
      const p = new THREE.Vector3(...POSITIONS[selectedId]);
      const dir = camera.position.clone().sub(curTar).normalize();
      if (dir.lengthSq() < 0.001) dir.set(0, 0.2, 1).normalize();
      toTar = p;
      toCam = p.clone().add(dir.multiplyScalar(44));
    } else if (area) {
      // Back off far enough that the cluster fits the narrower screen axis
      // (a portrait phone is far narrower than the 55° vertical FOV), with
      // margin for the names drawn under each star.
      const c = new THREE.Vector3(...FAMILY_CENTROIDS[area]);
      const dir = camera.position.clone().sub(curTar).normalize();
      if (dir.lengthSq() < 0.001) dir.set(0, 0.2, 1).normalize();
      const cam = camera as THREE.PerspectiveCamera;
      const vHalf = THREE.MathUtils.degToRad(cam.fov / 2);
      const hHalf = Math.atan(Math.tan(vHalf) * cam.aspect);
      const half = Math.min(vHalf, hHalf);
      const dist = THREE.MathUtils.clamp(
        (FAMILY_RADIUS[area] * 1.5) / Math.tan(half),
        40,
        SCENE_RADIUS * 2,
      );
      toTar = c;
      toCam = c.clone().add(dir.multiplyScalar(dist));
    } else {
      toTar = overviewTar.clone();
      toCam = overviewCam.clone();
    }

    if (reduced) {
      camera.position.copy(toCam);
      c.target.copy(toTar);
      c.update();
      flight.current = null;
      return;
    }
    flight.current = {
      t: 0,
      dur: selectedId || area ? 1.1 : 1.5,
      fromCam: camera.position.clone(),
      toCam,
      fromTar: curTar,
      toTar,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, area, reduced]);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;
    const s = useAtlas.getState();
    // Hold still while zoomed into an area so the names stay put under a thumb.
    c.autoRotate =
      !flight.current && !s.reducedMotion && !s.selectedId && !s.area;

    if (flight.current) {
      const f = flight.current;
      f.t = Math.min(1, f.t + dt / f.dur);
      const k = easeOut(f.t);
      camera.position.lerpVectors(f.fromCam, f.toCam, k);
      c.target.lerpVectors(f.fromTar, f.toTar, k);
      if (f.t >= 1) flight.current = null;
    }
    c.update();
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={20}
      maxDistance={SCENE_RADIUS * 3.4}
      autoRotate={false}
      autoRotateSpeed={0.26}
      rotateSpeed={0.72}
      zoomSpeed={0.9}
    />
  );
}
