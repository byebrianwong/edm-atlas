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
    "3OrcEhLzxv1YX597jGjEI7",
    "0vryyKyxCFXT0gg670yNEw",
    "4t0UsYzmmmZRMTWn77jiGF",
    "1SShxVVBeZBCY7WddnksPz",
    "5sJiLlgQKBL81QCTOkoLB5",
    "15DwFznkBJir7AK9PyMyRR",
    "51ODNNDZm21HU7wI7cccRr",
    "1rf4SX7dduNbrNnOmupLzi",
    "2cSdAkzAf2T4j4aLvx4LLz",
    "3pUz2qJe5nqZemi3hhIxMk"
  ],
  "tech": [
    "6ho0GyrWZN3mhi9zVRW7xi",
    "42CMeHqi0S8sbKvrzLyixS",
    "0aL5jEWqfIwNDB3tdzyzH4",
    "4zN21mbAuaD0WqtmaTZZeP",
    "7cyGxmLnHWlwt41cr2RZzG",
    "5hYSsLVQ6Isk6YZrnsBj4E",
    "7JdiXX87BugXUDhQ89GEc8",
    "7jURkEKDVEm9sHueqUX0ko",
    "3flWoQdYrWyqUsHbURIJby",
    "787Y2idwCU2Rk60Prv4wpr",
    "6Ea2oEzysv4UECGNxL1IEW"
  ],
  "deep": [
    "4mNwbj8hTUjbyZSHdQVIuL",
    "4V2i4mCnjqWGXPJsNc8Rm8",
    "5S7Y5HgQ2HPqiCVkKylT2r",
    "1I0mRrowc6HCoED6hoAB2q",
    "7DvYn41w1CZ1mBHbIVUDfO",
    "77VqW84V88aKD8Bi8CzEsP",
    "1OeW24Ek3LEthuQz1UyYCj"
  ],
  "prog": [
    "5vTPFJOzgr6IzF11Kvjzls",
    "3v2oAQomhOcYCPPHafS3KV",
    "5jozNdKPygoaSZhPJMP3eD",
    "5UqCQaDshqbIk3pkhy4Pjg",
    "2V65y3PX4DkRhy1djlxd9p",
    "3zU9rdflI65tK4dkkNSp77",
    "4B6OuQJgX3vZcKozQ5L7rB",
    "1GBBbKOarAJ38HwIfLcOji",
    "72fsISRF1G1vDUVPwbTgMO"
  ],
  "melodic": [
    "49jWS1fz7QZQa4mBIqB0mu",
    "6j9hfHxpXEaYzFwcSK4MhH",
    "6CGMZijOAZvTXG21T8t6R0",
    "0yuJtvXsapVOQfNDYxQ5mw",
    "13epRnXCHBQTrkic0BfDgR",
    "4rjA5kJJWbwU1prXCvg6Fk",
    "2yTjbIZDwHO41HIwDNPB8K",
    "7hV8vZMezoQdSdvsi70Ioa"
  ],
  "futurehouse": [
    "483XiZ5o13Cc1zoWV7jGml",
    "3dhPpCQvw3kn7so6mkTbJ3",
    "3hENlPbIlUZXQ3MiosF87Q",
    "4ItxH3qNtCTu1EubJ4NEcM",
    "5H43nlyZr9Rkcnj4lbjBDi",
    "5rFLXU6tWcFap3RQXYdkVy",
    "0P9K6VG7Dzw9QRK9pNoznP"
  ],
  "bigroom": [
    "0A9mHc7oYUoCECqByV8cQR",
    "5AdIEMVaS9pZEE6is0mdqm",
    "0T64SYe5jQTQq57E6d94N3",
    "0KNYrJlQoXIUMatEyuwFlU",
    "4iD3msRl5hJUBEtrQwnR4k",
    "55SPQmrp0XawJSbBtPelaA",
    "2bsyecmZCgdlsCZ3sWVZ99"
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
    "5JZnjM9ijpit0d5zjT8MM7",
    "1gihuPhrLraKYrJMAEONyc",
    "1pUsdir2xhSxP0RyBe9lLH",
    "3NRDLYyqIXja0UElvdzjkB",
    "3WtVqbOC2ze5xh0MsegPwS",
    "60wwxj6Dd9NJlirf84wr2c",
    "0HIruANJzlQkYwlpvh8cn6"
  ],
  "frenchhouse": [
    "0DiWol3AO6WpXZgp0goxAV",
    "303ccTay2FiDTZ9fZ2AdBt",
    "7cHhpJV9fC2AqgdiLvq1AO",
    "49X0LAl6faAusYq02PRAY6",
    "0tZkVZ9DeAa0MNK2gY5NtV",
    "6BjG4NirMgJfC6QAvbfBNG",
    "4zidWR4YDfTFTK4M1PCZ0R"
  ],
  "acidhouse": [
    "2aLXJJ2zOsBJlGTxiG0yMi",
    "6cJ3yBgG1VzRpf4xrKsfB8",
    "2h7w0KHwHbx4WbG6WxjO7U",
    "1SK1pOroM50yXlNFRMEeu5",
    "7o266LwHT9ITAHO8EJ4ETH",
    "2IQ61J0AFfjnxBm4lQEU0W"
  ],
  "tropical": [
    "1I8tHoNBFTuoJAlh4hfVVE",
    "3NBDgwEAGMj0aKRsU8zoO9",
    "4bAmAVdks2Y84VNVVLXFwN",
    "4255amV4enzl28KAn16rUO",
    "1sQ6MIoJOmqBhwomBBLE9g",
    "3c8iiZGfEammKJuWTErE5x",
    "7wDTDI7giGtVFqgNipVcAR"
  ],
  "techno": [
    "7J2ZnqSaDNijHboyFFkwpV",
    "5NZdurYcFYOg3s2YyzeVgE",
    "0YLEO6hUj8uO3RrJTHMPkD",
    "46ddej1ibGIgs58H0wakoK",
    "5UAtcDuXrfjU2jUtnEtYMZ",
    "30WnQsvwFeYEd9k08vV7Dl",
    "1vYUnLz9DfpJCnGB77UFFJ",
    "6A2fGSY2uZcidWpNosshqc",
    "6PrPWf02VxGUd2jJLs9z1M",
    "6ZWYsvOTYigBYoHMpFOyoA"
  ],
  "trance": [
    "1CgbwsrNDlFrRuk2ebQ7zr",
    "4rfhAoZjGwraqwX1w47uij",
    "76uTbKqlADkTPQ1bXHMBww",
    "5JcZHbUi60uykbQNXPLoCG",
    "74BSVo5XxxlOOWKstr8doF",
    "2zM1zEjv2JX1qTmSDeB8IL",
    "0P2sfcfRD0lWw4b8eXegmR",
    "4wtR6HB3XekEengMX17cpc",
    "3dxDj8pDPlIHCIrUPXuCeG",
    "2eQJgD95d6EoWiyYaGgO2A",
    "0xfcqMqf1yYNbOf0pw5LE1"
  ],
  "psytrance": [
    "3nwUX7DkMuGPcuHrOXN5VM",
    "5gXKDmafOQ8i4lYr62wxTk",
    "4zh13oEiKl6W8qn9zsdQrp",
    "2wy29RBixBECDOsXuBs7md",
    "1ZJWsMwJ5kHS1lmZKNc6Hs",
    "4v5EG2flB6MMrso1xbtY34"
  ],
  "dnb": [
    "2utAuZWOq0Staky6RgtfLE",
    "0G7qyvqwjfMdHZn4RwiAdf",
    "04OxTCLGgDKfO0MMA2lcxv",
    "6LW3Z1GqbL78TIjfDyg4zp",
    "5IfSQQzGijWKd7dbkbqHuN",
    "0E6ko3vJNG1534Scb1IqOc",
    "5PuJ00qKGWqbGeeWbt8WJb",
    "1d0YPdf2S9muoxcxLKzfJC",
    "3tZKrJ0EznJE4e5cn41Dfz",
    "11Gypesywvx4AnUeYxeLaY"
  ],
  "ukg": [
    "1n0MDSnWrdOWWRGZnRd7Ep",
    "5fWkhoVosVf0sRlGS4P9y5",
    "0UzsDmdpw0Q14KU4hieQss",
    "2Np6ZbVFXfhlk3Oin6i92t",
    "1YGxSgWIWqxKuLLocPVxhC",
    "2aoWvGMW6W40WelevwsOUx",
    "346F7P0kUbfsnVDjoNuBIo",
    "6Z0T5d90QWQdUUE0p1XMci"
  ],
  "bigbeat": [
    "3Pb9QabepyR9e9D8NqorPH",
    "1FNvrp5K02oThumS6gllzp",
    "1auX4gkGe7hbrOH0BXdpV4",
    "6TrsUeqTOaRsKh3fIlpE1t",
    "6AyXbkn4cwrErFIMbRBRDs",
    "7o9PkTfxL0Mm7gk3Bp98hv",
    "7kXmJwrZGIhDaLT9sNo3ut"
  ],
  "jungle": [
    "55K24vPjLgAX8yLAq8fErj",
    "4TOIdyhxz1xgAlrrz2HHhT",
    "2Q9F3D53QeclwbsY24cuxO",
    "7aubh20fHrSDTvNyjop5rK",
    "3fjOBczbzIm1HnYcam47YV",
    "6c21bVRfGC8IOXvQVQ2UTb",
    "2UhXctoL90K4p2p4q0izsh"
  ],
  "dubstep": [
    "4rwpZEcnalkuhPyGkEdhu0",
    "5tMgzjTvBno3TE6Yo1zUtv",
    "01fYzmjHLT81Cwvh8I3r9U",
    "56rRJNtJ9NiUU6fKkHdDDN",
    "7569Hbv0FUS7vjkdGvdgeZ",
    "5Z9gjSD3mglkexfM8QbGHo",
    "3507Teuh1vj1L5eMAJj80O",
    "32AV76N8GhpnJ74VoYfDGk",
    "3svdq1Crgj8IMezbI1K6cO",
    "42tGPgQdhmHLPwJosvBVge"
  ],
  "futurebass": [
    "2ZYz5aPLnEkGR1DfWGZGn6",
    "6jq6rcOikCZAmjliAgAmfT",
    "4yiZRvxlnnof4pKzxXGUpc",
    "0qH4xYxCrvqO86YyLbkTrB",
    "3vv9phIu6Y1vX3jcqaGz5Z",
    "3MEYFivt6bilQ9q9mFWZ4g",
    "1LeItUMezKA1HdCHxYICed",
    "2Th9BGKvfZG8bKQSACitwG",
    "05q78FY1IOa85XzPipVmvJ",
    "01hOePkMROzuD5h3nq2JSO"
  ],
  "trap": [
    "097ivRfD5gBHjqhwEMifOT",
    "01XFgRZfZI7oBagNf1Loml",
    "0tAFy8LVdMQgW6A6Nq7olS",
    "67wkHfeE9pKUoElc2MHofG",
    "4YIoQqE50AdyG4BQafCi3u",
    "6cZYAreYA6W2pcyDwaS4V0",
    "1qm9MfTAoEixNPSqshHqfV",
    "4FKRT4uPFx2L4exy9DCs1o",
    "60tToQgGBi2ZxHLMqkcy5h"
  ],
  "meldubstep": [
    "2U0pVx4m1Kdm1Gsjjm6iq8",
    "49o6YjBAnjwPKLcXwIH53Z",
    "7F1CiKqrY44kh5cDqwHOnx",
    "4uZuF80Yw8KgW6d7wtmRlw",
    "31cX56mMJcLXaTJljNxsu7",
    "4nkBL9MVNCSfUJpNHKeiyb",
    "2beZ579sBbQeEMyUVLhgK1",
    "3lzmoZIPWJxew5Tjyi715j"
  ],
  "glitchhop": [
    "5pusGtgNOBo2PnRMWuz8L2",
    "4c9FIjxXYYEyD9iH02fvbu",
    "3WS7spXVlbeC5kjePmHMQW",
    "2MoGw5gBiQLWhdfG6Gxklj",
    "13i1xqfyIJrM451izr3M01",
    "6bC7spF0E7vVSFVN7DQ7dD",
    "2x7yuFzNDoD2BABAlZEk2L"
  ],
  "hardstyle": [
    "2ODL67XP6x6PYflx4RkXxs",
    "2kkh8Z3tlBDY8jhT4bWrC6",
    "3iKcDwqwMf6O547uQcyjaO",
    "2QZj7flz7uz5GGPxL2w19C",
    "6oR7gTT3UM4w0zW58W7OYU",
    "4dmjpz24ODZ4V5WernmGQ4",
    "1ZTM5hicrRxYxix4jcwIPY",
    "5Oh48t8W8xH1GTZ6fa6502"
  ],
  "happyhardcore": [
    "73aOM4jyU3begiIYxYUd89",
    "3G1SVODcssMmS5YM5G3tun",
    "3SaQ1V2dHOrDyViaN1IEmz",
    "2sEeRKHVONJGERCwKCW2ix",
    "4YApyBBCOnE0KSefgQQgjS",
    "6L931X4LbkLbvOpJp04YbE",
    "27R40llvf0YKPQAKoS9jNz"
  ],
  "gabber": [
    "6DuXNe14wTzP0GGa2mWsml",
    "0rwcI97IXXNEhDWVYis9Pg",
    "2R5w6vL4VWcbZ4UGIUzPdX",
    "6jhf61oaUwlxvsaOvAeAw8",
    "0YiOkYXWTaFda3ZttdkPuD"
  ],
  "phonk": [
    "4oMyggIzClkOcCTvotFLkP",
    "6qyS9qBy0mEk3qYaH8mPss",
    "3CLSHJv5aUROAN2vfOyCOh",
    "2ksyzVfU0WJoBpu8otr4pz",
    "6nqdgUTiWt4JbABDurkxMI",
    "6gncOxbhnZI7a1xMtxjkXp",
    "2c5Rzmr7oBFromKBznnwhz"
  ],
  "amapiano": [
    "5VGoJV02KbfPGhS764PwoH",
    "4qm0rzVQA3kqQ0yA7LkuFK",
    "7zJYbquljYLkTShkGhiBTX",
    "71JcMmqaJ2rGxxTcufwkSg",
    "2dTQe0W5KXs6TNVV7yi2oS",
    "5tpft20jhQvRlG3O7XfwWy",
    "5aIVCx5tnk0ntmdiinnYvw"
  ],
  "moombahton": [
    "3oZoXyU0SkDldgS7AcN4y4",
    "1VjBIt79eNkiIEsLExcBOa",
    "6jgW3aGIRhVnZh5eLG0b3r",
    "7hTA34zHD3gRagk4U5qB2i",
    "1lhpyjqKywDlNjw4nii2ZO"
  ],
  "synthwave": [
    "0U0ldCRmgCqhVvD6ksG63j",
    "6mB9A9YLbY4jxpKX5EYAnT",
    "7oxnK2wg8qFv8EXyyxKDJ4",
    "5ovzDxwSZfrpqZ8LubPV7X",
    "20ztml2STRF7Sq1UaBB6ox",
    "6COsFwxCkIpXBYw4iiVWH4",
    "6sm8udxa0SvDUMJ2jchWe7"
  ]
};
