import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What types of businesses does Quonote work with?",
    answer:
      "We support startups, SMEs, established companies, and owner-led businesses that need practical systems for growth, operations, sales, and customer experience.",
  },
  {
    question: "How do you help companies with AI and automation?",
    answer:
      "We identify repetitive workflows, customer support bottlenecks, reporting gaps, and manual approvals, then implement AI assistants and automation flows that save time and improve consistency.",
  },
  {
    question: "Can Quonote handle both software and hardware needs?",
    answer:
      "Yes. We combine strategy, software delivery, process automation, and device procurement so businesses can launch, equip teams, and scale operations through one delivery partner.",
  },
  {
    question: "What happens during the first consultation?",
    answer:
      "We review your goals, current systems, constraints, and timelines, then recommend a phased approach with the fastest path to measurable business value.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faqs"
      className="py-16 sm:py-24 bg-slate-900/70 dark:bg-slate-900/70 light:bg-slate-50 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Frequently asked questions
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Clear answers about strategy, software delivery, automation, and infrastructure support.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 light:bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-base sm:text-lg" style={{ color: "var(--text-primary)" }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: "var(--text-secondary)" }}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;