import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import QuonoteLogo from "./QuonoteLogo";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-lg border-b border-slate-800 dark:border-slate-800 light:border-slate-200 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 flex justify-between items-center">
        <QuonoteLogo />
        <div className="hidden md:flex space-x-8 xl:space-x-10 items-center text-sm font-medium">
          <a href="#services" className="hover:text-blue-400 transition-colors">
            Solutions
          </a>
          <a href="#audiences" className="hover:text-blue-400 transition-colors">
            Who We Serve
          </a>
          <a href="#hardware" className="hover:text-blue-400 transition-colors">
            Hardware Store
          </a>
          <ThemeToggle />
          <Button variant="primary" className="py-2 px-4 text-sm">
            Get Started
          </Button>
        </div>
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 dark:bg-slate-900/95 light:bg-white/95 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 py-6 px-6 flex flex-col space-y-4 shadow-xl backdrop-blur">
          <a
            href="#services"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-lg border-b border-slate-800"
          >
            Solutions
          </a>
          <a
            href="#audiences"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-lg border-b border-slate-800"
          >
            Who We Serve
          </a>
          <a
            href="#hardware"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-lg border-b border-slate-800"
          >
            Hardware Store
          </a>
          <Button variant="primary" className="w-full">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
