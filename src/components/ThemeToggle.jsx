import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg border"
      style={{
        backgroundColor:
          theme === "dark"
            ? "rgba(30, 41, 59, 0.8)"
            : "rgba(248, 250, 252, 0.9)",
        borderColor:
          theme === "dark"
            ? "rgba(148, 163, 184, 0.3)"
            : "rgba(15, 23, 42, 0.15)",
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-400" size={20} />
      ) : (
        <Moon className="text-slate-700" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
