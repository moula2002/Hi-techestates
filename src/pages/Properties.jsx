import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropertyCard from '../components/property/PropertyCard';
import { locations, propertyTypes, bhkOptions, budgetRanges, rentalBudgetRanges, furnishOptions, statusOptions } from '../data/properties';
import { ChevronRight, ChevronLeft, Filter } from 'lucide-react';

const Properties = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [apiProperties, setApiProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState({
    location: queryParams.get('location') || '',
    type: queryParams.get('type') || 'All Type',
    bhk: queryParams.get('bhk') || '',
    budget: queryParams.get('budget') || '',
    status: 'All', // Sale/Rent
    furnishing: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://hi-techserver.onrender.com/api/properties');
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        
        // Map backend schema to frontend structure so PropertyCard works without breaking
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
        setError(null);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  // Client-side filtering logic
  const filteredProperties = apiProperties.filter(p => {
    if (filter.location && p.location !== filter.location) return false;
    if (filter.type !== 'All Type' && filter.type !== '' && p.type !== filter.type) return false;
    
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

  // Combine static types with any new dynamic types from the API
  const dynamicTypes = apiProperties.map(p => p.type).filter(Boolean);
  const uniqueTypes = [...new Set([...propertyTypes, ...dynamicTypes])];
  const allPropertyTypes = ['All Type', ...uniqueTypes];
  const allStatus = ['All', ...statusOptions];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 font-sans pb-20">
      <Helmet>
        <title>Properties for Sale & Rent in Bangalore | Hi-Tech Estates</title>
        <meta name="description" content="Browse the best properties for sale and rent in Bangalore. Use our advanced filters to find your perfect home or investment." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Breadcrumbs */}
        <div className="mb-8 flex justify-between items-end" data-aos="fade-up">
          <div>
            <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Properties</h1>
            <div className="text-sm text-gray-500 font-medium">
              Home / Properties
            </div>
          </div>
          <button 
            className="lg:hidden p-2 bg-white border border-gray-200 rounded text-charcoal-900 font-bold flex gap-2 items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Filters */}
          <div className={`w-full lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`} data-aos="fade-right">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-charcoal-900 text-lg">Filters</h3>
                <button 
                  onClick={() => setFilter({location: '', type: 'All Type', bhk: '', budget: '', status: 'All', furnishing: ''})}
                  className="text-xs text-primary-600 font-bold hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Status (Buy/Rent) */}
              <div className="mb-6">
                <div className="flex p-1 bg-gray-100 rounded-lg">
                  {allStatus.map(status => (
                    <button
                      key={status}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${filter.status === status ? 'bg-white shadow-sm text-primary-900' : 'text-charcoal-600'}`}
                      onClick={() => setFilter({...filter, status})}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Location</label>
                <select 
                  className="w-full p-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary-500 bg-gray-50"
                  value={filter.location}
                  onChange={(e) => setFilter({...filter, location: e.target.value})}
                >
                  <option value="">Any Location</option>
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Property Type</label>
                <div className="space-y-2">
                  {allPropertyTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="propertyType" 
                        value={type}
                        checked={filter.type === type}
                        onChange={(e) => setFilter({...filter, type: e.target.value})}
                        className="w-4 h-4 text-primary-900 focus:ring-primary-900 border-gray-300"
                      />
                      <span className={`text-sm ${filter.type === type ? 'font-bold text-charcoal-900' : 'text-charcoal-600 group-hover:text-charcoal-900'}`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BHK */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">BHK</label>
                <select 
                  className="w-full p-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary-500 bg-gray-50"
                  value={filter.bhk}
                  onChange={(e) => setFilter({...filter, bhk: e.target.value})}
                >
                  <option value="">Any BHK</option>
                  {bhkOptions.map(bhk => <option key={bhk} value={bhk}>{bhk}</option>)}
                </select>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Budget</label>
                <select 
                  className="w-full p-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary-500 bg-gray-50"
                  value={filter.budget}
                  onChange={(e) => setFilter({...filter, budget: e.target.value})}
                >
                  <option value="">Any Budget</option>
                  {(filter.status === 'For Rent' || filter.status === 'For Lease' ? rentalBudgetRanges : budgetRanges).map(budget => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>

              {/* Furnishing */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-charcoal-600 uppercase mb-2">Furnishing</label>
                <select 
                  className="w-full p-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary-500 bg-gray-50"
                  value={filter.furnishing}
                  onChange={(e) => setFilter({...filter, furnishing: e.target.value})}
                >
                  <option value="">Any Furnishing</option>
                  {furnishOptions.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

            </div>
          </div>

          {/* Right Side Results */}
          <div className="w-full lg:w-3/4">
            <div className="mb-4 flex justify-between items-center text-sm font-medium text-gray-500">
              <span>Showing {filteredProperties.length} results</span>
            </div>

            {loading ? (
              <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900 mb-4"></div>
                <h3 className="text-xl font-bold text-charcoal-900">Loading properties...</h3>
              </div>
            ) : error ? (
              <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                <h3 className="text-xl font-bold text-red-600 mb-3">Error</h3>
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
                  <div className="mt-12 flex justify-center items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 text-charcoal-900 hover:bg-gray-100 disabled:opacity-50" disabled>
                      <ChevronLeft size={16} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded bg-primary-900 text-white font-bold">1</button>
                    <button className="w-auto px-4 h-10 flex items-center justify-center rounded border border-gray-300 text-charcoal-900 hover:bg-gray-100 text-sm font-bold gap-1">
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-3">No properties found</h3>
                <p className="text-gray-500 mb-6 max-w-md">We couldn't find any properties matching your current filters. Try adjusting them to see more results.</p>
                <button 
                  onClick={() => setFilter({location: '', type: 'All Type', bhk: '', budget: '', status: 'All', furnishing: ''})}
                  className="px-6 py-2 bg-primary-900 text-white font-bold rounded hover:bg-primary-800 transition-colors"
                >
                  Clear All Filters
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
