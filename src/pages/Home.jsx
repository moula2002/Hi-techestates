import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Search, Building2, Users, Trophy, MapPin, Star, ChevronRight } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';
import { locations, propertyTypes, bhkOptions, budgetRanges } from '../data/properties';

const Home = () => {
  const navigate = useNavigate();

  const [apiProperties, setApiProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://hi-techserver.onrender.com/api/properties');
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

  // Search State
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    bhk: '',
    budget: ''
  });

  const handleSearch = () => {
    // Navigate to properties page with search params as query string
    const query = new URLSearchParams();
    if (searchParams.location) query.set('location', searchParams.location);
    if (searchParams.type) query.set('type', searchParams.type);
    if (searchParams.bhk) query.set('bhk', searchParams.bhk);
    if (searchParams.budget) query.set('budget', searchParams.budget);

    navigate(`/properties?${query.toString()}`);
  };

  const featuredProperties = apiProperties.filter(p => p.featured).slice(0, 3);
  const latestProperties = [...apiProperties].slice(0, 3); // Backend already sorts by newest first

  return (
    <div className="w-full font-sans">
      <Helmet>
        <title>Hi-Tech Estates & Interiors | Design Your Dreams</title>
        <meta name="description" content="Hi-Tech Estates & Interiors helps you find the best residential and commercial properties in Bangalore. Explore top listings and interior design services." />
      </Helmet>
      {/* 1. Hero Section */}
      <section className="relative h-[650px] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
            alt="Modern Luxury Home"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-xl" data-aos="fade-up">
            <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Hi-Tech Estates</h2>
            <h1 className="text-5xl md:text-6xl font-black text-charcoal-900 leading-tight mb-6">
              Design Your <br />Dreams
            </h1>
            <p className="text-lg text-charcoal-700 mb-8 font-medium">
              Find a Property That Feels Like Home.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {['Buy', 'Sell', 'Rent', 'Lease'].map((action) => (
                <button key={action} className="px-8 py-3 bg-primary-900 text-white font-bold rounded hover:bg-primary-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Search Bar */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 -mt-12 mb-16" data-aos="fade-up" data-aos-delay="200">
        <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col md:flex-row gap-4 items-end border border-gray-100">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Location</label>
            <select
              className="w-full p-3 border border-gray-200 rounded text-charcoal-700 focus:outline-none focus:border-primary-500 font-medium"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
            >
              <option value="">Any Location</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Property Type</label>
            <select
              className="w-full p-3 border border-gray-200 rounded text-charcoal-700 focus:outline-none focus:border-primary-500 font-medium"
              value={searchParams.type}
              onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
            >
              <option value="">Any Type</option>
              {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">BHK</label>
            <select
              className="w-full p-3 border border-gray-200 rounded text-charcoal-700 focus:outline-none focus:border-primary-500 font-medium"
              value={searchParams.bhk}
              onChange={(e) => setSearchParams({ ...searchParams, bhk: e.target.value })}
            >
              <option value="">Any BHK</option>
              {bhkOptions.map(bhk => <option key={bhk} value={bhk}>{bhk}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Budget</label>
            <select
              className="w-full p-3 border border-gray-200 rounded text-charcoal-700 focus:outline-none focus:border-primary-500 font-medium"
              value={searchParams.budget}
              onChange={(e) => setSearchParams({ ...searchParams, budget: e.target.value })}
            >
              <option value="">Any Budget</option>
              {budgetRanges.map(budget => <option key={budget} value={budget}>{budget}</option>)}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <button
              onClick={handleSearch}
              className="w-full md:w-48 p-3 bg-primary-900 text-white font-bold rounded hover:bg-primary-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Search size={18} />
              Search Property
            </button>
          </div>
        </div>
      </section>

      {/* 3. Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Curated Selection</h2>
          <h3 className="text-3xl font-black text-charcoal-900 mb-12">Featured Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 text-left">
            {featuredProperties.map((property, idx) => (
              <div key={property.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
          <Link to="/properties" className="inline-block px-8 py-3 bg-primary-900 text-white font-bold rounded hover:bg-primary-800 transition-colors">
            View All Properties
          </Link>
        </div>
      </section>

      {/* 4. Latest Listings */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">New On Market</h2>
          <h3 className="text-3xl font-black text-charcoal-900 mb-12">Latest Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 text-left">
            {latestProperties.map((property, idx) => (
              <div key={property.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Services */}
      <section className="py-20 bg-primary-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
          <h2 className="text-xl font-bold tracking-widest text-primary-400 uppercase mb-2">What We Do</h2>
          <h3 className="text-3xl font-black mb-12">Our Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Property Sales', desc: 'Expert guidance on buying & selling.', img: '/assets/images/img-1.jpg', icon: <Building2 className="w-6 h-6 text-primary-900" /> },
              { title: 'Rentals & Leasing', desc: 'Find the perfect rental property.', img: '/assets/images/img-2.jpg', icon: <Building2 className="w-6 h-6 text-primary-900" /> },
              { title: 'Investment Consult', desc: 'Secure high-ROI investments.', img: '/assets/images/img-5.jpg', icon: <Building2 className="w-6 h-6 text-primary-900" /> },
              { title: 'Interiors', desc: 'Turnkey interior design solutions.', img: '/assets/images/img-7.jpg', icon: <Building2 className="w-6 h-6 text-primary-900" /> },
            ].map((srv, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors overflow-hidden flex flex-col group" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={srv.img}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
                  />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                    {srv.icon}
                  </div>
                </div>
                <div className="p-6 text-left flex flex-col flex-grow">
                  <h4 className="text-lg font-bold mb-2">{srv.title}</h4>
                  <p className="text-sm text-gray-300">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/services" className="inline-block px-8 py-3 bg-white text-primary-900 font-bold rounded hover:bg-gray-100 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1" data-aos="fade-right">
              <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Our Advantage</h2>
              <h3 className="text-3xl font-black text-charcoal-900 mb-8 leading-tight">Why Choose Hi-Tech Estates</h3>

              <div className="space-y-6">
                {[
                  { icon: <CheckCircle className="text-primary-600" size={24} />, title: 'Quality Construction', desc: 'Uncompromising standards and premium materials in every project.' },
                  { icon: <Search className="text-primary-600" size={24} />, title: 'Prime Locations', desc: 'Properties situated in rapidly growing and high-demand areas.' },
                  { icon: <Users className="text-primary-600" size={24} />, title: 'Customer Satisfaction', desc: 'Dedicated support ensuring a smooth buying or renting process.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-charcoal-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1" data-aos="fade-left">
              <img
                src="/assets/images/img-11.jpg"
                alt="About Building"
                className="w-full h-[500px] object-cover rounded-2xl shadow-xl border-4 border-white"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Reviews</h2>
          <h3 className="text-3xl font-black text-charcoal-900 mb-12">Client Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", text: "Hi-Tech Estates helped me find the perfect apartment in JP Nagar. Very professional team!", area: "JP Nagar" },
              { name: "Priya Desai", text: "Sold my plot in Begur within a month at a great price. Excellent marketing and fast process.", area: "Begur" },
              { name: "Anil Kumar", text: "Their interior design service completely transformed my new villa. Highly recommended.", area: "Koramangala" }
            ].map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-100 relative" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="flex justify-center mb-4 text-yellow-400">
                  <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
                </div>
                <p className="text-charcoal-700 italic mb-6">"{review.text}"</p>
                <h4 className="font-bold text-charcoal-900">{review.name}</h4>
                <p className="text-sm text-gray-500">Property in {review.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Areas We Serve */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Locations</h2>
          <h3 className="text-3xl font-black text-charcoal-900 mb-12">Areas We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((loc, idx) => (
              <Link
                key={loc}
                to={`/locality/${loc.toLowerCase().replace(/ /g, '-')}`}
                className="group relative bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex items-center justify-between"
                data-aos="fade-up" data-aos-delay={(idx % 4) * 100}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <MapPin size={18} />
                  </div>
                  <span className="font-bold text-charcoal-800 group-hover:text-primary-900 transition-colors duration-300 text-sm sm:text-base">{loc}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-primary-600 relative z-10 transform group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact Us Form */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">

            {/* Left Side: Image */}
            <div className="lg:w-5/12 relative hidden md:block" data-aos="fade-right">
              <div className="absolute inset-0 bg-primary-900/40 z-10"></div>
              <img
                src="/assets/images/img-10.jpg"
                alt="Contact Us"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-10 z-20 text-white">
                <h3 className="text-3xl font-black mb-4">Let's Find Your Dream Property</h3>
                <p className="text-gray-200">Our team of experts is ready to assist you with any real estate needs in South Bangalore.</p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:w-7/12 p-8 md:p-12" data-aos="fade-left">
              <div className="mb-8">
                <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Get In Touch</h2>
                <h3 className="text-3xl font-black text-charcoal-900">Have Any Questions?</h3>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-charcoal-700 mb-2">Full Name *</label>
                    <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal-700 mb-2">Phone Number *</label>
                    <input type="tel" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" placeholder="080-4132 3523" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-charcoal-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal-700 mb-2">Interested In</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors text-charcoal-700">
                      <option>Buying a Property</option>
                      <option>Selling a Property</option>
                      <option>Renting/Leasing</option>
                      <option>Interior Design</option>
                      <option>Other Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-charcoal-700 mb-2">Your Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="w-full bg-primary-900 text-white font-bold py-4 rounded-lg hover:bg-primary-800 transition-colors shadow-md hover:shadow-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
