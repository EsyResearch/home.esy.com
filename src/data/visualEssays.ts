/**
 * Visual Essays Data
 * 
 * Shared data source for all visual essays across the platform.
 * Used by /essays, /essays/visual, and search functionality.
 */

export type StoryCategory = 
  | 'Science'
  | 'History' 
  | 'Technology'
  | 'Culture'
  | 'Space'
  | 'Education & Writing'
  | "Children's Fiction";

export interface VisualEssay {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: StoryCategory;
  readTime: string;
  href: string;
  isNew?: boolean;
  draft?: boolean;
  tags?: string[];
}

export const CATEGORY_COLORS: Record<StoryCategory, string> = {
  'Science': '#10B981',
  'History': '#F59E0B',
  'Technology': '#3B82F6',
  'Culture': '#EC4899',
  'Space': '#8B5CF6',
  'Education & Writing': '#06B6D4',
  "Children's Fiction": '#FFD700',
};

export const visualEssays: VisualEssay[] = [
  {
    id: "mammary-gland-evolution",
    title: "Mammary Gland Evolution",
    subtitle: "Anatomical Journey",
    description: "Detailed anatomical SVGs showing human breast cross-sections, alveoli, and comparative animal mammary systems.",
    category: "Science",
    readTime: "14 min",
    href: "/essays/visual/mammary-gland-evolution",
    tags: ["biology", "anatomy", "evolution"],
  },
  {
    id: "evolution-of-mammary-glands",
    title: "Evolution of Mammary Glands",
    subtitle: "310 Million Years of Milk",
    description: "How a simple skin secretion became the defining feature of mammals.",
    category: "Science",
    readTime: "12 min",
    href: "/essays/visual/evolution-of-mammary-glands",
    tags: ["biology", "evolution"],
  },
  {
    id: "eternal-honey",
    title: "Eternal Honey",
    subtitle: "Into the Pyramid",
    description: "Descend through multi-layer parallax into Giza's depths. Pyramid cross-sections reveal ancient secrets.",
    category: "History",
    readTime: "12 min",
    href: "/essays/visual/eternal-honey",
    isNew: true,
    tags: ["archaeology", "ancient", "food"],
  },
  {
    id: "honey-never-spoils",
    title: "Honey Never Spoils",
    subtitle: "The Eternal Elixir",
    description: "3,000-year-old honey from Egyptian tombs is still edible. Discover why honey defies time itself.",
    category: "Science",
    readTime: "11 min",
    href: "/essays/visual/honey-never-spoils",
    tags: ["food", "chemistry"],
  },
  {
    id: "the-dna-helix",
    title: "DNA & The Double Helix",
    subtitle: "The Code of Life",
    description: "The helix twists as you scroll—base pairs connect, Photo 51 reveals, genetic sequences type out.",
    category: "Science",
    readTime: "13 min",
    href: "/essays/visual/the-dna-helix",
    tags: ["biology", "genetics"],
  },
  {
    id: "the-skyscraper",
    title: "The Skyscraper",
    subtitle: "Reaching for the Sky",
    description: "An elevator rises floor-by-floor as you scroll through the history of vertical cities.",
    category: "Technology",
    readTime: "14 min",
    href: "/essays/visual/the-skyscraper",
    tags: ["architecture", "engineering"],
  },
  {
    id: "the-firearm",
    title: "The Firearm",
    subtitle: "From Fire Lance to Precision",
    description: "A revolver cylinder rotates as you scroll through 800 years of controlled explosions.",
    category: "Technology",
    readTime: "13 min",
    href: "/essays/visual/the-firearm",
    tags: ["military", "invention"],
  },
  {
    id: "the-gunpowder",
    title: "Gunpowder",
    subtitle: "The Discovery That Changed Everything",
    description: "A burning fuse tracks your progress through 1,200 years of explosive history.",
    category: "Technology",
    readTime: "14 min",
    href: "/essays/visual/the-gunpowder",
    tags: ["military", "chemistry", "invention"],
  },
  {
    id: "the-train",
    title: "The Train",
    subtitle: "Iron Horse of Industry",
    description: "Locomotive wheels rotate as you scroll through 220 years of rail history.",
    category: "Technology",
    readTime: "13 min",
    href: "/essays/visual/the-train",
    tags: ["transportation", "invention"],
  },
  {
    id: "the-invention-of-the-car",
    title: "The Automobile",
    subtitle: "A Sketch-Style Journey",
    description: "Hand-drawn SVGs animate as you scroll through 138 years of automotive history.",
    category: "Technology",
    readTime: "11 min",
    href: "/essays/visual/the-invention-of-the-car",
    tags: ["transportation", "invention"],
  },
  {
    id: "the-invention-of-wine",
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
    title: "The Deep Ocean",
    subtitle: "Earth's Final Frontier",
    description: "Descend 10,935 meters into the abyss. 71% of Earth, less than 0.001% explored.",
    category: "Science",
    readTime: "12 min",
    href: "/essays/visual/the-deep-ocean",
    tags: ["nature", "exploration"],
  },
  {
    id: "language-death",
    title: "Language Death",
    subtitle: "The Silence of Extinction",
    description: "7,168 languages exist today. Half will disappear by 2100. An exploration of what we lose.",
    category: "Culture",
    readTime: "9 min",
    href: "/essays/visual/language-death",
    tags: ["linguistics", "anthropology"],
  },
  {
    id: "who-invented-the-mirror",
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
    title: "The Fizz",
    subtitle: "From Pharmacy to Phenomenon",
    description: "How carbonated water became humanity's favorite way to celebrate, refresh, and rebel.",
    category: "Culture",
    readTime: "10 min",
    href: "/essays/visual/who-invented-soda",
    tags: ["food", "invention"],
  },
  {
    id: "who-invented-the-sneaker",
    title: "The Sneaker Story",
    subtitle: "From Plimsolls to $75 Billion",
    description: "How a rubber-soled shoe designed for silence became a global cultural force.",
    category: "Culture",
    readTime: "12 min",
    href: "/essays/visual/who-invented-the-sneaker",
    tags: ["fashion", "sports"],
  },
  {
    id: "who-invented-high-heels",
    title: "The High Heels Story",
    subtitle: "500 Years of Elevation",
    description: "From Persian cavalrymen to Parisian runways, fashion's most provocative invention.",
    category: "Culture",
    readTime: "14 min",
    href: "/essays/visual/who-invented-high-heels",
    tags: ["fashion"],
  },
  {
    id: "who-invented-the-bicycle",
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
    title: "The Fork Story",
    subtitle: "4,000 Years of Revolution",
    description: "From ancient Mesopotamia through Byzantine courts to your dinner table.",
    category: "History",
    readTime: "12 min",
    href: "/essays/visual/who-invented-the-fork",
    tags: ["material", "ancient"],
  },
  {
    id: "the-discovery-of-antibiotics",
    title: "The Discovery of Antibiotics",
    subtitle: "The Petri Dish That Saved 200 Million Lives",
    description: "How Alexander Fleming's contaminated experiment in 1928 led to humanity's greatest medical breakthrough.",
    category: "Science",
    readTime: "10 min",
    href: "/essays/visual/the-discovery-of-antibiotics",
    tags: ["medical", "invention"],
  },
  {
    id: "flavors-of-the-east",
    title: "Flavors of the East",
    subtitle: "A Culinary Journey Through Asia",
    description: "Explore the rich tapestry of Asian cuisine through an interactive visual journey.",
    category: "Culture",
    readTime: "18 min",
    href: "/essays/visual/flavors-of-the-east",
    isNew: true,
    tags: ["food", "culture", "asia"],
  },
  // Children's Fiction (draft - not shown in production)
  {
    id: "the-night-the-stars-fell",
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

// Get only published (non-draft) visual essays
export const publishedVisualEssays = visualEssays.filter(essay => !essay.draft);

// Helper function to search visual essays (only published)
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

