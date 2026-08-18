import React, { useState } from 'react';
import { MapPin, BedDouble, Bath, Square, Car, Maximize2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QuickViewModal from './QuickViewModal';

const PropertyCard = ({ property }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div 
        onClick={() => navigate(`/property/${property.slug || property.id}`)}
        className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all flex flex-col h-full cursor-pointer block"
      >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        {/* Permanent gradient overlay for price and bottom icons */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {property.featured && (
            <span className="bg-[#68d320] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wide shadow-sm">
              Featured
            </span>
          )}
          {property.status && property.status.toLowerCase().includes('rent') && !property.featured && (
             <span className="bg-[#68d320] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wide shadow-sm">
               {property.status}
             </span>
          )}
          {property.badges && property.badges.map((badge, index) => (
             <span key={index} className="bg-black/70 text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm shadow-sm">
               {badge}
             </span>
          ))}
        </div>
        
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 justify-end">
          {property.status && !property.status.toLowerCase().includes('rent') && (
            <span className="bg-black/70 text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm">
              {property.status}
            </span>
          )}
          {property.type && (
            <span className="bg-black/70 text-white px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm">
              {property.type}
            </span>
          )}
        </div>

        {/* Bottom Overlay (Price & Actions) */}
        <div className="absolute bottom-3 left-3">
          <div className="text-xl font-bold text-white">{property.price}</div>
        </div>
        
        <div className="absolute bottom-3 right-3 flex gap-2">
          <div 
            onClick={(e) => { e.stopPropagation(); setShowQuickView(true); }}
            className="w-8 h-8 flex items-center justify-center bg-black/80 rounded border border-transparent hover:border-white transition-all text-white backdrop-blur-sm"
            title="Quick View"
          >
            <Maximize2 size={16} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-white">
        <div>
          <h3 className="text-[15px] leading-tight font-medium text-charcoal-900 group-hover:text-[#00a8ff] transition-colors line-clamp-2 mb-2">
            {property.title}
          </h3>
          
          <p className="text-[13px] text-gray-500 flex items-start gap-1 font-normal mb-3 line-clamp-2">
            <MapPin size={14} className="mt-0.5 shrink-0 text-gray-400" />
            <span>{property.fullAddress || `${property.location}, ${property.city || 'Bangalore'}`}</span>
          </p>

          {property.description && (
             <p className="text-[13px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">
               {property.description}
             </p>
          )}

          {/* Amenities Row */}
          <div className="flex items-center gap-3 text-[13px] text-gray-700 font-bold mb-1">
            {property.bhk && (
              <div className="flex items-center gap-1">
                <BedDouble size={16} className="text-gray-500 font-normal" strokeWidth={1.5} />
                <span>{property.bhk}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath size={16} className="text-gray-500 font-normal" strokeWidth={1.5} />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.parking && (
              <div className="flex items-center gap-1">
                <Car size={16} className="text-gray-500 font-normal" strokeWidth={1.5} />
                <span>{property.parking}</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1">
                <Square size={16} className="text-gray-500 font-normal" strokeWidth={1.5} />
                <span>{property.area}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Row */}
        <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100">
          <div className="text-[10px] font-bold text-gray-800 uppercase tracking-wider max-w-[65%] line-clamp-1">
            {property.type || "APARTMENT, RESIDENTIAL"}
          </div>
          <Link 
            to={`/property/${property.slug || property.id}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#00a8ff] hover:bg-[#0097e6] text-white text-[13px] font-bold px-4 py-1.5 rounded transition"
          >
            Details
          </Link>
        </div>
      </div>
      </div>
      
      {showQuickView && (
        <QuickViewModal property={property} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};

export default PropertyCard;
