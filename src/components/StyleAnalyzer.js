"use client";
import { useEffect, useRef } from 'react';

const StyleAnalyzer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const analyzeStyles = () => {
      const elements = containerRef.current.querySelectorAll('*');
      const styleReport = {};

      elements.forEach((element, index) => {
        const tagName = element.tagName.toLowerCase();
        const className = element.className;
        const computedStyle = window.getComputedStyle(element);
        
        // Only analyze markdown content elements
        if (tagName.match(/^(h[1-6]|p|ul|ol|li|blockquote|pre|code|div)$/)) {
          const key = `${tagName}${className ? '.' + className.split(' ')[0] : ''}`;
          
          styleReport[key] = {
            tagName,
            className,
            fontSize: computedStyle.fontSize,
            fontWeight: computedStyle.fontWeight,
            color: computedStyle.color,
            margin: computedStyle.margin,
            padding: computedStyle.padding,
            lineHeight: computedStyle.lineHeight,
            backgroundColor: computedStyle.backgroundColor,
            border: computedStyle.border,
            borderRadius: computedStyle.borderRadius,
            textAlign: computedStyle.textAlign,
          };
        }
      });

      console.log('=== STYLE ANALYSIS REPORT ===');
      console.log(styleReport);
      
      // Save to localStorage for easy access
      localStorage.setItem('styleAnalysis', JSON.stringify(styleReport, null, 2));
    };

    // Run analysis after a short delay to ensure content is rendered
    setTimeout(analyzeStyles, 1000);
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'none' }}>
      {/* This will be hidden but will contain the markdown content for analysis */}
    </div>
  );
};

export default StyleAnalyzer; 