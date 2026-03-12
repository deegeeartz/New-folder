import React, { useEffect, useState } from 'react';
import useReducedMotion from '../Hooks/useReducedMotion';

const TypedMessage = ({ text }) => {
  const prefersReducedMotion = useReducedMotion();
  const [visibleLength, setVisibleLength] = useState(prefersReducedMotion ? text.length : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleLength(text.length);
      return;
    }

    let timeout;
    if (visibleLength < text.length) {
      timeout = setTimeout(() => {
        setVisibleLength((current) => current + 1);
      }, 14);
    }

    return () => clearTimeout(timeout);
  }, [prefersReducedMotion, text, visibleLength]);

  return <p className="whitespace-pre-wrap">{text.slice(0, visibleLength)}</p>;
};

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
        {message.typed && !isUser ? (
          <TypedMessage text={message.text} />
        ) : (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
