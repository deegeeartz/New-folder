import React, { useState, useEffect } from "react";
import {
  Code,
  BarChart,
  Users,
  Zap,
  Monitor,
  Menu,
  X,
  Briefcase,
  ShoppingBag,
  Wrench,
  ShieldCheck,
  Globe,
  PenTool,
  TrendingUp,
  BrainCircuit,
  Settings,
  Layers,
} from "lucide-react";

import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import QuonoteLogo from "../components/QuonoteLogo";
import ServiceCard from "../components/ServiceCard";
import AudienceCard from "../components/AudienceCard";
import AiConsultantWidget from "../components/AiConsultantWidget";
import ThemeToggle from "../components/ThemeToggle";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "All",
    "Build",
    "Grow",
    "Automate",
    "Infrastructure",
    "Empower",
  ];

  const services = [
    // Build & Design
    {
      title: "Software Development",
      desc: "Custom web and mobile applications tailored to your business logic.",
      category: "Build",
      icon: Code,
    },
    {
      title: "E-commerce Development",
      desc: "Robust online stores designed for sales conversion and inventory management.",
      category: "Build",
      icon: ShoppingBag,
    },
    {
      title: "UX/UI Design",
      desc: "User-centric interfaces that make complex technology feel simple.",
      category: "Build",
      icon: PenTool,
    },
    {
      title: "Brand Development",
      desc: "Creating distinct digital identities that resonate with your market.",
      category: "Build",
      icon: Globe,
    },
    {
      title: "Graphic Design",
      desc: "Visual assets that communicate your value proposition instantly.",
      category: "Build",
      icon: Layers,
    },

    // Grow & Strategy
    {
      title: "Digital Strategy Consulting",
      desc: "Blueprints for digital transformation aligned with business goals.",
      category: "Grow",
      icon: Briefcase,
    },
    {
      title: "Digital Marketing",
      desc: "Data-driven campaigns to acquire customers and retain loyalty.",
      category: "Grow",
      icon: TrendingUp,
    },
    {
      title: "Technology Roadmapping",
      desc: "Long-term tech planning to ensure scalability and future-proofing.",
      category: "Grow",
      icon: Monitor,
    },
    {
      title: "IT Project Management",
      desc: "Agile delivery of tech projects on time and within budget.",
      category: "Grow",
      icon: Settings,
    },

    // Automate & Intelligence
    {
      title: "AI Automations",
      desc: "Chatbots and workflows that reduce manual labor by up to 70%.",
      category: "Automate",
      icon: BrainCircuit,
    },
    {
      title: "Process Automation",
      desc: "Streamlining operations to eliminate bottlenecks and errors.",
      category: "Automate",
      icon: Zap,
    },
    {
      title: "Data Analytics",
      desc: "Turning raw data into actionable insights and visualizations.",
      category: "Automate",
      icon: BarChart,
    },

    // Infrastructure (New)
    {
      title: "Device Sales & Procurement",
      desc: "High-performance laptops and devices for your workforce.",
      category: "Infrastructure",
      icon: Monitor,
    },
    {
      title: "After-Sales Support",
      desc: "Maintenance, warranty handling, and technical support for your hardware.",
      category: "Infrastructure",
      icon: Wrench,
    },
    {
      title: "Digital Literacy Training",
      desc: "Upskilling teams to use modern tools effectively.",
      category: "Empower",
      icon: Users,
    },
    {
      title: "Remote Team Management",
      desc: "Systems and culture building for distributed workforces.",
      category: "Empower",
      icon: Globe,
    },
  ];

  const filteredServices =
    activeTab === "All"
      ? services
      : services.filter((s) => s.category === activeTab);

  return (
    <div
      className="min-h-screen font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-lg border-b border-slate-800 dark:border-slate-800 light:border-slate-200 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 flex justify-between items-center">
          <QuonoteLogo />
          <div className="hidden md:flex space-x-8 xl:space-x-10 items-center text-sm font-medium">
            <a
              href="#services"
              className="hover:text-blue-400 transition-colors"
            >
              Solutions
            </a>
            <a
              href="#audiences"
              className="hover:text-blue-400 transition-colors"
            >
              Who We Serve
            </a>
            <a
              href="#hardware"
              className="hover:text-blue-400 transition-colors"
            >
              Hardware Store
            </a>
            <ThemeToggle />
            <Button variant="primary" className="py-2 px-4 text-sm">
              Get Started
            </Button>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 dark:bg-slate-900/95 light:bg-white/95 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 py-6 px-6 flex flex-col space-y-4 shadow-xl backdrop-blur">
            <a
              href="#services"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-lg border-b border-slate-800"
            >
              Solutions
            </a>
            <a
              href="#audiences"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-lg border-b border-slate-800"
            >
              Who We Serve
            </a>
            <a
              href="#hardware"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-lg border-b border-slate-800"
            >
              Hardware Store
            </a>
            <Button variant="primary" className="w-full">
              Get Started
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-blue-900/30 via-indigo-900/10 to-transparent blur-3xl pointer-events-none float-slow"></div>
        <div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-900/15 blur-3xl pointer-events-none float-slow"
          style={{ animationDelay: "0.6s" }}
        ></div>

        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide animate-fade-in-up">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Accepting New Clients for 2025
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight">
              We build the tech that
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 mt-2">
                builds your business.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              From AI consulting for startups to digital literacy and hardware
              procurement for the informal sector. We are your end-to-end
              digital partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                className="px-7 py-3 text-base w-full sm:w-auto"
              >
                Explore Services
              </Button>
              <Button
                variant="secondary"
                className="px-7 py-3 text-base w-full sm:w-auto"
              >
                View Hardware Store
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-300">
              <span className="glass-panel px-3 py-2 rounded-full border border-slate-700">
                AI Strategy
              </span>
              <span className="glass-panel px-3 py-2 rounded-full border border-slate-700">
                Process Automation
              </span>
              <span className="glass-panel px-3 py-2 rounded-full border border-slate-700">
                Hardware & Support
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats/Trust Bar */}
      <div className="border-y border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/60 backdrop-blur">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 xl:gap-8">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "15", label: "Services Offered" },
              { value: "24/7", label: "Support Active" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-slate-800/80 p-5 text-center shadow-lg shadow-slate-900/40 floating-card reveal-up"
                style={{ animationDelay: `${60 * idx}ms` }}
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience Section */}
      <section
        id="audiences"
        className="py-16 sm:py-24 bg-slate-900 scroll-mt-24"
      >
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <SectionHeader
            title="Tailored for Every Stage"
            subtitle="Technology isn't one-size-fits-all. We have specific playbooks for where you are right now."
          />

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Startups",
                desc: "Rapid MVP development and scalable architecture for high-growth ventures.",
                color: "blue",
                features: [
                  "Custom Software Dev",
                  "Pitch Deck Design",
                  "Tech Roadmapping",
                  "User Acquisition Strategy",
                ],
              },
              {
                title: "SMEs & MSMEs",
                desc: "Process optimization to cut costs and increase profit margins.",
                color: "purple",
                features: [
                  "Inventory Automation",
                  "E-commerce Sales",
                  "Staff Digital Training",
                  "Hardware Procurement",
                ],
              },
              {
                title: "Informal Sector",
                desc: "Simple, effective tools to digitize your trade and expand reach.",
                color: "emerald",
                features: [
                  "WhatsApp Business Setup",
                  "Basic Digital Literacy",
                  "Smartphone/Laptop Sales",
                  "Social Media Basics",
                ],
              },
            ].map((audience, idx) => (
              <div
                key={audience.title}
                className="reveal-up"
                style={{ animationDelay: `${90 * idx}ms` }}
              >
                <AudienceCard {...audience} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (Tabbed) */}
      <section
        id="services"
        className="py-16 sm:py-24 bg-slate-800/30 dark:bg-slate-800/30 light:bg-blue-50/30 relative overflow-hidden scroll-mt-24"
      >
        <div className="absolute -left-40 top-10 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="absolute -right-32 bottom-0 w-72 h-72 bg-gradient-to-br from-purple-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none"></div>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Our Expertise
              </h2>
              <p className="text-slate-400 max-w-xl">
                Comprehensive digital solutions. Filter by category to find
                exactly what you need.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="mt-8 md:mt-0 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 xl:gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                className="floating-card rounded-2xl border border-slate-800/70 bg-slate-900/60 reveal-up"
                style={{ animationDelay: `${80 * index}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware & Support Showcase */}
      <section
        id="hardware"
        className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 to-blue-900/20 dark:from-slate-900 dark:to-blue-900/20 light:from-blue-50 light:to-cyan-50 relative overflow-hidden scroll-mt-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.08),transparent_35%)] opacity-60 pointer-events-none"></div>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase mb-6 tracking-wide">
                New Division
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Hardware & Infrastructure <br />
                <span className="text-blue-500">Done Right.</span>
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                We don't just sell you a box. We equip your business. From
                enterprise-grade laptops for your dev team to rugged devices for
                field work.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-lg mr-4 border border-slate-700">
                    <Monitor className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      Premium Device Sales
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Authorized dealers for Dell, HP, Apple, and Lenovo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-lg mr-4 border border-slate-700">
                    <ShieldCheck className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      Lifetime Support Guarantee
                    </h4>
                    <p className="text-slate-400 text-sm">
                      We provide installation, software setup, and ongoing
                      maintenance.
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="white">Visit Hardware Store</Button>
            </div>

            {/* Visual Representation */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
              <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl floating-card">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    Featured Equipment
                  </h3>
                  <span className="text-blue-400 text-sm cursor-pointer">
                    View All
                  </span>
                </div>

                {/* Mock Products */}
                <div className="space-y-4">
                  {[
                    {
                      name: "MacBook Pro M3",
                      type: "High-Performance",
                      price: "Request Quote",
                    },
                    {
                      name: "Dell Latitude 7000",
                      type: "Business Class",
                      price: "Request Quote",
                    },
                    {
                      name: "Logitech MX Keys Combo",
                      type: "Peripherals",
                      price: "In Stock",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer border border-transparent hover:border-blue-500/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-700 rounded flex items-center justify-center">
                          <Monitor size={20} className="text-slate-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-blue-400">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                  <p className="text-sm text-slate-400 italic">
                    Need to equip a full office?
                  </p>
                  <button className="text-white font-semibold text-sm hover:underline mt-1">
                    Get a bulk procurement quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-blue-600 relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Digitalize?
          </h2>
          <p className="text-blue-100 text-xl lg:text-2xl max-w-3xl mx-auto mb-10">
            Whether you need a complex AI algorithm, a new website, or just 10
            laptops for your new office. We are ready.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-xl hover:bg-gray-100 transition-transform transform hover:-translate-y-1 w-full sm:w-auto">
              Book Free Consultation
            </button>
            <button className="px-8 py-4 bg-blue-700 text-white font-bold rounded-lg border border-blue-500 hover:bg-blue-800 transition-transform transform hover:-translate-y-1 w-full sm:w-auto">
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 dark:bg-slate-950 light:bg-white border-t border-slate-900 dark:border-slate-900 light:border-slate-200 pt-16 pb-8">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <div className="grid md:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 mb-12">
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              {/* BRAND LOGO INSERTED HERE */}
              <div className="mb-6">
                <QuonoteLogo />
              </div>

              <p className="text-slate-500 max-w-sm mb-6">
                A subsidiary of <strong>Quonote Enterprise</strong>. Bridging
                the gap between the informal sector and high-tech innovation.
                Your partner in digital transformation.
              </p>
              <div className="flex gap-4 lg:gap-5">
                {/* Social Placeholders */}
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                  >
                    <Globe size={20} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-base md:text-lg mb-6">
                Solutions
              </h4>
              <ul className="space-y-3 lg:space-y-4 text-slate-500 text-sm lg:text-base">
                <li className="hover:text-blue-400 cursor-pointer">
                  Digital Strategy
                </li>
                <li className="hover:text-blue-400 cursor-pointer">
                  Software Development
                </li>
                <li className="hover:text-blue-400 cursor-pointer">
                  Data Analytics
                </li>
                <li className="hover:text-blue-400 cursor-pointer">
                  Hardware Sales
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-base md:text-lg mb-6">
                Company
              </h4>
              <ul className="space-y-3 lg:space-y-4 text-slate-500 text-sm lg:text-base">
                <li className="hover:text-blue-400 cursor-pointer">About Us</li>
                <li className="hover:text-blue-400 cursor-pointer">
                  For Startups
                </li>
                <li className="hover:text-blue-400 cursor-pointer">
                  For MSMEs
                </li>
                <li className="hover:text-blue-400 cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 lg:pt-10 text-center text-slate-600 text-sm lg:text-base">
            &copy; 2025 Quonote Digital. All rights reserved.
          </div>
        </div>
      </footer>

      {/* AI Assistant Widget */}
      <AiConsultantWidget />
    </div>
  );
}
