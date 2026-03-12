import React from "react";
import useInView from "../Hooks/useInView";
import useReducedMotion from "../Hooks/useReducedMotion";

const RevealOnScroll = ({
  children,
  className = "",
  delay = 0,
  duration = 700,
  y = 14,
  once = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ threshold: 0.15, once });
  const isVisible = prefersReducedMotion || inView;

  return (
    <div
      ref={ref}
      className={`reveal-base ${isVisible ? "reveal-visible" : ""} ${className}`}
      style={{
        "--reveal-delay": `${delay}ms`,
        "--reveal-duration": `${duration}ms`,
        "--reveal-y": `${y}px`,
      }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
