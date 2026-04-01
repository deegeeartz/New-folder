import React from 'react';
import { Sparkles, X } from 'lucide-react';

const ChatHeader = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Sparkles className="text-yellow-300" size={20} />
        <div>
          <h3 className="text-black dark:text-white font-bold text-sm">Quonote AI Consultant</h3>
          <p className="text-blue-100 text-xs opacity-90">Powered by Gemini ✨</p>
        </div>
      </div>
      <button onClick={onClose} className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white">
        <X size={18} />
      </button>
    </div>
  );
};

export default ChatHeader;
