import React from 'react';
import SectionHeader from './SectionHeader';
import AudienceCard from './AudienceCard';

const AudienceSection = () => {
  return (
    <section
        id="audiences"
        className="py-16 sm:py-24 bg-slate-900 scroll-mt-24"
      >
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <SectionHeader
            title="Tailored for Every Stage"
            subtitle="Technology isn't one-size-fits-all. We have specific playbooks for where you are right now."
          />

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Startups",
                desc: "Rapid MVP development and scalable architecture for high-growth ventures.",
                color: "blue",
                features: [
                  "Custom Software Dev",
                  "Pitch Deck Design",
                  "Tech Roadmapping",
                  "User Acquisition Strategy",
                ],
              },
              {
                title: "SMEs & MSMEs",
                desc: "Process optimization to cut costs and increase profit margins.",
                color: "purple",
                features: [
                  "Inventory Automation",
                  "E-commerce Sales",
                  "Staff Digital Training",
                  "Hardware Procurement",
                ],
              },
              {
                title: "Informal Sector",
                desc: "Simple, effective tools to digitize your trade and expand reach.",
                color: "emerald",
                features: [
                  "WhatsApp Business Setup",
                  "Basic Digital Literacy",
                  "Smartphone/Laptop Sales",
                  "Social Media Basics",
                ],
              },
            ].map((audience, idx) => (
              <div
                key={audience.title}
                className="reveal-up"
                style={{ animationDelay: `${90 * idx}ms` }}
              >
                <AudienceCard {...audience} />
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default AudienceSection;
