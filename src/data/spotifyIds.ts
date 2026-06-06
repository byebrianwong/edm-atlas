/**
 * Resolved Spotify track IDs, keyed by genre id and aligned to each genre's
 * `examples` order. Resolved via web lookup (the canonical, most-streamed
 * official version of each track was chosen; remixes/edits/live cuts avoided).
 *
 * To refresh with the official Spotify Web API later, run
 * `scripts/resolve-spotify.ts` with SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET
 * set; it regenerates this map.
 */

export const SPOTIFY_IDS: Record<string, (string | null)[]> = {
  // ---- House ----
  house: ["1Xd7MCRZUwo80GHV79rdNF", "0vryyKyxCFXT0gg670yNEw"],
  tech: ["6ho0GyrWZN3mhi9zVRW7xi", "29vo9RUjxgZWXWGTpD8f4m"],
  deep: ["0XUCrpew78UMlbwEGdkYwo", "7yBoIb36qGW4wN87fGJ6SG"],
  prog: ["1sgyYCbGhkX3auLHCQ825G", "3v2oAQomhOcYCPPHafS3KV"],
  melodic: ["49jWS1fz7QZQa4mBIqB0mu", "6j9hfHxpXEaYzFwcSK4MhH"],
  futurehouse: ["3nNqmaZvoRqVV8RUOP9CCt", "3dhPpCQvw3kn7so6mkTbJ3"],
  bigroom: ["0A9mHc7oYUoCECqByV8cQR", "5AdIEMVaS9pZEE6is0mdqm"],
  basshouse: ["03IxJiB8ZOH9hEQZF5mCNY", "0oUTyBEY3NQzmu2VuoKpSH"],
  electrohouse: ["4wSmqFg31t6LsQWtzYAJob", "5qFL2uwfnGU8FccwLMgPNQ"],
  frenchhouse: ["0DiWol3AO6WpXZgp0goxAV", "303ccTay2FiDTZ9fZ2AdBt"],
  acidhouse: ["63eiF9VouGtmhiBKjm1LHU", "4sEP6KFrXJUH6kBTxFYW3y"],
  tropical: ["1I8tHoNBFTuoJAlh4hfVVE", "3NBDgwEAGMj0aKRsU8zoO9"],

  // ---- Techno ----
  techno: ["0TtgKq96j4bpE5UQUDXrwH", "5NZdurYcFYOg3s2YyzeVgE"],

  // ---- Trance ----
  trance: ["57RA0OQtgapOijr0C4f0Bg", "2CG1FmeprsyjgHIPNMYCf4"],
  psytrance: ["3nwUX7DkMuGPcuHrOXN5VM", "4ghTP5cMLwTB9xslhAtnbR"],

  // ---- Breakbeat & jungle ----
  dnb: ["0rCNC7HOFXe1lVyKyGEF6X", "7ifq3etzDP60X1IRaFVngl"],
  ukg: ["72RQFRC93D7wTFQqpwcbGA", "2bbIrLn5rnn8uCsPBwf8vA"],
  bigbeat: ["3Pb9QabepyR9e9D8NqorPH", "2wPFy7SAFnt9Nj2TipWcqb"],
  jungle: ["53mh7POQqTXj2Cfh7phP5b", "0O7xFEqePrcTUgOi4qe0uB"],

  // ---- Bass music ----
  dubstep: ["4rwpZEcnalkuhPyGkEdhu0", "1fc12F23NDBAN1Y75GEc1v"],
  futurebass: ["476j7IDRIDRvv1Xu71EVc8", "74Ru27B7Jx8mBt5MGvGLLv"],
  trap: ["2KU0RHzEYq8GLwDTyimWGr", "01XFgRZfZI7oBagNf1Loml"],
  meldubstep: ["2U0pVx4m1Kdm1Gsjjm6iq8", "6vWk151OrbHfKe4D6Z6tdV"],
  glitchhop: ["4pCvnGkf7jveRMKHZosxxB", "4c9FIjxXYYEyD9iH02fvbu"],

  // ---- Hard dance ----
  hardstyle: ["0JAwAgwSP2GT9dfngdvUFZ", "2kkh8Z3tlBDY8jhT4bWrC6"],
  happyhardcore: ["31JhTEAWmmhZIZTm40pQZr", "3G1SVODcssMmS5YM5G3tun"],
  gabber: ["4sU80kMeqWITCfagbcO0vo", "0rwcI97IXXNEhDWVYis9Pg"],

  // ---- Global & trap-adjacent ----
  phonk: ["4oMyggIzClkOcCTvotFLkP", "6qyS9qBy0mEk3qYaH8mPss"],
  amapiano: ["6V06P7LboO5FaYi13nQANw", "5z6oqX6l6kTSPB9gSRnLzE"],
  moombahton: ["2NdYsk6IbhNg9DhOTY1K5y", "3S7hj7i6ibxRbpKkXJtio3"],

  // ---- Retro / other ----
  synthwave: ["0U0ldCRmgCqhVvD6ksG63j", "4PMmwowVLOajPdiKnrU1vK"],
};
