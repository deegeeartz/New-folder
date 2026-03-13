import React, { useEffect, useMemo, useState } from "react";
import useReducedMotion from "../Hooks/useReducedMotion";

const TypewriterText = ({
  words = [],
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseMs = 1400,
  className = "",
  caretClassName = "",
}) => {
  const prefersReducedMotion = useReducedMotion();
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const longestWord = useMemo(() => {
    if (!safeWords.length) {
      return "";
    }

    return safeWords.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      "",
    );
  }, [safeWords]);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || safeWords.length <= 1) {
      return;
    }

    const currentWord = safeWords[wordIndex];
    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), typeSpeed);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((prev) => prev - 1), deleteSpeed);
    } else {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % safeWords.length);
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    deleteSpeed,
    isDeleting,
    pauseMs,
    prefersReducedMotion,
    safeWords,
    typeSpeed,
    wordIndex,
  ]);

  if (!safeWords.length) {
    return null;
  }

  const visibleText = prefersReducedMotion
    ? safeWords[0]
    : safeWords[wordIndex].slice(0, charIndex);

  return (
    <span className="relative inline-block max-w-full align-baseline">
      <span className={`invisible block max-w-full ${className}`}>
        {longestWord}
      </span>
      <span className="absolute inset-0 block max-w-full">
        <span className={className}>{visibleText}</span>
        {!prefersReducedMotion && (
          <span
            className={`typewriter-caret ${caretClassName}`}
            aria-hidden="true"
          >
            |
          </span>
        )}
      </span>
    </span>
  );
};

export default TypewriterText;
