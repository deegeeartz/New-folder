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

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <StatsBar />
      <AudienceSection />
      <ServicesSection />
      <HardwareSection />
      <FaqSection />
      <ContactSection />
      <CtaSection />
    </SiteLayout>
  );
}
