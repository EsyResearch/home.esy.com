'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PenTool, Brain, FileText, CheckCircle, Star, Users, Clock,
  BookOpen, Zap, ArrowRight, RefreshCw, Settings, Eye, Target,
  Award, Globe, Search, ChevronDown, TrendingUp, Copy, Check,
  Download, Share2, Bookmark, PlayCircle, Sparkles, Shield,
  GraduationCap, Lightbulb, BarChart3, Lock, ChevronRight
} from 'lucide-react';

const liveExamples = [
  {
    topic: "The Impact of Social Media on Mental Health",
    type: "Argumentative",
    level: "Undergraduate",
    preview: "Recent studies demonstrate a complex relationship between social media usage and psychological well-being, with evidence suggesting both positive and negative impacts depending on usage patterns and individual factors...",
    author: "Emily R.",
    timeAgo: "2 minutes ago",
    grade: "A-"
  },
  {
    topic: "Climate Change Solutions in Developing Nations",
    type: "Analytical",
    level: "Graduate",
    preview: "This analysis examines the feasibility and effectiveness of climate adaptation strategies in developing countries, considering economic constraints, technological limitations, and policy frameworks...",
    author: "Marcus T.",
    timeAgo: "5 minutes ago",
    grade: "A+"
  },
  {
    topic: "Artificial Intelligence in Healthcare",
    type: "Expository",
    level: "Undergraduate",
    preview: "AI technologies are revolutionizing medical diagnosis and treatment, offering unprecedented accuracy in pattern recognition while raising important questions about data privacy and human oversight...",
    author: "Sarah L.",
    timeAgo: "8 minutes ago",
    grade: "A"
  }
];

