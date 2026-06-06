/**
 * synth.ts — Tone.js audio engine for the EDM Atlas "play the building blocks" feature.
 *
 * Ports the Section 7 building blocks of the handoff spec to TypeScript on ESM Tone v15.
 *
 * Design notes
 * ------------
 * - Tone is lazy-loaded with a dynamic `import("tone")` on the first play and cached at
 *   module scope, so it never lands in the initial app bundle.
 * - Because Tone is async, every genre builder receives a `SynthCtx` context object that
 *   carries the loaded Tone namespace plus all engine helpers and step constants. Builders
 *   therefore depend only on the `SynthCtx` *type* exported from here — there is no runtime
 *   dependency from builders.ts back into this module, and this module only pulls in
 *   `BUILDERS` lazily (a dynamic import inside `playGenre`), so the cycle is broken.
 * - All disposable nodes/sequences live in module-level arrays so `stopAll()` can tear the
 *   whole graph down on every genre switch. Only one genre plays at a time on the shared
 *   `Tone.Transport`.
 */

// `typeof import("tone")` gives us the full Tone ESM namespace type without forcing the
// module into the initial bundle (this is a type-only reference, erased at compile time).
type ToneNS = typeof import("tone");

// Convenience aliases for the Tone node instance types we hand back from helpers.
type Gain = InstanceType<ToneNS["Gain"]>;
type MembraneSynth = InstanceType<ToneNS["MembraneSynth"]>;
type NoiseSynth = InstanceType<ToneNS["NoiseSynth"]>;
type Compressor = InstanceType<ToneNS["Compressor"]>;
// `Sequence` is generic over its event value; we always store SeqValue events. Aliasing to the
// SeqValue-parameterised instance keeps it assignment-compatible with what Tone infers at the
// `new Tone.Sequence(...)` call site.
type Sequence = import("tone").Sequence<SeqValue>;
/** The exact options accepted by the MembraneSynth constructor (a RecursivePartial<…>). */
type MembraneOpts = NonNullable<ConstructorParameters<ToneNS["MembraneSynth"]>[0]>;

// ---------------------------------------------------------------------------
// 16th-note step patterns (1 = hit). Shared by every builder via the context.
// ---------------------------------------------------------------------------

/** Four-on-the-floor: kick on every quarter note. */
export const FOUR = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0] as const;
/** Offbeat (open hat) on the "and" of each beat. */
export const OFF = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0] as const;
/** Clap / snare on beats 2 and 4. */
export const C24 = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] as const;
/** Every 16th (closed-hat / shaker drive). */
export const ALL16 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] as const;
/** Rolling offbeat bass (the two 16ths after each beat). */
export const ROLL = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1] as const;
/** Halftime kick (beat 1 only). */
export const HALFK = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as const;
/** Halftime snare (beat 3 only). */
export const SNR3 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0] as const;

// A Sequence event value: a step number (1 = hit, 0 = rest), a note string, or null (rest).
export type SeqValue = number | string | null;

// ---------------------------------------------------------------------------
// Module-level engine state.
// ---------------------------------------------------------------------------

/** Cached Tone namespace promise — resolves once, on first play. */
let tonePromise: Promise<ToneNS> | null = null;
/** All disposable audio nodes created for the current genre. */
let nodes: Array<{ dispose: () => void }> = [];
/** All Tone.Sequence instances scheduled for the current genre. */
let seqs: Sequence[] = [];
/** Persistent master-bus compressor (kept alive across switches). */
let master: Compressor | null = null;
/** Id of the genre currently playing, or null when stopped. */
let current: string | null = null;

/** Subscribers notified whenever the playing genre changes (for React state). */
const listeners = new Set<(id: string | null) => void>();

/** Push a value to every subscriber. */
function notify(id: string | null): void {
  for (const cb of listeners) cb(id);
}

// ---------------------------------------------------------------------------
// Engine helpers. These are constructed against a specific loaded Tone instance
// inside `makeCtx`, so they can be passed to builders without re-importing Tone.
// They mirror the Section 7 building blocks one-to-one.
// ---------------------------------------------------------------------------

/**
 * The context object handed to every genre builder. It bundles the loaded Tone
 * namespace, the reusable drum/duck helpers, the `seq` scheduler, `getMaster`, and
 * the 16th-note step constants. Builders read everything they need from here, which
 * is why builders.ts only needs the *type* of this object from synth.ts.
 */
