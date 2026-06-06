/**
 * Resolved Spotify track IDs, keyed by genre id and aligned to the combined
 * examples order: the two classics from genres.ts first, then the extras from
 * examples.ts. Resolved via web lookup to the canonical, most-streamed official
 * version of each track (remixes/edits/sped-up avoided unless canonical).
 *
 * To refresh against the official Spotify Web API, run
 * `scripts/resolve-spotify.ts` with SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET.
 */

export const SPOTIFY_IDS: Record<string, (string | null)[]> = {
  // ---- House ----
  house: [
    "1Xd7MCRZUwo80GHV79rdNF", "0vryyKyxCFXT0gg670yNEw",
    "4t0UsYzmmmZRMTWn77jiGF", "5sJiLlgQKBL81QCTOkoLB5", "52ilQzcjKdPvP5eZAknR4M",
    "4qDpLaFGf5ampf2DXD2TMA", "6Ea2oEzysv4UECGNxL1IEW",
  ],
  tech: [
    "6ho0GyrWZN3mhi9zVRW7xi", "29vo9RUjxgZWXWGTpD8f4m",
    "1gRQxbfL4ULWyTosgXSbWT", "2ngYf4G1bK5aD7GfThAAAm", "7jURkEKDVEm9sHueqUX0ko",
    "3sh2q76qsc7yLkQNmHKfQf",
  ],
  deep: [
    "0XUCrpew78UMlbwEGdkYwo", "7yBoIb36qGW4wN87fGJ6SG",
    "7HlvFIJDmcQRRn45aRd46t", "7mhFYw3pYz3tmoSGXaMFgK", "3FXyN98oS4nB2KJj4fFAwZ",
    "1OeW24Ek3LEthuQz1UyYCj",
  ],
  prog: [
    "1sgyYCbGhkX3auLHCQ825G", "3v2oAQomhOcYCPPHafS3KV",
    "4tGghJ2euPeI7HvpkNi1CU", "37plxdBjlkRh1JvW1QYIsT", "4XzeThE3txvCBIrP40tj85",
    "72fsISRF1G1vDUVPwbTgMO",
  ],
  melodic: [
    "49jWS1fz7QZQa4mBIqB0mu", "6j9hfHxpXEaYzFwcSK4MhH",
    "4rERaNiKlILD603GJvdEvm", "1HrMWH5GUdK6Yi94rbANJA", "3XgtRplaKaBn8lxBCAhfwI",
    "2GwsSbo6IbNDVvcm9rtmal",
  ],
  futurehouse: [
    "3nNqmaZvoRqVV8RUOP9CCt", "3dhPpCQvw3kn7so6mkTbJ3",
    "3hENlPbIlUZXQ3MiosF87Q", "5uF8FPXphwimBF92w9ZVUB", "0P9K6VG7Dzw9QRK9pNoznP",
    "3am2aiyW5kDSG80gxcxbh5",
  ],
  bigroom: [
    "0A9mHc7oYUoCECqByV8cQR", "5AdIEMVaS9pZEE6is0mdqm",
    "4be2rKBSY4VYYZbBEYAeK7", "76fqWMe0buqQoaNTIbLWmr", "4s5kizLw0McJRd4rBG06B4",
    "4IsiZS6mGyAgnTPglMGv75",
  ],
  basshouse: [
    "03IxJiB8ZOH9hEQZF5mCNY", "0oUTyBEY3NQzmu2VuoKpSH",
    "1eawzcSXO0NFalHKRoKrMC", "5rmbHWtNA3R5EpuHLWyPe9", "6N8VWb3F4GPP3pwj1jaDNU",
    "1ME5pFc81YOLOrcV1Z4Ovb",
  ],
  electrohouse: [
    "4wSmqFg31t6LsQWtzYAJob", "5qFL2uwfnGU8FccwLMgPNQ",
    "7pdDBqpilpdW7c40DpFMW9", "2jJIxT6WAIVWzDo3Ou53Q0", "2Oidi4pAbR9X81PBaV71N8",
    "0czIop1Wsllu6wCktR633R",
  ],
  frenchhouse: [
    "0DiWol3AO6WpXZgp0goxAV", "303ccTay2FiDTZ9fZ2AdBt",
    "1pKYYY0dkg23sQQXi0Q5zN", "7cHhpJV9fC2AqgdiLvq1AO", "2F2p7b5Xq20mRyEeWYaeUF",
    "4zidWR4YDfTFTK4M1PCZ0R",
  ],
  acidhouse: [
    "63eiF9VouGtmhiBKjm1LHU", "4sEP6KFrXJUH6kBTxFYW3y",
    "2cL9lvzLtSfloRkiJVN5tR", "2vSVMkT9ncoftPB8iyfYBC", "111D4Lbl3n6SKL33Ihf2je",
    "2i6kQND4jyZPEO0LYDyfdv",
  ],
  tropical: [
    "1I8tHoNBFTuoJAlh4hfVVE", "3NBDgwEAGMj0aKRsU8zoO9",
    "6ksRossV4vKsXntCCZbhaM", "39QlSLkqq5shnpAXchT9sI", "4FKFRkjrnvHLJb9UrwnRV5",
    "4GBPKhbGQsJc7X4WJ9ISd3",
  ],

  // ---- Techno ----
  techno: [
    "0TtgKq96j4bpE5UQUDXrwH", "5NZdurYcFYOg3s2YyzeVgE",
    "4yE5W3smYy9JJtYkK966Ef", "0ZdytJh5FwjApeF2PrhTt3", "6PrPWf02VxGUd2jJLs9z1M",
    "6ZWYsvOTYigBYoHMpFOyoA",
  ],

  // ---- Trance ----
  trance: [
    "57RA0OQtgapOijr0C4f0Bg", "2CG1FmeprsyjgHIPNMYCf4",
    "3Q2M6sNKDwoqZGBvwdFqZr", "2ElEFB1EjjklpSVF7YJP90", "3vBOBcoFPp4YEiCYBqB2CB",
    "0com2EFQT53ReqmUKilmYR",
  ],
  psytrance: [
    "3nwUX7DkMuGPcuHrOXN5VM", "4ghTP5cMLwTB9xslhAtnbR",
    "1Nukcy7xk7AbS7MtkaiOe3", "1Ic75bJnvNE3zpE7qZg7aA", "1pY3bk6y6vWim4VRGKbcsy",
    "4v5EG2flB6MMrso1xbtY34",
  ],

  // ---- Breakbeat & jungle ----
  dnb: [
    "0rCNC7HOFXe1lVyKyGEF6X", "7ifq3etzDP60X1IRaFVngl",
    "4Y01EDEcDrDg3rEQQ5Lw2R", "6hhZW2sP6E0AGp10jtTIxZ", "3tZKrJ0EznJE4e5cn41Dfz",
    "11Gypesywvx4AnUeYxeLaY",
  ],
  ukg: [
    "72RQFRC93D7wTFQqpwcbGA", "2bbIrLn5rnn8uCsPBwf8vA",
    "3cmFmOFDOMW2hbl8QhfZ0I", "2aoWvGMW6W40WelevwsOUx", "346F7P0kUbfsnVDjoNuBIo",
    "6Z0T5d90QWQdUUE0p1XMci",
  ],
  bigbeat: [
    "3Pb9QabepyR9e9D8NqorPH", "2wPFy7SAFnt9Nj2TipWcqb",
    "1GTPxha6U7x9ElVxkQw3OK", "3yGy1JYz3zQKlxSgjgpQqX", "70JiPk5FBlc6eymIcHPCxU",
    "1YGxSgWIWqxKuLLocPVxhC",
  ],
  jungle: [
    "53mh7POQqTXj2Cfh7phP5b", "0O7xFEqePrcTUgOi4qe0uB",
    "3FuuPyLf9DNNEcUIIStfQ6", "2QZHLFuN2hW8eaTTILNSEC", "6c21bVRfGC8IOXvQVQ2UTb",
    "2UhXctoL90K4p2p4q0izsh",
  ],

  // ---- Bass music ----
  dubstep: [
    "4rwpZEcnalkuhPyGkEdhu0", "1fc12F23NDBAN1Y75GEc1v",
    "74vDUHyreMupR6USfE6tCg", "2YyNpUt0nJccAoUpePI1dL", "1GfBLbAhZUWdseuDqhocmn",
    "6GOjpCP6g70r2hLvFwwF88",
  ],
  futurebass: [
    "476j7IDRIDRvv1Xu71EVc8", "74Ru27B7Jx8mBt5MGvGLLv",
    "1hESEeN8MjE7x9soh0ZeTU", "0qH4xYxCrvqO86YyLbkTrB", "6QNIFEn1rdrriGAFQPYQd3",
    "6nJiqVmR1SyAu50GuDenIJ",
  ],
  trap: [
    "2KU0RHzEYq8GLwDTyimWGr", "01XFgRZfZI7oBagNf1Loml",
    "11AZJufpf0EdlyGes9Jgrh", "0dAfw35k2hBsnbSl74AVJF", "3Y0FFtcmxdGkrCKnvuOs5q",
    "5rzHkSHRyZUdQcCX6noFDB",
  ],
  meldubstep: [
    "2U0pVx4m1Kdm1Gsjjm6iq8", "6vWk151OrbHfKe4D6Z6tdV",
    "4F3MviLxDvEcNysrC2N9eD", "1Db1TsTyBKq4yZcXbVD9Qq", "65vCw4FdJiKcfFwRXyF7ND",
    "1roWNMBhbOCqcZSFJ6Oky4",
  ],
  glitchhop: [
    "4pCvnGkf7jveRMKHZosxxB", "4c9FIjxXYYEyD9iH02fvbu",
    "3evAUkYDPeLX5kn0LbvGz4", "6Po0JDs8vPuZOCF7RLbtUE", "2YeHtUuRFJeeeJtGGmLp5a",
    "2x7yuFzNDoD2BABAlZEk2L",
  ],

  // ---- Hard dance ----
  hardstyle: [
    "0JAwAgwSP2GT9dfngdvUFZ", "2kkh8Z3tlBDY8jhT4bWrC6",
    "0w339q5XFjT2dRjbxjaUSc", "5yN2PfrIlPv3NvHjqeReQf", "5X8tPX2djNURxMS9YQj75e",
    "4T8PMmEA0Av6wflrRjdKKx",
  ],
  happyhardcore: [
    "31JhTEAWmmhZIZTm40pQZr", "3G1SVODcssMmS5YM5G3tun",
    "2n5b90jmMpuI4Z8oEGaULd", "636uHrARNAhJDrWxONIhG6", "4wbA8wvhhsHib3em69PUqa",
    "27R40llvf0YKPQAKoS9jNz",
  ],
  gabber: [
    "4sU80kMeqWITCfagbcO0vo", "0rwcI97IXXNEhDWVYis9Pg",
    "6L931X4LbkLbvOpJp04YbE", "2QXxOoPaqduErHktm3wmRu", "2FUaZHHlfHCSu3yK0dHihc",
    "0YiOkYXWTaFda3ZttdkPuD",
  ],

  // ---- Global & trap-adjacent ----
  phonk: [
    "4oMyggIzClkOcCTvotFLkP", "6qyS9qBy0mEk3qYaH8mPss",
    "3CLSHJv5aUROAN2vfOyCOh", "2ksyzVfU0WJoBpu8otr4pz", "1OW09quqIkWKFxosOoSwf9",
    "2c5Rzmr7oBFromKBznnwhz",
  ],
  amapiano: [
    "6V06P7LboO5FaYi13nQANw", "5z6oqX6l6kTSPB9gSRnLzE",
    "7zJYbquljYLkTShkGhiBTX", "0wQDeZ6umTdeN6wS04svf3", "5tpft20jhQvRlG3O7XfwWy",
    "0SPzyaBzgPVLSvXGBCRbEN",
  ],
  moombahton: [
    "2NdYsk6IbhNg9DhOTY1K5y", "3S7hj7i6ibxRbpKkXJtio3",
    "4rvSLD2lcADOvyAGkDuL54", "5BNHCKB9X3OlW66T5taegZ", "7246Et3G48rB1OozUYXLhh",
    "76d0olhfj538RQqmDRLcUM",
  ],

  // ---- Retro / other ----
  synthwave: [
    "0U0ldCRmgCqhVvD6ksG63j", "4PMmwowVLOajPdiKnrU1vK",
    "7oxnK2wg8qFv8EXyyxKDJ4", "0E3HnGJSMplqBSYGsh2exH", "2769cq0VX4Zz2huNQYS72Z",
    "6ufBzP1Ue3c145hk22Owzy",
  ],
};
