import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, BedDouble, Bath, Square, Compass, Car, CheckCircle, Phone, ChevronLeft, ChevronRight, Image as ImageIcon, Map, Home, User, Star } from 'lucide-react';
import { useApiCache } from '../hooks/useApiCache';
import UniqueLoader from '../components/ui/UniqueLoader';
import { mapApiPropertyToClient } from '../utils/propertyMapper';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [localError, setLocalError] = useState(null);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [sidebarTab, setSidebarTab] = useState('schedule'); // schedule, request
  const [tourType, setTourType] = useState('in_person'); // in_person, video
  const [activeNavTab, setActiveNavTab] = useState('description');

  // Form States
  const [scheduleForm, setScheduleForm] = useState({ time: 'Time', name: '', phone: '', email: '', message: '' });
  const [enquireForm, setEnquireForm] = useState({ name: '', phone: '', email: '', type: 'Select', message: '' });
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [dateOffset, setDateOffset] = useState(0);

  const { data: properties, loading, error: apiError } = useApiCache('https://hi-techserver-zd1d.onrender.com/api/properties', 'hi-tech-properties');

  useEffect(() => {
    if (properties) {
      try {
        const p = properties.find(prop => (prop._id || prop.id) === id || prop.slug === id);
        if (!p) {
          setLocalError('Property not found');
          return;
        }
        const mappedProperty = mapApiPropertyToClient(p);
        setProperty(mappedProperty);
        setEnquireForm(prev => ({ ...prev, message: `Hello, I am interested in [${mappedProperty.title}]` }));
      } catch (err) {
        console.error("Error fetching property:", err);
        setLocalError("Failed to load property details.");
      }
    }
  }, [id, properties]);

  // Generate next 4 dates based on offset
  const nextDates = Array.from({ length: 4 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + dateOffset);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = d.getDate();
    return { dayName, dayNum, monthName, fullDate: d };
  });

  const handleNextDates = () => setDateOffset(prev => prev + 1);
  const handlePrevDates = () => setDateOffset(prev => Math.max(0, prev - 1));

  const handleScrollTo = (sectionId) => {
    setActiveNavTab(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140; // Offset for sticky nav + navbar
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!scheduleForm.name || !scheduleForm.phone) {
      alert("Please fill in your Name and Phone Number to schedule a tour.");
      return;
    }
    const chosenDate = nextDates[selectedDateIndex];
    alert(`Thank you ${scheduleForm.name}! Your ${tourType === 'in_person' ? 'In Person' : 'Video'} tour request for ${chosenDate.dayName}, ${chosenDate.monthName} ${chosenDate.dayNum} has been submitted.`);
    setScheduleForm({ time: 'Time', name: '', phone: '', email: '', message: '' });
  };

  const handleEnquireSubmit = (e) => {
    e.preventDefault();
    if (!enquireForm.name || !enquireForm.phone) {
      alert("Please fill in your Name and Phone Number to enquire.");
      return;
    }
    alert(`Thank you ${enquireForm.name}! Your enquiry has been sent to the agent.`);
    setEnquireForm({ name: '', phone: '', email: '', type: 'Select', message: `Hello, I am interested in [${property?.title}]` });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50">
        <UniqueLoader />
      </div>
    );
  }

  if (apiError || localError || (!loading && !property)) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{apiError || localError || "Property Not Found"}</h2>
        <Link to="/properties" className="px-6 py-2 bg-gradient-to-r from-[#00a8ff] to-[#0097e6] text-white rounded font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          Back to Properties
        </Link>
      </div>
    );
  }

  const allImages = property.image ? [property.image] : [];
  if (property.gallery && Array.isArray(property.gallery)) {
    property.gallery.forEach(img => {
      if (img !== property.image) allImages.push(img);
    });
  }
  if (allImages.length === 0) {
    allImages.push("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80");
  }

  const nextImage = () => setCurrentImgIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

  const agentName = property.agent?.name || "Madhu Kumar G";
  const agentPhone = property.agent?.mobile || "+91 63632 72452";

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-36 md:pt-40 lg:pt-48 font-sans pb-20 relative overflow-hidden">

      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-96 left-0 w-[400px] h-[400px] bg-green-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 pointer-events-none"></div>

      <Helmet>
        <title>{property.title} | Hi-Tech Estates</title>
        <meta name="description" content={`Check out this ${property.type} at ${property.location}. ${property.price}.`} />
        {/* Simple fade animation for the slider */}
        <style>{`
          @keyframes subtleZoom {
            from { opacity: 0.8; transform: scale(1.02); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-slider {
            animation: subtleZoom 0.5s ease-out forwards;
          }
        `}</style>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div data-aos="fade-down" className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">{property.title}</h1>
            <p className="text-gray-500 flex items-center gap-2 text-sm mb-5 font-medium">
              <span className="p-1.5 bg-blue-50 rounded-full text-[#00a8ff]">
                <MapPin size={16} />
              </span>
              {property.fullAddress || `${property.location}, ${property.city}`}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 text-[11px] font-bold uppercase rounded shadow-sm tracking-widest">Featured</span>
              {property.status && (
                <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-3 py-1.5 text-[11px] font-bold uppercase rounded shadow-sm tracking-widest">{property.status}</span>
              )}
              {property.badges && property.badges.map((badge, idx) => (
                <span key={idx} className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-3 py-1.5 text-[11px] font-bold uppercase rounded shadow-sm tracking-widest">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="md:text-right">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">{property.price}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#f39c12] bg-orange-50 px-2 py-1 rounded-md">
              <Star size={12} fill="currentColor" /> Premium Listing
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Gallery Section */}
            <div data-aos="fade-up" className="bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <div className="relative w-full h-[500px] bg-gray-900 rounded-xl overflow-hidden mb-4 group shadow-inner">
                <img
                  key={currentImgIndex}
                  src={allImages[currentImgIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover animate-slider"
                />

                {/* On-image overlay icons (top right) */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/90 backdrop-blur-sm text-[#00a8ff] w-10 h-10 flex items-center justify-center rounded-lg shadow-lg transition hover:bg-[#00a8ff] hover:text-white hover:scale-105 duration-300">
                    <ImageIcon size={18} />
                  </button>
                  <button onClick={() => handleScrollTo('address')} className="bg-white/90 backdrop-blur-sm text-gray-800 w-10 h-10 flex items-center justify-center rounded-lg shadow-lg transition hover:bg-gray-800 hover:text-white hover:scale-105 duration-300">
                    <Map size={18} />
                  </button>
                </div>

                {/* Left/Right Navigation */}
                {allImages.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-[#00a8ff] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl hover:scale-110">
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-[#00a8ff] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl hover:scale-110">
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Counter Pill */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {currentImgIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
                  {allImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`h-24 min-w-[140px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${currentImgIndex === idx ? 'border-4 border-[#00a8ff] shadow-md scale-100 opacity-100' : 'border-2 border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'}`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Navigation Tabs (Glassmorphism) */}
            <div data-aos="fade-up" data-aos-delay="100" className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-2 overflow-x-auto sticky top-32 lg:top-40 z-20 hidden md:block">
              <div className="flex items-center gap-2 px-2 py-1 min-w-max text-sm font-bold text-gray-500">
                {['description', 'overview', 'address', 'contact'].map(tab => (
                  <span
                    key={tab}
                    onClick={() => handleScrollTo(tab)}
                    className={`cursor-pointer px-5 py-2.5 rounded-xl transition-all duration-300 capitalize ${activeNavTab === tab ? 'bg-gradient-to-r from-[#00a8ff] to-[#0097e6] text-white shadow-md' : 'hover:bg-gray-100 hover:text-gray-900'}`}
                  >
                    {tab === 'overview' ? 'Details' : tab}
                  </span>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div id="description" data-aos="fade-up" className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="w-1 h-6 bg-[#00a8ff] rounded-full"></span> Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px] p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                {property.description || `Welcome to premium urban living in ${property.location || property.city}. This beautiful property offers a perfect blend of luxury and comfort.\n\nDesigned with modern architecture and premium fittings, it ensures a superior lifestyle for you and your family.`}
              </p>
            </div>

            {/* Property Overview */}
            <div id="overview" data-aos="fade-up" className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-orange-50 text-[#f39c12] rounded-xl shadow-sm">
                  <Home size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Property Overview</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Area', val: property.specifications?.totalArea || property.area, suffix: 'sqft', icon: <Square size={16} /> },
                  { label: 'Built-up Area', val: property.specifications?.builtUpArea || property.area, suffix: 'sqft', icon: <Square size={16} /> },
                  { label: 'Configuration', val: property.bhk, suffix: 'BHK', icon: <BedDouble size={16} /> },
                  { label: 'Bathrooms', val: property.bathrooms, suffix: '', icon: <Bath size={16} /> },
                  { label: 'Balconies', val: property.specifications?.balconies, suffix: '', icon: <Compass size={16} /> },
                  { label: 'Facing', val: property.facing, suffix: '', icon: <Compass size={16} /> },
                  { label: 'Floors', val: property.specifications?.floors, suffix: '', icon: <Car size={16} /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#00a8ff]/30 hover:shadow-md transition-all duration-300 group">
                    <div className="p-2 bg-white rounded-lg text-gray-400 group-hover:text-[#00a8ff] transition-colors shadow-sm">{item.icon}</div>
                    <div>
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-[15px] font-bold text-gray-900">{item.val || "-"} <span className="text-xs text-gray-500 font-normal">{item.val && item.suffix}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address / Map Section */}
            <div id="address" data-aos="fade-up" className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="w-1 h-6 bg-[#00a8ff] rounded-full"></span> Location Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10 mb-8 text-[15px] bg-gray-50 p-6 rounded-xl border border-gray-100">
                {[
                  { k: 'Address', v: property.fullAddress || property.location },
                  { k: 'City', v: property.city },
                  { k: 'State', v: property.location?.state || "Tamil Nadu" },
                  { k: 'Zip Code', v: property.location?.pincode || "638012" },
                  { k: 'Area', v: property.location },
                  { k: 'Country', v: 'India' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-200 pb-3 last:border-0 md:[&:nth-last-child(-n+2)]:border-0">
                    <span className="font-bold text-gray-700">{item.k}</span>
                    <span className="text-gray-500 text-right">{item.v}</span>
                  </div>
                ))}
              </div>

              {/* Map embedded */}
              <div className="w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden relative shadow-inner border border-gray-100 group">
                <iframe
                  src={property.mapUrl && (property.mapUrl.includes('embed') || property.mapUrl.includes('<iframe'))
                    ? (property.mapUrl.match(/src="([^"]+)"/)?.[1] || property.mapUrl)
                    : `https://maps.google.com/maps?q=${encodeURIComponent(property.fullAddress || (property.location + ', ' + property.city))}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                  className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>

            {/* Contact Information & Enquire Form */}
            <div id="contact" data-aos="fade-up" className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">

              {/* Agent Card (Advanced styling) */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-10 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center text-gray-400 shrink-0 border-4 border-white/20 shadow-lg">
                      <User size={48} />
                    </div>
                    <div className="text-center sm:text-left mt-2">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <span className="text-[#6cc133]"><CheckCircle size={18} fill="currentColor" className="text-white" /></span>
                        <span className="text-2xl font-bold">{agentName}</span>
                      </div>
                      <div className="text-gray-300 text-sm mb-4">Professional Real Estate Consultant | {property.city}</div>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm font-medium">
                        <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm"><Phone size={16} /> {agentPhone}</span>
                        <a
                          href={`https://wa.me/${agentPhone.replace(/[^0-9]/g, '')}?text=Hi! I am interested in ${property.title}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 bg-[#25D366]/20 text-[#25D366] px-3 py-1.5 rounded-lg backdrop-blur-sm hover:bg-[#25D366]/30 transition-colors"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/properties" className="bg-white text-gray-900 px-6 py-2.5 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg mt-2 sm:mt-0 whitespace-nowrap">
                    View Listings
                  </Link>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="w-1 h-6 bg-[#00a8ff] rounded-full"></span> Enquire About This Property</h3>

              <form onSubmit={handleEnquireSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Your Name</label>
                    <input type="text" placeholder="Enter your name" required value={enquireForm.name} onChange={e => setEnquireForm({ ...enquireForm, name: e.target.value })} className="w-full border-0 bg-white shadow-sm rounded-xl p-4 text-[15px] focus:ring-2 focus:ring-[#00a8ff] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phone Number</label>
                    <input type="text" placeholder="Enter your Phone" required value={enquireForm.phone} onChange={e => setEnquireForm({ ...enquireForm, phone: e.target.value })} className="w-full border-0 bg-white shadow-sm rounded-xl p-4 text-[15px] focus:ring-2 focus:ring-[#00a8ff] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email Address</label>
                    <input type="email" placeholder="Enter your email" required value={enquireForm.email} onChange={e => setEnquireForm({ ...enquireForm, email: e.target.value })} className="w-full border-0 bg-white shadow-sm rounded-xl p-4 text-[15px] focus:ring-2 focus:ring-[#00a8ff] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">I'm a</label>
                    <select value={enquireForm.type} onChange={e => setEnquireForm({ ...enquireForm, type: e.target.value })} className="w-full border-0 bg-white shadow-sm rounded-xl p-4 text-[15px] text-gray-700 focus:ring-2 focus:ring-[#00a8ff] transition-all cursor-pointer">
                      <option>Select Option</option>
                      <option>Buyer</option>
                      <option>Tenant</option>
                      <option>Agent</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Message</label>
                  <textarea
                    rows="4"
                    value={enquireForm.message}
                    onChange={e => setEnquireForm({ ...enquireForm, message: e.target.value })}
                    className="w-full border-0 bg-white shadow-sm rounded-xl p-4 text-[15px] focus:ring-2 focus:ring-[#00a8ff] transition-all resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="bg-gradient-to-r from-[#00a8ff] to-[#0097e6] text-white py-3.5 px-8 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto">
                  Send Enquiry Request
                </button>
              </form>

            </div>

          </div>

          {/* RIGHT COLUMN (SIDEBAR) */}
          <div className="lg:col-span-1">
            <div data-aos="fade-left" data-aos-delay="200" className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden sticky top-32 lg:top-40">

              {/* Sidebar Tabs */}
              <div className="flex bg-gray-50/80 p-2 border-b border-gray-100 gap-2">
                <button
                  className={`flex-1 py-3 px-2 text-sm font-bold rounded-xl transition-all duration-300 ${sidebarTab === 'schedule' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  onClick={() => setSidebarTab('schedule')}
                >
                  Schedule Tour
                </button>
                <button
                  className={`flex-1 py-3 px-2 text-sm font-bold rounded-xl transition-all duration-300 ${sidebarTab === 'request' ? 'bg-white text-[#00a8ff] shadow-sm' : 'text-gray-500 hover:text-[#00a8ff]'}`}
                  onClick={() => setSidebarTab('request')}
                >
                  Request Info
                </button>
              </div>

              <div className="p-8">
                {/* Agent Mini Profile - Refined */}
                <div className="flex items-center gap-4 mb-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                  <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-gray-400">
                    <User size={28} />
                  </div>
                  <div className="text-xs text-gray-600 leading-tight">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[#6cc133]"><CheckCircle size={14} fill="currentColor" className="text-white" /></span>
                      <span className="font-bold text-gray-900 text-sm">{agentName}</span>
                    </div>
                    <div className="text-gray-500">Real Estate Consultant</div>
                    <Link to="/properties" className="text-[#00a8ff] font-bold mt-1.5 inline-block cursor-pointer hover:underline">View Listings →</Link>
                  </div>
                </div>

                <form onSubmit={handleScheduleSubmit}>
                  {sidebarTab === 'schedule' && (
                    <>
                      {/* Date Picker (Horizontal) */}
                      <div className="flex gap-2 justify-between mb-8 items-center bg-gray-50 p-2 rounded-xl">
                        <button type="button" onClick={handlePrevDates} disabled={dateOffset === 0} className={`p-2 rounded-lg transition-colors ${dateOffset === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-white hover:shadow-sm hover:text-gray-900'}`}><ChevronLeft size={18} /></button>
                        <div className="flex gap-2 flex-1 justify-center">
                          {nextDates.map((d, i) => {
                            const isSelected = selectedDateIndex === i;
                            return (
                              <div
                                key={i}
                                onClick={() => setSelectedDateIndex(i)}
                                className={`rounded-xl py-2 px-3 text-center cursor-pointer transition-all duration-300 ${isSelected ? 'bg-white shadow-md ring-2 ring-[#00a8ff] scale-105' : 'hover:bg-white hover:shadow-sm'}`}
                              >
                                <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-[#00a8ff]' : 'text-gray-400'}`}>{d.dayName}</div>
                                <div className={`font-black text-xl leading-none mb-1 ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{d.dayNum}</div>
                                <div className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#00a8ff]' : 'text-gray-400'}`}>{d.monthName}</div>
                              </div>
                            );
                          })}
                        </div>
                        <button type="button" onClick={handleNextDates} className="p-2 rounded-lg text-gray-500 hover:bg-white hover:shadow-sm hover:text-gray-900 transition-colors"><ChevronRight size={18} /></button>
                      </div>

                      <div className="mb-6">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Tour Type</div>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            className={`flex-1 py-3 px-2 text-sm rounded-xl font-bold transition-all duration-300 ${tourType === 'in_person' ? 'bg-[#00a8ff]/10 text-[#00a8ff] ring-2 ring-[#00a8ff] shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setTourType('in_person')}
                          >
                            In Person
                          </button>
                          <button
                            type="button"
                            className={`flex-1 py-3 px-2 text-sm rounded-xl font-bold transition-all duration-300 ${tourType === 'video' ? 'bg-[#00a8ff]/10 text-[#00a8ff] ring-2 ring-[#00a8ff] shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setTourType('video')}
                          >
                            Video Chat
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Form Inputs */}
                  <div className="space-y-4 mb-6">
                    {sidebarTab === 'schedule' && (
                      <div className="relative">
                        <select required value={scheduleForm.time} onChange={e => setScheduleForm({ ...scheduleForm, time: e.target.value })} className="w-full border-0 bg-gray-50 rounded-xl p-4 text-[15px] font-medium text-gray-700 focus:ring-2 focus:ring-[#00a8ff] focus:bg-white transition-all appearance-none cursor-pointer shadow-sm">
                          <option value="">Select Time</option>
                          <option>10:00 AM</option>
                          <option>11:00 AM</option>
                          <option>12:00 PM</option>
                          <option>01:00 PM</option>
                          <option>02:00 PM</option>
                          <option>04:00 PM</option>
                        </select>
                        <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                    )}
                    <input type="text" placeholder="Your Name" required value={scheduleForm.name} onChange={e => setScheduleForm({ ...scheduleForm, name: e.target.value })} className="w-full border-0 bg-gray-50 rounded-xl p-4 text-[15px] focus:ring-2 focus:ring-[#00a8ff] focus:bg-white transition-all shadow-sm" />
                    <input type="text" placeholder="Phone Number" required value={scheduleForm.phone} onChange={e => setScheduleForm({ ...scheduleForm, phone: e.target.value })} className="w-full border-0 bg-gray-50 rounded-xl p-4 text-[15px] focus:ring-2 focus:ring-[#00a8ff] focus:bg-white transition-all shadow-sm" />
                    <input type="email" placeholder="Email Address" required value={scheduleForm.email} onChange={e => setScheduleForm({ ...scheduleForm, email: e.target.value })} className="w-full border-0 bg-gray-50 rounded-xl p-4 text-[15px] focus:ring-2 focus:ring-[#00a8ff] focus:bg-white transition-all shadow-sm" />
                    <textarea placeholder="Any specific questions?" rows="3" value={scheduleForm.message} onChange={e => setScheduleForm({ ...scheduleForm, message: e.target.value })} className="w-full border-0 bg-gray-50 rounded-xl p-4 text-[15px] focus:ring-2 focus:ring-[#00a8ff] focus:bg-white transition-all shadow-sm resize-none"></textarea>
                  </div>

                  <div className="text-xs text-gray-500 font-medium mb-6">
                    By submitting this form I agree to the <span className="text-[#00a8ff] cursor-pointer hover:underline">Terms of Use</span> and <span className="text-[#00a8ff] cursor-pointer hover:underline">Privacy Policy</span>.
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="w-full bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white py-4 rounded-xl text-[15px] font-bold hover:shadow-[0_8px_20px_rgba(46,204,113,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                    {sidebarTab === 'schedule' ? 'Confirm Tour Request' : 'Send Information Request'}
                  </button>

                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper component for the select dropdown arrow
const ChevronDownIcon = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default PropertyDetail;
