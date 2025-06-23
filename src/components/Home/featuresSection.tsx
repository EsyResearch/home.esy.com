import { useEffect } from "react";
import FeatureCard from "@/components/Home/featureCard";

export default function FeaturesSection() {
    const features = [
      {
        icon: '🤖',
        title: 'AI Writing Assistant',
        description: 'Get intelligent suggestions, improve clarity, and maintain academic tone with our context-aware AI that understands scholarly writing.'
      },
      {
        icon: '🔍',
        title: 'Smart Research Discovery',
        description: 'Find relevant papers instantly, analyze connections between ideas, and never miss important research in your field.'
      },
      {
        icon: '📚',
        title: 'Citation Management',
        description: 'Automatically format citations in any style, manage your bibliography, and ensure every source is properly credited.'
      },
      {
        icon: '✨',
        title: 'Style Enhancement',
        description: 'Elevate your writing with sophisticated vocabulary, improved sentence structure, and field-specific terminology.'
      },
      {
        icon: '📊',
        title: 'Analytics & Insights',
        description: 'Track your writing progress, identify patterns in your work, and get personalized recommendations for improvement.'
      },
      {
        icon: '🔒',
        title: 'Privacy First',
        description: 'Your research is yours alone. Enterprise-grade security ensures your work remains confidential and protected.'
      }
    ];
  
    useEffect(() => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
  
      setTimeout(() => {
        document.querySelectorAll('.feature-card').forEach(el => {
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.transform = 'translateY(20px)';
          (el as HTMLElement).style.transition = 'all 0.6s ease-out';
          observer.observe(el);
        });
      }, 100);
  
      return () => observer.disconnect();
    }, []);
  
    return (
      <section className="features">
        <div className="features-container">
          <div className="features-header">
            <span className="features-badge">FEATURES</span>
            <h2 className="features-title">Everything You Need to Excel</h2>
            <p className="features-subtitle">
              Powerful AI tools designed specifically for academic writing and research
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    );
  };