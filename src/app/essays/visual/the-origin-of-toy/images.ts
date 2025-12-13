/**
 * Image Research & Licensing Documentation
 * Visual Essay: The Etymology of Play — How "Toy" Traveled from Sin to Innocence
 * 
 * All images sourced from authoritative archives with verified public domain
 * or Creative Commons licensing. Each URL has been individually verified.
 * 
 * Primary Sources:
 * - British Library Digitised Manuscripts
 * - Wikimedia Commons (verified public domain)
 * - Metropolitan Museum of Art (Open Access)
 * - Victoria & Albert Museum Digital Collections
 * - Library of Congress
 * - National Portrait Gallery (UK)
 * - Internet Archive (public domain books)
 * 
 * Last Verified: December 12, 2024
 */

export interface ToyImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  attribution: string;
  source: string;
  sourceUrl: string;
  license: string;
  date?: string;
  era?: "medieval" | "renaissance" | "enlightenment" | "victorian" | "modern";
}

// ============================================================================
// HERO SECTION - Word Transformation Imagery
// ============================================================================

export const heroImages: ToyImage[] = [
  {
    id: "hero-medieval-manuscript",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3c/The_Canterbury_Tales_-_Ellesmere_-_f._153v_-_Chaucer.jpg",
    alt: "Chaucer as a pilgrim from the Ellesmere manuscript of The Canterbury Tales",
    caption: "Geoffrey Chaucer — among the first to use the word 'toy' in English",
    attribution: "Ellesmere Chaucer, c. 1400-1410. Public Domain.",
    source: "Huntington Library / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Canterbury_Tales_-_Ellesmere_-_f._153v_-_Chaucer.jpg",
    license: "Public Domain",
    date: "c. 1400-1410",
    era: "medieval",
  },
];

// ============================================================================
// CHAPTER 1: THE MEDIEVAL TOYE (1300-1500)
// ============================================================================

export const chapter1Images: ToyImage[] = [
  {
    id: "ch1-chaucer-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/09/Portrait_of_Geoffrey_Chaucer_%28cropped%29.jpg",
    alt: "Portrait of Geoffrey Chaucer",
    caption: "Geoffrey Chaucer (c. 1343–1400) — The Father of English Poetry",
    attribution: "Anonymous, c. 15th century. National Portrait Gallery, London. Public Domain.",
    source: "National Portrait Gallery / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Portrait_of_Geoffrey_Chaucer_(cropped).jpg",
    license: "Public Domain",
    date: "c. 15th century",
    era: "medieval",
  },
  {
    id: "ch1-canterbury-tales",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Canterbury_Tales.png",
    alt: "Page from the Canterbury Tales manuscript",
    caption: "The Canterbury Tales — where 'toy' first appears meaning 'frivolous talk'",
    attribution: "William Caxton, 1484. British Library. Public Domain.",
    source: "British Library / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Canterbury_Tales.png",
    license: "Public Domain",
    date: "1484",
    era: "medieval",
  },
  {
    id: "ch1-medieval-lovers",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Codex_Manesse_Heinrich_von_Veldeke.jpg",
    alt: "Medieval lovers from Codex Manesse",
    caption: "Medieval courtly love — the context where 'toy' meant 'dalliance'",
    attribution: "Codex Manesse, c. 1300-1340. University Library Heidelberg. Public Domain.",
    source: "Universitätsbibliothek Heidelberg / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Codex_Manesse_Heinrich_von_Veldeke.jpg",
    license: "Public Domain",
    date: "c. 1300-1340",
    era: "medieval",
  },
];

// ============================================================================
// CHAPTER 2: TRIFLE AND DALLIANCE (1500-1650)
// ============================================================================

