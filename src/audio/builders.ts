/**
 * builders.ts — one synthesis "builder" per genre for the EDM Atlas demo feature.
 *
 * Each builder receives a {@link SynthCtx} (the engine helpers + loaded Tone namespace +
 * 16th-note step constants) and constructs a short, musically plausible 1–4 bar loop that
 * captures the genre's defining rhythm, bass, harmony/lead and signature technique, exactly
 * as catalogued in Section 7's per-genre recipe table.
 *
 * Builders never import Tone directly and never import runtime values from synth.ts — they
 * depend only on the `SynthCtx` *type*. Everything they create is registered for disposal:
 * the mk* helpers (mkKick/mkHat/mkClap/mkDuck) self-register, and effects/synths a builder
 * news up itself are passed to `ctx.track(...)`. The engine disposes the whole graph on the
 * next genre switch.
 *
 * `buildTrance` and `buildDubstep` follow the two reference templates from the handoff doc;
 * the remaining 29 are built from the same vocabulary per the recipe table.
 *
 * NOTE on bar clocks: Tone's Sequence callback is `(time, value)` only — there is no step
 * index. Genres that move through a 4-bar progression therefore keep a local `idx` counter
 * that a one-shot `[0]` sequence at `"1n"` increments once per bar, plus shared `cr`/`ci`
 * variables that the 16th-note bass/stab sequences read. This mirrors the doc template.
 */

import type { SynthCtx, SeqValue, GenreId } from "./synth";

/** A builder: its tempo plus a function that wires up the loop against the engine context. */
export interface Builder {
  bpm: number;
  build: (ctx: SynthCtx) => void;
}

// ===========================================================================
// Small shared note vocabularies (kept local so builders read cleanly).
// ===========================================================================

// A minor / its relative major — the workhorse pop/dance progression (Am F C G),
// expressed as triads and as roots for the bass.
const AM_CHORDS: string[][] = [
  ["A3", "C4", "E4"],
  ["F3", "A3", "C4"],
  ["C4", "E4", "G4"],
  ["G3", "B3", "D4"],
];
const AM_ROOTS = ["A1", "F1", "C2", "G1"];

// F minor flavour (darker, common in dubstep/trap/melodic bass).
const FM_ROOTS = ["F1", "Ab1", "Db1", "Eb1"];

/**
 * Construct and start a Tone.AutoFilter via its positional constructor, then configure the
 * LFO depth and the inner filter's type/Q. We avoid AutoFilter's options-object form because
 * its nested `filter` field demands a *complete* FilterOptions (including `rolloff`), which is
 * awkward to satisfy inline; the imperative setup below is both simpler and fully typed.
 */
function autoFilter(
  ctx: SynthCtx,
  frequency: string,
  baseFrequency: number,
  octaves: number,
  depth: number,
  filterType: "lowpass" | "bandpass" | "highpass",
  q: number,
): InstanceType<SynthCtx["Tone"]["AutoFilter"]> {
  const af = new ctx.Tone.AutoFilter(frequency, baseFrequency, octaves);
  af.depth.value = depth;
  af.filter.type = filterType;
  af.filter.Q.value = q;
  return af.start();
}

// ===========================================================================
// HOUSE FAMILY
// ===========================================================================

/** Classic house — 4-floor, offbeat hat, clap 2&4, square organ stabs, pump. */
function buildHouse(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, mkDuck, pump, seq, track, getMaster, FOUR, OFF, C24, ROLL } = ctx;
  const duck = mkDuck();
  const k = mkKick(-3);
  const oh = mkHat(0.12, -16);
  const clap = mkClap(1700, -12);

  // Square-wave organ stabs through a touch of reverb, pumped.
  const rev = new Tone.Reverb(1.6);
  const organ = new Tone.PolySynth(Tone.Synth);
  organ.set({
    oscillator: { type: "square" },
    envelope: { attack: 0.01, decay: 0.18, sustain: 0.2, release: 0.2 },
  });
  organ.volume.value = -20;
  organ.chain(rev, duck);
  track(rev, organ);

  const bass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { Q: 2, type: "lowpass" },
    envelope: { attack: 0.005, decay: 0.14, sustain: 0, release: 0.06 },
    filterEnvelope: { attack: 0.005, decay: 0.1, sustain: 0.3, baseFrequency: 130, octaves: 2.5 },
  });
  bass.volume.value = -9;
  bass.connect(getMaster());
  track(bass);

  // Shared progression state, advanced by the bar clock.
  let ci = 0;
  let cr = AM_ROOTS[0];

  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.22, 0.17);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  // Bar clock: advance the 4-bar progression and stab the organ chord.
  seq((t) => {
    cr = AM_ROOTS[ci % 4];
    organ.triggerAttackRelease(AM_CHORDS[ci % 4], "8n", t);
    ci++;
  }, [0], "1n");
  seq((t, v) => { if (v) bass.triggerAttackRelease(cr, "16n", t); }, ROLL, "16n");
}

/** Tech house — 4-floor, offbeat hat, 16th shaker, resonant offbeat-roll bass, square blip. */
function buildTech(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster, FOUR, OFF, ALL16, C24, ROLL } = ctx;
  const k = mkKick(-3);
  const oh = mkHat(0.11, -17);
  const shaker = mkHat(0.015, -28);
  const clap = mkClap(1800, -14);

  // Resonant, plucky offbeat bass — the rolling engine of tech house.
  const bass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { Q: 5, type: "lowpass" },
    envelope: { attack: 0.004, decay: 0.12, sustain: 0, release: 0.05 },
    filterEnvelope: { attack: 0.004, decay: 0.09, sustain: 0.2, baseFrequency: 120, octaves: 3 },
  });
  bass.volume.value = -8;
  bass.connect(getMaster());
  track(bass);

  // Tiny square "vocal" blip through delay for movement.
  const delay = new Tone.FeedbackDelay("8n", 0.25);
  const blip = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.005, decay: 0.08, sustain: 0, release: 0.05 },
  });
  blip.volume.value = -22;
  blip.chain(delay, getMaster());
  track(delay, blip);

  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq((t, v) => { if (v) shaker.triggerAttackRelease("16n", t); }, ALL16, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq((t, v) => { if (v) bass.triggerAttackRelease("A1", "16n", t); }, ROLL, "16n");
  seq((t, n) => { if (n) blip.triggerAttackRelease(n as string, "16n", t); },
    ["A4", null, null, null, null, null, "E4", null], "8n");
}

/** Deep house — soft 4-floor, offbeat hat, sine sub on roots, triangle 9th pads + chorus/reverb. */
function buildDeep(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkDuck, pump, seq, track, getMaster, FOUR, OFF } = ctx;
  const duck = mkDuck();
  const k = mkKick(-6, { envelope: { attack: 0.002, decay: 0.4, sustain: 0.01, release: 0.3 } });
  const oh = mkHat(0.1, -20);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.2 },
  });
  sub.volume.value = -7;
  sub.connect(getMaster());
  track(sub);

  // Lush triangle pad voicing extended 9ths through chorus + reverb, sidechained.
  const chorus = new Tone.Chorus(1.5, 3, 0.6).start();
  const rev = new Tone.Reverb(3);
  const pad = new Tone.PolySynth(Tone.Synth);
  pad.set({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.3, decay: 0.4, sustain: 0.8, release: 1.2 },
  });
  pad.volume.value = -16;
  pad.chain(chorus, rev, duck);
  track(chorus, rev, pad);

  const ninths: string[][] = [
    ["A2", "C4", "E4", "G4", "B4"],
    ["F2", "A3", "C4", "E4", "G4"],
    ["C3", "E4", "G4", "B4", "D5"],
    ["G2", "B3", "D4", "F4", "A4"],
  ];

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.3, 0.2);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq((t) => {
    cr = AM_ROOTS[ci % 4];
    pad.triggerAttackRelease(ninths[ci % 4], "1n", t);
    ci++;
  }, [0], "1n");
  // Sub plays the root on each downbeat.
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "4n", t); }, FOUR, "16n");
}

