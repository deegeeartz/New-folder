import React from 'react';

const StatsBar = () => {
  return (
    <div className="border-y border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/60 backdrop-blur">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 xl:gap-8">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "15", label: "Services Offered" },
              { value: "24/7", label: "Support Active" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-slate-800/80 p-5 text-center shadow-lg shadow-slate-900/40 floating-card reveal-up"
                style={{ animationDelay: `${60 * idx}ms` }}
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default StatsBar;
