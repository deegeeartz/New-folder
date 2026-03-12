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
import { featuredServiceLinks } from '../data/serviceDetails';

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
      desc: "Build custom web and mobile products that streamline operations and unlock new revenue channels.",
      category: "Build",
      icon: Code,
    },
    {
      title: "E-commerce Development",
      desc: "Launch conversion-focused online stores with smoother buying journeys and stronger inventory control.",
      category: "Build",
      icon: ShoppingBag,
    },
    {
      title: "UX/UI Design",
      desc: "Turn complex workflows into clear user experiences that boost adoption and reduce friction.",
      category: "Build",
      icon: PenTool,
    },
    {
      title: "Brand Development",
      desc: "Clarify your market position with a brand system that builds trust and differentiates your business.",
      category: "Build",
      icon: Globe,
    },
    {
      title: "Graphic Design",
      desc: "Create sales-ready visuals that communicate your value quickly across web, pitch, and campaign assets.",
      category: "Build",
      icon: Layers,
    },

    // Grow & Strategy
    {
      title: "Digital Strategy Consulting",
      desc: "Prioritize the right digital moves with strategy tied to growth targets, efficiency, and ROI.",
      category: "Grow",
      icon: Briefcase,
    },
    {
      title: "Digital Marketing",
      desc: "Generate qualified demand with data-led campaigns that improve acquisition and retention performance.",
      category: "Grow",
      icon: TrendingUp,
    },
    {
      title: "Technology Roadmapping",
      desc: "Map the next 12-24 months of technology decisions so your systems scale without costly rework.",
      category: "Grow",
      icon: Monitor,
    },
    {
      title: "IT Project Management",
      desc: "Keep delivery on track with stronger execution, clearer ownership, and fewer project bottlenecks.",
      category: "Grow",
      icon: Settings,
    },

    // Automate & Intelligence
    {
      title: "AI Automations",
      desc: "Cut repetitive work with AI assistants and workflows that improve speed, consistency, and response time.",
      category: "Automate",
      icon: BrainCircuit,
    },
    {
      title: "Process Automation",
      desc: "Eliminate bottlenecks, handoff delays, and manual errors across your core business processes.",
      category: "Automate",
      icon: Zap,
    },
    {
      title: "Data Analytics",
      desc: "Turn scattered data into decision-ready dashboards, reporting, and performance insight.",
      category: "Automate",
      icon: BarChart,
    },

    // Infrastructure (New)
    {
      title: "Device Sales & Procurement",
      desc: "Equip your team with the right devices faster, with procurement guidance matched to your workflow and budget.",
      category: "Infrastructure",
      icon: Monitor,
    },
    {
      title: "After-Sales Support",
      desc: "Reduce downtime with setup, maintenance, warranty coordination, and ongoing device support.",
      category: "Infrastructure",
      icon: Wrench,
    },
    {
      title: "Digital Literacy Training",
      desc: "Help teams adopt new tools confidently so technology investments actually get used.",
      category: "Empower",
      icon: Users,
    },
    {
      title: "Remote Team Management",
      desc: "Build healthier remote operations with better coordination, visibility, and team accountability.",
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
                Outcome-focused services across strategy, software, automation,
                and infrastructure. Filter by category to find the support that
                fits your next growth move.
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
                <ServiceCard {...service} href={featuredServiceLinks[service.title]} />
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default ServicesSection;

