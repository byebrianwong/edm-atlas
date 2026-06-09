/**
 * Additional example tracks per genre, beyond the two classics in genres.ts.
 *
 * Curation rules:
 *  - An artist usually leads at most one track per genre, but may lead two when
 *    both are standout, very popular tracks in that genre. The same artist may
 *    also reappear as a secondary/featured credit, and may lead in other genres.
 *  - The biggest, most representative artists for each genre are included, with
 *    room for essential deep cuts. Popular genres run long (10+ tracks).
 *  - `recent` flags 2023+ releases; the detail panel groups "Hear it" vs
 *    "Recent tracks".
 *
 * Resolved Spotify IDs live in spotifyIds.ts, aligned to the combined order
 * (genres.ts examples first, then these). Regenerate IDs with
 * scripts/resolve-spotify.ts (official Spotify Web API).
 */

export type ExtraTrack = { artist: string; title: string; recent?: boolean };

export const MORE_EXAMPLES: Record<string, ExtraTrack[]> = {
  // ---------- House ----------
  house: [
    { artist: "Robin S", title: "Show Me Love" },
    { artist: "Crystal Waters", title: "Gypsy Woman (She's Homeless)" },
    { artist: "Inner City", title: "Good Life" },
    { artist: "MK", title: "17" },
    { artist: "Disclosure", title: "Latch" },
    { artist: "Fred again.. & Obongjayar", title: "adore u", recent: true },
    { artist: "Disco Lines", title: "Baby Girl", recent: true },
    { artist: "John Summit & Hayla", title: "Where You Are", recent: true },
  ],
  tech: [
    { artist: "CamelPhat & Elderbrook", title: "Cola" },
    { artist: "James Hype & Miggy Dela Rosa", title: "Ferrari" },
    { artist: "ACRAZE", title: "Do It To It" },
    { artist: "Green Velvet", title: "La La Land" },
    { artist: "John Summit", title: "Deep End" },
    { artist: "Mau P", title: "Gimme That Bounce", recent: true },
    { artist: "Cloonee & Young M.A", title: "Stephanie", recent: true },
    { artist: "Dom Dolla", title: "Saving Up", recent: true },
    { artist: "Dom Dolla & Nelly Furtado", title: "Eat Your Man", recent: true },
  ],
  deep: [
    { artist: "Maya Jane Coles", title: "What They Say" },
    { artist: "Duke Dumont", title: "Need U (100%)" },
    { artist: "Solomun", title: "Kackvogel" },
    { artist: "Gorgon City & DRAMA", title: "You've Done Enough", recent: true },
    { artist: "Vintage Culture & Gabss", title: "Lost", recent: true },
  ],
  prog: [
    { artist: "Kaskade", title: "Atmosphere" },
    { artist: "Avicii", title: "Levels" },
    { artist: "Swedish House Mafia", title: "Don't You Worry Child" },
    { artist: "Alesso", title: "Heroes (We Could Be)" },
    { artist: "Zedd", title: "Clarity" },
    { artist: "Yotto", title: "The One You Left Behind" },
    { artist: "Anyma & Chris Avantgarde", title: "Eternity", recent: true },
    { artist: "ARTBAT", title: "Afterparty", recent: true },
  ],
  melodic: [
    { artist: "RÜFÜS DU SOL", title: "Innerbloom" },
    { artist: "Stephan Bodzin", title: "Singularity" },
    { artist: "Tale Of Us", title: "Another Earth" },
    { artist: "Kölsch", title: "Grey" },
    { artist: "Adriatique & WhoMadeWho", title: "Miracle" },
    { artist: "Anyma & Grimes", title: "Welcome To The Opera", recent: true },
  ],
  futurehouse: [
    { artist: "Don Diablo", title: "Cutting Shapes" },
    { artist: "Mike Williams", title: "Sweet & Sour" },
    { artist: "Curbi", title: "Discharge" },
    { artist: "Brooks", title: "Limbo" },
    { artist: "Aluna, Tchami & Kareen Lomax", title: "Running Blind", recent: true },
  ],
  bigroom: [
    { artist: "Hardwell", title: "Spaceman" },
    { artist: "Dimitri Vegas, MOGUAI & Like Mike", title: "Mammoth" },
    { artist: "Afrojack", title: "Take Over Control" },
    { artist: "Showtek", title: "Booyah" },
    { artist: "Nicky Romero", title: "Toulouse" },
  ],
  basshouse: [
    { artist: "JOYRYDE", title: "HARI KARI" },
    { artist: "Malaa", title: "Notorious" },
    { artist: "Skrillex & Habstrakt", title: "Chicken Soup" },
    { artist: "Wax Motif", title: "La Samba", recent: true },
    { artist: "ZHU & Wax Motif", title: "Better Recognize", recent: true },
  ],
  electrohouse: [
    { artist: "Benny Benassi", title: "Satisfaction" },
    { artist: "Calvin Harris", title: "Feel So Close" },
    { artist: "Madeon", title: "Icarus" },
    { artist: "Porter Robinson", title: "Language" },
    { artist: "Wolfgang Gartner", title: "Space Junk" },
    { artist: "deadmau5", title: "Ghosts 'n' Stuff" },
    { artist: "The Bloody Beetroots", title: "Warp 1.9" },
  ],
  frenchhouse: [
    { artist: "Cassius", title: "Toop Toop" },
    { artist: "Modjo", title: "Lady (Hear Me Tonight)" },
    { artist: "Breakbot", title: "Baby I'm Yours" },
    { artist: "Purple Disco Machine & Kungs", title: "Substitution", recent: true },
    { artist: "Folamour", title: "Fearless", recent: true },
  ],
  acidhouse: [
    { artist: "808 State", title: "Pacific State" },
    { artist: "A Guy Called Gerald", title: "Voodoo Ray" },
    { artist: "Armando", title: "Land of Confusion" },
    { artist: "Hardfloor", title: "Acperience 1" },
  ],
  tropical: [
    { artist: "Sam Feldt", title: "Show Me Love" },
    { artist: "Lost Frequencies", title: "Are You With Me" },
    { artist: "Klingande", title: "Jubel" },
    { artist: "Felix Jaehn", title: "Ain't Nobody (Loves Me Better)" },
    { artist: "Robin Schulz", title: "Speechless", recent: true },
  ],

  // ---------- Techno ----------
  techno: [
    { artist: "Robert Hood", title: "Minus" },
    { artist: "Joey Beltram", title: "Energy Flash" },
    { artist: "Amelie Lens", title: "In My Mind" },
    { artist: "Boris Brejcha", title: "Gravity" },
    { artist: "Nina Kraviz", title: "Ghetto Kraviz" },
    { artist: "Carl Cox", title: "I Want You (Forever)" },
    { artist: "Sara Landry & Shlømo", title: "Play With Me", recent: true },
    { artist: "I Hate Models", title: "Forever Melancholia", recent: true },
  ],

  // ---------- Trance ----------
  trance: [
    { artist: "Tiësto", title: "Adagio For Strings" },
    { artist: "Paul van Dyk", title: "For An Angel" },
    { artist: "Ferry Corsten", title: "Punk" },
    { artist: "Gareth Emery", title: "Concrete Angel" },
    { artist: "Cosmic Gate", title: "Exploration of Space" },
    { artist: "Robert Miles", title: "Children" },
    { artist: "Darude", title: "Sandstorm" },
    {
      artist: "Armin van Buuren, Ferry Corsten, Rank 1 & Ruben de Ronde",
      title: "Destination (A State of Trance 2024 Anthem)",
      recent: true,
    },
    { artist: "Ben Gold & Allen Watts", title: "Storm", recent: true },
  ],
  psytrance: [
    { artist: "Infected Mushroom", title: "Becoming Insane" },
    { artist: "Hilight Tribe", title: "Free Tibet (Vini Vici Remix)" },
    { artist: "Ace Ventura", title: "Presence" },
    {
      artist: "Captain Hook & Ace Ventura",
      title: "Space Tube 25 (Ace Ventura Remix)",
      recent: true,
    },
  ],

  // ---------- Breakbeat & jungle ----------
  dnb: [
    { artist: "Chase & Status & Liam Bailey", title: "Blind Faith" },
    { artist: "Wilkinson", title: "Afterglow" },
    { artist: "Netsky", title: "Rio" },
    { artist: "Dimension", title: "UK" },
    { artist: "Andy C", title: "Heartbeat Loud" },
    { artist: "Sigma", title: "Nobody to Love" },
    {
      artist: "Nia Archives",
      title: "Sunrise Bang Ur Head Against Tha Wall",
      recent: true,
    },
    { artist: "Hedex & Eksman", title: "MHITR (Semi-Automatic)", recent: true },
  ],
  ukg: [
    { artist: "Craig David", title: "Fill Me In" },
    { artist: "Sweet Female Attitude", title: "Flowers" },
    { artist: "Overmono", title: "So U Kno" },
    { artist: "Sammy Virji & Flowdan", title: "Shella Verse", recent: true },
    { artist: "Interplanetary Criminal & Blanco", title: "Races", recent: true },
    { artist: "Conducta", title: "Stratus", recent: true },
  ],
  bigbeat: [
    { artist: "The Prodigy", title: "Firestarter" },
    { artist: "The Crystal Method", title: "Born Too Slow" },
    { artist: "Propellerheads", title: "Spybreak!" },
    { artist: "Groove Armada", title: "I See You Baby" },
    { artist: "The Chemical Brothers", title: "Hey Boy Hey Girl" },
  ],
  jungle: [
    { artist: "M-Beat & General Levy", title: "Incredible" },
    { artist: "LTJ Bukem", title: "Horizons" },
    { artist: "Congo Natty", title: "Jungle Souljah" },
    { artist: "Nia Archives", title: "Forbidden Feelingz", recent: true },
    { artist: "SHERELLE", title: "With A Vengeance", recent: true },
  ],

  // ---------- Bass music ----------
  dubstep: [
    { artist: "Rusko", title: "Cockney Thug (Caspa Remix)" },
    { artist: "Benga & Coki", title: "Night" },
    { artist: "Nero", title: "Promises" },
    { artist: "Excision & Space Laces", title: "Throwin' Elbows" },
    { artist: "Virtual Riot", title: "Energy Drink" },
    { artist: "Zomboy", title: "Nuclear (Hands Up)" },
    { artist: "Subtronics", title: "Scream Saver" },
    { artist: "SVDDEN DEATH", title: "Dark Matters", recent: true },
  ],
  futurebass: [
    { artist: "Porter Robinson", title: "Sad Machine" },
    { artist: "ILLENIUM", title: "Fragments" },
    { artist: "The Chainsmokers", title: "Roses" },
    { artist: "Marshmello", title: "Alone" },
    { artist: "ODESZA", title: "Say My Name" },
    { artist: "Louis The Child", title: "It's Strange" },
    { artist: "Jai Wolf", title: "Indian Summer" },
    { artist: "Said The Sky", title: "Together Again", recent: true },
  ],
  trap: [
    { artist: "TroyBoi", title: "Do You?" },
    { artist: "NGHTMRE", title: "Street" },
    { artist: "What So Not", title: "High You Are" },
    { artist: "Flosstradamus", title: "Mosh Pit" },
    { artist: "Carnage", title: "Toca" },
    { artist: "Knock2", title: "dashstar*", recent: true },
    { artist: "ISOxo", title: "dontstopme!", recent: true },
  ],
  meldubstep: [
    { artist: "SLANDER", title: "Love Is Gone" },
    { artist: "Dabin", title: "Alive" },
    { artist: "Adventure Club", title: "Gold" },
    { artist: "MitiS", title: "Open Window" },
    { artist: "Au5", title: "Snowblind" },
    { artist: "William Black", title: "Deep Blue" },
  ],
  glitchhop: [
    { artist: "Pretty Lights", title: "Finally Moving" },
    { artist: "GRiZ", title: "Stop Trippin'" },
    { artist: "CloZee", title: "Koto" },
    { artist: "Big Gigantic", title: "The Little Things" },
    { artist: "Of The Trees & LYNY", title: "Hollow", recent: true },
  ],

  // ---------- Hard dance ----------
  hardstyle: [
    { artist: "Wildstylez", title: "Year Of Summer" },
    { artist: "Da Tweekaz", title: "Chew Bubblegum" },
    { artist: "Sub Zero Project", title: "The Project" },
    { artist: "Noisecontrollers", title: "Diffusion" },
    { artist: "Sefa", title: "1527", recent: true },
    { artist: "D-Block & S-te-Fan", title: "Fire", recent: true },
  ],
  happyhardcore: [
    { artist: "Darren Styles", title: "Holding On" },
    { artist: "Gammer", title: "The Drop" },
    { artist: "Hixxy", title: "Toytown" },
    { artist: "Paul Elstak", title: "Rainbow in the Sky" },
    {
      artist: "Da Tweekaz & Darren Styles",
      title: "Hewwego (Darren Styles Remix)",
      recent: true,
    },
  ],
  gabber: [
    { artist: "Miss K8", title: "Hallucin8" },
    { artist: "Neophyte", title: "Army of Hardcore" },
    { artist: "N-Vitral, BOMBSQUAD & Barber", title: "Game Of Hate", recent: true },
  ],

  // ---------- Global & trap-adjacent ----------
  phonk: [
    { artist: "DVRST", title: "Close Eyes" },
    { artist: "INTERWORLD", title: "METAMORPHOSIS" },
    { artist: "Hensonn", title: "Sahara" },
    { artist: "MoonDeity", title: "Movement", recent: true },
    { artist: "KSLV Noh", title: "Off Track", recent: true },
  ],
  amapiano: [
    { artist: "DBN Gogo", title: "Khuza Gogo" },
    { artist: "Focalistic", title: "Ke Star" },
    { artist: "Young Stunna", title: "Adiwele" },
    { artist: "Tyler ICU & Tumelo_za", title: "Mnike", recent: true },
    { artist: "Tyla", title: "Water", recent: true },
  ],
  moombahton: [
    { artist: "Dillon Francis", title: "Masta Blasta" },
    { artist: "Major Lazer", title: "Original Don" },
    { artist: "Major Lazer", title: "Watch Out For This (Bumaye)" },
  ],

  // ---------- Retro / other ----------
  synthwave: [
    { artist: "Carpenter Brut", title: "Roller Mobster" },
    { artist: "FM-84", title: "Running in the Night" },
    { artist: "Perturbator", title: "Future Club" },
    { artist: "Timecop1983", title: "On the Run" },
    { artist: "GUNSHIP", title: "Tech Noir 2", recent: true },
  ],
};
