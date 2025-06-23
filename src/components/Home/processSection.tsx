import { useEffect } from "react";
import ProcessStep from "@/components/Home/processStep";

export default function ProcessSection() {
    const steps = [
      {
        number: '1',
        title: 'Start Your Draft',
        description: 'Begin with an outline or paste existing work. Our AI understands your context immediately.'
      },
      {
        number: '2',
        title: 'Research & Write',
        description: 'Get real-time suggestions, find supporting evidence, and maintain flow with AI assistance.'
      },
      {
        number: '3',
        title: 'Refine & Perfect',
        description: 'Polish your arguments, enhance clarity, and ensure academic rigor throughout.'
      },
      {
        number: '4',
        title: 'Cite & Submit',
        description: 'Format citations perfectly, generate bibliographies, and export in any required format.'
      }
    ];
  
    useEffect(() => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
  
      setTimeout(() => {
        document.querySelectorAll('.process-step').forEach(el => {
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.transform = 'translateY(20px)';
          (el as HTMLElement).style.transition = 'all 0.6s ease-out';
          observer.observe(el);
        });
      }, 100);
  
      return () => observer.disconnect();
    }, []);
  
    return (
      <section className="process">
        <div className="process-container">
          <div className="process-header">
            <span className="features-badge">HOW IT WORKS</span>
            <h2 className="features-title">From Idea to Publication</h2>
            <p className="features-subtitle">
              A seamless workflow that accelerates your academic journey
            </p>
          </div>
          
          <div className="process-steps">
            <div className="process-line"></div>
            {steps.map((step, index) => (
              <ProcessStep key={index} {...step} />
            ))}
          </div>
        </div>
      </section>
    );
};