/** Progressive house — 4-floor, sine sub, sawtooth arp through a lowpass that ramps open. */
function buildProg(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, mkDuck, pump, seq, track, getMaster, FOUR, OFF, C24 } = ctx;
  const duck = mkDuck();
  const k = mkKick(-3);
  const oh = mkHat(0.1, -18);
  const clap = mkClap(1600, -14);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.7, release: 0.2 },
  });
  sub.volume.value = -7;
  sub.connect(getMaster());
  track(sub);

  // Sawtooth arp through a lowpass filter that opens slowly = the progressive "build".
  const lp = new Tone.Filter(300, "lowpass");
  lp.Q.value = 2;
  // Ramp the cutoff wide open over ~12 seconds for the build.
  lp.frequency.rampTo(6000, 12, "+0.1");
  const rev = new Tone.Reverb(2.5);
  const arp = new Tone.Synth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.005, decay: 0.15, sustain: 0.2, release: 0.15 },
  });
  arp.volume.value = -16;
  arp.chain(lp, rev, duck);
  track(lp, rev, arp);

  const arpNotes: SeqValue[] = ["A3", "E4", "A4", "C5", "B4", "E4", "G4", "C5"];

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.28, 0.18);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq(() => { cr = AM_ROOTS[ci % 4]; ci++; }, [0], "1n");
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "4n", t); }, FOUR, "16n");
  seq((t, n) => { if (n) arp.triggerAttackRelease(n as string, "16n", t); }, arpNotes, "16n");
}

/** Melodic house — soft 4-floor, sine sub, triangle lead + delay/reverb, pad on a progression. */
function buildMelodic(ctx: SynthCtx): void {
  const { Tone, mkKick, mkDuck, pump, seq, track, getMaster, FOUR } = ctx;
  const duck = mkDuck();
  const k = mkKick(-5);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.7, release: 0.2 },
  });
  sub.volume.value = -7;
  sub.connect(getMaster());
  track(sub);

  // Emotive triangle lead with delay + reverb.
  const delay = new Tone.FeedbackDelay("8n.", 0.3);
  const lrev = new Tone.Reverb(2.4);
  const lead = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.02, decay: 0.2, sustain: 0.3, release: 0.4 },
  });
  lead.volume.value = -13;
  lead.chain(delay, lrev, getMaster());
  track(delay, lrev, lead);

  // Warm pad on the progression, sidechained.
  const prev = new Tone.Reverb(3);
  const pad = new Tone.PolySynth(Tone.Synth);
  pad.set({
    oscillator: { type: "fatsawtooth", count: 2, spread: 20 },
    envelope: { attack: 0.4, decay: 0.4, sustain: 0.8, release: 1 },
  });
  pad.volume.value = -20;
  pad.chain(prev, duck);
  track(prev, pad);

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.3, 0.2);
    }
  }, FOUR, "16n");
  seq((t) => {
    cr = AM_ROOTS[ci % 4];
    pad.triggerAttackRelease(AM_CHORDS[ci % 4], "1n", t);
    ci++;
  }, [0], "1n");
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "4n", t); }, FOUR, "16n");
  seq((t, n) => { if (n) lead.triggerAttackRelease(n as string, "8n", t); },
    ["E5", null, "C5", "D5", "E5", null, "A4", null, "B4", null, "C5", "D5", "E5", null, null, null], "8n");
}

/** Future house — 4-floor, clap 2&4, sine sub, "talking" sawtooth bass-lead through bandpass + LFO. */
function buildFutureHouse(ctx: SynthCtx): void {
  const { Tone, mkKick, mkClap, mkDuck, pump, seq, track, getMaster, FOUR, C24 } = ctx;
  const duck = mkDuck();
  const k = mkKick(-3);
  const clap = mkClap(1700, -12);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.6, release: 0.15 },
  });
  sub.volume.value = -7;
  sub.connect(getMaster());
  track(sub);

  // Bandpass swept by an LFO gives the signature "talking" future-house bass-lead.
  const af = autoFilter(ctx, "4n", 400, 3, 1, "bandpass", 6);
  const lead = new Tone.MonoSynth({
    oscillator: { type: "fatsawtooth", count: 2, spread: 20 },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.15 },
  });
  lead.volume.value = -14;
  lead.chain(af, duck);
  track(af, lead);

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.25, 0.17);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq(() => { cr = AM_ROOTS[ci % 4]; ci++; }, [0], "1n");
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "4n", t); }, FOUR, "16n");
  // Bouncy bass-lead riff (the part the bandpass "talks" through).
  seq((t, n) => { if (n) lead.triggerAttackRelease(n as string, "16n", t); },
    ["A2", null, "A2", "C3", null, "A2", null, "E3", "G2", null, "G2", "B2", null, "G2", null, "D3"], "16n");
}

/** Big room — huge 4-floor, clap, sine sub, 4x fatsawtooth lead riff + reverb, hard pump. */
function buildBigroom(ctx: SynthCtx): void {
  const { Tone, mkKick, mkClap, mkDuck, pump, seq, track, getMaster, FOUR, C24 } = ctx;
  const duck = mkDuck();
  const k = mkKick(-1, { octaves: 8, envelope: { attack: 0.001, decay: 0.5, sustain: 0, release: 0.3 } });
  const clap = mkClap(1500, -10);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.6, release: 0.2 },
  });
  sub.volume.value = -6;
  sub.connect(getMaster());
  track(sub);

  // The big drop riff: massive detuned saw lead with reverb, hard-pumped.
  const rev = new Tone.Reverb(2);
  const lead = new Tone.PolySynth(Tone.Synth);
  lead.set({
    oscillator: { type: "fatsawtooth", count: 4, spread: 40 },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.3, release: 0.2 },
  });
  lead.volume.value = -12;
  lead.chain(rev, duck);
  track(rev, lead);

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.12, 0.2); // hard pump
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq(() => { cr = AM_ROOTS[ci % 4]; ci++; }, [0], "1n");
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "4n", t); }, FOUR, "16n");
  // Classic stab-y big-room drop riff on the upper octave.
  seq((t, n) => { if (n) lead.triggerAttackRelease([n as string], "16n", t); },
    ["A4", null, "A4", null, "A4", "A4", null, "C5", "B4", null, null, "E5", null, "D5", null, null], "16n");
}

/** Bass house — 4-floor, clap, sine sub, fatsawtooth growl through Distortion + AutoFilter. */
function buildBasshouse(ctx: SynthCtx): void {
  const { Tone, mkKick, mkClap, mkDuck, pump, seq, track, getMaster, FOUR, C24 } = ctx;
  const duck = mkDuck();
  const k = mkKick(-2);
  const clap = mkClap(1700, -11);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.6, release: 0.15 },
  });
  sub.volume.value = -7;
  sub.connect(getMaster());
  track(sub);

  // Growl bass: distorted detuned saw swept by a mid-rate AutoFilter.
  const dist = new Tone.Distortion(0.5);
  const af = autoFilter(ctx, "8n", 200, 4, 1, "lowpass", 5);
  const growl = new Tone.MonoSynth({
    oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
    envelope: { attack: 0.01, decay: 0.3, sustain: 0.7, release: 0.15 },
  });
  growl.volume.value = -13;
  growl.chain(dist, af, duck);
  track(dist, af, growl);

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.2, 0.17);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq(() => { cr = AM_ROOTS[ci % 4]; ci++; }, [0], "1n");
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "4n", t); }, FOUR, "16n");
  seq((t, n) => { if (n) growl.triggerAttackRelease(n as string, "16n", t); },
    ["A1", null, "A1", "A1", null, "C2", null, "A1", "G1", null, "G1", "G1", null, "B1", null, "E2"], "16n");
}

