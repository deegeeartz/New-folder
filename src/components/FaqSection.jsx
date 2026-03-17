import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What types of businesses does Quonote work with?",
    answer:
      "We work with startups, SMEs, established companies, and owner-led businesses across Europe, Africa, and globally. Whether you need to launch a digital product, automate operations, or equip a team — we match the engagement to your stage and budget.",
  },
  {
    question: "How does a typical project engagement work?",
    answer:
      "We start with a scoping call to understand your goals, constraints, and existing systems. From there we propose a phased plan with clear deliverables, timelines, and ownership. Most projects begin within one to two weeks of the scoping call.",
  },
  {
    question: "How do you help companies with AI and automation?",
    answer:
      "We audit your existing workflows to identify manual bottlenecks — repetitive data entry, approval delays, customer support queues, reporting gaps. We then build targeted AI assistants and automation flows using tools like n8n, Zapier, and custom integrations, saving hours per week across your team.",
  },
  {
    question: "What does a custom software build include?",
    answer:
      "Our software projects cover discovery, architecture, design (UX/UI), development, QA, and handover. We build web apps, internal tools, client portals, and mobile apps. You own the source code. We can also provide ongoing maintenance after launch.",
  },
  {
    question: "Can Quonote handle both software and hardware needs?",
    answer:
      "Yes. We combine strategy, software delivery, process automation, and device procurement so businesses can launch, equip teams, and scale operations through one delivery partner — without juggling multiple vendors.",
  },
  {
    question: "Do you work with clients outside Africa and Europe?",
    answer:
      "Yes. We are remote-first and work with clients globally. Our current client base includes companies in Belgium, Morocco, and beyond. All project communication, delivery, and support are handled remotely.",
  },
  {
    question: "How long does it typically take to see results?",
    answer:
      "Automation and AI projects typically show measurable time savings within the first 30 days. Software builds depend on scope — a focused MVP takes 6–10 weeks. We structure all engagements around the fastest path to value, not unnecessary scope creep.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We work on a project basis, with pricing scoped after a discovery call. There are no retainer lock-ins unless you choose ongoing support. We are transparent about costs before any work begins — book a consultation and we will give you a clear picture.",
  },
  {
    question: "What happens during the first consultation?",
    answer:
      "We review your goals, current systems, team size, constraints, and timeline. You leave with a clear recommended approach and the next step. There is no sales pressure — it is a working session, not a pitch.",
  },
  {
    question: "How do I get started?",
    answer:
      "Fill in the contact form below or email info@quonote.com directly. Include your business context, what you are trying to solve, and your rough timeline. We respond within one business day.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faqs"
      className="py-16 sm:py-24 bg-slate-900/70 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently asked questions
          </h2>
          <p
            className="text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Clear answers about strategy, software delivery, automation, and
            infrastructure support.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className="font-semibold text-base sm:text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: "var(--text-secondary)" }}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-6 pb-5 text-sm sm:text-base leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
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
