export const IMAGES = {
  hero: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/test-hero.jpg',
  chart1: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/test-chart1.jpg',
  chart2: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/test-chart2.jpg',
  diagram: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/test-diagram.jpg',
  portrait: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/test-portrait.jpg',
  landscape: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/test-landscape.jpg',
} as const;

export const IMAGE_CREDITS = {
  hero: { source: 'Wikimedia Commons', license: 'CC BY 4.0', url: 'https://commons.wikimedia.org/wiki/File:test-hero.jpg' },
  chart1: { source: 'Wikimedia Commons', license: 'Public Domain', url: 'https://commons.wikimedia.org/wiki/File:test-chart1.jpg' },
  chart2: { source: 'Wikimedia Commons', license: 'Public Domain', url: 'https://commons.wikimedia.org/wiki/File:test-chart2.jpg' },
  diagram: { source: 'Wikimedia Commons', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:test-diagram.jpg' },
  portrait: { source: 'Wikimedia Commons', license: 'CC BY 4.0', url: 'https://commons.wikimedia.org/wiki/File:test-portrait.jpg' },
  landscape: { source: 'Wikimedia Commons', license: 'Public Domain', url: 'https://commons.wikimedia.org/wiki/File:test-landscape.jpg' },
} as const;

export const SOURCES = [
  { title: 'Einstein, A. (1905)', url: 'https://doi.org/10.1002/andp.19053221004' },
  { title: 'NASA (2024)', url: 'https://science.nasa.gov/speed-of-light' },
] as const;
