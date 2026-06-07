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
  "house": [
    "1Xd7MCRZUwo80GHV79rdNF",
    "0vryyKyxCFXT0gg670yNEw",
    "4t0UsYzmmmZRMTWn77jiGF",
    "69pYA58dXKfqPNoAnB0pMZ",
    "5sJiLlgQKBL81QCTOkoLB5",
    "15DwFznkBJir7AK9PyMyRR",
    "1DunhgeZSEgWiIYbHqXl0c",
    "3YgtkOxZsTuaZdL8McA1FQ",
    "52ilQzcjKdPvP5eZAknR4M",
    "4qDpLaFGf5ampf2DXD2TMA",
    "6Ea2oEzysv4UECGNxL1IEW"
  ],
  "tech": [
    "6ho0GyrWZN3mhi9zVRW7xi",
    "29vo9RUjxgZWXWGTpD8f4m",
    "2ngYf4G1bK5aD7GfThAAAm",
    "360sBupNtvxLtlRBNbEFSu",
    "6mb13UurhM6pxezGvRqHpQ",
    "2McAMAKIdy2268vevQ5bUy",
    "61eyaitcIdl1jpnc6Kb8M3",
    "7jURkEKDVEm9sHueqUX0ko",
    "3sh2q76qsc7yLkQNmHKfQf",
    "787Y2idwCU2Rk60Prv4wpr"
  ],
  "deep": [
    "0XUCrpew78UMlbwEGdkYwo",
    "7yBoIb36qGW4wN87fGJ6SG",
    "7HlvFIJDmcQRRn45aRd46t",
    "7mhFYw3pYz3tmoSGXaMFgK",
    "2aJDlirz6v2a4HREki98cP",
    "3FXyN98oS4nB2KJj4fFAwZ",
    "1OeW24Ek3LEthuQz1UyYCj"
  ],
  "prog": [
    "1sgyYCbGhkX3auLHCQ825G",
    "3v2oAQomhOcYCPPHafS3KV",
    "79BziE0cPQD2MZBJwXsB1P",
    "4oIe1q1vc9aQfEo66DRPPF",
    "043bfUkTydw0xJ5JjOT91w",
    "0YzCQcsgj6KqwBHVx1mZrH",
    "4B6OuQJgX3vZcKozQ5L7rB",
    "4XzeThE3txvCBIrP40tj85",
    "72fsISRF1G1vDUVPwbTgMO"
  ],
  "melodic": [
    "49jWS1fz7QZQa4mBIqB0mu",
    "6j9hfHxpXEaYzFwcSK4MhH",
    "1HrMWH5GUdK6Yi94rbANJA",
    "6CGMZijOAZvTXG21T8t6R0",
    "0yuJtvXsapVOQfNDYxQ5mw",
    "0aVrpFRLlrd5zVyPXWP3mS",
    "3XgtRplaKaBn8lxBCAhfwI",
    "2GwsSbo6IbNDVvcm9rtmal"
  ],
  "futurehouse": [
    "3nNqmaZvoRqVV8RUOP9CCt",
    "3dhPpCQvw3kn7so6mkTbJ3",
    "3hENlPbIlUZXQ3MiosF87Q",
    "4ItxH3qNtCTu1EubJ4NEcM",
    "7e9ShQY3yaLVdupGTzgue8",
    "6nsxxd4yf7fgSEKPdWGuPb",
    "0P9K6VG7Dzw9QRK9pNoznP"
  ],
  "bigroom": [
    "0A9mHc7oYUoCECqByV8cQR",
    "5AdIEMVaS9pZEE6is0mdqm",
    "4be2rKBSY4VYYZbBEYAeK7",
    "76fqWMe0buqQoaNTIbLWmr",
    "5DdDbJvoaT8fqQMJkiGg4T",
    "2hWIE3vQu8Zc63zWaFiWRG",
    "4AtYl1l9JI3x5Sb9SuOBIL",
    "4uUG5RXrOk84mYEfFvj3cK",
    "0zKbDrEXKpnExhGQRe9dxt"
  ],
  "basshouse": [
    "03IxJiB8ZOH9hEQZF5mCNY",
    "0oUTyBEY3NQzmu2VuoKpSH",
    "5rmbHWtNA3R5EpuHLWyPe9",
    "2XjPFBHDIKXNRzB1QrEhpP",
    "7hU38LHqMSPFrvoqADFJp4",
    "6N8VWb3F4GPP3pwj1jaDNU",
    "1ME5pFc81YOLOrcV1Z4Ovb"
  ],
  "electrohouse": [
    "4wSmqFg31t6LsQWtzYAJob",
    "5qFL2uwfnGU8FccwLMgPNQ",
    "2jJIxT6WAIVWzDo3Ou53Q0",
    "5UboJHrsz2MSmygHJlgIdZ",
    "15ccEhr9NN3Blmdr0hQwj9",
    "3thw5Jqn6c7mVEK8NeU1GI",
    "3WtVqbOC2ze5xh0MsegPwS",
    "60wwxj6Dd9NJlirf84wr2c",
    "0HIruANJzlQkYwlpvh8cn6"
  ],
  "frenchhouse": [
    "0DiWol3AO6WpXZgp0goxAV",
    "303ccTay2FiDTZ9fZ2AdBt",
    "7cHhpJV9fC2AqgdiLvq1AO",
    "49X0LAl6faAusYq02PRAY6",
    "7oGwQOTkMB9Sk3DIKJLd5F",
    "2F2p7b5Xq20mRyEeWYaeUF",
    "4zidWR4YDfTFTK4M1PCZ0R"
  ],
  "acidhouse": [
    "63eiF9VouGtmhiBKjm1LHU",
    "4sEP6KFrXJUH6kBTxFYW3y",
    "2cL9lvzLtSfloRkiJVN5tR",
    "2vSVMkT9ncoftPB8iyfYBC",
    "111D4Lbl3n6SKL33Ihf2je",
    "2i6kQND4jyZPEO0LYDyfdv"
  ],
  "tropical": [
    "1I8tHoNBFTuoJAlh4hfVVE",
    "3NBDgwEAGMj0aKRsU8zoO9",
    "6ksRossV4vKsXntCCZbhaM",
    "39QlSLkqq5shnpAXchT9sI",
    "03RENvqJKYdvWUhbuZwJY3",
    "3c8iiZGfEammKJuWTErE5x",
    "4GBPKhbGQsJc7X4WJ9ISd3"
  ],
  "techno": [
    "0TtgKq96j4bpE5UQUDXrwH",
    "5NZdurYcFYOg3s2YyzeVgE",
    "4yE5W3smYy9JJtYkK966Ef",
    "0ZdytJh5FwjApeF2PrhTt3",
    "5UAtcDuXrfjU2jUtnEtYMZ",
    "6bjHTATKGW2982YBO1gjYH",
    "4ZE92k8ieG0tGzUw0tG3jN",
    "5Nc7oACCgFHBdMIdkosiLP",
    "6PrPWf02VxGUd2jJLs9z1M",
    "6ZWYsvOTYigBYoHMpFOyoA"
  ],
  "trance": [
    "57RA0OQtgapOijr0C4f0Bg",
    "2CG1FmeprsyjgHIPNMYCf4",
    "3Q2M6sNKDwoqZGBvwdFqZr",
    "2ElEFB1EjjklpSVF7YJP90",
    "4oKzIuofrA3IdD2ttnCsk8",
    "51qqAnXJT4Ivgs19yDO2Uf",
    "0P2sfcfRD0lWw4b8eXegmR",
    "4Ewc7TIrAVvtYzzjn30PgS",
    "6Sy9BUbgFse0n0LPA5lwy5",
    "3vBOBcoFPp4YEiCYBqB2CB",
    "0com2EFQT53ReqmUKilmYR"
  ],
  "psytrance": [
    "3nwUX7DkMuGPcuHrOXN5VM",
    "4ghTP5cMLwTB9xslhAtnbR",
    "1Nukcy7xk7AbS7MtkaiOe3",
    "1Ic75bJnvNE3zpE7qZg7aA",
    "1ZJWsMwJ5kHS1lmZKNc6Hs",
    "4v5EG2flB6MMrso1xbtY34"
  ],
  "dnb": [
    "0rCNC7HOFXe1lVyKyGEF6X",
    "7ifq3etzDP60X1IRaFVngl",
    "4Y01EDEcDrDg3rEQQ5Lw2R",
    "6LW3Z1GqbL78TIjfDyg4zp",
    "09ZsCO626rjkEgAMis0pYg",
    "7KsygyqjIX3wXMl9QNFIhE",
    "5PuJ00qKGWqbGeeWbt8WJb",
    "5dzHlLBWdxdQySpvZLHcu9",
    "3tZKrJ0EznJE4e5cn41Dfz",
    "11Gypesywvx4AnUeYxeLaY"
  ],
  "ukg": [
    "72RQFRC93D7wTFQqpwcbGA",
    "2bbIrLn5rnn8uCsPBwf8vA",
    "3cmFmOFDOMW2hbl8QhfZ0I",
    "2PI5aD48FXC1n4sxGYOqWm",
    "2aoWvGMW6W40WelevwsOUx",
    "346F7P0kUbfsnVDjoNuBIo",
    "6Z0T5d90QWQdUUE0p1XMci"
  ],
  "bigbeat": [
    "3Pb9QabepyR9e9D8NqorPH",
    "2wPFy7SAFnt9Nj2TipWcqb",
    "1GTPxha6U7x9ElVxkQw3OK",
    "30FjilIce6H85IMU6ULp1l",
    "4iVjyzPXZwOuu5z6Gd4IvF",
    "3v7iEWZ16kDuDJbmgY6nRd",
    "1YGxSgWIWqxKuLLocPVxhC"
  ],
  "jungle": [
    "53mh7POQqTXj2Cfh7phP5b",
    "0O7xFEqePrcTUgOi4qe0uB",
    "2QZHLFuN2hW8eaTTILNSEC",
    "7aubh20fHrSDTvNyjop5rK",
    "3fjOBczbzIm1HnYcam47YV",
    "6c21bVRfGC8IOXvQVQ2UTb",
    "2UhXctoL90K4p2p4q0izsh"
  ],
  "dubstep": [
    "4rwpZEcnalkuhPyGkEdhu0",
    "1fc12F23NDBAN1Y75GEc1v",
    "74vDUHyreMupR6USfE6tCg",
    "2YyNpUt0nJccAoUpePI1dL",
    "2LCCxYQ5dw1dz3Pu6APEUH",
    "5Z9gjSD3mglkexfM8QbGHo",
    "3507Teuh1vj1L5eMAJj80O",
    "32AV76N8GhpnJ74VoYfDGk",
    "1TNTryhCP84uvJJsyGZZnH",
    "6GOjpCP6g70r2hLvFwwF88"
  ],
  "futurebass": [
    "476j7IDRIDRvv1Xu71EVc8",
    "74Ru27B7Jx8mBt5MGvGLLv",
    "1hESEeN8MjE7x9soh0ZeTU",
    "0qH4xYxCrvqO86YyLbkTrB",
    "3FWPoYBDserKdzcattMFGa",
    "3MEYFivt6bilQ9q9mFWZ4g",
    "32zr9gHyWhgm2Dn5bg0Bpw",
    "4xwelAGnWNOrxNxdszTkEz",
    "1wuKSUGnJNhvxSHSKMJvUm",
    "6QNIFEn1rdrriGAFQPYQd3"
  ],
  "trap": [
    "2KU0RHzEYq8GLwDTyimWGr",
    "01XFgRZfZI7oBagNf1Loml",
    "0tAFy8LVdMQgW6A6Nq7olS",
    "67wkHfeE9pKUoElc2MHofG",
    "6zpCJDhdpHPZCcFCJZDqX5",
    "6cZYAreYA6W2pcyDwaS4V0",
    "1qm9MfTAoEixNPSqshHqfV",
    "0dAfw35k2hBsnbSl74AVJF",
    "6CNXcjAeOvjTwJeNCEdfWs"
  ],
  "meldubstep": [
    "2U0pVx4m1Kdm1Gsjjm6iq8",
    "6vWk151OrbHfKe4D6Z6tdV",
    "6HfZTdkheqDGQQwQGRV8et",
    "7u9l5Xnkx5qoBtssirWVZM",
    "3wjen23Xb9H1kU4V50QyiZ",
    "4nkBL9MVNCSfUJpNHKeiyb",
    "7FCG2wIYG1XvGRUMACC2cD",
    "3lzmoZIPWJxew5Tjyi715j"
  ],
  "glitchhop": [
    "4pCvnGkf7jveRMKHZosxxB",
    "4c9FIjxXYYEyD9iH02fvbu",
    "3WS7spXVlbeC5kjePmHMQW",
    "0A5cDtbeMHUHpRBvYrGQqc",
    "4TmwuMVty1K2qBJnYFpnNs",
    "0h2DNYdWq3mWE8Ov2A03oU",
    "2x7yuFzNDoD2BABAlZEk2L"
  ],
  "hardstyle": [
    "0JAwAgwSP2GT9dfngdvUFZ",
    "2kkh8Z3tlBDY8jhT4bWrC6",
    "3iKcDwqwMf6O547uQcyjaO",
    "2QZj7flz7uz5GGPxL2w19C",
    "2fQcm2pX0XQjOrLxAdYxJJ",
    "32oqTpaL9o3K5qiwWy10ab",
    "5yN2PfrIlPv3NvHjqeReQf",
    "4T8PMmEA0Av6wflrRjdKKx"
  ],
  "happyhardcore": [
    "31JhTEAWmmhZIZTm40pQZr",
    "3G1SVODcssMmS5YM5G3tun",
    "3SaQ1V2dHOrDyViaN1IEmz",
    "2sEeRKHVONJGERCwKCW2ix",
    "12riei0zkjU3OgXK9D1THR",
    "27R40llvf0YKPQAKoS9jNz"
  ],
  "gabber": [
    "4sU80kMeqWITCfagbcO0vo",
    "0rwcI97IXXNEhDWVYis9Pg",
    "6L931X4LbkLbvOpJp04YbE",
    "2R5w6vL4VWcbZ4UGIUzPdX",
    "2bmjbF8ZeqirBwsu5HfC6N",
    "0YiOkYXWTaFda3ZttdkPuD"
  ],
  "phonk": [
    "4oMyggIzClkOcCTvotFLkP",
    "6qyS9qBy0mEk3qYaH8mPss",
    "3CLSHJv5aUROAN2vfOyCOh",
    "2ksyzVfU0WJoBpu8otr4pz",
    "6nqdgUTiWt4JbABDurkxMI",
    "1OW09quqIkWKFxosOoSwf9",
    "2c5Rzmr7oBFromKBznnwhz"
  ],
  "amapiano": [
    "6V06P7LboO5FaYi13nQANw",
    "5z6oqX6l6kTSPB9gSRnLzE",
    "7zJYbquljYLkTShkGhiBTX",
    "0hKVw9d0hh633BMCqPyUF8",
    "2dTQe0W5KXs6TNVV7yi2oS",
    "5tpft20jhQvRlG3O7XfwWy",
    "0SPzyaBzgPVLSvXGBCRbEN"
  ],
  "moombahton": [
    "2NdYsk6IbhNg9DhOTY1K5y",
    "3S7hj7i6ibxRbpKkXJtio3",
    "5BNHCKB9X3OlW66T5taegZ",
    "67awxiNHNyjMXhVgsHuIrs",
    "6UlvONcL4jXM0pC0CPA48S",
    "7s5a2gLa9Ip1LDKeAaHJRr",
    "0nLpuD9YMKexqFWLc5zbE8"
  ],
  "synthwave": [
    "0U0ldCRmgCqhVvD6ksG63j",
    "4PMmwowVLOajPdiKnrU1vK",
    "7oxnK2wg8qFv8EXyyxKDJ4",
    "0E3HnGJSMplqBSYGsh2exH",
    "20ztml2STRF7Sq1UaBB6ox",
    "6COsFwxCkIpXBYw4iiVWH4",
    "6ufBzP1Ue3c145hk22Owzy"
  ]
};
