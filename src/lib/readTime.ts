const WORDS_PER_MINUTE = 238;
const MINUTES_PER_IMAGE = 0.2;
const MINUTES_PER_VISUALIZATION = 0.4;

export interface ReadTimeInput {
  wordCount: number;
  imageCount: number;
  vizCount: number;
}

/**
 * Computes estimated reading time from actual content metrics.
 *
 * 238 WPM — standard for technical/educational content (Medium uses 265
 * for general prose; we lower it for dense science/history with images).
 * Each image adds ~12 s (0.2 min) viewing time; each interactive
 * visualization adds ~24 s (0.4 min) exploration time.
 */
export function computeReadTime({ wordCount, imageCount, vizCount }: ReadTimeInput): number {
  const textMinutes = wordCount / WORDS_PER_MINUTE;
  const imageMinutes = imageCount * MINUTES_PER_IMAGE;
  const vizMinutes = vizCount * MINUTES_PER_VISUALIZATION;
  return Math.ceil(textMinutes + imageMinutes + vizMinutes);
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min`;
}
