/**
 * Curated seed of ~100 top EDM artists, each tagged with atlas genre ids
 * (see src/data/genres.ts) at both the artist and per-song level. This is the
 * hand-authored spine of the artist pages.
 *
 * It is deliberately a *seed*: track `spotifyId`s are left undefined here and
 * filled in by the resolver pipeline at build time —
 *   - scripts/resolve-artists-spotify.ts  → verified top tracks + artist genres
 *   - scripts/resolve-beatport.ts          → per-song genre tags (Beatport)
 * The merge layer (src/data/artistsAtlas.ts) overlays whatever those scripts
 * have produced on top of this seed, and back-fills spotifyIds by matching
 * tracks already resolved for the genre atlas. Until then the page renders from
 * the seed and SpotifyEmbed shows a "search on Spotify" link per track.
 *
 * Genre vocabulary: every id below is one of the atlas's 31 genres, so an
 * artist's genres and each song's genres all link back to a star on the map.
 * Primary genre is listed first.
 */

import type { AtlasGenreId } from "./genreAliases";

export type ArtistTrack = {
  title: string;
  /** Atlas genre ids this song belongs to (first = primary). */
  genres: AtlasGenreId[];
  /** Filled by the Spotify resolver / merge layer; null/undefined until then. */
  spotifyId?: string | null;
};

export type SeedArtist = {
  id: string; // url slug, used in /artist/:id
  name: string;
  /** Extra search terms: alternate spellings, real names, aliases. */
  aka?: string[];
  /** Atlas genre ids for the artist overall (first = primary). */
  genres: AtlasGenreId[];
  blurb: string;
  topTracks: ArtistTrack[];
};

