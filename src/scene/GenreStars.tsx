import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { POSITIONS, starSize } from "../data/graph";
import { ATLAS_GENRES, ATLAS_BY_ID } from "../data/atlas";
import { FAMILY_BY_ID } from "../data/families";
import type { Genre } from "../data/genres";
import { glowTexture } from "./glow";
import { starTarget } from "./emphasis";
import { useAtlas } from "../state/store";

const tex = glowTexture;

function hashPhase(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return ((h >>> 0) % 1000) / 1000 * Math.PI * 2;
}

function Star({ g }: { g: Genre }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowMat = useRef<THREE.SpriteMaterial>(null);
  const haloMat = useRef<THREE.SpriteMaterial>(null);
  const coreMat = useRef<THREE.SpriteMaterial>(null);
  const cur = useRef({ opacity: 0.94, scale: 1 });

  const fam = FAMILY_BY_ID[g.family];
  const size = useMemo(() => starSize(g), [g]);
  const phase = useMemo(() => hashPhase(g.id), [g.id]);
  const pos = POSITIONS[g.id];

  const hover = useAtlas((s) => s.hover);
  const select = useAtlas((s) => s.select);

  useFrame(({ clock }) => {
    const s = useAtlas.getState();
    const t = starTarget(g.id, g.family, s);
    cur.current.opacity += (t.opacity - cur.current.opacity) * 0.14;
    cur.current.scale += (t.scale - cur.current.scale) * 0.14;
    const o = cur.current.opacity;
    const tw = s.reducedMotion
      ? 1
      : 1 + Math.sin(clock.elapsedTime * 1.6 + phase) * 0.07;
    if (glowMat.current) glowMat.current.opacity = o * 0.7;
    if (haloMat.current) haloMat.current.opacity = o * 0.95;
    if (coreMat.current) coreMat.current.opacity = Math.min(1, o * 1.1) * tw;
    if (groupRef.current) groupRef.current.scale.setScalar(cur.current.scale);
  });

  const glowScale = size * 9;
  const haloScale = size * 3.6;
  const coreScale = size * 1.7;
  const hit = Math.max(2.4, size * 2.1);

  return (
    <group ref={groupRef} position={pos}>
      {/* wide soft glow in the family color */}
      <sprite scale={[glowScale, glowScale, glowScale]}>
        <spriteMaterial
          ref={glowMat}
          map={tex()}
          color={fam.color}
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </sprite>
      {/* tighter bright halo in the family glow color */}
      <sprite scale={[haloScale, haloScale, haloScale]}>
        <spriteMaterial
          ref={haloMat}
          map={tex()}
          color={fam.glow}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </sprite>
      {/* white-hot core */}
      <sprite scale={[coreScale, coreScale, coreScale]}>
        <spriteMaterial
          ref={coreMat}
          map={tex()}
          color="#ffffff"
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </sprite>
      {/* invisible hit proxy */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          hover(g.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          hover(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          select(g.id);
        }}
      >
        <sphereGeometry args={[hit, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function HoverLabel() {
  const hoveredId = useAtlas((s) => s.hoveredId);
  if (!hoveredId) return null;
  const g = ATLAS_BY_ID[hoveredId];
  const pos = POSITIONS[hoveredId];
  const fam = FAMILY_BY_ID[g.family];
  return (
    <Html
      position={[pos[0], pos[1], pos[2]]}
      center
      zIndexRange={[30, 0]}
      style={{ pointerEvents: "none" }}
    >
      <div className="star-label" style={{ borderColor: `${fam.color}66` }}>
        <span className="star-label__name">{g.name}</span>
        <span className="star-label__fam" style={{ color: fam.color }}>
          {fam.short} · {g.typicalBpm} BPM
        </span>
      </div>
    </Html>
  );
}

/** All 31 genre stars + the hover label. */
export default function GenreStars() {
  return (
    <group>
      {ATLAS_GENRES.map((g) => (
        <Star key={g.id} g={g} />
      ))}
      <HoverLabel />
    </group>
  );
}
