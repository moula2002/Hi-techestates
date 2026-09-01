import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Key, Handshake, TrendingUp, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';
import { mapApiPropertyToClient } from '../utils/propertyMapper';

const PropertyServices = () => {
  const [apiProperties, setApiProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://hi-techserver-zd1d.onrender.com/api/properties');
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        if (data) {
          const mappedProperties = (Array.isArray(data) ? data : []).map(mapApiPropertyToClient);
          setApiProperties(mappedProperties);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const salesProperties = apiProperties.filter(p => p.status === 'For Sale').slice(0, 3);
  const rentalProperties = apiProperties.filter(p => p.status === 'For Rent').slice(0, 3);

  const services = [
    { 
      id: 'buying', 
      icon: <Home size={32} />, 
      title: 'Property Buying', 
      desc: 'Expert guidance to help you find and acquire your dream residential or commercial property at the best value.',
      points: ['Extensive market research', 'Negotiation assistance', 'Property valuation', 'Legal verification']
    },
    { 
      id: 'selling', 
      icon: <TrendingUp size={32} />, 
      title: 'Property Selling', 
      desc: 'Strategic marketing and positioning to ensure your property sells quickly and at a premium price.',
      points: ['Professional photography', 'Targeted marketing', 'Buyer qualification', 'Closing assistance']
    },
    { 
      id: 'rentals', 
      icon: <Key size={32} />, 
      title: 'Rentals & Leasing', 
      desc: 'Comprehensive rental management services connecting landlords with reliable tenants.',
      points: ['Tenant screening', 'Lease agreement drafting', 'Rent collection setup', 'Property maintenance coordination']
    },
    { 
      id: 'documentation', 
      icon: <FileText size={32} />, 
      title: 'Documentation', 
      desc: 'Hassle-free handling of all legal paperwork, registrations, and title transfers by our expert legal team.',
      points: ['Title search & verification', 'Sale deed drafting', 'Registration assistance', 'Tax consultation']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 overflow-hidden">
      <Helmet>
        <title>Property Sales & Rentals | Hi-Tech Estates</title>
        <meta name="description" content="Expert property buying, selling, and rental services in Bangalore." />
      </Helmet>
      
      {/* Hero Banner */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
            alt="Real Estate Services"
            className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_linear_infinite_alternate]"
          />
          {/* Very Light Overlay */}
          <div className="absolute inset-0 bg-white/20"></div>
          {/* Top white gradient specifically for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-16" data-aos="zoom-in">
          <div className="inline-block bg-white/30 backdrop-blur-md px-6 md:px-10 py-6 rounded-2xl shadow-lg border border-white/50">
            <p className="text-primary-700 font-bold tracking-widest uppercase mb-2 text-xs">Real Estate Solutions</p>
            <h1 className="text-3xl md:text-4xl font-black text-charcoal-900 mb-4 font-serif">Seamless Property Transactions</h1>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full shadow-sm"></div>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div data-aos="fade-up" 
              key={service.id}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-charcoal-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-charcoal-700 font-medium">
                      <CheckCircle size={16} className="text-primary-500" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Featured Properties - Parallax */}
      <section 
        className="py-24 relative overflow-hidden bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/assets/images/exterior/WhatsApp%20Image%202026-09-01%20at%2012.01.24%20PM%20(2).jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-xl font-bold tracking-widest text-primary-400 uppercase mb-2 drop-shadow-md">Move In Today</h2>
              <h3 className="text-3xl md:text-4xl font-black text-white font-serif drop-shadow-md">Properties For Sale & Rent</h3>
            </div>
            <Link to="/properties" className="hidden md:flex items-center gap-2 text-white font-bold hover:text-gray-200 transition-colors drop-shadow-md">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apiProperties.slice(0, 3).map((property, idx) => (
              <div data-aos="fade-up" 
                key={property.id}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PropertyServices;
