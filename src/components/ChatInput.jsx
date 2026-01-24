import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ input, setInput, handleSend, isLoading }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="p-3 bg-slate-800 border-t border-slate-700">
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-600 rounded-full px-4 py-2 focus-within:border-blue-500 transition-colors">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about digital strategy..."
          className="bg-transparent border-none outline-none text-white text-sm flex-grow placeholder:text-slate-500"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`p-1.5 rounded-full transition-colors ${ 
            input.trim() ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-slate-700 text-slate-500'
          }`}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
