import React, { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.message.trim()) errors.message = "Please describe your project.";
  return errors;
};

const inputBase =
  "w-full rounded-xl border bg-slate-950/70 light:bg-slate-50 px-4 py-3 outline-none transition-colors duration-200";
const inputNormal = "border-slate-700 focus:border-blue-500";
const inputError = "border-red-500 focus:border-red-400";

const ContactSection = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || "Not provided",
          service: form.service,
          message: form.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm(initialForm);
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 scroll-mt-24"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left column — info */}
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

          {/* Right column — form */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 light:bg-white p-6 sm:p-8 shadow-2xl shadow-slate-950/30">
            {/* ── Success state ── */}
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                <CheckCircle2 size={52} className="text-green-400" />
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Message sent!
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Thanks for reaching out. We'll be in touch within one business
                  day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-blue-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <label className="block">
                    <span
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Name <span className="text-red-400">*</span>
                    </span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      type="text"
                      className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                      style={{ color: "var(--text-primary)" }}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Email <span className="text-red-400">*</span>
                    </span>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                      style={{ color: "var(--text-primary)" }}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {/* Company */}
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
                      className={`${inputBase} ${inputNormal}`}
                      style={{ color: "var(--text-primary)" }}
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                  </label>

                  {/* Service */}
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
                      className={`${inputBase} ${inputNormal}`}
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

                {/* Message */}
                <label className="block mt-4">
                  <span
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Project brief <span className="text-red-400">*</span>
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className={`${inputBase} ${errors.message ? inputError : inputNormal} resize-y`}
                    style={{ color: "var(--text-primary)" }}
                    placeholder="What are you trying to achieve? What systems are you using today? What outcome matters most?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </label>

                {/* Error banner */}
                {status === "error" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertCircle size={16} className="shrink-0" />
                    Something went wrong. Please try again or email us directly
                    at{" "}
                    <a
                      href="mailto:info@quonote.com"
                      className="underline ml-1"
                    >
                      info@quonote.com
                    </a>
                    .
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex justify-center items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-black dark:text-white hover:bg-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send enquiry"
                    )}
                  </button>
                  <a
                    href="mailto:info@quonote.com"
                    className="inline-flex justify-center items-center rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:border-blue-500 transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Email directly
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
