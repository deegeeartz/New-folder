import React from "react";
import TypewriterText from "./TypewriterText";

const SectionHeader = ({
  title,
  subtitle,
  centered = true,
  typewriterWords = [],
}) => (
  <div className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
      {title}
    </h2>
    <div
      className={`h-1 w-24 bg-blue-500 rounded-full mb-6 ${centered ? "mx-auto" : ""}`}
    ></div>
    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
      {subtitle}
    </p>
    {typewriterWords.length > 0 && (
      <div className="mt-4 text-blue-300 text-sm font-medium">
        <TypewriterText words={typewriterWords} />
      </div>
    )}
  </div>
);

export default SectionHeader;
