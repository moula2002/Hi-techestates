import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropertyCard from '../components/property/PropertyCard';
// Removed static properties import
import { ChevronRight, ChevronLeft, Filter, Search } from 'lucide-react';
import { useApiCache } from '../hooks/useApiCache';
import UniqueLoader from '../components/ui/UniqueLoader';
import { mapApiPropertyToClient } from '../utils/propertyMapper';
import heroImg from '../assets/image.png';

const Properties = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [apiProperties, setApiProperties] = useState([]);

  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK', '5 BHK', 'Villa', 'Plot'];
  const budgetRanges = ['Below 50 Lacs', '50 Lacs - 1 Cr', '1 Cr - 2 Cr', '2 Cr - 5 Cr', 'Above 5 Cr'];
  const rentalBudgetRanges = ['Below 10k', '10k - 20k', '20k - 50k', '50k - 1 Lakh', 'Above 1 Lakh'];
  const furnishOptions = ['Fully Furnished', 'Semi Furnished', 'Unfurnished'];
  const statusOptions = ['For Sale', 'For Rent', 'For Lease'];

  const [filter, setFilter] = useState({
    location: queryParams.get('location') || '',
    type: queryParams.get('type') || 'All Type',
    category: queryParams.get('category') || '',
    bhk: queryParams.get('bhk') || '',
    budget: queryParams.get('budget') || '',
    status: 'All', // Sale/Rent
    furnishing: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const { data, loading, error } = useApiCache('https://hi-techserver-zd1d.onrender.com/api/properties', 'hi-tech-properties');

  useEffect(() => {
    if (data) {
      const mappedProperties = (Array.isArray(data) ? data : []).map(mapApiPropertyToClient);
      setApiProperties(mappedProperties);
    }
  }, [data]);

  // Client-side filtering logic
  const filteredProperties = apiProperties.filter(p => {
    if (filter.location && p.location !== filter.location) return false;
    if (filter.type !== 'All Type' && filter.type !== '' && p.type !== filter.type) return false;
    
    if (filter.category) {
      const pType = (p.type || '').toLowerCase();
      const cName = filter.category.toLowerCase();
      if (pType !== cName && !cName.includes(pType) && !pType.includes(cName.replace(/s$/, '')) && cName.replace(/st$/, 't') !== pType) return false;
    }
    
    if (filter.bhk) {
      const pBhkNum = parseInt(p.bhk);
      if (filter.bhk === '4+ BHK') {
        if (!pBhkNum || pBhkNum < 4) return false;
      } else {
        const filterBhkNum = parseInt(filter.bhk);
        if (pBhkNum !== filterBhkNum) return false;
      }
    }

    if (filter.status !== 'All' && p.status !== filter.status) return false;
    if (filter.furnishing && p.furnishing !== filter.furnishing) return false;
    
    // Simplistic Budget Filter (for mockup purposes)
    if (filter.budget && p.price) {
      if (filter.budget === 'Below 50 Lacs' && (!p.price.includes('Lacs') || parseInt(p.price.replace(/\D/g, '')) > 50)) return false;
      if (filter.budget.includes('Cr') && p.price.includes('Lacs')) return false;
    }

    return true;
  });

  const dynamicTypes = apiProperties.map(p => p.type).filter(Boolean);
  const uniqueTypes = [...new Set(dynamicTypes)];
  const allPropertyTypes = ['All Type', ...uniqueTypes];
  const allStatus = ['All', ...statusOptions];
  
  // Extract dynamic locations from API data
  const uniqueLocations = [...new Set(apiProperties.map(p => p.location).filter(Boolean))].sort();

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      <Helmet>
        <title>Properties for Sale & Rent in Bangalore | Hi-Tech Estates</title>
        <meta name="description" content="Browse the best properties for sale and rent in Bangalore. Use our advanced filters to find your perfect home or investment." />
      </Helmet>

      {/* Premium Hero Section */}
      <div className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80" 
            alt="Luxury Properties" 
            className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_linear_infinite_alternate]"
          />
          {/* Very Light Overlay */}
          <div className="absolute inset-0 bg-white/20"></div>
          {/* Top white gradient specifically for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 pt-8" data-aos="fade-up">
          <div className="inline-block bg-white/30 backdrop-blur-md px-6 md:px-10 py-6 rounded-2xl shadow-lg border border-white/50">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal-900 mb-4 tracking-tight">
              Exclusive Properties
            </h1>
            <div className="flex items-center justify-center gap-3 text-charcoal-800 text-xs md:text-sm font-bold tracking-wide uppercase">
              <span className="hover:text-primary-600 transition-colors cursor-pointer" onClick={() => window.location.href = '/'}>Home</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-sm"></span>
              <span className="text-primary-900 font-black">Properties</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10 md:-mt-16">
        
        {/* Mobile Filter Toggle */}
        <div className="flex justify-end mb-4 lg:hidden" data-aos="fade-up">
          <button 
            className="px-5 py-3 bg-white border border-gray-200 rounded-xl text-primary-900 font-bold flex gap-2 items-center shadow-lg shadow-gray-200/50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filters - Light Premium Theme */}
          <div className={`w-full lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`} data-aos="fade-right">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 text-charcoal-900 relative overflow-hidden">
              {/* Decorative backgrounds */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 blur-[60px] rounded-full pointer-events-none -mr-20 -mt-20"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="font-bold text-charcoal-900 text-2xl font-serif tracking-wide flex items-center gap-2">
                  <Filter size={20} className="text-primary-600" />
                  Filters
                </h3>
                <button 
                  onClick={() => setFilter({location: '', type: 'All Type', category: '', bhk: '', budget: '', status: 'All', furnishing: ''})}
                  className="text-xs text-primary-700 font-bold hover:text-primary-900 transition-colors uppercase tracking-widest bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6 relative z-10">
                {/* Status (Buy/Rent) */}
                <div>
                  <div className="flex p-1.5 bg-gray-100 rounded-xl border border-gray-200 shadow-inner">
                    {allStatus.map(status => (
                      <button
                        key={status}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 ${filter.status === status ? 'bg-primary-600 text-white shadow-md transform scale-[1.02]' : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-gray-200'}`}
                        onClick={() => setFilter({...filter, status})}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-widest mb-2 ml-1">Location</label>
                  <select 
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm text-charcoal-700 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all appearance-none cursor-pointer shadow-sm"
                    value={filter.location}
                    onChange={(e) => setFilter({...filter, location: e.target.value})}
                  >
                    <option value="" className="bg-white text-charcoal-700">Any Location</option>
                    {uniqueLocations.map(loc => <option key={loc} value={loc} className="bg-white text-charcoal-700">{loc}</option>)}
                  </select>
                </div>

                {/* Property Type */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-widest mb-4 ml-1">Property Type</label>
                  <div className="space-y-3">
                    {allPropertyTypes.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${filter.type === type ? 'border-primary-500 bg-primary-50' : 'border-gray-300 group-hover:border-primary-400'}`}>
                          {filter.type === type && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full scale-100 animate-pulse-shadow"></div>}
                        </div>
                        <input 
                          type="radio" 
                          name="propertyType" 
                          value={type}
                          checked={filter.type === type}
                          onChange={(e) => setFilter({...filter, type: e.target.value})}
                          className="hidden"
                        />
                        <span className={`text-sm font-medium transition-colors ${filter.type === type ? 'text-charcoal-900 font-bold' : 'text-charcoal-600 group-hover:text-charcoal-900'}`}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* BHK */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-widest mb-2 ml-1">BHK</label>
                  <select 
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm text-charcoal-700 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all appearance-none cursor-pointer shadow-sm"
                    value={filter.bhk}
                    onChange={(e) => setFilter({...filter, bhk: e.target.value})}
                  >
                    <option value="" className="bg-white text-charcoal-700">Any BHK</option>
                    {bhkOptions.map(bhk => <option key={bhk} value={bhk} className="bg-white text-charcoal-700">{bhk}</option>)}
                  </select>
                </div>

                {/* Budget */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-widest mb-2 ml-1">Budget</label>
                  <select 
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm text-charcoal-700 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all appearance-none cursor-pointer shadow-sm"
                    value={filter.budget}
                    onChange={(e) => setFilter({...filter, budget: e.target.value})}
                  >
                    <option value="" className="bg-white text-charcoal-700">Any Budget</option>
                    {(filter.status === 'For Rent' || filter.status === 'For Lease' ? rentalBudgetRanges : budgetRanges).map(budget => (
                      <option key={budget} value={budget} className="bg-white text-charcoal-700">{budget}</option>
                    ))}
                  </select>
                </div>

                {/* Furnishing */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-widest mb-2 ml-1">Furnishing</label>
                  <select 
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm text-charcoal-700 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all appearance-none cursor-pointer shadow-sm"
                    value={filter.furnishing}
                    onChange={(e) => setFilter({...filter, furnishing: e.target.value})}
                  >
                    <option value="" className="bg-white text-charcoal-700">Any Furnishing</option>
                    {furnishOptions.map(f => <option key={f} value={f} className="bg-white text-charcoal-700">{f}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Results */}
          <div className="w-full lg:w-3/4 pt-4 lg:pt-0">
            <div className="mb-8 flex justify-between items-center text-sm font-bold text-charcoal-600 uppercase tracking-wide">
              <span>Showing <span className="text-primary-600 text-base">{filteredProperties.length}</span> luxury properties</span>
            </div>

            {loading ? (
              <div className="bg-white p-16 text-center rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
                <UniqueLoader />
              </div>
            ) : error ? (
              <div className="bg-white p-16 text-center rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">!</span>
                </div>
                <h3 className="text-xl font-bold text-red-600 mb-3">Connection Error</h3>
                <p className="text-gray-500">{error}</p>
              </div>
            ) : filteredProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property, idx) => (
                    <div key={property.id} data-aos="fade-up" data-aos-delay={(idx % 6) * 100}>
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {filteredProperties.length > 6 && (
                  <div className="mt-16 flex justify-center items-center gap-3">
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-charcoal-400 hover:border-primary-500 hover:text-primary-500 transition-colors disabled:opacity-50" disabled>
                      <ChevronLeft size={20} />
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-900 text-white font-bold shadow-lg shadow-primary-900/30">1</button>
                    <button className="w-auto px-6 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-charcoal-700 hover:border-primary-500 hover:text-primary-500 text-sm font-bold gap-2 transition-colors">
                      Next <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white p-16 text-center rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center justify-center min-h-[500px]" data-aos="zoom-in">
                <div className="w-24 h-24 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mb-6">
                  <Search size={40} className="opacity-50" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-charcoal-900 mb-4">No exclusive matches</h3>
                <p className="text-charcoal-500 mb-8 max-w-md text-lg leading-relaxed">
                  We couldn't find any luxury properties matching these specific filters in our exclusive portfolio.
                </p>
                <button 
                  onClick={() => setFilter({location: '', type: 'All Type', category: '', bhk: '', budget: '', status: 'All', furnishing: ''})}
                  className="px-8 py-4 bg-primary-900 text-white font-bold rounded-xl hover:bg-primary-800 hover:shadow-[0_10px_30px_rgba(8,42,92,0.25)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  Explore All Properties
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
