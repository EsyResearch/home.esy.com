import { useEffect, useState } from "react";
import HeroVisual from "@/components/Home/heroVisual";

export default function HeroSection () {
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const fullText = "Transform your academic writing with AI";
    
    useEffect(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.substring(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 50);
  
      return () => clearInterval(typeInterval);
    }, []);
  
    return (
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            {/* <div className="hero-badge">
              <div className="hero-badge-dot"></div>
              <span>AI-Powered Academic Excellence</span>
            </div> */}
            
            <h1 className="hero-title">
              {typedText}
              {isTyping && <span className="mockup-cursor"></span>}
            </h1>
            
            <p className="hero-subtitle">
              Join thousands of researchers and students using Esy to write better papers, 
              discover insights faster, and achieve academic excellence.
            </p>
            
            <div className="hero-cta-group">
              <a href="https://app.esy.com" className="hero-cta-primary">
                Start Writing Free
              </a>
              <button className="hero-cta-secondary">
                Watch Demo
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">2.5M+</div>
                <div className="hero-stat-label">Papers Written</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">150K+</div>
                <div className="hero-stat-label">Active Researchers</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">98%</div>
                <div className="hero-stat-label">Grade Improvement</div>
              </div>
            </div>
          </div>
          
          <HeroVisual />
        </div>
      </section>
    );
  };