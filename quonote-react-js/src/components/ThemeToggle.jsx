import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-slate-800/80 dark:bg-slate-800/80 light:bg-white/80 border border-slate-700 dark:border-slate-700 light:border-slate-300 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
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
