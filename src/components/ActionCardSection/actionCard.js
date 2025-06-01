const ActionCard = ({ icon, title, description, color }) => {
    const colorClasses = {
      purple: 'bg-purple-500/20 text-purple-400',
      indigo: 'bg-indigo-500/20 text-indigo-400',
      green: 'bg-green-500/20 text-green-400',
      amber: 'bg-amber-500/20 text-amber-400'
    };
  
    return (
      <div className="bg-slate-900/40 p-6 rounded-xl cursor-pointer transition-all duration-300 border border-slate-800 hover:border-purple-500/30 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)]">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
          {icon}
        </div>
        <h3 className="font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    );
  };

  export default ActionCard;