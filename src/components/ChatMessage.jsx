import React, { useEffect, useState } from "react";
import useReducedMotion from "../Hooks/useReducedMotion";

// Converts a single line of markdown to React elements (inline only)
const parseInline = (text, keyPrefix) => {
  const parts = [];
  // Patterns: **bold**, *italic*, [label](url), bare email
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|([\w.+-]+@[\w-]+\.[\w.]+))/g;
  let last = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={`${keyPrefix}-b-${match.index}`}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={`${keyPrefix}-i-${match.index}`}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(
        <a key={`${keyPrefix}-a-${match.index}`} href={match[5]} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
          {match[4]}
        </a>
      );
    } else if (match[6]) {
      parts.push(
        <a key={`${keyPrefix}-e-${match.index}`} href={`mailto:${match[6]}`} className="text-blue-400 underline hover:text-blue-300">
          {match[6]}
        </a>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

const renderMarkdown = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let listItems = [];
  let listType = null; // 'ul' | 'ol'
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    if (listType === "ol") {
      elements.push(
        <ol key={key++} className="list-decimal list-inside space-y-1 my-1 pl-1">
          {listItems}
        </ol>
      );
    } else {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 my-1 pl-1">
          {listItems}
        </ul>
      );
    }
    listItems = [];
    listType = null;
  };

  lines.forEach((line) => {
    const bulletMatch = line.match(/^[*-]\s+(.*)/);
    const orderedMatch = line.match(/^\d+\.\s+(.*)/);
    const headingMatch = line.match(/^###\s+(.*)/);

    if (bulletMatch) {
      if (listType === "ol") flushList();
      listType = "ul";
      listItems.push(
        <li key={key++}>{parseInline(bulletMatch[1], `li-${key}`)}</li>
      );
    } else if (orderedMatch) {
      if (listType === "ul") flushList();
      listType = "ol";
      listItems.push(
        <li key={key++}>{parseInline(orderedMatch[1], `li-${key}`)}</li>
      );
    } else if (headingMatch) {
      flushList();
      elements.push(
        <p key={key++} className="font-semibold text-slate-100 mt-2">
          {parseInline(headingMatch[1], `h-${key}`)}
        </p>
      );
    } else if (line.trim() === "") {
      flushList();
      elements.push(<div key={key++} className="h-1" />);
    } else {
      flushList();
      elements.push(
        <p key={key++}>{parseInline(line, `p-${key}`)}</p>
      );
    }
  });

  flushList();
  return elements;
};

const BOOKING_CTA_PATTERN = /book\s+a?\s*consultation|contact\s+the\s+team|info@quonote\.com/i;

const TypedMessage = ({ text }) => {
  const prefersReducedMotion = useReducedMotion();
  const [visibleLength, setVisibleLength] = useState(
    prefersReducedMotion ? text.length : 0,
  );

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

  const visibleText = text.slice(0, visibleLength);
  const isDone = visibleLength >= text.length;
  const showCta = isDone && BOOKING_CTA_PATTERN.test(text);

  return (
    <div className="space-y-1">
      {renderMarkdown(visibleText)}
      {showCta && (
        <a
          href="/#contact"
          className="inline-flex items-center gap-1 mt-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          onClick={() => {
            // Close chat so contact section is visible
            document.querySelector('[aria-label="Close AI consultant"]')?.click();
          }}
        >
          Book a Consultation →
        </a>
      )}
    </div>
  );
};

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-black dark:text-white rounded-br-none"
            : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none"
        }`}
      >
        {message.typed && !isUser ? (
          <TypedMessage text={message.text} />
        ) : isUser ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <div className="space-y-1">{renderMarkdown(message.text)}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
