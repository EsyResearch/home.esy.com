"use client";
import { useState, useEffect, useRef } from 'react';
import { referenceStyles, compareStyles } from '@/lib/styleReference';

const StyleInspector = () => {
  const [isActive, setIsActive] = useState(false);
  const [inspectedElement, setInspectedElement] = useState(null);
  const [styleReport, setStyleReport] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const inspectorPanelClass = 'style-inspector-panel';

    const handleMouseOver = (e) => {
      e.stopPropagation();
      const element = e.target;
      // Prevent inspecting the inspector itself
      if (element.closest && element.closest(`.${inspectorPanelClass}`)) {
        return;
      }
      const tagName = element.tagName.toLowerCase();
      const className = element.className;
      
      // Only inspect markdown content elements
      if (tagName.match(/^(h[1-6]|p|ul|ol|li|blockquote|pre|code|div)$/)) {
        const computedStyle = window.getComputedStyle(element);
        const actualStyles = {
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

        const elementType = className.includes('keyInsight') ? 'keyInsightBox' : 
                          className.includes('strategy') ? 'strategyCard' :
                          className.includes('video') ? 'videoCard' :
                          className.includes('callToAction') ? 'callToAction' :
                          tagName;

        const differences = compareStyles(actualStyles, elementType);

        setInspectedElement({
          tagName,
          className,
          elementType,
          actualStyles,
          differences
        });
      }
    };

    const handleMouseOut = () => {
      setInspectedElement(null);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isActive]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh && isActive) {
      refreshIntervalRef.current = setInterval(() => {
        if (styleReport) {
          generateFullReport();
        }
      }, 2000); // Refresh every 2 seconds
    } else {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [autoRefresh, isActive, styleReport]);

  const generateFullReport = () => {
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, ul, ol, li, blockquote, pre, code');
    const report = {};

    elements.forEach((element) => {
      const tagName = element.tagName.toLowerCase();
      const className = element.className;
      const computedStyle = window.getComputedStyle(element);
      
      const actualStyles = {
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

      const elementType = className.includes('keyInsight') ? 'keyInsightBox' : 
                        className.includes('strategy') ? 'strategyCard' :
                        className.includes('video') ? 'videoCard' :
                        className.includes('callToAction') ? 'callToAction' :
                        tagName;

      const differences = compareStyles(actualStyles, elementType);
      
      if (differences && Object.keys(differences).length > 0) {
        report[elementType] = {
          actual: actualStyles,
          differences
        };
      }
    });

    setStyleReport(report);
    console.log('Full Style Report:', report);
  };

  const copyReport = async () => {
    if (!styleReport) return;

    const formatReport = () => {
      let reportText = `# Style Analysis Report\n\n`;
      reportText += `Generated: ${new Date().toLocaleString()}\n`;
      reportText += `URL: ${window.location.href}\n\n`;

      if (Object.keys(styleReport).length === 0) {
        reportText += `✅ **All styles match reference!**\n\n`;
        reportText += `No style differences found. All elements are rendering correctly according to the reference template.`;
      } else {
        reportText += `❌ **Style Differences Found**\n\n`;
        reportText += `Found ${Object.keys(styleReport).length} element type(s) with style mismatches:\n\n`;

        Object.entries(styleReport).forEach(([elementType, data]) => {
          reportText += `## ${elementType}\n\n`;
          
          Object.entries(data.differences).forEach(([property, diff]) => {
            reportText += `**${property}:**\n`;
            reportText += `- Expected: \`${diff.expected}\`\n`;
            reportText += `- Actual: \`${diff.actual}\`\n\n`;
          });
        });

        reportText += `\n---\n\n`;
        reportText += `**Summary:**\n`;
        reportText += `- Total elements with issues: ${Object.keys(styleReport).length}\n`;
        reportText += `- Total style properties with issues: ${Object.values(styleReport).reduce((sum, data) => sum + Object.keys(data.differences).length, 0)}\n\n`;
        reportText += `**Recommendation:** Update the CSS for the above elements to match the reference styles.`;
      }

      return reportText;
    };

    const reportText = formatReport();
    
    try {
      await navigator.clipboard.writeText(reportText);
      setCopyStatus('✅ Copied to clipboard!');
      setTimeout(() => setCopyStatus(''), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = reportText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyStatus('✅ Copied to clipboard!');
      setTimeout(() => setCopyStatus(''), 3000);
    }
  };

  if (!isActive) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        background: '#1e1e2a',
        border: '1px solid #2a2a3a',
        borderRadius: '8px',
        padding: '0.75rem',
        color: '#fff',
        fontSize: '0.875rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}>
        <button
          onClick={() => setIsActive(true)}
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 0.75rem',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}
        >
          🔍 Style Inspector
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Inspector Panel */}
      <div
        className="style-inspector-panel"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: isMinimized ? 'auto' : '400px',
          maxHeight: isMinimized ? 'auto' : '60vh',
          overflowY: 'auto',
          background: '#1e1e2a',
          border: '1px solid #2a2a3a',
          borderRadius: '12px',
          padding: isMinimized ? '0.5rem' : '1rem',
          color: '#fff',
          zIndex: 1000,
          fontSize: '0.875rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s ease'
        }}
      >
        {isMinimized ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#6366f1', fontSize: '0.75rem' }}>Style Inspector</span>
            <button
              onClick={() => setIsMinimized(false)}
              style={{
                background: 'transparent',
                border: '1px solid #2a2a3a',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              ⬆️
            </button>
            <button
              onClick={() => setIsActive(false)}
              style={{
                background: 'transparent',
                border: '1px solid #2a2a3a',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#6366f1', fontSize: '1rem' }}>Style Inspector</h3>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button
                  onClick={() => setIsMinimized(true)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #2a2a3a',
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}
                >
                  ⬇️
                </button>
                <button
                  onClick={() => setIsActive(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #2a2a3a',
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button
                onClick={generateFullReport}
                style={{
                  background: '#2a2a3a',
                  border: '1px solid #3a3a4a',
                  borderRadius: '6px',
                  padding: '0.5rem 0.75rem',
                  color: '#fff',
                  cursor: 'pointer',
                  flex: 1,
                  fontSize: '0.75rem'
                }}
              >
                📊 Generate
              </button>
              
              {styleReport && (
                <button
                  onClick={copyReport}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    color: '#fff',
                    cursor: 'pointer',
                    flex: 1,
                    fontSize: '0.75rem'
                  }}
                >
                  📋 Copy
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                id="autoRefresh"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                style={{ margin: 0 }}
              />
              <label htmlFor="autoRefresh" style={{ fontSize: '0.75rem', color: '#94a3b8', cursor: 'pointer' }}>
                Auto-refresh (2s)
              </label>
            </div>

            {copyStatus && (
              <div style={{
                background: '#10b981',
                color: '#fff',
                padding: '0.5rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                textAlign: 'center',
                fontSize: '0.75rem'
              }}>
                {copyStatus}
              </div>
            )}

            {inspectedElement && (
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ color: '#6366f1', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  {inspectedElement.tagName} {inspectedElement.className && `(${inspectedElement.className})`}
                </h4>
                
                {inspectedElement.differences && Object.keys(inspectedElement.differences).length > 0 ? (
                  <div>
                    <p style={{ color: '#ef4444', marginBottom: '0.5rem', fontSize: '0.75rem' }}>❌ Style Differences Found:</p>
                    {Object.entries(inspectedElement.differences).map(([property, diff]) => (
                      <div key={property} style={{ marginBottom: '0.25rem', fontSize: '0.75rem' }}>
                        <strong>{property}:</strong>
                        {property === 'color' || property === 'background' || property === 'backgroundColor' || property === 'borderColor' ? (
                          <>
                            <div style={{ color: '#94a3b8', marginLeft: '0.5rem' }}>
                              Expected: {diff.expected} {diff.expectedRgb && diff.expectedRgb !== diff.expected ? `(${diff.expectedRgb})` : ''}
                            </div>
                            <div style={{ color: '#ef4444', marginLeft: '0.5rem' }}>
                              Actual: {diff.actual}
                            </div>
                            {diff.expectedRgb && diff.actual && diff.expectedRgb.replace(/\s+/g, '') !== diff.actual.replace(/\s+/g, '') && (
                              <div style={{ color: '#fbbf24', marginLeft: '0.5rem', fontSize: '0.7em' }}>
                                (Mismatch is based on rgb value)
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div style={{ color: '#94a3b8', marginLeft: '0.5rem' }}>
                              Expected: {diff.expected} {diff.expectedPx && diff.expectedPx !== diff.expected ? `(${diff.expectedPx})` : ''}
                            </div>
                            <div style={{ color: '#ef4444', marginLeft: '0.5rem' }}>
                              Actual: {diff.actual}
                            </div>
                            {diff.expectedPx && diff.actual && diff.expectedPx !== diff.actual && (
                              <div style={{ color: '#fbbf24', marginLeft: '0.5rem', fontSize: '0.7em' }}>
                                (Mismatch is based on px value)
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#10b981', fontSize: '0.75rem' }}>✅ Styles match reference</p>
                )}
              </div>
            )}

            {styleReport && (
              <div>
                <h4 style={{ color: '#6366f1', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Report Summary</h4>
                {Object.keys(styleReport).length > 0 ? (
                  <div style={{ fontSize: '0.75rem' }}>
                    <p style={{ color: '#ef4444', marginBottom: '0.5rem' }}>
                      Found {Object.keys(styleReport).length} element type(s) with issues:
                    </p>
                    {Object.entries(styleReport).map(([elementType, data]) => (
                      <div key={elementType} style={{ marginBottom: '0.5rem', padding: '0.5rem', background: '#2a2a3a', borderRadius: '4px' }}>
                        <strong style={{ color: '#ef4444' }}>{elementType}</strong>
                        <div style={{ color: '#94a3b8', marginTop: '0.25rem' }}>
                          {Object.keys(data.differences).length} property difference(s): {Object.keys(data.differences).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#10b981', fontSize: '0.75rem' }}>✅ All styles match reference!</p>
                )}
              </div>
            )}

            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
              <p>💡 Hover over elements to inspect</p>
              <p>📊 Click &quot;Generate&quot; for analysis</p>
              <p>📋 Click &quot;Copy&quot; to share results</p>
            </div>
          </>
        )}
      </div>

      {/* Overlay to prevent text selection */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        pointerEvents: 'none'
      }} />
    </>
  );
};

export default StyleInspector; 