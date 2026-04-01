import React from "react";
import { openConsultant } from "../utils/consultant";
import TypewriterText from "./TypewriterText";

const CtaSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-blue-600 relative overflow-hidden scroll-mt-24">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(30deg, rgba(255,255,255,0.08) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.08) 87.5%, rgba(255,255,255,0.08)), linear-gradient(150deg, rgba(255,255,255,0.08) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.08) 87.5%, rgba(255,255,255,0.08)), linear-gradient(30deg, rgba(255,255,255,0.08) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.08) 87.5%, rgba(255,255,255,0.08)), linear-gradient(150deg, rgba(255,255,255,0.08) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.08) 87.5%, rgba(255,255,255,0.08)), linear-gradient(60deg, rgba(255,255,255,0.05) 25%, transparent 25.5%, transparent 75%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05)), linear-gradient(60deg, rgba(255,255,255,0.05) 25%, transparent 25.5%, transparent 75%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05))",
          backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px",
          backgroundSize: "80px 140px",
        }}
      ></div>
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
          Transform your business with technology that scales.
        </h2>
        <p className="text-blue-200 text-sm sm:text-base font-medium mb-5">
          <TypewriterText
            words={[
              "From idea to execution — with clear milestones.",
              "From bottlenecks to automation — with measurable ROI.",
              "From fragmented tools to one connected system.",
            ]}
          />
        </p>
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
                "I want to book a free consultation and discuss the best digital growth plan for my business.",
              )
            }
            className="btn-micro px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-xl hover:bg-gray-100 transition-transform transform hover:-translate-y-1 active:scale-[0.98] w-full sm:w-auto"
          >
            Book Free Consultation
          </button>
          <a
            href="mailto:info@quonote.com?subject=Quonote%20Sales%20Enquiry"
            className="btn-micro px-8 py-4 bg-blue-700 text-black dark:text-white font-bold rounded-lg border border-blue-500 hover:bg-blue-800 transition-transform transform hover:-translate-y-1 active:scale-[0.98] w-full sm:w-auto text-center"
          >
            Contact Sales Team
          </a>
        </div>
        <p className="text-blue-100/90 text-sm max-w-2xl mx-auto mt-5">
          Use the AI consultant to share your goals, budget, and timeline. We'll
          turn that into a practical next-step conversation.
        </p>
        <p className="text-blue-100/80 text-sm max-w-2xl mx-auto mt-2">
          Prefer email? Reach us directly at{" "}
          <a
            href="mailto:info@quonote.com"
            className="font-semibold underline underline-offset-2"
          >
            info@quonote.com
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
