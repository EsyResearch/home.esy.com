/**
 * ArtifactDetail — Shared Component
 * ==================================
 * 
 * Wraps any visual essay in the Artifact Detail chrome layer:
 * toolbar, hero, spec panel, content frame, and footer.
 * 
 * Usage in a visual essay page.tsx:
 * ```tsx
 * import ArtifactDetailWrapper from '@/components/ArtifactDetail';
 * 
 * const ESSAY_META = {
 *   title: 'My Essay Title',
 *   subtitle: 'A compelling subtitle',
 *   category: 'Science',
 *   subcategory: 'Physics',
 *   readTime: '15 min',
 *   sourceCount: 12,
 *   sourceTier: 'Tier-1',
 *   sectionCount: 8,
 *   visualizationCount: 5,
 *   designSystem: 'Subject-derived',
 *   published: 'February 8, 2026',
 *   model: 'Claude Opus 4.6',
 *   template: 'Visual Essay',
 *   backLink: '/essays',
 *   backLabel: 'Essays',
 *   palette: [
 *     { name: 'Primary', color: '#10B981' },
 *   ],
 *   visualizations: [
 *     { name: 'Hero Viz', type: 'Three.js 3D' },
 *   ],
 *   keySources: ['Author (Year)'],
 * };
 * 
 * export default function MyEssayPage() {
 *   return (
 *     <ArtifactDetailWrapper meta={ESSAY_META}>
 *       <MyEssayClient />
 *     </ArtifactDetailWrapper>
 *   );
 * }
 * ```
 */

export { default } from './ArtifactDetail';
