import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${ 
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