/** Electro house — 4-floor, clap, square sub, 3x fatsawtooth lead through Distortion. */
function buildElectrohouse(ctx: SynthCtx): void {
  const { Tone, mkKick, mkClap, mkDuck, pump, seq, track, getMaster, FOUR, C24 } = ctx;
  const duck = mkDuck();
  const k = mkKick(-2);
  const clap = mkClap(1600, -11);

  // Square sub for a dirtier low end.
  const sub = new Tone.MonoSynth({
    oscillator: { type: "square" },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.5, release: 0.15 },
    filter: { type: "lowpass", Q: 1 },
    filterEnvelope: { attack: 0.005, decay: 0.1, sustain: 0.4, baseFrequency: 120, octaves: 2 },
  });
  sub.volume.value = -9;
  sub.connect(getMaster());
  track(sub);

  // Distorted detuned-saw lead — the aggressive electro stab.
  const dist = new Tone.Distortion(0.6);
  const lead = new Tone.PolySynth(Tone.Synth);
  lead.set({
    oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
    envelope: { attack: 0.005, decay: 0.15, sustain: 0.3, release: 0.12 },
  });
  lead.volume.value = -16;
  lead.chain(dist, duck);
  track(dist, lead);

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.18, 0.17);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq(() => { cr = AM_ROOTS[ci % 4]; ci++; }, [0], "1n");
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "8n", t); }, FOUR, "16n");
  seq((t, n) => { if (n) lead.triggerAttackRelease([n as string], "16n", t); },
    ["A3", "A3", null, "C4", null, "A3", "E4", null, "G3", "G3", null, "B3", null, "D4", null, null], "16n");
}

/** French house — 4-floor, offbeat hat, clap, sawtooth chord stabs through a slow (2-bar) AutoFilter sweep. */
function buildFrenchhouse(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, mkDuck, pump, seq, track, getMaster, FOUR, OFF, C24, ALL16 } = ctx;
  const duck = mkDuck();
  const k = mkKick(-3);
  const oh = mkHat(0.1, -17);
  const clap = mkClap(1700, -13);

  const bass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { Q: 2, type: "lowpass" },
    envelope: { attack: 0.005, decay: 0.18, sustain: 0.2, release: 0.08 },
    filterEnvelope: { attack: 0.005, decay: 0.1, sustain: 0.4, baseFrequency: 110, octaves: 2 },
  });
  bass.volume.value = -9;
  bass.connect(getMaster());
  track(bass);

  // Filtered disco chord stabs — slow 2-bar (1m) AutoFilter sweep is the signature.
  const af = autoFilter(ctx, "1m", 350, 4, 1, "lowpass", 3);
  const stab = new Tone.PolySynth(Tone.Synth);
  stab.set({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.005, decay: 0.12, sustain: 0.1, release: 0.1 },
  });
  stab.volume.value = -17;
  stab.chain(af, duck);
  track(af, stab);

  // Disco-y offbeat chord chops.
  const chordHits: SeqValue[] = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0];

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.25, 0.17);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq(() => { cr = AM_ROOTS[ci % 4]; ci++; }, [0], "1n");
  seq((t, v) => { if (v) bass.triggerAttackRelease(cr, "16n", t); }, ALL16, "16n");
  seq((t, v) => { if (v) stab.triggerAttackRelease(AM_CHORDS[ci % 4], "16n", t); }, chordHits, "16n");
}

/** Acid house — 4-floor, offbeat hat, clap, TB-303 style MonoSynth (high-Q, portamento, filter env) + delay. */
function buildAcidhouse(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster, FOUR, OFF, C24 } = ctx;
  const k = mkKick(-3);
  const oh = mkHat(0.09, -18);
  const clap = mkClap(1700, -14);

  // The 303: high resonance, portamento glide, snappy filter envelope, through delay.
  const delay = new Tone.FeedbackDelay("8n", 0.28);
  const acid = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    portamento: 0.04, // glide between notes
    filter: { Q: 12, type: "lowpass" },
    envelope: { attack: 0.005, decay: 0.18, sustain: 0.2, release: 0.1 },
    filterEnvelope: {
      attack: 0.005,
      decay: 0.2,
      sustain: 0.1,
      release: 0.2,
      baseFrequency: 120,
      octaves: 4, // wide sweep = the squelch
    },
  });
  acid.volume.value = -10;
  acid.chain(delay, getMaster());
  track(delay, acid);

  // A classic 303-style 16th line with accents and octave jumps.
  const line: SeqValue[] = [
    "A1", "A1", "A2", "A1", "C2", "A1", "A2", "G1",
    "A1", "E2", "A1", "A2", "G1", "A1", "C2", "A2",
  ];

  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq((t, n) => { if (n) acid.triggerAttackRelease(n as string, "16n", t); }, line, "16n");
}

/** Tropical house — soft 4-floor, offbeat hat, sine sub, triangle marimba pluck + melody, pad. */
function buildTropical(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkDuck, pump, seq, track, getMaster, FOUR, OFF } = ctx;
  const duck = mkDuck();
  const k = mkKick(-6);
  const oh = mkHat(0.08, -20);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.2 },
  });
  sub.volume.value = -8;
  sub.connect(getMaster());
  track(sub);

  // Plucky triangle marimba (very short, percussive) through reverb.
  const rev = new Tone.Reverb(2);
  const marimba = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.002, decay: 0.25, sustain: 0, release: 0.2 },
  });
  marimba.volume.value = -12;
  marimba.chain(rev, duck);
  track(rev, marimba);

  // Soft pad on the progression.
  const pad = new Tone.PolySynth(Tone.Synth);
  pad.set({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.4, decay: 0.4, sustain: 0.7, release: 1 },
  });
  pad.volume.value = -22;
  pad.connect(duck);
  track(pad);

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.3, 0.2);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq((t) => {
    cr = AM_ROOTS[ci % 4];
    pad.triggerAttackRelease(AM_CHORDS[ci % 4], "1n", t);
    ci++;
  }, [0], "1n");
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "4n", t); }, FOUR, "16n");
  // Signature tropical marimba/steel-drum melody.
  seq((t, n) => { if (n) marimba.triggerAttackRelease(n as string, "16n", t); },
    ["E4", null, "A4", "C5", null, "B4", "A4", null, "E4", "G4", null, "C5", "B4", null, "A4", null], "16n");
}

// ===========================================================================
// TECHNO / TRANCE FAMILY
// ===========================================================================

