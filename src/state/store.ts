/**
 * Global UI state (Zustand). One selected genre drives the camera + detail
 * panel; one hovered genre drives the constellation highlight. Family filter
 * dims everything outside a chosen family. Synth state mirrors the audio engine.
 */

import { create } from "zustand";
import type { FamilyId } from "../data/genres";

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
  introSeen: false,
  reducedMotion: false,
  webglOk: true,
  view: "atlas",
  labelMode: "hover",
  searchOpen: false,
  synthId: null,

  select: (id) => set({ selectedId: id }),
  hover: (id) => set({ hoveredId: id }),
  setFamilyFilter: (f) => set({ familyFilter: f }),
  toggleFamilyFilter: (f) =>
    set((s) => ({ familyFilter: s.familyFilter === f ? null : f })),
  dismissIntro: () => set({ introSeen: true }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
  setWebglOk: (v) => set({ webglOk: v }),
  setView: (v) => set({ view: v }),
  setLabelMode: (m) => set({ labelMode: m }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setSynthId: (id) => set({ synthId: id }),
}));
