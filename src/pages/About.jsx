import React from 'react';
import { Award, Users, Map, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-charcoal-900/70 z-10"></div>
          <img
            src="/assets/images/img-7.jpg"
            alt="About Hi-Tech Estates"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary-500 font-bold tracking-widest uppercase mb-4 text-sm">Who We Are</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-serif">About Hi-Tech Estates</h1>
          <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
            Established with a vision to redefine real estate experiences, Hi-Tech Estates & Interiors is a premier property consultancy and design firm based in Bangalore. We combine deep market knowledge with a commitment to trust and transparency.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-charcoal-900 text-white py-16 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-black text-primary-500 mb-2">15+</div>
            <div className="text-gray-300 font-medium">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-primary-500 mb-2">10k+</div>
            <div className="text-gray-300 font-medium">Happy Clients</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-primary-500 mb-2">500+</div>
            <div className="text-gray-300 font-medium">Properties Sold</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-primary-500 mb-2">200+</div>
            <div className="text-gray-300 font-medium">Interiors Completed</div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl md:text-4xl font-black text-charcoal-900 mb-12 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Award size={32} className="text-white" />, title: "Excellence", desc: "We strive for excellence in every transaction and design project." },
            { icon: <ShieldCheck size={32} className="text-white" />, title: "Trust & Transparency", desc: "100% legal verification and clear communication." },
            { icon: <Users size={32} className="text-white" />, title: "Client First", desc: "Your needs and lifestyle dictate our recommendations." },
            { icon: <Map size={32} className="text-white" />, title: "Local Expertise", desc: "Deep knowledge of Bangalore's top localities." }
          ].map((val, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow text-center group">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary-500/30">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-3">{val.title}</h3>
              <p className="text-charcoal-600 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
