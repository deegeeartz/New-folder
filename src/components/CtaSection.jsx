import React from "react";
import { openConsultant } from "../utils/consultant";

const CtaSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-blue-600 relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Transform your business with technology that scales.
        </h2>
        <p className="text-blue-100 text-xl lg:text-2xl max-w-3xl mx-auto mb-10">
          Scale faster with AI, build custom software, automate operations, and
          infrastructure solutions. No lock-in contracts. Transparent pricing.
          Let's talk about your vision.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            type="button"
            onClick={() =>
              openConsultant(
                "I want to book a free consultation and discuss the best digital growth plan for my business."
              )
            }
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-xl hover:bg-gray-100 transition-transform transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Book Free Consultation
          </button>
          <a
            href="mailto:info@quonote.com?subject=Quonote%20Sales%20Enquiry"
            className="px-8 py-4 bg-blue-700 text-white font-bold rounded-lg border border-blue-500 hover:bg-blue-800 transition-transform transform hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            Contact Sales Team
          </a>
        </div>
        <p className="text-blue-100/90 text-sm max-w-2xl mx-auto mt-5">
          Use the AI consultant to share your goals, budget, and timeline. We'll turn that into a practical next-step conversation.
        </p>
        <p className="text-blue-100/80 text-sm max-w-2xl mx-auto mt-2">
          Prefer email? Reach us directly at <a href="mailto:info@quonote.com" className="font-semibold underline underline-offset-2">info@quonote.com</a>.
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
