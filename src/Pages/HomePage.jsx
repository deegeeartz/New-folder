import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsBar from "../components/StatsBar";
import AudienceSection from "../components/AudienceSection";
import ServicesSection from "../components/ServicesSection";
import HardwareSection from "../components/HardwareSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import AiConsultantWidget from "../components/AiConsultantWidget";

export default function HomePage() {
  return (
    <div
      className="min-h-screen font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <Navbar />
      <HeroSection />
      <StatsBar />
      <AudienceSection />
      <ServicesSection />
      <HardwareSection />
      <CtaSection />
      <Footer />
      <AiConsultantWidget />
    </div>
  );
}
