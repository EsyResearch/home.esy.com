/**
 * Visual Essays Data
 * 
 * SINGLE SOURCE OF TRUTH for all visual essays across the platform.
 * Used by /essays, /essays/visual, search functionality, and stats.
 * 
 * ORDERING: Essays are ordered by `number` (string, e.g., "01", "30").
 * The LATEST essay (highest number) is automatically featured.
 * Display order: Most recent first (descending by number).
 */

export type EssayCategory = 
  | 'Science'
  | 'History' 
  | 'Technology'
  | 'Culture'
  | 'Space'
  | 'Nature'
  | 'Education & Writing'
  | "Children's Fiction";

export type VisualStyle = 'photorealistic' | 'illustrated' | 'mixed';

export interface VisualEssay {
  id: string;
  number: string;  // Used for ordering - highest = newest
  title: string;
  subtitle: string;
  description: string;
  category: EssayCategory;
  readTime: string;
  href: string;
  isNew?: boolean;
  draft?: boolean;
  tags?: string[];
  visualStyle?: VisualStyle;  // 'photorealistic' for photo essays, 'illustrated' for SVG-based
}

export const CATEGORY_COLORS: Record<EssayCategory, string> = {
  'Science': '#10B981',
  'History': '#F59E0B',
  'Technology': '#3B82F6',
  'Culture': '#EC4899',
  'Space': '#8B5CF6',
  'Nature': '#06B6D4',
  'Education & Writing': '#14B8A6',
  "Children's Fiction": '#FFD700',
};

