import { useCallback, useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { POSITIONS, starSize } from "../data/graph";
import { ATLAS_GENRES, ATLAS_BY_ID } from "../data/atlas";
import { FAMILY_BY_ID } from "../data/families";
import type { Genre } from "../data/genres";
import { glowTexture } from "./glow";
import { starTarget, ambientLabelTarget } from "./emphasis";
import { placeLabels, slotOffset, type LabelBox, type Slot } from "./labelLayout";
import { useAtlas } from "../state/store";
import { lastPressWasTouch } from "../lib/pointer";

const tex = glowTexture;

/** A tap on a star. With a mouse it opens the genre straight away (the hover
 *  card already named it). A finger can't hover, so from the overview the
 *  first tap zooms into that star's area and names every star; the next tap
 *  (on a star or its name) opens the genre. */
function pickStar(g: Genre) {
  const s = useAtlas.getState();
  if (lastPressWasTouch() && !s.area && !s.selectedId) s.setArea(g.family);
  else s.select(g.id);
}

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
          // A finger "hovers" only for the instant it taps; skip the hover
          // card so it doesn't flash under the thumb.
          if (e.nativeEvent.pointerType === "touch") return;
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
          pickStar(g);
        }}
      >
        <sphereGeometry args={[hit, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** A lightweight, always-on star name (family/all modes, or a zoomed-in area on
 *  touch). Its opacity is animated per-frame so names fade in and dim in sync
 *  with their stars, without re-rendering React on hover. While an area is open
 *  the name becomes a button, so a phone can open a genre by tapping its name
 *  instead of hunting for the star's small dot. */
function AmbientLabel({ g }: { g: Genre }) {
  const ref = useRef<HTMLElement>(null);
  const cur = useRef(0);
  const pos = POSITIONS[g.id];
  const fam = FAMILY_BY_ID[g.family];
  const tappable = useAtlas((s) => s.area !== null);

  useFrame(() => {
    const t =
      ambientLabelTarget(g.id, g.family, useAtlas.getState()) *
      (crowded.has(g.id) ? CROWDED_OPACITY : 1);
    cur.current += (t - cur.current) * 0.16;
    const el = ref.current;
    if (!el) return;
    el.style.opacity = cur.current.toFixed(3);
    el.style.visibility = cur.current < 0.015 ? "hidden" : "visible";
  });

  // Tappable names: register for the de-overlap pass, and listen natively so
  // the press never bubbles to the canvas container (OrbitControls would
  // capture the pointer and swallow the click, and r3f would count the click
  // as a miss and zoom back out). A callback ref, not an effect: <Html> renders
  // its children in a separate root, after this component's effects have run.
  const tapRef = useCallback(
    (el: HTMLButtonElement | null) => {
      if (!el) return;
      ref.current = el;
      labelEls.set(g.id, el);
      const stop = (e: Event) => e.stopPropagation();
      const open = (e: Event) => {
        e.stopPropagation();
        useAtlas.getState().select(g.id);
      };
      el.addEventListener("pointerdown", stop);
      el.addEventListener("click", open);
      return () => {
        if (ref.current === el) ref.current = null;
        if (labelEls.get(g.id) === el) labelEls.delete(g.id);
        el.removeEventListener("pointerdown", stop);
        el.removeEventListener("click", open);
      };
    },
    [g.id],
  );

  return (
    <Html
      position={[pos[0], pos[1], pos[2]]}
      center
      zIndexRange={[20, 0]}
      style={{ pointerEvents: "none" }}
    >
      {tappable ? (
        <button
          ref={tapRef}
          type="button"
          className="star-name star-name--tap"
          style={{ color: fam.glow, opacity: 0 }}
          aria-label={`Open ${g.name}`}
        >
          {g.name}
        </button>
      ) : (
        <div
          ref={ref as RefObject<HTMLDivElement>}
          className="star-name"
          style={{ color: fam.glow, opacity: 0 }}
        >
          {g.name}
        </div>
      )}
    </Html>
  );
}

/** The ambient name layer — only mounted when the title slider is past "hover"
 *  or a touch user has zoomed into an area, so the default mode carries zero
 *  extra cost. */
function AmbientLabels() {
  const mode = useAtlas((s) => s.labelMode);
  const area = useAtlas((s) => s.area);
  if (mode === "hover" && !area) return null;
  return (
    <>
      {ATLAS_GENRES.map((g) => (
        <AmbientLabel key={g.id} g={g} />
      ))}
      {area && <LabelDeclutter />}
    </>
  );
}

// Shared between the tappable names and the de-overlap pass below.
const labelEls = new Map<string, HTMLElement>();
const crowded = new Set<string>();
const CROWDED_OPACITY = 0.35;

const TAP_PAD_X = 20; // .star-name--tap horizontal padding, both sides
const TAP_PAD_Y = 18; // .star-name--tap vertical padding, both sides
const textSize = new WeakMap<HTMLElement, [number, number]>();
const lastSlot = new Map<string, Slot>();
const projected = new THREE.Vector3();

/** Keeps the zoomed-in names from piling on top of each other: each frame it
 *  projects every visible name to the screen and nudges it above / beside its
 *  star when the spot below is taken. Names in the opened area (biggest stars
 *  first) claim spots before names from farther clusters. */
function LabelDeclutter() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useEffect(
    () => () => {
      crowded.clear();
      lastSlot.clear();
    },
    [],
  );

  useFrame(() => {
    const s = useAtlas.getState();
    const boxes: (LabelBox & { el: HTMLElement; rank: number })[] = [];
    for (const g of ATLAS_GENRES) {
      const el = labelEls.get(g.id);
      if (!el || ambientLabelTarget(g.id, g.family, s) < 0.05) continue;
      let wh = textSize.get(el);
      if (!wh) {
        wh = [el.offsetWidth - TAP_PAD_X, el.offsetHeight - TAP_PAD_Y];
        if (wh[0] <= 0) continue; // not laid out yet
        textSize.set(el, wh);
      }
      const p = POSITIONS[g.id];
      projected.set(p[0], p[1], p[2]);
      const dist = camera.position.distanceTo(projected);
      projected.project(camera);
      if (projected.z > 1) continue; // behind the camera
      boxes.push({
        id: g.id,
        el,
        x: ((projected.x + 1) / 2) * size.width,
        y: ((1 - projected.y) / 2) * size.height,
        w: wh[0],
        h: wh[1],
        prev: lastSlot.get(g.id) ?? 0,
        // The opened area first, biggest star first; then the rest, nearest first.
        rank: g.family === s.area ? -1e6 - starSize(g) : dist,
      });
    }
    boxes.sort((a, b) => a.rank - b.rank);

    const slots = placeLabels(boxes);
    for (const b of boxes) {
      const slot = slots.get(b.id) ?? null;
      const use: Slot = slot ?? 0;
      if (slot === null) crowded.add(b.id);
      else crowded.delete(b.id);
      if (lastSlot.get(b.id) !== use || !b.el.style.transform) {
        const [dx, dy] = slotOffset(use, b.w);
        b.el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
        lastSlot.set(b.id, use);
      }
      b.el.style.pointerEvents = slot === null ? "none" : "";
    }
  });

  return null;
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
      <AmbientLabels />
      <HoverLabel />
    </group>
  );
}
