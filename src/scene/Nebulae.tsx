import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { glowTexture } from "./glow";
import { FAMILIES, FAMILY_BY_ID } from "../data/families";
import { FAMILY_CENTROIDS } from "../data/graph";
import { GENRES } from "../data/genres";
import { useAtlas } from "../state/store";

const tex = glowTexture;

function Nebula({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  return (
    <sprite position={position} scale={[scale, scale, scale]}>
      <spriteMaterial
        map={tex()}
        color={color}
        transparent
        opacity={0.17}
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

/** Soft colored backdrops behind each family cluster + a faint central haze. */
export default function Nebulae() {
  const ref = useRef<THREE.Group>(null);

  // gentle breathing so the clusters feel alive
  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (useAtlas.getState().reducedMotion) return;
    const t = clock.elapsedTime;
    ref.current.children.forEach((child, i) => {
      const s = (child.userData.base as number) * (1 + Math.sin(t * 0.25 + i) * 0.04);
      child.scale.setScalar(s);
    });
  });

  const memberCount = (fid: string) =>
    GENRES.filter((g) => g.family === fid).length;

  return (
    <>
      {/* whole-scene haze for depth */}
      <Nebula position={[0, 0, 0]} color="#0c1740" scale={520} />
      <group ref={ref}>
        {FAMILIES.map((f) => {
          const c = FAMILY_CENTROIDS[f.id];
          const base = 70 + memberCount(f.id) * 7;
          return (
            <sprite
              key={f.id}
              position={[c[0], c[1], c[2]]}
              scale={[base, base, base]}
              userData={{ base }}
            >
              <spriteMaterial
                map={tex()}
                color={FAMILY_BY_ID[f.id].nebula}
                transparent
                opacity={0.22}
                depthWrite={false}
                depthTest={false}
                blending={THREE.AdditiveBlending}
              />
            </sprite>
          );
        })}
      </group>
    </>
  );
}
