import { useEffect, useState } from "react";


export default function TestimonialsSection() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    
    const testimonials = [
      {
        quote: "Esy transformed my research workflow. What used to take weeks now takes days. The AI understands academic context better than any tool I've used.",
        author: "Dr. Sarah Chen",
        role: "Professor of Computer Science, MIT",
        avatar: "SC"
      },
      {
        quote: "The quality of writing assistance is exceptional. It's like having a brilliant co-author who never sleeps and always has the perfect citation ready.",
        author: "Michael Rodriguez",
        role: "PhD Candidate, Stanford University",
        avatar: "MR"
      },
      {
        quote: "I've published 40% more papers since using Esy. The research discovery features alone saved me hundreds of hours last year.",
        author: "Prof. Emily Watson",
        role: "Director of Research, Oxford",
        avatar: "EW"
      }
    ];
  
    useEffect(() => {
      const testimonialInterval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % 3);
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