/** Techno — driving 4-floor, offbeat sub stab, dark sawtooth stab through delay/reverb, hypnotic. */
function buildTechno(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkDuck, pump, seq, track, getMaster, FOUR, OFF, ALL16 } = ctx;
  const duck = mkDuck();
  const k = mkKick(-2, { octaves: 5 });
  const ch = mkHat(0.02, -24);

  // Square sub stabs on the offbeats — the relentless techno engine.
  const sub = new Tone.MonoSynth({
    oscillator: { type: "square" },
    envelope: { attack: 0.003, decay: 0.12, sustain: 0, release: 0.05 },
    filter: { type: "lowpass", Q: 2 },
    filterEnvelope: { attack: 0.003, decay: 0.08, sustain: 0.2, baseFrequency: 90, octaves: 2 },
  });
  sub.volume.value = -8;
  sub.connect(getMaster());
  track(sub);

  // Dark detuned stab through delay + reverb for the hypnotic atmosphere.
  const delay = new Tone.FeedbackDelay("8n.", 0.4);
  const rev = new Tone.Reverb(3);
  const stab = new Tone.Synth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.005, decay: 0.15, sustain: 0, release: 0.2 },
  });
  stab.volume.value = -18;
  stab.chain(delay, rev, duck);
  track(delay, rev, stab);

  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.25, 0.16);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); }, ALL16, "16n");
  // Sub on the offbeats.
  seq((t, v) => { if (v) sub.triggerAttackRelease("A1", "16n", t); }, OFF, "16n");
  // Sparse, hypnotic stab figure.
  seq((t, n) => { if (n) stab.triggerAttackRelease(n as string, "16n", t); },
    ["A3", null, null, null, null, null, "C4", null, null, null, "A3", null, null, "E4", null, null], "16n");
}

/** Trance — rolling offbeat 16th bass, fatsawtooth chords on a 4-bar prog, lead, hard pump. (Doc template.) */
function buildTrance(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, mkDuck, pump, seq, track, getMaster, FOUR, OFF, ALL16, C24, ROLL } = ctx;
  const duck = mkDuck();
  const k = mkKick(-2);
  const oh = mkHat(0.12, -15);
  const ch = mkHat(0.02, -27);
  const clap = mkClap(1600, -13);

  const chorus = new Tone.Chorus(2, 2.5, 0.5).start();
  const rev = new Tone.Reverb(2.2);
  const pad = new Tone.PolySynth(Tone.Synth);
  pad.set({
    oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
    envelope: { attack: 0.02, decay: 0.3, sustain: 0.7, release: 0.5 },
  });
  pad.volume.value = -19;
  pad.chain(chorus, rev, duck);
  track(chorus, rev, pad);

  const bass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { Q: 2, type: "lowpass" },
    envelope: { attack: 0.005, decay: 0.12, sustain: 0, release: 0.05 },
    filterEnvelope: { attack: 0.005, decay: 0.08, sustain: 0.3, baseFrequency: 140, octaves: 2 },
  });
  bass.volume.value = -8;
  bass.connect(getMaster());
  track(bass);

  const delay = new Tone.FeedbackDelay("8n.", 0.3);
  const lrev = new Tone.Reverb(1.6);
  const lead = new Tone.Synth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.2, release: 0.25 },
  });
  lead.volume.value = -15;
  lead.chain(delay, lrev, getMaster());
  track(delay, lrev, lead);

  const chords = AM_CHORDS;
  const roots = AM_ROOTS;
  let idx = 0;
  let cr = "A1";

  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.2, 0.16);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); }, ALL16, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  // Bar clock — advance the 4-bar progression.
  seq((t) => {
    cr = roots[idx % 4];
    pad.triggerAttackRelease(chords[idx % 4], "1n", t);
    idx++;
  }, [0], "1n");
  seq((t, v) => { if (v) bass.triggerAttackRelease(cr, "16n", t); }, ROLL, "16n");
  seq((t, n) => { if (n) lead.triggerAttackRelease(n as string, "16n", t); },
    ["A4", null, "C5", "B4", "A4", null, "E5", null, "D5", null, "C5", "B4", "A4", null, null, null], "8n");
}

/** Psytrance — fast 4-floor, offbeat hat, rolling triplet-feel bass on the two 16ths after each kick, acid lead. */
function buildPsytrance(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, seq, track, getMaster, FOUR, OFF, ROLL } = ctx;
  const k = mkKick(-2, { octaves: 6, envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.2 } });
  const oh = mkHat(0.08, -16);

  // The signature rolling psy bass — tight, dark, plays the offbeat 16ths.
  const bass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { Q: 3, type: "lowpass" },
    envelope: { attack: 0.002, decay: 0.1, sustain: 0, release: 0.03 },
    filterEnvelope: { attack: 0.002, decay: 0.07, sustain: 0.1, baseFrequency: 90, octaves: 2 },
  });
  bass.volume.value = -7;
  bass.connect(getMaster());
  track(bass);

  // High-Q acid lead through delay.
  const delay = new Tone.FeedbackDelay("16n", 0.3);
  const acid = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    portamento: 0.02,
    filter: { Q: 10, type: "lowpass" },
    envelope: { attack: 0.005, decay: 0.12, sustain: 0.1, release: 0.1 },
    filterEnvelope: { attack: 0.005, decay: 0.12, sustain: 0.1, baseFrequency: 200, octaves: 4 },
  });
  acid.volume.value = -14;
  acid.chain(delay, getMaster());
  track(delay, acid);

  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("16n", t); }, OFF, "16n");
  // Rolling bass on the two 16ths after each kick.
  seq((t, v) => { if (v) bass.triggerAttackRelease("E1", "16n", t); }, ROLL, "16n");
  seq((t, n) => { if (n) acid.triggerAttackRelease(n as string, "16n", t); },
    ["E4", null, "E4", "G4", null, "B4", null, "E5", "D5", null, "B4", null, "G4", null, "E4", null], "16n");
}

// ===========================================================================
// BREAKS / BASS FAMILY
// ===========================================================================

/** Drum & bass — fast breakbeat (snare 2&4), fast hats, sine sub + Reese through AutoFilter. */
function buildDnb(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster } = ctx;
  const k = mkKick(-3, { octaves: 6 });
  const snare = mkClap(1500, -6);
  const ch = mkHat(0.02, -20);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.7, release: 0.2 },
  });
  sub.volume.value = -6;
  sub.connect(getMaster());
  track(sub);

  // Reese bass: detuned saws through a slow AutoFilter = growling movement.
  const af = autoFilter(ctx, "2n", 120, 3, 0.8, "lowpass", 4);
  const reese = new Tone.MonoSynth({
    oscillator: { type: "fatsawtooth", count: 3, spread: 35 },
    envelope: { attack: 0.02, decay: 0.4, sustain: 0.8, release: 0.3 },
  });
  reese.volume.value = -14;
  reese.chain(af, getMaster());
  track(af, reese);

  // Amen-flavoured break: kick on 1 and the "&" of 2, snares on 2 and 4 with ghosts.
  const kickP: SeqValue[] = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
  const snareP: SeqValue[] = [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0];

  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, kickP, "16n");
  seq((t, v) => { if (v) snare.triggerAttackRelease("16n", t); }, snareP, "16n");
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); },
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0], "16n");
  // Sub + Reese hold the root, moving once per bar.
  seq((t, v) => { if (v) sub.triggerAttackRelease("D1", "8n", t); },
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], "16n");
  seq((t) => { reese.triggerAttackRelease("D1", "1n", t); }, [0], "1n");
}

