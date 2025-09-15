"use client";

import React from 'react';

interface Course {
  title: string;
  duration: string;
  level: string;
  students: string;
}

interface StructuredLearningPathsProps {
  courses: Course[];
}

const StructuredLearningPaths: React.FC<StructuredLearningPathsProps> = ({ courses }) => {
  const styles = {
    coursesSection: {
      padding: '5rem 3rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    sectionHeader: {
      marginBottom: '3rem'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '200',
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-literata)'
    },
    sectionSubtitle: {
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.6)',
      maxWidth: '600px',
      lineHeight: '1.7'
    },
    coursesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.5rem'
    },
    courseCard: {
      backgroundColor: 'rgba(139, 92, 246, 0.03)',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      borderRadius: '12px',
      padding: '2rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    courseHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    courseTitle: {
      fontSize: '1.25rem',
      fontWeight: '400',
      letterSpacing: '-0.01em',
      flex: 1
    },
    courseDuration: {
      fontSize: '0.875rem',
      color: '#8b5cf6',
      fontWeight: '500'
    },
    courseDescription: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.9375rem',
      lineHeight: '1.6',
      marginBottom: '1.5rem'
    },
    courseMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.4)'
    }
  };

  return (
    <section id="courses" style={styles.coursesSection}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Structured Learning Paths</h2>
        <p style={styles.sectionSubtitle}>
          Deep-dive courses for those ready to master AI-powered academic writing
        </p>
      </div>

      <div style={styles.coursesGrid}>
        {courses.map((course, index) => (
          <div
            key={index}
            style={styles.courseCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.1)';
            }}
          >
            <div style={styles.courseHeader}>
              <h3 style={styles.courseTitle}>{course.title}</h3>
              <span style={styles.courseDuration}>{course.duration}</span>
            </div>
            <p style={styles.courseDescription}>
              Comprehensive curriculum covering all aspects of {course.title.toLowerCase()}, 
              with practical exercises and expert feedback.
            </p>
            <div style={styles.courseMeta}>
              <span>{course.level}</span>
              <span>{course.students}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StructuredLearningPaths;



