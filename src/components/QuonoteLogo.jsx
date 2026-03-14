import React from "react";
import { useTheme } from "../context/ThemeContext";

const QuonoteLogo = ({
  className = "h-9 w-auto md:h-10 lg:h-11",
  priority = false,
  lazy = false,
}) => {
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/logo-blue.png" : "/logo2.png";

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <img
        src={logoSrc}
        alt="Quonote Logo"
        width={44}
        height={44}
        className={`${className} object-contain shrink-0 drop-shadow-lg`}
        style={{ filter: theme === "light" ? "none" : "brightness(1.1) contrast(1.2)" }}
        fetchPriority={priority ? "high" : "auto"}
        loading={lazy ? "lazy" : "eager"}
        decoding={priority ? "sync" : "async"}
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
};

export default QuonoteLogo;
