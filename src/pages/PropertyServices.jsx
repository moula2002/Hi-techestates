import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Key, Handshake, TrendingUp, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';

const PropertyServices = () => {
  const [apiProperties, setApiProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        
        const mappedProperties = (Array.isArray(data) ? data : []).map(p => ({
          id: p.id,
          title: p.title,
          location: p.location?.area || p.location?.city || '',
          city: p.location?.city || '',
          type: p.type,
          status: p.purpose === 'Sale' ? 'For Sale' : (p.purpose === 'Rent' ? 'For Rent' : p.purpose),
          price: p.pricing?.price || '',
          bhk: p.specifications?.bedrooms || null,
          bathrooms: p.specifications?.bathrooms || null,
          area: p.specifications?.totalArea || p.specifications?.builtUpArea || '',
          facing: p.specifications?.facing || '',
          parking: p.specifications?.parkingSpaces || '',
          image: p.images?.featured || "",
          video: p.images?.videoUrl || null,
          features: p.amenities || [],
          featured: p.highlights?.featuredProperty || false,
          furnishing: p.specifications?.furnishing || ""
        }));
        setApiProperties(mappedProperties);
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
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/img-5.jpg"
            alt="Real Estate Services"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" }}
          />
          <div className="absolute inset-0 bg-charcoal-900/70"></div>
          {/* White gradient at top so the dark transparent navbar is legible */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/90 via-white/50 to-transparent"></div>
        </div>

        <div data-aos="fade-up" 
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <h2 data-aos="fade-up" className="text-xl font-bold tracking-widest text-primary-400 uppercase mb-4">
            Real Estate Solutions
          </h2>
          <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-black font-serif mb-6 leading-tight">
            Seamless Property <br />Transactions
          </h1>
          <p data-aos="fade-up" className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            From buying your first home to leasing commercial spaces, experience white-glove service at every step of your real estate journey.
          </p>
          <div data-aos="fade-up">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-primary-600/30 hover:-translate-y-1">
              Consult an Expert <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20">
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
      </section>

      {/* Featured Sales */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Prime Listings</h2>
              <h3 className="text-3xl md:text-4xl font-black text-charcoal-900 font-serif">Properties For Sale</h3>
            </div>
            <Link to="/properties?type=Buy" className="hidden md:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salesProperties.map((property, idx) => (
              <div data-aos="fade-up" 
                key={property.id}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rentals */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Move In Today</h2>
              <h3 className="text-3xl md:text-4xl font-black text-charcoal-900 font-serif">Properties For Rent</h3>
            </div>
            <Link to="/properties?type=Rent" className="hidden md:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalProperties.map((property, idx) => (
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