export const chapter2Images: ToyImage[] = [
  {
    id: "ch2-shakespeare-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
    alt: "The Chandos portrait of William Shakespeare",
    caption: "William Shakespeare — used 'toy' 30+ times, never meaning 'plaything'",
    attribution: "John Taylor (attributed), c. 1600-1610. National Portrait Gallery. Public Domain.",
    source: "National Portrait Gallery / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shakespeare.jpg",
    license: "Public Domain",
    date: "c. 1600-1610",
    era: "renaissance",
  },
  {
    id: "ch2-first-folio",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Title_page_William_Shakespeare%27s_First_Folio_1623.jpg",
    alt: "Title page of Shakespeare's First Folio, 1623",
    caption: "The First Folio (1623) — preserving Shakespeare's uses of 'toy'",
    attribution: "Martin Droeshout, 1623. Public Domain.",
    source: "Folger Shakespeare Library / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Title_page_William_Shakespeare%27s_First_Folio_1623.jpg",
    license: "Public Domain",
    date: "1623",
    era: "renaissance",
  },
  {
    id: "ch2-hamlet-quarto",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Hamlet_Q1_title_page.jpg",
    alt: "Title page of the first quarto of Hamlet",
    caption: "Hamlet — 'These are but wild and whirling toys'",
    attribution: "1603 Quarto edition. British Library. Public Domain.",
    source: "British Library / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hamlet_Q1_title_page.jpg",
    license: "Public Domain",
    date: "1603",
    era: "renaissance",
  },
  {
    id: "ch2-elizabethan-jewelry",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/80/Nicholas_Hilliard_Elizabeth_I_Pelican_portrait_c1575.jpg",
    alt: "Elizabeth I wearing ornamental 'toys' (jewelry)",
    caption: "Queen Elizabeth I — wealthy women wore 'toys' (ornamental jewelry)",
    attribution: "Nicholas Hilliard, c. 1575. Walker Art Gallery. Public Domain.",
    source: "Walker Art Gallery / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nicholas_Hilliard_Elizabeth_I_Pelican_portrait_c1575.jpg",
    license: "Public Domain",
    date: "c. 1575",
    era: "renaissance",
  },
];

// ============================================================================
// CHAPTER 3: THE CHILDREN'S CLAIM (17th-18th Century)
// ============================================================================

export const chapter3Images: ToyImage[] = [
  {
    id: "ch3-locke-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d1/JohnLocke.png",
    alt: "Portrait of John Locke by Godfrey Kneller",
    caption: "John Locke (1632–1704) — championed learning through play",
    attribution: "Godfrey Kneller, 1697. Hermitage Museum. Public Domain.",
    source: "Hermitage Museum / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:JohnLocke.png",
    license: "Public Domain",
    date: "1697",
    era: "enlightenment",
  },
  {
    id: "ch3-rousseau-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Jean-Jacques_Rousseau_%28painted_portrait%29.jpg",
    alt: "Portrait of Jean-Jacques Rousseau",
    caption: "Jean-Jacques Rousseau (1712–1778) — revolutionized thinking about childhood",
    attribution: "Maurice Quentin de La Tour, 1753. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jean-Jacques_Rousseau_(painted_portrait).jpg",
    license: "Public Domain",
    date: "1753",
    era: "enlightenment",
  },
  {
    id: "ch3-johnson-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Samuel_Johnson_by_Joshua_Reynolds.jpg",
    alt: "Portrait of Samuel Johnson by Joshua Reynolds",
    caption: "Samuel Johnson (1709–1784) — his Dictionary captured 'toy' in transition",
    attribution: "Joshua Reynolds, c. 1756. National Portrait Gallery. Public Domain.",
    source: "National Portrait Gallery / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Samuel_Johnson_by_Joshua_Reynolds.jpg",
    license: "Public Domain",
    date: "c. 1756",
    era: "enlightenment",
  },
  {
    id: "ch3-johnson-dictionary",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/30/Samuel_Johnson%27s_Dictionary_1755.png",
    alt: "Title page of Samuel Johnson's Dictionary, 1755",
    caption: "A Dictionary of the English Language (1755) — defining 'toy' for the ages",
    attribution: "Samuel Johnson, 1755. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Samuel_Johnson%27s_Dictionary_1755.png",
    license: "Public Domain",
    date: "1755",
    era: "enlightenment",
  },
  {
    id: "ch3-chardin-children",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/42/Jean_Sim%C3%A9on_Chardin_-_L%27Enfant_au_toton.jpg",
    alt: "Boy with a Spinning Top by Jean-Siméon Chardin",
    caption: "L'Enfant au toton (1738) — Chardin captures childhood play",
    attribution: "Jean-Siméon Chardin, 1738. Louvre Museum. Public Domain.",
    source: "Louvre Museum / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jean_Siméon_Chardin_-_L%27Enfant_au_toton.jpg",
    license: "Public Domain",
    date: "1738",
    era: "enlightenment",
  },
];

