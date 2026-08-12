import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MapPin, Star, Building, Key, Paintbrush, PhoneCall, ShieldCheck, Quote } from 'lucide-react';
import PropertySearchBar from '../components/search/PropertySearchBar';
import PropertyCard from '../components/property/PropertyCard';
import { properties, locations } from '../data/properties';

const Home = () => {
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);
  const premiumProperties = properties.filter(p => p.price.includes('Cr') || p.price.includes('L')).slice(0, 3);
  const latestListings = properties.slice().reverse().slice(0, 3);

  const services = [
    { icon: <Key size={32} />, title: 'Buy a Property', desc: 'Find your dream home with our verified property listings across prime locations.' },
    { icon: <Building size={32} />, title: 'Sell Property', desc: 'Get the best market value for your property with our expert marketing and vast network.' },
    { icon: <ShieldCheck size={32} />, title: 'Rent / Lease', desc: 'Hassle-free renting and leasing services for both landlords and tenants.' },
    { icon: <Paintbrush size={32} />, title: 'Interior Design', desc: 'Transform your space with our bespoke, high-quality interior design solutions.' }
  ];

  const testimonials = [
    { name: 'Rahul Sharma', role: 'Homebuyer', text: 'Hi-Tech Estates made finding my dream apartment incredibly easy. Their transparency and professionalism are unmatched in Bangalore.' },
    { name: 'Priya Desai', role: 'Property Seller', text: 'They sold my villa in just 3 weeks at a price higher than I expected. The team handled all paperwork smoothly.' },
    { name: 'Amit Verma', role: 'NRI Investor', text: 'I have been investing through Hi-Tech for 5 years. Their property management and leasing services give me total peace of mind.' }
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col justify-center items-center bg-charcoal-900 overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-charcoal-900/60 to-charcoal-900/95 z-10"></div>
          <img
            src="/assets/images/img-10.jpg"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full text-center mt-8 mb-12 animate-fade-in-up">
          <p className="text-primary-400 font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">Hi-Tech Estates</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-4 drop-shadow-lg font-serif">
            Design Your <span className="text-primary-500">Dreams</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-light drop-shadow">
            Find a Property That Feels Like Home
          </p>

          {/* Quick Action Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Buy', 'Sell', 'Rent', 'Lease'].map((action) => (
              <span key={action} className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-primary-500 hover:border-primary-500 transition-colors cursor-pointer">
                {action}
              </span>
            ))}
          </div>
        </div>

        {/* Search Bar - Overlapping */}
        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-30 transform translate-y-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <PropertySearchBar />
        </div>
      </section>

      {/* spacer for overlapping search bar */}
      <div className="h-24 bg-charcoal-50"></div>

      {/* 2. Featured Properties */}
      <section className="py-20 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Featured Properties" link="/properties" linkText="View All Featured" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Premium Properties */}
      <section className="py-20 bg-white border-t border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Premium Properties" subtitle="Exclusive luxury homes for discerning buyers" link="/properties?type=luxury" linkText="Explore Luxury" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Listings */}
      <section className="py-20 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Latest Listings" subtitle="Fresh on the market today" link="/properties?sort=newest" linkText="View All New" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestListings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Services */}
      <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 font-serif text-white">Our Services</h2>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto">Comprehensive real estate and interior solutions under one roof.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group text-center md:text-left">
                <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform mx-auto md:mx-0">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-primary-100 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Hi-Tech Estates */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary-500 font-bold tracking-widest uppercase mb-2 text-sm">Our Expertise</p>
              <h2 className="text-3xl md:text-5xl font-black text-charcoal-900 mb-6 font-serif leading-tight">Why Choose Hi-Tech Estates?</h2>
              <p className="text-lg text-charcoal-600 mb-8 leading-relaxed">
                With over 15 years of excellence in the Bangalore real estate market, we provide an unmatched level of service, transparency, and expertise to help you find your perfect home or investment.
              </p>
              <ul className="space-y-4">
                {[
                  "100% Verified & Legal Properties",
                  "Expert Negotiation & Documentation",
                  "Zero Brokerage on New Projects",
                  "End-to-End Interior Design Services"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-charcoal-800 font-bold">
                    <CheckCircle className="text-primary-500 shrink-0" size={24} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link to="/about" className="px-8 py-4 bg-charcoal-900 text-white font-bold rounded-lg hover:bg-primary-600 transition-colors inline-block uppercase tracking-wider text-sm shadow-xl shadow-charcoal-900/20">
                  More About Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 rounded-3xl transform translate-x-4 translate-y-4 -z-10 opacity-20"></div>
              <img
                src="/assets/images/img-11.jpg"
                alt="Our Expertise"
                className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="py-24 bg-charcoal-50 border-y border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 font-serif text-charcoal-900">What Our Clients Say</h2>
            <p className="text-charcoal-500 text-lg max-w-2xl mx-auto">Trusted by thousands of families and investors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-charcoal-100 relative">
                <Quote className="absolute top-6 right-6 text-primary-100" size={48} />
                <div className="flex text-primary-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-charcoal-700 italic mb-6 leading-relaxed relative z-10">"{test.text}"</p>
                <div>
                  <h4 className="font-bold text-charcoal-900">{test.name}</h4>
                  <p className="text-sm text-primary-600 font-medium">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Project Gallery Preview */}
      <section className="py-20 bg-charcoal-50 border-t border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Project Gallery" subtitle="A glimpse into our visual showcase" link="/gallery" linkText="View Full Gallery" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 1, url: '/assets/images/img-12.jpg', category: 'Exteriors' },
              { id: 2, url: '/assets/images/img-13.jpg', category: 'Interiors' },
              { id: 3, url: '/assets/images/img-14.jpg', category: 'Commercial' },
              { id: 4, url: '/assets/images/img-15.jpg', category: 'Ongoing Projects' },
            ].map((img) => (
              <div key={img.id} className="group relative h-48 md:h-64 rounded-xl overflow-hidden cursor-pointer shadow-md">
                <img
                  src={img.url}
                  alt={img.category}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-bold">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Areas We Serve */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Areas We Serve" subtitle="Prime locations across Bangalore" link="/properties" linkText="Explore Locations" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {locations.slice(0, 8).map((loc, idx) => (
              <div key={idx} className="group relative h-32 rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={`/assets/images/img-16.jpg`}
                  alt={loc}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                  <MapPin size={16} className="text-primary-400" />
                  <span className="font-bold text-sm">{loc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact Us (Quick Section) */}
      <section className="py-24 bg-charcoal-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black font-serif mb-4">Ready to take the next step?</h2>
              <p className="text-primary-100 text-lg max-w-xl">Whether you're buying, selling, or looking for interior design services, our team is here to help.</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link to="/contact" className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-center uppercase tracking-widest text-sm shadow-xl">
                Contact Us Now
              </Link>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-center uppercase tracking-widest text-sm">
                Call +91 99000 00494
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable Section Header Component
const SectionHeader = ({ title, subtitle, link, linkText }) => (
  <div className="flex flex-col md:flex-row justify-between items-end mb-12">
    <div>
      {subtitle && <p className="text-primary-500 font-bold tracking-widest uppercase mb-2 text-sm">{subtitle}</p>}
      <h2 className="text-3xl md:text-4xl font-black text-charcoal-900 mb-4 font-serif">{title}</h2>
      <div className="w-20 h-1.5 bg-primary-500 rounded-full"></div>
    </div>
    {link && (
      <Link
        to={link}
        className="text-primary-600 font-bold flex items-center gap-2 hover:gap-4 transition-all mt-6 md:mt-0 uppercase tracking-widest text-sm"
      >
        {linkText} <ArrowRight size={18} />
      </Link>
    )}
  </div>
);

export default Home;
