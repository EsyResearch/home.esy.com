"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

interface AgentsVideoSectionProps {
  /** YouTube video ID (e.g. "dQw4w9WgXcQ") */
  videoId: string;
  /** Display title shown on the collapsed bar */
  title: string;
  /** e.g. "12 min" */
  duration?: string;
  /** Optional subtitle shown when expanded */
  description?: string;
}

export function AgentsVideoSection({
  videoId,
  title,
  duration,
  description,
}: AgentsVideoSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="agents-video-section"
      data-open={isOpen}
    >
      {/* Collapsed trigger bar */}
      <button
        type="button"
        className="agents-video-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="agents-video-panel"
      >
        <span className="agents-video-trigger-left">
          <span className="agents-video-play-icon">
            {isOpen ? <X size={14} /> : <Play size={14} />}
          </span>
          <span className="agents-video-label">Video Edition</span>
          <span className="agents-video-title">{title}</span>
        </span>
        {duration && (
          <span className="agents-video-duration">{duration}</span>
        )}
      </button>

      {/* Video panel — conditionally rendered */}
      {isOpen && (
        <div
          id="agents-video-panel"
          className="agents-video-panel"
          role="region"
          aria-label="Video player"
        >
          {description && (
            <p className="agents-video-description">{description}</p>
          )}
          <div className="agents-video-embed">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
