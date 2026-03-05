import React from "react";

const QuonoteLogo = ({ className = "h-9 w-auto md:h-10 lg:h-11" }) => (
  <div className="flex items-center gap-2 md:gap-3">
    <img
      src="/logo2.png"
      alt="Quonote Logo"
      className={`${className} object-contain shrink-0 drop-shadow-lg`}
      style={{ filter: "brightness(1.1) contrast(1.2)" }}
    />

    <div className="flex flex-col leading-none">
      <span
        className="text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-md"
        style={{ color: "var(--text-primary)" }}
      >
        QUONOTE
      </span>
      <span className="text-[0.65rem] md:text-xs font-extrabold text-blue-400 tracking-[0.2em] uppercase">
        Digital
      </span>
    </div>
  </div>
);

export default QuonoteLogo;
