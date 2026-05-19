import React, { Suspense, lazy } from "react";
import HeroSection from "../components/HeroSection";
import StatsBar from "../components/StatsBar";
import ContactSection from "../components/ContactSection";
import SiteLayout from "../components/SiteLayout";
import RevealOnScroll from "../components/RevealOnScroll";

const AudienceSection = lazy(() => import("../components/AudienceSection"));
const ServicesSection = lazy(() => import("../components/ServicesSection"));
const HardwareSection = lazy(() => import("../components/HardwareSection"));
const FaqSection = lazy(() => import("../components/FaqSection"));
const CtaSection = lazy(() => import("../components/CtaSection"));

const SectionFallback = () => <div aria-hidden="true" className="min-h-[1px]" />;

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <RevealOnScroll delay={60}>
        <StatsBar />
      </RevealOnScroll>
      <Suspense fallback={<SectionFallback />}>
        <RevealOnScroll delay={80}>
          <AudienceSection />
        </RevealOnScroll>
        <RevealOnScroll delay={100}>
          <ServicesSection />
        </RevealOnScroll>
        <RevealOnScroll delay={120}>
          <HardwareSection />
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <FaqSection />
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <ContactSection />
        </RevealOnScroll>
        <RevealOnScroll delay={60}>
          <CtaSection />
        </RevealOnScroll>
      </Suspense>
    </SiteLayout>
  );
}