/** UK garage — swung 2-step (Transport.swing 0.55), sawtooth bass, triangle chord stabs. */
function buildUkg(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster, OFF } = ctx;
  // The swing is the whole point of garage — set it on the transport.
  Tone.Transport.swing = 0.55;
  Tone.Transport.swingSubdivision = "16n";

  const k = mkKick(-3);
  const snare = mkClap(1600, -10);
  const oh = mkHat(0.1, -18);

  const bass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { Q: 3, type: "lowpass" },
    envelope: { attack: 0.005, decay: 0.18, sustain: 0.1, release: 0.1 },
    filterEnvelope: { attack: 0.005, decay: 0.1, sustain: 0.3, baseFrequency: 110, octaves: 2 },
  });
  bass.volume.value = -9;
  bass.connect(getMaster());
  track(bass);

  // Triangle chord stabs through reverb.
  const rev = new Tone.Reverb(1.8);
  const stab = new Tone.PolySynth(Tone.Synth);
  stab.set({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.005, decay: 0.15, sustain: 0.1, release: 0.2 },
  });
  stab.volume.value = -16;
  stab.chain(rev, getMaster());
  track(rev, stab);

  // 2-step skip: kick on 1 and the "&" of 3, snare on 2 and 4.
  const kickP: SeqValue[] = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
  const snareP: SeqValue[] = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
  const bassP: SeqValue[] = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0];
  const stabP: SeqValue[] = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];

  // Bar clock: just advance the progression index once per bar (time arg unused here).
  let ci = 0;
  seq(() => { ci++; }, [0], "1n");
  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, kickP, "16n");
  seq((t, v) => { if (v) snare.triggerAttackRelease("16n", t); }, snareP, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("16n", t); }, OFF, "16n");
  seq((t, v) => { if (v) bass.triggerAttackRelease(AM_ROOTS[ci % 4], "16n", t); }, bassP, "16n");
  seq((t, v) => { if (v) stab.triggerAttackRelease(AM_CHORDS[ci % 4], "16n", t); }, stabP, "16n");
}

/** Big beat — funky breakbeat, distorted sawtooth bass. */
function buildBigbeat(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster } = ctx;
  const k = mkKick(-2, { octaves: 5 });
  const snare = mkClap(1400, -7);
  const oh = mkHat(0.12, -16);

  // Big, fat distorted saw bass.
  const dist = new Tone.Distortion(0.5);
  const bass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { Q: 2, type: "lowpass" },
    envelope: { attack: 0.005, decay: 0.25, sustain: 0.3, release: 0.15 },
    filterEnvelope: { attack: 0.005, decay: 0.12, sustain: 0.4, baseFrequency: 100, octaves: 2 },
  });
  bass.volume.value = -12;
  bass.chain(dist, getMaster());
  track(dist, bass);

  // Funky breakbeat (kick + backbeat snare + busy hats).
  const kickP: SeqValue[] = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
  const snareP: SeqValue[] = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0];

  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, kickP, "16n");
  seq((t, v) => { if (v) snare.triggerAttackRelease("16n", t); }, snareP, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("16n", t); },
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], "16n");
  seq((t, n) => { if (n) bass.triggerAttackRelease(n as string, "16n", t); },
    ["E1", null, "E1", null, "G1", null, "E1", null, "A1", null, "A1", null, "D1", null, "E1", null], "16n");
}

/** Jungle — chopped fast breaks with ghost snares, deep sine sub (dub). */
function buildJungle(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster } = ctx;
  const k = mkKick(-3, { octaves: 6 });
  const snare = mkClap(1500, -7);
  const ghost = mkClap(2000, -20); // quiet ghost snares
  const ch = mkHat(0.02, -22);

  // Deep dub sub.
  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.5, sustain: 0.6, release: 0.4 },
  });
  sub.volume.value = -5;
  sub.connect(getMaster());
  track(sub);

  // Chopped amen-style break: syncopated kicks, backbeat snares, scattered ghosts.
  const kickP: SeqValue[] = [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0];
  const snareP: SeqValue[] = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
  const ghostP: SeqValue[] = [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1];

  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, kickP, "16n");
  seq((t, v) => { if (v) snare.triggerAttackRelease("16n", t); }, snareP, "16n");
  seq((t, v) => { if (v) ghost.triggerAttackRelease("32n", t); }, ghostP, "16n");
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); },
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0], "16n");
  // Dub sub bassline, half-bar movement.
  seq((t, n) => { if (n) sub.triggerAttackRelease(n as string, "2n", t); },
    ["A0", null, null, null, null, null, null, null, "D1", null, null, null, null, null, null, null], "16n");
}

/** Dubstep — halftime drums, deep sub, distorted fatsawtooth wobble via AutoFilter. (Doc template.) */
function buildDubstep(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster, HALFK, SNR3 } = ctx;
  const k = mkKick(-2, { octaves: 7, envelope: { attack: 0.001, decay: 0.5, sustain: 0, release: 0.3 } });
  const snare = mkClap(1400, -5);
  const ch = mkHat(0.02, -22);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.7, release: 0.2 },
  });
  sub.volume.value = -6;
  sub.connect(getMaster());
  track(sub);

  const dist = new Tone.Distortion(0.4);
  const af = autoFilter(ctx, "8n", 150, 4, 1, "lowpass", 4);
  const wob = new Tone.MonoSynth({
    oscillator: { type: "fatsawtooth", count: 2, spread: 25 },
    envelope: { attack: 0.01, decay: 0.4, sustain: 0.8, release: 0.2 },
  });
  wob.volume.value = -15;
  wob.chain(dist, af, getMaster());
  track(dist, af, wob);

  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, HALFK, "16n");
  seq((t, v) => { if (v) snare.triggerAttackRelease("8n", t); }, SNR3, "16n");
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); },
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0], "16n");
  seq((t, v) => { if (v) sub.triggerAttackRelease("C1", "4n", t); },
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], "16n");
  seq((t, n) => { if (n) wob.triggerAttackRelease(n as string, "4n", t); },
    ["C2", null, null, null, "Eb2", null, null, null, "C2", null, null, null, "G1", null, null, null], "16n");
}

/** Future bass — halftime with pump on kick & snare, pitched 4x supersaw chords + Vibrato/Chorus, vocal-chop pluck. */
function buildFuturebass(ctx: SynthCtx): void {
  // Note: everything routes through the sidechain duck, so getMaster isn't needed here.
  const { Tone, mkKick, mkHat, mkClap, mkDuck, pump, seq, track, HALFK, SNR3 } = ctx;
  const duck = mkDuck();
  const k = mkKick(-3);
  const snare = mkClap(1500, -6);
  const ch = mkHat(0.02, -22);

  // The signature: detuned supersaw chords with vibrato + chorus, sidechained hard.
  const vib = new Tone.Vibrato(5, 0.1);
  const chorus = new Tone.Chorus(2, 3, 0.6).start();
  const rev = new Tone.Reverb(2);
  const chords = new Tone.PolySynth(Tone.Synth);
  chords.set({
    oscillator: { type: "fatsawtooth", count: 4, spread: 40 },
    envelope: { attack: 0.02, decay: 0.3, sustain: 0.7, release: 0.4 },
  });
  chords.volume.value = -14;
  chords.chain(vib, chorus, rev, duck);
  track(vib, chorus, rev, chords);

  // Vocal-chop-ish pluck on top.
  const pluck = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.005, decay: 0.15, sustain: 0, release: 0.15 },
  });
  pluck.volume.value = -17;
  pluck.connect(duck);
  track(pluck);

  // Bright, emotive voicings.
  const fbChords: string[][] = [
    ["F3", "A3", "C4", "E4"],
    ["C3", "E3", "G3", "B3"],
    ["G3", "B3", "D4", "F4"],
    ["A3", "C4", "E4", "G4"],
  ];

  let ci = 0;
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.15, 0.22);
    }
  }, HALFK, "16n");
  seq((t, v) => {
    if (v) {
      snare.triggerAttackRelease("8n", t);
      pump(duck, t, 0.15, 0.22); // pump on snare too
    }
  }, SNR3, "16n");
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); },
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], "16n");
  seq((t) => {
    chords.triggerAttackRelease(fbChords[ci % 4], "1n", t);
    ci++;
  }, [0], "1n");
  seq((t, n) => { if (n) pluck.triggerAttackRelease(n as string, "16n", t); },
    ["C5", null, "E5", null, "G5", null, "E5", "C5", "D5", null, "F5", null, "A5", null, "G5", null], "16n");
}

