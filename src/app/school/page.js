"use client"

import { useState, useEffect, useRef } from 'react';
import HeroSection from '@/components/School/heroSection';
import LearningPathsSection from '@/components/School/learningPathsSection';
import FeaturedArticlesSection from '@/components/School/featuredArticlesSection';
import InteractiveLearningSection from '@/components/School/interactiveLearningSection';
import StatsSection from '@/components/School/statsSection';
import NewsletterSection from '@/components/School/newsletterSection';

export default function EsySchoolHub() {
    const [scrolled, setScrolled] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All Topics');
    const emailInputRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const nav = document.getElementById('nav');
            if (window.scrollY > 100) {
              nav.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
              nav.style.background = 'rgba(10, 10, 15, 0.85)';
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          // Smooth scroll for navigation
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            });
          });
      
          // Search functionality
          const searchInput = document.querySelector('.search-input');
          if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
              if (e.key === 'Enter') {
                console.log('Searching for:', this.value);
              }
            });
          }
      
          // Newsletter form
          const newsletterForm = document.querySelector('.newsletter-form');
          if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
              e.preventDefault();
              const email = this.querySelector('.newsletter-input').value;
              console.log('Newsletter signup:', email);
            });
          }
      
          // Intersection Observer for animations
          const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
          };
      
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
              }
            });
          }, observerOptions);
      
          // Observe all cards after they're rendered
          setTimeout(() => {
            document.querySelectorAll('.path-card, .article-card, .interactive-card').forEach(el => {
              el.style.opacity = '0';
              el.style.transform = 'translateY(20px)';
              el.style.transition = 'all 0.6s ease-out';
              observer.observe(el);
            });
          }, 100);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
          };
        }, []);
      
        const handleFilterClick = (filter) => {
          setActiveFilter(filter);
        };
      
        const handleNewsletterSubmit = (e) => {
          e.preventDefault();
          const email = emailInputRef.current.value;
          console.log('Newsletter signup:', email);
        };
      
        return (
          <div>
            <HeroSection activeFilter={activeFilter} handleFilterClick={handleFilterClick} />
            <LearningPathsSection />
            <FeaturedArticlesSection />
            <InteractiveLearningSection />
            {/* <StatsSection /> */}
            <NewsletterSection emailInputRef={emailInputRef} handleNewsletterSubmit={handleNewsletterSubmit} />
          </div>
        );
}