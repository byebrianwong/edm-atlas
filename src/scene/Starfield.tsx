import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { glowTexture } from "./glow";
import { useAtlas } from "../state/store";

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TINTS = [
  [1, 1, 1],
  [0.7, 0.85, 1], // blue-white
  [0.85, 0.78, 1], // violet
  [0.78, 1, 0.96], // aqua
  [1, 0.92, 0.8], // warm
];

function Layer({
  count,
  inner,
  outer,
  size,
  seed,
  drift,
}: {
  count: number;
  inner: number;
  outer: number;
  size: number;
  seed: number;
  drift: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(seed);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // random point in a spherical shell
      const u = rand();
      const v = rand();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = inner + rand() * (outer - inner);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const tint = TINTS[(rand() * TINTS.length) | 0];
      const b = 0.5 + rand() * 0.5;
      colors[i * 3] = tint[0] * b;
      colors[i * 3 + 1] = tint[1] * b;
      colors[i * 3 + 2] = tint[2] * b;
    }
    return { positions, colors };
  }, [count, inner, outer, seed]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const reduced = useAtlas.getState().reducedMotion;
    if (!reduced) ref.current.rotation.y += dt * drift;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        map={glowTexture()}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Layered parallax starfield — deep, dense, slowly drifting. */
export default function Starfield() {
  return (
    <group>
      <Layer count={2600} inner={340} outer={1200} size={2.1} seed={7} drift={0.004} />
      <Layer count={700} inner={240} outer={620} size={3.6} seed={91} drift={0.009} />
    </group>
  );
}