/** Trap — snare on 3, triplet hat rolls, 808 with glides, triangle bell melody. */
function buildTrap(ctx: SynthCtx): void {
  const { Tone, mkHat, mkClap, seq, track, getMaster, SNR3 } = ctx;
  const snare = mkClap(1500, -6);
  const ch = mkHat(0.015, -18);

  // 808: long-decay MembraneSynth with pitch glide, played as the bass.
  const e808 = new Tone.MembraneSynth({
    pitchDecay: 0.08,
    octaves: 4,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.8, sustain: 0.1, release: 0.6 },
  });
  e808.volume.value = -4;
  e808.connect(getMaster());
  track(e808);

  // Triangle bell melody through reverb.
  const rev = new Tone.Reverb(2.2);
  const bell = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.002, decay: 0.3, sustain: 0, release: 0.3 },
  });
  bell.volume.value = -16;
  bell.chain(rev, getMaster());
  track(rev, bell);

  // Triplet-ish hat rolls: dense 16ths plus double-time bursts on a few steps.
  const hatP: SeqValue[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const rollAccent: SeqValue[] = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0];

  seq((t, v) => { if (v) snare.triggerAttackRelease("16n", t); }, SNR3, "16n");
  // 808 bassline with the classic trap kick placement (1 and the "&").
  seq((t, n) => { if (n) e808.triggerAttackRelease(n as string, "8n", t); },
    ["F1", null, null, null, null, null, "F1", null, null, null, null, null, "Ab1", null, "C2", null], "16n");
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); }, hatP, "16n");
  // Extra fast roll bursts (32nd feel) for the classic trap hat rolls.
  seq((t, v) => { if (v) ch.triggerAttackRelease("32n", t); }, rollAccent, "16n");
  seq((t, n) => { if (n) bell.triggerAttackRelease(n as string, "16n", t); },
    ["F5", null, "Ab5", null, "C6", null, "Ab5", null, "Eb5", null, "F5", null, "C5", null, null, null], "16n");
}

/** Melodic dubstep — halftime with pump on kick & snare, sine sub, fatsawtooth chords + triangle lead w/ delay. */
function buildMeldubstep(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, mkDuck, pump, seq, track, getMaster, HALFK, SNR3 } = ctx;
  const duck = mkDuck();
  const k = mkKick(-3);
  const snare = mkClap(1500, -6);
  const ch = mkHat(0.02, -22);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.7, release: 0.2 },
  });
  sub.volume.value = -6;
  sub.connect(getMaster());
  track(sub);

  // Emotional detuned-saw chords, sidechained.
  const crev = new Tone.Reverb(2.5);
  const chords = new Tone.PolySynth(Tone.Synth);
  chords.set({
    oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
    envelope: { attack: 0.05, decay: 0.3, sustain: 0.7, release: 0.6 },
  });
  chords.volume.value = -16;
  chords.chain(crev, duck);
  track(crev, chords);

  // Triangle lead with delay over the top.
  const delay = new Tone.FeedbackDelay("8n.", 0.3);
  const lrev = new Tone.Reverb(2);
  const lead = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.3 },
  });
  lead.volume.value = -14;
  lead.chain(delay, lrev, getMaster());
  track(delay, lrev, lead);

  const fmChords: string[][] = [
    ["F3", "Ab3", "C4"],
    ["Db3", "F3", "Ab3"],
    ["Eb3", "G3", "Bb3"],
    ["C3", "Eb3", "G3"],
  ];

  let ci = 0;
  let cr = FM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.2, 0.22);
    }
  }, HALFK, "16n");
  seq((t, v) => {
    if (v) {
      snare.triggerAttackRelease("8n", t);
      pump(duck, t, 0.2, 0.22);
    }
  }, SNR3, "16n");
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); },
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], "16n");
  seq((t) => {
    cr = FM_ROOTS[ci % 4];
    chords.triggerAttackRelease(fmChords[ci % 4], "1n", t);
    ci++;
  }, [0], "1n");
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "2n", t); }, HALFK, "16n");
  seq((t, n) => { if (n) lead.triggerAttackRelease(n as string, "8n", t); },
    ["Ab4", null, "C5", null, "Db5", null, "C5", "Ab4", "Bb4", null, "C5", null, "Eb5", null, null, null], "8n");
}

/** Glitch hop — halftime, sine sub + fatsawtooth through a fast (16n) AutoFilter = stuttering bass. */
function buildGlitchhop(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster, HALFK, SNR3 } = ctx;
  const k = mkKick(-2, { octaves: 6 });
  const snare = mkClap(1400, -6);
  const ch = mkHat(0.015, -20);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.6, release: 0.2 },
  });
  sub.volume.value = -6;
  sub.connect(getMaster());
  track(sub);

  // Fast 16n AutoFilter on a distorted saw = the gated/stuttering glitch bass.
  const dist = new Tone.Distortion(0.4);
  const af = autoFilter(ctx, "16n", 180, 4, 1, "lowpass", 6);
  const stut = new Tone.MonoSynth({
    oscillator: { type: "fatsawtooth", count: 2, spread: 25 },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.8, release: 0.1 },
  });
  stut.volume.value = -14;
  stut.chain(dist, af, getMaster());
  track(dist, af, stut);

  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, HALFK, "16n");
  seq((t, v) => { if (v) snare.triggerAttackRelease("8n", t); }, SNR3, "16n");
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); },
    [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0], "16n");
  seq((t, v) => { if (v) sub.triggerAttackRelease("E1", "4n", t); },
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], "16n");
  seq((t, n) => { if (n) stut.triggerAttackRelease(n as string, "8n", t); },
    ["E2", null, "E2", "E2", null, null, "G2", null, "E2", null, "D2", null, "E2", null, "A1", null], "16n");
}

// ===========================================================================
// HARD DANCE FAMILY
// ===========================================================================

/** Hardstyle — distorted 4-floor kick, offbeat reverse bass into the same distortion bus, saw lead. */
function buildHardstyle(ctx: SynthCtx): void {
  const { Tone, mkClap, seq, track, getMaster, FOUR, OFF, C24 } = ctx;

  // The distorted kick IS the bass in hardstyle — one heavily overdriven bus.
  const kdist = new Tone.Distortion(0.85);
  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.03,
    octaves: 8,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.4, sustain: 0, release: 0.25 },
  });
  kick.volume.value = -6;
  kick.chain(kdist, getMaster());
  track(kdist, kick);

  const clap = mkClap(1500, -10);

  // Offbeat "reverse bass" — a soft-attack pluck on the offbeats through the same dirty character.
  const bdist = new Tone.Distortion(0.8);
  const rbass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.02, decay: 0.1, sustain: 0.2, release: 0.05 }, // soft attack = "reverse" feel
    filter: { type: "lowpass", Q: 1 },
    filterEnvelope: { attack: 0.02, decay: 0.08, sustain: 0.3, baseFrequency: 80, octaves: 2 },
  });
  rbass.volume.value = -10;
  rbass.chain(bdist, getMaster());
  track(bdist, rbass);

  // Screechy detuned saw lead.
  const ldist = new Tone.Distortion(0.5);
  const lead = new Tone.PolySynth(Tone.Synth);
  lead.set({
    oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.3, release: 0.15 },
  });
  lead.volume.value = -18;
  lead.chain(ldist, getMaster());
  track(ldist, lead);

  seq((t, v) => { if (v) kick.triggerAttackRelease("C1", "8n", t); }, FOUR, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  // Reverse bass on the offbeats (between the kicks).
  seq((t, v) => { if (v) rbass.triggerAttackRelease("E1", "8n", t); }, OFF, "16n");
  seq((t, n) => { if (n) lead.triggerAttackRelease([n as string], "8n", t); },
    ["E4", null, "G4", null, "B4", null, "E5", null, "D5", null, "B4", null, "G4", null, "E4", null], "16n");
}

