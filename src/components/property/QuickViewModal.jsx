import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Maximize2, MapPin, BedDouble, Bath, Square, Car, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ property, onClose }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Combine featured image and gallery for the slider
  const allImages = property.image ? [property.image] : [];
  if (property.gallery && Array.isArray(property.gallery)) {
    property.gallery.forEach(img => {
      if (img !== property.image) allImages.push(img);
    });
  }

  // Fallback if no images
  if (allImages.length === 0) {
    allImages.push("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80");
  }

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-2 md:p-6"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-7xl h-[95vh] md:h-[85vh] rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Left Side: Image Slider */}
        <div className="w-full md:w-[65%] relative h-[45%] md:h-full bg-gray-100 group">
          <img 
            src={allImages[currentImgIndex]} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          {/* Slider Controls */}
          {allImages.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 flex items-center justify-center hover:bg-[#00a8ff] transition-colors backdrop-blur-sm"
              >
                <ChevronLeft size={30} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 flex items-center justify-center hover:bg-[#00a8ff] transition-colors backdrop-blur-sm"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}
        </div>

        {/* Right Side: Property Details */}
        <div className="w-full md:w-[35%] p-6 md:p-8 flex flex-col h-[55%] md:h-full overflow-y-auto relative">
          
          {/* Top Right Action Icons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Link 
              to={`/property/${property.slug || property.id}`}
              className="text-gray-400 hover:text-[#00a8ff] transition-colors"
              title="Full Details"
            >
              <Maximize2 size={20} />
            </Link>
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4 pr-16">
            {property.status && (
               <span className="bg-gray-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm">
                 {property.status}
               </span>
            )}
            {property.badges && property.badges.map((badge, idx) => (
              <span key={idx} className="bg-gray-500 text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm">
                {badge}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-2 leading-tight">
            {property.title}
          </h2>

          {/* Location */}
          <div className="flex items-start gap-1.5 text-gray-500 text-sm mb-6">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>{property.fullAddress || `${property.location}, ${property.city}`}</span>
          </div>

          {/* Price */}
          <div className="text-xl font-bold text-gray-900 mb-6">
            {property.price}
          </div>

          <div className="w-full h-px bg-gray-100 mb-6"></div>

          {/* Description */}
          {property.description && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Overview</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {property.description}
              </p>
            </div>
          )}

          <div className="w-full h-px bg-gray-100 mb-6"></div>

          {/* Specifications Grid */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-3 gap-y-6 gap-x-4">
              <div className="flex flex-col gap-1">
                <BedDouble size={20} className="text-gray-700" strokeWidth={1.5} />
                <div className="font-bold text-gray-900 text-sm">{property.specifications?.bedrooms || property.bhk || "-"}</div>
                <div className="text-xs text-gray-500">Bedrooms</div>
              </div>
              
              <div className="flex flex-col gap-1">
                <Bath size={20} className="text-gray-700" strokeWidth={1.5} />
                <div className="font-bold text-gray-900 text-sm">{property.specifications?.bathrooms || property.bathrooms || "-"}</div>
                <div className="text-xs text-gray-500">Bathrooms</div>
              </div>

              <div className="flex flex-col gap-1">
                <Car size={20} className="text-gray-700" strokeWidth={1.5} />
                <div className="font-bold text-gray-900 text-sm">{property.specifications?.parkingSpaces || property.parking || "-"}</div>
                <div className="text-xs text-gray-500">Parking</div>
              </div>

              <div className="flex flex-col gap-1">
                <Square size={20} className="text-gray-700" strokeWidth={1.5} />
                <div className="font-bold text-gray-900 text-sm">{property.specifications?.totalArea || property.area || "-"}</div>
                <div className="text-xs text-gray-500">Total Area (sqft)</div>
              </div>

              <div className="flex flex-col gap-1">
                <Square size={20} className="text-gray-700" strokeWidth={1.5} />
                <div className="font-bold text-gray-900 text-sm">{property.specifications?.builtUpArea || "-"}</div>
                <div className="text-xs text-gray-500">Built-Up (sqft)</div>
              </div>

              <div className="flex flex-col gap-1">
                <Calendar size={20} className="text-gray-700" strokeWidth={1.5} />
                <div className="font-bold text-gray-900 text-sm">{property.specifications?.facing || property.facing || "-"}</div>
                <div className="text-xs text-gray-500">Facing</div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 mb-6"></div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 text-xs rounded-full font-medium border border-blue-100">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {property.amenities && property.amenities.length > 0 && (
            <div className="w-full h-px bg-gray-100 mb-6"></div>
          )}

          {/* Details Button */}
          <div className="mt-auto pt-4">
            <Link 
              to={`/property/${property.slug || property.id}`}
              className="w-full flex items-center justify-center bg-[#00a8ff] text-white py-3 rounded-md font-bold hover:bg-[#0097e6] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Details
            </Link>
          </div>
          
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QuickViewModal;
