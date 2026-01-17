import React from 'react';
import { Globe } from 'lucide-react';
import QuonoteLogo from './QuonoteLogo';

const Footer = () => {
  return (
    <footer className="bg-slate-950 dark:bg-slate-950 light:bg-white border-t border-slate-900 dark:border-slate-900 light:border-slate-200 pt-16 pb-8">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <div className="grid md:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 mb-12">
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-6">
                <QuonoteLogo />
              </div>

              <p className="text-slate-500 max-w-sm mb-6">
                A subsidiary of <strong>Quonote Enterprise</strong>. Bridging
                the gap between the informal sector and high-tech innovation.
                Your partner in digital transformation.
              </p>
              <div className="flex gap-4 lg:gap-5">
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
  );
};

export default Footer;
