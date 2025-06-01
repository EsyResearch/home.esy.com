const QuickPrompts = () => {
    const prompts = [
      "Analyze the themes in The Great Gatsby",
      "Climate change impact on agriculture",
      "Compare Keynesian vs Austrian economics"
    ];
  
    return (
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {prompts.map((prompt, index) => (
          <button 
            key={index}
            className="px-4 py-2 bg-slate-800/50 rounded-full text-sm hover:bg-slate-700/50 transition text-gray-300 border border-slate-700"
          >
            "{prompt}"
          </button>
        ))}
      </div>
    );
  };

  export default QuickPrompts;