/** Happy hardcore — fast 4-floor, offbeat hat, clap, sawtooth offbeat-roll bass, square piano stabs + reverb. */
function buildHappyhardcore(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster, FOUR, OFF, C24, ROLL } = ctx;
  const k = mkKick(-2);
  const oh = mkHat(0.1, -16);
  const clap = mkClap(1700, -12);

  const bass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { Q: 2, type: "lowpass" },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.04 },
    filterEnvelope: { attack: 0.005, decay: 0.08, sustain: 0.3, baseFrequency: 120, octaves: 2 },
  });
  bass.volume.value = -8;
  bass.connect(getMaster());
  track(bass);

  // Euphoric square "piano" stabs through reverb.
  const rev = new Tone.Reverb(1.8);
  const piano = new Tone.PolySynth(Tone.Synth);
  piano.set({
    oscillator: { type: "square" },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.2, release: 0.2 },
  });
  piano.volume.value = -18;
  piano.chain(rev, getMaster());
  track(rev, piano);

  // Bright major progression: C G Am F.
  const chords: string[][] = [
    ["C4", "E4", "G4"],
    ["G3", "B3", "D4"],
    ["A3", "C4", "E4"],
    ["F3", "A3", "C4"],
  ];
  const roots = ["C2", "G1", "A1", "F1"];

  let ci = 0;
  let cr = roots[0];
  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, FOUR, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq((t) => {
    cr = roots[ci % 4];
    piano.triggerAttackRelease(chords[ci % 4], "4n", t);
    ci++;
  }, [0], "1n");
  seq((t, v) => { if (v) bass.triggerAttackRelease(cr, "16n", t); }, ROLL, "16n");
}

/** Gabber — very fast, heavily overdriven square-wave kick used as the lead; sawtooth motif. */
function buildGabber(ctx: SynthCtx): void {
  const { Tone, seq, track, getMaster, FOUR } = ctx;

  // The overdriven kick is the whole track — square osc, brutal distortion, pitched.
  const dist = new Tone.Distortion(0.95);
  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.02,
    octaves: 7,
    oscillator: { type: "square" },
    envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.2 },
  });
  kick.volume.value = -8;
  kick.chain(dist, getMaster());
  track(dist, kick);

  // A simple distorted saw motif sitting above the kick.
  const mdist = new Tone.Distortion(0.6);
  const motif = new Tone.Synth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.005, decay: 0.15, sustain: 0.1, release: 0.1 },
  });
  motif.volume.value = -16;
  motif.chain(mdist, getMaster());
  track(mdist, motif);

  // Pitch the overdriven kick around so it "plays the riff" — the gabber signature.
  let step = 0;
  seq((t) => {
    const note = step % 8 === 4 ? "E1" : "C1";
    kick.triggerAttackRelease(note, "16n", t);
    step++;
  }, FOUR, "16n");
  seq((t, n) => { if (n) motif.triggerAttackRelease(n as string, "16n", t); },
    ["C4", null, null, "E4", null, null, "G4", null, "C5", null, "G4", null, "E4", null, "C4", null], "16n");
}

// ===========================================================================
// HYBRID / GLOBAL FAMILY
// ===========================================================================

/** Phonk — 4-floor, clap, triplet hat rolls, distorted 808, bandpass square cowbell melody. */
function buildPhonk(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster, FOUR, C24, ALL16 } = ctx;
  const clap = mkClap(1600, -10);
  // 4-floor kick (separate, punchy).
  const kick = mkKick(-4, { octaves: 6 });
  // Hat for the triplet-roll feel.
  const ch = mkHat(0.015, -18);

  // Distorted 808.
  const dist = new Tone.Distortion(0.5);
  const e808 = new Tone.MembraneSynth({
    pitchDecay: 0.07,
    octaves: 4,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.7, sustain: 0.1, release: 0.5 },
  });
  e808.volume.value = -5;
  e808.chain(dist, getMaster());
  track(dist, e808);

  // The cowbell: square wave through a tight bandpass = the phonk cowbell melody.
  const bp = new Tone.Filter(800, "bandpass");
  bp.Q.value = 8;
  const cowbell = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.1 },
  });
  cowbell.volume.value = -14;
  cowbell.chain(bp, getMaster());
  track(bp, cowbell);

  seq((t, v) => { if (v) kick.triggerAttackRelease("C1", "8n", t); }, FOUR, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  // Triplet-feel hat rolls (busy 16ths).
  seq((t, v) => { if (v) ch.triggerAttackRelease("16n", t); }, ALL16, "16n");
  // Distorted 808 line with glides.
  seq((t, n) => { if (n) e808.triggerAttackRelease(n as string, "4n", t); },
    ["A1", null, null, null, null, null, "A1", null, "C2", null, null, null, "G1", null, null, null], "16n");
  // Cowbell melody — the signature phonk hook.
  seq((t, n) => { if (n) cowbell.triggerAttackRelease(n as string, "16n", t); },
    ["A4", null, "A4", "C5", "A4", null, "E4", null, "A4", "C5", null, "E5", "C5", null, "A4", null], "16n");
}

/** Amapiano — soft 4-floor, 16th shakers, clap, gliding sine "log drum" bass, jazzy triangle chords + reverb. */
function buildAmapiano(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, seq, track, getMaster, FOUR, ALL16, C24 } = ctx;
  const k = mkKick(-6);
  const shaker = mkHat(0.02, -22);
  const clap = mkClap(1700, -12);

  // The log drum: a sine MonoSynth with portamento so it glides between pitches.
  const logdrum = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    portamento: 0.06, // the signature glide
    envelope: { attack: 0.005, decay: 0.4, sustain: 0.2, release: 0.3 },
    filter: { type: "lowpass", Q: 1 },
    filterEnvelope: { attack: 0.005, decay: 0.2, sustain: 0.4, baseFrequency: 120, octaves: 1.5 },
  });
  logdrum.volume.value = -6;
  logdrum.connect(getMaster());
  track(logdrum);

  // Jazzy triangle chords (7th/9th voicings) through reverb.
  const rev = new Tone.Reverb(2.5);
  const keys = new Tone.PolySynth(Tone.Synth);
  keys.set({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 0.6 },
  });
  keys.volume.value = -17;
  keys.chain(rev, getMaster());
  track(rev, keys);

  // Bouncy log-drum pattern (the genre's whole identity).
  const logP: SeqValue[] = ["F2", null, null, "Ab2", null, "F2", null, "C2", null, "Db2", null, null, "Eb2", null, "F2", null];
  const jazzChords: string[][] = [
    ["F3", "Ab3", "C4", "Eb4"],
    ["Db3", "F3", "Ab3", "C4"],
    ["Eb3", "G3", "Bb3", "D4"],
    ["C3", "Eb3", "G3", "Bb3"],
  ];

  let ci = 0;
  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, FOUR, "16n");
  seq((t, v) => { if (v) shaker.triggerAttackRelease("16n", t); }, ALL16, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, C24, "16n");
  seq((t) => {
    keys.triggerAttackRelease(jazzChords[ci % 4], "1n", t);
    ci++;
  }, [0], "1n");
  seq((t, n) => { if (n) logdrum.triggerAttackRelease(n as string, "16n", t); }, logP, "16n");
}

