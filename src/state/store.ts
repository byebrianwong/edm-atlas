/**
 * Global UI state (Zustand). One selected genre drives the camera + detail
 * panel; one hovered genre drives the constellation highlight. Family filter
 * dims everything outside a chosen family. Synth state mirrors the audio engine.
 */

import { create } from "zustand";
import { GENRE_BY_ID, type FamilyId } from "../data/genres";

export type View = "atlas" | "list";

// How many star titles stay visible:
//  - "hover":  only the star under the cursor is named
//  - "family": opening a constellation names every genre in that family
//  - "all":    every star is named, always
export type LabelMode = "hover" | "family" | "all";

interface AtlasState {
  selectedId: string | null;
  hoveredId: string | null;
  familyFilter: FamilyId | null;
  // Touch "zoom into an area" step: the first tap on the map flies the camera
  // to that family's cluster and names every star (there's no hover on a phone,
  // so this is how you see what you're about to open). Null = not zoomed in.
  area: FamilyId | null;
  introSeen: boolean;
  reducedMotion: boolean;
  webglOk: boolean;
  view: View;
  labelMode: LabelMode;
  searchOpen: boolean;
  synthId: string | null; // genre whose synth demo is currently playing

  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  setFamilyFilter: (f: FamilyId | null) => void;
  toggleFamilyFilter: (f: FamilyId) => void;
  setArea: (f: FamilyId | null) => void;
  dismissIntro: () => void;
  setReducedMotion: (v: boolean) => void;
  setWebglOk: (v: boolean) => void;
  setView: (v: View) => void;
  setLabelMode: (m: LabelMode) => void;
  setSearchOpen: (v: boolean) => void;
  setSynthId: (id: string | null) => void;
}

export const useAtlas = create<AtlasState>((set) => ({
  selectedId: null,
  hoveredId: null,
  familyFilter: null,
  area: null,
  introSeen: false,
  reducedMotion: false,
  webglOk: true,
  view: "atlas",
  labelMode: "hover",
  searchOpen: false,
  synthId: null,

  // While zoomed into an area, opening a genre moves the area to that genre's
  // cluster, so closing its panel lands back on the names around it.
  select: (id) =>
    set((s) => ({
      selectedId: id,
      area: id && s.area ? (GENRE_BY_ID[id]?.family ?? s.area) : s.area,
    })),
  hover: (id) => set({ hoveredId: id }),
  setFamilyFilter: (f) => set({ familyFilter: f }),
  toggleFamilyFilter: (f) =>
    set((s) => ({ familyFilter: s.familyFilter === f ? null : f })),
  setArea: (f) => set({ area: f }),
  dismissIntro: () => set({ introSeen: true }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
  setWebglOk: (v) => set({ webglOk: v }),
  setView: (v) => set({ view: v }),
  setLabelMode: (m) => set({ labelMode: m }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setSynthId: (id) => set({ synthId: id }),
}));
