/**
 * The EDM Atlas dataset: 31 subgenres across 8 families.
 *
 * `related` is the source of truth for the constellation edges (treat as
 * undirected; de-duplicate reciprocal pairs). Every `spotifyId` ships `null`
 * and is filled at build time from genres.resolved.json — never guess IDs.
 *
 * `weight` (optional) nudges star size + layout gravity for the foundational
 * "anchor" genres; everything else is sized off its number of related links.
 */

export type FamilyId =
  | "House"
  | "Techno"
  | "Trance"
  | "Breakbeat & jungle"
  | "Bass music"
  | "Hard dance"
  | "Global & trap-adjacent"
  | "Retro / other";

export type Track = {
  artist: string;
  title: string;
  spotifyId: string | null;
  recent?: boolean; // released in the last few years (2023+)
};

export type Genre = {
  id: string;
  name: string;
  family: FamilyId;
  bpm: [number, number];
  typicalBpm: number;
  unique: string; // the one-sentence "why it sounds like this"
  signature: string; // concrete sonic elements
  examples: Track[];
  related: string[]; // ids of neighboring genres (edges)
  weight?: number; // 0..1 extra gravity/size for foundational anchors
};

export const GENRES: Genre[] = [
  // ---------- HOUSE ----------
  {
    id: "house",
    name: "House",
    family: "House",
    bpm: [120, 130],
    typicalBpm: 124,
    unique:
      "The original four-on-the-floor dance template that most other electronic genres build on.",
    signature:
      "Kick on every beat, hi-hats on the offbeats, clap on 2 and 4, disco/soul roots.",
    examples: [
      { artist: "Marshall Jefferson", title: "Move Your Body", spotifyId: null },
      { artist: "Frankie Knuckles", title: "Your Love", spotifyId: null },
    ],
    related: ["tech", "deep", "frenchhouse", "acidhouse", "ukg", "moombahton"],
    weight: 1,
  },
  {
    id: "tech",
    name: "Tech house",
    family: "House",
    bpm: [122, 128],
    typicalBpm: 125,
    unique: "House groove fused with techno's stripped-back, percussive minimalism.",
    signature:
      "Tight kick, rolling syncopated bassline, sparse melody, dancefloor-focused.",
    examples: [
      { artist: "Fisher", title: "Losing It", spotifyId: null },
      { artist: "Chris Lake", title: "Turn Off The Lights", spotifyId: null },
    ],
    related: ["house", "techno", "basshouse"],
  },
  {
    id: "deep",
    name: "Deep house",
    family: "House",
    bpm: [118, 124],
    typicalBpm: 121,
    unique: "Warmer, slower house with jazzy chords and a mellow, soulful mood.",
    signature: "Soft kick, lush 7th/9th chords, atmospheric pads, laid-back groove.",
    examples: [
      { artist: "Mr. Fingers", title: "Can You Feel It", spotifyId: null },
      { artist: "Kerri Chandler", title: "Rain", spotifyId: null },
    ],
    related: ["house", "melodic", "tropical", "amapiano"],
  },
  {
    id: "prog",
    name: "Progressive house",
    family: "House",
    bpm: [124, 132],
    typicalBpm: 128,
    unique: "Built on gradual builds and breakdowns rather than a static loop.",
    signature:
      "Long evolving arrangements, layered synths, big breakdowns and drops.",
    examples: [
      { artist: "deadmau5", title: "Strobe", spotifyId: null },
      { artist: "Eric Prydz", title: "Opus", spotifyId: null },
    ],
    related: ["house", "melodic", "trance", "bigroom"],
  },
  {
    id: "melodic",
    name: "Melodic house & techno",
    family: "House",
    bpm: [118, 124],
    typicalBpm: 122,
    unique: "Foregrounds emotive, hypnotic synth melodies and atmosphere.",
    signature:
      "Emotive arpeggiated leads, warm pads, delay and reverb, steady groove.",
    examples: [
      { artist: "Lane 8", title: "Brightest Lights", spotifyId: null },
      { artist: "Ben Böhmer", title: "Begin Again", spotifyId: null },
    ],
    related: ["deep", "prog", "meldubstep", "synthwave"],
  },
  {
    id: "futurehouse",
    name: "Future house",
    family: "House",
    bpm: [122, 128],
    typicalBpm: 126,
    unique:
      "Defined by a metallic, vocal-like filtered bass lead over a house groove.",
    signature:
      "Bandpass-swept 'talking' bass lead, clap on 2 and 4, clean house drums.",
    examples: [
      { artist: "Oliver Heldens", title: "Gecko (Overdrive)", spotifyId: null },
      { artist: "Tchami", title: "After Life", spotifyId: null },
    ],
    related: ["house", "basshouse", "bigroom"],
  },
  {
    id: "bigroom",
    name: "Big room / festival",
    family: "House",
    bpm: [126, 132],
    typicalBpm: 128,
    unique: "Maximal, anthemic simplicity engineered for festival main stages.",
    signature: "Huge kick, simple layered supersaw drop, big reverb, hard sidechain.",
    examples: [
      { artist: "Martin Garrix", title: "Animals", spotifyId: null },
      { artist: "W&W", title: "Bigfoot", spotifyId: null },
    ],
    related: ["prog", "futurehouse", "electrohouse", "trance"],
  },
  {
    id: "basshouse",
    name: "Bass house",
    family: "House",
    bpm: [126, 130],
    typicalBpm: 128,
    unique: "House structure with a growling, dubstep-influenced bass on the drops.",
    signature:
      "House four-on-the-floor plus a distorted, filter-modulated growl bass.",
    examples: [
      { artist: "Jauz", title: "Feel The Volume", spotifyId: null },
      { artist: "AC Slater", title: "Bass Inside", spotifyId: null },
    ],
    related: ["tech", "futurehouse", "dubstep"],
  },
  {
    id: "electrohouse",
    name: "Electro house",
    family: "House",
    bpm: [125, 130],
    typicalBpm: 128,
    unique: "Dirty, distorted saw leads and heavy mid-range energy.",
    signature: "Overdriven supersaw lead riffs, punchy kick, aggressive tone.",
    examples: [
      { artist: "Justice", title: "Genesis", spotifyId: null },
      { artist: "Knife Party", title: "Internet Friends", spotifyId: null },
    ],
    related: ["house", "bigroom"],
  },
  {
    id: "frenchhouse",
    name: "French house / nu-disco",
    family: "House",
    bpm: [118, 125],
    typicalBpm: 120,
    unique: "Funky disco and soul loops shaped by sweeping resonant filters.",
    signature:
      "Filtered, chopped disco chords/samples, slow filter sweeps, four-on-the-floor.",
    examples: [
      { artist: "Daft Punk", title: "One More Time", spotifyId: null },
      {
        artist: "Stardust",
        title: "Music Sounds Better with You",
        spotifyId: null,
      },
    ],
    related: ["house", "deep", "acidhouse"],
  },
  {
    id: "acidhouse",
    name: "Acid house",
    family: "House",
    bpm: [118, 128],
    typicalBpm: 122,
    unique: "Built around the squelchy, sliding Roland TB-303 bassline.",
    signature:
      "Resonant 303 bass with portamento and filter sweeps, simple house drums.",
    examples: [
      { artist: "Phuture", title: "Acid Tracks", spotifyId: null },
      {
        artist: "Josh Wink",
        title: "Higher State of Consciousness",
        spotifyId: null,
      },
    ],
    related: ["house", "frenchhouse", "techno"],
  },
  {
    id: "tropical",
    name: "Tropical house",
    family: "House",
    bpm: [100, 118],
    typicalBpm: 112,
    unique:
      "Mellow, downtempo house with marimba/steel-pan leads and an airy feel.",
    signature: "Soft kick, plucky melodic leads, relaxed groove, bright pads.",
    examples: [
      { artist: "Kygo", title: "Firestone", spotifyId: null },
      { artist: "Thomas Jack", title: "Rivers", spotifyId: null },
    ],
    related: ["deep", "melodic"],
  },

  // ---------- TECHNO ----------
  {
    id: "techno",
    name: "Techno",
    family: "Techno",
    bpm: [125, 135],
    typicalBpm: 130,
    unique:
      "Hypnotic, repetitive, machine-driven, with dark industrial textures and little melody.",
    signature: "Relentless four-on-the-floor, offbeat sub, sparse delayed stabs.",
    examples: [
      { artist: "Charlotte de Witte", title: "Doppler", spotifyId: null },
      { artist: "Adam Beyer", title: "Your Mind", spotifyId: null },
    ],
    related: ["tech", "acidhouse", "trance", "psytrance"],
    weight: 1,
  },

  // ---------- TRANCE ----------
  {
    id: "trance",
    name: "Trance",
    family: "Trance",
    bpm: [132, 142],
    typicalBpm: 138,
    unique: "Long emotional builds that release into euphoric melodic peaks.",
    signature: "Rolling offbeat bass, supersaw chords, big lead, hard sidechain pump.",
    examples: [
      { artist: "ATB", title: "9 PM (Till I Come)", spotifyId: null },
      { artist: "Above & Beyond", title: "Sun & Moon", spotifyId: null },
    ],
    related: ["prog", "psytrance", "techno", "bigroom"],
    weight: 1,
  },
  {
    id: "psytrance",
    name: "Psytrance",
    family: "Trance",
    bpm: [140, 150],
    typicalBpm: 145,
    unique: "A fast, relentless rolling bass and psychedelic, squelchy textures.",
    signature:
      "16th-note rolling bass under each kick, acid leads, hypnotic repetition.",
    examples: [
      { artist: "Vini Vici", title: "The Tribe", spotifyId: null },
      { artist: "Astrix", title: "Deep Jungle Walk", spotifyId: null },
    ],
    related: ["trance", "techno"],
  },

  // ---------- BREAKBEAT & JUNGLE ----------
  {
    id: "dnb",
    name: "Drum & bass",
    family: "Breakbeat & jungle",
    bpm: [165, 180],
    typicalBpm: 174,
    unique: "Fast breakbeats around 174 BPM over heavy sub and Reese basslines.",
    signature:
      "Breakbeat (snare on 2 and 4) at high tempo, deep sub, detuned Reese bass.",
    examples: [
      { artist: "Sub Focus", title: "Timewarp", spotifyId: null },
      { artist: "Pendulum", title: "Tarantula", spotifyId: null },
    ],
    related: ["jungle", "dubstep"],
    weight: 1,
  },
  {
    id: "ukg",
    name: "UK garage / 2-step",
    family: "Breakbeat & jungle",
    bpm: [130, 140],
    typicalBpm: 135,
    unique: "A swung, shuffling, syncopated drum feel with soulful vocal chops.",
    signature: "Swung 2-step drums, snare on 2 and 4, bouncy bass, chord stabs.",
    examples: [
      { artist: "Artful Dodger", title: "Re-Rewind", spotifyId: null },
      { artist: "MJ Cole", title: "Sincere", spotifyId: null },
    ],
    related: ["house", "dnb"],
  },
  {
    id: "bigbeat",
    name: "Big beat",
    family: "Breakbeat & jungle",
    bpm: [120, 140],
    typicalBpm: 130,
    unique: "Chunky breakbeats with distorted funk bass and a rock/hip-hop attitude.",
    signature: "Funky breakbeat drums, fat distorted bass, big filtered builds.",
    examples: [
      { artist: "Fatboy Slim", title: "Right Here, Right Now", spotifyId: null },
      {
        artist: "The Chemical Brothers",
        title: "Block Rockin' Beats",
        spotifyId: null,
      },
    ],
    related: ["jungle", "ukg"],
  },
  {
    id: "jungle",
    name: "Jungle",
    family: "Breakbeat & jungle",
    bpm: [155, 170],
    typicalBpm: 160,
    unique:
      "Chopped, intricate amen breakbeats with deep reggae/dub sub bass; the precursor to DnB.",
    signature: "Heavily edited fast breaks, ghost snares, deep reggae-style sub.",
    examples: [
      { artist: "Shy FX", title: "Original Nuttah", spotifyId: null },
      { artist: "Goldie", title: "Inner City Life", spotifyId: null },
    ],
    related: ["dnb", "bigbeat"],
  },

  // ---------- BASS MUSIC ----------
  {
    id: "dubstep",
    name: "Dubstep",
    family: "Bass music",
    bpm: [138, 142],
    typicalBpm: 140,
    unique:
      "Halftime drums under a wobbling, LFO-modulated low-frequency bass (the 'wub').",
    signature:
      "Kick on 1, snare on 3, distorted bass swept by a rhythmic filter LFO.",
    examples: [
      {
        artist: "Skrillex",
        title: "Scary Monsters and Nice Sprites",
        spotifyId: null,
      },
      { artist: "Flux Pavilion", title: "Bass Cannon", spotifyId: null },
    ],
    related: ["basshouse", "meldubstep", "glitchhop", "dnb"],
    weight: 1,
  },
  {
    id: "futurebass",
    name: "Future bass",
    family: "Bass music",
    bpm: [140, 160],
    typicalBpm: 150,
    unique:
      "Bright, emotional chords made of detuned, pitch-wobbling supersaws with vocal chops.",
    signature:
      "Halftime drop, detuned supersaw chord with vibrato, chopped vocal plucks.",
    examples: [
      { artist: "Flume", title: "Never Be Like You", spotifyId: null },
      { artist: "San Holo", title: "Light", spotifyId: null },
    ],
    related: ["trap", "meldubstep", "melodic"],
  },
  {
    id: "trap",
    name: "Trap (EDM)",
    family: "Bass music",
    bpm: [138, 150],
    typicalBpm: 140,
    unique: "Hip-hop trap's foundation adapted for the dancefloor.",
    signature: "808 sub-bass with glides, snare on 3, rapid triplet hi-hat rolls.",
    examples: [
      { artist: "RL Grime", title: "Core", spotifyId: null },
      { artist: "Baauer", title: "Harlem Shake", spotifyId: null },
    ],
    related: ["futurebass", "phonk", "moombahton"],
  },
  {
    id: "meldubstep",
    name: "Melodic dubstep",
    family: "Bass music",
    bpm: [140, 150],
    typicalBpm: 140,
    unique: "Emotional melody and lush chords carried over halftime dubstep weight.",
    signature:
      "Supersaw chords and an emotive lead over halftime drums and a melodic growl.",
    examples: [
      { artist: "Seven Lions", title: "Strangers", spotifyId: null },
      { artist: "Illenium", title: "Crawl Outta Love", spotifyId: null },
    ],
    related: ["dubstep", "futurebass", "melodic"],
  },
  {
    id: "glitchhop",
    name: "Glitch hop / midtempo",
    family: "Bass music",
    bpm: [100, 115],
    typicalBpm: 105,
    unique:
      "Funky or dark midtempo bass music with gated, stuttering, edited low end.",
    signature: "Halftime drums around 105 to 110 BPM, glitchy gated bass, dark mood.",
    examples: [
      { artist: "Rezz", title: "Edge", spotifyId: null },
      { artist: "The Glitch Mob", title: "Animus Vox", spotifyId: null },
    ],
    related: ["dubstep", "trap"],
  },

  // ---------- HARD DANCE ----------
  {
    id: "hardstyle",
    name: "Hardstyle",
    family: "Hard dance",
    bpm: [145, 155],
    typicalBpm: 150,
    unique:
      "Built on a distorted kick plus offbeat reverse-bass, topped with screechy euphoric leads.",
    signature: "Distorted kick on the beat, reverse bass on the offbeat, hard saw lead.",
    examples: [
      { artist: "Headhunterz", title: "Dragonborn", spotifyId: null },
      { artist: "Brennan Heart", title: "Imaginary", spotifyId: null },
    ],
    related: ["gabber", "happyhardcore", "bigroom"],
  },
  {
    id: "happyhardcore",
    name: "Happy hardcore",
    family: "Hard dance",
    bpm: [160, 180],
    typicalBpm: 170,
    unique:
      "Very fast four-on-the-floor with euphoric piano stabs and cheerful melodies.",
    signature: "Fast kick, rolling bass, bright piano/synth stabs, uplifting tone.",
    examples: [
      { artist: "Scooter", title: "How Much Is the Fish?", spotifyId: null },
      { artist: "S3RL", title: "Pretty Rave Girl", spotifyId: null },
    ],
    related: ["hardstyle", "gabber"],
  },
  {
    id: "gabber",
    name: "Gabber / hardcore",
    family: "Hard dance",
    bpm: [180, 200],
    typicalBpm: 190,
    unique:
      "Extremely fast and built around a heavily overdriven, distorted kick that acts as the lead.",
    signature:
      "Distorted square-wave kick on every beat, minimal melody, aggressive.",
    examples: [
      { artist: "Angerfist", title: "Raise Your Fist", spotifyId: null },
      {
        artist: "Rotterdam Terror Corps",
        title: "Rotterdamn",
        spotifyId: null,
      },
    ],
    related: ["hardstyle", "happyhardcore"],
  },

  // ---------- GLOBAL & TRAP-ADJACENT ----------
  {
    id: "phonk",
    name: "Phonk",
    family: "Global & trap-adjacent",
    bpm: [120, 140],
    typicalBpm: 130,
    unique:
      "Memphis-rap-rooted sound defined by cowbell melodies and distorted 808s; drift phonk is the viral modern strain.",
    signature: "Pitched cowbell melody, distorted 808, fast hat rolls, lo-fi grit.",
    examples: [
      { artist: "Ghostface Playa", title: "Why Not", spotifyId: null },
      { artist: "Kordhell", title: "Murder In My Mind", spotifyId: null },
    ],
    related: ["trap"],
  },
  {
    id: "amapiano",
    name: "Amapiano",
    family: "Global & trap-adjacent",
    bpm: [108, 118],
    typicalBpm: 112,
    unique:
      "South African style defined by a deep, gliding 'log drum' bass and spacious jazzy chords.",
    signature:
      "Gliding log-drum bass, shakers, soft four-on-the-floor, airy piano chords.",
    examples: [
      { artist: "Kabza De Small", title: "Sponono", spotifyId: null },
      { artist: "Uncle Waffles", title: "Tanzania", spotifyId: null },
    ],
    related: ["deep", "tropical"],
  },
  {
    id: "moombahton",
    name: "Moombahton",
    family: "Global & trap-adjacent",
    bpm: [105, 115],
    typicalBpm: 108,
    unique:
      "House slowed to around 108 BPM and fused with reggaeton's dembow rhythm.",
    signature: "Dembow clap pattern, big saw stabs, slow heavy groove.",
    examples: [
      { artist: "Dillon Francis", title: "Get Low", spotifyId: null },
      { artist: "Major Lazer", title: "Pon de Floor", spotifyId: null },
    ],
    related: ["trap", "house"],
  },

  // ---------- RETRO / OTHER ----------
  {
    id: "synthwave",
    name: "Synthwave / retrowave",
    family: "Retro / other",
    bpm: [80, 118],
    typicalBpm: 100,
    unique: "Deliberately 1980s-inspired production, nostalgic and cinematic.",
    signature: "Gated-reverb snare, analog arpeggiated bass, lush detuned retro leads.",
    examples: [
      { artist: "Kavinsky", title: "Nightcall", spotifyId: null },
      { artist: "The Midnight", title: "Sunset", spotifyId: null },
    ],
    related: ["melodic", "tropical"],
  },
];

export const GENRE_BY_ID: Record<string, Genre> = Object.fromEntries(
  GENRES.map((g) => [g.id, g]),
);
