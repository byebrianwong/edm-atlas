/**
 * The EDM Atlas dataset: 31 subgenres across 8 families.
 *
 * `related` is the source of truth for the constellation edges (treat as
 * undirected; de-duplicate reciprocal pairs). Every `spotifyId` ships `null`
 * and is filled at build time from genres.resolved.json — never guess IDs.
 *
 * `weight` (optional) nudges star size + layout gravity for the foundational
 * "anchor" genres; everything else is sized off its number of related links.
 *
 * `history` is a 2–3 sentence origin story; `learnMore` points to the most
 * authoritative free overview (Wikipedia for nearly all of them) so people can
 * read further. Keep both factually grounded — these are checked against the
 * record, not vibes.
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

export type LearnMore = {
  label: string; // the source being linked, e.g. "Wikipedia"
  url: string;
};

export type Genre = {
  id: string;
  name: string;
  family: FamilyId;
  bpm: [number, number];
  typicalBpm: number;
  unique: string; // the one-sentence "why it sounds like this"
  signature: string; // concrete sonic elements
  history: string; // short origin story (2–3 sentences)
  learnMore: LearnMore; // authoritative link to read further
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
    history:
      "Born in early-1980s Chicago, where DJs like Frankie Knuckles spun extended disco edits at clubs such as The Warehouse — the venue that gave the genre its name. By the late '80s it had crossed to the UK and gone on to reshape club and pop music worldwide.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/House_music" },
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
    history:
      "Emerged in mid-1990s Britain as DJs blended the warmth of house with techno's stripped-down minimalism. It became one of the dominant club sounds of the 2010s, topping Beatport's sales charts behind artists like Fisher and Chris Lake.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Tech_house" },
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
    history:
      "Took shape in mid-1980s Chicago when producers like Larry Heard (Mr. Fingers) folded jazz and soul harmonies into house. It has cycled through revivals ever since, from the '90s underground to a glossier 2010s mainstream wave.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Deep_house" },
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
    history:
      "Coined in the early 1990s UK to describe a more evolving, album-oriented strain of house. The name was redefined in the late 2000s by producers like deadmau5 and Eric Prydz, whose long builds became festival staples.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Progressive_house",
    },
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
    history:
      "A 2010s umbrella sound that crystallized around labels like Anjunadeep and Tale of Us's Afterlife, descending from progressive house and trance. Beatport made it an official genre category in the late 2010s as artists like Lane 8 and Ben Böhmer broke through.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Styles_of_house_music#Melodic_house",
    },
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
    history:
      "Coined by French producer Tchami in 2013 to tag his filtered, bass-driven take on house. Oliver Heldens pushed it into the charts the next year with 'Gecko (Overdrive),' cementing the sound.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Future_house" },
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
    history:
      "The defining main-stage sound of the early-2010s EDM boom, engineered for huge festival crowds. Martin Garrix's 2013 hit 'Animals' marked its commercial peak before the formula drew a wave of backlash.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Big_room_house",
    },
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
    history:
      "Coalesced in the mid-2010s as producers fused house grooves with dubstep's growling low end — Jauz's 2014 'Feel The Volume' was an early flashpoint. AC Slater's Night Bass label and club night helped organize it into a scene.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Bass_house_(music)",
    },
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
    history:
      "Rose in the mid-2000s out of the blog-house era, when acts like Justice pushed distorted, overdriven leads to the front. By the late 2000s it was one of Beatport's best-selling genres and a gateway to the EDM explosion.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Electro_house",
    },
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
    history:
      "The 'French touch' of the mid-1990s, built by Paris producers like Daft Punk and Stardust who looped filtered disco and funk samples. Daft Punk's 1997 debut 'Homework' carried the sound around the world.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/French_house" },
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
    history:
      "Invented in mid-1980s Chicago when producers misused the Roland TB-303 bass synth — Phuture's 1987 'Acid Tracks' is the blueprint. It went on to ignite Britain's 1988 'Second Summer of Love' and the rave movement.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Acid_house" },
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
    history:
      "A mid-2010s offshoot of deep house, lightened with marimba and steel-pan leads. The term started half-jokingly with Thomas Jack before Kygo turned it into a streaming-era phenomenon around 2014–2015.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Tropical_house",
    },
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
    history:
      "Born in mid-1980s Detroit from the 'Belleville Three' — Juan Atkins, Derrick May and Kevin Saunderson — who married funk and synth-pop to drum machines. It found a second home in Berlin after the Wall fell, becoming a global club institution.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Techno" },
    examples: [
      { artist: "Charlotte de Witte", title: "Doppler", spotifyId: null },
      { artist: "Adam Beyer & Bart Skils", title: "Your Mind", spotifyId: null },
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
    history:
      "Emerged in early-1990s Germany, especially around Frankfurt, out of techno and acid house but with melody and euphoria at the center. It hit mainstream peaks in the late '90s and 2000s through artists like Paul van Dyk and Armin van Buuren.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Trance_music" },
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
    history:
      "Grew out of the early-1990s Goa trance scene in India, where traveling DJs blended trance with psychedelic culture. It formalized into psytrance by the late '90s and now anchors dedicated festivals worldwide.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Psychedelic_trance",
    },
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
    history:
      "Crystallized in the mid-1990s UK as jungle's breakbeats grew cleaner and more engineered. It has stayed a continuous British institution for thirty years, branching into liquid, neurofunk and beyond.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Drum_and_bass",
    },
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
    history:
      "Developed in late-1990s London by speeding up and reworking US garage records for pirate radio and clubs. It topped the UK charts around 2000 and later seeded both grime and dubstep.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/UK_garage" },
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
    history:
      "A mid-1990s British sound centered on Brighton's Big Beat Boutique club night, fusing breakbeats with rock and hip-hop swagger. Fatboy Slim and The Chemical Brothers carried it to crossover fame late in the decade.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Big_beat" },
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
      "Chopped, intricate amen breakbeats with deep reggae/dub sub bass; the raw, ragga-led roots of drum & bass.",
    signature: "Heavily edited fast breaks, ghost snares, deep reggae-style sub.",
    history:
      "Sprang from the early-1990s UK rave scene, chopping the 'Amen break' over deep reggae-style sub bass. It peaked mid-decade before evolving into the smoother drum & bass that followed.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jungle_music" },
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
    history:
      "Took shape in early-2000s South London, especially Croydon, out of UK garage and dub at nights like FWD>>. A heavier, mid-range 'brostep' strain led by Skrillex broke it big in the US around 2010.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Dubstep" },
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
    history:
      "Emerged in the early-to-mid 2010s, drawing on the maximalist 'wonky' sound of Rustie and Hudson Mohawke. Australian producer Flume shaped its bright, vibrato-chord, vocal-chopped template into a streaming-era mainstay.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Future_bass" },
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
    history:
      "Adapted Southern hip-hop's trap production for the festival stage in the early 2010s. Baauer's 2012 'Harlem Shake' and producers like RL Grime pushed the 808-driven sound into dance music's mainstream.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Trap_music_(EDM)",
    },
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
    history:
      "A late-2000s offshoot that softened dubstep's halftime weight with lush chords and emotive leads. Artists like Seven Lions and Illenium built it into a melodic, festival-friendly strain through the 2010s.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Dubstep" },
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
      "Midtempo bass music with glitchy, stuttering, gated low end — from funky glitch hop to dark midtempo.",
    signature:
      "Halftime drums around 100 to 110 BPM, sliced and gated bass, glitchy edits.",
    history:
      "Began in the mid-2000s by fusing glitchy, stuttered editing with hip-hop's swing and tempo. It later branched into a darker, gated midtempo bass strain carried by artists like Rezz.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Glitch_hop" },
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
    history:
      "Developed in the early-2000s Netherlands out of gabber and hard trance, built on a distorted kick and reverse bass. Dutch festivals like Defqon.1 grew it into a global hard-dance movement.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Hardstyle" },
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
    history:
      "Bubbled up from the mid-1990s UK rave scene, pairing breakneck tempos with euphoric piano and sped-up vocals. It thrived in the UK and Australia and still fuels a devoted hardcore following.",
    learnMore: {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Happy_hardcore",
    },
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
    history:
      "Born in early-1990s Rotterdam as a faster, harder answer to Amsterdam's house scene, built on a brutally distorted kick. It became a defining Dutch youth subculture before spreading across Europe.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Gabber" },
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
    history:
      "Coalesced in the 2010s on SoundCloud and YouTube, sampling the cowbells and lo-fi grit of 1990s Memphis rap. A faster 'drift phonk' strain went viral in the early 2020s through TikTok and car-drift videos.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Phonk" },
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
      "Gliding log-drum bass, shakers, broken syncopated kick, airy piano chords.",
    history:
      "Grew out of South Africa's townships in the mid-2010s, fusing deep house, jazz and kwaito around a gliding 'log drum' bass. It became a national and then global phenomenon by the early 2020s.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Amapiano" },
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
    history:
      "Invented in 2009 by Washington, DC's Dave Nada, who slowed a Dutch house track to reggaeton tempo at a house party. The accidental hybrid quickly spread through Diplo's Mad Decent circle.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Moombahton" },
    examples: [
      { artist: "Dillon Francis & DJ Snake", title: "Get Low", spotifyId: null },
      { artist: "Diplo", title: "Express Yourself", spotifyId: null },
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
    history:
      "Arose in the late 2000s as producers recreated the synth scores of 1980s films and games. The 2011 film 'Drive' and its soundtrack — including Kavinsky — pushed the nostalgic sound to a far wider audience.",
    learnMore: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Synthwave" },
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
