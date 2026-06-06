/**
 * Family metadata: the 8 clusters of the atlas. Each family owns a color
 * identity (star + glow + nebula tint), a one-line blurb, and a `dir` unit
 * vector that places its cluster centroid in 3D space. Related families sit
 * near each other so the cross-family `related` links read as bridges.
 */

import type { FamilyId } from "./genres";

export type FamilyMeta = {
  id: FamilyId;
  short: string; // compact label for chips/legend
  color: string; // core star color
  glow: string; // hot highlight / bloom color
  nebula: string; // soft cluster backdrop tint
  blurb: string; // one-line description
  dir: [number, number, number]; // centroid direction (un-normalized is fine)
};

export const FAMILIES: FamilyMeta[] = [
  {
    id: "House",
    short: "House",
    color: "#22d3ee",
    glow: "#9bf6ff",
    nebula: "#0e4f63",
    blurb: "The four-on-the-floor foundation and its many offshoots.",
    dir: [0, 0, 0], // the hub — sits at the heart of the atlas
  },
  {
    id: "Techno",
    short: "Techno",
    color: "#a78bfa",
    glow: "#d6c7ff",
    nebula: "#36245f",
    blurb: "Hypnotic, machine-driven, often dark.",
    dir: [-1.05, 0.22, -0.15],
  },
  {
    id: "Trance",
    short: "Trance",
    color: "#2dd4bf",
    glow: "#9bffe9",
    nebula: "#12544b",
    blurb: "Euphoric and melodic, built on long emotional builds.",
    dir: [-0.62, 0.78, 0.34],
  },
  {
    id: "Breakbeat & jungle",
    short: "Breaks",
    color: "#f59e0b",
    glow: "#ffd98a",
    nebula: "#6b4410",
    blurb: "Syncopated broken drums instead of four-on-the-floor.",
    dir: [0.95, 0.38, -0.42],
  },
  {
    id: "Bass music",
    short: "Bass",
    color: "#ec4899",
    glow: "#ffa6db",
    nebula: "#6b1f48",
    blurb: "Low-end-led, usually halftime, built around a modulated bass.",
    dir: [0.66, -0.48, 0.52],
  },
  {
    id: "Hard dance",
    short: "Hard",
    color: "#fb5d5d",
    glow: "#ff9d9d",
    nebula: "#6b1f24",
    blurb: "Fast and distorted, kick-forward.",
    dir: [-0.2, 0.92, -0.62],
  },
  {
    id: "Global & trap-adjacent",
    short: "Global",
    color: "#fbbf24",
    glow: "#ffe9a6",
    nebula: "#6b520f",
    blurb: "Rhythm-driven styles from hip-hop and regional scenes.",
    dir: [0.24, -0.86, -0.26],
  },
  {
    id: "Retro / other",
    short: "Retro",
    color: "#818cf8",
    glow: "#bcc3ff",
    nebula: "#2c3170",
    blurb: "Deliberately period-referencing production.",
    dir: [-0.42, -0.32, 0.98],
  },
];

export const FAMILY_BY_ID: Record<FamilyId, FamilyMeta> = Object.fromEntries(
  FAMILIES.map((f) => [f.id, f]),
) as Record<FamilyId, FamilyMeta>;

export const FAMILY_IDS: FamilyId[] = FAMILIES.map((f) => f.id);
