import React from 'react';
import { Home, Key, Handshake, PenTool, TrendingUp, FileText, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const servicesList = [
    { id: 'sales', icon: <Home />, title: 'Property Sales', desc: 'Expert assistance in selling your residential or commercial property at the best market value.' },
    { id: 'rentals', icon: <Key />, title: 'Property Rentals', desc: 'Find reliable tenants quickly with our comprehensive rental management and background check services.' },
    { id: 'buying', icon: <Handshake />, title: 'Property Buying Assistance', desc: 'We guide you through the entire buying process, from shortlisting properties to final negotiation.' },
    { id: 'investment', icon: <TrendingUp />, title: 'Property Investment Consultation', desc: 'Data-driven insights to help you build a profitable and secure real estate portfolio.' },
    { id: 'documentation', icon: <FileText />, title: 'Documentation Assistance', desc: 'Hassle-free legal verification, registration, and RERA compliance support.' },
    { id: 'interiors', icon: <PenTool />, title: 'Interior Design', desc: 'Bespoke residential and commercial interior design services that turn spaces into statements.' },
    { id: 'marketing', icon: <Megaphone />, title: 'Property Advertising & Marketing', desc: 'Premium marketing campaigns to ensure your property reaches the right audience.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col justify-center items-center overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-charcoal-900/70 z-10"></div>
          <img
            src="/assets/images/img-19.jpg"
            alt="Our Services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary-500 font-bold tracking-widest uppercase mb-4 text-sm">What We Do</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-serif">Our Services</h1>
          <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
            Comprehensive real estate and interior design solutions under one roof. We handle the complexities so you can focus on your dreams.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <div key={idx} id={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="w-16 h-16 bg-primary-500/10 text-primary-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(service.icon, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">{service.title}</h3>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                {service.desc}
              </p>
              <Link to="/contact" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
                Enquire Now &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