/** Moombahton — slow 108 BPM, 4-floor + dembow clap pattern, sine sub, fatsawtooth stabs + reverb, pump. */
function buildMoombahton(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, mkClap, mkDuck, pump, seq, track, getMaster, FOUR, OFF } = ctx;
  const duck = mkDuck();
  const k = mkKick(-3, { octaves: 6 });
  const oh = mkHat(0.1, -18);
  const clap = mkClap(1600, -11);

  const sub = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.005, decay: 0.25, sustain: 0.6, release: 0.2 },
  });
  sub.volume.value = -7;
  sub.connect(getMaster());
  track(sub);

  // Detuned-saw stabs through reverb, sidechained.
  const rev = new Tone.Reverb(2);
  const stab = new Tone.PolySynth(Tone.Synth);
  stab.set({
    oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.2 },
  });
  stab.volume.value = -16;
  stab.chain(rev, duck);
  track(rev, stab);

  // Dembow: the "boom-ch-boom-chick" — claps on the classic dembow accents.
  const dembow: SeqValue[] = [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0];

  let ci = 0;
  let cr = AM_ROOTS[0];
  seq((t, v) => {
    if (v) {
      k.triggerAttackRelease("C1", "8n", t);
      pump(duck, t, 0.25, 0.2);
    }
  }, FOUR, "16n");
  seq((t, v) => { if (v) clap.triggerAttackRelease("16n", t); }, dembow, "16n");
  seq((t, v) => { if (v) oh.triggerAttackRelease("8n", t); }, OFF, "16n");
  seq(() => { cr = AM_ROOTS[ci % 4]; ci++; }, [0], "1n");
  seq((t, v) => { if (v) sub.triggerAttackRelease(cr, "4n", t); }, FOUR, "16n");
  seq((t, v) => { if (v) stab.triggerAttackRelease(AM_CHORDS[ci % 4], "16n", t); }, dembow, "16n");
}

/** Synthwave — kick 1&3, gated-reverb snare, 8th hats, sawtooth analog arp bass (8ths), 3x saw lead + chorus/reverb. */
function buildSynthwave(ctx: SynthCtx): void {
  const { Tone, mkKick, mkHat, seq, track, getMaster } = ctx;
  const k = mkKick(-4, { octaves: 5 });
  const hat = mkHat(0.05, -20);

  // Gated-reverb snare: a clap whose reverb is short/abruptly cut = the 80s gated snare.
  const grev = new Tone.Reverb(0.6); // short, gated-feel decay
  const snare = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
  });
  const sbp = new Tone.Filter(1500, "bandpass");
  sbp.Q.value = 1.1;
  snare.volume.value = -8;
  snare.chain(sbp, grev, getMaster());
  track(grev, sbp, snare);

  // Analog-style sawtooth arp bass running 8ths.
  const arpBass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.005, decay: 0.15, sustain: 0.3, release: 0.1 },
    filter: { type: "lowpass", Q: 2 },
    filterEnvelope: { attack: 0.005, decay: 0.1, sustain: 0.4, baseFrequency: 100, octaves: 2.5 },
  });
  arpBass.volume.value = -10;
  arpBass.connect(getMaster());
  track(arpBass);

  // Lush 3x saw lead with chorus + reverb (the nostalgic synthwave lead).
  const chorus = new Tone.Chorus(1.5, 3, 0.6).start();
  const lrev = new Tone.Reverb(2.5);
  const lead = new Tone.PolySynth(Tone.Synth);
  lead.set({
    oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
    envelope: { attack: 0.05, decay: 0.3, sustain: 0.6, release: 0.5 },
  });
  lead.volume.value = -18;
  lead.chain(chorus, lrev, getMaster());
  track(chorus, lrev, lead);

  // Kick on 1 and 3; snare on 2 and 4; hats on 8ths.
  const kickP: SeqValue[] = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
  const snareP: SeqValue[] = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
  const hatP: SeqValue[] = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
  // Driving 8th-note arp bass through the progression.
  const arpP: SeqValue[] = ["A1", "A2", "A1", "A2", "F1", "F2", "F1", "F2", "C2", "C3", "C2", "C3", "G1", "G2", "G1", "G2"];

  // Bar clock: advance the progression index once per bar (time arg unused here).
  let ci = 0;
  seq(() => { ci++; }, [0], "1n");
  seq((t, v) => { if (v) k.triggerAttackRelease("C1", "8n", t); }, kickP, "16n");
  seq((t, v) => { if (v) snare.triggerAttackRelease("8n", t); }, snareP, "16n");
  seq((t, v) => { if (v) hat.triggerAttackRelease("16n", t); }, hatP, "16n");
  seq((t, n) => { if (n) arpBass.triggerAttackRelease(n as string, "8n", t); }, arpP, "16n");
  // Sustained saw lead chords on the progression.
  seq((t) => { lead.triggerAttackRelease(AM_CHORDS[ci % 4], "1n", t); }, [0], "1n");
}

// ===========================================================================
// The builder table — ALL 31 genres. Typed as Record<GenreId, Builder> so the
// compiler guarantees every supported id has an entry and none are misspelled.
// ===========================================================================

export const BUILDERS: Record<GenreId, Builder> = {
  // House family
  house: { bpm: 124, build: buildHouse },
  tech: { bpm: 125, build: buildTech },
  deep: { bpm: 121, build: buildDeep },
  prog: { bpm: 128, build: buildProg },
  melodic: { bpm: 122, build: buildMelodic },
  futurehouse: { bpm: 126, build: buildFutureHouse },
  bigroom: { bpm: 128, build: buildBigroom },
  basshouse: { bpm: 128, build: buildBasshouse },
  electrohouse: { bpm: 128, build: buildElectrohouse },
  frenchhouse: { bpm: 120, build: buildFrenchhouse },
  acidhouse: { bpm: 122, build: buildAcidhouse },
  tropical: { bpm: 112, build: buildTropical },
  // Techno / trance family
  techno: { bpm: 130, build: buildTechno },
  trance: { bpm: 138, build: buildTrance },
  psytrance: { bpm: 145, build: buildPsytrance },
  // Breaks / bass family
  dnb: { bpm: 174, build: buildDnb },
  ukg: { bpm: 135, build: buildUkg },
  bigbeat: { bpm: 130, build: buildBigbeat },
  jungle: { bpm: 160, build: buildJungle },
  dubstep: { bpm: 140, build: buildDubstep },
  futurebass: { bpm: 150, build: buildFuturebass },
  trap: { bpm: 140, build: buildTrap },
  meldubstep: { bpm: 140, build: buildMeldubstep },
  glitchhop: { bpm: 105, build: buildGlitchhop },
  // Hard dance family
  hardstyle: { bpm: 150, build: buildHardstyle },
  happyhardcore: { bpm: 170, build: buildHappyhardcore },
  gabber: { bpm: 190, build: buildGabber },
  // Hybrid / global family
  phonk: { bpm: 130, build: buildPhonk },
  amapiano: { bpm: 112, build: buildAmapiano },
  moombahton: { bpm: 108, build: buildMoombahton },
  synthwave: { bpm: 100, build: buildSynthwave },
};
