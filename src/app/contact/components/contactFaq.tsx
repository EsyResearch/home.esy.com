import React from 'react';
import { ChevronDown } from 'lucide-react';

const ContactFAQ = ({ 
  currentTheme, 
  faqs, 
  expandedFaq, 
  setExpandedFaq, 
  setShowForm 
}) => (
  <section style={{ 
    padding: '6rem 0',
    borderTop: `1px solid ${currentTheme.border}`
  }}>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
      <h2 style={{
        fontSize: '2.5rem',
        fontWeight: 300,
        letterSpacing: '-0.02em',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        Frequently asked questions
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              borderBottom: `1px solid ${currentTheme.border}`,
              paddingBottom: '1.5rem',
              marginBottom: '1.5rem'
            }}
          >
            <button
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: '1rem 0',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'left'
              }}
            >
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 400,
                color: currentTheme.text
              }}>
                {faq.question}
              </h3>
              <ChevronDown 
                size={20} 
                color={currentTheme.subtle}
                style={{
                  transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </button>
            
            {expandedFaq === index && (
              <p style={{
                fontSize: '0.938rem',
                lineHeight: 1.7,
                color: currentTheme.muted,
                paddingTop: '0.5rem',
                paddingBottom: '1rem'
              }}>
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        <p style={{
          fontSize: '0.938rem',
          color: currentTheme.subtle
        }}>
          Still have questions? 
          <button
            onClick={() => {
              setShowForm(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: currentTheme.accent,
              fontSize: '0.938rem',
              cursor: 'pointer',
              marginLeft: '0.5rem',
              textDecoration: 'underline'
            }}
          >
            Send us a message
          </button>
        </p>
      </div>
    </div>
  </section>
);

export default ContactFAQ; 