import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { EDGES, POSITIONS } from "../data/graph";
import { GENRE_BY_ID } from "../data/genres";
import { FAMILY_BY_ID } from "../data/families";
import { edgeTarget } from "./emphasis";
import { useAtlas } from "../state/store";

function Edge({
  a,
  b,
  color,
  srcId,
  tgtId,
  srcFam,
  tgtFam,
  cross,
}: {
  a: [number, number, number];
  b: [number, number, number];
  color: THREE.Color;
  srcId: string;
  tgtId: string;
  srcFam: import("../data/genres").FamilyId;
  tgtFam: import("../data/genres").FamilyId;
  cross: boolean;
}) {
  const ref = useRef<any>(null);
  const points = useMemo(() => [a, b], [a, b]);

  useLayoutEffect(() => {
    const m = ref.current?.material;
    if (m) {
      m.blending = THREE.AdditiveBlending;
      m.depthWrite = false;
      m.toneMapped = false;
      m.opacity = 0.12;
    }
  }, []);

  useFrame(() => {
    const m = ref.current?.material;
    if (!m) return;
    const target = edgeTarget(
      srcId,
      tgtId,
      srcFam,
      tgtFam,
      cross,
      useAtlas.getState(),
    );
    m.opacity += (target - m.opacity) * 0.12;
  });

  return (
    <Line
      ref={ref}
      points={points}
      color={color}
      lineWidth={cross ? 1 : 1.35}
      transparent
      opacity={0.12}
    />
  );
}

/** The constellation lines between related genres. */
export default function Constellations() {
  const edges = useMemo(
    () =>
      EDGES.map((e) => {
        const src = GENRE_BY_ID[e.source];
        const tgt = GENRE_BY_ID[e.target];
        const color = new THREE.Color(FAMILY_BY_ID[src.family].color).lerp(
          new THREE.Color(FAMILY_BY_ID[tgt.family].color),
          0.5,
        );
        return {
          key: `${e.source}|${e.target}`,
          a: POSITIONS[e.source],
          b: POSITIONS[e.target],
          color,
          srcId: e.source,
          tgtId: e.target,
          srcFam: src.family,
          tgtFam: tgt.family,
          cross: e.cross,
        };
      }),
    [],
  );

  return (
    <group>
      {edges.map((e) => (
        <Edge
          key={e.key}
          a={e.a}
          b={e.b}
          color={e.color}
          srcId={e.srcId}
          tgtId={e.tgtId}
          srcFam={e.srcFam}
          tgtFam={e.tgtFam}
          cross={e.cross}
        />
      ))}
    </group>
  );
}
