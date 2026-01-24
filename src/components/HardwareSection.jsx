import React from 'react';
import { Monitor, ShieldCheck } from 'lucide-react';
import Button from './Button';

const HardwareSection = () => {
  return (
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
  );
};

export default HardwareSection;
