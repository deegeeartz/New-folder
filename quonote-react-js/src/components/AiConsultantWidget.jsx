import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, Bot } from 'lucide-react';
import { sendMessageToAI } from '../api/gemini';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

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

    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Chat Window */}
        {isOpen && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden flex flex-col animate-fade-in-up transition-all" style={{ height: '500px' }}>
            <ChatHeader onClose={() => setIsOpen(false)} />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
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

            <ChatInput 
              input={input} 
              setInput={setInput} 
              handleSend={handleSend} 
              isLoading={isLoading} 
            />
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
