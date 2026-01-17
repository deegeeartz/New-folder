import React from 'react';
import Button from './Button';

const HeroSection = () => {
  return (
    <header className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-blue-900/30 via-indigo-900/10 to-transparent blur-3xl pointer-events-none float-slow"></div>
        <div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-900/15 blur-3xl pointer-events-none float-slow"
          style={{ animationDelay: "0.6s" }}
        ></div>

        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide animate-fade-in-up">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Accepting New Clients for 2025
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight">
              We build the tech that
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 mt-2">
                builds your business.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              From AI consulting for startups to digital literacy and hardware
              procurement for the informal sector. We are your end-to-end
              digital partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                className="px-7 py-3 text-base w-full sm:w-auto"
              >
                Explore Services
              </Button>
              <Button
                variant="secondary"
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
                Process Automation
              </span>
              <span className="glass-panel px-3 py-2 rounded-full border border-slate-700">
                Hardware & Support
              </span>
            </div>
          </div>
        </div>
      </header>
  );
};

export default HeroSection;
