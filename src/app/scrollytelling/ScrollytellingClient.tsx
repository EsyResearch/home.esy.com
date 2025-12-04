"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Sparkles, Globe, History, Trophy, Utensils, Bike, Footprints } from "lucide-react";

// Elevated Dark Theme from DESIGN_SYSTEM.md
const colors = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderSubtle: 'rgba(63, 63, 70, 0.2)',
  accent: '#8b5cf6',
  accentLight: '#a78bfa',
};

interface Story {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  readTime: string;
  href: string;
  icon: React.ReactNode;
  isNew?: boolean;
  isFeatured?: boolean;
}

const ScrollytellingClient = () => {
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);

  const stories: Story[] = [
    {
      id: "who-invented-high-heels",
      title: "The High Heels Story",
      subtitle: "500 Years of Elevation",
      description:
        "From Persian cavalrymen to Parisian runways, discover the extraordinary 500-year journey of the high heel—from military equipment to fashion icon. Experience the rise and fall (literally) of humanity's most provocative footwear.",
      category: "Fashion History",
      readTime: "14 min",
      href: "/scrollytelling/who-invented-high-heels",
      icon: <Footprints className="w-6 h-6" />,
      isNew: true,
      isFeatured: true,
    },
    {
      id: "who-invented-the-bicycle",
      title: "The Bicycle Story",
      subtitle: "200 Years of Two Wheels",
      description:
        "From Karl von Drais's 1817 running machine to modern carbon fiber racers, discover the 200-year journey of the bicycle—the invention that changed transportation, liberated women, and became humanity's most efficient machine.",
      category: "Transportation History",
      readTime: "10 min",
      href: "/scrollytelling/who-invented-the-bicycle",
      icon: <Bike className="w-6 h-6" />,
      isNew: false,
      isFeatured: false,
    },
    {
      id: "who-invented-the-spoon",
      title: "The Spoon Story",
      subtitle: "30,000 Years of Humanity's Essential Tool",
      description:
        "From prehistoric bone carvings to silver apostle spoons to modern stainless steel, discover the extraordinary 30,000-year journey of the spoon—humanity's oldest and most universal eating utensil. An immersive journey through time.",
      category: "Material Culture",
      readTime: "10 min",
      href: "/scrollytelling/who-invented-the-spoon",
      icon: <Utensils className="w-6 h-6" />,
      isNew: false,
      isFeatured: false,
    },
    {
      id: "who-invented-basketball",
      title: "The Basketball Story",
      subtitle: "From Peach Baskets to Global Phenomenon",
      description:
        "Experience the 134-year journey of basketball from Dr. James Naismith's invention in 1891 to the modern NBA. Travel through time as peach baskets become billion-dollar arenas and playground games become global culture.",
      category: "Sports History",
      readTime: "10 min",
      href: "/scrollytelling/who-invented-basketball",
      icon: <Trophy className="w-6 h-6" />,
      isNew: false,
      isFeatured: false,
    },
    {
      id: "who-invented-the-fork",
      title: "Who Invented the Fork?",
      subtitle: "A Journey Through Time",
      description:
        "From ancient Mesopotamian temples to modern tables, discover the extraordinary 4,000-year journey of humanity's most revolutionary eating utensil. Travel through Byzantine courts, Renaissance Italy, and medieval Europe in this immersive historical narrative.",
      category: "History",
      readTime: "12 min",
      href: "/scrollytelling/who-invented-the-fork",
      icon: <History className="w-6 h-6" />,
      isNew: false,
      isFeatured: false,
    },
  ];

  const featuredStory = stories.find((s) => s.isFeatured);
  const otherStories = stories.filter((s) => !s.isFeatured);

  return (
    <article
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 3rem)',
        paddingTop: 'clamp(4rem, 10vh, 6rem)',
        paddingBottom: 'clamp(4rem, 8vh, 6rem)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'clamp(3rem, 6vh, 4rem)', maxWidth: '800px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '12px',
            marginBottom: '1.5rem',
          }}
        >
          <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: colors.accent,
            }}
          >
            Scrollytelling
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: colors.text,
          }}
        >
          Stories That Come Alive <span style={{ fontStyle: 'italic', color: colors.accent }}>As You Scroll</span>
        </h1>

        <p
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            marginBottom: '1rem',
            color: colors.muted,
            fontWeight: 500,
          }}
        >
          Experience narratives like never before. Each scrollytelling piece combines visual design, interactive
          elements, and compelling prose to create immersive journeys through history, culture, and ideas.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.875rem',
            color: colors.subtle,
            marginTop: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen className="w-4 h-4" />
            <span>{stories.length} {stories.length === 1 ? 'Story' : 'Stories'}</span>
          </div>
          <span>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe className="w-4 h-4" />
            <span>Immersive Experiences</span>
          </div>
        </div>
      </div>

      {/* What is Scrollytelling */}
      <section
        style={{
          marginBottom: 'clamp(4rem, 8vh, 6rem)',
          paddingTop: 'clamp(2rem, 4vh, 3rem)',
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-literata), Georgia, serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            color: colors.text,
          }}
        >
          What is Scrollytelling?
        </h2>

        <div style={{ maxWidth: '800px' }}>
          <p
            style={{
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              color: colors.muted,
            }}
          >
            <strong style={{ fontWeight: 600, color: colors.text }}>Scrollytelling</strong> is a digital narrative
            format that uses the scroll interaction to progressively reveal and animate content. As you scroll down the
            page, the story unfolds through carefully choreographed text, visuals, and interactive elements.
          </p>

          <p
            style={{
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              color: colors.muted,
            }}
          >
            This format transforms passive reading into an{' '}
            <strong style={{ fontWeight: 600, color: colors.text }}>active experience</strong>, allowing stories to be
            told with cinematic timing and visual sophistication. It&apos;s storytelling designed for the web—taking
            full advantage of the medium&apos;s unique capabilities.
          </p>

          <div
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
              border: `1px solid rgba(139, 92, 246, 0.2)`,
              borderRadius: '12px',
              padding: '1.5rem',
              marginTop: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  flexShrink: 0,
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.accentLight,
                }}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: colors.muted,
                  }}
                >
                  <strong style={{ color: colors.text }}>Pro Tip:</strong> For the best experience, view
                  scrollytelling pieces on a desktop or tablet with a large screen. Take your time, scroll slowly, and
                  let each scene unfold naturally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredStory && (
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-literata), Georgia, serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                color: colors.text,
              }}
            >
              Featured Story
            </h2>
            {featuredStory.isNew && (
              <span
                style={{
                  padding: '0.25rem 0.625rem',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                New
              </span>
            )}
          </div>

          <Link href={featuredStory.href} style={{ textDecoration: 'none' }}>
            <div
              onMouseEnter={() => setHoveredStory(featuredStory.id)}
              onMouseLeave={() => setHoveredStory(null)}
              style={{
                background:
                  hoveredStory === featuredStory.id
                    ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                border: `1px solid ${
                  hoveredStory === featuredStory.id ? 'rgba(159, 122, 234, 0.3)' : colors.border
                }`,
                borderRadius: '16px',
                padding: 'clamp(2rem, 4vw, 3rem)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow:
                  hoveredStory === featuredStory.id
                    ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15)',
                transform: hoveredStory === featuredStory.id ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {/* Category Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.accentLight,
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
                  }}
                >
                  {featuredStory.icon}
                </div>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(139, 92, 246, 0.2)',
                    color: colors.accent,
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                >
                  {featuredStory.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3
                style={{
                  fontFamily: 'var(--font-literata), Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem',
                  color: colors.text,
                }}
              >
                {featuredStory.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-literata), Georgia, serif',
                  fontSize: '1.125rem',
                  fontStyle: 'italic',
                  color: colors.accentLight,
                  marginBottom: '1.5rem',
                }}
              >
                {featuredStory.subtitle}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: colors.muted,
                  marginBottom: '1.5rem',
                }}
              >
                {featuredStory.description}
              </p>

              {/* Footer with meta info and CTA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  paddingTop: '1.5rem',
                  borderTop: `1px solid ${colors.borderSubtle}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: colors.subtle }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock className="w-4 h-4" />
                    <span>{featuredStory.readTime}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: colors.accent,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  <span>Begin Journey</span>
                  <ArrowRight
                    className="w-4 h-4"
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: hoveredStory === featuredStory.id ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* All Stories Grid */}
      {otherStories.length > 0 && (
        <section style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-literata), Georgia, serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
              color: colors.text,
            }}
          >
            All Stories
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {otherStories.map((story) => (
              <Link key={story.id} href={story.href} style={{ textDecoration: 'none' }}>
                <div
                  onMouseEnter={() => setHoveredStory(story.id)}
                  onMouseLeave={() => setHoveredStory(null)}
                  style={{
                    background:
                      hoveredStory === story.id
                        ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                        : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                    border: `1px solid ${hoveredStory === story.id ? 'rgba(159, 122, 234, 0.3)' : colors.border}`,
                    borderRadius: '16px',
                    padding: '1.75rem',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    boxShadow:
                      hoveredStory === story.id
                        ? '0 12px 32px rgba(159, 122, 234, 0.2)'
                        : '0 4px 16px rgba(0, 0, 0, 0.15)',
                    transform: hoveredStory === story.id ? 'translateY(-4px)' : 'translateY(0)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column' as const,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(139, 92, 246, 0.2)',
                        color: colors.accent,
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                      }}
                    >
                      {story.category}
                    </span>
                    {story.isNew && (
                      <span
                        style={{
                          padding: '0.25rem 0.625rem',
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                          color: '#ffffff',
                          borderRadius: '8px',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        New
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-literata), Georgia, serif',
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                      marginBottom: '0.5rem',
                      color: colors.text,
                    }}
                  >
                    {story.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-literata), Georgia, serif',
                      fontSize: '1rem',
                      fontStyle: 'italic',
                      color: colors.accentLight,
                      marginBottom: '1rem',
                    }}
                  >
                    {story.subtitle}
                  </p>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: colors.muted,
                      marginBottom: '1.5rem',
                      flexGrow: 1,
                    }}
                  >
                    {story.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: `1px solid ${colors.borderSubtle}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: colors.subtle }}>
                      <Clock className="w-4 h-4" />
                      <span>{story.readTime}</span>
                    </div>

                    <ArrowRight
                      className="w-4 h-4"
                      style={{
                        color: colors.accent,
                        transition: 'transform 0.2s ease',
                        transform: hoveredStory === story.id ? 'translateX(4px)' : 'translateX(0)',
                      }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon Section */}
      <section
        style={{
          marginTop: 'clamp(4rem, 8vh, 6rem)',
          paddingTop: 'clamp(3rem, 6vh, 4rem)',
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <Sparkles className="w-8 h-8" style={{ color: colors.accentLight }} />
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-literata), Georgia, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              marginBottom: '1rem',
              color: colors.text,
            }}
          >
            More Stories Coming Soon
          </h3>

          <p
            style={{
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              color: colors.muted,
            }}
          >
            We&apos;re crafting new immersive narratives covering science, art, technology, and culture. Each
            scrollytelling piece takes weeks to research, design, and develop—ensuring every journey is unforgettable.
          </p>
        </div>
      </section>
    </article>
  );
};

export default ScrollytellingClient;

