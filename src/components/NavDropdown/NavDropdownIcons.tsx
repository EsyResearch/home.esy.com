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

/**
 * ChatGPT Icon
 * Represents: OpenAI's ChatGPT logo - the distinctive hexagonal/flower shape
 * Based on OpenAI's official branding
 */
export const ChatGPTIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="ChatGPT Prompts"
  >
    {/* OpenAI logo - hexagonal flower shape made of curved segments */}
    <path
      d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.1408 1.6465 4.4708 4.4708 0 0 1 .5765 3.0137zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Claude Icon
 * Represents: Anthropic's Claude logo - the distinctive starburst/sunburst shape
 * Based on Anthropic's official branding
 */
export const ClaudeIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Claude Prompts"
  >
    {/* Claude/Anthropic logo - stylized sunburst/starburst */}
    <path
      d="M4.709 15.955l4.72-2.727.79 2.042-4.71 2.727-.8-2.042zm8.727-4.199L18.5 8.589l.8 2.042-5.064 3.167-.8-2.042zm-6.327.364l5.064-2.923.8 2.042-5.064 2.923-.8-2.042zm8.727-4.199l4.455-2.573.8 2.042-4.455 2.573-.8-2.042zM3.91 13.913l5.064-2.923.8 2.042-5.064 2.923-.8-2.042zm8.727-4.199l5.064-2.923.8 2.042-5.064 2.923-.8-2.042z"
      fill="currentColor"
    />
    <path
      d="M15.845 18.041l-4.72-2.727.79-2.042 4.72 2.727-.79 2.042zm-8.727-4.199L2.054 10.675l.8-2.042 5.064 3.167-.8 2.042zm6.327.364l-5.064-2.923.8-2.042 5.064 2.923-.8 2.042zm-8.727-4.199L.263 7.434l.8-2.042 4.455 2.573-.8 2.042zm12.972 8.398l-5.064-2.923.8-2.042 5.064 2.923-.8 2.042zm-8.727-4.199l-5.064-2.923.8-2.042 5.064 2.923-.8 2.042z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Gemini Icon
 * Represents: Google's Gemini logo - the distinctive four-pointed star
 * Based on Google's official Gemini branding
 */
export const GeminiIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Gemini Prompts"
  >
    {/* Gemini logo - stylized four-pointed star with gradient feel */}
    <path
      d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"
      fill="currentColor"
    />
  </svg>
);

// Export all icons
export const NavIcons = {
  VisualEssays: VisualEssaysIcon,
  EssayExamples: EssayExamplesIcon,
  WritingGuides: WritingGuidesIcon,
  QuillGuides: QuillGuidesIcon,
  LightbulbPath: LightbulbPathIcon,
  ChatGPT: ChatGPTIcon,
  Claude: ClaudeIcon,
  Gemini: GeminiIcon,
};

export default NavIcons;

