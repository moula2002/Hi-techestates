import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Search, Building2, Users, Trophy, MapPin, Star, ChevronRight, ChevronLeft, Play } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';
import { mapApiPropertyToClient } from '../utils/propertyMapper';
import { useApiCache } from '../hooks/useApiCache';
import aboutImage from '../assets/image.png';

const Home = () => {
  const navigate = useNavigate();

  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

  // Standard static ranges for filter UI
  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK', '5 BHK', 'Villa', 'Plot'];
  const budgetRanges = ['Below 50 Lacs', '50 Lacs - 1 Cr', '1 Cr - 2 Cr', '2 Cr - 5 Cr', 'Above 5 Cr'];

  const { data: propertiesData, loading: propsLoading } = useApiCache('https://hi-techserver-zd1d.onrender.com/api/properties', 'hi-tech-properties');
  const { data: bannersData, loading: bannersLoading } = useApiCache('https://hi-techserver-zd1d.onrender.com/api/banners', 'hi-tech-banners');
  const { data: categoriesData, loading: catLoading } = useApiCache('https://hi-techserver-zd1d.onrender.com/api/categories', 'hi-tech-categories');

  const [apiProperties, setApiProperties] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (propertiesData) {
      const mappedProperties = (Array.isArray(propertiesData) ? propertiesData : []).map(mapApiPropertyToClient);
      setApiProperties(mappedProperties);
    }
  }, [propertiesData]);

  useEffect(() => {
    if (bannersData) {
      const fixedBanners = (Array.isArray(bannersData) ? bannersData : []).map(b => ({
        ...b,
        image: b.image ? b.image.replace('http://localhost:5000', 'https://hi-techserver-zd1d.onrender.com') : b.image,
        video: b.video ? b.video.replace('http://localhost:5000', 'https://hi-techserver-zd1d.onrender.com') : b.video
      }));
      setBanners(fixedBanners);
    }
  }, [bannersData]);

  useEffect(() => {
    if (categoriesData) {
      setApiCategories(Array.isArray(categoriesData) ? categoriesData : []);
    }
  }, [categoriesData]);

  // Banner carousel logic
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIdx(prev => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  const handlePrevBanner = () => {
    if (banners.length <= 1) return;
    setCurrentBannerIdx(prev => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNextBanner = () => {
    if (banners.length <= 1) return;
    setCurrentBannerIdx(prev => (prev + 1) % banners.length);
  };

  // Search State
  const [searchParams, setSearchParams] = useState({
    location: '',
    category: '',
    type: '',
    bhk: '',
    budget: '',
    newLaunch: false
  });

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedIn: 'Buying a Property',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState('idle');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactData, formSource: 'Home Page' })
      });

      const result = await response.json();

      if (response.ok) {
        setContactStatus('success');
        setContactMessage('Your message has been sent successfully!');
        setContactData({ name: '', phone: '', email: '', interestedIn: 'Buying a Property', message: '' });
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (error) {
      setContactStatus('error');
      setContactMessage(error.message || 'Failed to send message. Please try again.');
    }

    setTimeout(() => {
      setContactStatus('idle');
      setContactMessage('');
    }, 5000);
  };

  const handleSearch = () => {
    // Navigate to properties page with search params as query string
    const query = new URLSearchParams();
    if (searchParams.location) query.set('location', searchParams.location);
    if (searchParams.category) query.set('category', searchParams.category);
    if (searchParams.type) query.set('type', searchParams.type);
    if (searchParams.bhk) query.set('bhk', searchParams.bhk);
    if (searchParams.budget) query.set('budget', searchParams.budget);
    if (searchParams.newLaunch) query.set('newLaunch', 'true');

    navigate(`/properties?${query.toString()}`);
  };

  const sourceProperties = apiProperties;
  const featuredOnly = sourceProperties.filter(p => p.featured);
  const additionalProps = sourceProperties.filter(p => !p.featured);
  const featuredProperties = [...featuredOnly, ...additionalProps].slice(0, 5);
  const latestProperties = [...sourceProperties].slice(0, 3);
  const featuredCarouselRef = useRef(null);
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);

  useEffect(() => {
    // Removed continuous scroll loop to prevent repeating elements and provide standard professional carousel
  }, []);

  const scrollFeatured = (direction) => {
    if (featuredCarouselRef.current) {
      const carousel = featuredCarouselRef.current;
      const scrollAmount = 400; // rough width of a card + gap
      
      let newScrollLeft = direction === 'left' ? carousel.scrollLeft - scrollAmount : carousel.scrollLeft + scrollAmount;
      carousel.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };
  // Dynamically extract options from fetched properties
  const dynamicLocations = [...new Set(apiProperties.map(p => p.location).filter(Boolean))].sort();
  const dynamicPropertyTypes = [...new Set([...apiProperties.map(p => p.type).filter(Boolean), 'Commercial', 'Plots/Land', 'New Launch'])].sort();

  return (
    <div className="w-full font-sans">
      <Helmet>
        <title>Hi-Tech Estates & Interiors | Design Your Dreams</title>
        <meta name="description" content="Hi-Tech Estates & Interiors helps you find the best residential and commercial properties in Bangalore. Explore top listings and interior design services." />
      </Helmet>
      {/* 1. Hero Section */}
      <section className="relative h-[650px] flex items-center pt-20 group">
        <div className="absolute inset-0 z-0">
          {banners.length > 0 ? (
            banners.map((banner, idx) => (
              banner.video ? (
                <video
                  key={banner.id}
                  src={banner.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentBannerIdx ? 'opacity-100 animate-slow-zoom' : 'opacity-0'
                    }`}
                />
              ) : (
                <img
                  key={banner.id}
                  src={banner.image}
                  alt="Banner"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 origin-center ${idx === currentBannerIdx ? 'opacity-100 animate-slow-zoom' : 'opacity-0 scale-100'
                    }`}
                />
              )
            ))
          ) : (
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
              alt="Default Banner"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 origin-center opacity-100 animate-slow-zoom"
            />
          )}

        </div>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pl-12 md:pl-8">
          <div className="max-w-3xl lg:max-w-4xl" data-aos="fade-up">
            <div className="relative inline-block mb-8">
              {/* Soft, edgeless blurred glass cloud */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-lg blur-2xl rounded-[100px] scale-110 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-7xl md:whitespace-nowrap font-['Cinzel'] font-black tracking-widest text-[#17427a] mb-2 drop-shadow-xl animate-premium-reveal">
                  Hi-Tech Estates
                </h2>
                <h1 className="text-2xl md:text-3xl font-black text-black leading-tight mb-2 drop-shadow-xl">
                  Design Your Dreams
                </h1>
                <p className="text-lg text-black font-extrabold drop-shadow-lg">
                  Find a Property That Feels Like Home.
                </p>
              </div>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-2 transition-transform duration-500 group-hover/glass:translate-x-2 delay-150">
              {['Buy', 'Sell', 'Rent', 'Lease'].map((action) => (
                <button key={action} className="px-8 py-3 bg-primary-900/90 backdrop-blur-sm border border-primary-800/50 text-white font-bold rounded-xl hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Search Bar */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 -mt-12 mb-16" data-aos="fade-up" data-aos-delay="200">
        <div className="bg-white rounded-lg shadow-xl p-6 flex flex-wrap lg:flex-nowrap gap-4 items-end border border-gray-100">
          <div className="flex-1 w-full min-w-[140px]">
            <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Location</label>
            <select
              className="w-full p-3 border border-gray-200 rounded text-charcoal-700 focus:outline-none focus:border-primary-500 font-medium"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
            >
              <option value="">Location</option>
              {dynamicLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full min-w-[140px]">
            <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Category</label>
            <select
              className="w-full p-3 border border-gray-200 rounded text-charcoal-700 focus:outline-none focus:border-primary-500 font-medium"
              value={searchParams.category}
              onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
            >
              <option value="">Any</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Plots/Land">Plots/Land</option>
            </select>
          </div>
          <div className="flex-1 w-full min-w-[140px]">
            <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Property Type</label>
            <select
              className="w-full p-3 border border-gray-200 rounded text-charcoal-700 focus:outline-none focus:border-primary-500 font-medium"
              value={searchParams.type}
              onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
            >
              <option value="">Type</option>
              {dynamicPropertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full min-w-[120px]">
            <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">BHK</label>
            <select
              className="w-full p-3 border border-gray-200 rounded text-charcoal-700 focus:outline-none focus:border-primary-500 font-medium"
              value={searchParams.bhk}
              onChange={(e) => setSearchParams({ ...searchParams, bhk: e.target.value })}
            >
              <option value="">BHK</option>
              {bhkOptions.map(bhk => <option key={bhk} value={bhk}>{bhk}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full min-w-[140px]">
            <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Budget</label>
            <select
              className="w-full p-3 border border-gray-200 rounded text-charcoal-700 focus:outline-none focus:border-primary-500 font-medium"
              value={searchParams.budget}
              onChange={(e) => setSearchParams({ ...searchParams, budget: e.target.value })}
            >
              <option value="">Budget</option>
              {budgetRanges.map(budget => <option key={budget} value={budget}>{budget}</option>)}
            </select>
          </div>
          <div className="flex items-center h-[50px] min-w-[120px] mb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={searchParams.newLaunch} onChange={(e) => setSearchParams({ ...searchParams, newLaunch: e.target.checked })} className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500 cursor-pointer" />
              <span className="text-sm font-bold text-charcoal-700 uppercase">New Launch</span>
            </label>
          </div>
          <div className="w-full lg:w-auto">
            <button
              onClick={handleSearch}
              className="w-full lg:w-48 p-3 bg-primary-900 text-white font-bold rounded hover:bg-primary-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* 3. Featured Properties */}
      <section className="py-20 bg-gray-50 bg-premium-texture relative overflow-hidden">
        {/* Soft Background Blobs & Elements */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-200/50 rounded-full filter blur-[80px] opacity-80 animate-float pointer-events-none z-0"></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-blue-200/40 rounded-full filter blur-[60px] opacity-80 pointer-events-none z-0" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 border-2 border-primary-900/10 rounded-full pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
          <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Curated Selection</h2>
          <h3 className="text-3xl font-black text-charcoal-900 mb-12">Featured Properties</h3>
          <div 
            className="relative group mb-10 overflow-hidden"
            onMouseEnter={() => setIsFeaturedHovered(true)}
            onMouseLeave={() => setIsFeaturedHovered(false)}
          >
            {/* Carousel Navigation Arrows */}
            {featuredProperties.length > 1 && (
              <>
                <button 
                  onClick={() => scrollFeatured('left')}
                  className="absolute left-0 md:left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.25)] text-primary-900 hover:bg-primary-900 hover:text-white transition-all md:flex items-center justify-center opacity-80 hover:opacity-100"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => scrollFeatured('right')}
                  className="absolute right-0 md:right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.25)] text-primary-900 hover:bg-primary-900 hover:text-white transition-all md:flex items-center justify-center opacity-80 hover:opacity-100"
                  aria-label="Scroll Right"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Standard Snap Carousel Container */}
            <div 
              ref={featuredCarouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 pt-2 text-left hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredProperties.map((property, idx) => (
                <div key={`${property.id}-${idx}`} className="w-[85vw] sm:w-[350px] md:w-[400px] shrink-0 snap-start" data-aos="fade-up" data-aos-delay={idx < 5 ? idx * 100 : 0}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
          <Link to="/properties" className="inline-block px-8 py-3 bg-primary-900 text-white font-bold rounded hover:bg-primary-800 transition-colors">
            View All Properties
          </Link>
        </div>
      </section>

      {/* 6.5 Property Categories UI Redesign */}
      <section 
        className="py-24 overflow-hidden relative bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/assets/images/exterior/WhatsApp%20Image%202026-09-01%20at%2012.01.24%20PM%20(1).jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Left Side: Typography */}
            <div className="lg:w-[30%] pt-12" data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-sans text-white mb-3 leading-tight tracking-tight drop-shadow-md">
                Residential<br />Properties
              </h2>
              <h3 className="text-3xl md:text-4xl text-gray-300 font-sans font-normal leading-tight drop-shadow-md">
                In a good<br />locations
              </h3>
            </div>

            {/* Right Side: Masonry Grid */}
            <div className="lg:w-[70%] w-full">
              <div className="columns-1 sm:columns-2 gap-8 space-y-8">
                {apiCategories.map((cat, idx) => {
                  // Pre-defined heights for masonry stagger effect
                  const heights = ['h-[320px]', 'h-[480px]', 'h-[400px]', 'h-[320px]', 'h-[380px]'];
                  const cardHeight = heights[idx % heights.length];

                  // Calculate exact, dynamic property count
                  const exactCount = apiProperties.filter(p => {
                    const pType = (p.type || '').toLowerCase();
                    const cName = (cat.name || '').toLowerCase();
                    return pType === cName || cName.includes(pType) || pType.includes(cName.replace(/s$/, '')) || cName.replace(/st$/, 't') === pType;
                  }).length;

                  return (
                    <Link
                      key={cat.id || cat._id || cat.name}
                      to={`/properties?category=${cat.slug || cat.name.toLowerCase()}`}
                      className={`group relative block w-full overflow-hidden rounded-sm break-inside-avoid shadow-lg hover:shadow-2xl transition-all duration-500 ${cardHeight}`}
                      data-aos="fade-up" data-aos-delay={idx * 100}
                    >
                      {/* Background Image */}
                      <img
                        src={cat.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                        alt={cat.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-transparent to-charcoal-900/80 group-hover:via-charcoal-900/20 transition-colors duration-500"></div>

                      {/* Content */}
                      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white z-10">
                        {/* Top: Property Count & Category Name */}
                        <div>
                          <p className="text-[11px] font-medium text-gray-200 mb-1.5 tracking-wider uppercase opacity-90">
                            {exactCount} Properties
                          </p>
                          <h4 className="text-2xl sm:text-3xl font-normal tracking-wide text-white drop-shadow-sm">{cat.name}</h4>
                        </div>

                        {/* Bottom: More Details & Icon */}
                        <div className="flex justify-between items-end opacity-90 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/90">
                            More Details
                          </span>
                          <Play size={20} strokeWidth={1.5} className="text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Services */}
      <section className="py-20 bg-white bg-premium-texture text-center relative overflow-hidden">
        {/* Architectural Background */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-building-outline opacity-60 pointer-events-none z-0"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-1 bg-gradient-to-r from-transparent via-primary-900/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/60 rounded-full filter blur-[100px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up">
          <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">What We Do</h2>
          <h3 className="text-3xl font-black text-charcoal-900 mb-12">Our Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Property Sales', desc: 'Expert guidance on buying & selling.', img: '/assets/images/img-1.jpg', icon: <Building2 className="w-6 h-6 text-primary-900" /> },
              { title: 'Rentals & Leasing', desc: 'Find the perfect rental property.', img: '/assets/images/img-2.jpg', icon: <Building2 className="w-6 h-6 text-primary-900" /> },
              { title: 'Investment Consult', desc: 'Secure high-ROI investments.', img: '/assets/images/img-5.jpg', icon: <Building2 className="w-6 h-6 text-primary-900" /> },
              { title: 'Interiors', desc: 'Turnkey interior design solutions.', img: '/assets/images/img-7.jpg', icon: <Building2 className="w-6 h-6 text-primary-900" /> },
            ].map((srv, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl hover:shadow-md transition-shadow overflow-hidden flex flex-col group" data-aos="fade-up" data-aos-delay={idx * 100}>
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
                  <h4 className="text-lg font-bold text-charcoal-900 mb-2">{srv.title}</h4>
                  <p className="text-sm text-gray-600">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/services" className="inline-block px-8 py-3 bg-primary-900 text-white font-bold rounded hover:bg-primary-800 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Latest Listings - Parallax */}
      <section 
        className="py-20 bg-cover bg-center md:bg-fixed relative border-t border-gray-800"
        style={{ backgroundImage: "url('/assets/images/exterior/WhatsApp%20Image%202026-09-01%20at%2012.01.24%20PM%20(1).jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
          <h2 className="text-xl font-bold tracking-widest text-primary-400 uppercase mb-2 drop-shadow-md">New On Market</h2>
          <h3 className="text-3xl font-black text-white mb-12 drop-shadow-md">Latest Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 text-left">
            {latestProperties.map((property, idx) => (
              <div key={property.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-20 bg-gray-50 bg-premium-texture relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none z-0 shadow-[0_0_100px_rgba(0,0,0,0.05)]"></div>
        <div className="absolute bottom-20 left-10 w-[200px] h-[200px] bg-[radial-gradient(#1e3a8a_2px,transparent_2px)] [background-size:16px_16px] opacity-10 pointer-events-none z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                src={aboutImage}
                alt="Tall Residential Building"
                className="w-full h-[500px] object-cover rounded-2xl shadow-xl border-4 border-white"
                onError={(e) => { e.target.src = "/assets/images/img-1.jpg" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials - Parallax */}
      <section 
        className="py-20 bg-cover bg-center md:bg-fixed relative"
        style={{ backgroundImage: "url('/assets/images/exterior/WhatsApp%20Image%202026-09-01%20at%2012.01.25%20PM.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-up">
          <h2 className="text-xl font-bold tracking-widest text-primary-400 uppercase mb-2 drop-shadow-md">Reviews</h2>
          <h3 className="text-3xl font-black text-white mb-12 drop-shadow-md">Client Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", text: "Hi-Tech Estates helped me find the perfect apartment in JP Nagar. Very professional team!", area: "JP Nagar" },
              { name: "Priya Desai", text: "Sold my plot in Begur within a month at a great price. Excellent marketing and fast process.", area: "Begur" },
              { name: "Anil Kumar", text: "Their interior design service completely transformed my new villa. Highly recommended.", area: "Koramangala" }
            ].map((review, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 relative shadow-lg" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="flex justify-center mb-4 text-yellow-400">
                  <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
                </div>
                <p className="text-gray-200 italic mb-6">"{review.text}"</p>
                <h4 className="font-bold text-white">{review.name}</h4>
                <p className="text-sm text-gray-400">Property in {review.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Areas We Serve (Redesigned from image) */}
      <section className="py-24 bg-white bg-premium-texture overflow-hidden relative">
        {/* Dynamic Blobs */}
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary-200/40 rounded-full filter blur-[80px] animate-float pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-slate-200/60 rounded-full filter blur-[100px] animate-float pointer-events-none z-0" style={{animationDelay: '4s'}}></div>
        {/* Elegant curved separator */}
        <div className="absolute top-1/4 right-0 w-[50vw] h-[2px] bg-gradient-to-l from-primary-900/20 to-transparent pointer-events-none z-0"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left Side: Typography */}
            <div className="lg:w-[25%] pt-4" data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-3 leading-tight tracking-tight">
                Explore<br />Locations
              </h2>
              <p className="text-lg text-gray-500 font-sans font-normal leading-relaxed pr-4">
                What the area has to offer and make a well-informed decision about your real estate investment.
              </p>
            </div>

            {/* Right Side: Grid */}
            <div className="lg:w-[75%] w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { label: 'East Bangalore', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
                  { label: 'West Bangalore', image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
                  { label: 'North Bangalore', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
                  { label: 'South Bangalore', image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
                ].map((region, idx) => {
                  // Fallback count based on image if database has no properties matching the location yet
                  const exactCount = apiProperties.filter(p => (p.location || '').toLowerCase() === region.label.toLowerCase()).length;
                  const displayCount = exactCount > 0 ? exactCount : (idx === 0 ? 8 : idx === 1 ? 7 : idx === 2 ? 22 : 17);

                  return (
                    <Link
                      key={region.label}
                      to={`/properties?location=${region.label}`}
                      className="group relative h-[280px] w-full overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 block"
                      data-aos="fade-up" data-aos-delay={idx * 100}
                    >
                      {/* Background Image */}
                      <img
                        src={region.image}
                        alt={region.label}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-transparent to-charcoal-900/80 group-hover:via-charcoal-900/30 transition-colors duration-500"></div>

                      {/* Content */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                        {/* Top Content */}
                        <div>
                          <p className="text-[10px] font-medium text-gray-200 mb-1 tracking-wider opacity-90">{displayCount} Properties</p>
                          <h4 className="text-xl font-normal text-white tracking-wide">{region.label}</h4>
                        </div>

                        {/* Bottom Content */}
                        <div className="flex justify-between items-end opacity-90 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/90">
                            More<br />Details
                          </span>
                          <Play size={20} strokeWidth={1.5} className="text-white group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Contact Us Form */}
      <section className="py-20 bg-white bg-premium-texture relative border-t border-gray-100 overflow-hidden">
        {/* Subtle Accents */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-[radial-gradient(#94a3b8_2px,transparent_2px)] [background-size:20px_20px] opacity-10 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary-200/30 rounded-full filter blur-[60px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-charcoal-700 mb-2">Full Name *</label>
                    <input type="text" value={contactData.name} onChange={e => setContactData({ ...contactData, name: e.target.value })} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal-700 mb-2">Phone Number *</label>
                    <input type="tel" value={contactData.phone} onChange={e => setContactData({ ...contactData, phone: e.target.value })} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" placeholder="+91 99000 00494" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-charcoal-700 mb-2">Email Address</label>
                    <input type="email" value={contactData.email} onChange={e => setContactData({ ...contactData, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal-700 mb-2">Interested In</label>
                    <select value={contactData.interestedIn} onChange={e => setContactData({ ...contactData, interestedIn: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors text-charcoal-700">
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
                  <textarea rows="4" value={contactData.message} onChange={e => setContactData({ ...contactData, message: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>

                {contactMessage && (
                  <div className={`p-4 rounded-lg font-medium text-sm ${contactStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {contactMessage}
                  </div>
                )}

                <button type="submit" disabled={contactStatus === 'loading'} className="w-full bg-primary-900 text-white font-bold py-4 rounded-lg hover:bg-primary-800 transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                  {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
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
