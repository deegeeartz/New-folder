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
    <footer className="bg-slate-950 dark:bg-slate-950 light:bg-white border-t border-slate-900 dark:border-slate-900 light:border-slate-200 pt-16 pb-8">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="grid md:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <QuonoteLogo className="h-10 w-auto md:h-11" lazy />
            </div>

            <p className="text-slate-500 max-w-sm mb-6">
              A subsidiary of <strong>Quonote Enterprise</strong>. We design AI,
              software, automation, and infrastructure systems for ambitious
              teams across growth-stage and established businesses.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  openConsultant(
                    "I want strategic advice for my business growth plan.",
                  )
                }
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <MessageSquareText size={16} />
                Strategy Chat
              </button>
              <a
                href="/#services"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Briefcase size={16} />
                Services
              </a>
              <a
                href="/#hardware"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <MonitorSmartphone size={16} />
                Hardware
              </a>
              <a
                href="mailto:info@quonote.com"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <MessageSquareText size={16} />
                info@quonote.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-base md:text-lg mb-6">
              Solutions
            </h4>
            <ul className="space-y-3 lg:space-y-4 text-slate-500 text-sm lg:text-base">
              <li>
                <a
                  href="/services/ai-consulting/"
                  className="hover:text-blue-400"
                >
                  Digital Strategy
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
                  Data Analytics
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
            <h4 className="text-white font-bold text-base md:text-lg mb-6">
              Company
            </h4>
            <ul className="space-y-3 lg:space-y-4 text-slate-500 text-sm lg:text-base">
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

        <div className="border-t border-slate-900 pt-8 lg:pt-10 text-center text-slate-600 text-sm lg:text-base">
          &copy; 2026 Quonote Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
