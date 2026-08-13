import React from 'react';
import { MapPin, BedDouble, Bath, Square, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all flex flex-col h-full cursor-pointer block">
      {/* Image Section */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {property.status && (
          <div className="absolute top-4 left-4 bg-primary-900 text-white px-3 py-1 rounded text-xs font-bold shadow-md uppercase tracking-wider">
            {property.status}
          </div>
        )}
        {property.type && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-charcoal-900 px-3 py-1 rounded text-xs font-bold shadow-md">
            {property.type}
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors line-clamp-1">{property.title}</h3>
            <div className="text-lg font-black text-primary-600 whitespace-nowrap">{property.price}</div>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1 font-medium mb-4">
            <MapPin size={16} className="text-gray-400 shrink-0" />
            <span className="truncate">{property.location}, {property.city || 'Bangalore'}</span>
          </p>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-4 border-t border-gray-100">
            {property.bhk && (
              <div className="flex items-center gap-2 text-sm text-charcoal-700 font-medium">
                <BedDouble size={16} className="text-primary-500" />
                <span>{property.bhk} BHK</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-2 text-sm text-charcoal-700 font-medium">
                <Bath size={16} className="text-primary-500" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-2 text-sm text-charcoal-700 font-medium">
                <Square size={16} className="text-primary-500" />
                <span>{property.area}</span>
              </div>
            )}
            {property.facing && (
              <div className="flex items-center gap-2 text-sm text-charcoal-700 font-medium">
                <Compass size={16} className="text-primary-500" />
                <span>{property.facing} Facing</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
