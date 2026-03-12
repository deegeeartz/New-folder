import React, { useEffect, useRef } from "react";
import Button from "./Button";
import { openConsultant } from "../utils/consultant";
import TypewriterText from "./TypewriterText";

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) {
      return;
    }

    const updateSpotlight = (event) => {
      const rect = section.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      section.style.setProperty("--cursor-x", `${x}%`);
      section.style.setProperty("--cursor-y", `${y}%`);
    };

    section.addEventListener("mousemove", updateSpotlight);
    return () => section.removeEventListener("mousemove", updateSpotlight);
  }, []);

  return (
    <header
      ref={heroRef}
      className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
    >
      <div className="hero-spotlight absolute inset-0 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-blue-900/30 via-indigo-900/10 to-transparent blur-3xl pointer-events-none float-slow"></div>
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-900/15 blur-3xl pointer-events-none float-slow"
        style={{ animationDelay: "0.6s" }}
      ></div>

      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide animate-fade-in-up">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Accepting New Clients for 2026
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-extrabold leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Digital systems that drive
            <span className="block mt-2">
              <TypewriterText
                words={[
                  "measurable business growth.",
                  "faster team operations.",
                  "smarter AI-powered workflows.",
                  "scalable digital execution.",
                ]}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400"
                typeSpeed={80}
                deleteSpeed={28}
                pauseMs={2200}
              />
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            AI strategy, custom development, process automation, and
            infrastructure solutions for scaling businesses. From startups to
            enterprise. We've delivered for organizations across Europe, Africa,
            and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              href="#services"
              className="px-7 py-3 text-base w-full sm:w-auto"
            >
              Explore Services
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                openConsultant(
                  "I want help choosing the right hardware and infrastructure setup for my business.",
                )
              }
              className="px-7 py-3 text-base w-full sm:w-auto"
            >
              View Hardware Store
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-300">
            <span className="glass-panel px-3 py-2 rounded-full border border-slate-700">
              AI Strategy
            </span>
            <span className="glass-panel px-3 py-2 rounded-full border border-slate-700">
              Custom Development
            </span>
            <span className="glass-panel px-3 py-2 rounded-full border border-slate-700">
              Trusted by Lanzcape (Belgium) & ASMB (Morocco)
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
