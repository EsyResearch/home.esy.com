import SearchActions from './searchActions';
import QuickPromptsSection from '../QuickPromptsSection/';
import { useState, useEffect, useRef } from 'react';

const Search = () => {
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef(null);
  
    const placeholders = [
      "What would you like to research today?",
      "Paste your essay prompt here...",
      "Start with a research question...",
      "What's your essay topic?",
      "Enter your thesis statement..."
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [placeholders.length]);
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);

      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };
  
    return (
      <div className="max-w-4xl mx-auto mb-16 animate-fadeIn animation-delay-200">
        <div className="relative">
          <textarea 
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            className="w-full px-6 py-5 bg-slate-900/60 rounded-2xl text-lg resize-none text-white placeholder-gray-500 outline-none transition-all duration-300 border border-slate-800 focus:border-purple-500/50"
            rows="3"

            placeholder={placeholders[currentPlaceholder]}
            style={{
              boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.2), 0 0 20px rgba(139, 92, 246, 0.1)',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 0 0 1px rgba(139, 92, 246, 0.2), 0 0 20px rgba(139, 92, 246, 0.1)';
            }}
          />
          
          <SearchActions />
        </div>
        
        <QuickPromptsSection />
      </div>
    );
  };


  export default Search