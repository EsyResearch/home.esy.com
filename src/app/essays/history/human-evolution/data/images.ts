// Verified licensing-safe images for Human Evolution essay
// All URLs verified to return Content-Type: image/*
// Licenses: CC0, CC BY, CC BY-SA, Public Domain

export interface ImageData {
  id: string;
  title: string;
  src: string;
  alt: string;
  caption?: string;
  license: 'CC0' | 'CC BY' | 'CC BY-SA' | 'Public Domain' | 'CC BY-SA FR';
  attribution: string;
  source: string;
}

export const specimenImages: Record<string, ImageData> = {
  lucy: {
    id: "lucy",
    title: "Lucy skeleton",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Lucy_Mexico.jpg",
    alt: "Lucy (Australopithecus afarensis) skeleton reconstruction at the Museo Nacional de Antropologia, Mexico City",
    caption: "Lucy (AL 288-1), the most famous Australopithecus afarensis specimen, ~3.2 million years old",
    license: "Public Domain",
    attribution: "Released to public domain by en:User:danrha",
    source: "Museo Nacional de Antropologia, Mexico City"
  },
  laetoli: {
    id: "laetoli",
    title: "Laetoli footprints replica",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/61/Laetoli_footprints_replica.jpg",
    alt: "Replica of the Laetoli hominin footprints, 3.66 million years old",
    caption: "Laetoli footprints: direct evidence of bipedal walking 3.66 million years ago",
    license: "CC BY-SA",
    attribution: "Momotarou2012, CC BY-SA 3.0, via Wikimedia Commons",
    source: "National Museum of Nature and Science, Tokyo (replica)"
  },
  turkanaBoy: {
    id: "turkana-boy",
    title: "Turkana Boy skeleton",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Turkana_Boy.jpg",
    alt: "Turkana Boy (Nariokotome Boy) Homo ergaster skeleton, ~1.6 million years old",
    caption: "Turkana Boy (KNM-WT 15000): the most complete early human skeleton, showing modern body proportions",
    license: "CC BY-SA",
    attribution: "Claire Houck, CC BY-SA 2.0, via Wikimedia Commons",
    source: "American Museum of Natural History"
  },
  neanderthalSkull: {
    id: "neanderthal-skull",
    title: "Neanderthal skull (La Chapelle-aux-Saints)",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Homo_sapiens_neanderthalensis.jpg",
    alt: "Homo neanderthalensis skull from La Chapelle-aux-Saints, France",
    caption: "Neanderthal skull (La Chapelle-aux-Saints 1), discovered 1908",
    license: "CC BY",
    attribution: "Luna04, CC BY 2.5, via Wikimedia Commons",
    source: "La Chapelle-aux-Saints, France"
  },
  denisovaCave: {
    id: "denisova-cave",
    title: "Denisova Cave",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/11/Den_peschera_anui.jpg",
    alt: "View from Denisova Cave to the Anui River, Altai Mountains, Russia",
    caption: "Denisova Cave: the only site with fossils from Denisovans, Neanderthals, and modern humans",
    license: "CC BY-SA",
    attribution: "CC BY-SA 3.0, via Wikimedia Commons",
    source: "Altai Krai, Russia"
  },
  floresiensisSkull: {
    id: "floresiensis-skull",
    title: "Homo floresiensis skull",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Homo_floresiensis_IMG_2936.JPG",
    alt: "Homo floresiensis skull replica, the 'Hobbit' of Flores Island",
    caption: "H. floresiensis skull: small-brained human species that survived until ~50,000 years ago",
    license: "CC BY-SA FR",
    attribution: "Rama, CC BY-SA 3.0 FR, via Wikimedia Commons",
    source: "Cantonal Museum of Geology, Lausanne"
  },
  nalediSkull: {
    id: "naledi-skull",
    title: "Homo naledi cranial specimens",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/54/Homo_naledi_cranial_paratypes.jpg",
    alt: "Homo naledi cranial paratypes from Rising Star Cave, South Africa",
    caption: "H. naledi skulls: primitive body with human-like hands, lived 335,000-236,000 years ago",
    license: "CC BY",
    attribution: "Lee Roger Berger et al., CC BY 4.0, via Wikimedia Commons",
    source: "eLife Sciences Publications"
  },
  jebelIrhoud: {
    id: "jebel-irhoud",
    title: "Jebel Irhoud skull reconstruction",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Homo_sapiens_from_Jebel_Irhoud.jpg",
    alt: "Composite reconstruction of the earliest known Homo sapiens from Jebel Irhoud, Morocco",
    caption: "Jebel Irhoud: oldest known Homo sapiens fossils, ~315,000 years old",
    license: "CC BY-SA",
    attribution: "Philipp Gunz, MPI EVA, CC BY-SA 2.0, via Wikimedia Commons",
    source: "Max Planck Institute for Evolutionary Anthropology"
  }
};

