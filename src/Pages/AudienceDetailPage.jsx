import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import ContactSection from "../components/ContactSection";
import RevealOnScroll from "../components/RevealOnScroll";
import { audienceDetails } from "../data/audienceDetails";

const AudienceDetailPage = () => {
  const { slug } = useParams();
  const audience = audienceDetails[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    if (!audience) {
      return;
    }

    const previousTitle = document.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content");

    document.title = `${audience.name} | Quonote`;
    if (descriptionTag) {
      descriptionTag.setAttribute("content", audience.shortDescription);
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription) {
        descriptionTag.setAttribute("content", previousDescription);
      }
    };
  }, [audience]);

  if (!audience) {
    return <Navigate to="/" replace />;
  }

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
                Audience Guide
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                {audience.heroTitle}
              </h1>
              <p
                className="text-lg sm:text-xl max-w-3xl leading-relaxed mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {audience.heroDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="btn-micro rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 transition-colors"
                >
                  Discuss your stage
                </a>
                <a
                  href={`mailto:info@quonote.com?subject=${encodeURIComponent(`${audience.name} consultation`)}`}
                  className="btn-micro rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:border-blue-500 transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email Quonote
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-slate-900/50">
          <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 grid lg:grid-cols-3 gap-8">
            <RevealOnScroll
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 floating-card"
              delay={80}
            >
              <h2
                className="text-2xl md:text-3xl font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                How to know this is you
              </h2>
              <ul className="space-y-4">
                {audience.howToKnow.map((item) => (
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

            <RevealOnScroll
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 floating-card"
              delay={120}
            >
              <h2
                className="text-2xl md:text-3xl font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                How this applies to you
              </h2>
              <ul className="space-y-4">
                {audience.howItApplies.map((item) => (
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
            </RevealOnScroll>

            <RevealOnScroll
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 floating-card"
              delay={160}
            >
              <h2
                className="text-2xl md:text-3xl font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                How to engage us
              </h2>
              <ul className="space-y-4">
                {audience.engagementOptions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>

        <ContactSection />
      </main>
    </SiteLayout>
  );
};

export default AudienceDetailPage;
