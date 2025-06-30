import { useEffect, useState } from "react";


export default function TestimonialsSection() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    
    const testimonials = [
      {
        quote: "Esy has transformed how I approach research. The AI collaboration feels natural and productive.",
        author: "Research Team Lead",
        role: "Technology Company",
        avatar: "👨‍💼"
      },
      {
        quote: "The prompt engineering techniques I learned here have made my work 10x more efficient.",
        author: "Data Scientist",
        role: "Startup",
        avatar: "👩‍💻"
      }
    ];
  
    useEffect(() => {
      const testimonialInterval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % 2);
      }, 5000);
  
      return () => clearInterval(testimonialInterval);
    }, []);
  
    return (
      <section className="testimonials">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="features-badge">TESTIMONIALS</span>
            <h2 className="features-title">Loved by Academics Worldwide</h2>
          </div>
          
          <div className="testimonial-card">
            <p className="testimonial-quote">
              {testimonials[activeTestimonial].quote}
            </p>
            
            <div className="testimonial-author">
              <div className="testimonial-avatar" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'white'
              }}>
                {testimonials[activeTestimonial].avatar}
              </div>
              <div className="testimonial-info">
                <div className="testimonial-name">{testimonials[activeTestimonial].author}</div>
                <div className="testimonial-role">{testimonials[activeTestimonial].role}</div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-nav">
            {testimonials.map((_, index) => (
              <div 
                key={index}
                className={`testimonial-dot ${activeTestimonial === index ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  };