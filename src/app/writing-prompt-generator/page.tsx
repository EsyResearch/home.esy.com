"use client";

import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, Sparkles, RefreshCw, Copy, Check, Settings, 
  Shuffle, Star, Users, TrendingUp, Clock, BookOpen, 
  PenTool, Brain, Target, Award, Globe, Search, Zap,
  ChevronDown, ArrowRight, Eye, Share2, Heart, Bookmark,
  PlayCircle, BarChart3, Shield, GraduationCap, Hash
} from 'lucide-react';
import Link from 'next/link';

const WritingPromptGenerator = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('any');
  const [selectedType, setSelectedType] = useState('story-starter');
  const [selectedTone, setSelectedTone] = useState('any');
  const [selectedLength, setSelectedLength] = useState('medium');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [includeConstraints, setIncludeConstraints] = useState(true);
  const [includeCharacters, setIncludeCharacters] = useState(true);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [promptsGenerated, setPromptsGenerated] = useState(0);
  const [favoritePrompts, setFavoritePrompts] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentInspiration, setCurrentInspiration] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate inspiration examples
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInspiration(prev => (prev + 1) % inspirationExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: '2.1M+', label: 'Prompts generated', icon: Lightbulb },
    { number: '150K+', label: 'Writers inspired', icon: Users },
    { number: '4.9/5', label: 'Creativity rating', icon: Star },
    { number: 'Free', label: 'Always', icon: Heart }
  ];

  const genres = [
    { id: 'any', name: 'Any Genre', emoji: '🎲', color: '#8b5cf6' },
    { id: 'fantasy', name: 'Fantasy', emoji: '🐉', color: '#f59e0b' },
    { id: 'sci-fi', name: 'Science Fiction', emoji: '🚀', color: '#06b6d4' },
    { id: 'mystery', name: 'Mystery', emoji: '🔍', color: '#6b7280' },
    { id: 'romance', name: 'Romance', emoji: '💕', color: '#ec4899' },
    { id: 'horror', name: 'Horror', emoji: '👻', color: '#dc2626' },
    { id: 'thriller', name: 'Thriller', emoji: '⚡', color: '#7c3aed' },
    { id: 'drama', name: 'Drama', emoji: '🎭', color: '#059669' },
    { id: 'comedy', name: 'Comedy', emoji: '😄', color: '#f97316' },
    { id: 'adventure', name: 'Adventure', emoji: '⚔️', color: '#0891b2' },
    { id: 'historical', name: 'Historical', emoji: '📜', color: '#92400e' },
    { id: 'contemporary', name: 'Contemporary', emoji: '🌆', color: '#4f46e5' }
  ];

  const promptTypes = [
    { id: 'story-starter', name: 'Story Starter', description: 'Opening scenes and situations' },
    { id: 'character-study', name: 'Character Study', description: 'Deep character exploration' },
    { id: 'dialogue-prompt', name: 'Dialogue Prompt', description: 'Conversation-driven scenarios' },
    { id: 'setting-prompt', name: 'Setting Prompt', description: 'Unique worlds and locations' },
    { id: 'conflict-prompt', name: 'Conflict Prompt', description: 'Central tensions and problems' },
    { id: 'twist-prompt', name: 'Plot Twist', description: 'Unexpected story developments' },
    { id: 'emotion-prompt', name: 'Emotional Journey', description: 'Feeling-focused narratives' },
    { id: 'concept-prompt', name: 'High Concept', description: 'Big ideas and themes' }
  ];

  const tones = [
    { id: 'any', name: 'Any Tone', color: '#8b5cf6' },
    { id: 'dark', name: 'Dark', color: '#374151' },
    { id: 'light', name: 'Light', color: '#fbbf24' },
    { id: 'mysterious', name: 'Mysterious', color: '#6366f1' },
    { id: 'humorous', name: 'Humorous', color: '#f59e0b' },
    { id: 'romantic', name: 'Romantic', color: '#ec4899' },
    { id: 'dramatic', name: 'Dramatic', color: '#dc2626' },
    { id: 'inspirational', name: 'Inspirational', color: '#059669' },
    { id: 'melancholic', name: 'Melancholic', color: '#6b7280' }
  ];

  const lengths = [
    { id: 'short', name: 'Short', description: 'Quick inspiration', words: '10-20 words' },
    { id: 'medium', name: 'Medium', description: 'Detailed scenario', words: '30-50 words' },
    { id: 'long', name: 'Long', description: 'Rich context', words: '60-100 words' },
    { id: 'epic', name: 'Epic', description: 'Full backstory', words: '100+ words' }
  ];

  const difficulties = [
    { id: 'beginner', name: 'Beginner', description: 'Simple, accessible prompts' },
    { id: 'intermediate', name: 'Intermediate', description: 'Moderate complexity' },
    { id: 'advanced', name: 'Advanced', description: 'Complex, challenging prompts' },
    { id: 'expert', name: 'Expert', description: 'Highly sophisticated scenarios' }
  ];

  const inspirationExamples = [
    {
      prompt: "A time traveler keeps arriving one day too late to prevent historical disasters, but discovers they're actually causing them by trying to prevent them.",
      genre: "Science Fiction",
      type: "Plot Twist",
      author: "Generated by AI",
      likes: 1247
    },
    {
      prompt: "Every night, your character writes in a diary. Every morning, they wake up to find their entries have been corrected in red ink by an unknown hand.",
      genre: "Mystery",
      type: "Story Starter",
      author: "Generated by AI",
      likes: 892
    },
    {
      prompt: "In a world where emotions are visible as colored auras, your character wakes up one day unable to see any colors at all.",
      genre: "Fantasy",
      type: "High Concept",
      author: "Generated by AI",
      likes: 1543
    }
  ];

  const promptTemplates = {
    'story-starter': [
      "A {character} discovers {object} in {location} that changes everything they thought they knew about {concept}.",
      "Every {time_period}, {character} experiences {event}, but this time something is different.",
      "In a world where {rule}, {character} must {action} before {consequence}.",
      "The last {profession} on Earth receives a message from {source} containing {information}.",
      "{character} wakes up in {location} with no memory of how they got there, holding {object}."
    ],
    'character-study': [
      "Write about {character} who has spent their entire life {habit}, but must now {opposite_action}.",
      "Explore a {profession} who can {ability} but chooses to {limitation} because of {reason}.",
      "{character} has exactly {time_limit} to {goal} before {consequence}.",
      "Your protagonist believes {false_belief} until {revelation} forces them to {realization}."
    ],
    'dialogue-prompt': [
      "Two {characters} are stuck in {location} and must {task} while discussing {topic}.",
      "'{quote}' - This is the last thing {character} expected to hear from {other_character}.",
      "A conversation between {character1} and {character2} where neither can {restriction}.",
      "'{character1}' and '{character2}' meet for the first time in {location} after {event}."
    ],
    'setting-prompt': [
      "A {location} where {unusual_rule} and people must {adaptation}.",
      "Describe {location} during {time} when {event} is happening.",
      "A hidden {location} that can only be found by {method} and contains {secret}.",
      "The last remaining {location} in a world where {disaster} has changed everything."
    ]
  };

  const generatePrompt = () => {
    setIsGenerating(true);
    setGeneratedPrompt('');

    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const templates = promptTemplates[selectedType] || promptTemplates['story-starter'];
      const template = templates[Math.floor(Math.random() * templates.length)];
      
      // Enhanced prompt generation with contextual elements
      let prompt = generateContextualPrompt(template);
      
      // Add genre-specific elements
      if (selectedGenre !== 'any') {
        prompt = addGenreElements(prompt, selectedGenre);
      }
      
      // Add tone modifications
      if (selectedTone !== 'any') {
        prompt = addToneElements(prompt, selectedTone);
      }
      
      // Add constraints if enabled
      if (includeConstraints) {
        prompt = addConstraints(prompt);
      }

      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      setPromptsGenerated(prev => prev + 1);
    }, 1500);
  };

  const generateContextualPrompt = (template) => {
    const elements = {
      character: ['young artist', 'retired detective', 'space engineer', 'librarian', 'chef', 'teacher', 'musician', 'scientist'],
      object: ['mysterious letter', 'glowing artifact', 'old photograph', 'encrypted device', 'ancient book', 'locked box'],
      location: ['abandoned library', 'hidden underground city', 'space station', 'remote village', 'old mansion', 'research facility'],
      concept: ['their past', 'reality', 'their family', 'the future', 'human nature', 'time itself'],
      profession: ['writer', 'doctor', 'pilot', 'teacher', 'artist', 'engineer', 'explorer'],
      ability: ['read minds', 'see the future', 'heal others', 'manipulate time', 'communicate with animals'],
      time_period: ['morning', 'night', 'full moon', 'storm', 'solstice', 'eclipse']
    };

    let result = template;
    Object.keys(elements).forEach(key => {
      const regex = new RegExp(`{${key}}`, 'g');
      const randomElement = elements[key][Math.floor(Math.random() * elements[key].length)];
      result = result.replace(regex, randomElement);
    });

    return result;
  };

  const addGenreElements = (prompt, genre) => {
    const genreElements = {
      fantasy: ['magical', 'enchanted', 'mystical', 'ancient'],
      'sci-fi': ['futuristic', 'technological', 'alien', 'advanced'],
      mystery: ['suspicious', 'hidden', 'cryptic', 'puzzling'],
      horror: ['terrifying', 'haunted', 'sinister', 'forbidden']
    };

    if (genreElements[genre]) {
      const element = genreElements[genre][Math.floor(Math.random() * genreElements[genre].length)];
      return prompt.replace(/\b(a|an|the)\s+(\w+)/i, `$1 ${element} $2`);
    }
    return prompt;
  };

  const addToneElements = (prompt, tone) => {
    const toneModifiers = {
      dark: ' The atmosphere is heavy with foreboding.',
      light: ' There&apos;s an air of hope and possibility.',
      mysterious: ' Nothing is quite what it seems.',
      humorous: ' The situation is more absurd than anyone realizes.'
    };

    return prompt + (toneModifiers[tone] || '');
  };

  const addConstraints = (prompt) => {
    const constraints = [
      'Write this scene using only dialogue.',
      'The story must take place in a single location.',
      'Include exactly three characters.',
      'The entire story happens in under an hour.',
      'Use a non-linear timeline.',
      'Write from the perspective of an unreliable narrator.'
    ];

    const constraint = constraints[Math.floor(Math.random() * constraints.length)];
    return prompt + '\n\nConstraint: ' + constraint;
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const savePrompt = () => {
    const newPrompt = {
      id: Date.now(),
      text: generatedPrompt,
      genre: selectedGenre,
      type: selectedType,
      timestamp: new Date().toLocaleString()
    };
    setFavoritePrompts(prev => [...prev, newPrompt]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'var(--font-inter)'
    }}>
      {/* Hero Section with Integrated Generator */}
      <section style={{
        padding: isMobile ? '6rem 1.5rem 3rem' : '9rem 2rem 6rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Left Column - Hero Content */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              borderRadius: '20px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              marginBottom: '2rem',
              fontSize: '0.875rem',
              color: '#8b5cf6'
            }}>
              <Lightbulb size={16} />
              Creative Writing Inspiration
            </div>

            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-literata)'
            }}>
              Writing Prompt
              <br />
              <span style={{ color: '#8b5cf6' }}>Generator</span>
            </h1>
            
            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.25rem',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              Break through writer&apos;s block with AI-powered prompts tailored to your genre, 
              style, and creative goals. Generate unlimited inspiration for your next story.
            </p>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {stats.map((stat, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(139, 92, 246, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(139, 92, 246, 0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    color: '#8b5cf6',
                    marginBottom: '0.25rem'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: '0.813rem',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Inspiration Showcase */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }} />
                Featured Prompt
              </div>
              
              <div style={{
                fontSize: '0.938rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '1rem'
              }}>
                &ldquo;{inspirationExamples[currentInspiration].prompt}&rdquo;
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.813rem',
                color: 'rgba(255, 255, 255, 0.5)'
              }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span>{inspirationExamples[currentInspiration].genre}</span>
                  <span>{inspirationExamples[currentInspiration].type}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Heart size={12} />
                  {inspirationExamples[currentInspiration].likes}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Prompt Generator */}
          <div style={{
            backgroundColor: '#16161f',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '2rem',
            position: 'sticky',
            top: '100px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(139, 92, 246, 0.2)'
              }}>
                <Sparkles size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  marginBottom: '0.25rem'
                }}>
                  Prompt Generator
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  Customize your creative inspiration
                </p>
              </div>
            </div>

            {/* Genre Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.75rem',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                Genre
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem'
              }}>
                {genres.slice(0, 9).map(genre => (
                  <button
                    key={genre.id}
                    onClick={() => setSelectedGenre(genre.id)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      backgroundColor: selectedGenre === genre.id ? 'rgba(139, 92, 246, 0.2)' : '#0a0a0f',
                      border: `1px solid ${selectedGenre === genre.id ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '6px',
                      color: selectedGenre === genre.id ? '#8b5cf6' : 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center'
                    }}
                  >
                    <div>{genre.emoji}</div>
                    <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>
                      {genre.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Type & Settings */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              {/* Prompt Type */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#0a0a0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '0.813rem',
                    cursor: 'pointer'
                  }}
                >
                  {promptTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Length */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Length
                </label>
                <select
                  value={selectedLength}
                  onChange={(e) => setSelectedLength(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#0a0a0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '0.813rem',
                    cursor: 'pointer'
                  }}
                >
                  {lengths.map(length => (
                    <option key={length.id} value={length.id}>
                      {length.name} ({length.words})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <div style={{ marginBottom: '1.5rem' }}>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  padding: '0.5rem 0'
                }}
              >
                <Settings size={14} />
                Advanced Options
                <ChevronDown size={14} style={{
                  transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }} />
              </button>

              {showAdvanced && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#0a0a0f',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  {/* Tone & Difficulty */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.813rem',
                        marginBottom: '0.5rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        Tone
                      </label>
                      <select
                        value={selectedTone}
                        onChange={(e) => setSelectedTone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          backgroundColor: '#16161f',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          color: '#ffffff',
                          fontSize: '0.75rem'
                        }}
                      >
                        {tones.map(tone => (
                          <option key={tone.id} value={tone.id}>
                            {tone.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.813rem',
                        marginBottom: '0.5rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        Difficulty
                      </label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          backgroundColor: '#16161f',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          color: '#ffffff',
                          fontSize: '0.75rem'
                        }}
                      >
                        {difficulties.map(diff => (
                          <option key={diff.id} value={diff.id}>
                            {diff.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Options */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.813rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={includeConstraints}
                        onChange={(e) => setIncludeConstraints(e.target.checked)}
                        style={{ accentColor: '#8b5cf6' }}
                      />
                      Include writing constraints
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.813rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={includeCharacters}
                        onChange={(e) => setIncludeCharacters(e.target.checked)}
                        style={{ accentColor: '#8b5cf6' }}
                      />
                      Include character details
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePrompt}
              disabled={isGenerating}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: isGenerating ? 'rgba(139, 92, 246, 0.5)' : '#8b5cf6',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                transition: 'all 0.2s'
              }}
            >
              {isGenerating ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: '#ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Writing Prompt
                </>
              )}
            </button>

            {/* Quick Actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              fontSize: '0.813rem',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <button
                onClick={generatePrompt}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Shuffle size={12} />
                Random
              </button>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Lightbulb size={12} />
                {promptsGenerated} generated
              </div>
            </div>
          </div>
        </div>

        {/* Generated Prompt Display */}
        {(generatedPrompt || isGenerating) && (
          <div style={{
            marginTop: '3rem',
            backgroundColor: '#16161f',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Lightbulb size={20} style={{ color: '#8b5cf6' }} />
                Your Writing Prompt
              </h3>
              
              {generatedPrompt && !isGenerating && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={copyPrompt}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: copiedPrompt ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {copiedPrompt ? <Check size={14} /> : <Copy size={14} />}
                    {copiedPrompt ? 'Copied!' : 'Copy'}
                  </button>
                  
                  <button
                    onClick={savePrompt}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Heart size={14} />
                    Save
                  </button>

                  <Link
                    href={`/app?prompt=${encodeURIComponent(generatedPrompt)}&source=prompt-generator`}
                    style={{
                      padding: '0.5rem 1.5rem',
                      backgroundColor: '#8b5cf6',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none'
                    }}
                  >
                    <PenTool size={14} />
                    Write with Esy
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
            
            <div style={{
              padding: '2rem',
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.9)',
              minHeight: isGenerating ? '200px' : 'auto'
            }}>
              {generatedPrompt || (isGenerating && 'Crafting your perfect writing prompt...')}
              {isGenerating && (
                <span style={{
                  opacity: 0.7,
                  animation: 'pulse 1.5s infinite'
                }}>|</span>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        backgroundColor: '#16161f',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 300,
              marginBottom: '1rem'
            }}>
              Why Choose Our Prompt Generator?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Advanced AI technology that understands story structure and creative writing principles.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                icon: Brain,
                title: 'AI-Powered Creativity',
                description: 'Our AI understands narrative structure, character development, and genre conventions to create meaningful prompts.',
                highlight: 'Smart'
              },
              {
                icon: Target,
                title: 'Highly Customizable',
                description: 'Fine-tune every aspect from genre and tone to complexity and constraints for personalized inspiration.',
                highlight: 'Flexible'
              },
              {
                icon: Zap,
                title: 'Instant Inspiration',
                description: 'Generate unlimited unique prompts instantly. No more staring at blank pages waiting for ideas.',
                highlight: 'Fast'
              },
              {
                icon: BookOpen,
                title: 'Genre Expertise',
                description: 'Specialized knowledge across 12+ genres with authentic tropes and conventions for each.',
                highlight: 'Expert'
              },
              {
                icon: Settings,
                title: 'Advanced Controls',
                description: 'Professional-grade options including writing constraints, difficulty levels, and narrative techniques.',
                highlight: 'Pro'
              },
              {
                icon: PenTool,
                title: 'Seamless Integration',
                description: 'Start writing immediately with your generated prompts in our full-featured AI writing assistant.',
                highlight: 'Connected'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  backgroundColor: '#0a0a0f',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  color: '#8b5cf6',
                  fontWeight: 500
                }}>
                  {feature.highlight}
                </div>

                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 1.5rem',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <feature.icon size={28} style={{ color: '#8b5cf6' }} />
                </div>
                
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{
                  fontSize: '0.938rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.6
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 300,
            marginBottom: '1rem'
          }}>
            Ready to Write Your Story?
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem'
          }}>
            Take your writing to the next level with Esy&apos;s comprehensive AI writing platform.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/ai-essay-writer/"
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#8b5cf6',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              Try Esy AI Free
              <ArrowRight size={18} />
            </Link>
            
            <Link
              href="/ai-essay-writer"
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              Try Essay Writer
            </Link>
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default WritingPromptGenerator; 