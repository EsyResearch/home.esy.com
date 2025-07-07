'use client';
import React, { useState, useEffect } from 'react';
import { Brain, Code, FileText, Globe, Lightbulb } from 'lucide-react';
import GlossaryTermNavigation from '@/components/Glossary/GlossaryTermNavigation';
import GlossaryTermHeader from '@/components/Glossary/GlossaryTermHeader';
import GlossaryTermTabs from '@/components/Glossary/GlossaryTermTabs';
import GlossaryTermSidebar from '@/components/Glossary/GlossaryTermSidebar';
import { Theme, CategoryType, GlossaryTermDetail } from '@/types';

interface CategoryMeta {
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
}

interface CategoryMetaMap {
  [key: string]: CategoryMeta;
}

const GlossaryTermPage = ({ params }: { params: { id: string } }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTheme: Theme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.05)',
    accent: '#6366f1'
  };

  // Sample term data - in a real app, this would come from an API or database based on params.id
  const getTermData = (id: string): GlossaryTermDetail => {
    // This is sample data - in a real app, you'd fetch this based on the ID
    const sampleTerms: { [key: string]: GlossaryTermDetail } = {
      'thesis-statement': {
        id: 'thesis-statement',
        term: 'Thesis Statement',
        pronunciation: '/ˈθiːsɪs ˈsteɪtmənt/',
        category: 'structure',
        definition: 'A concise summary of the main point or claim of an essay, usually appearing in the introduction.',
        views: 2987,
        readTime: 2,
        popularity: 5,
        lastUpdated: '2025-01-15',
        extendedDefinition: `A thesis statement is the backbone of any academic essay, serving as a roadmap for both the writer and reader. It presents the central argument or claim that the entire essay will support and develop through evidence and analysis.

An effective thesis statement is specific, debatable, and focused. It should be narrow enough to be thoroughly covered in the essay's scope but significant enough to warrant discussion. The thesis typically appears at the end of the introduction paragraph and guides the development of all body paragraphs.

A strong thesis statement not only states what the writer believes but also indicates how they will prove their point, making it easier for readers to follow the essay's logical progression.`,
        personalNote: 'Think of your thesis statement as a promise to your reader about what you will prove in your essay. It should be clear, specific, and something you can actually support with evidence.',
        usage: `Key elements of a strong thesis statement:
• Makes a clear, specific claim
• Is debatable (not a fact or opinion)
• Provides a roadmap for the essay
• Appears in the introduction
• Is supported by evidence in body paragraphs
• Addresses the "so what?" question`,
        example: {
          code: `# Weak thesis
"Social media has effects on teenagers."

# Strong thesis
"Social media platforms harm teenagers' mental health by promoting unrealistic comparisons, disrupting sleep patterns, and reducing face-to-face social interactions, requiring immediate regulatory intervention to protect young users."`,
          output: 'The strong thesis is specific, debatable, and provides a clear roadmap for the essay\'s arguments.'
        },
        relatedTerms: [
          { id: 'topic-sentence', term: 'Topic Sentence' },
          { id: 'argumentative-essay', term: 'Argumentative Essay' },
          { id: 'introduction', term: 'Introduction' },
          { id: 'body-paragraph', term: 'Body Paragraph' }
        ],
        relatedPosts: [
          { 
            title: 'Crafting Strong Thesis Statements', 
            date: '2025-01-10',
            url: '/articles/crafting-thesis-statements'
          },
          { 
            title: 'Essay Structure and Organization', 
            date: '2025-01-05',
            url: '/articles/essay-structure'
          }
        ],
        etymology: 'From Greek "thesis" (a proposition) and "statement" (a declaration), referring to the central proposition that an essay seeks to prove or defend.',
        firstAdded: '2024-12-01',
        stats: {
          views: 2987,
          avgReadTime: '2.1 min',
          bookmarks: 156,
          shares: 67
        },
        updateHistory: [
          { date: '2025-01-15', change: 'Added examples of strong vs weak thesis statements' },
          { date: '2025-01-10', change: 'Updated guidelines for debatable claims' },
          { date: '2024-12-15', change: 'Expanded section on thesis placement' },
          { date: '2024-12-01', change: 'Initial entry created' }
        ]
      },
      // Add more sample terms as needed
      'argumentative-essay': {
        id: 'argumentative-essay',
        term: 'Argumentative Essay',
        pronunciation: '/ˌɑːrɡjəˈmentətɪv ˈeseɪ/',
        category: 'writing',
        definition: 'A type of essay that presents a clear position on a topic and supports it with evidence and reasoning.',
        views: 2432,
        readTime: 3,
        popularity: 5,
        lastUpdated: '2025-01-14',
        extendedDefinition: `An argumentative essay is a form of academic writing that requires students to investigate a topic, collect and evaluate evidence, and establish a position on the topic in a concise manner. Unlike other essay types, argumentative essays must present a clear stance and defend it with logical reasoning and credible evidence.

The structure typically includes an introduction with a strong thesis statement, body paragraphs that present evidence and address counterarguments, and a conclusion that reinforces the main argument. The key to a successful argumentative essay is presenting a balanced view while maintaining a clear position.

Argumentative essays are fundamental in academic writing because they develop critical thinking skills, teach students to analyze multiple perspectives, and prepare them for real-world debates and discussions.`,
        personalNote: 'Remember that arguing in an essay isn\'t about being combative - it\'s about presenting a well-reasoned case that acknowledges other viewpoints while defending your position.',
        usage: `Key components of an argumentative essay:
• Clear thesis statement with a debatable claim
• Evidence from credible sources
• Logical reasoning and analysis
• Acknowledgment of counterarguments
• Refutation of opposing views
• Strong conclusion that reinforces the argument`,
        example: {
          code: `# Topic: Should schools require uniforms?

# Thesis: "Schools should require uniforms because they reduce socioeconomic disparities, improve focus on academics, and create a sense of community among students."

# Body paragraph structure:
1. Present evidence (statistics, studies, expert opinions)
2. Analyze how evidence supports the thesis
3. Address potential counterarguments
4. Explain why your position is stronger`,
          output: 'A well-structured argumentative essay presents a clear position, supports it with evidence, and addresses opposing viewpoints fairly.'
        },
        relatedTerms: [
          { id: 'thesis-statement', term: 'Thesis Statement' },
          { id: 'counterargument', term: 'Counterargument' },
          { id: 'evidence', term: 'Evidence' },
          { id: 'analysis', term: 'Analysis' }
        ],
        relatedPosts: [
          { 
            title: 'Writing Effective Argumentative Essays', 
            date: '2025-01-12',
            url: '/articles/argumentative-essays'
          },
          { 
            title: 'Using Evidence in Academic Writing', 
            date: '2025-01-08',
            url: '/articles/using-evidence'
          }
        ],
        etymology: 'From Latin "argumentum" (evidence, proof) and "essay" from French "essai" (attempt, trial), describing a written attempt to prove a point through evidence and reasoning.',
        firstAdded: '2024-11-15',
        stats: {
          views: 2432,
          avgReadTime: '3.2 min',
          bookmarks: 189,
          shares: 54
        },
        updateHistory: [
          { date: '2025-01-14', change: 'Added section on counterargument strategies' },
          { date: '2025-01-01', change: 'Updated examples with current topics' },
          { date: '2024-12-20', change: 'Expanded evidence evaluation guidelines' },
          { date: '2024-11-15', change: 'Initial comprehensive entry' }
        ]
      }
    };

    return sampleTerms[id] || sampleTerms['thesis-statement']; // Default fallback
  };

  const term = getTermData(params.id);

  const categoryMeta: CategoryMetaMap = {
    writing: { name: 'Writing', icon: FileText, color: '#6366f1' },
    structure: { name: 'Structure', icon: Brain, color: '#f59e0b' },
    research: { name: 'Research', icon: Globe, color: '#ef4444' },
    citation: { name: 'Citation', icon: Lightbulb, color: '#10b981' },
    grammar: { name: 'Grammar', icon: Code, color: '#8b5cf6' }
  };

  const currentCategory = categoryMeta[term.category];

  const handleShare = async (platform: string) => {
    if (platform === 'link') {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Learning about ${term.term} - ${term.definition}`)}&url=${encodeURIComponent(window.location.href)}`);
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`);
    }
    setShowShareMenu(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <GlossaryTermNavigation
        scrolled={scrolled}
        termId={term.id}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        showShareMenu={showShareMenu}
        setShowShareMenu={setShowShareMenu}
        linkCopied={linkCopied}
        currentTheme={currentTheme}
        handleShare={handleShare}
      />

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '4rem' }}>
          {/* Left Column - Main Content */}
          <div>
            <GlossaryTermHeader
              term={term.term}
              pronunciation={term.pronunciation}
              category={term.category}
              definition={term.definition}
              categoryMeta={currentCategory}
              currentTheme={currentTheme}
            />

            <GlossaryTermTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              term={term}
              currentTheme={currentTheme}
            />
          </div>

          {/* Right Column - Sidebar */}
          <GlossaryTermSidebar
            term={term}
            currentTheme={currentTheme}
          />
        </div>
      </main>
    </div>
  );
};

export default GlossaryTermPage; 