export interface SynthCtx {
  /** The lazily-loaded Tone ESM namespace. */
  Tone: ToneNS;
  /** Lazily-created master bus (Compressor -> Limiter -> destination). */
  getMaster: () => Compressor;
  /** Create a sidechain-duck Gain node routed into the master. */
  mkDuck: () => Gain;
  /** Duck `d` to `amt` at time `t`, ramping back to 1 over `dur` seconds. */
  pump: (d: Gain | null, t: number, amt?: number, dur?: number) => void;
  /** Kick drum (MembraneSynth) into the master; `opts` overrides the default voicing. */
  mkKick: (vol?: number, opts?: MembraneOpts) => MembraneSynth;
  /** Hi-hat: white-noise NoiseSynth through a highpass filter. */
  mkHat: (decay: number, vol: number) => NoiseSynth;
  /** Clap / snare: white-noise NoiseSynth through a bandpass filter. */
  mkClap: (freq: number | undefined, vol: number) => NoiseSynth;
  /**
   * Register directly-constructed nodes (Reverb, PolySynth, AutoFilter, …) for disposal.
   * The mk* helpers already track what they create; effects/synths a builder news up itself
   * must be passed here so `stopAll()` can dispose them on the next genre switch.
   */
  track: (...newNodes: Array<{ dispose: () => void }>) => void;
  /**
   * Schedule a looping Tone.Sequence at the given subdivision; auto-tracked for disposal.
   * The callback receives `(time, value)` exactly as Tone provides — there is no step index,
   * so builders that move through a progression keep their own bar counter (see buildTrance).
   */
  seq: (
    cb: (time: number, value: SeqValue) => void,
    arr: ReadonlyArray<SeqValue>,
    sub: string,
  ) => Sequence;
  // Step constants (handy on the context so builders don't import them separately).
  FOUR: typeof FOUR;
  OFF: typeof OFF;
  C24: typeof C24;
  ALL16: typeof ALL16;
  ROLL: typeof ROLL;
  HALFK: typeof HALFK;
  SNR3: typeof SNR3;
}

/**
 * Build a `SynthCtx` bound to a specific loaded Tone instance. Every helper below
 * closes over `Tone` and pushes the nodes/sequences it creates into the shared
 * module-level arrays so `stopAll()` can dispose them.
 */
function makeCtx(Tone: ToneNS): SynthCtx {
  const getMaster = (): Compressor => {
    if (!master) {
      const c = new Tone.Compressor({
        threshold: -16,
        ratio: 3,
        attack: 0.003,
        release: 0.25,
      });
      const l = new Tone.Limiter(-1);
      c.connect(l);
      l.toDestination();
      master = c;
    }
    return master;
  };

  // Sidechain duck: a gain node ducked on each kick.
  const mkDuck = (): Gain => {
    const g = new Tone.Gain(1).connect(getMaster());
    nodes.push(g);
    return g;
  };

  const pump = (d: Gain | null, t: number, amt?: number, dur?: number): void => {
    if (!d) return;
    d.gain.cancelScheduledValues(t);
    d.gain.setValueAtTime(amt == null ? 0.25 : amt, t);
    d.gain.linearRampToValueAtTime(1, t + (dur || 0.18));
  };

  const mkKick = (vol?: number, opts?: MembraneOpts): MembraneSynth => {
    // Default kick voicing, with per-genre overrides merged on top. The cast narrows the
    // Object.assign result (which TS widens to include Record<string, unknown>) back to the
    // constructor's RecursivePartial option type.
    const cfg = Object.assign(
      {
        pitchDecay: 0.04,
        octaves: 6,
        oscillator: { type: "sine" },
        envelope: { attack: 0.001, decay: 0.45, sustain: 0.01, release: 0.3 },
      },
      opts || {},
    ) as MembraneOpts;
    const k = new Tone.MembraneSynth(cfg).connect(getMaster());
    k.volume.value = vol == null ? -3 : vol;
    nodes.push(k);
    return k;
  };

  // White noise through a highpass = hi-hat.
  const mkHat = (decay: number, vol: number): NoiseSynth => {
    const hp = new Tone.Filter(7500, "highpass").connect(getMaster());
    const n = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay, sustain: 0 },
    }).connect(hp);
    n.volume.value = vol;
    nodes.push(hp, n);
    return n;
  };

  // White noise through a bandpass = clap / snare.
  const mkClap = (freq: number | undefined, vol: number): NoiseSynth => {
    const bp = new Tone.Filter(freq || 1800, "bandpass").connect(getMaster());
    bp.Q.value = 1.1;
    const n = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.18, sustain: 0 },
    }).connect(bp);
    n.volume.value = vol;
    nodes.push(bp, n);
    return n;
  };

  // Register directly-created nodes (not made by the mk* helpers) for later disposal.
  const track = (...newNodes: Array<{ dispose: () => void }>): void => {
    for (const n of newNodes) nodes.push(n);
  };

  const seq = (
    cb: (time: number, value: SeqValue) => void,
    arr: ReadonlyArray<SeqValue>,
    sub: string,
  ): Sequence => {
    // Tone.Sequence(callback, events, subdivision). Clone the (often readonly) array
    // because Tone mutates its internal event list.
    const s = new Tone.Sequence(cb, arr.slice() as SeqValue[], sub);
    s.start(0);
    seqs.push(s);
    return s;
  };

  return {
    Tone,
    getMaster,
    mkDuck,
    pump,
    mkKick,
    mkHat,
    mkClap,
    track,
    seq,
    FOUR,
    OFF,
    C24,
    ALL16,
    ROLL,
    HALFK,
    SNR3,
  };
}