// All visual essays - ordered by number ascending (will be reversed for display)
export const visualEssays: VisualEssay[] = [
  {
    id: "mammary-gland-evolution",
    number: "01",
    title: "Mammary Gland Evolution",
    subtitle: "Anatomical Journey",
    description: "Detailed anatomical SVGs showing human breast cross-sections, alveoli, and comparative animal mammary systems—platypus to whale to human.",
    category: "Science",
    readTime: "14 min",
    href: "/essays/visual/mammary-gland-evolution",
    tags: ["biology", "anatomy", "evolution"],
  },
  {
    id: "evolution-of-mammary-glands",
    number: "02",
    title: "Evolution of Mammary Glands",
    subtitle: "310 Million Years of Milk",
    description: "How a simple skin secretion became the defining feature of mammals. SVG cross-sections, evolutionary trees, and milk composition comparisons.",
    category: "Science",
    readTime: "12 min",
    href: "/essays/visual/evolution-of-mammary-glands",
    tags: ["biology", "evolution"],
  },
  {
    id: "eternal-honey",
    number: "03",
    title: "Eternal Honey",
    subtitle: "Into the Pyramid",
    description: "Descend through multi-layer parallax into Giza's depths. Pyramid cross-sections reveal, tombs unlock, and 3,000-year-old honey glows in the darkness.",
    category: "History",
    readTime: "12 min",
    href: "/essays/visual/eternal-honey",
    tags: ["archaeology", "ancient", "food"],
  },
  {
    id: "honey-never-spoils",
    number: "04",
    title: "Honey Never Spoils",
    subtitle: "The Eternal Elixir",
    description: "3,000-year-old honey from Egyptian tombs is still edible. Honeycomb cells fill, time counters tick, and golden drips reveal why honey defies time itself.",
    category: "Science",
    readTime: "11 min",
    href: "/essays/visual/honey-never-spoils",
    tags: ["food", "chemistry"],
  },
  {
    id: "the-dna-helix",
    number: "05",
    title: "DNA & The Double Helix",
    subtitle: "The Code of Life",
    description: "The helix twists as you scroll—base pairs connect (A-T, G-C), Photo 51 reveals, genetic sequences type out. From Miescher's nuclein to CRISPR.",
    category: "Science",
    readTime: "13 min",
    href: "/essays/visual/the-dna-helix",
    tags: ["biology", "genetics"],
  },
  {
    id: "the-skyscraper",
    number: "06",
    title: "The Skyscraper",
    subtitle: "Reaching for the Sky",
    description: "An elevator rises floor-by-floor as you scroll—steel frames draw themselves, cranes lift beams, and buildings grow from 10 stories to 163 floors.",
    category: "Technology",
    readTime: "14 min",
    href: "/essays/visual/the-skyscraper",
    tags: ["architecture", "engineering"],
  },
  {
    id: "the-firearm",
    number: "07",
    title: "The Firearm",
    subtitle: "From Fire Lance to Precision",
    description: "A revolver cylinder rotates as you scroll—muzzle flashes, ammunition counters, and bullet trajectories trace 800 years of controlled explosions.",
    category: "Technology",
    readTime: "13 min",
    href: "/essays/visual/the-firearm",
    tags: ["military", "invention"],
  },
  {
    id: "the-train",
    number: "09",
    title: "The Train",
    subtitle: "Iron Horse of Industry",
    description: "Locomotive wheels rotate as you scroll through 220 years of rail history—steam puffs, mile markers, and the race from 30 mph to 375 mph maglev.",
    category: "Technology",
    readTime: "13 min",
    href: "/essays/visual/the-train",
    tags: ["transportation", "invention"],
  },
  {
    id: "the-invention-of-the-car",
    number: "10",
    title: "The Automobile",
    subtitle: "A Sketch-Style Journey",
    description: "Hand-drawn SVGs animate as you scroll through 138 years of automotive history—from Benz's patent to the electric future.",
    category: "Technology",
    readTime: "11 min",
    href: "/essays/visual/the-invention-of-the-car",
    tags: ["transportation", "invention"],
  },
  {
    id: "the-invention-of-wine",
    number: "11",
    title: "The Invention of Wine",
    subtitle: "8,000 Years in a Glass",
    description: "From Neolithic Georgia to billion-dollar Bordeaux—the story of humanity's most civilized beverage.",
    category: "Culture",
    readTime: "11 min",
    href: "/essays/visual/the-invention-of-wine",
    tags: ["food", "ancient"],
  },
  {
    id: "the-pale-blue-dot",
    number: "12",
    title: "The Pale Blue Dot",
    subtitle: "A Cosmic Perspective",
    description: "Scroll to zoom out 6 billion kilometers. Carl Sagan's reflection on the most humbling photograph ever taken.",
    category: "Space",
    readTime: "10 min",
    href: "/essays/visual/the-pale-blue-dot",
    tags: ["astronomy", "philosophy"],
  },
  {
    id: "the-deep-ocean",
    number: "13",
    title: "The Deep Ocean",
    subtitle: "Earth's Final Frontier",
    description: "Descend 10,935 meters into the abyss. From sunlit waters to Challenger Deep—71% of Earth, less than 0.001% explored.",
    category: "Nature",
    readTime: "12 min",
    href: "/essays/visual/the-deep-ocean",
    tags: ["nature", "exploration"],
  },
  {
    id: "language-death",
    number: "14",
    title: "Language Death",
    subtitle: "The Silence of Extinction",
    description: "7,168 languages exist today. Half will disappear by 2100. An exploration of what we lose when a language dies.",
    category: "Culture",
    readTime: "9 min",
    href: "/essays/visual/language-death",
    tags: ["linguistics", "anthropology"],
  },
  {
    id: "who-invented-the-mirror",
    number: "15",
    title: "The Mirror",
    subtitle: "8,000 Years of Reflection",
    description: "From polished obsidian to smart mirrors—humanity's eternal quest to see itself.",
    category: "History",
    readTime: "10 min",
    href: "/essays/visual/who-invented-the-mirror",
    tags: ["invention", "material"],
  },
  {
    id: "who-invented-soda",
    number: "16",
    title: "The Fizz",
    subtitle: "From Pharmacy to Phenomenon",
    description: "How carbonated water became humanity's favorite way to celebrate, refresh, and rebel—one bubble at a time.",
    category: "Culture",
    readTime: "10 min",
    href: "/essays/visual/who-invented-soda",
    tags: ["food", "invention"],
  },
  {
    id: "who-invented-the-sneaker",
    number: "17",
    title: "The Sneaker Story",
    subtitle: "From Plimsolls to $75 Billion",
    description: "How a rubber-soled shoe designed for silence became a global cultural force—from Charles Goodyear to Michael Jordan.",
    category: "Culture",
    readTime: "12 min",
    href: "/essays/visual/who-invented-the-sneaker",
    tags: ["fashion", "sports"],
  },
  {
    id: "who-invented-high-heels",
    number: "18",
    title: "The High Heels Story",
    subtitle: "500 Years of Elevation",
    description: "From Persian cavalrymen to Parisian runways, the extraordinary journey of fashion's most provocative invention.",
    category: "Culture",
    readTime: "14 min",
    href: "/essays/visual/who-invented-high-heels",
    tags: ["fashion"],
  },
  {
    id: "who-invented-the-bicycle",
    number: "19",
    title: "The Bicycle Story",
    subtitle: "200 Years of Two Wheels",
    description: "The invention that changed transportation, liberated women, and became humanity's most efficient machine.",
    category: "Technology",
    readTime: "10 min",
    href: "/essays/visual/who-invented-the-bicycle",
    tags: ["transportation", "invention"],
  },
  {
    id: "who-invented-the-spoon",
    number: "20",
    title: "The Spoon Story",
    subtitle: "30,000 Years of Essential Tools",
    description: "From prehistoric bone carvings to silver apostle spoons—humanity's oldest eating utensil.",
    category: "History",
    readTime: "10 min",
    href: "/essays/visual/who-invented-the-spoon",
    tags: ["material", "ancient"],
  },
  {
    id: "who-invented-basketball",
    number: "21",
    title: "The Basketball Story",
    subtitle: "From Peach Baskets to Global Culture",
    description: "Dr. Naismith's 1891 invention becomes billion-dollar arenas and worldwide phenomenon.",
    category: "Culture",
    readTime: "10 min",
    href: "/essays/visual/who-invented-basketball",
    tags: ["sports"],
  },
  {
    id: "who-invented-the-fork",
    number: "22",
    title: "The Fork Story",
    subtitle: "4,000 Years of Revolution",
    description: "From ancient Mesopotamia through Byzantine courts to your dinner table.",
    category: "History",
    readTime: "12 min",
    href: "/essays/visual/who-invented-the-fork",
    tags: ["material", "ancient"],
  },
  {
    id: "flavors-of-the-east",
    number: "24",
    title: "Flavors of the East",
    subtitle: "A Culinary Journey Through Asia",
    description: "From ancient Chinese soy fermentation to Myanmar's fermented tea salads — explore how ingredients, geography, and tradition shaped the cuisines of three nations across millennia.",
    category: "Culture",
    readTime: "18 min",
    href: "/essays/visual/flavors-of-the-east",
    tags: ["food", "cuisine", "Asia", "China", "Thailand", "Myanmar", "history", "culture"],
  },
  {
    id: "the-ngapi-journey",
    number: "25",
    title: "The Ngapi Journey",
    subtitle: "The History & Evolution of Fish Paste in Myanmar",
    description: "Discover Myanmar's soul ingredient — 2,000 years of fermented fish paste, from prehistoric preservation to the umami backbone of Burmese cuisine. Explore regional varieties, fermentation science, and cultural significance.",
    category: "Culture",
    readTime: "16 min",
    href: "/essays/visual/the-ngapi-journey",
    tags: ["food", "fermentation", "Myanmar", "cuisine", "history", "umami", "preservation"],
  },
  {
    id: "ngapi-fermented-soul",
    number: "26",
    title: "Ngapi: The Fermented Soul",
    subtitle: "Why Myanmar Became the Land of Fermented Fish",
    description: "An illustrated journey through Myanmar's geography, rivers, and monsoons — discovering why this land became the heartland of fermented fish. Rich SVG illustrations bring the story of ngapi to life.",
    category: "Culture",
    readTime: "18 min",
    href: "/essays/visual/ngapi-fermented-soul",
    isNew: true,
    tags: ["food", "fermentation", "Myanmar", "geography", "illustration", "rivers", "monsoon", "preservation"],
  },
  {
    id: "the-tea-journey",
    number: "27",
    title: "Leaves of Time",
    subtitle: "The Global Journey of Tea",
    description: "From wild mountain leaves in ancient China to the world's most consumed beverage after water. Trace 5,000 years of tea history through animated trade routes, ceremonial traditions, and the empires built on a single leaf.",
    category: "Culture",
    readTime: "18 min",
    href: "/essays/visual/the-tea-journey",
    isNew: true,
    tags: ["tea", "history", "China", "Japan", "India", "trade", "ceremony", "empire", "culture"],
  },
  {
    id: "the-tea-journey-illustrated",
    number: "28",
    title: "Leaves of Time",
    subtitle: "The Global Journey of Tea (Illustrated Edition)",
    description: "An award-winning illustrated journey through 5,000 years of tea history. Stunning hand-crafted SVG illustrations, intricate animations, and immersive scenes trace tea's path from ancient China to global phenomenon.",
    category: "Culture",
    readTime: "20 min",
    href: "/essays/visual/the-tea-journey-illustrated",
    isNew: true,
    tags: ["tea", "history", "illustrated", "SVG", "animation", "China", "Japan", "India", "trade", "ceremony", "premium"],
  },
  {
    id: "the-cocoa-odyssey",
    number: "29",
    title: "The Cocoa Odyssey",
    subtitle: "From Ancient Ritual to Global Chocolate Empire",
    description: "From sacred Mesoamerican drink to billion-dollar empires—the untold story of how a bitter bean conquered the world. Explore botanical origins, colonial transformation, and the modern chocolate industry.",
    category: "History",
    readTime: "18 min",
    href: "/essays/visual/the-cocoa-odyssey",
    isNew: true,
    tags: ["cocoa", "chocolate", "history", "Mesoamerica", "Maya", "Aztec", "trade", "industry", "food"],
  },
  {
    id: "the-golden-crunch",
    number: "30",
    title: "The Golden Crunch",
    subtitle: "The Origins, Journey & Global Rise of Fried Chicken",
    description: "From West African traditions and Scottish frying techniques to enslaved cooks in the American South, Jim Crow travel food, and the multi-hundred-billion-dollar global industry. The untold story of fried chicken.",
    category: "History",
    readTime: "20 min",
    href: "/essays/visual/the-golden-crunch",
    tags: ["fried chicken", "soul food", "African American history", "food history", "KFC", "fast food", "culinary anthropology", "global cuisine"],
  },
  {
    id: "the-first-loaf",
    number: "31",
    title: "The First Loaf",
    subtitle: "The Invention of Bread and the Story of Humanity",
    description: "A cinematic journey through 30,000 years of human ingenuity. From wild grains to accidental fermentation—discover how a simple paste on hot stones became civilization's foundation and still anchors human culture today.",
    category: "History",
    readTime: "18 min",
    href: "/essays/visual/the-first-loaf",
    tags: ["bread", "food history", "fermentation", "ancient grains", "einkorn", "emmer", "neolithic", "agriculture", "civilization", "baking", "sourdough", "culinary anthropology"],
  },
  {
    id: "the-gridiron",
    number: "33",
    title: "The Gridiron",
    subtitle: "How American Football Conquered America",
    description: "From deadly college brawls to 113 million Super Bowl viewers—the extraordinary story of how a chaotic rugby variant became America's most watched sport. Explore Walter Camp's revolution, the 1905 death crisis, and football's rise to cultural dominance.",
    category: "History",
    readTime: "16 min",
    href: "/essays/visual/the-gridiron",
    tags: ["american football", "NFL", "Super Bowl", "Walter Camp", "sports history", "college football", "forward pass", "gridiron", "stadium", "touchdowns"],
  },
  {
    id: "the-great-fire",
    number: "35",
    title: "The Great Fire of London",
    subtitle: "From Ashes to Empire",
    description: "When a spark in Pudding Lane consumed medieval London—and gave birth to the modern city. Experience the catastrophic beauty of 1666 through Samuel Pepys' diary, Christopher Wren's architectural phoenix, and the fire that transformed urban civilization forever.",
    category: "History",
    readTime: "16 min",
    href: "/essays/visual/the-great-fire",
    tags: ["Great Fire of London", "1666", "Samuel Pepys", "Christopher Wren", "St Pauls Cathedral", "London history", "fire history", "Pudding Lane", "Thomas Farriner", "urban planning", "fire safety", "British history"],
  },
  {
    id: "the-manhattan-project",
    number: "38",
    title: "Now I Am Become Death",
    subtitle: "The Making of the Atomic Bomb",
    description: "A photo-driven visual essay chronicling humanity's most consequential scientific endeavor—the secret race to split the atom. From Einstein's 1939 letter to the ashes of Hiroshima, experience the Manhattan Project through declassified photographs and the faces of those who changed history.",
    category: "History",
    readTime: "22 min",
    href: "/essays/visual/the-manhattan-project",
    tags: ["Manhattan Project", "atomic bomb", "nuclear weapons", "Oppenheimer", "Trinity test", "Hiroshima", "Nagasaki", "Los Alamos", "World War II", "nuclear history", "Enrico Fermi", "Einstein", "history of science", "military history"],
    visualStyle: "photorealistic",
  },
  {
    id: "the-thinking-machine",
    number: "39",
    title: "The Thinking Machine",
    subtitle: "A Visual History of Artificial Intelligence",
    description: "From Alan Turing's wartime imaginings to ChatGPT—an immersive photo-driven journey through 80 years of humanity's quest to build minds from mathematics. Experience the dreamers, the winters, and the revolution through archival photography and cinematic scroll-driven sequences.",
    category: "Technology",
    readTime: "25 min",
    href: "/essays/visual/the-thinking-machine",
    tags: ["artificial intelligence", "AI history", "Alan Turing", "machine learning", "neural networks", "deep learning", "Geoffrey Hinton", "ChatGPT", "OpenAI", "Dartmouth conference", "AI winter", "computer science history", "Turing test", "technology history"],
    visualStyle: "photorealistic",
  },
  {
    id: "the-ramayana",
    number: "40",
    title: "The Journey Home",
    subtitle: "The Ramayana in Art and Symbol",
    description: "Experience humanity's oldest quest narrative through 2,500 years of artistic interpretation—from Chola bronzes to Balinese shadow puppets, from Pahari miniatures to the temple walls of Angkor. An immersive scroll-driven visual essay exploring exile, devotion, and the long way back.",
    category: "Culture",
    readTime: "22 min",
    href: "/essays/visual/the-ramayana",
    tags: ["Ramayana", "Hindu mythology", "Indian epic", "Rama", "Sita", "Hanuman", "Ravana", "dharma", "Indian art", "Pahari miniatures", "Chola bronze", "Angkor Wat", "mythology", "Diwali", "Ram Lila", "Sanskrit epic", "Valmiki", "Southeast Asian art"],
    visualStyle: "photorealistic",
  },
  {
    id: "the-holocaust",
    number: "41",
    title: "Never Forget",
    subtitle: "Bearing Witness to the Holocaust",
    description: "The systematic murder of six million Jews and millions of others—told through the faces who lived it, died in it, and survived to testify. A photorealistic visual essay bearing witness to humanity's darkest chapter.",
    category: "History",
    readTime: "30 min",
    href: "/essays/visual/the-holocaust",
    tags: ["Holocaust", "Shoah", "Nazi Germany", "World War II", "genocide", "Anne Frank", "Elie Wiesel", "Auschwitz", "concentration camps", "Jewish history", "remembrance", "never forget", "antisemitism", "visual essay"],
    visualStyle: "photorealistic",
  },
  {
    id: "the-diamond-cartel",
    number: "42",
    title: "A Diamond is Forever",
    subtitle: "The Manufactured Desire That Built an Empire of Blood and Brilliance",
    description: "How De Beers convinced the world that love could be measured in carats—and built that illusion on colonial exploitation, artificial scarcity, and the blood of African miners. From Cecil Rhodes to lab diamonds, the story of history's most successful marketing manipulation.",
    category: "History",
    readTime: "30 min",
    href: "/essays/visual/the-diamond-cartel",
    tags: ["De Beers", "diamond history", "blood diamonds", "diamond engagement rings", "a diamond is forever", "Cecil Rhodes", "diamond monopoly", "N.W. Ayer", "Frances Gerety", "conflict diamonds", "lab diamonds", "diamond industry", "manufactured desire", "marketing history", "African exploitation", "Oppenheimer"],
  },
  {
    id: "the-distance-between",
    number: "43",
    title: "The Distance Between",
    subtitle: "A History of the Fork",
    description: "The fork was once condemned as satanic vanity. Now it's invisible. An immersive photorealistic journey through 2,000 years—from Byzantine courts to your dinner table—exploring the utensil that became the measure of civilization itself.",
    category: "History",
    readTime: "25 min",
    href: "/essays/visual/the-fork",
    isNew: true,
    tags: ["fork history", "eating utensils", "Byzantine Empire", "Catherine de Medici", "Thomas Coryat", "dining etiquette", "cultural history", "material culture", "Theophanu", "Peter Damian", "table manners", "civilization", "photorealistic"],
    visualStyle: "photorealistic",
  },
  {
    id: "the-rwanda-genocide",
    number: "44",
    title: "Kwibuka",
    subtitle: "A Hundred Days of Darkness, A Generation of Light",
    description: "How colonial division and international abandonment enabled the murder of one million Rwandans—and how a shattered nation chose reconciliation over revenge to become Africa's most remarkable transformation. A photorealistic visual essay bearing witness to the 1994 Genocide against the Tutsi.",
    category: "History",
    readTime: "35 min",
    href: "/essays/visual/the-rwanda-genocide",
    isNew: true,
    tags: ["Rwanda genocide", "Tutsi", "Hutu", "1994", "Paul Kagame", "Kigali", "genocide", "reconciliation", "Gacaca", "African history", "colonialism", "UN failure", "RPF", "East Africa", "never again", "Kwibuka", "photorealistic"],
    visualStyle: "photorealistic",
  },
  // Children's Fiction (draft - not shown in production)
  {
    id: "the-night-the-stars-fell",
    number: "C01",
    title: "The Night the Stars Fell",
    subtitle: "A Children's Bedtime Story",
    description: "An interactive bedtime story about a brave little girl who helps a fallen star find its way home.",
    category: "Children's Fiction",
    readTime: "5 min",
    href: "/essays/visual/the-night-the-stars-fell",
    draft: true,
    tags: ["children", "bedtime", "fiction", "stars", "friendship"],
  },
  {
    id: "the-monster-under-my-bed",
    number: "C02",
    title: "The Monster Under My Bed",
    subtitle: "A Tale of Unlikely Friendship",
    description: "Maya discovers the monster under her bed is actually afraid of the dark. A heartwarming interactive story.",
    category: "Children's Fiction",
    readTime: "5 min",
    href: "/essays/visual/the-monster-under-my-bed",
    draft: true,
    tags: ["children", "bedtime", "fiction", "monster", "friendship"],
  },
  {
    id: "mia-mouse-mystery-m",
    number: "C03",
    title: "Mia Mouse and the Mystery M",
    subtitle: "A Curious Adventure",
    description: "Follow curious Mia Mouse as she discovers mysterious M-shaped crumbs leading to a wonderful surprise!",
    category: "Children's Fiction",
    readTime: "6 min",
    href: "/essays/visual/mia-mouse-mystery-m",
    draft: true,
    tags: ["children", "alphabet", "letter M", "mouse", "friendship"],
  },
  {
    id: "alphabet-adventure-train",
    number: "C04",
    title: "The Alphabet Adventure Train",
    subtitle: "All Aboard for Learning!",
    description: "Join the colorful train as it chugs through the alphabet, picking up letters and learning words along the way.",
    category: "Children's Fiction",
    readTime: "8 min",
    href: "/essays/visual/alphabet-adventure-train",
    draft: true,
    tags: ["children", "alphabet", "learning", "train", "ages 3-6"],
  },
  {
    id: "sammy-snail-super-speed",
    number: "C05",
    title: "Sammy Snail's Super Speed Day",
    subtitle: "Zoom! A Magical Adventure",
    description: "Join Sammy Snail as he discovers a magical dew drop that gives him super speed!",
    category: "Children's Fiction",
    readTime: "8 min",
    href: "/essays/visual/sammy-snail-super-speed",
    draft: true,
    tags: ["children", "adventure", "snail", "speed", "friendship"],
  },
];

