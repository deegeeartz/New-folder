import React, { useEffect, useMemo, useState } from 'react';
import RevealOnScroll from './RevealOnScroll';
import useInView from '../Hooks/useInView';
import useReducedMotion from '../Hooks/useReducedMotion';

const StatsBar = () => {
  const stats = useMemo(
    () => [
      { target: 50, suffix: '+', label: 'Projects Delivered' },
      { target: 15, suffix: '', label: 'Services Offered' },
      { target: 24, suffix: '/7', label: 'Support Active' },
      { target: 100, suffix: '%', label: 'Client Satisfaction' },
    ],
    [],
  );
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ threshold: 0.35, once: true });
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!inView && !prefersReducedMotion) {
      return;
    }

    if (prefersReducedMotion) {
      setCounts(stats.map((stat) => stat.target));
      return;
    }

    const duration = 1300;
    const startTime = performance.now();
    let animationFrame;

    const update = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(stats.map((stat) => Math.round(stat.target * eased)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, prefersReducedMotion, stats]);

  return (
    <div ref={ref} className="border-y border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/60 backdrop-blur">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 xl:gap-8">
            {stats.map((stat, idx) => (
              <RevealOnScroll
                key={idx}
                className="glass-panel rounded-2xl border border-slate-800/80 p-5 text-center shadow-lg shadow-slate-900/40 floating-card reveal-up"
                delay={60 * idx}
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {counts[idx]}{stat.suffix}
                </div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
  );
};

export default StatsBar;
