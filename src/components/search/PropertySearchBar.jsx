import React from 'react';
import { Search, MapPin, Home, IndianRupee, BedDouble } from 'lucide-react';
import { locations, propertyTypes, bhkOptions, budgetRanges } from '../../data/properties';

const PropertySearchBar = () => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl w-full max-w-5xl mx-auto border-t-4 border-primary-500">
      
      {/* Quick Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4 overflow-x-auto no-scrollbar">
        {['Buy', 'Rent', 'Sell', 'Lease'].map((tab, idx) => (
          <button 
            key={tab} 
            className={`px-6 py-2 rounded-full font-bold transition-colors whitespace-nowrap ${
              idx === 0 ? 'bg-charcoal-900 text-white' : 'bg-gray-100 text-charcoal-700 hover:bg-primary-500 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Location Dropdown */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Location</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500" />
            <select className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-primary-500 outline-none appearance-none font-medium text-charcoal-800 cursor-pointer">
              <option value="">Any Location</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        </div>

        {/* Budget Dropdown */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Budget</label>
          <div className="relative">
            <IndianRupee size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500" />
            <select className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-primary-500 outline-none appearance-none font-medium text-charcoal-800 cursor-pointer">
              <option value="">Any Budget</option>
              {budgetRanges.map(range => <option key={range} value={range}>{range}</option>)}
            </select>
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Property Type</label>
          <div className="relative">
            <Home size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500" />
            <select className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-primary-500 outline-none appearance-none font-medium text-charcoal-800 cursor-pointer">
              <option value="">Any Type</option>
              {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </div>

        {/* BHK Dropdown */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">BHK</label>
          <div className="relative">
            <BedDouble size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500" />
            <select className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-primary-500 outline-none appearance-none font-medium text-charcoal-800 cursor-pointer">
              <option value="">Any BHK</option>
              {bhkOptions.map(bhk => <option key={bhk} value={bhk}>{bhk}</option>)}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button className="w-full h-[48px] bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30">
            <Search size={20} />
            Search
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertySearchBar;