// ==================== DERIVED DATA ====================

// Published essays only (non-draft), sorted by number descending (newest first)
export const publishedVisualEssays = visualEssays
  .filter(essay => !essay.draft)
  .sort((a, b) => parseInt(b.number) - parseInt(a.number));

// Featured essay: Always the latest (first in sorted array)
export const featuredEssay = publishedVisualEssays[0];

// Essays excluding featured (for lists)
export const nonFeaturedEssays = publishedVisualEssays.slice(1);

// Total read time calculation
export const totalReadTime = publishedVisualEssays.reduce(
  (acc, essay) => acc + parseInt(essay.readTime), 
  0
);

// ==================== HELPERS ====================

// Search visual essays (only published)
export function searchVisualEssays(query: string): VisualEssay[] {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
  
  return publishedVisualEssays.filter(essay => {
    const searchableText = [
      essay.title,
      essay.subtitle,
      essay.description,
      essay.category,
      ...(essay.tags || []),
    ].join(' ').toLowerCase();
    
    return searchTerms.every(term => searchableText.includes(term));
  });
}

// Get essays by category
export function getEssaysByCategory(category: EssayCategory): VisualEssay[] {
  return publishedVisualEssays.filter(essay => essay.category === category);
}

// Category counts for filters
export const categoryCounts = publishedVisualEssays.reduce((acc, essay) => {
  acc[essay.category] = (acc[essay.category] || 0) + 1;
  return acc;
}, {} as Record<EssayCategory, number>);

// Photo essays (photorealistic visual style)
export const photoEssays = publishedVisualEssays.filter(
  essay => essay.visualStyle === 'photorealistic'
);

// Illustrated essays (non-photorealistic, for the main visual essays section)
export const illustratedEssays = publishedVisualEssays.filter(
  essay => essay.visualStyle !== 'photorealistic'
);
