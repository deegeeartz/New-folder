import React from "react";

const ServiceCard = ({ icon: Icon, title, description, desc, category }) => (
  <div className="group relative p-6 lg:p-7 xl:p-8 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 h-full flex flex-col overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300 relative z-10">
      <Icon className="text-blue-400 group-hover:text-white" size={24} />
    </div>
    <div className="mb-2 text-[11px] font-bold tracking-[0.2em] text-blue-400 uppercase relative z-10">
      {category}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors relative z-10">
      {title}
    </h3>
    <p className="text-slate-400 text-sm leading-relaxed flex-grow relative z-10">
      {description || desc}
    </p>
  </div>
);

export default ServiceCard;