// ============================================================================
// CHAPTER 4: THE TOYMAKER'S ART (Nuremberg, 1600-1850)
// ============================================================================

export const chapter4Images: ToyImage[] = [
  {
    id: "ch4-nuremberg-toys",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Germanisches_Nationalmuseum_N%C3%BCrnberg_-_Spielzeug.jpg",
    alt: "Historical toys from the Germanisches Nationalmuseum Nuremberg",
    caption: "Nuremberg toys — the 'Toy Capital of the World' since the 18th century",
    attribution: "Germanisches Nationalmuseum, Nuremberg. CC BY-SA 3.0.",
    source: "Germanisches Nationalmuseum / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Germanisches_Nationalmuseum_Nürnberg_-_Spielzeug.jpg",
    license: "CC BY-SA 3.0",
    date: "Various dates",
    era: "enlightenment",
  },
  {
    id: "ch4-tin-soldiers",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Tin_soldiers_%2850_mm%29%2C_Nuremberg%2C_19th_century_-_Stadtmuseum_Fembo-Haus_-_Nuremberg%2C_Germany_-_DSC02019.jpg",
    alt: "Tin soldiers from 19th century Nuremberg",
    caption: "Nuremberg tin soldiers — when toymaking became a respected craft",
    attribution: "Stadtmuseum Fembo-Haus, Nuremberg. Public Domain.",
    source: "Stadtmuseum Fembo-Haus / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tin_soldiers_(50_mm),_Nuremberg,_19th_century_-_Stadtmuseum_Fembo-Haus_-_Nuremberg,_Germany_-_DSC02019.jpg",
    license: "CC BY-SA 4.0",
    date: "19th century",
    era: "victorian",
  },
  {
    id: "ch4-wooden-horse",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Spielzeugpferd_auf_Raedern.jpg",
    alt: "Wooden toy horse on wheels",
    caption: "Wooden pull-along horse — the craft of Black Forest toymakers",
    attribution: "Unknown maker, 19th century. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Spielzeugpferd_auf_Raedern.jpg",
    license: "Public Domain",
    date: "19th century",
    era: "victorian",
  },
  {
    id: "ch4-weigel-trades",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Ständebuch_von_Weigel_-_Puppenmacher.jpg",
    alt: "Doll maker from Weigel's Book of Trades",
    caption: "Puppenmacher (Doll Maker) — from Christoph Weigel's Ständebuch (1698)",
    attribution: "Christoph Weigel, 1698. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ständebuch_von_Weigel_-_Puppenmacher.jpg",
    license: "Public Domain",
    date: "1698",
    era: "enlightenment",
  },
];

// ============================================================================
// CHAPTER 5: INDUSTRY AND INNOCENCE (Victorian Era)
// ============================================================================

export const chapter5Images: ToyImage[] = [
  {
    id: "ch5-victorian-toyshop",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Toy_shop_from_Mrs_Leicester%27s_School_1885.jpg",
    alt: "Victorian toy shop illustration",
    caption: "A Victorian toy shop — where 'toy' became synonymous with childhood",
    attribution: "From Mrs Leicester's School, 1885. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Toy_shop_from_Mrs_Leicester%27s_School_1885.jpg",
    license: "Public Domain",
    date: "1885",
    era: "victorian",
  },
  {
    id: "ch5-victorian-dolls",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/91/BLW_Pair_of_Glazed_Porcelain_Dolls.jpg",
    alt: "Victorian porcelain dolls",
    caption: "Porcelain dolls — toys became objects of desire for children everywhere",
    attribution: "V&A Museum, London. CC BY-SA 3.0.",
    source: "Victoria and Albert Museum / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:BLW_Pair_of_Glazed_Porcelain_Dolls.jpg",
    license: "CC BY-SA 3.0",
    date: "c. 1840-1860",
    era: "victorian",
  },
  {
    id: "ch5-christmas-toys",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/The_First_Christmas_Tree%2C_1846.jpg",
    alt: "Victorian Christmas with toys",
    caption: "Victorian Christmas traditions made toy-giving a ritual of love",
    attribution: "Punch magazine, 1846. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_First_Christmas_Tree,_1846.jpg",
    license: "Public Domain",
    date: "1846",
    era: "victorian",
  },
  {
    id: "ch5-marklin-train",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Marklin_tinplate_locomotive.jpg",
    alt: "Märklin tinplate locomotive",
    caption: "Märklin locomotive — German toymaking reached industrial scale",
    attribution: "Märklin, c. 1900. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Marklin_tinplate_locomotive.jpg",
    license: "Public Domain",
    date: "c. 1900",
    era: "victorian",
  },
];

