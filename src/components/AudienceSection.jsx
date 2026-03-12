import React from "react";
import SectionHeader from "./SectionHeader";
import AudienceCard from "./AudienceCard";
import RevealOnScroll from "./RevealOnScroll";

const AudienceSection = () => {
  return (
    <section
      id="audiences"
      className="py-16 sm:py-24 bg-slate-900 scroll-mt-24"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <SectionHeader
          title="Tailored for Every Stage"
          subtitle="Different businesses need different systems. We tailor strategy, delivery, and support to your stage, pace, and operating reality."
          typewriterWords={[
            "Built for early-stage momentum.",
            "Built for scaling operations.",
            "Built for enterprise modernization.",
          ]}
        />

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Startups",
              desc: "Launch faster with MVP delivery, lean systems, and product foundations built for growth.",
              color: "blue",
              features: [
                "MVP Delivery",
                "Product Roadmapping",
                "Scalable Architecture",
                "Go-to-Market Systems",
              ],
            },
            {
              title: "Growing Businesses",
              desc: "Reduce operational drag, improve visibility, and build systems that support revenue growth.",
              color: "purple",
              features: [
                "Process Automation",
                "Sales Enablement",
                "Operational Dashboards",
                "Team Training",
              ],
            },
            {
              title: "Established Teams",
              desc: "Modernize legacy workflows, equip teams properly, and improve delivery across departments.",
              color: "emerald",
              features: [
                "System Modernization",
                "AI Workflow Integration",
                "Hardware Procurement",
                "Cross-Team Enablement",
              ],
            },
          ].map((audience, idx) => (
            <RevealOnScroll
              key={audience.title}
              delay={90 * idx}
              className="h-full"
            >
              <AudienceCard {...audience} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
