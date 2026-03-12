import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AiConsultantWidget from "./AiConsultantWidget";

const SiteLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <Navbar />
      {children}
      <Footer />
      <AiConsultantWidget />
    </div>
  );
};

export default SiteLayout;
