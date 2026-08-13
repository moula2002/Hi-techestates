import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Key, Handshake, TrendingUp, FileText, Paintbrush, Megaphone, ArrowRight } from 'lucide-react';

const Services = () => {
  const servicesList = [
    { id: 'sales', icon: <Home size={24} />, img: '/assets/images/img-1.jpg', title: 'Property Sales', desc: 'Expert assistance in finding buyers for your residential or commercial properties at the best market value.' },
    { id: 'rentals', icon: <Key size={24} />, img: '/assets/images/img-2.jpg', title: 'Property Rentals', desc: 'Connecting landlords with reliable tenants and managing the rental process from start to finish.' },
    { id: 'buying', icon: <Handshake size={24} />, img: '/assets/images/img-3.jpg', title: 'Property Buying Assistance', desc: 'Guided support to help you find and purchase your dream property or next great investment.' },
    { id: 'selling', icon: <TrendingUp size={24} />, img: '/assets/images/img-4.jpg', title: 'Property Selling Assistance', desc: 'Strategic pricing and market positioning to sell your property faster and for more.' },
    { id: 'investment', icon: <TrendingUp size={24} />, img: '/assets/images/img-5.jpg', title: 'Property Investment Consultation', desc: 'Data-driven advice on high-ROI real estate investments across emerging areas.' },
    { id: 'documentation', icon: <FileText size={24} />, img: '/assets/images/img-6.jpg', title: 'Property Documentation Assistance', desc: 'Hassle-free handling of all legal paperwork, registrations, and title transfers.' },
    { id: 'interiors', icon: <Paintbrush size={24} />, img: '/assets/images/img-7.jpg', title: 'Interiors', desc: 'Turnkey interior design and execution services to transform empty spaces into beautiful homes.' },
    { id: 'marketing', icon: <Megaphone size={24} />, img: '/assets/images/img-8.jpg', title: 'Property Advertising & Marketing', desc: 'Aggressive marketing strategies to ensure your property reaches the widest possible audience.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 font-sans pb-20">
      <Helmet>
        <title>Our Services | Hi-Tech Estates & Interiors</title>
        <meta name="description" content="From property sales and rentals to documentation and interior design, Hi-Tech Estates offers comprehensive real estate services in Bangalore." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Breadcrumbs */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <h1 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">What We Do</h1>
          <h2 className="text-4xl font-black text-charcoal-900 mb-4">Our Premium Services</h2>
          <div className="text-sm text-gray-500 font-medium flex justify-center gap-2">
            <Link to="/" className="hover:text-primary-900 transition-colors">Home</Link> / 
            <span className="text-charcoal-900">Services</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, idx) => (
            <div key={idx} id={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
                />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-900 shadow-md group-hover:bg-primary-900 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">{service.title}</h3>
                <p className="text-charcoal-600 text-sm leading-relaxed mb-6 flex-grow">
                  {service.desc}
                </p>
                <div className="mt-auto">
                  <a href="https://wa.me/919900000494" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary-600 font-bold text-sm hover:text-primary-900 transition-colors group/link">
                    Enquire Now <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
