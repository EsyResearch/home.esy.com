import { useState, useEffect, useRef } from 'react';


const StatsWidget = () => {
    const [animatedValues, setAnimatedValues] = useState({ essays: 0, grade: 0, students: 0 });
    const statsRef = useRef(null);
  
    useEffect(() => {
      const animateValue = (start, end, duration, key) => {
        const startTime = Date.now();
        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const value = Math.floor(progress * (end - start) + start);
          
          setAnimatedValues(prev => ({ ...prev, [key]: value }));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateValue(0, 23, 2000, 'essays');
            animateValue(0, 98, 2000, 'grade');
            animateValue(0, 150, 2000, 'students');
            observer.disconnect();
          }
        });
      });
  
      if (statsRef.current) {
        observer.observe(statsRef.current);
      }
  
      return () => observer.disconnect();
    }, []);
  
    return (
      <div ref={statsRef} className="text-center animate-fadeIn animation-delay-600">
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              {animatedValues.essays / 10}.{animatedValues.essays % 10}M+
            </p>
            <p className="text-sm text-gray-400 mt-1">Essays Written</p>
          </div>
          <div>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              {animatedValues.grade}%
            </p>
            <p className="text-sm text-gray-400 mt-1">Grade Improvement</p>
          </div>
          <div>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              {animatedValues.students}K+
            </p>
            <p className="text-sm text-gray-400 mt-1">Happy Students</p>
          </div>
        </div>
      </div>
    );
  };

  export default StatsWidget;