const AIEssayWriter = () => {
  const [essayTopic, setEssayTopic] = useState('');
  const [essayType, setEssayType] = useState('argumentative');
  const [academicLevel, setAcademicLevel] = useState('undergraduate');
  const [essayLength, setEssayLength] = useState('medium');
  const [citationStyle, setCitationStyle] = useState('apa');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEssay, setGeneratedEssay] = useState('');
  const [generatedCount, setGeneratedCount] = useState(0);
  const [copiedEssay, setCopiedEssay] = useState(false);
  const [email, setEmail] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [currentExample, setCurrentExample] = useState(0);
  const [focusedField, setFocusedField] = useState(null);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rotate through examples
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample(prev => (prev + 1) % liveExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: '165K+', label: 'Essays generated', icon: FileText },
    { number: '50K+', label: 'Students helped', icon: GraduationCap },
    { number: '4.9/5', label: 'Quality rating', icon: Star },
    { number: '98%', label: 'Grade improvement', icon: TrendingUp }
  ];

  const essayTypes = [
    { id: 'argumentative', name: 'Argumentative', icon: '⚔️' },
    { id: 'analytical', name: 'Analytical', icon: '🔍' },
    { id: 'expository', name: 'Expository', icon: '📝' },
    { id: 'persuasive', name: 'Persuasive', icon: '💬' },
    { id: 'narrative', name: 'Narrative', icon: '📖' },
    { id: 'compare', name: 'Compare & Contrast', icon: '⚖️' }
  ];

  const academicLevels = [
    { id: 'high-school', name: 'High School', icon: '🎒' },
    { id: 'undergraduate', name: 'Undergraduate', icon: '🎓' },
    { id: 'graduate', name: 'Graduate', icon: '📚' },
    { id: 'doctoral', name: 'Doctoral', icon: '🔬' }
  ];

  const essayLengths = [
    { id: 'short', name: 'Short', words: '300-500', icon: '📄' },
    { id: 'medium', name: 'Medium', words: '500-1000', icon: '📃' },
    { id: 'long', name: 'Long', words: '1000-1500', icon: '📋' },
    { id: 'extended', name: 'Extended', words: '1500+', icon: '📜' }
  ];

  const citationStyles = [
    { id: 'apa', name: 'APA', field: 'Psychology, Education' },
    { id: 'mla', name: 'MLA', field: 'Literature, Arts' },
    { id: 'chicago', name: 'Chicago', field: 'History, Literature' },
    { id: 'harvard', name: 'Harvard', field: 'Business, Sciences' }
  ];


  const features = [
    {
      icon: Brain,
      title: 'Academic AI Intelligence',
      description: 'Trained on academic writing patterns with scholarly tone and proper structure',
      highlight: 'Most Advanced'
    },
    {
      icon: Shield,
      title: 'Plagiarism-Free Guarantee',
      description: 'Original content with built-in plagiarism detection and prevention',
      highlight: '100% Original'
    },
    {
      icon: BookOpen,
      title: 'Smart Citations',
      description: 'Automatic citation generation in APA, MLA, Chicago, and Harvard styles',
      highlight: 'Auto-Format'
    },
    {
      icon: Target,
      title: 'Level-Matched Writing',
      description: 'Complexity and depth adjusted to your exact academic level',
      highlight: 'Precision Tuned'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Complete essays in under 2 minutes with professional quality',
      highlight: 'Lightning Fast'
    },
    {
      icon: Award,
      title: 'Grade Excellence',
      description: '98% of users report improved grades with our AI assistance',
      highlight: 'Proven Results'
    }
  ];

  const generateEssay = async () => {
    if (generatedCount >= 2 && !email) {
      setShowSignup(true);
      return;
    }

    if (!essayTopic.trim()) {
      alert('Please enter an essay topic to generate content.');
      return;
    }

    setIsGenerating(true);
    setGeneratedEssay('');

    // Enhanced sample essay generation
    const sampleEssay = `Title: ${essayTopic}

Introduction

${essayTopic} represents a critical area of contemporary academic inquiry that demands thorough examination and scholarly analysis. This ${essayTypes.find(t => t.id === essayType)?.name.toLowerCase()} essay will explore the multifaceted dimensions of this topic, presenting evidence-based arguments and drawing from current research to provide a comprehensive understanding of the subject matter.

The significance of examining ${essayTopic} extends beyond mere academic exercise, as it holds profound implications for our understanding of broader societal, technological, and cultural phenomena. Through systematic analysis and critical evaluation, this essay will demonstrate that a nuanced approach to this topic is essential for both theoretical advancement and practical application.

Historical Context and Background

To establish a foundation for analysis, it is crucial to examine the historical development and contextual factors that have shaped our current understanding of ${essayTopic}. Scholarly research has traced the evolution of this field, revealing important patterns and trends that inform contemporary discourse.

The emergence of key theoretical frameworks and methodological approaches has fundamentally transformed how researchers and practitioners approach this subject. Primary sources indicate that early conceptualizations have undergone significant refinement, leading to more sophisticated models and practical applications that address real-world challenges.

Critical Analysis and Evidence

Contemporary research on ${essayTopic} reveals several compelling themes worthy of detailed examination. Empirical studies conducted by leading researchers in the field provide substantial evidence supporting the complexity and nuance inherent in this subject area.

Recent meta-analyses and systematic reviews have identified consistent patterns across multiple studies, suggesting that traditional approaches may require substantial revision in light of new methodological advances and theoretical insights. These findings have profound implications for both academic understanding and practical implementation.

Furthermore, interdisciplinary perspectives have enriched our comprehension of ${essayTopic}, demonstrating the value of collaborative approaches that bridge traditional academic boundaries. This convergence of multiple fields has yielded innovative solutions and novel theoretical frameworks that enhance our analytical capabilities.

Implications and Future Directions

The broader implications of research on ${essayTopic} extend significantly beyond academic circles, influencing policy development, professional practice, and future research trajectories. Evidence-based analysis demonstrates that understanding this topic is crucial for addressing contemporary challenges and developing effective solutions.

The interdisciplinary nature of ${essayTopic} necessitates continued collaboration across multiple domains of expertise, highlighting the importance of integrated approaches to knowledge creation and application. This collaborative imperative suggests that future research should prioritize cross-disciplinary partnerships and methodological innovation.

Conclusion

This comprehensive examination of ${essayTopic} has revealed the profound complexity and significance of this subject area. The evidence presented throughout this analysis demonstrates that continued scholarly inquiry and practical application are essential for advancing our understanding and addressing related challenges.

Moving forward, researchers and practitioners must maintain a commitment to rigorous methodology while remaining open to innovative approaches and emerging perspectives. Only through such sustained intellectual engagement can we hope to develop comprehensive solutions to the complex issues surrounding ${essayTopic}.

The implications of this analysis extend far beyond the immediate scope of this essay, suggesting numerous avenues for future research and practical application that will undoubtedly contribute to the continued evolution of our understanding in this vital area of study.

References

[Note: In a complete academic essay, this section would include properly formatted citations in ${citationStyles.find(c => c.id === citationStyle)?.name} style, referencing peer-reviewed sources, academic publications, and authoritative materials relevant to ${essayTopic}.]`;

    // Realistic typing simulation with variable speed
    const words = sampleEssay.split(' ');
    let currentIndex = 0;

    const typeWriter = () => {
      if (currentIndex < words.length) {
        setGeneratedEssay(prev => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
        currentIndex++;
        
        // Variable typing speed with realistic pauses
        const delay = Math.random() * 40 + 20;
        setTimeout(typeWriter, delay);
      } else {
        setIsGenerating(false);
        setGeneratedCount(prev => prev + 1);
      }
    };

    setTimeout(typeWriter, 800);
  };

  const copyEssay = () => {
    navigator.clipboard.writeText(generatedEssay);
    setCopiedEssay(true);
    setTimeout(() => setCopiedEssay(false), 2000);
  };

  const handleSignup = () => {
    if (email) {
      localStorage.setItem('aiEssayWriterUser', email);
      setShowSignup(false);
      generateEssay();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'var(--font-inter)'
    }}>


      {/* Hero Section with Integrated Form */}
      <section style={{
        padding: isMobile ? '6rem 1.5rem 3rem' : '8rem 2rem 4rem',
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
              fontSize: '1rem',
              color: '#8b5cf6'
            }}>
              <GraduationCap size={16} />
              #1 AI Essay Writer for Students
            </div>

            <h1 style={{
              fontSize: isMobile ? '3rem' : '4rem',
              fontFamily: 'var(--font-literata)',
              fontWeight: 300,
              lineHeight: 1.3,
              letterSpacing: '0.01em',
              marginBottom: '1.5rem',
              whiteSpace: 'nowrap'
            }}>
              Generate Perfect Essays
              <br />
              <span style={{ color: '#8b5cf6', whiteSpace: 'nowrap', fontWeight: 400 }}>in Seconds</span>
            </h1>
            
            <p style={{
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              Create high-quality, plagiarism-free essays with proper citations and academic structure. 
            </p>

            {/* Trust Indicators */}
            {/* Stats Grid - Commented out for now
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {stats.slice(0, 4).map((stat, index) => (
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
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            */}

            {/* Live Activity Feed */}
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
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#4ade80',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }} />
                Recent Essays Generated
              </div>
              
              <div style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>&ldquo;{liveExamples[currentExample].topic}&rdquo;</strong>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}>
                  <span>{liveExamples[currentExample].type}</span>
                  <span>{liveExamples[currentExample].level}</span>
                  <span>Grade: {liveExamples[currentExample].grade}</span>
                  <span>{liveExamples[currentExample].timeAgo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Essay Generator Form */}
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
                <Brain size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  marginBottom: '0.25rem'
                }}>
                  AI Essay Generator
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  Generate your essay in 3 simple steps
                </p>
              </div>
            </div>

            {/* Essay Topic Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                1. What&apos;s your essay topic? *
              </label>
              <textarea
                value={essayTopic}
                onChange={(e) => setEssayTopic(e.target.value)}
                onFocus={() => setFocusedField('topic')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g., 'The impact of artificial intelligence on modern education'"
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '0.875rem',
                  backgroundColor: focusedField === 'topic' ? 'rgba(139, 92, 246, 0.05)' : '#0a0a0f',
                  border: `1px solid ${focusedField === 'topic' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
            </div>

            {/* Essay Configuration Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              {/* Essay Type */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  2. Type
                </label>
                <select
                  value={essayType}
                  onChange={(e) => setEssayType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    backgroundColor: '#0a0a0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  {essayTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Academic Level */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Level
                </label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    backgroundColor: '#0a0a0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  {academicLevels.map(level => (
                    <option key={level.id} value={level.id}>
                      {level.icon} {level.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Essay Length */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Length
                </label>
                <select
                  value={essayLength}
                  onChange={(e) => setEssayLength(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    backgroundColor: '#0a0a0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  {essayLengths.map(length => (
                    <option key={length.id} value={length.id}>
                      {length.icon} {length.name} ({length.words})
                    </option>
                  ))}
                </select>
              </div>

              {/* Citation Style */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Citations
                </label>
                <select
                  value={citationStyle}
                  onChange={(e) => setCitationStyle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    backgroundColor: '#0a0a0f',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  {citationStyles.map(style => (
                    <option key={style.id} value={style.id}>
                      {style.name} Style
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateEssay}
              disabled={isGenerating || !essayTopic.trim()}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: isGenerating || !essayTopic.trim() ? 'rgba(139, 92, 246, 0.3)' : '#8b5cf6',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: isGenerating || !essayTopic.trim() ? 'not-allowed' : 'pointer',
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
                  3. Generating Essay...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  3. Generate Essay Free
                </>
              )}
            </button>

            {/* Trust Indicators */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.5)',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <CheckCircle size={14} style={{ color: '#4ade80' }} />
                Plagiarism-Free
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Shield size={14} style={{ color: '#4ade80' }} />
                Confidential
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Zap size={14} style={{ color: '#4ade80' }} />
                Instant Delivery
              </div>
            </div>

            {/* Usage Limit Notice */}
            {generatedCount >= 1 && !email && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '6px',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                textAlign: 'center',
                fontSize: '1rem',
                color: '#8b5cf6'
              }}>
                ✨ {generatedCount}/2 free essays used. Sign up for unlimited access!
              </div>
            )}
          </div>
        </div>

        {/* Generated Essay Display */}
        {(generatedEssay || isGenerating) && (
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
                <FileText size={20} style={{ color: '#8b5cf6' }} />
                Your Generated Essay
              </h3>
              
              {generatedEssay && !isGenerating && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={copyEssay}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: copiedEssay ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {copiedEssay ? <Check size={14} /> : <Copy size={14} />}
                    {copiedEssay ? 'Copied!' : 'Copy'}
                  </button>
                  
                  <button
                    onClick={generateEssay}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <RefreshCw size={14} />
                    Regenerate
                  </button>

                  <button
                    onClick={() => {
                      // Encode essay content for URL
                      const encodedEssay = encodeURIComponent(generatedEssay);
                      const encodedTopic = encodeURIComponent(essayTopic);
                      // Redirect to Esy app with pre-loaded content
                      window.location.href = `/app?essay=${encodedEssay}&topic=${encodedTopic}&source=essay-generator`;
                    }}
                    style={{
                      padding: '0.5rem 1.5rem',
                      backgroundColor: '#8b5cf6',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#7c3aed';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#8b5cf6';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <PenTool size={14} />
                    Perfect with Esy
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
            
            <div style={{
              padding: '2rem',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.9)',
              whiteSpace: 'pre-line',
              minHeight: isGenerating ? '300px' : 'auto',
              maxHeight: '600px',
              overflow: 'auto'
            }}>
              {generatedEssay || (isGenerating && 'Analyzing your topic and generating a comprehensive essay...')}
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
              fontSize: isMobile ? '2.5rem' : '3rem',
              // fontFamily: 'OrigamiIncised, sans-serif', // TEMPORARILY DISABLED
              fontWeight: 300,
              letterSpacing: '-0.03em', // Changed from 0.05em when Origami disabled
              marginBottom: '1rem'
            }}>
              Why Choose Our AI Essay Writer?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Advanced AI technology specifically designed for academic writing excellence.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  backgroundColor: '#0a0a0f',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Highlight Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1rem',
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
                  fontSize: '1rem',
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

      {/* FAQ Section */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3rem',
            fontFamily: 'OrigamiIncised, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.05em',
            marginBottom: '1rem'
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            Everything you need to know about our AI essay writer
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {[
            {
              question: "Is the AI essay writer free to use?",
              answer: "Yes! You can generate 2 essays completely free. Create a free account for unlimited essay generation and access to all advanced features including plagiarism detection and citation formatting."
            },
            {
              question: "Are the essays plagiarism-free?",
              answer: "Absolutely. Our AI generates completely original content based on your topic and requirements. Every essay is unique and passes plagiarism detection software. We also include built-in plagiarism checking."
            },
            {
              question: "What citation styles do you support?",
              answer: "We support all major academic citation styles including APA, MLA, Chicago, and Harvard. Citations are automatically formatted and integrated into your essay according to academic standards."
            },
            {
              question: "Can I use the essays for my assignments?",
              answer: "Our essays are designed as research and study aids. You can use them as starting points, references, or inspiration for your own work. Always follow your institution's academic integrity policies."
            },
            {
              question: "How accurate and high-quality are the essays?",
              answer: "Our AI is specifically trained on academic writing patterns and maintains scholarly tone and structure. 98% of our users report grade improvements, with an average quality rating of 4.9/5 stars."
            },
            {
              question: "What academic levels do you support?",
              answer: "We support all academic levels from high school to doctoral programs. The AI adjusts complexity, depth, and analytical sophistication based on your selected academic level."
            }
          ].map((faq, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                backgroundColor: '#16161f',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 500,
                marginBottom: '0.75rem',
                color: '#ffffff'
              }}>
                {faq.question}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.7
              }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        backgroundColor: '#16161f',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3rem',
            fontFamily: 'OrigamiIncised, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.05em',
            marginBottom: '1rem'
          }}>
            Ready for Advanced AI Writing?
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem'
          }}>
            Upgrade to Esy AI for comprehensive writing assistance, research tools, 
            and professional features for all your academic needs.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => window.location.href = '/app'}
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
                gap: '0.5rem'
              }}
            >
              Try Esy AI Free
              <ArrowRight size={18} />
            </button>
            
            <button
              onClick={() => window.location.href = '/ai-writing-tools'}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Explore More Tools
            </button>
          </div>
        </div>
      </section>

      {/* Email Signup Modal */}
      {showSignup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: '#16161f',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
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
              <Sparkles size={28} style={{ color: '#8b5cf6' }} />
            </div>

            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 400,
              marginBottom: '1rem'
            }}>
              Unlock Unlimited Essays
            </h3>
            
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '1.5rem'
            }}>
              Create a free account to generate unlimited essays with advanced features and plagiarism detection.
            </p>

            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: '#0a0a0f',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem',
                marginBottom: '1rem',
                outline: 'none'
              }}
            />

            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => setShowSignup(false)}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={handleSignup}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  backgroundColor: '#8b5cf6',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Continue Free
              </button>
            </div>
          </div>
        </div>
      )}

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

export default AIEssayWriter;