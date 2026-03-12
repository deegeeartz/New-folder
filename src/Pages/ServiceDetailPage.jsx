import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import ContactSection from "../components/ContactSection";
import { featuredServiceDetails } from "../data/serviceDetails";
import RevealOnScroll from "../components/RevealOnScroll";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = featuredServiceDetails[slug];

  if (!service) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content");

    document.title = `${service.name} | Quonote`;
    if (descriptionTag) {
      descriptionTag.setAttribute("content", service.shortDescription);
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription) {
        descriptionTag.setAttribute("content", previousDescription);
      }
    };
  }, [service]);

  return (
    <SiteLayout>
      <main>
        <section className="pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-blue-900/30 via-indigo-900/10 to-transparent blur-3xl pointer-events-none"></div>
          <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-blue-400 hover:underline mb-6"
            >
              ← Back to home
            </Link>
            <RevealOnScroll className="max-w-4xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide mb-5">
                Featured Service
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                {service.heroTitle}
              </h1>
              <p
                className="text-lg sm:text-xl max-w-3xl leading-relaxed mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {service.heroDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="btn-micro rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 transition-colors"
                >
                  Discuss this service
                </a>
                <a
                  href={`mailto:info@quonote.com?subject=${encodeURIComponent(`${service.name} enquiry`)}`}
                  className="btn-micro rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:border-blue-500 transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email Quonote
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-slate-900/50 dark:bg-slate-900/50 light:bg-slate-50">
          <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 grid lg:grid-cols-2 gap-10">
            <RevealOnScroll className="rounded-3xl border border-slate-800 bg-slate-900/70 light:bg-white p-8 floating-card" delay={80}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                Outcomes you should expect
              </h2>
              <ul className="space-y-4">
                {service.outcomes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            <RevealOnScroll className="rounded-3xl border border-slate-800 bg-slate-900/70 light:bg-white p-8 floating-card" delay={140}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                Typical delivery scope
              </h2>
              <ul className="space-y-4">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p
                className="mt-8 text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Ideal for:
                </span>{" "}
                {service.idealFor}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <ContactSection />
      </main>
    </SiteLayout>
  );
};

export default ServiceDetailPage;
