"use client";

import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Visual Essays Icon
 * Represents: Interactive storytelling, cinematic experience, scroll-driven narrative
 * Design: Layered frames suggesting depth and motion, with a sparkle accent
 */
export const VisualEssaysIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Visual Essays"
  >
    {/* Back layer - suggesting depth */}
    <rect
      x="6"
      y="3"
      width="14"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.3"
    />
    {/* Middle layer */}
    <rect
      x="4"
      y="5"
      width="14"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.5"
    />
    {/* Front layer - main frame */}
    <rect
      x="2"
      y="7"
      width="14"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.75"
      fill="none"
    />
    {/* Play triangle - suggesting interactivity */}
    <path
      d="M7.5 11.5L12.5 14.5L7.5 17.5V11.5Z"
      fill="currentColor"
      opacity="0.9"
    />
    {/* Sparkle accent - top right */}
    <path
      d="M20 4L20.5 5.5L22 6L20.5 6.5L20 8L19.5 6.5L18 6L19.5 5.5L20 4Z"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);

/**
 * Essay Examples Icon
 * Represents: Academic writing samples, text content, readable documents
 * Design: Document with text lines and a subtle academic flourish
 */
export const EssayExamplesIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Essay Examples"
  >
    {/* Document body */}
    <path
      d="M4 4C4 2.89543 4.89543 2 6 2H14L20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z"
      stroke="currentColor"
      strokeWidth="1.75"
      fill="none"
    />
    {/* Folded corner */}
    <path
      d="M14 2V6C14 7.10457 14.8954 8 16 8H20"
      stroke="currentColor"
      strokeWidth="1.75"
      fill="none"
    />
    {/* Text lines - staggered for visual interest */}
    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="15.5" x2="14" y2="15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <line x1="8" y1="19" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

/**
 * Writing Guides Icon
 * Represents: Step-by-step tutorials, learning path, guidance
 * Design: Compass/map pin with directional elements suggesting navigation through content
 */
export const WritingGuidesIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Writing Guides"
  >
    {/* Compass outer ring */}
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.75"
      fill="none"
    />
    {/* Inner decorative ring */}
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.3"
      fill="none"
    />
    {/* Compass needle - pointing direction */}
    <path
      d="M12 5L14 12L12 14L10 12L12 5Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M12 19L10 12L12 10L14 12L12 19Z"
      fill="currentColor"
      opacity="0.4"
    />
    {/* Cardinal points */}
    <circle cx="12" cy="4" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="20" cy="12" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="4" cy="12" r="1" fill="currentColor" opacity="0.4" />
  </svg>
);

/**
 * Alternative: Quill/Pen Writing Guide Icon
 * More traditional academic feel
 */
export const QuillGuidesIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Writing Guides"
  >
    {/* Quill feather */}
    <path
      d="M20 2C15 4 10 9 8 14C7 16.5 6.5 19 6 22L8 20C10 18 12 15 14 12C16 9 18 6 20 2Z"
      stroke="currentColor"
      strokeWidth="1.75"
      fill="none"
      strokeLinejoin="round"
    />
    {/* Feather center line */}
    <path
      d="M14 8C12 11 10 15 8 18"
      stroke="currentColor"
      strokeWidth="1.25"
      opacity="0.5"
      strokeLinecap="round"
    />
    {/* Ink line being written */}
    <path
      d="M3 21L7 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Small dots suggesting steps/progression */}
    <circle cx="4" cy="17" r="0.75" fill="currentColor" opacity="0.4" />
    <circle cx="6" cy="14" r="0.75" fill="currentColor" opacity="0.5" />
    <circle cx="9" cy="11" r="0.75" fill="currentColor" opacity="0.6" />
  </svg>
);

/**
 * Lightbulb Path Icon - Alternative for guides
 * Suggests illumination and learning journey
 */
export const LightbulbPathIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Writing Guides"
  >
    {/* Lightbulb */}
    <path
      d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 11.2208 7.2066 13.1599 9 14.1973V17C9 17.5523 9.44772 18 10 18H14C14.5523 18 15 17.5523 15 17V14.1973C16.7934 13.1599 18 11.2208 18 9C18 5.68629 15.3137 3 12 3Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Filament glow lines */}
    <path
      d="M12 7V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Rays suggesting illumination */}
    <path d="M12 1V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <path d="M4.22 4.22L4.93 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <path d="M19.78 4.22L19.07 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
  </svg>
);

// Export all icons
export const NavIcons = {
  VisualEssays: VisualEssaysIcon,
  EssayExamples: EssayExamplesIcon,
  WritingGuides: WritingGuidesIcon,
  QuillGuides: QuillGuidesIcon,
  LightbulbPath: LightbulbPathIcon,
};

export default NavIcons;

