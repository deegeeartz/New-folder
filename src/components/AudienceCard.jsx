import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const AudienceCard = ({ title, desc, features, color }) => {
  const colorBgMap = {
    blue: "from-blue-500/15 via-blue-400/10 to-cyan-400/5",
    purple: "from-purple-500/15 via-indigo-400/10 to-blue-400/5",
    emerald: "from-emerald-500/15 via-teal-400/10 to-blue-400/5",
  };
  const accentBg = colorBgMap[color] || colorBgMap.blue;

  return (
    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 border border-slate-800 overflow-hidden floating-card">
      <div
        className={`absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br ${accentBg} rounded-full blur-3xl opacity-80`}
      ></div>
      <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none"></div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-6 sm:h-12">{desc}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feat, idx) => (
          <li key={idx} className="flex items-start text-sm text-slate-300">
            <CheckCircle
              className="text-blue-500 mr-2 flex-shrink-0"
              size={16}
            />
            {feat}
          </li>
        ))}
      </ul>
      <button className="text-blue-300 font-semibold flex items-center hover:text-cyan-200 transition-colors">
        Learn More <ArrowRight size={16} className="ml-2" />
      </button>
    </div>
  );
};

export default AudienceCard;
