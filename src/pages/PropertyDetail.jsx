import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { properties } from '../data/properties';
import { MapPin, BedDouble, Bath, Square, Compass, Car, CheckCircle, Phone, ArrowLeft } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const found = properties.find(p => p.id === parseInt(id));
    setProperty(found);
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Property Not Found</h2>
        <Link to="/properties" className="px-6 py-2 bg-primary-900 text-white rounded font-bold hover:bg-primary-800 transition-colors">
          Back to Properties
        </Link>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in the property: ${property.title} (${property.price}) located at ${property.location}. Could you provide more details?`;
    window.open(`https://wa.me/919900000494?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 font-sans pb-20">
      <Helmet>
        <title>{property.title} in {property.location} | Hi-Tech Estates</title>
        <meta name="description" content={`Check out this ${property.type} at ${property.location}. ${property.price}. Find more details and schedule a site visit.`} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
          <Link to="/" className="hover:text-primary-900 transition-colors">Home</Link> / 
          <Link to="/properties" className="hover:text-primary-900 transition-colors">Properties</Link> / 
          <span className="text-charcoal-900 truncate">{property.title}</span>
        </div>

        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary-900 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">{property.status}</span>
              <span className="bg-white border border-gray-200 text-charcoal-900 px-3 py-1 rounded text-xs font-bold">{property.type}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-charcoal-900 mb-2">{property.title}</h1>
            <p className="text-gray-500 flex items-center gap-1 font-medium">
              <MapPin size={18} className="text-primary-500" />
              {property.location}, {property.city}
            </p>
          </div>
          <div className="text-left md:text-right">
            <div className="text-3xl md:text-4xl font-black text-primary-600">{property.price}</div>
            <p className="text-sm text-gray-500 font-medium mt-1">Negotiable</p>
          </div>
        </div>

        {/* Media Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
            {property.video ? (
              <iframe 
                src={property.video} 
                title="Property Video"
                className="w-full h-full object-cover border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
            )}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col">
            <h3 className="text-xl font-bold text-charcoal-900 mb-6 border-b pb-4">Key Information</h3>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 flex-grow">
              {property.bhk && (
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><BedDouble size={14}/> Bedrooms</p>
                  <p className="font-bold text-charcoal-900">{property.bhk} BHK</p>
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><Bath size={14}/> Bathrooms</p>
                  <p className="font-bold text-charcoal-900">{property.bathrooms}</p>
                </div>
              )}
              {property.area && (
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><Square size={14}/> Built-up Area</p>
                  <p className="font-bold text-charcoal-900">{property.area}</p>
                </div>
              )}
              {property.facing && (
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><Compass size={14}/> Facing</p>
                  <p className="font-bold text-charcoal-900">{property.facing}</p>
                </div>
              )}
              {property.parking && (
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><Car size={14}/> Parking</p>
                  <p className="font-bold text-charcoal-900">{property.parking}</p>
                </div>
              )}
              {property.furnishing && (
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><CheckCircle size={14}/> Furnishing</p>
                  <p className="font-bold text-charcoal-900">{property.furnishing}</p>
                </div>
              )}
            </div>

            <div className="mt-8 space-y-3">
              <button 
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] text-white font-bold py-3 px-4 rounded hover:bg-[#1ebd5a] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </button>
              <a 
                href="tel:+919900000494"
                className="w-full bg-charcoal-900 text-white font-bold py-3 px-4 rounded hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Property Description</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                This beautiful {property.type.toLowerCase()} located in the heart of {property.location} offers a perfect blend of luxury and comfort. Designed with modern architecture and premium fittings, it ensures a superior lifestyle for you and your family.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Enjoy excellent connectivity to major IT hubs, educational institutions, and hospitals. The property is well-ventilated, Vaastu compliant, and comes with state-of-the-art amenities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Key Features & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {property.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary-500" />
                    <span className="text-charcoal-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full min-h-[400px] flex flex-col">
              <h3 className="text-xl font-bold text-charcoal-900 mb-4">Location Map</h3>
              {property.mapUrl ? (
                <div className="flex-grow rounded-lg overflow-hidden w-full h-[300px]">
                  <iframe 
                    src={property.mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  ></iframe>
                </div>
              ) : (
                <div className="flex-grow rounded-lg bg-gray-100 flex items-center justify-center min-h-[300px]">
                  <p className="text-gray-500 font-medium flex flex-col items-center gap-2">
                    <MapPin size={32} className="text-gray-400" />
                    Map not available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetail;
