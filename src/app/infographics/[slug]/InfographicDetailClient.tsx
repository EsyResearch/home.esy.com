"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronDown } from "lucide-react";
import {
  type Infographic,
  CLUSTER_LABELS,
  INFOGRAPHIC_CATEGORY_COLORS,
  getInfographicsByCluster,
} from "@/data/infographics";
import "../infographics.css";

interface Props {
  infographic: Infographic;
}

function CollapsiblePanel({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="infographic-detail__panel">
      <div
        className="infographic-detail__panel-header"
        onClick={() => setOpen(!open)}
      >
        <h2 className="infographic-detail__panel-title">{title}</h2>
        <span
          className={`infographic-detail__panel-toggle ${open ? "infographic-detail__panel-toggle--open" : ""}`}
        >
          <ChevronDown size={14} />
        </span>
      </div>
      <div
        className={`infographic-detail__panel-content ${!open ? "infographic-detail__panel-content--collapsed" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export default function InfographicDetailClient({ infographic }: Props) {
  const clusterColor =
    INFOGRAPHIC_CATEGORY_COLORS[
      infographic.category as keyof typeof INFOGRAPHIC_CATEGORY_COLORS
    ] || "#6B7280";

  const clusterLabel =
    CLUSTER_LABELS[infographic.cluster] || infographic.cluster;

  const relatedInCluster = getInfographicsByCluster(infographic.cluster).filter(
    (i) => i.id !== infographic.id
  );

  const formattedDate = new Date(infographic.publishedDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const hasDataPoints = infographic.dataPoints && infographic.dataPoints.length > 0;
  const hasSources = infographic.sources && infographic.sources.length > 0;
  const hasRelatedEssays = infographic.relatedEssays && infographic.relatedEssays.length > 0;

  return (
    <article className="infographic-detail">
      {/* Breadcrumb */}
      <nav className="infographic-detail__nav">
        <Link href="/infographics" className="infographic-detail__back">
          <ArrowLeft size={14} />
          Infographics
        </Link>
      </nav>

      {/* Header */}
      <header className="infographic-detail__header">
        <span
          className="infographic-detail__cluster-badge"
          style={{ color: clusterColor, backgroundColor: `${clusterColor}15` }}
        >
          {clusterLabel}
        </span>
        <h1 className="infographic-detail__title">{infographic.title}</h1>
        <p className="infographic-detail__description">
          {infographic.description}
        </p>
        <time
          className="infographic-detail__date"
          dateTime={infographic.publishedDate}
        >
          {formattedDate}
        </time>
      </header>

      {/* Full-Width Image */}
      <section className="infographic-detail__image-section">
        <div className="infographic-detail__image-container">
          <Image
            src={infographic.imageSrc}
            alt={infographic.imageAlt}
            width={infographic.width}
            height={infographic.height}
            quality={95}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </section>

      {/* Metadata Panels */}
      {(hasDataPoints || hasSources) && (
        <div className="infographic-detail__metadata">
          {hasDataPoints && (
            <CollapsiblePanel title="Key Data" defaultOpen={true}>
              <ul className="infographic-detail__data-list">
                {infographic.dataPoints!.map((dp, i) => (
                  <li key={i} className="infographic-detail__data-item">
                    <span className="infographic-detail__data-label">
                      {dp.label}
                    </span>
                    <span className="infographic-detail__data-value">
                      {dp.value}
                    </span>
                  </li>
                ))}
              </ul>
            </CollapsiblePanel>
          )}

          {hasSources && (
            <CollapsiblePanel title="Sources" defaultOpen={false}>
              <ul className="infographic-detail__sources-list">
                {infographic.sources!.map((source, i) => (
                  <li key={i} className="infographic-detail__source">
                    {source}
                  </li>
                ))}
              </ul>
            </CollapsiblePanel>
          )}
        </div>
      )}

      {/* Related Visual Essays */}
      {hasRelatedEssays && (
        <section className="infographic-detail__related">
          <h2 className="infographic-detail__related-title">
            Related Visual Essays
          </h2>
          <div className="infographic-detail__related-grid">
            {infographic.relatedEssays!.map((href) => {
              const essayName = href
                .split("/")
                .pop()
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
              return (
                <Link
                  key={href}
                  href={href}
                  className="infographic-detail__related-link"
                >
                  <div className="infographic-detail__related-link-label">
                    Visual Essay
                  </div>
                  {essayName}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Infographics from same cluster */}
      {relatedInCluster.length > 0 && (
        <section className="infographic-detail__related">
          <h2 className="infographic-detail__related-title">
            More in {clusterLabel}
          </h2>
          <div className="infographic-detail__related-grid">
            {relatedInCluster.map((related) => (
              <Link
                key={related.id}
                href={`/infographics/${related.id}`}
                className="infographic-detail__related-link"
              >
                <div className="infographic-detail__related-link-label">
                  Infographic
                </div>
                {related.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <footer className="infographic-detail__cta">
        <p className="infographic-detail__cta-text">
          More infographics in development. Each piece is citation-verified
          and designed to make complex knowledge accessible.{" "}
          <Link href="/infographics" className="infographic-detail__cta-link">
            Explore all infographics
          </Link>
        </p>
      </footer>
    </article>
  );
}
