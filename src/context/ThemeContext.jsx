import React, { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const theme = "dark";

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", "dark");

    try {
      localStorage.setItem("theme", "dark");
    } catch {
      // Ignore storage write errors (privacy mode/storage restrictions)
    }
  }, []);

  const toggleTheme = () => {
    return;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