// ---------------------------------------------------------------------------
// Teardown.
// ---------------------------------------------------------------------------

/**
 * Stop the transport and dispose every node/sequence created for the current genre.
 * Disposal-safe: each dispose is wrapped so one bad node can't abort the teardown.
 * The persistent master bus is intentionally left alive across switches.
 */
function stopAll(): void {
  // Only touch the transport if Tone has actually been loaded.
  const Tone = currentTone;
  if (Tone) {
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }
  for (const s of seqs) {
    try {
      s.dispose();
    } catch {
      /* already disposed */
    }
  }
  seqs = [];
  for (const n of nodes) {
    try {
      n.dispose();
    } catch {
      /* already disposed */
    }
  }
  nodes = [];
  current = null;
}

/** The resolved Tone namespace once loaded, for use by synchronous teardown. */
let currentTone: ToneNS | null = null;

/** Lazily load (and cache) the Tone ESM module. */
function loadTone(): Promise<ToneNS> {
  if (!tonePromise) {
    tonePromise = import("tone").then((mod) => {
      currentTone = mod;
      return mod;
    });
  }
  return tonePromise;
}

// ---------------------------------------------------------------------------
// Public API. Other modules import ONLY the functions/values below.
// ---------------------------------------------------------------------------

/**
 * Toggle a genre's synthesized loop.
 *
 * - Ensures the AudioContext is running (`await Tone.start()`, must follow a user gesture).
 * - If `id` is already playing, this acts as a toggle and stops playback.
 * - Otherwise it tears down any previous genre, sets the tempo from the builder, runs the
 *   builder against a fresh `SynthCtx`, starts the transport, and records the new id.
 */
export async function playGenre(id: string): Promise<void> {
  const Tone = await loadTone();
  await Tone.start();

  // Toggle off when the same genre is requested again.
  if (current === id) {
    stopGenre();
    return;
  }

  stopAll();

  // Resolve the builder lazily so builders.ts is only pulled in at lookup time,
  // keeping synth.ts free of a static dependency on the (large) builder table.
  const { BUILDERS } = await import("./builders");
  // `id` is a free string; widen the keyed record to an indexable lookup.
  const cfg = (BUILDERS as Record<string, { bpm: number; build: (ctx: SynthCtx) => void }>)[id];
  if (!cfg) {
    // Unknown id — nothing to play. Leave the engine stopped.
    notify(null);
    return;
  }

  // Some builders set Transport.swing; reset it each time so it doesn't leak across genres.
  Tone.Transport.swing = 0;
  Tone.Transport.swingSubdivision = "16n";
  Tone.Transport.bpm.value = cfg.bpm;

  cfg.build(makeCtx(Tone));

  Tone.Transport.start();
  current = id;
  notify(current);
}

/** Stop playback and notify subscribers that nothing is playing. */
export function stopGenre(): void {
  stopAll();
  notify(null);
}

/** The id of the genre currently playing, or null. */
export function getPlayingId(): string | null {
  return current;
}

/**
 * Subscribe to play-state changes. Returns an unsubscribe function.
 * Used by React to reflect which genre's demo is currently playing.
 */
export function subscribe(cb: (id: string | null) => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/**
 * Every genre id that has a builder. This is the canonical, ordered list of the 31
 * supported genres; builders.ts is typed as `Record<GenreId, ...>` against it so the
 * two files can never drift out of sync.
 */
export const SYNTH_GENRE_IDS = [
  "house",
  "tech",
  "deep",
  "prog",
  "melodic",
  "futurehouse",
  "bigroom",
  "basshouse",
  "electrohouse",
  "frenchhouse",
  "acidhouse",
  "tropical",
  "techno",
  "trance",
  "psytrance",
  "dnb",
  "ukg",
  "bigbeat",
  "jungle",
  "dubstep",
  "futurebass",
  "trap",
  "meldubstep",
  "glitchhop",
  "hardstyle",
  "happyhardcore",
  "gabber",
  "phonk",
  "amapiano",
  "moombahton",
  "synthwave",
] as const;

/** Union of all supported genre ids — used to type the builder table for completeness. */
export type GenreId = (typeof SYNTH_GENRE_IDS)[number];
