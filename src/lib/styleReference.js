// Reference Style Guide - Based on schoolViewTemplate.ai-reference.txt
export const referenceStyles = {
  // Headings
  h1: {
    fontSize: '4rem',
    fontWeight: '800',
    color: '#ffffff',
    margin: '3rem 0 2rem 0',
    lineHeight: '1.1',
    background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 50%, #c7d2fe 100%)',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '2.5rem 0 1.5rem 0',
    borderBottom: '1px solid #2a2a3a',
    paddingBottom: '0.5rem'
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '2rem 0 1.25rem 0'
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: '1.5rem 0 0.75rem 0'
  },

  // Paragraphs
  p: {
    fontSize: '1.25rem',
    color: '#94a3b8',
    lineHeight: '1.8',
    margin: '1.5rem 0'
  },

  // Lists
  ul: {
    margin: '1.5rem 0 1.5rem 2.5rem',
    padding: '0'
  },
  ol: {
    margin: '1.5rem 0 1.5rem 2.5rem',
    padding: '0'
  },
  li: {
    fontSize: '1.18rem',
    color: '#e5e7eb',
    margin: '0.75rem 0',
    lineHeight: '1.7'
  },
  'ul li': {
    listStyleType: 'disc',
    color: '#a855f7'
  },
  'ol li': {
    listStyleType: 'decimal',
    color: '#6366f1'
  },

  // Blockquotes
  blockquote: {
    margin: '2.5rem 0',
    padding: '2rem 2.5rem',
    background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.12) 100%)',
    borderLeft: '6px solid #6366f1',
    borderRadius: '20px',
    color: '#e0e7ff',
    fontStyle: 'italic',
    fontWeight: '500'
  },

  // Code blocks
  pre: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: '14px',
    padding: '2rem',
    margin: '2rem 0',
    fontSize: '1.1rem'
  },
  code: {
    background: '#1e1e2a',
    color: '#e0e7ff',
    padding: '0.25em 0.5em',
    borderRadius: '6px',
    fontSize: '1.1em',
    fontFamily: "'Fira Mono', 'Menlo', 'Monaco', 'Consolas', monospace"
  },
  'pre code': {
    background: 'none',
    color: '#e0e7ff',
    padding: '0',
    fontSize: '1.1em'
  },

  // Key Insight Box
  keyInsightBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem',
    background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)',
    borderLeft: '8px solid #6366f1',
    borderRadius: '20px',
    padding: '2rem 2.5rem',
    margin: '2.5rem 0',
    color: '#e0e7ff',
    boxShadow: '0 4px 24px 0 rgba(99,102,241,0.08)'
  },

  // Custom Cards
  strategyCard: {
    background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(168,85,247,0.10) 100%)',
    border: '1px solid #2a2a3a',
    borderRadius: '18px',
    padding: '2rem',
    margin: '2.5rem 0',
    boxShadow: '0 2px 16px 0 rgba(99,102,241,0.06)'
  },
  videoCard: {
    background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(168,85,247,0.10) 100%)',
    border: '1px solid #2a2a3a',
    borderRadius: '18px',
    padding: '2rem',
    margin: '2.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    boxShadow: '0 2px 16px 0 rgba(99,102,241,0.06)'
  },
  callToAction: {
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    borderRadius: '16px',
    padding: '2rem',
    color: '#fff',
    margin: '2.5rem 0',
    boxShadow: '0 2px 16px 0 rgba(99,102,241,0.10)',
    textAlign: 'center'
  }
};

// Helper to convert rem/em to px
function toPx(value, contextPx = 16) {
  if (typeof value === 'string') {
    if (value.endsWith('rem')) {
      return parseFloat(value) * 16 + 'px';
    }
    if (value.endsWith('em')) {
      return parseFloat(value) * contextPx + 'px';
    }
    if (value.endsWith('px')) {
      return value;
    }
    // fallback: try to parse as number
    const num = parseFloat(value);
    if (!isNaN(num)) return num + 'px';
  }
  return value;
}

// Helper to convert hex color to rgb
function hexToRgb(hex) {
  let c = hex.trim();
  if (c.startsWith('#')) c = c.slice(1);
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  if (c.length !== 6) return hex;
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

// Helper to check if a string is a hex color
function isHexColor(str) {
  return typeof str === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str.trim());
}

// Function to compare actual vs expected styles
export const compareStyles = (actualStyles, elementType, contextPx = 16) => {
  const expected = referenceStyles[elementType];
  if (!expected) return null;

  const differences = {};
  
  Object.keys(expected).forEach(property => {
    const expectedOriginal = expected[property];
    let expectedPx = toPx(expectedOriginal, contextPx);
    let actualPx = actualStyles[property];
    let isMismatch = false;

    // Color handling
    if (property === 'color' || property === 'background' || property === 'backgroundColor' || property === 'borderColor') {
      let expectedRgb = isHexColor(expectedOriginal) ? hexToRgb(expectedOriginal) : expectedOriginal;
      let actualRgb = actualPx;
      // Some browsers return rgb(a) with spaces, some without
      if (expectedRgb && actualRgb && expectedRgb.replace(/\s+/g, '') !== actualRgb.replace(/\s+/g, '')) {
        isMismatch = true;
      }
      if (isMismatch) {
        differences[property] = {
          expected: expectedOriginal,
          expectedRgb: expectedRgb,
          actual: actualRgb
        };
      }
      return;
    }

    // px-based comparison (fontSize, margin, etc)
    if (expectedPx && actualPx) {
      const expectedNum = parseFloat(expectedPx);
      const actualNum = parseFloat(actualPx);
      if (!isNaN(expectedNum) && !isNaN(actualNum)) {
        isMismatch = Math.abs(expectedNum - actualNum) > 0.5;
      } else {
        isMismatch = expectedPx !== actualPx;
      }
    } else {
      isMismatch = expectedPx !== actualPx;
    }
    if (isMismatch) {
      differences[property] = {
        expected: expectedOriginal,
        expectedPx: expectedPx,
        actual: actualPx
      };
    }
  });

  return differences;
};

// Function to generate a style report
export const generateStyleReport = (actualStyles) => {
  const report = {
    matches: [],
    differences: [],
    missing: []
  };

  Object.keys(referenceStyles).forEach(elementType => {
    const actual = actualStyles[elementType];
    if (actual) {
      const diff = compareStyles(actual, elementType);
      if (diff && Object.keys(diff).length > 0) {
        report.differences.push({ elementType, differences: diff });
      } else {
        report.matches.push(elementType);
      }
    } else {
      report.missing.push(elementType);
    }
  });

  return report;
}; 