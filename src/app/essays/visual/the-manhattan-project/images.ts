/**
 * Manhattan Project Visual Essay - Image Assets
 * 
 * All images are U.S. Government works (Public Domain) or verified public domain
 * from authoritative institutional archives (NARA, LANL, DOE, Library of Congress)
 * 
 * Source documentation: ./IMAGE_SOURCES.md
 */

export interface ArchivalImage {
  src: string;
  alt: string;
  caption: string;
  source: string;
  date?: string;
  photographer?: string;
}

// Hero Section Images
export const heroImages = {
  trinityTower: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Trinity_Test_Site_-_Gadget_and_Tower.jpg/800px-Trinity_Test_Site_-_Gadget_and_Tower.jpg",
    alt: "The Trinity test tower with 'The Gadget' suspended at 100 feet",
    caption: "The 100-foot tower at Trinity Site with the Gadget suspended, July 15, 1945",
    source: "Los Alamos National Laboratory",
    date: "July 15, 1945"
  },
  trinityFireball: {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/78/Trinity_Test_Fireball_16ms.jpg",
    alt: "Trinity test fireball 0.016 seconds after detonation",
    caption: "The Trinity fireball 16 milliseconds after detonation — the surface temperature exceeded that of the sun",
    source: "Los Alamos National Laboratory / Berlyn Brixner",
    date: "July 16, 1945",
    photographer: "Berlyn Brixner"
  },
  trinityMushroom: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Trinity_Detonation_T%26B.jpg/800px-Trinity_Detonation_T%26B.jpg",
    alt: "Trinity test mushroom cloud rising into the sky",
    caption: "The mushroom cloud rose 8 miles into the New Mexico sky",
    source: "U.S. Army",
    date: "July 16, 1945"
  },
  oppenheimer: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Oppenheimer_%28cropped%29.jpg/440px-Oppenheimer_%28cropped%29.jpg",
    alt: "J. Robert Oppenheimer, scientific director of the Manhattan Project",
    caption: "J. Robert Oppenheimer — 'Now I am become Death, the destroyer of worlds.'",
    source: "Los Alamos National Laboratory",
    date: "1944"
  }
};

// Prologue Images
export const prologueImages = {
  einstein: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/440px-Albert_Einstein_Head.jpg",
    alt: "Albert Einstein, the famous refugee physicist",
    caption: "Einstein at his Princeton study. The pacifist who would set history on an irreversible course.",
    source: "Library of Congress",
    date: "1947"
  },
  einsteinLetter: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Einstein-Roosevelt-letter.png/440px-Einstein-Roosevelt-letter.png",
    alt: "The Einstein-Szilard letter to President Roosevelt",
    caption: "The letter that launched the atomic age — Einstein's signature would haunt him for the rest of his life",
    source: "Franklin D. Roosevelt Presidential Library",
    date: "August 2, 1939"
  }
};

// Chapter 1 Images - Chain Reaction
export const chapter1Images = {
  chicagoPile: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/56/Chicago_pile_-_making_CP-1_-_critical_assembly_-_Fermi.jpg",
    alt: "Chicago Pile-1, the first nuclear reactor, beneath Stagg Field",
    caption: "The graphite pile beneath the University of Chicago's squash court achieved the first self-sustaining nuclear chain reaction",
    source: "Argonne National Laboratory",
    date: "December 2, 1942"
  },
  fermi: {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Enrico_Fermi_1943-49.jpg",
    alt: "Enrico Fermi, architect of the first nuclear reactor",
    caption: "Fermi's preternatural calmness was legendary — he calculated survival odds during the Trinity test",
    source: "National Archives",
    date: "1943-1949"
  },
  cp1Team: {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/19/Chicago_pile_one_at_the_first_self-sustained_nuclear_chain_reaction.jpg",
    alt: "The Chicago Pile-1 team on the squash court steps",
    caption: "'The Italian navigator has just landed in the new world.' — The team that achieved the first chain reaction",
    source: "University of Chicago",
    date: "December 2, 1942"
  }
};

