import React from 'react';
import { useParams } from 'react-router-dom';
import PropertyCard from '../components/property/PropertyCard';
import { properties } from '../data/properties';

const Locality = () => {
  const { areaName } = useParams();
  
  // Format the URL slug back to a readable name
  // e.g., "bannerghatta-road" -> "Bannerghatta Road"
  const formattedAreaName = areaName
    ? areaName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'This Locality';

  // In a real app, we would filter properties from the database based on the locality.
  // For this mock, we just filter our mock array, falling back to all if none match exactly
  const localityProperties = properties.filter(
    p => p.location.toLowerCase() === formattedAreaName.toLowerCase()
  );

  const displayProperties = localityProperties.length > 0 ? localityProperties : properties.slice(0, 3); // Fallback

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-charcoal-900/70 z-10"></div>
          <img
            src="/assets/images/img-17.jpg"
            alt={`Properties in ${formattedAreaName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary-500 font-bold tracking-widest uppercase mb-4 text-sm">Location Focus</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-serif">Properties in {formattedAreaName}</h1>
          <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
            Explore the best flats, apartments, plots, and commercial spaces available for sale and rent in {formattedAreaName}, Bangalore.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-2">Featured Listings in {formattedAreaName}</h2>
          <div className="w-16 h-1 bg-primary-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* SEO Content Block */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-charcoal-900 mb-4">Why invest in {formattedAreaName}?</h3>
          <p className="text-charcoal-600 leading-relaxed">
            {formattedAreaName} is one of Bangalore's most sought-after real estate destinations, offering excellent connectivity, premium lifestyle amenities, and strong appreciation potential. Whether you are looking for a 3 BHK apartment, a luxury villa, or a commercial office space, {formattedAreaName} provides diverse options to suit every budget and requirement. Hi-Tech Estates ensures you get the best deals with zero hassle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Locality;
