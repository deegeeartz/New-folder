import React from "react";
import HeroSection from "../components/HeroSection";
import StatsBar from "../components/StatsBar";
import AudienceSection from "../components/AudienceSection";
import ServicesSection from "../components/ServicesSection";
import HardwareSection from "../components/HardwareSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";
import CtaSection from "../components/CtaSection";
import SiteLayout from "../components/SiteLayout";
import RevealOnScroll from "../components/RevealOnScroll";

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <RevealOnScroll delay={60}>
        <StatsBar />
      </RevealOnScroll>
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
    </SiteLayout>
  );
}
