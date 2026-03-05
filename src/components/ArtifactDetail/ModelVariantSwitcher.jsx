'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getVariantGroup } from '@/data/visualEssays';
import { resolveModelLabel, getModelEntry, isModelId } from '@/lib/models/registry';

const VENDOR_COLORS = {
  'Anthropic': '#D97757',
  'OpenAI': '#10A37F',
  'Google': '#4285F4',
  'Meta': '#0668E1',
};

function getVendorColor(modelId) {
  if (!modelId || !isModelId(modelId)) return '#888';
  const entry = getModelEntry(modelId);
  return entry ? (VENDOR_COLORS[entry.vendor] || '#888') : '#888';
}

function getVendorName(modelId) {
  if (!modelId || !isModelId(modelId)) return null;
  const entry = getModelEntry(modelId);
  return entry?.vendor || null;
}

/**
 * Artifact version switcher — shows all builds of the same essay spec.
 * Renders only when spec is set and multiple builds exist.
 * Designed to sit inside the spec panel grid as a full-width card.
 */
export default function ModelVariantSwitcher({ spec }) {
  const pathname = usePathname();

  if (!spec) return null;

  const variants = getVariantGroup(spec);
  if (variants.length <= 1) return null;

  const builds = variants.map(v => ({
    id: v.id,
    href: v.href,
    label: v.buildModel ? resolveModelLabel(v.buildModel) : 'Original',
    vendor: v.buildModel ? getVendorName(v.buildModel) : null,
    vendorColor: v.buildModel ? getVendorColor(v.buildModel) : '#888',
    isActive: pathname === v.href || pathname === v.href + '/',
    isCanonical: !v.variant,
  }));

  // For canonical page (base URL), mark it active if no variant matches
  const anyActive = builds.some(b => b.isActive);
  if (!anyActive) {
    const canonical = builds.find(b => b.isCanonical);
    if (canonical) canonical.isActive = true;
  }

  return (
    <div className="artifact-detail-spec__card artifact-detail-spec__card--builds">
      <div className="artifact-detail-spec__card-label">Artifact Versions</div>
      <div className="model-switcher-compact">
        {builds.map(b => (
          <Link
            key={b.id}
            href={b.href}
            className={`model-switcher-compact__pill ${b.isActive ? 'model-switcher-compact__pill--active' : ''}`}
          >
            <span
              className="model-switcher-compact__dot"
              style={{ '--dot-color': b.vendorColor }}
            />
            <span className="model-switcher-compact__label">{b.label}</span>
            {b.isCanonical && (
              <span className="model-switcher-compact__canonical">Canonical</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
