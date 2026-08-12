import React, { useState } from 'react';
import PropertyCard from '../components/property/PropertyCard';
import { properties, locations, propertyTypes, budgetRanges } from '../data/properties';
import { Filter } from 'lucide-react';

const Properties = () => {
  const [filter, setFilter] = useState({
    location: '',
    type: '',
    status: '',
  });

  // Simple client-side filtering
  const filteredProperties = properties.filter(p => {
    if (filter.location && p.location !== filter.location) return false;
    if (filter.type && p.type !== filter.type) return false;
    if (filter.status && p.status !== filter.status) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-charcoal-900/70 z-10"></div>
          <img
            src="/assets/images/img-18.jpg"
            alt="Our Properties"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary-500 font-bold tracking-widest uppercase mb-4 text-sm">Find Your Next Home</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-serif">Properties</h1>
          <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
            Discover our hand-picked selection of premium properties.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter Bar */}
        <div className="mb-10">
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-charcoal-900 font-bold w-full md:w-auto px-4 border-r border-gray-100">
              <Filter size={20} className="text-primary-500" />
              Filters
            </div>
            
            <select 
              className="w-full md:w-auto flex-1 p-3 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              value={filter.status}
              onChange={(e) => setFilter({...filter, status: e.target.value})}
            >
              <option value="">Any Status (Buy/Rent)</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>

            <select 
              className="w-full md:w-auto flex-1 p-3 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              value={filter.location}
              onChange={(e) => setFilter({...filter, location: e.target.value})}
            >
              <option value="">Any Location</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>

            <select 
              className="w-full md:w-auto flex-1 p-3 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              value={filter.type}
              onChange={(e) => setFilter({...filter, type: e.target.value})}
            >
              <option value="">Any Property Type</option>
              {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center text-sm font-bold text-gray-500">
          <span>Showing {filteredProperties.length} properties</span>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-charcoal-900 mb-2">No properties found</h3>
            <p className="text-charcoal-600">Try adjusting your filters to find what you're looking for.</p>
            <button 
              onClick={() => setFilter({location:'', type:'', status:''})}
              className="mt-6 px-6 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
