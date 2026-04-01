import React from "react";
import {
  MessageSquareText,
  Briefcase,
  MonitorSmartphone,
  ArrowRight,
} from "lucide-react";
import QuonoteLogo from "./QuonoteLogo";
import { openConsultant } from "../utils/consultant";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-8">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="grid md:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <QuonoteLogo className="h-10 w-auto md:h-11" lazy />
            </div>

            <p className="text-black dark:text-white max-w-sm mb-6">
              A subsidiary of <strong>Quonote Enterprise</strong>. We design AI,
              software, automation, and infrastructure systems for ambitious
              teams across growth-stage and established businesses.
            </p>
            <div className="flex flex-wrap gap-3 text-black dark:text-white">
              <button
                type="button"
                onClick={() =>
                  openConsultant(
                    "I want strategic advice for my business growth plan.",
                  )
                }
                aria-label="Open strategy chat"
                className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 px-4 py-2 text-sm text-black dark:text-white hover:bg-blue-600 hover:text-black dark:hover:text-white border border-slate-200 dark:border-slate-900 transition-colors"
              >
                <MessageSquareText size={16} />
                Strategy Chat
              </button>
              <a
                href="/#services"
                aria-label="View services"
                className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 px-4 py-2 text-sm text-black dark:text-white hover:bg-blue-600 hover:text-black dark:hover:text-white border border-slate-200 dark:border-slate-900 transition-colors"
              >
                <Briefcase size={16} />
                Services
              </a>
              <a
                href="/#hardware"
                aria-label="View hardware section"
                className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 px-4 py-2 text-sm text-black dark:text-white hover:bg-blue-600 hover:text-black dark:hover:text-white border border-slate-200 dark:border-slate-900 transition-colors"
              >
                <MonitorSmartphone size={16} />
                Hardware
              </a>
              <a
                href="mailto:info@quonote.com"
                aria-label="Email info@quonote.com"
                className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 px-4 py-2 text-sm text-black dark:text-white hover:bg-blue-600 hover:text-black dark:hover:text-white border border-slate-200 dark:border-slate-900 transition-colors"
              >
                <MessageSquareText size={16} />
                info@quonote.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-black dark:text-white font-bold text-base md:text-lg mb-6">
              Solutions
            </h4>
            <ul className="space-y-3 lg:space-y-4 text-black dark:text-white text-sm lg:text-base">
              <li>
                <a
                  href="/services/ai-consulting/"
                  className="hover:text-blue-400"
                >
                  AI Consulting & Automation
                </a>
              </li>
              <li>
                <a
                  href="/services/software-development/"
                  className="hover:text-blue-400"
                >
                  Software Development
                </a>
              </li>
              <li>
                <a href="/services/automation/" className="hover:text-blue-400">
                  Business Process Automation
                </a>
              </li>
              <li>
                <a
                  href="/services/hardware-procurement/"
                  className="hover:text-blue-400"
                >
                  Hardware Sales
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-black dark:text-white font-bold text-base md:text-lg mb-6">
              Company
            </h4>
            <ul className="space-y-3 lg:space-y-4 text-black dark:text-white text-sm lg:text-base">
              <li>
                <a href="/#audiences" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#audiences" className="hover:text-blue-400">
                  For Startups
                </a>
              </li>
              <li>
                <a href="/#audiences" className="hover:text-blue-400">
                  For MSMEs
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@quonote.com"
                  className="inline-flex items-center gap-2 hover:text-blue-400"
                >
                  Contact
                  <ArrowRight size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 lg:pt-10 text-center text-black dark:text-white text-sm lg:text-base bg-white dark:bg-slate-950">
          &copy; 2026 Quonote Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
