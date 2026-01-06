import React from 'react';

const QuonoteLogo = ({ className = "w-8 h-8" }) => (
    <div className="flex items-center gap-2">
      {/* --- OPTION 1: Your Image Logo (Uncomment this when you have the URL) --- */}
      {/* <img src="/path-to-your-logo.png" alt="Quonote Logo" className={className} /> */}
  
      {/* --- OPTION 2: Placeholder "Q" SVG (Currently Active) --- */}
      <div className={`${className} bg-blue-600 rounded-lg flex items-center justify-center transform rotate-3`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white w-2/3 h-2/3">
          {/* A stylized Q shape representing the Enterprise */}
          <path d="M12 2a10 10 0 1 0 5 18.5" />
          <path d="M14 14l6 6" />
        </svg>
      </div>
  
      {/* Brand Text Structure */}
      <div className="flex flex-col leading-none">
        <span className="text-xl md:text-2xl font-bold text-white tracking-tighter">
          QUONOTE
        </span>
        {/* Subsidiary Descriptor */}
        <span className="text-[0.65rem] md:text-xs font-bold text-blue-500 tracking-[0.2em] uppercase">
          Digital
        </span>
      </div>
    </div>
  );

  export default QuonoteLogo;