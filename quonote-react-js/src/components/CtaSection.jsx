import React from 'react';

const CtaSection = () => {
  return (
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
  );
};

export default CtaSection;