// Chapter 2 Images - Secret City
export const chapter2Images = {
  losAlamosGate: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Main_Gate_Los_Alamos.jpg/800px-Main_Gate_Los_Alamos.jpg",
    alt: "The main gate at Los Alamos with guards",
    caption: "The only entrance to Site Y. All mail was censored, all lives classified.",
    source: "Los Alamos National Laboratory",
    date: "1944"
  },
  losAlamosPostOffice: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Los_Alamos_Post_Office.jpg/800px-Los_Alamos_Post_Office.jpg",
    alt: "PO Box 1663 — the only mailing address for all of Los Alamos",
    caption: "Every letter, every package — addressed to a single PO Box. The whole city existed in secret.",
    source: "Los Alamos National Laboratory",
    date: "1944"
  },
  losAlamosFamilies: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Los_Alamos_housing.jpg/800px-Los_Alamos_housing.jpg",
    alt: "Scientists' families in makeshift housing at Los Alamos",
    caption: "Children were born in a city that didn't exist. Their birth certificates listed PO Box 1663.",
    source: "Los Alamos Historical Society",
    date: "1944"
  },
  oppenheimerHat: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/JROppenheimer-LosAlamos.jpg/440px-JROppenheimer-LosAlamos.jpg",
    alt: "J. Robert Oppenheimer in his trademark porkpie hat",
    caption: "Eyes that saw too much — Oppenheimer at Los Alamos",
    source: "Los Alamos National Laboratory",
    date: "1944"
  },
  groves: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Leslie_Groves.jpg/440px-Leslie_Groves.jpg",
    alt: "General Leslie Groves in uniform",
    caption: "The man who built the impossible — Groves managed 125,000 workers and billions of dollars in total secrecy",
    source: "U.S. Army",
    date: "1944"
  },
  grovesOppenheimer: {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Groves_Oppenheimer.jpg",
    alt: "General Groves and Oppenheimer at Trinity ground zero",
    caption: "Groves and Oppenheimer examine the remains of the Trinity tower at ground zero",
    source: "U.S. Army",
    date: "September 1945"
  }
};

// Chapter 3 Images - The Minds
export const scientistImages = {
  bohr: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Niels_Bohr.jpg/440px-Niels_Bohr.jpg",
    alt: "Niels Bohr in contemplation, pipe in hand",
    caption: "The father figure — Bohr escaped Nazi-occupied Denmark and arrived under the codename 'Nicholas Baker'",
    source: "Nobel Foundation",
    date: "1922"
  },
  feynman: {
    src: "https://upload.wikimedia.org/wikipedia/en/4/42/Richard_Feynman_Nobel.jpg",
    alt: "Richard Feynman, the irreverent genius",
    caption: "The youngest group leader at Los Alamos, age 24. His wife died while he worked on the bomb.",
    source: "Nobel Foundation",
    date: "1965"
  },
  feynmanLosAlamos: {
    src: "https://upload.wikimedia.org/wikipedia/en/e/e2/Feynman_at_Los_Alamos.jpg",
    alt: "Richard Feynman at Los Alamos with colleagues",
    caption: "Feynman (center) at Los Alamos — cracked safes for fun, played bongos, drove security crazy",
    source: "Los Alamos National Laboratory",
    date: "1944"
  },
  szilard: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Leo_Szilard.jpg/440px-Leo_Szilard.jpg",
    alt: "Leo Szilard, the conscience of the project",
    caption: "Conceived the chain reaction in 1933, drafted the Einstein letter, then petitioned against using the bomb on civilians",
    source: "Department of Energy",
    date: "1940s"
  },
  teller: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/EdwardTeller1958.jpg/440px-EdwardTeller1958.jpg",
    alt: "Edward Teller, the hawk",
    caption: "Even during the Manhattan Project, Teller was obsessed with building something bigger — the hydrogen bomb",
    source: "Los Alamos National Laboratory",
    date: "1958"
  },
  bethe: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Hans_Bethe.jpg/440px-Hans_Bethe.jpg",
    alt: "Hans Bethe at the blackboard",
    caption: "The calculator — Bethe led the Theoretical Division and figured out how stars produce energy",
    source: "Cornell University",
    date: "1940s"
  }
};

// Chapter 4 Images - The Gadget
export const gadgetImages = {
  assembly: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Trinity_device_being_assembled.jpg/800px-Trinity_device_being_assembled.jpg",
    alt: "Scientists assembling the Trinity device",
    caption: "The device that would divide human history into before and after",
    source: "Los Alamos National Laboratory",
    date: "July 1945"
  },
  gadgetHoisted: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Trinity_Test_Site_-_Gadget_and_Tower.jpg/800px-Trinity_Test_Site_-_Gadget_and_Tower.jpg",
    alt: "The Gadget being hoisted to the top of the Trinity tower",
    caption: "The Gadget suspended atop the 100-foot tower — less than 24 hours before detonation",
    source: "Los Alamos National Laboratory",
    date: "July 15, 1945"
  },
  implosionLenses: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Explosive_Lenses_for_Fat_Man.jpg/800px-Explosive_Lenses_for_Fat_Man.jpg",
    alt: "Explosive lens assembly for the implosion bomb",
    caption: "32 explosive lenses arranged in perfect symmetry — if even one was off, the bomb would fizzle",
    source: "Los Alamos National Laboratory",
    date: "1945"
  },
  plutoniumCore: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Partially-reflected-plutonium-sphere.jpeg/440px-Partially-reflected-plutonium-sphere.jpeg",
    alt: "A plutonium sphere similar to the bomb's core",
    caption: "The heart of the bomb — 6.2 kg of plutonium-239, warm to the touch from radioactive decay",
    source: "Los Alamos National Laboratory",
    date: "1945"
  }
};

