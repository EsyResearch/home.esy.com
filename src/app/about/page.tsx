"use client";

import React from 'react';

const AboutPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#121215',
      color: 'white',
      fontFamily: 'var(--font-inter)',
      padding: '8rem 2rem 4rem'
    }}>
      <article style={{
        maxWidth: '680px',
        margin: '0 auto'
      }}>
        {/* Simple Header */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 400,
          marginBottom: '3rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.3
        }}>
          About Esy
        </h1>

        {/* What it is */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '1.5rem'
          }}>
            Esy is an AI writing assistant designed for students and researchers. 
            It helps you write essays, research papers, and academic content.
          </p>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '1.5rem'
          }}>
            The tool provides writing prompts, templates, and AI-generated suggestions 
            to help you develop your ideas and improve your writing.
          </p>
        </section>

        {/* What it does */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em'
          }}>
            What you can do
          </h2>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              'Generate essay outlines and drafts',
              'Get writing prompts for different topics',
              'Access templates for academic papers',
              'Improve your writing with AI suggestions',
              'Work with content for different academic levels'
            ].map((item, index) => (
              <li key={index} style={{
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '0.75rem',
                paddingLeft: '1.5rem',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: 'rgba(255, 255, 255, 0.4)'
                }}>
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Who it's for */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em'
          }}>
            Who uses Esy
          </h2>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            Students working on school papers, college essays, and research projects. 
            Researchers looking for writing assistance and content organization.
          </p>
        </section>

        {/* Contact */}
        <section style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            Questions? Email us at{' '}
            <a 
              href="mailto:hello@esy.com" 
              style={{
                color: '#3B82F6',
                textDecoration: 'none'
              }}
            >
              hello@esy.com
            </a>
          </p>
        </section>
      </article>
    </div>
  );
};

export default AboutPage;
