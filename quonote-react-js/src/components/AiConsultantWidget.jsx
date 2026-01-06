import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { sendMessageToAI } from '../api/gemini';

const AiConsultantWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
      {
        role: 'assistant',
        text: "Hello! 👋 I'm the Quonote AI Consultant.\n\nTell me a bit about your business (e.g., 'I run a pharmacy' or 'I have a fintech startup'), and I'll suggest a digital strategy for you!"
      }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
      if (!input.trim()) return;

      const userMessage = { role: 'user', text: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const aiResponseText = await sendMessageToAI(input);
        setMessages(prev => [...prev, { role: 'assistant', text: aiResponseText }]);
      } catch (error) {
        console.error("AI Error:", error);
        setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I encountered a connection error. Please try again." }]);
      } finally {
        setIsLoading(false);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') handleSend();
    };

    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Chat Window */}
        {isOpen && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden flex flex-col animate-fade-in-up transition-all" style={{ height: '500px' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="text-yellow-300" size={20} />
                <div>
                  <h3 className="text-white font-bold text-sm">Quonote AI Consultant</h3>
                  <p className="text-blue-100 text-xs opacity-90">Powered by Gemini ✨</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${ 
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex items-center gap-2">
                    <Loader2 className="animate-spin text-blue-400" size={16} />
                    <span className="text-slate-400 text-xs">Generating strategy...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
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
          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-600/30 hover:scale-110 transition-transform duration-300"
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Bot size={28} className="text-white animate-pulse" />
          )}

          {/* Tooltip hint when closed */}
          {!isOpen && (
            <span className="absolute right-full mr-4 bg-white text-blue-900 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none">
              Ask AI for Strategy ✨
            </span>
          )}
        </button>
      </div>
    );
  };

  export default AiConsultantWidget;