// Chapter 5 Images - Trinity
export const trinityImages = {
  towerNight: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Trinity_shot_color.jpg/800px-Trinity_shot_color.jpg",
    alt: "Trinity test site before detonation",
    caption: "The last moments before the atomic age began",
    source: "Los Alamos National Laboratory",
    date: "July 16, 1945"
  },
  towerWithGadget: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Trinity_Test_Site_-_Gadget_and_Tower.jpg/800px-Trinity_Test_Site_-_Gadget_and_Tower.jpg",
    alt: "The Trinity tower at night, The Gadget suspended at 100 feet",
    caption: "5:29 AM — the final countdown begins",
    source: "Los Alamos National Laboratory",
    date: "July 15, 1945"
  },
  fireball006: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Trinity_explosion.jpg/800px-Trinity_explosion.jpg",
    alt: "Trinity fireball at 0.006 seconds",
    caption: "0.006 seconds — the impossible brightness of a new sun",
    source: "Los Alamos National Laboratory / Berlyn Brixner",
    date: "July 16, 1945",
    photographer: "Berlyn Brixner"
  },
  fireball016: {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/78/Trinity_Test_Fireball_16ms.jpg",
    alt: "Trinity fireball at 0.016 seconds",
    caption: "0.016 seconds — surface temperature hotter than the sun",
    source: "Los Alamos National Laboratory / Berlyn Brixner",
    date: "July 16, 1945",
    photographer: "Berlyn Brixner"
  },
  fireball025: {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Trinity_Test_Fireball_25ms.jpg",
    alt: "Trinity fireball at 0.025 seconds",
    caption: "0.025 seconds — the expanding sphere of nuclear fire",
    source: "Los Alamos National Laboratory / Berlyn Brixner",
    date: "July 16, 1945",
    photographer: "Berlyn Brixner"
  },
  mushroomCloud: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Trinity_Detonation_T%26B.jpg/800px-Trinity_Detonation_T%26B.jpg",
    alt: "Trinity mushroom cloud at full development",
    caption: "Eight miles high — visible from 100 miles away",
    source: "U.S. Army",
    date: "July 16, 1945"
  },
  groundZero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Groves_Oppenheimer.jpg",
    alt: "Groves and Oppenheimer at Trinity ground zero",
    caption: "Oppenheimer and Groves examine the remains of the tower base — the sand had fused into green glass",
    source: "U.S. Army",
    date: "September 1945"
  },
  trinitite: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Trinitite.jpg/800px-Trinitite.jpg",
    alt: "Trinitite — desert sand fused into glass by the nuclear explosion",
    caption: "The crater, fused sand turned to green glass (trinitite) — the radioactive footprint of the atomic age",
    source: "Los Alamos National Laboratory",
    date: "1945"
  }
};

// Chapter 6 Images - The Decision
export const decisionImages = {
  trumanPotsdam: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Potsdam_conference_1945-8.jpg/800px-Potsdam_conference_1945-8.jpg",
    alt: "President Truman at the Potsdam Conference with Stalin and Churchill",
    caption: "Truman at Potsdam — 82 days into his presidency, he learned of the bomb's existence",
    source: "U.S. Army Signal Corps",
    date: "July 1945"
  },
  truman: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/TRUMAN_58-766-09_%28cropped%29.jpg/440px-TRUMAN_58-766-09_%28cropped%29.jpg",
    alt: "President Harry S. Truman, 1945",
    caption: "'The most terrible thing ever discovered' — Truman authorized its use without apparent hesitation",
    source: "Harry S. Truman Library",
    date: "1945"
  }
};

