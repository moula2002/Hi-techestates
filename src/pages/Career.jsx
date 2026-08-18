import React from 'react';

const Career = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img
            src="/assets/images/img-8.jpg"
            alt="Careers at Hi-Tech Estates"
            className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_linear_infinite_alternate]"
          />
          {/* Very Light Overlay */}
          <div className="absolute inset-0 bg-white/20"></div>
          {/* Top white gradient specifically for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-16" data-aos="zoom-in">
          <div className="inline-block bg-white/30 backdrop-blur-md px-6 md:px-10 py-6 rounded-2xl shadow-lg border border-white/50">
            <p className="text-primary-700 font-bold tracking-widest uppercase mb-2 text-xs">Join Our Team</p>
            <h1 className="text-3xl md:text-4xl font-black text-charcoal-900 mb-4 font-serif">Careers</h1>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full mb-4 shadow-sm"></div>
            <p className="text-sm md:text-base text-charcoal-900 leading-relaxed font-bold max-w-xl mx-auto">
              Join a team of passionate professionals shaping the future of real estate and interior design.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-charcoal-50 p-8 rounded-2xl border border-charcoal-100 text-center">
            <h3 className="text-xl font-bold text-charcoal-900 mb-4">No Open Positions Currently</h3>
            <p className="text-charcoal-600 mb-6">
              We are always looking for talented individuals. Send your resume and we will contact you when a position opens up.
            </p>
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors">
              Submit Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
