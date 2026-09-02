import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Landmark, CheckCircle, Repeat, FileText, ArrowRight } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';
import { mapApiPropertyToClient } from '../utils/propertyMapper';

const HomeLoanServices = () => {
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

  const services = [
    { 
      id: 'advisory', 
      icon: <Landmark size={32} />, 
      title: 'Home Loan Advisory', 
      desc: 'Expert consultation to help you choose the best loan products with minimal interest rates.',
      points: ['Eligibility check', 'Bank comparison', 'Interest rate negotiation', 'Tenure optimization']
    },
    { 
      id: 'preapproved', 
      icon: <CheckCircle size={32} />, 
      title: 'Pre-Approved Loans', 
      desc: 'Get pre-approved quickly to strengthen your buying position before property hunting.',
      points: ['Quick processing', 'Credit analysis', 'Financial planning', 'Budget estimation']
    },
    { 
      id: 'refinancing', 
      icon: <Repeat size={32} />, 
      title: 'Loan Transfer', 
      desc: 'Transfer your existing high-interest loans to better banks for lower EMIs and benefits.',
      points: ['Balance transfer', 'Top-up loans', 'EMI reduction', 'Restructuring']
    },
    { 
      id: 'documentation', 
      icon: <FileText size={32} />, 
      title: 'Documentation Assist', 
      desc: 'End-to-end support with all bank paperwork, legal checks, and loan disbursements.',
      points: ['Income document prep', 'Legal clearances', 'Bank coordination', 'Disbursement support']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 overflow-hidden">
      <Helmet>
        <title>Home Loan Services | Hi-Tech Estates</title>
        <meta name="description" content="Fast, flexible, and hassle-free home loan financing for your dream property." />
      </Helmet>
      
      {/* Hero Banner */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
            alt="Home Loan Services"
            className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_linear_infinite_alternate]"
          />
          {/* Very Light Overlay */}
          <div className="absolute inset-0 bg-white/20"></div>
          {/* Top white gradient specifically for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-16" data-aos="zoom-in">
          <div className="inline-block bg-white/30 backdrop-blur-md px-6 md:px-10 py-6 rounded-2xl shadow-lg border border-white/50">
            <p className="text-primary-700 font-bold tracking-widest uppercase mb-2 text-xs">Financial Solutions</p>
            <h1 className="text-3xl md:text-4xl font-black text-charcoal-900 mb-4 font-serif">Seamless Home Loans</h1>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full shadow-sm"></div>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-24 bg-gray-50 bg-premium-texture border-b border-gray-100 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-building-outline opacity-60 pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none z-0 shadow-[0_0_100px_rgba(0,0,0,0.05)]"></div>
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-primary-100/40 rounded-full filter blur-[100px] animate-float pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <h2 className="text-xl font-bold tracking-widest text-primary-400 uppercase mb-2 drop-shadow-md">Ready to Buy?</h2>
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

export default HomeLoanServices;
