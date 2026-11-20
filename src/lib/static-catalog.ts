import type { StoreApp } from "./types";

/**
 * Bundled snapshot of the NG Studio Play Store catalogue.
 * Used as the fallback when Google Play can't be reached, and to enrich
 * live data with hand-written highlights and accent colours.
 *
 * To hand-edit a game, change it here. New games published on Google Play
 * appear automatically (see playstore.ts) even if they are not listed here.
 */

const PLAY = "https://play-lh.googleusercontent.com/";
const store = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;

export const STATIC_APPS: StoreApp[] = [
  {
    id: "com.ngstudio.ballsadventure",
    slug: "balls-adventure",
    name: "Balls Adventure: Roll Ball 3D",
    tagline: "Roll your ball across 3000 sky-high 3D levels. Dodge traps and play offline!",
    description:
      "Roll, balance and race your ball across floating wooden tracks high above a sparkling lagoon! Balls Adventure is a relaxing yet challenging 3D rolling ball game: hold to roll, steer with one finger and guide your ball past traps, gaps and moving obstacles all the way to the finish line.\n\nTravel through Morning Lagoon, Bright Noon, Golden Sunset, Misty Dawn, Snowy Peaks, Desert Oasis, Lantern Night and Candy Land. Every world brings its own look and a signature challenge.",
    category: "GAME_CASUAL",
    genre: "Casual",
    kind: "game",
    icon: PLAY + "QP3vIbJSI9r-8t9F7mX2195hzBD72d4lJTGARQOnCq4FCnVsLucBm1tIQuDwGTd8fOhWuV57iJx3DH7nNvjjEw0",
    banner: PLAY + "NdsaCrBaBQ82dtPXw2QfvEb4Ev3xa9LFlnkOfnpbx--LadvNxGEDlRgXYNX0rK2qnXiqm-yUBGsXT_g0Ngqr8j8",
    screenshots: [
      PLAY + "Z4ET7pZaDCK3D7u7HlK_7vxqYiZnK4p03AEsLjRqSOLliTKnlHFO6ErHR5Ie3X_5cbVsPdx46-y9rqhdGItT",
      PLAY + "Qb54O27GnQkQyJHQZTTtj-lNQb_2bOY36vuSKvWIY-6zgniZzXxg-j66wwMzATfo5KOY1Ii7FT7ONAbmq_Dp",
      PLAY + "xi6EYI8A3al7HwD7Iy2FedOVk_d6oHnJ0m0hKxyfOz7LBpvcGVDasEQ4jgeJA1IYmJdjYcJSWoedTMtGIoVkZA",
      PLAY + "kBtuu4v5aR2fuos9cTkCgcUI8gZUSjdU0TCxvOo1Tbg6O6ZGo522s_hx2EalXFXSvyAb7HNdImiP4OXVdGqA",
      PLAY + "Wuh-NzAKGuT-X1TSgcfBCTvuOSyiNr788ME7oQ-zsIKyZsI83Bbp4NHO36zIOlzRBcrY_7ELl1xMq0u3XcE_",
    ],
    updated: "Nov 19, 2026",
    highlights: ["3000 levels", "8 worlds", "Plays offline", "One-finger controls"],
    accent: "#0EA5E9",
    storeUrl: store("com.ngstudio.ballsadventure"),
  },
  {
    id: "com.ngstudio.fluffybirdsdrop",
    slug: "nest-box",
    name: "Nest Box: Bird Color Sort",
    tagline: "Sort fluffy birds into nest crates! A cozy color sort puzzle with 5000 levels.",
    description:
      "Help the fluffy Pufflings find their way home! Nest Box is a cute and clever color sort puzzle. Drag colorful nest crates across the board, scoop up the birds that match each crate, and send every full crate flying home.\n\nIt's easy to learn, relaxing to play and a real brain workout as the levels get harder. Birds of other colors block the way, so plan every move.",
    category: "GAME_PUZZLE",
    genre: "Puzzle",
    kind: "game",
    icon: PLAY + "XTb5yItPz7Mt4T0-wGcMVFF8QFYqd3cscBx1KUx29jbvsLxombGtarTCqQpHr-HMPiluOFC2zAoThp4wOyW4cw",
    banner: PLAY + "P-jc_yZzgooEW0ySYTFMhkkP_Oy9xcFJAXGdYgy-fZzlK0yGZ4DuNEcd5tgJFFGfbJG1_Q3cwYBY24SjWm-l",
    screenshots: [
      PLAY + "_AaydMkTjtGWM-TinFFhqrwCJ4rxmYmgjMK0MnzgLuN-grFQ7ilMS0_8K5z3fHuoNyFkpP8KFc_4yzcn0rBG7g",
      PLAY + "UTxmFyML2vYWiJKOt9JZhCh8w1vZMgsnIxGVPj4LA5siwqeCIAkrZWRQ0ieOmcKgglrxlks9WrfFT-GbeLft",
      PLAY + "IKl4MFSgn8q_0JU6rmYlMQ5-Ez-O4rPGX5zh-Bgyeu2aAGhuGqYporBkZ3J4YOfUt-P3tkMpCDznvfa0ljdcNg",
      PLAY + "IdSSgt46Vj-y02kaL5uFesLXKrnLRXMu9zE801cPgEhBtxNqu2BLu1PeKjBYWuZKQ82EEuazNnY6-6uU6pgq1w",
      PLAY + "t7KdoiLn1kIHo4FS-NClPp1nGkFVeShA_qQ-bz8nTgEBWbSbS3lz15-YZm85Oskg_fhCe59-uBHyHH_dxxwgPA",
    ],
    updated: "Nov 18, 2026",
    highlights: ["5000 levels", "Cozy & relaxing", "Brain workout", "Cute Pufflings"],
    accent: "#F59E0B",
    storeUrl: store("com.ngstudio.fluffybirdsdrop"),
  },
  {
    id: "com.ngstudio.puzzlelab.braingames",
    slug: "puzzle-lab",
    name: "Puzzle Lab: Block, Zip & Arrow",
    tagline: "Block, Zip, Arrow, Patches & Box: 5 brain puzzle games in one. Free & offline!",
    description:
      "Puzzle Lab brings five of today's most addictive brain puzzles together in one beautifully designed app. Block, Zip, Arrow, Patches and Box — switch between them anytime, play offline, and train your brain with thousands of handcrafted levels.\n\nNo sign-up. No internet needed. Just pure puzzle fun.",
    category: "GAME_PUZZLE",
    genre: "Puzzle",
    kind: "game",
    icon: PLAY + "5-OctiOQ3HcARjoEJ5L_kNCcssfMcNcFBKmb2pmwO_Sly_A3TvAkI3RKyjLXOi5ttBjt2n6htcphbDXvqwhU_A",
    banner: PLAY + "kDLqvqDFz0NyheFJ_I-9tcTnmanqNfeSywkcv_xkwsrKQQnZVrJ3IdDoEXh_4gxHJ0xjAlt_HQXygdSad85Q",
    screenshots: [
      PLAY + "0uuuWDH-nLxONiIg9tkq_fEJeq5INMoeiQIa-0o7rHE75CLiQvyYS3Aouf7rT51sP_yJccpdHPZ3Y2dKtNns37k",
      PLAY + "suAZFQdAudNas34KC6Q9mfDmeTPUqvDxqmCjpguAWORJ5oFhNd8dnxYDswDBF9n54pDMle3-JwdVN9Enup-3",
      PLAY + "2MYafqwkT5agywOOdnIi3OzSkNOCFF2Gi8DrTfW7UK2QX4Sdha4vwmR8nJHtgvxPvtYcTZCzrHQniMCR9WIFHQ",
      PLAY + "pgOIYooQKT8BXdc2CAQ1ZSDKE8eJDOrrkznwuVVKPIhwW2r9sj1swnj6UBunZtwd8-M2Asx7rKbqzbbKSBAnYA",
      PLAY + "wO-obF4SN5p7mPyI-3zwkgQRYFSBApSulOFh8yhSzu94mGtEWE6EBonHHT8DkAzykN-PYQP3YgIm0V2pj8uf",
    ],
    updated: "Nov 6, 2026",
    highlights: ["5 games in 1", "Thousands of levels", "No sign-up", "Plays offline"],
    accent: "#14B8A6",
    storeUrl: store("com.ngstudio.puzzlelab.braingames"),
  },
  {
    id: "com.ngstudio.puzzellab.colorpath",
    slug: "color-path",
    name: "Color Path: Draw the Line 3D",
    tagline: "Draw the color line, paint every road & relax in this 3D hold-to-go runner!",
    description:
      "The relaxing hold-to-paint road runner. Tap and hold to send your shape gliding down the road, drawing a bright color line behind it. Let go to stop and wait for the perfect gap, then hold again to race through.\n\nEasy to learn, hard to put down — the calm color line game your thumb has been waiting for.",
    category: "GAME_CASUAL",
    genre: "Casual",
    kind: "game",
    icon: PLAY + "DgJuTRKOy7_MBBdouK9bn61l_Wrh-LMTBb--11dsjHvR_-lR1aWiNF4qjSIcmv-NYGqpNTyZK42Q9oJl_BG94Ek",
    banner: PLAY + "uZ_mLopNKqUKjTW8xu4XGFdj0zY8V-WZaok5yzyk7c3RSowmyoX88Byivq6pdK5IoIIpL1YTSGRfPQbhHccabA",
    screenshots: [
      PLAY + "MPFjOCo2UaQWWGXzbOattULUo41u9mZKT-WXgOUzsk6w7lBs2TsKME86sw5Q4M5tDoX9XSDn_GmoIn3wkXdf",
      PLAY + "LARY04kHOp8flATSOTedzMc6p9s8P-8_HFqVmjfn4z404TH3Qn1ktswpKxlEwqNQYnDw3wHb5U0sHDm403Im1w",
      PLAY + "-S9kXIe2T-8uuINjvQT0WpYwtY4Y_0ru-M_4uHleXYIn37BPu8NG3T53FJ8-3mkH_6can0oqldmCzfcrSki8",
      PLAY + "aSibBe9BeFkT1fUjZLTnL2Ew8G7py7wF-4x5Qu-N7DkKiFdi28L27G2HlWX1_r8_A3sc489_xhif_G94BcV8",
      PLAY + "YPVDlJNpk6LNhERAfPaQJztVy33ElojgSvcsOF04PE4Qm7moYInwhje91NkYq2bn7u9-9CtKBQmLk_q6tAD9",
    ],
    updated: "Nov 5, 2026",
    highlights: ["3,000 levels", "100 shapes", "100 color trails", "30 monuments"],
    accent: "#F43F5E",
    storeUrl: store("com.ngstudio.puzzellab.colorpath"),
  },
  {
    id: "com.ngstudio.landrush.paperclash",
    slug: "paper-clash",
    name: "Paper Clash: io Territory",
    tagline: "Draw, conquer territory & grab land in this candy .io arena clash game!",
    description:
      "Draw. Conquer. Rule the arena! Paper Clash is the sweetest territory .io game around. Move your candy across the arena, draw a trail, and close the loop to claim land.\n\nCapture as much territory as you can — but watch out: if a rival crosses your trail before you get home, you're out! One more round always turns into ten.",
    category: "GAME_ARCADE",
    genre: "Arcade",
    kind: "game",
    icon: PLAY + "xN9cX_G2QBK-m2Kdt0JwdrrXN4bNIZRxJr12wDUjOlKwniXe9PtqwksBtHOmii6rGOoKeJDeoE7gUgmzG2da",
    banner: PLAY + "8_3q8oOtDqPV6Xzuc4RN1PboqDIabYgCgFEOUhkdxcUkaOtKT2oCdMtlezXLyhJJMs4drmwXEdhqZR_orsxK",
    screenshots: [
      PLAY + "qxgpid1c4CSxqmFxi0pKp88vOoG3opNJfyi3ma18T5O1_o-C2smhBW4fYlj67aDvVW50ZrA5CLk6Q_VKQLljiw",
      PLAY + "LXO95Hd6Vzkb44j5CycpcjKMVgQcf60dFqWCCfaBC5bIzkkgrpzz9Wdjx-8P2oeI8gPFpS4BlOTKlAUEMV5N",
      PLAY + "rvy3DV-5F0Qsdm06h2O1Lzb-iiZll1TRr2yjE9-01V3SwQtFUBUVOjq9Fne5ChI2BYcBDEySrnigQG657eRq",
      PLAY + "crXq8LZHyzopStfRuUJ1Ia9ab_YZqn8tMO2Ir2_WB-T3bL9yUQdVhJT_UzMmeAs7d1uEC6WHHwcMucI6X3RzBw",
      PLAY + "7x8p-tn0yArdJUVnq2wqiNQxoCXdY9SiEYQ0kHjLwCIpAxmk2AzEXrDdO2mxztKudIiFstFwdcY16NM5LEG8wQ",
    ],
    downloads: "100+",
    rating: 5,
    updated: "Nov 5, 2026",
    highlights: ["Fast .io matches", "100+ candy skins", "Steal territory", "Quick rounds"],
    accent: "#22C55E",
    storeUrl: store("com.ngstudio.landrush.paperclash"),
  },
];
