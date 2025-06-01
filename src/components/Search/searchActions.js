import { Paperclip, FileText } from 'lucide-react';

const searchActions = () => {
    return (
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <button className="text-gray-400 hover:text-white transition flex items-center space-x-2">
            <Paperclip size={18} />
            <span className="text-sm">Attach file</span>
          </button>
          <button className="text-gray-400 hover:text-white transition flex items-center space-x-2">
            <FileText size={18} />
            <span className="text-sm">Upload rubric</span>
          </button>
        </div>
        
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl hover:opacity-90 transition font-medium text-white">
          Start Research →
        </button>
      </div>
    );
  };

  export default searchActions;