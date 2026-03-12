import React, { useMemo, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  company: "",
  service: "AI Consulting & Automation",
  message: "",
};

const serviceOptions = [
  "AI Consulting & Automation",
  "Custom Software Development",
  "Business Process Automation",
  "Hardware Procurement & Infrastructure",
  "General Enquiry",
];

const ContactSection = () => {
  const [form, setForm] = useState(initialForm);

  const mailtoHref = useMemo(() => {
    const subject = `Quonote enquiry: ${form.service}`;
    const body = [
      `Name: ${form.name || "Not provided"}`,
      `Email: ${form.email || "Not provided"}`,
      `Company: ${form.company || "Not provided"}`,
      `Service: ${form.service}`,
      "",
      form.message ||
        "Please tell us about your goals, timelines, and what you need help with.",
    ].join("\n");

    return `mailto:info@quonote.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 scroll-mt-24"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide mb-5">
              Contact Quonote
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Start the conversation with the right context.
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Tell us what you are building, where your bottlenecks are, and
              what kind of outcome you need. We will use that to shape a useful
              first conversation.
            </p>

            <div
              className="space-y-4 text-sm sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              <div>
                <span
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email:
                </span>{" "}
                <a
                  href="mailto:info@quonote.com"
                  className="text-blue-400 hover:underline"
                >
                  info@quonote.com
                </a>
              </div>
              <div>
                <span
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Best for:
                </span>{" "}
                discovery calls, project scoping, automation audits, software
                builds, and procurement enquiries.
              </div>
              <div>
                <span
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Tip:
                </span>{" "}
                include your timeline, team size, and what is currently slowing
                you down.
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 light:bg-white p-6 sm:p-8 shadow-2xl shadow-slate-950/30">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Name
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 light:bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
                  style={{ color: "var(--text-primary)" }}
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Email
                </span>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 light:bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
                  style={{ color: "var(--text-primary)" }}
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <label className="block">
                <span
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Company
                </span>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 light:bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
                  style={{ color: "var(--text-primary)" }}
                  placeholder="Company name"
                />
              </label>
              <label className="block">
                <span
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Service
                </span>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 light:bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
                  style={{ color: "var(--text-primary)" }}
                >
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block mt-4">
              <span
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Project brief
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 light:bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 resize-y"
                style={{ color: "var(--text-primary)" }}
                placeholder="What are you trying to achieve? What systems are you using today? What outcome matters most?"
              />
            </label>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href={mailtoHref}
                className="inline-flex justify-center items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Send enquiry
              </a>
              <a
                href="mailto:info@quonote.com"
                className="inline-flex justify-center items-center rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:border-blue-500 transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                Email directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
