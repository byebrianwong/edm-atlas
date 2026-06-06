/**
 * Additional example tracks per genre, beyond the two classics in genres.ts.
 * Each genre gets 4+ more: a couple of essential picks plus recent (2023+)
 * tracks flagged `recent`. Resolved Spotify IDs live in spotifyIds.ts, aligned
 * to the combined order (genres.ts examples first, then these). Regenerate IDs
 * with scripts/resolve-spotify.ts.
 */

export type ExtraTrack = { artist: string; title: string; recent?: boolean };

export const MORE_EXAMPLES: Record<string, ExtraTrack[]> = {
  // ---------- House ----------
  house: [
    { artist: "Robin S", title: "Show Me Love" },
    { artist: "Inner City", title: "Good Life" },
    { artist: "Disco Lines", title: "Baby Girl" },
    { artist: "John Summit & Hayla", title: "Where You Are", recent: true },
    { artist: "Dom Dolla & Nelly Furtado", title: "Eat Your Man", recent: true },
  ],
  tech: [
    { artist: "FISHER", title: "You Little Beauty" },
    { artist: "Solomun", title: "Kackvogel" },
    { artist: "Mau P", title: "Gimme That Bounce", recent: true },
    { artist: "Cloonee & Young M.A", title: "Stephanie", recent: true },
  ],
  deep: [
    { artist: "Maya Jane Coles", title: "What They Say" },
    { artist: "Duke Dumont", title: "Need U (100%)" },
    { artist: "Gorgon City & DRAMA", title: "You've Done Enough", recent: true },
    { artist: "Vintage Culture & Gabss", title: "Lost", recent: true },
  ],
  prog: [
    { artist: "deadmau5 & Kaskade", title: "I Remember" },
    { artist: "Eric Prydz", title: "Pjanoo" },
    { artist: "Anyma & Chris Avantgarde", title: "Eternity", recent: true },
    { artist: "ARTBAT", title: "Afterparty", recent: true },
  ],
  melodic: [
    { artist: "Ben Böhmer", title: "Cappadocia" },
    { artist: "CamelPhat & Elderbrook", title: "Cola" },
    { artist: "Anyma & Grimes", title: "Welcome To The Opera", recent: true },
    { artist: "Keinemusik", title: "Say What", recent: true },
  ],
  futurehouse: [
    { artist: "Don Diablo", title: "Cutting Shapes" },
    { artist: "Tchami", title: "Adieu" },
    { artist: "Aluna, Tchami & Kareen Lomax", title: "Running Blind", recent: true },
    { artist: "Oliver Heldens", title: "Physical", recent: true },
  ],
  bigroom: [
    { artist: "Hardwell", title: "Spaceman" },
    { artist: "Dimitri Vegas & Like Mike", title: "Mammoth" },
    { artist: "Martin Garrix", title: "Wherever You Are", recent: true },
    { artist: "Martin Garrix", title: "Gravity", recent: true },
  ],
  basshouse: [
    { artist: "Jauz & Ephwurd", title: "Rock The Party" },
    { artist: "JOYRYDE", title: "HARI KARI" },
    { artist: "Wax Motif", title: "La Samba", recent: true },
    { artist: "ZHU & Wax Motif", title: "Better Recognize", recent: true },
  ],
  electrohouse: [
    { artist: "Justice", title: "DVNO" },
    { artist: "Gesaffelstein", title: "Pursuit" },
    { artist: "Justice", title: "One Night/All Night", recent: true },
    { artist: "Justice", title: "Saturnine", recent: true },
  ],
  frenchhouse: [
    { artist: "Daft Punk", title: "Around the World" },
    { artist: "Cassius", title: "Toop Toop" },
    { artist: "Purple Disco Machine & Kungs", title: "Substitution", recent: true },
    { artist: "Folamour", title: "Fearless", recent: true },
  ],
  acidhouse: [
    { artist: "Hardfloor", title: "Acperience 1" },
    { artist: "Plastikman", title: "Spastik" },
    { artist: "Hannah Laing", title: "Climax", recent: true },
    { artist: "Héctor Oaks", title: "Todo El Polvo", recent: true },
  ],
  tropical: [
    { artist: "Sam Feldt", title: "Show Me Love" },
    { artist: "Lost Frequencies", title: "Are You With Me" },
    { artist: "Kygo", title: "Freeze", recent: true },
    { artist: "Robin Schulz", title: "Speechless", recent: true },
  ],

  // ---------- Techno ----------
  techno: [
    { artist: "Robert Hood", title: "Minus" },
    { artist: "Joey Beltram", title: "Energy Flash" },
    { artist: "Sara Landry & Shlømo", title: "Play With Me", recent: true },
    { artist: "I Hate Models", title: "Forever Melancholia", recent: true },
  ],

  // ---------- Trance ----------
  trance: [
    { artist: "Tiësto", title: "Adagio For Strings" },
    { artist: "Paul van Dyk", title: "For An Angel" },
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
    { artist: "Infected Mushroom", title: "Release Me REBORN", recent: true },
    {
      artist: "Captain Hook & Ace Ventura",
      title: "Space Tube 25 (Ace Ventura Remix)",
      recent: true,
    },
  ],

  // ---------- Breakbeat & jungle ----------
  dnb: [
    { artist: "Chase & Status & Liam Bailey", title: "Blind Faith" },
    { artist: "Sub Focus & Dimension", title: "Desire" },
    {
      artist: "Nia Archives",
      title: "Sunrise Bang Ur Head Against Tha Wall",
      recent: true,
    },
    { artist: "Hedex & Eksman", title: "MHITR (Semi-Automatic)", recent: true },
  ],
  ukg: [
    { artist: "Craig David", title: "Fill Me In" },
    { artist: "Sammy Virji & Flowdan", title: "Shella Verse", recent: true },
    { artist: "Interplanetary Criminal & Blanco", title: "Races", recent: true },
    { artist: "Conducta", title: "Stratus", recent: true },
  ],
  bigbeat: [
    { artist: "The Prodigy", title: "Firestarter" },
    { artist: "Fatboy Slim", title: "Praise You" },
    { artist: "The Chemical Brothers", title: "No Reason", recent: true },
    { artist: "Overmono", title: "So U Kno", recent: true },
  ],
  jungle: [
    { artist: "Goldie", title: "Terminator" },
    { artist: "M-Beat & General Levy", title: "Incredible" },
    { artist: "Nia Archives", title: "Forbidden Feelingz", recent: true },
    { artist: "SHERELLE", title: "With A Vengeance", recent: true },
  ],

  // ---------- Bass music ----------
  dubstep: [
    { artist: "Rusko", title: "Cockney Thug (Caspa Remix)" },
    { artist: "Benga & Coki", title: "Night" },
    { artist: "Skrillex, Fred again.. & Flowdan", title: "Rumble", recent: true },
    { artist: "SVDDEN DEATH", title: "Dark Matters", recent: true },
  ],
  futurebass: [
    { artist: "Porter Robinson", title: "Something Comforting" },
    { artist: "ILLENIUM", title: "Fragments" },
    { artist: "Said The Sky", title: "Together Again", recent: true },
    { artist: "ILLENIUM & Hayla", title: "In My Arms", recent: true },
  ],
  trap: [
    { artist: "RL Grime", title: "Pressure" },
    { artist: "Knock2", title: "dashstar*" },
    { artist: "ISOKNOCK", title: "TROUBLE", recent: true },
    { artist: "ISOxo, Knock2 & RL Grime", title: "SMACK TALK", recent: true },
  ],
  meldubstep: [
    { artist: "Seven Lions, ILLENIUM & Said The Sky", title: "Rush Over Me" },
    { artist: "Seven Lions", title: "Days to Come" },
    { artist: "ILLENIUM & Teddy Swims", title: "All That Really Matters", recent: true },
    { artist: "Seven Lions, Dabin & JIM", title: "Ones I Used To Love", recent: true },
  ],
  glitchhop: [
    { artist: "Rezz & deadmau5", title: "Hypnocurrency" },
    { artist: "The Glitch Mob", title: "Between Two Points" },
    { artist: "Rezz", title: "Can You See Me?", recent: true },
    { artist: "Of The Trees & LYNY", title: "Hollow", recent: true },
  ],

  // ---------- Hard dance ----------
  hardstyle: [
    { artist: "Headhunterz", title: "The Universe Is Ours" },
    { artist: "Sefa", title: "1527", recent: true },
    { artist: "Headhunterz", title: "Live Forever", recent: true },
    { artist: "D-Block & S-te-Fan", title: "Fire", recent: true },
  ],
  happyhardcore: [
    { artist: "Dougal & Gammer", title: "Your One" },
    { artist: "Darren Styles, Dougal & Gammer", title: "Stay Young" },
    { artist: "Gammer", title: "Freaks", recent: true },
    { artist: "Da Tweekaz & Darren Styles", title: "Hewwego (Darren Styles Remix)", recent: true },
  ],
  gabber: [
    { artist: "Paul Elstak", title: "Rainbow in the Sky" },
    { artist: "Angerfist", title: "Syndicate Of Noise", recent: true },
    { artist: "Angerfist & Miss K8", title: "Breinbreker", recent: true },
    { artist: "N-Vitral, BOMBSQUAD & Barber", title: "Game Of Hate", recent: true },
  ],

  // ---------- Global & trap-adjacent ----------
  phonk: [
    { artist: "DVRST", title: "Close Eyes" },
    { artist: "INTERWORLD", title: "METAMORPHOSIS" },
    { artist: "MoonDeity", title: "Movement", recent: true },
    { artist: "KSLV Noh", title: "Off Track", recent: true },
  ],
  amapiano: [
    { artist: "DBN Gogo", title: "Khuza Gogo" },
    { artist: "Kabza De Small", title: "iPiano" },
    { artist: "Tyler ICU & Tumelo_za", title: "Mnike", recent: true },
    { artist: "Tyla", title: "Water", recent: true },
  ],
  moombahton: [
    { artist: "Major Lazer", title: "Watch Out for This (Bumaye)" },
    { artist: "Sak Noel", title: "Loca People" },
    { artist: "Dillon Francis & Good Times Ahead", title: "Moombers", recent: true },
    { artist: "Dillon Francis & Good Times Ahead", title: "Humo", recent: true },
  ],

  // ---------- Retro / other ----------
  synthwave: [
    { artist: "Carpenter Brut", title: "Roller Mobster" },
    { artist: "FM-84", title: "Running in the Night" },
    { artist: "The Midnight", title: "First Night In Paris", recent: true },
    { artist: "GUNSHIP", title: "Tech Noir 2", recent: true },
  ],
};
