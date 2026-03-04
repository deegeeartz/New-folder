import React from "react";

const QuonoteLogo = ({ className = "w-10 h-10 md:w-12 md:h-12" }) => (
  <div className="flex items-center gap-2 md:gap-3">
    {/* Your Logo Image */}
    <img
      src="/logo.png"
      alt="Quonote Logo"
      className={`${className} object-contain drop-shadow-lg`}
      style={{ filter: "brightness(1.1) contrast(1.2)" }}
    />

    {/* Brand Text Structure */}
    <div className="flex flex-col leading-none">
      <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
        QUONOTE
      </span>
      {/* Subsidiary Descriptor */}
      <span className="text-[0.65rem] md:text-xs font-extrabold text-blue-400 tracking-[0.2em] uppercase">
        Digital
      </span>
    </div>
  </div>
);

export default QuonoteLogo;