export const toolImages: Record<string, ImageData> = {
  oldowanChopper: {
    id: "oldowan-chopper",
    title: "Olduvai Chopper",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Olduvai_Chopper.JPG",
    alt: "Oldowan stone chopper from Olduvai Gorge, approximately 1.8 million years old",
    caption: "Oldowan chopper: the earliest systematic stone tool tradition, ~2.6 million years ago",
    license: "CC BY",
    attribution: "Archaeomoonwalker, CC BY 3.0, via Wikimedia Commons",
    source: "British Museum, London"
  },
  acheuleanHandaxe: {
    id: "acheulean-handaxe",
    title: "Acheulean handaxe from Atapuerca",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Bifaz_de_Atapuerca_%28TG10%29.jpg",
    alt: "Bifacial Acheulean handaxe in quartzite from Atapuerca, Spain, ~350,000 years old",
    caption: "Acheulean handaxe: remarkably consistent design across continents for over 1 million years",
    license: "Public Domain",
    attribution: "Jose-Manuel Benito Alvarez (Locutus Borg), Public Domain",
    source: "Trinchera Galeria, Atapuerca, Spain"
  },
  levalloisCore: {
    id: "levallois-core",
    title: "Levallois core",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/25/Levallois_N%C3%BAcleo_Tabuniense.png",
    alt: "Levallois lithic core from Mugharet et-Tabun, Israel",
    caption: "Levallois technique: sophisticated prepared-core method appearing ~400,000 years ago",
    license: "Public Domain",
    attribution: "Jose-Manuel Benito (Locutus Borg), Public Domain",
    source: "Mugharet et-Tabun, Israel"
  },
  blombosOchre: {
    id: "blombos-ochre",
    title: "Blombos Cave engraved ochre",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Blombo.jpg",
    alt: "Engraved ochre stone from Blombos Cave, South Africa, ~77,000 years old",
    caption: "Blombos ochre: earliest known abstract art, with crosshatched geometric patterns",
    license: "CC BY-SA",
    attribution: "Chris S. Henshilwood, CC BY-SA 4.0, via Wikimedia Commons",
    source: "Blombos Cave, South Africa"
  },
  blombosBeads: {
    id: "blombos-beads",
    title: "Blombos Cave shell beads",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/46/BBC-shell-beads.jpg",
    alt: "Nassarius shell beads from Blombos Cave, evidence of early symbolic behavior",
    caption: "Shell beads from Blombos Cave: evidence of personal ornamentation ~82,000 years ago",
    license: "CC BY",
    attribution: "Chris Henshilwood & Francesco d'Errico, CC BY 2.5",
    source: "Blombos Cave, South Africa"
  }
};

export const siteImages: Record<string, ImageData> = {
  olduvaiGorge: {
    id: "olduvai-gorge",
    title: "Olduvai Gorge panorama",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Olduvai_Gorge_or_Oldupai_Gorge.jpg",
    alt: "Panoramic view of Olduvai Gorge in Tanzania",
    caption: "Olduvai Gorge: where the Leakeys made groundbreaking hominin discoveries spanning 2 million years",
    license: "CC BY",
    attribution: "Noel Feans, CC BY 2.0, via Wikimedia Commons",
    source: "Olduvai Gorge Museum, Tanzania"
  },
  riftValley: {
    id: "rift-valley",
    title: "East African Rift Valley",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/66/ISS-30_East_African_Rift_Valley_in_Kenya.jpg",
    alt: "East African Rift Valley in Kenya photographed from the International Space Station",
    caption: "The East African Rift Valley: a geological 'scar' that preserved our earliest ancestors",
    license: "Public Domain",
    attribution: "NASA, Public Domain",
    source: "NASA/ISS Expedition 30"
  },
  risingStarCave: {
    id: "rising-star-cave",
    title: "Rising Star Cave expedition",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Rising_star_cave_exploration_%2814054047275%29.jpg",
    alt: "Command center at the entrance of Rising Star Cave, South Africa",
    caption: "Rising Star Cave: where over 1,500 Homo naledi bones were discovered in 2013-2015",
    license: "CC BY",
    attribution: "Simon Fraser University, CC BY 2.0",
    source: "Rising Star Expedition, South Africa"
  },
  blombosCave: {
    id: "blombos-cave",
    title: "Blombos Cave exterior",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Blombos.jpg",
    alt: "General view of Blombos Cave site, South Africa",
    caption: "Blombos Cave: key site for early Homo sapiens symbolic behavior",
    license: "CC BY-SA",
    attribution: "Vincent Mourre / Inrap, CC BY-SA 3.0",
    source: "Blombos Cave, South Africa"
  }
};

// Helper to get image by ID
export const getImageById = (id: string): ImageData | undefined => {
  return specimenImages[id] || toolImages[id] || siteImages[id];
};

// All images combined for easy iteration
export const allImages: ImageData[] = [
  ...Object.values(specimenImages),
  ...Object.values(toolImages),
  ...Object.values(siteImages)
];
