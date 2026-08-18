import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropertyCard from '../components/property/PropertyCard';
import UniqueLoader from '../components/ui/UniqueLoader';
import { useApiCache } from '../hooks/useApiCache';
import { mapApiPropertyToClient } from '../utils/propertyMapper';
const Locality = () => {
  const { areaName } = useParams();

  // Format the URL slug back to a readable name
  const formattedAreaName = areaName
    ? areaName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'This Locality';

  const { data, loading, error } = useApiCache('https://hi-techserver-zd1d.onrender.com/api/properties', 'hi-tech-properties');

  const [apiProperties, setApiProperties] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      const mappedProperties = (Array.isArray(data) ? data : []).map(mapApiPropertyToClient);
      setApiProperties(mappedProperties);
    }
  }, [data]);

  const localityProperties = apiProperties.filter(
    p => p.location && p.location.toLowerCase() === formattedAreaName.toLowerCase()
  );

  const displayProperties = localityProperties.length > 0 ? localityProperties : apiProperties.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50">
        <UniqueLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Helmet>
        <title>Flats, Apartments & Plots for Sale in {formattedAreaName} | Hi-Tech Estates</title>
        <meta name="description" content={`Find the best properties for sale and rent in ${formattedAreaName}, Bangalore. Explore 3 BHK apartments, villas, and commercial spaces with Hi-Tech Estates.`} />
        <meta name="keywords" content={`Flats for sale in ${formattedAreaName}, 3 BHK apartments for sale in ${formattedAreaName}, Properties for rent in ${formattedAreaName}, Plots for sale in ${formattedAreaName}, Real estate ${formattedAreaName}`} />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img
            src="/assets/images/img-17.jpg"
            alt={`Properties in ${formattedAreaName}`}
            className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_linear_infinite_alternate]"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80" }}
          />
          {/* Very Light Overlay */}
          <div className="absolute inset-0 bg-white/20"></div>
          {/* Top white gradient specifically for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-16" data-aos="zoom-in">
          <div className="inline-block bg-white/30 backdrop-blur-md px-6 md:px-10 py-6 rounded-2xl shadow-lg border border-white/50">
            <div className="mb-2 text-charcoal-700 font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-primary-700 transition-colors">Home</Link> /
              <span>{formattedAreaName}</span>
            </div>
            <p className="text-primary-700 font-bold tracking-widest uppercase mb-2 text-xs">Location Focus</p>
            <h1 className="text-3xl md:text-4xl font-black text-charcoal-900 mb-4 font-serif">Properties in {formattedAreaName}</h1>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full mb-4 shadow-sm"></div>
            <p className="text-sm md:text-base text-charcoal-900 leading-relaxed font-bold max-w-xl mx-auto">
              Explore the best flats, apartments, plots, and commercial spaces available for sale and rent in {formattedAreaName}.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-charcoal-900 mb-2">Featured Listings in {formattedAreaName}</h2>
            <div className="w-16 h-1 bg-primary-500 rounded-full"></div>
          </div>
          <Link to={`/properties?location=${formattedAreaName}`} className="text-sm font-bold text-primary-600 hover:text-primary-900">
            View All Properties →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* SEO Content Block */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-charcoal-900 mb-4">Why invest in {formattedAreaName}?</h3>
          <p className="text-charcoal-600 leading-relaxed mb-4">
            {formattedAreaName} is one of Bangalore's most sought-after real estate destinations, offering excellent connectivity, premium lifestyle amenities, and strong appreciation potential. Whether you are looking for a 3 BHK apartment, a luxury villa, or a commercial office space, {formattedAreaName} provides diverse options to suit every budget and requirement.
          </p>
          <p className="text-charcoal-600 leading-relaxed">
            Hi-Tech Estates ensures you get the best deals with zero hassle. We verify every property listing to guarantee you a safe and secure investment. Explore our latest properties for sale in {formattedAreaName} or contact us for personalized assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Locality;
