"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  publishedInfographics,
  getUniqueClusters,
  CLUSTER_LABELS,
  INFOGRAPHIC_CATEGORY_COLORS,
  type Infographic,
} from "@/data/infographics";
import "./infographics.css";

const ALL_FILTER = "__all__";

function InfographicCard({ infographic }: { infographic: Infographic }) {
  const [imageError, setImageError] = useState(false);
  const color =
    INFOGRAPHIC_CATEGORY_COLORS[
      infographic.category as keyof typeof INFOGRAPHIC_CATEGORY_COLORS
    ] || "#6B7280";

  return (
    <Link
      href={`/infographics/${infographic.id}`}
      className="infographic-card"
    >
      <div className="infographic-card__image-wrap">
        {!imageError ? (
          <Image
            src={infographic.thumbnailSrc || infographic.imageSrc}
            alt={infographic.imageAlt}
            width={infographic.width}
            height={infographic.height}
            className="infographic-card__image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: `${infographic.width} / ${infographic.height}`,
              background: "linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.75rem",
            }}
          >
            Infographic
          </div>
        )}
      </div>

      <div className="infographic-card__meta">
        <div className="infographic-card__meta-row">
          <span
            className="infographic-card__cluster"
            style={{ color, backgroundColor: `${color}15` }}
          >
            {CLUSTER_LABELS[infographic.cluster] || infographic.cluster}
          </span>
          <span className="infographic-card__badge">Infographic</span>
        </div>
        <h3 className="infographic-card__title">{infographic.title}</h3>
      </div>
    </Link>
  );
}

const CARD_FAN_COUNT = 5;

function CoverflowHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const items = publishedInfographics.slice(0, CARD_FAN_COUNT);

  useEffect(() => {
    if (isHovering || items.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering, items.length]);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  if (items.length === 0) return null;

  const active = items[activeIndex] || items[0];
  const activeColor =
    INFOGRAPHIC_CATEGORY_COLORS[
      active.category as keyof typeof INFOGRAPHIC_CATEGORY_COLORS
    ] || "#6B7280";

  return (
    <section className="ig-hero">
      <div className="ig-hero__heading">
        <h1 className="ig-hero__page-title">Research Infographics</h1>
        <p className="ig-hero__page-subtitle">
          Citation-verified visual knowledge. Every data point traces to a
          verified source.
        </p>
      </div>

      <div
        className="ig-coverflow"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Prev / Next arrows */}
        {items.length > 1 && (
          <>
            <button className="ig-coverflow__arrow ig-coverflow__arrow--prev" onClick={goPrev} aria-label="Previous">
              <ArrowRight size={18} />
            </button>
            <button className="ig-coverflow__arrow ig-coverflow__arrow--next" onClick={goNext} aria-label="Next">
              <ArrowRight size={18} />
            </button>
          </>
        )}

        <div className="ig-coverflow__track">
          {items.map((item, i) => {
            let offset = i - activeIndex;
            // Wrap for seamless look
            if (offset > Math.floor(items.length / 2)) offset -= items.length;
            if (offset < -Math.floor(items.length / 2)) offset += items.length;

            const isActive = offset === 0;
            const absOffset = Math.abs(offset);
            const clampedOffset = Math.max(-2, Math.min(2, offset));

            const translateX = clampedOffset * 38;
            const rotateY = clampedOffset * -45;
            const translateZ = isActive ? 0 : -150 - absOffset * 40;
            const scale = isActive ? 1 : 0.75;
            const opacity = absOffset > 2 ? 0 : isActive ? 1 : 0.6;
            const zIndex = 10 - absOffset;

            return (
              <Link
                key={item.id}
                href={`/infographics/${item.id}`}
                className={`ig-coverflow__card ${isActive ? "ig-coverflow__card--active" : ""}`}
                style={{
                  transform: `translateX(${translateX}%) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  pointerEvents: absOffset > 2 ? "none" : "auto",
                }}
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
              >
                <Image
                  src={item.thumbnailSrc || item.imageSrc}
                  alt={item.imageAlt}
                  width={item.width}
                  height={item.height}
                  className="ig-coverflow__image"
                  priority={i < 3}
                  sizes="(max-width: 768px) 90vw, 640px"
                />
              </Link>
            );
          })}
        </div>

        {items.length > 1 && (
          <div className="ig-coverflow__dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`ig-coverflow__dot ${i === activeIndex ? "ig-coverflow__dot--active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`View infographic ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="ig-hero__content">
        <div className="ig-hero__meta-row">
          <span
            className="ig-hero__cluster"
            style={{ color: activeColor, backgroundColor: `${activeColor}15` }}
          >
            {CLUSTER_LABELS[active.cluster] || active.cluster}
          </span>
        </div>

        <h2 className="ig-hero__title">
          <Link href={`/infographics/${active.id}`}>{active.title}</Link>
        </h2>

        <p className="ig-hero__description">{active.description}</p>

        <Link href={`/infographics/${active.id}`} className="ig-hero__cta">
          View Infographic <ArrowRight size={14} />
        </Link>
      </div>

      <div className="ig-hero__stats-bar">
        <div className="ig-hero__stat">
          <span className="ig-hero__stat-value">{publishedInfographics.length}</span>
          <span className="ig-hero__stat-label">Infographics</span>
        </div>
        <span className="ig-hero__stat-divider">&middot;</span>
        <div className="ig-hero__stat">
          <span className="ig-hero__stat-label">All Citation-Verified</span>
        </div>
      </div>
    </section>
  );
}

export default function InfographicsIndexClient() {
  const [activeCluster, setActiveCluster] = useState(ALL_FILTER);
  const clusters = useMemo(() => getUniqueClusters(), []);

  const heroIds = useMemo(
    () => new Set(publishedInfographics.slice(0, CARD_FAN_COUNT).map((i) => i.id)),
    []
  );

  const nonFeatured = useMemo(() => {
    const base =
      activeCluster === ALL_FILTER
        ? publishedInfographics
        : publishedInfographics.filter((i) => i.cluster === activeCluster);
    return base.filter((i) => !heroIds.has(i.id));
  }, [activeCluster, heroIds]);

  return (
    <div className="infographics-index">
      {/* Coverflow Hero */}
      <CoverflowHero />

      {/* Cluster Filters + Grid (only if there are non-featured items) */}
      {(nonFeatured.length > 0 || clusters.length > 1) && (
        <>
          {clusters.length > 1 && (
            <nav className="infographics-filters">
              <button
                className={`infographics-filter-btn ${activeCluster === ALL_FILTER ? "infographics-filter-btn--active" : ""}`}
                onClick={() => setActiveCluster(ALL_FILTER)}
              >
                All
              </button>
              {clusters.map((cluster) => (
                <button
                  key={cluster}
                  className={`infographics-filter-btn ${activeCluster === cluster ? "infographics-filter-btn--active" : ""}`}
                  onClick={() => setActiveCluster(cluster)}
                >
                  {CLUSTER_LABELS[cluster] || cluster}
                </button>
              ))}
            </nav>
          )}

          {nonFeatured.length > 0 && (
            <div className="infographics-masonry">
              {nonFeatured.map((infographic) => (
                <InfographicCard
                  key={infographic.id}
                  infographic={infographic}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Coming Soon */}
      <section className="ig-coming-soon">
        <p className="ig-coming-soon__text">
          More research infographics in development. Each piece is
          citation-verified and designed to make complex knowledge accessible.
        </p>
      </section>
    </div>
  );
}