export const ARTISTS: SeedArtist[] = [
  // ── House / progressive / festival ────────────────────────────────────────
  {
    id: "calvin-harris",
    name: "Calvin Harris",
    aka: ["adam wiles"],
    genres: ["electrohouse", "prog", "futurehouse", "bigroom"],
    blurb: "Scottish hitmaker who turned festival house into pop radio's default.",
    topTracks: [
      { title: "Feel So Close", genres: ["electrohouse", "prog"] },
      { title: "Summer", genres: ["bigroom", "electrohouse"] },
      { title: "Sweet Nothing", genres: ["electrohouse", "bigroom"] },
      { title: "This Is What You Came For", genres: ["prog", "futurehouse"] },
      { title: "One Kiss", genres: ["futurehouse", "house"] },
    ],
  },
  {
    id: "david-guetta",
    name: "David Guetta",
    genres: ["electrohouse", "bigroom", "house"],
    blurb: "French producer who fused house with mainstream pop a decade before it was cool.",
    topTracks: [
      { title: "When Love Takes Over", genres: ["electrohouse", "house"] },
      { title: "Titanium", genres: ["electrohouse", "bigroom"] },
      { title: "Memories", genres: ["electrohouse"] },
      { title: "Hey Mama", genres: ["bigroom", "trap"] },
      { title: "I'm Good (Blue)", genres: ["bigroom", "electrohouse"] },
    ],
  },
  {
    id: "daft-punk",
    name: "Daft Punk",
    genres: ["frenchhouse", "house", "electrohouse"],
    blurb: "The robots who defined French touch and rebuilt pop's relationship with dance.",
    topTracks: [
      { title: "One More Time", genres: ["frenchhouse", "house"] },
      { title: "Around the World", genres: ["frenchhouse", "house"] },
      { title: "Harder, Better, Faster, Stronger", genres: ["frenchhouse", "electrohouse"] },
      { title: "Da Funk", genres: ["frenchhouse", "house"] },
      { title: "Get Lucky", genres: ["frenchhouse"] },
    ],
  },
  {
    id: "deadmau5",
    name: "deadmau5",
    aka: ["joel zimmerman"],
    genres: ["prog", "electrohouse", "techno"],
    blurb: "Progressive-house auteur known for long-form builds and the mouse helmet.",
    topTracks: [
      { title: "Strobe", genres: ["prog"] },
      { title: "Ghosts 'n' Stuff", genres: ["electrohouse", "prog"] },
      { title: "I Remember", genres: ["prog", "electrohouse"] },
      { title: "The Veldt", genres: ["prog"] },
      { title: "Some Chords", genres: ["prog", "electrohouse"] },
    ],
  },
  {
    id: "eric-prydz",
    name: "Eric Prydz",
    aka: ["pryda", "cirez d"],
    genres: ["prog", "techno", "house"],
    blurb: "Swedish perfectionist behind huge prog anthems and the EPIC live show.",
    topTracks: [
      { title: "Opus", genres: ["prog"] },
      { title: "Call on Me", genres: ["house", "electrohouse"] },
      { title: "Pjanoo", genres: ["prog", "house"] },
      { title: "Generate", genres: ["prog", "techno"] },
      { title: "Every Day", genres: ["prog"] },
    ],
  },
  {
    id: "avicii",
    name: "Avicii",
    aka: ["tim bergling"],
    genres: ["prog", "bigroom", "house"],
    blurb: "Swedish prodigy who married folk songwriting to festival progressive house.",
    topTracks: [
      { title: "Levels", genres: ["prog", "bigroom"] },
      { title: "Wake Me Up", genres: ["prog", "house"] },
      { title: "Hey Brother", genres: ["prog", "house"] },
      { title: "Waiting for Love", genres: ["prog", "bigroom"] },
      { title: "The Nights", genres: ["prog"] },
    ],
  },
  {
    id: "swedish-house-mafia",
    name: "Swedish House Mafia",
    aka: ["shm"],
    genres: ["prog", "bigroom", "house"],
    blurb: "The supergroup (Axwell, Ingrosso, Angello) that built the festival main-stage sound.",
    topTracks: [
      { title: "Don't You Worry Child", genres: ["prog", "bigroom"] },
      { title: "One (Your Name)", genres: ["prog", "house"] },
      { title: "Greyhound", genres: ["prog", "bigroom"] },
      { title: "Save the World", genres: ["prog", "bigroom"] },
      { title: "Don't You Worry Child", genres: ["prog"] },
    ],
  },
  {
    id: "axwell-ingrosso",
    name: "Axwell Λ Ingrosso",
    aka: ["axwell ingrosso", "axwell", "sebastian ingrosso"],
    genres: ["prog", "house", "bigroom"],
    blurb: "Two-thirds of Swedish House Mafia in their melodic, festival-pop guise.",
    topTracks: [
      { title: "Something New", genres: ["prog", "house"] },
      { title: "More Than You Know", genres: ["prog", "house"] },
      { title: "Sun Is Shining", genres: ["prog", "bigroom"] },
      { title: "On My Way", genres: ["prog"] },
    ],
  },
  {
    id: "alesso",
    name: "Alesso",
    genres: ["prog", "bigroom", "house"],
    blurb: "Swedish producer with an ear for euphoric, melody-forward progressive house.",
    topTracks: [
      { title: "Heroes (We Could Be)", genres: ["prog", "bigroom"] },
      { title: "Years", genres: ["prog", "house"] },
      { title: "If I Lose Myself (Alesso Remix)", genres: ["prog", "bigroom"] },
      { title: "Calling (Lose My Mind)", genres: ["prog", "bigroom"] },
    ],
  },
  {
    id: "martin-garrix",
    name: "Martin Garrix",
    aka: ["martijn garritsen"],
    genres: ["bigroom", "prog", "futurebass"],
    blurb: "Dutch wunderkind who broke through at 16 and topped the DJ polls for years.",
    topTracks: [
      { title: "Animals", genres: ["bigroom"] },
      { title: "Scared to Be Lonely", genres: ["futurebass", "prog"] },
      { title: "In the Name of Love", genres: ["futurebass", "prog"] },
      { title: "Tremor", genres: ["bigroom"] },
    ],
  },
  {
    id: "hardwell",
    name: "Hardwell",
    aka: ["robbert van de corput"],
    genres: ["bigroom", "electrohouse", "prog"],
    blurb: "Dutch big-room titan, two-time DJ Mag #1 and Revealed Recordings boss.",
    topTracks: [
      { title: "Spaceman", genres: ["bigroom"] },
      { title: "Apollo", genres: ["bigroom", "electrohouse"] },
      { title: "Everybody Is in the Place", genres: ["bigroom"] },
    ],
  },
  {
    id: "dimitri-vegas-like-mike",
    name: "Dimitri Vegas & Like Mike",
    aka: ["dvlm"],
    genres: ["bigroom", "electrohouse"],
    blurb: "Belgian brothers who turned Tomorrowland into a launchpad for festival anthems.",
    topTracks: [
      { title: "Tremor", genres: ["bigroom"] },
      { title: "The Hum", genres: ["bigroom"] },
      { title: "Mammoth", genres: ["bigroom"] },
    ],
  },
  {
    id: "afrojack",
    name: "Afrojack",
    aka: ["nick van de wall"],
    genres: ["electrohouse", "bigroom", "house"],
    blurb: "Dutch producer behind the dirty-Dutch electro-house sound of the early 2010s.",
    topTracks: [
      { title: "Take Over Control", genres: ["electrohouse"] },
      { title: "Ten Feet Tall", genres: ["bigroom", "electrohouse"] },
      { title: "The Spark", genres: ["bigroom"] },
    ],
  },
  {
    id: "steve-aoki",
    name: "Steve Aoki",
    genres: ["bigroom", "electrohouse", "trap"],
    blurb: "Dim Mak founder, cake-throwing showman, and prolific festival collaborator.",
    topTracks: [
      { title: "Pursuit of Happiness (Remix)", genres: ["electrohouse"] },
      { title: "Boneless", genres: ["bigroom"] },
      { title: "Just Hold On", genres: ["bigroom"] },
    ],
  },
  {
    id: "zedd",
    name: "Zedd",
    aka: ["anton zaslavski"],
    genres: ["electrohouse", "bigroom", "futurebass"],
    blurb: "Classically trained producer who made complextro and crossover pop.",
    topTracks: [
      { title: "Clarity", genres: ["electrohouse", "bigroom"] },
      { title: "Stay", genres: ["futurebass"] },
      { title: "The Middle", genres: ["futurebass"] },
      { title: "Spectrum", genres: ["electrohouse"] },
    ],
  },
  {
    id: "kygo",
    name: "Kygo",
    aka: ["kyrre gørvell-dahll"],
    genres: ["tropical", "house", "deep"],
    blurb: "Norwegian producer who popularized tropical house's marimba-led chill.",
    topTracks: [
      { title: "Firestone", genres: ["tropical"] },
      { title: "Stole the Show", genres: ["tropical"] },
      { title: "It Ain't Me", genres: ["tropical", "house"] },
      { title: "Stargazing", genres: ["tropical"] },
    ],
  },
  {
    id: "robin-schulz",
    name: "Robin Schulz",
    genres: ["tropical", "deep", "house"],
    blurb: "German DJ whose deep/tropical remixes were inescapable in the mid-2010s.",
    topTracks: [
      { title: "Prayer in C (Robin Schulz Remix)", genres: ["tropical", "deep"] },
      { title: "Sugar", genres: ["tropical", "house"] },
      { title: "Sun Goes Down", genres: ["tropical"] },
    ],
  },
  {
    id: "tiesto",
    name: "Tiësto",
    aka: ["tijs verwest", "tiesto", "dj tiesto"],
    genres: ["trance", "bigroom", "house", "prog"],
    blurb: "The godfather of trance turned festival and pop-house mainstay.",
    topTracks: [
      { title: "Adagio for Strings", genres: ["trance"] },
      { title: "Red Lights", genres: ["bigroom", "prog"] },
      { title: "The Business", genres: ["house", "tech"] },
      { title: "Secrets", genres: ["bigroom", "house"] },
      { title: "Wow", genres: ["bigroom"] },
    ],
  },

  // ── Tech house / deep / underground house ─────────────────────────────────
  {
    id: "fisher",
    name: "Fisher",
    aka: ["paul fisher"],
    genres: ["tech", "house"],
    blurb: "Australian ex-pro-surfer turned Grammy-nominated tech-house party-starter.",
    topTracks: [
      { title: "Losing It", genres: ["tech"] },
      { title: "You Little Beauty", genres: ["tech"] },
      { title: "Stop It", genres: ["tech"] },
      { title: "Just Feels Tight", genres: ["tech"] },
    ],
  },
  {
    id: "chris-lake",
    name: "Chris Lake",
    genres: ["tech", "basshouse", "house"],
    blurb: "British producer and Black Book boss bridging tech house and bass house.",
    topTracks: [
      { title: "Turn Off the Lights", genres: ["tech", "basshouse"] },
      { title: "Operator (Ring Ring)", genres: ["tech"] },
      { title: "Free Your Body", genres: ["tech", "house"] },
      { title: "I Want You", genres: ["tech"] },
    ],
  },
  {
    id: "john-summit",
    name: "John Summit",
    genres: ["tech", "house", "prog"],
    blurb: "Chicago accountant-turned-DJ who became tech house's loudest new headliner.",
    topTracks: [
      { title: "Deep End", genres: ["tech"] },
      { title: "La Danza", genres: ["tech"] },
      { title: "Where You Are", genres: ["prog", "house"] },
      { title: "Light Years", genres: ["prog", "house"] },
    ],
  },
  {
    id: "dom-dolla",
    name: "Dom Dolla",
    genres: ["tech", "house"],
    blurb: "Melbourne producer with a knack for radio-sized tech-house hooks.",
    topTracks: [
      { title: "San Frandisco", genres: ["tech"] },
      { title: "Take It", genres: ["tech", "house"] },
      { title: "Miracle Maker", genres: ["tech", "house"] },
      { title: "Pump the Brakes", genres: ["tech"] },
    ],
  },
  {
    id: "fred-again",
    name: "Fred again..",
    aka: ["fred again", "frederick gibson"],
    genres: ["house", "ukg", "deep"],
    blurb: "British producer turning voice-note intimacy into euphoric live house.",
    topTracks: [
      { title: "Turn On the Lights again.. (with Future)", genres: ["house"] },
      { title: "Delilah (pull me out of this)", genres: ["house", "ukg"] },
      { title: "Marea (we've lost dancing)", genres: ["house", "deep"] },
      { title: "Rumble", genres: ["ukg", "dubstep"] },
    ],
  },
  {
    id: "disclosure",
    name: "Disclosure",
    aka: ["guy lawrence", "howard lawrence"],
    genres: ["ukg", "deep", "house"],
    blurb: "Brotherly duo who carried UK garage and house back into the mainstream.",
    topTracks: [
      { title: "Latch", genres: ["ukg", "deep"] },
      { title: "White Noise", genres: ["ukg", "house"] },
      { title: "You & Me (Flume Remix)", genres: ["futurebass"] },
      { title: "When a Fire Starts to Burn", genres: ["house", "ukg"] },
    ],
  },
  {
    id: "duke-dumont",
    name: "Duke Dumont",
    genres: ["house", "deep", "ukg"],
    blurb: "British producer of warm, garage-tinged house chart-toppers.",
    topTracks: [
      { title: "Need U (100%)", genres: ["house", "deep"] },
      { title: "I Got U", genres: ["house", "deep"] },
      { title: "Ocean Drive", genres: ["house", "deep"] },
    ],
  },
  {
    id: "gorgon-city",
    name: "Gorgon City",
    genres: ["house", "deep", "ukg"],
    blurb: "London duo blending soulful house with UK garage swing.",
    topTracks: [
      { title: "Ready for Your Love", genres: ["house", "deep"] },
      { title: "Real", genres: ["house", "ukg"] },
      { title: "Imagination", genres: ["house", "deep"] },
    ],
  },
  {
    id: "mk",
    name: "MK",
    aka: ["marc kinchen"],
    genres: ["house", "deep", "ukg"],
    blurb: "Detroit house veteran whose dub edits defined a generation of remixes.",
    topTracks: [
      { title: "17", genres: ["house", "deep"] },
      { title: "Back & Forth", genres: ["house"] },
      { title: "Dior", genres: ["house", "ukg"] },
    ],
  },
  {
    id: "camelphat",
    name: "CamelPhat",
    genres: ["tech", "melodic", "house"],
    blurb: "Liverpool duo bridging peak-time tech house and melodic moodiness.",
    topTracks: [
      { title: "Cola", genres: ["tech", "house"] },
      { title: "Panic Room", genres: ["melodic", "tech"] },
      { title: "Breathe", genres: ["melodic", "tech"] },
    ],
  },
  {
    id: "meduza",
    name: "Meduza",
    genres: ["house", "prog", "tech"],
    blurb: "Italian trio behind a string of melodic, radio-ready house hits.",
    topTracks: [
      { title: "Piece of Your Heart", genres: ["house", "prog"] },
      { title: "Lose Control", genres: ["house", "prog"] },
      { title: "Paradise", genres: ["house", "prog"] },
    ],
  },
  {
    id: "purple-disco-machine",
    name: "Purple Disco Machine",
    aka: ["tino piontek"],
    genres: ["frenchhouse", "house", "deep"],
    blurb: "German producer reviving disco-house glitter for the modern dancefloor.",
    topTracks: [
      { title: "Hypnotized", genres: ["frenchhouse", "house"] },
      { title: "Fireworks", genres: ["frenchhouse"] },
      { title: "In the Dark", genres: ["frenchhouse", "house"] },
    ],
  },
  {
    id: "acraze",
    name: "ACRAZE",
    genres: ["tech", "basshouse", "house"],
    blurb: "US producer whose tech-house smash defined a viral dancefloor moment.",
    topTracks: [
      { title: "Do It To It", genres: ["tech", "basshouse"] },
      { title: "Believe", genres: ["tech"] },
    ],
  },
  {
    id: "vintage-culture",
    name: "Vintage Culture",
    aka: ["lukas ruiz"],
    genres: ["house", "prog", "tech"],
    blurb: "Brazil's biggest house export, equal parts melodic and main-stage.",
    topTracks: [
      { title: "Weak", genres: ["house", "prog"] },
      { title: "It Is What It Is", genres: ["house", "tech"] },
      { title: "Commotion", genres: ["prog", "house"] },
    ],
  },
  {
    id: "black-coffee",
    name: "Black Coffee",
    aka: ["nkosinathi maphumulo"],
    genres: ["deep", "house", "amapiano"],
    blurb: "South African pioneer of deep, Afro-rooted house played worldwide.",
    topTracks: [
      { title: "Drive", genres: ["deep", "house"] },
      { title: "SBCNCSLY", genres: ["deep", "house"] },
      { title: "We Dance Again", genres: ["deep", "house"] },
    ],
  },

  // ── Melodic house & techno ────────────────────────────────────────────────
  {
    id: "lane-8",
    name: "Lane 8",
    aka: ["daniel goldstein"],
    genres: ["melodic", "prog", "deep"],
    blurb: "This Never Happened founder defining warm, emotive melodic house.",
    topTracks: [
      { title: "Brightest Lights", genres: ["melodic", "prog"] },
      { title: "Atlas", genres: ["melodic", "prog"] },
      { title: "Road", genres: ["melodic", "deep"] },
    ],
  },
  {
    id: "ben-bohmer",
    name: "Ben Böhmer",
    aka: ["ben bohmer", "ben boehmer"],
    genres: ["melodic", "prog"],
    blurb: "German composer of cinematic, string-laced melodic house.",
    topTracks: [
      { title: "Beautiful Lies", genres: ["melodic", "prog"] },
      { title: "After Earth", genres: ["melodic", "prog"] },
      { title: "Breathing", genres: ["melodic"] },
    ],
  },
  {
    id: "anyma",
    name: "Anyma",
    aka: ["matteo milleri"],
    genres: ["melodic", "techno"],
    blurb: "Half of Tale Of Us, now a solo AV spectacle of melodic techno.",
    topTracks: [
      { title: "Eternity", genres: ["melodic", "techno"] },
      { title: "Consciousness", genres: ["melodic", "techno"] },
      { title: "Genesys", genres: ["melodic", "techno"] },
    ],
  },
  {
    id: "tale-of-us",
    name: "Tale Of Us",
    genres: ["melodic", "techno"],
    blurb: "Afterlife founders who codified the dark, emotive melodic-techno sound.",
    topTracks: [
      { title: "Dark Song", genres: ["melodic", "techno"] },
      { title: "Nova", genres: ["melodic", "techno"] },
      { title: "Time", genres: ["melodic", "techno"] },
    ],
  },
  {
    id: "artbat",
    name: "ARTBAT",
    genres: ["melodic", "techno", "prog"],
    blurb: "Ukrainian duo delivering big-room melodic techno with prog DNA.",
    topTracks: [
      { title: "Element", genres: ["melodic", "techno"] },
      { title: "Horizon", genres: ["melodic", "prog"] },
      { title: "Coronita", genres: ["melodic", "techno"] },
    ],
  },
  {
    id: "boris-brejcha",
    name: "Boris Brejcha",
    genres: ["techno", "melodic"],
    blurb: "Inventor of 'high-tech minimal,' instantly recognizable behind the joker mask.",
    topTracks: [
      { title: "Gravity", genres: ["techno", "melodic"] },
      { title: "Purple Noise", genres: ["techno", "melodic"] },
      { title: "Happiness", genres: ["techno"] },
    ],
  },

  // ── Future house / bass house ─────────────────────────────────────────────
  {
    id: "tchami",
    name: "Tchami",
    genres: ["futurehouse", "basshouse", "house"],
    blurb: "French producer credited with coining future house; Confession label boss.",
    topTracks: [
      { title: "After Life", genres: ["futurehouse"] },
      { title: "Promesses", genres: ["futurehouse", "house"] },
      { title: "Adieu", genres: ["futurehouse"] },
      { title: "Proud", genres: ["futurehouse", "basshouse"] },
    ],
  },
  {
    id: "oliver-heldens",
    name: "Oliver Heldens",
    aka: ["hi-lo", "hi lo"],
    genres: ["futurehouse", "tech", "house"],
    blurb: "Dutch producer who took future house mainstream, plus his HI-LO techno alias.",
    topTracks: [
      { title: "Gecko (Overdrive)", genres: ["futurehouse"] },
      { title: "Koala", genres: ["futurehouse"] },
      { title: "Last All Night (Koala)", genres: ["futurehouse", "house"] },
    ],
  },
  {
    id: "don-diablo",
    name: "Don Diablo",
    genres: ["futurehouse", "electrohouse"],
    blurb: "Dutch producer and Hexagon boss who championed future house's glossy side.",
    topTracks: [
      { title: "On My Mind", genres: ["futurehouse"] },
      { title: "Survive", genres: ["futurehouse"] },
      { title: "Universe", genres: ["futurehouse"] },
    ],
  },
  {
    id: "jauz",
    name: "Jauz",
    aka: ["sam vogel"],
    genres: ["basshouse", "dubstep", "futurehouse"],
    blurb: "US producer flipping between bass house and heavy dubstep at will.",
    topTracks: [
      { title: "Feel the Volume", genres: ["basshouse"] },
      { title: "Deeper Love", genres: ["basshouse"] },
      { title: "Rock the Party", genres: ["basshouse", "dubstep"] },
    ],
  },
  {
    id: "valentino-khan",
    name: "Valentino Khan",
    genres: ["basshouse", "trap", "house"],
    blurb: "LA producer with a heavy, percussive bass-house signature.",
    topTracks: [
      { title: "Deep Down Low", genres: ["basshouse"] },
      { title: "Pump", genres: ["basshouse", "house"] },
    ],
  },

  // ── Trance ────────────────────────────────────────────────────────────────
  {
    id: "armin-van-buuren",
    name: "Armin van Buuren",
    aka: ["armin"],
    genres: ["trance", "prog", "psytrance"],
    blurb: "A State of Trance host and five-time DJ Mag #1, trance's tireless ambassador.",
    topTracks: [
      { title: "This Is What It Feels Like", genres: ["trance"] },
      { title: "In and Out of Love", genres: ["trance"] },
      { title: "Blah Blah Blah", genres: ["bigroom", "trance"] },
      { title: "Communication", genres: ["trance"] },
    ],
  },
  {
    id: "above-and-beyond",
    name: "Above & Beyond",
    aka: ["above beyond"],
    genres: ["trance", "prog"],
    blurb: "Anjunabeats trio whose 'trance family' built a devoted global community.",
    topTracks: [
      { title: "Sun & Moon", genres: ["trance"] },
      { title: "We're All We Need", genres: ["trance", "prog"] },
      { title: "Thing Called Love", genres: ["trance"] },
    ],
  },
  {
    id: "paul-van-dyk",
    name: "Paul van Dyk",
    aka: ["pvd"],
    genres: ["trance"],
    blurb: "German trance pioneer and one of the genre's most decorated DJs.",
    topTracks: [
      { title: "For an Angel", genres: ["trance"] },
      { title: "We Are Alive", genres: ["trance"] },
      { title: "Nothing but You", genres: ["trance"] },
    ],
  },
  {
    id: "ferry-corsten",
    name: "Ferry Corsten",
    aka: ["system f", "gouryella"],
    genres: ["trance", "psytrance"],
    blurb: "Dutch trance institution behind Gouryella and System F.",
    topTracks: [
      { title: "Punk", genres: ["trance"] },
      { title: "Beautiful", genres: ["trance"] },
      { title: "Gouryella", genres: ["trance"] },
    ],
  },
  {
    id: "gareth-emery",
    name: "Gareth Emery",
    genres: ["trance", "prog"],
    blurb: "British producer of vocal, emotive trance and the CVNT5 alt-project.",
    topTracks: [
      { title: "Concrete Angel", genres: ["trance"] },
      { title: "Sanctuary", genres: ["trance"] },
      { title: "Saving Light", genres: ["trance", "prog"] },
    ],
  },
  {
    id: "atb",
    name: "ATB",
    aka: ["andre tanneberger"],
    genres: ["trance", "prog"],
    blurb: "German producer whose guitar-trance crossover defined an era.",
    topTracks: [
      { title: "9 PM (Till I Come)", genres: ["trance"] },
      { title: "Ecstasy", genres: ["trance"] },
      { title: "Your Love (9PM)", genres: ["trance", "prog"] },
    ],
  },

  // ── Techno ────────────────────────────────────────────────────────────────
  {
    id: "charlotte-de-witte",
    name: "Charlotte de Witte",
    aka: ["raving george"],
    genres: ["techno"],
    blurb: "Belgian KNTXT boss leading the hard, stripped-back techno revival.",
    topTracks: [
      { title: "Doppler", genres: ["techno"] },
      { title: "Formula", genres: ["techno"] },
      { title: "Sgadi Li Mi", genres: ["techno"] },
    ],
  },
  {
    id: "amelie-lens",
    name: "Amelie Lens",
    genres: ["techno"],
    blurb: "Belgian techno star and Lenske founder with a relentless, hypnotic pulse.",
    topTracks: [
      { title: "Higher", genres: ["techno"] },
      { title: "In My Mind", genres: ["techno"] },
      { title: "Contradiction", genres: ["techno"] },
    ],
  },
  {
    id: "adam-beyer",
    name: "Adam Beyer",
    genres: ["techno", "tech"],
    blurb: "Swedish Drumcode founder, a cornerstone of modern peak-time techno.",
    topTracks: [
      { title: "Your Mind", genres: ["techno"] },
      { title: "Teach Me", genres: ["techno"] },
      { title: "Space Date", genres: ["techno"] },
    ],
  },
  {
    id: "carl-cox",
    name: "Carl Cox",
    genres: ["techno", "tech", "house"],
    blurb: "The genial heavyweight champion of techno, a three-deck legend.",
    topTracks: [
      { title: "I Want You (Forever)", genres: ["techno"] },
      { title: "Phuture 2000", genres: ["techno"] },
      { title: "Time for House Music", genres: ["house", "tech"] },
    ],
  },
  {
    id: "nina-kraviz",
    name: "Nina Kraviz",
    genres: ["techno", "acidhouse"],
    blurb: "Russian DJ and трип founder known for raw, acid-tinged techno sets.",
    topTracks: [
      { title: "Ghetto Kraviz", genres: ["techno", "acidhouse"] },
      { title: "Skyscrapers", genres: ["techno"] },
    ],
  },
  {
    id: "maceo-plex",
    name: "Maceo Plex",
    aka: ["maetrik", "eric estornel"],
    genres: ["techno", "melodic", "tech"],
    blurb: "US producer fusing Detroit techno, electro, and melodic groove.",
    topTracks: [
      { title: "Solar Detroit", genres: ["techno"] },
      { title: "Mutant Disco", genres: ["techno", "melodic"] },
      { title: "Conjure Superstar", genres: ["techno"] },
    ],
  },

  // ── Psytrance ─────────────────────────────────────────────────────────────
  {
    id: "infected-mushroom",
    name: "Infected Mushroom",
    genres: ["psytrance"],
    blurb: "Israeli duo who pushed psytrance toward rock-tinged, maximalist heights.",
    topTracks: [
      { title: "Becoming Insane", genres: ["psytrance"] },
      { title: "The Pretender", genres: ["psytrance"] },
      { title: "Vicious Delicious", genres: ["psytrance"] },
    ],
  },
  {
    id: "vini-vici",
    name: "Vini Vici",
    genres: ["psytrance", "trance"],
    blurb: "Israeli duo who dragged psytrance onto the main festival stages.",
    topTracks: [
      { title: "The Tribe", genres: ["psytrance"] },
      { title: "Great Spirit", genres: ["psytrance", "bigroom"] },
      { title: "Universe Inside Me", genres: ["psytrance"] },
    ],
  },
  {
    id: "astrix",
    name: "Astrix",
    aka: ["avi shmailov"],
    genres: ["psytrance"],
    blurb: "Israeli full-on psytrance figurehead with a melodic, driving sound.",
    topTracks: [
      { title: "Deep Jungle Walk", genres: ["psytrance"] },
      { title: "Type 5", genres: ["psytrance"] },
      { title: "He.art", genres: ["psytrance"] },
    ],
  },

  // ── Big beat / breaks ─────────────────────────────────────────────────────
  {
    id: "the-chemical-brothers",
    name: "The Chemical Brothers",
    genres: ["bigbeat", "electrohouse"],
    blurb: "British duo who turned big beat into stadium-sized psychedelic dance.",
    topTracks: [
      { title: "Block Rockin' Beats", genres: ["bigbeat"] },
      { title: "Hey Boy Hey Girl", genres: ["bigbeat", "house"] },
      { title: "Galvanize", genres: ["bigbeat"] },
      { title: "Go", genres: ["bigbeat"] },
    ],
  },
  {
    id: "the-prodigy",
    name: "The Prodigy",
    genres: ["bigbeat", "gabber"],
    blurb: "The incendiary British act that fused rave, breaks, and punk attitude.",
    topTracks: [
      { title: "Firestarter", genres: ["bigbeat"] },
      { title: "Breathe", genres: ["bigbeat"] },
      { title: "Smack My Bitch Up", genres: ["bigbeat"] },
      { title: "Omen", genres: ["bigbeat"] },
    ],
  },
  {
    id: "fatboy-slim",
    name: "Fatboy Slim",
    aka: ["norman cook"],
    genres: ["bigbeat", "house"],
    blurb: "The grinning king of big beat and one of dance music's great showmen.",
    topTracks: [
      { title: "Praise You", genres: ["bigbeat"] },
      { title: "The Rockafeller Skank", genres: ["bigbeat"] },
      { title: "Right Here, Right Now", genres: ["bigbeat"] },
    ],
  },

  // ── Drum & bass / jungle ──────────────────────────────────────────────────
  {
    id: "pendulum",
    name: "Pendulum",
    genres: ["dnb", "dubstep"],
    blurb: "Australian crew who fused drum & bass with rock for arena-sized energy.",
    topTracks: [
      { title: "Watercolour", genres: ["dnb"] },
      { title: "Propane Nightmares", genres: ["dnb"] },
      { title: "The Island", genres: ["dnb"] },
      { title: "Witchcraft", genres: ["dnb"] },
    ],
  },
  {
    id: "netsky",
    name: "Netsky",
    aka: ["boris daenen"],
    genres: ["dnb"],
    blurb: "Belgian producer of bright, melodic liquid drum & bass.",
    topTracks: [
      { title: "Rio", genres: ["dnb"] },
      { title: "Come Alive", genres: ["dnb"] },
      { title: "Work It Out", genres: ["dnb"] },
    ],
  },
  {
    id: "sub-focus",
    name: "Sub Focus",
    aka: ["nick douwma"],
    genres: ["dnb"],
    blurb: "British producer of polished, festival-ready drum & bass.",
    topTracks: [
      { title: "Turn Back Time", genres: ["dnb"] },
      { title: "Tidal Wave", genres: ["dnb"] },
      { title: "Could This Be Real", genres: ["dnb"] },
    ],
  },
  {
    id: "chase-and-status",
    name: "Chase & Status",
    aka: ["chase status"],
    genres: ["dnb", "ukg", "dubstep"],
    blurb: "British duo spanning drum & bass, garage, and bass-heavy crossover.",
    topTracks: [
      { title: "Blind Faith", genres: ["dnb"] },
      { title: "End Credits", genres: ["dnb"] },
      { title: "Baddadan", genres: ["dnb", "jungle"] },
    ],
  },
  {
    id: "wilkinson",
    name: "Wilkinson",
    genres: ["dnb"],
    blurb: "British producer of euphoric, vocal-led liquid drum & bass.",
    topTracks: [
      { title: "Afterglow", genres: ["dnb"] },
      { title: "Sweet Lies", genres: ["dnb"] },
    ],
  },
  {
    id: "andy-c",
    name: "Andy C",
    genres: ["dnb"],
    blurb: "The 'Executioner' of drum & bass and RAM Records founder.",
    topTracks: [
      { title: "Heartbeat Loud", genres: ["dnb"] },
      { title: "What Bass", genres: ["dnb"] },
    ],
  },
  {
    id: "goldie",
    name: "Goldie",
    genres: ["dnb", "jungle"],
    blurb: "Metalheadz founder whose Timeless is a drum & bass landmark.",
    topTracks: [
      { title: "Inner City Life", genres: ["dnb", "jungle"] },
      { title: "Timeless", genres: ["dnb"] },
    ],
  },
  {
    id: "roni-size",
    name: "Roni Size",
    aka: ["reprazent"],
    genres: ["dnb", "jungle"],
    blurb: "Bristol pioneer whose New Forms won the Mercury Prize for jungle/d&b.",
    topTracks: [
      { title: "Brown Paper Bag", genres: ["dnb"] },
      { title: "Watching Windows", genres: ["dnb"] },
    ],
  },
  {
    id: "nia-archives",
    name: "Nia Archives",
    genres: ["jungle", "dnb"],
    blurb: "Leeds producer leading the new wave of soulful jungle.",
    topTracks: [
      { title: "Baianá", genres: ["jungle", "dnb"] },
      { title: "So Tell Me...", genres: ["jungle"] },
      { title: "Off Wiv Ya Headz", genres: ["jungle"] },
    ],
  },

  // ── UK garage / future garage ─────────────────────────────────────────────
  {
    id: "burial",
    name: "Burial",
    aka: ["william bevan"],
    genres: ["ukg", "dubstep"],
    blurb: "Reclusive South London auteur of haunted, rain-soaked future garage.",
    topTracks: [
      { title: "Archangel", genres: ["ukg", "dubstep"] },
      { title: "Untrue", genres: ["ukg"] },
      { title: "Ghost Hardware", genres: ["ukg", "dubstep"] },
    ],
  },
  {
    id: "overmono",
    name: "Overmono",
    genres: ["ukg", "dnb", "house"],
    blurb: "Welsh brothers fusing garage, breaks, and rave nostalgia.",
    topTracks: [
      { title: "So U Kno", genres: ["ukg", "house"] },
      { title: "Is U", genres: ["ukg"] },
      { title: "Gunk", genres: ["ukg", "dnb"] },
    ],
  },
  {
    id: "interplanetary-criminal",
    name: "Interplanetary Criminal",
    genres: ["ukg"],
    blurb: "UK producer at the center of garage's recent resurgence.",
    topTracks: [
      { title: "B.O.T.A. (Baddest of Them All)", genres: ["ukg"] },
      { title: "Tell Me", genres: ["ukg"] },
    ],
  },

  // ── Dubstep / riddim / bass ───────────────────────────────────────────────
  {
    id: "skrillex",
    name: "Skrillex",
    aka: ["sonny moore"],
    genres: ["dubstep", "trap", "futurebass"],
    blurb: "The face of US dubstep who reshaped 2010s bass music and pop production.",
    topTracks: [
      { title: "Scary Monsters and Nice Sprites", genres: ["dubstep"] },
      { title: "Bangarang", genres: ["dubstep", "trap"] },
      { title: "First of the Year (Equinox)", genres: ["dubstep"] },
      { title: "Rumble", genres: ["dubstep", "ukg"] },
    ],
  },
  {
    id: "excision",
    name: "Excision",
    aka: ["jeff abel"],
    genres: ["dubstep"],
    blurb: "Canadian bass behemoth and Lost Lands founder, the loudest in the room.",
    topTracks: [
      { title: "The Paradox", genres: ["dubstep"] },
      { title: "Throwin' Elbows", genres: ["dubstep"] },
      { title: "Robo Kitty", genres: ["dubstep"] },
    ],
  },
  {
    id: "subtronics",
    name: "Subtronics",
    aka: ["jesse kardon"],
    genres: ["dubstep"],
    blurb: "Philadelphia producer pushing riddim and tearout dubstep to cartoonish extremes.",
    topTracks: [
      { title: "Griztronics", genres: ["dubstep", "glitchhop"] },
      { title: "Scott Pilgrim", genres: ["dubstep"] },
      { title: "Antifragile", genres: ["dubstep"] },
    ],
  },
  {
    id: "zomboy",
    name: "Zomboy",
    aka: ["joshua mellody"],
    genres: ["dubstep"],
    blurb: "British producer of cinematic, hard-hitting dubstep drops.",
    topTracks: [
      { title: "Nuclear (Hands Up)", genres: ["dubstep"] },
      { title: "Terror Squad", genres: ["dubstep"] },
    ],
  },
  {
    id: "flux-pavilion",
    name: "Flux Pavilion",
    aka: ["joshua steele"],
    genres: ["dubstep"],
    blurb: "British producer of the era-defining 'Bass Cannon' and Circus Records co-founder.",
    topTracks: [
      { title: "Bass Cannon", genres: ["dubstep"] },
      { title: "I Can't Stop", genres: ["dubstep"] },
    ],
  },
  {
    id: "knife-party",
    name: "Knife Party",
    genres: ["dubstep", "electrohouse", "basshouse"],
    blurb: "Pendulum's Rob Swire and Gareth McGrillen gone gleefully heavy and electro.",
    topTracks: [
      { title: "Internet Friends", genres: ["dubstep", "electrohouse"] },
      { title: "Bonfire", genres: ["electrohouse", "dubstep"] },
      { title: "Centipede", genres: ["dubstep"] },
    ],
  },
  {
    id: "zeds-dead",
    name: "Zeds Dead",
    genres: ["dubstep", "dnb", "glitchhop"],
    blurb: "Canadian duo ranging across dubstep, drum & bass, and everything bassy.",
    topTracks: [
      { title: "Collapse", genres: ["dubstep"] },
      { title: "Hadouken", genres: ["dubstep"] },
      { title: "Eyes on Fire (Remix)", genres: ["dubstep"] },
    ],
  },
  {
    id: "nero",
    name: "Nero",
    genres: ["dubstep", "dnb"],
    blurb: "British trio fusing dubstep and drum & bass with cinematic, vocal pop.",
    topTracks: [
      { title: "Promises", genres: ["dubstep"] },
      { title: "Me & You", genres: ["dubstep"] },
      { title: "Crush on You", genres: ["dubstep", "dnb"] },
    ],
  },

  // ── Melodic dubstep / future bass / electronic-pop ────────────────────────
  {
    id: "illenium",
    name: "Illenium",
    aka: ["nick miller"],
    genres: ["meldubstep", "futurebass", "dubstep"],
    blurb: "Denver producer who built an arena career on emotive melodic dubstep.",
    topTracks: [
      { title: "Good Things Fall Apart", genres: ["meldubstep", "futurebass"] },
      { title: "Take You Down", genres: ["meldubstep"] },
      { title: "Crawl Outta Love", genres: ["meldubstep", "futurebass"] },
      { title: "Beautiful Creatures", genres: ["meldubstep"] },
    ],
  },
  {
    id: "seven-lions",
    name: "Seven Lions",
    aka: ["jeff montalvo"],
    genres: ["meldubstep", "melodic", "trance"],
    blurb: "US producer blending trance euphoria with melodic dubstep weight.",
    topTracks: [
      { title: "Strangers", genres: ["meldubstep", "trance"] },
      { title: "Rush Over Me", genres: ["meldubstep", "trance"] },
      { title: "Days to Come", genres: ["meldubstep"] },
    ],
  },
  {
    id: "said-the-sky",
    name: "Said the Sky",
    aka: ["trevor christensen"],
    genres: ["meldubstep", "futurebass"],
    blurb: "Colorado producer of pretty, piano-led melodic bass.",
    topTracks: [
      { title: "Faith", genres: ["meldubstep"] },
      { title: "Walk Me Home", genres: ["meldubstep", "futurebass"] },
    ],
  },
  {
    id: "flume",
    name: "Flume",
    aka: ["harley streten"],
    genres: ["futurebass", "glitchhop"],
    blurb: "Australian producer who basically invented modern future bass.",
    topTracks: [
      { title: "Never Be Like You", genres: ["futurebass"] },
      { title: "Say It", genres: ["futurebass"] },
      { title: "Rushing Back", genres: ["futurebass"] },
      { title: "Holdin On", genres: ["futurebass", "glitchhop"] },
    ],
  },
  {
    id: "odesza",
    name: "ODESZA",
    genres: ["futurebass", "melodic"],
    blurb: "Seattle duo whose anthemic, drumline-driven sound fills amphitheaters.",
    topTracks: [
      { title: "Say My Name", genres: ["futurebass"] },
      { title: "Sun Models", genres: ["futurebass"] },
      { title: "A Moment Apart", genres: ["futurebass", "melodic"] },
      { title: "Line of Sight", genres: ["futurebass"] },
    ],
  },
  {
    id: "porter-robinson",
    name: "Porter Robinson",
    genres: ["futurebass", "electrohouse", "synthwave"],
    blurb: "US producer who turned maximal electro into deeply personal electronic-pop.",
    topTracks: [
      { title: "Language", genres: ["electrohouse", "prog"] },
      { title: "Shelter", genres: ["futurebass"] },
      { title: "Sad Machine", genres: ["futurebass"] },
      { title: "Look at the Sky", genres: ["synthwave", "futurebass"] },
    ],
  },
  {
    id: "madeon",
    name: "Madeon",
    aka: ["hugo leclercq"],
    genres: ["electrohouse", "futurebass", "prog"],
    blurb: "French prodigy of bright, melodic electro and pop-leaning dance.",
    topTracks: [
      { title: "Pop Culture", genres: ["electrohouse"] },
      { title: "Shelter", genres: ["futurebass"] },
      { title: "All My Friends", genres: ["futurebass", "electrohouse"] },
    ],
  },
  {
    id: "marshmello",
    name: "Marshmello",
    genres: ["futurebass", "trap", "bigroom"],
    blurb: "Masked producer who turned future bass and trap into chart-topping pop.",
    topTracks: [
      { title: "Alone", genres: ["futurebass"] },
      { title: "Silence", genres: ["futurebass"] },
      { title: "Happier", genres: ["futurebass"] },
      { title: "Friends", genres: ["futurebass", "bigroom"] },
    ],
  },
  {
    id: "gryffin",
    name: "Gryffin",
    aka: ["dan griffith"],
    genres: ["futurebass", "prog", "house"],
    blurb: "LA producer of melodic, guitar-tinged festival pop.",
    topTracks: [
      { title: "Tie Me Down", genres: ["futurebass"] },
      { title: "OMG", genres: ["futurebass", "prog"] },
    ],
  },
  {
    id: "san-holo",
    name: "San Holo",
    genres: ["futurebass", "glitchhop"],
    blurb: "Dutch producer pairing guitar melodies with melodic future bass.",
    topTracks: [
      { title: "Light", genres: ["futurebass"] },
      { title: "We Rise", genres: ["futurebass"] },
    ],
  },
  {
    id: "louis-the-child",
    name: "Louis The Child",
    genres: ["futurebass", "house"],
    blurb: "Chicago duo of feel-good, melodic future bass and pop.",
    topTracks: [
      { title: "It's Strange", genres: ["futurebass"] },
      { title: "Better Not", genres: ["futurebass", "house"] },
    ],
  },

  // ── Glitch hop / midtempo / experimental bass ─────────────────────────────
  {
    id: "rezz",
    name: "REZZ",
    aka: ["isabelle rezazadeh"],
    genres: ["glitchhop", "dubstep", "techno"],
    blurb: "Canadian 'Space Mom' of hypnotic, midtempo bass under spinning goggles.",
    topTracks: [
      { title: "Edge", genres: ["glitchhop"] },
      { title: "Hex", genres: ["glitchhop", "techno"] },
      { title: "Falling", genres: ["glitchhop", "dubstep"] },
    ],
  },
  {
    id: "griz",
    name: "GRiZ",
    aka: ["grant kwiecinski"],
    genres: ["glitchhop"],
    blurb: "Detroit producer-saxophonist blending funk, soul, and glitch hop.",
    topTracks: [
      { title: "Smoke", genres: ["glitchhop"] },
      { title: "The Anthem", genres: ["glitchhop"] },
    ],
  },
  {
    id: "pretty-lights",
    name: "Pretty Lights",
    aka: ["derek vincent smith"],
    genres: ["glitchhop"],
    blurb: "US producer of soulful, sample-rich electro-soul and glitch hop.",
    topTracks: [
      { title: "Finally Moving", genres: ["glitchhop"] },
      { title: "Lost and Found", genres: ["glitchhop"] },
    ],
  },
  {
    id: "big-gigantic",
    name: "Big Gigantic",
    genres: ["glitchhop"],
    blurb: "Colorado duo of sax-and-drums live electronic funk and glitch hop.",
    topTracks: [
      { title: "The Little Things", genres: ["glitchhop"] },
      { title: "C'mon", genres: ["glitchhop"] },
    ],
  },

  // ── Trap (EDM) ────────────────────────────────────────────────────────────
  {
    id: "rl-grime",
    name: "RL Grime",
    aka: ["henry steinway"],
    genres: ["trap", "dubstep"],
    blurb: "LA producer who defined festival trap and the NOVA era.",
    topTracks: [
      { title: "Core", genres: ["trap"] },
      { title: "UCLA", genres: ["trap"] },
      { title: "Tell Me", genres: ["trap"] },
    ],
  },
  {
    id: "baauer",
    name: "Baauer",
    genres: ["trap"],
    blurb: "US producer of the viral 'Harlem Shake' and adventurous club trap.",
    topTracks: [
      { title: "Harlem Shake", genres: ["trap"] },
      { title: "Day Ones", genres: ["trap"] },
    ],
  },
  {
    id: "what-so-not",
    name: "What So Not",
    aka: ["chris emerson"],
    genres: ["trap", "futurebass"],
    blurb: "Australian producer of moody, melodic trap and future bass.",
    topTracks: [
      { title: "High You Are", genres: ["trap"] },
      { title: "Gemini", genres: ["trap", "futurebass"] },
    ],
  },

  // ── Festival/EDM crossover, hard ──────────────────────────────────────────
  {
    id: "showtek",
    name: "Showtek",
    genres: ["bigroom", "hardstyle", "electrohouse"],
    blurb: "Dutch brothers who crossed from hardstyle roots into big-room hits.",
    topTracks: [
      { title: "Booyah", genres: ["bigroom"] },
      { title: "Bad", genres: ["bigroom", "electrohouse"] },
      { title: "Cannonball (Earthquake)", genres: ["bigroom"] },
    ],
  },

  // ── Hardstyle / hardcore / happy hardcore ─────────────────────────────────
  {
    id: "headhunterz",
    name: "Headhunterz",
    aka: ["willem rebergen"],
    genres: ["hardstyle"],
    blurb: "Dutch artist long regarded as the face of euphoric hardstyle.",
    topTracks: [
      { title: "Dragonborn", genres: ["hardstyle"] },
      { title: "Psychedelic", genres: ["hardstyle"] },
      { title: "The Power of the Mind", genres: ["hardstyle"] },
    ],
  },
  {
    id: "da-tweekaz",
    name: "Da Tweekaz",
    genres: ["hardstyle"],
    blurb: "Norwegian duo known for anthemic, often playful euphoric hardstyle.",
    topTracks: [
      { title: "Tikbalang", genres: ["hardstyle"] },
      { title: "Frozen", genres: ["hardstyle"] },
      { title: "Break the Spell", genres: ["hardstyle"] },
    ],
  },
  {
    id: "brennan-heart",
    name: "Brennan Heart",
    aka: ["fabian bohn"],
    genres: ["hardstyle"],
    blurb: "Dutch hardstyle veteran and WE R boss with a melodic edge.",
    topTracks: [
      { title: "Imaginary", genres: ["hardstyle"] },
      { title: "Lose My Mind", genres: ["hardstyle"] },
    ],
  },
  {
    id: "wildstylez",
    name: "Wildstylez",
    aka: ["joram metekohy"],
    genres: ["hardstyle"],
    blurb: "Dutch producer of soaring, melodic main-stage hardstyle.",
    topTracks: [
      { title: "Year of Summer", genres: ["hardstyle"] },
      { title: "Lies or Truth", genres: ["hardstyle"] },
    ],
  },
  {
    id: "angerfist",
    name: "Angerfist",
    aka: ["danny masseling"],
    genres: ["gabber"],
    blurb: "Masked Dutch icon at the brutal end of hardcore/gabber.",
    topTracks: [
      { title: "Raise & Revolt", genres: ["gabber"] },
      { title: "Incoming!", genres: ["gabber"] },
    ],
  },
  {
    id: "darren-styles",
    name: "Darren Styles",
    genres: ["happyhardcore", "hardstyle"],
    blurb: "British figurehead of UK hardcore and happy hardcore.",
    topTracks: [
      { title: "Save Me", genres: ["happyhardcore"] },
      { title: "Us Against the World", genres: ["happyhardcore"] },
    ],
  },
  {
    id: "gammer",
    name: "Gammer",
    genres: ["happyhardcore", "hardstyle"],
    blurb: "UK hardcore producer who broke through to the US festival circuit.",
    topTracks: [
      { title: "The Drop", genres: ["happyhardcore"] },
      { title: "Hi5", genres: ["happyhardcore"] },
    ],
  },
  {
    id: "s3rl",
    name: "S3RL",
    genres: ["happyhardcore"],
    blurb: "Australian producer of hyper, vocal-driven happy hardcore.",
    topTracks: [
      { title: "Pretty Rave Girl", genres: ["happyhardcore"] },
      { title: "MTC", genres: ["happyhardcore"] },
    ],
  },

  // ── Moombahton / global / trap-adjacent ───────────────────────────────────
  {
    id: "major-lazer",
    name: "Major Lazer",
    genres: ["moombahton", "trap", "house"],
    blurb: "Diplo's genre-hopping crew that took dancehall-EDM global.",
    topTracks: [
      { title: "Lean On", genres: ["moombahton", "trap"] },
      { title: "Light It Up", genres: ["moombahton"] },
      { title: "Cold Water", genres: ["moombahton"] },
      { title: "Run Up", genres: ["moombahton", "trap"] },
    ],
  },
  {
    id: "diplo",
    name: "Diplo",
    aka: ["thomas wesley pentz"],
    genres: ["moombahton", "trap", "house"],
    blurb: "Mad Decent founder and serial collaborator across every dance subgenre.",
    topTracks: [
      { title: "Revolution", genres: ["bigroom", "moombahton"] },
      { title: "Be Right There", genres: ["house", "moombahton"] },
      { title: "Get It Right", genres: ["moombahton"] },
    ],
  },
  {
    id: "dj-snake",
    name: "DJ Snake",
    aka: ["william grigahcine"],
    genres: ["trap", "moombahton", "bigroom"],
    blurb: "French producer behind some of the biggest crossover EDM-trap hits.",
    topTracks: [
      { title: "Turn Down for What", genres: ["trap"] },
      { title: "Lean On", genres: ["moombahton", "trap"] },
      { title: "Taki Taki", genres: ["moombahton", "trap"] },
      { title: "Let Me Love You", genres: ["futurebass", "trap"] },
    ],
  },
  {
    id: "dillon-francis",
    name: "Dillon Francis",
    genres: ["moombahton", "trap", "basshouse"],
    blurb: "LA producer-comedian who championed moombahton's bouncy swing.",
    topTracks: [
      { title: "Get Low", genres: ["moombahton", "trap"] },
      { title: "Hey", genres: ["moombahton"] },
      { title: "Need You", genres: ["moombahton", "house"] },
    ],
  },

  // ── Phonk ─────────────────────────────────────────────────────────────────
  {
    id: "kordhell",
    name: "Kordhell",
    genres: ["phonk"],
    blurb: "Producer at the front of phonk's viral, drift-soundtrack wave.",
    topTracks: [
      { title: "Murder in My Mind", genres: ["phonk"] },
      { title: "Lifestyle", genres: ["phonk"] },
    ],
  },
  {
    id: "dvrst",
    name: "DVRST",
    genres: ["phonk"],
    blurb: "Russian producer of one of drift phonk's defining anthems.",
    topTracks: [
      { title: "Close Eyes", genres: ["phonk"] },
      { title: "Phonky Town", genres: ["phonk"] },
    ],
  },
  {
    id: "ghostface-playa",
    name: "Ghostface Playa",
    genres: ["phonk"],
    blurb: "Phonk producer whose 'Why Not' became a meme-era staple.",
    topTracks: [
      { title: "Why Not", genres: ["phonk"] },
      { title: "Stop Playing", genres: ["phonk"] },
    ],
  },

  // ── Amapiano ──────────────────────────────────────────────────────────────
  {
    id: "kabza-de-small",
    name: "Kabza De Small",
    genres: ["amapiano", "deep"],
    blurb: "The 'King of Amapiano,' central to the genre's South African rise.",
    topTracks: [
      { title: "Sponono", genres: ["amapiano"] },
      { title: "Asibe Happy", genres: ["amapiano"] },
    ],
  },
  {
    id: "dj-maphorisa",
    name: "DJ Maphorisa",
    genres: ["amapiano", "house"],
    blurb: "Prolific South African producer driving amapiano's global spread.",
    topTracks: [
      { title: "Izolo", genres: ["amapiano"] },
      { title: "Banyana", genres: ["amapiano"] },
    ],
  },
  {
    id: "uncle-waffles",
    name: "Uncle Waffles",
    genres: ["amapiano"],
    blurb: "Eswatini-born DJ who became amapiano's breakout global star.",
    topTracks: [
      { title: "Tanzania", genres: ["amapiano"] },
      { title: "Yahyuppiyah", genres: ["amapiano"] },
    ],
  },

  // ── Synthwave / retrowave ─────────────────────────────────────────────────
  {
    id: "the-midnight",
    name: "The Midnight",
    genres: ["synthwave"],
    blurb: "US-Danish duo of nostalgic, saxophone-laced synthwave.",
    topTracks: [
      { title: "Sunset", genres: ["synthwave"] },
      { title: "Days of Thunder", genres: ["synthwave"] },
      { title: "Vampires", genres: ["synthwave"] },
    ],
  },
  {
    id: "kavinsky",
    name: "Kavinsky",
    aka: ["vincent belorgey"],
    genres: ["synthwave", "frenchhouse"],
    blurb: "French artist whose 'Nightcall' became the synthwave anthem via Drive.",
    topTracks: [
      { title: "Nightcall", genres: ["synthwave"] },
      { title: "Odd Look", genres: ["synthwave"] },
    ],
  },
  {
    id: "carpenter-brut",
    name: "Carpenter Brut",
    genres: ["synthwave"],
    blurb: "French producer of aggressive, horror-tinged darksynth.",
    topTracks: [
      { title: "Turbo Killer", genres: ["synthwave"] },
      { title: "Le Perv", genres: ["synthwave"] },
    ],
  },
  {
    id: "perturbator",
    name: "Perturbator",
    aka: ["james kent"],
    genres: ["synthwave"],
    blurb: "French darksynth figurehead with a cyberpunk, metal-adjacent edge.",
    topTracks: [
      { title: "Future Club", genres: ["synthwave"] },
      { title: "Sentient", genres: ["synthwave"] },
    ],
  },
  {
    id: "gunship",
    name: "GUNSHIP",
    genres: ["synthwave"],
    blurb: "British synthwave act of cinematic, vocal-driven retro-futurism.",
    topTracks: [
      { title: "Tech Noir", genres: ["synthwave"] },
      { title: "Dark All Day", genres: ["synthwave"] },
    ],
  },

  // ── Acid house / classic ──────────────────────────────────────────────────
  {
    id: "green-velvet",
    name: "Green Velvet",
    aka: ["cajmere", "curtis jones"],
    genres: ["tech", "acidhouse", "techno"],
    blurb: "Chicago house institution behind 'La La Land' and countless club staples.",
    topTracks: [
      { title: "La La Land", genres: ["tech", "acidhouse"] },
      { title: "Flash", genres: ["acidhouse", "techno"] },
      { title: "Bigger Than Prince", genres: ["tech"] },
    ],
  },
];
