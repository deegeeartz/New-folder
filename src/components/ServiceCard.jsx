import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({
  icon,
  title,
  description,
  desc,
  category,
  href,
  isBento = false,
}) => {
  const IconComponent = icon;

  return (
    <div
      className={`relative p-5 lg:p-6 xl:p-8 h-full flex flex-col ${isBento ? "" : "group floating-card bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20"}`}
    >
      {!isBento && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}

      <div
        className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 relative z-10 ${isBento ? "bg-slate-800/50 group-hover:bg-blue-600 group-hover:scale-110 group-hover:rotate-3" : "bg-slate-800 group-hover:bg-blue-600"}`}
      >
        {IconComponent && (
          <IconComponent
            className={`text-blue-400 group-hover:text-white transition-colors duration-300 light-mode-icon`}
            size={isBento ? 28 : 24}
          />
        )}
      </div>

      <div className="mb-2 text-[10px] lg:text-[11px] font-bold tracking-[0.2em] text-blue-400/80 uppercase relative z-10">
        {category}
      </div>

      <h3
        className={`font-bold text-white mb-2 lg:mb-3 group-hover:text-white transition-colors relative z-10 ${isBento ? "text-lg lg:text-xl xl:text-2xl" : "text-xl"}`}
      >
        {title}
      </h3>

      <p
        className={`text-slate-400 leading-relaxed flex-grow relative z-10 ${isBento ? "text-sm" : "text-sm"}`}
      >
        {description || desc}
      </p>

      {href && (
        <div className="relative z-10 mt-4 lg:mt-5">
          <Link
            to={href}
            className="inline-flex items-center text-xs lg:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-all group/link"
          >
            <span>Learn more</span>
            <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
