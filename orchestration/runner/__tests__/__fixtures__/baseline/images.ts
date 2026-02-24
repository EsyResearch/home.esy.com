export const IMAGES = {
  hero: 'https://images.esy.com/essays/test-fixture/hero.a1b2c3.webp',
  chart1: 'https://images.esy.com/essays/test-fixture/chart1.d4e5f6.webp',
  chart2: 'https://images.esy.com/essays/test-fixture/chart2.g7h8i9.webp',
  diagram: 'https://images.esy.com/essays/test-fixture/diagram.j0k1l2.webp',
  portrait: 'https://images.esy.com/essays/test-fixture/portrait.m3n4o5.webp',
  landscape: 'https://images.esy.com/essays/test-fixture/landscape.p6q7r8.webp',
} as const;

export const IMAGE_CREDITS = {
  hero: { source: 'Test Museum', license: 'CC BY 4.0', url: 'https://example.com/hero' },
  chart1: { source: 'Test Archive', license: 'Public Domain', url: 'https://example.com/chart1' },
  chart2: { source: 'Test Archive', license: 'Public Domain', url: 'https://example.com/chart2' },
  diagram: { source: 'Test Institute', license: 'CC BY-SA 4.0', url: 'https://example.com/diagram' },
  portrait: { source: 'Test Gallery', license: 'CC BY 4.0', url: 'https://example.com/portrait' },
  landscape: { source: 'Test Collection', license: 'Public Domain', url: 'https://example.com/landscape' },
} as const;

export const SOURCES = [
  { title: 'Einstein, A. (1905)', url: 'https://doi.org/10.1002/andp.19053221004' },
  { title: 'NASA (2024)', url: 'https://science.nasa.gov/speed-of-light' },
  { title: 'Feynman, R. (1964)', url: 'https://www.feynmanlectures.caltech.edu' },
  { title: 'CERN (2024)', url: 'https://home.cern/science/accelerators' },
] as const;