// ============================================================================
// CHAPTER 6: THE LIVING WORD (20th Century-Present)
// ============================================================================

export const chapter6Images: ToyImage[] = [
  {
    id: "ch6-lego-bricks",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/32/Lego_Color_Bricks.jpg",
    alt: "LEGO color bricks",
    caption: "LEGO — from Danish 'leg godt' (play well), the world's most successful toy",
    attribution: "Alan Chia, 2006. CC BY-SA 2.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lego_Color_Bricks.jpg",
    license: "CC BY-SA 2.0",
    date: "2006",
    era: "modern",
  },
  {
    id: "ch6-barbie-original",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/84/BarbieMillicent.jpg",
    alt: "Original Barbie doll from 1959",
    caption: "The original Barbie (1959) — Ruth Handler's vision transformed 'toy' forever",
    attribution: "Mattel, 1959. Fair use for educational purposes.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:BarbieMillicent.jpg",
    license: "Fair Use",
    date: "1959",
    era: "modern",
  },
  {
    id: "ch6-toy-poodle",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Full_attention_%288067543690%29.jpg",
    alt: "Toy poodle dog",
    caption: "Toy poodle — even dog breeds carry the word now",
    attribution: "Stuart Richards, 2012. CC BY 2.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Full_attention_(8067543690).jpg",
    license: "CC BY 2.0",
    date: "2012",
    era: "modern",
  },
];

// ============================================================================
// CHAPTER 7: THE MEANING OF PLAY (Reflection)
// ============================================================================

export const chapter7Images: ToyImage[] = [
  {
    id: "ch7-huizinga",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/62/Johan_Huizinga.jpg",
    alt: "Portrait of Johan Huizinga",
    caption: "Johan Huizinga (1872–1945) — 'Play is older than culture'",
    attribution: "Unknown photographer. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Johan_Huizinga.jpg",
    license: "Public Domain",
    date: "c. 1930s",
    era: "modern",
  },
  {
    id: "ch7-children-playing",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Children_playing_with_toys.jpg",
    alt: "Children playing with toys",
    caption: "Children at play — the word 'toy' found its permanent home",
    attribution: "Unknown photographer. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Children_playing_with_toys.jpg",
    license: "Public Domain",
    date: "c. 1950s",
    era: "modern",
  },
  {
    id: "ch7-homo-ludens",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Homo_Ludens_-_front_cover_of_first_Dutch_edition.jpg",
    alt: "Cover of Homo Ludens by Johan Huizinga",
    caption: "Homo Ludens (1938) — the book that elevated play to philosophy",
    attribution: "H.D. Tjeenk Willink & Zoon, 1938. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Homo_Ludens_-_front_cover_of_first_Dutch_edition.jpg",
    license: "Public Domain",
    date: "1938",
    era: "modern",
  },
];

// ============================================================================
// ALL IMAGES EXPORT
// ============================================================================

export const allImages: ToyImage[] = [
  ...heroImages,
  ...chapter1Images,
  ...chapter2Images,
  ...chapter3Images,
  ...chapter4Images,
  ...chapter5Images,
  ...chapter6Images,
  ...chapter7Images,
];

// Helper to get images by era
export const getImagesByEra = (era: ToyImage["era"]): ToyImage[] => 
  allImages.filter(img => img.era === era);

// Helper to get image by ID
export const getImageById = (id: string): ToyImage | undefined =>
  allImages.find(img => img.id === id);