// Chapter 7 Images - Hiroshima
export const hiroshimaImages = {
  enolaGay: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/B-29_Enola_Gay_w_conditioned_air_cart.jpg/800px-B-29_Enola_Gay_w_conditioned_air_cart.jpg",
    alt: "The Enola Gay on Tinian Island",
    caption: "Named after pilot Paul Tibbets' mother — 12 hours to target",
    source: "U.S. Army Air Forces",
    date: "August 1945"
  },
  tibbets: {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Tibbets-wave.jpg",
    alt: "Colonel Paul Tibbets waving from the Enola Gay cockpit",
    caption: "Tibbets waves from the cockpit before takeoff — August 6, 1945",
    source: "U.S. Army Air Forces",
    date: "August 6, 1945"
  },
  hiroshimaBefore: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Hiroshima_before_and_after.png/800px-Hiroshima_before_and_after.png",
    alt: "Hiroshima before the atomic bomb",
    caption: "Hiroshima — August 5, 1945. A city of 350,000.",
    source: "U.S. Army Air Forces",
    date: "August 5, 1945"
  },
  hiroshimaAfter: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Hiroshima_aftermath.jpg/800px-Hiroshima_aftermath.jpg",
    alt: "Hiroshima after the atomic bomb — complete devastation",
    caption: "The city disappeared in 43 seconds",
    source: "U.S. Army Air Forces",
    date: "August 7, 1945"
  },
  hiroshimaCloud: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Atomic_cloud_over_Hiroshima_-_NARA_542192_-_Edit.jpg/440px-Atomic_cloud_over_Hiroshima_-_NARA_542192_-_Edit.jpg",
    alt: "Mushroom cloud over Hiroshima",
    caption: "8:15 AM local time — 80,000 killed instantly",
    source: "National Archives (NARA)",
    date: "August 6, 1945"
  },
  humanShadow: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Human_Shadow_Etched_in_Stone.jpg/440px-Human_Shadow_Etched_in_Stone.jpg",
    alt: "Human shadow burned into the Sumitomo Bank steps",
    caption: "A human, vaporized. Their shadow remains, burned into stone. This image contains everything.",
    source: "Hiroshima Peace Memorial Museum",
    date: "1945"
  }
};

// Chapter 8 Images - Nagasaki
export const nagasakiImages = {
  fatMan: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Fat_man.jpg/800px-Fat_man.jpg",
    alt: "Fat Man atomic bomb",
    caption: "Fat Man — the plutonium implosion bomb, more powerful than Little Boy",
    source: "U.S. Navy",
    date: "August 1945"
  },
  nagasakiCloud: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Nagasakibomb.jpg/440px-Nagasakibomb.jpg",
    alt: "The Nagasaki mushroom cloud — the iconic color photograph",
    caption: "The only color photograph of a nuclear weapon used in war — August 9, 1945",
    source: "Charles Levy / U.S. Army",
    date: "August 9, 1945",
    photographer: "Charles Levy"
  },
  urakamiCathedral: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Urakami_Cathedral_-_The_Atomic_Bomb_Museum_in_Nagasaki.jpg/440px-Urakami_Cathedral_-_The_Atomic_Bomb_Museum_in_Nagasaki.jpg",
    alt: "The Urakami Cathedral in ruins",
    caption: "The largest Christian church in Asia, destroyed. Its congregation had gathered for confession.",
    source: "Nagasaki Atomic Bomb Museum",
    date: "1945"
  }
};

// Chapter 9 Images - The Reckoning
export const reckoningImages = {
  oppenheimerMedal: {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Groves_Oppenheimer.jpg",
    alt: "Oppenheimer with Groves after the war",
    caption: "The hero of Los Alamos — honored by the nation he would soon be accused of betraying",
    source: "U.S. Army",
    date: "1945"
  },
  oppenheimerHearing: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Atomic_Energy_Commission_Hearing.jpg/800px-Atomic_Energy_Commission_Hearing.jpg",
    alt: "Oppenheimer at his security hearing",
    caption: "The architect of American nuclear supremacy, on trial for disloyalty",
    source: "Associated Press",
    date: "1954"
  },
  oppenheimerLate: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/JROppenheimer-1958.jpg/440px-JROppenheimer-1958.jpg",
    alt: "Oppenheimer in his final years, gaunt and haunted",
    caption: "The destroyer of worlds, destroyed. He died in 1967, never fully rehabilitated.",
    source: "Philippe Halsman",
    date: "1958",
    photographer: "Philippe Halsman"
  }
};

// Epilogue Images
export const epilogueImages = {
  genbakuDome: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Genbaku_Dome04-r.JPG/800px-Genbaku_Dome04-r.JPG",
    alt: "Hiroshima Peace Memorial (Genbaku Dome)",
    caption: "The only structure left standing near the hypocenter — preserved as a monument to peace",
    source: "UNESCO World Heritage",
    date: "Present day"
  },
  peacePark: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cenotaph_Hiroshima.jpg/800px-Cenotaph_Hiroshima.jpg",
    alt: "Hiroshima Peace Memorial Park with eternal flame",
    caption: "The eternal flame will burn until all nuclear weapons are abolished",
    source: "Hiroshima Peace Memorial Museum",
    date: "Present day"
  }
};

// Export all images as a single object for convenience
export const allImages = {
  hero: heroImages,
  prologue: prologueImages,
  chapter1: chapter1Images,
  chapter2: chapter2Images,
  scientists: scientistImages,
  gadget: gadgetImages,
  trinity: trinityImages,
  decision: decisionImages,
  hiroshima: hiroshimaImages,
  nagasaki: nagasakiImages,
  reckoning: reckoningImages,
  epilogue: epilogueImages
};

