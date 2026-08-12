import React from 'react';
import { MapPin, BedDouble, Bath, Square, Car, PhoneCall, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-charcoal-900 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-md">
          {property.status}
        </div>
        <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded text-sm font-bold shadow-md">
          {property.type}
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-charcoal-900/80 to-transparent p-4">
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{property.title}</h3>
          <p className="text-gray-300 text-sm flex items-center gap-1">
            <MapPin size={14} className="text-primary-500" />
            {property.location}, {property.city}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="mb-4">
          <div className="text-2xl font-black text-charcoal-900 mb-4">{property.price}</div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-charcoal-600 mb-4 border-t border-b border-gray-100 py-4">
            {property.bhk && (
              <div className="flex items-center gap-2">
                <BedDouble size={16} className="text-primary-500" />
                <span><strong className="text-charcoal-900">{property.bhk}</strong> BHK</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-2">
                <Bath size={16} className="text-primary-500" />
                <span><strong className="text-charcoal-900">{property.bathrooms}</strong> Bath</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-2">
                <Square size={16} className="text-primary-500" />
                <span><strong className="text-charcoal-900">{property.area}</strong></span>
              </div>
            )}
            {property.parking && (
              <div className="flex items-center gap-2">
                <Car size={16} className="text-primary-500" />
                <span className="line-clamp-1"><strong className="text-charcoal-900">{property.parking}</strong></span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {property.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="bg-gray-50 border border-gray-100 text-charcoal-600 text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="bg-gray-50 border border-gray-100 text-charcoal-600 text-xs px-2 py-1 rounded">
                +{property.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <a
            href={`tel:+919900000494`}
            className="flex items-center justify-center gap-2 py-2.5 border border-charcoal-900 text-charcoal-900 rounded-lg hover:bg-charcoal-900 hover:text-white transition-colors font-bold text-sm"
          >
            <PhoneCall size={16} />
            Call
          </a>
          <a
            href={`https://wa.me/919900000494?text=I'm interested in ${property.title} located at ${property.location}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white rounded-lg hover:bg-[#1ebd5a] transition-colors font-bold text-sm"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
