import React from 'react';

const Career = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-charcoal-900/70 z-10"></div>
          <img
            src="/assets/images/img-8.jpg"
            alt="Careers at Hi-Tech Estates"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary-500 font-bold tracking-widest uppercase mb-4 text-sm">Join Our Team</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-serif">Careers</h1>
          <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
            Join a team of passionate professionals shaping the future of real estate and interior design.
          </p>
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
