import React, { useState } from 'react';
import {
  Code,
  BarChart,
  Users,
  Zap,
  Monitor,
  ShoppingBag,
  Wrench,
  Globe,
  PenTool,
  TrendingUp,
  BrainCircuit,
  Settings,
  Layers,
  Briefcase,
} from "lucide-react";
import ServiceCard from './ServiceCard';

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("All");

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
  );
};

export default ServicesSection;

