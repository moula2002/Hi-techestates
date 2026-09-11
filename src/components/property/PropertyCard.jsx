import React, { useState, useRef } from 'react';
import { MapPin, BedDouble, Bath, Square, Car, Maximize2, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QuickViewModal from './QuickViewModal';

const PropertyCard = ({ property }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Combine images and video into a single array
  const slides = [];
  if (property.image) slides.push({ type: 'image', url: property.image });
  if (property.video) slides.push({ type: 'video', url: property.video });
  if (property.gallery && property.gallery.length > 0) {
    property.gallery.forEach(img => {
      if (img !== property.image) slides.push({ type: 'image', url: img });
    });
  }
  // Fallback if empty
  if (slides.length === 0) {
    slides.push({ type: 'image', url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80" });
  }

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsPlaying(false);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80";
  };

  return (
    <>
      <div 
        onClick={() => navigate(`/property/${property.slug || property.id}`)}
        className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all flex flex-col h-full cursor-pointer block"
      >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        {slides[currentSlide].type === 'image' ? (
          <img
            src={slides[currentSlide].url}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full relative bg-black" onClick={handleVideoClick}>
            <video
              ref={videoRef}
              src={slides[currentSlide].url}
              className="w-full h-full object-cover"
              loop
              playsInline
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <PlayCircle className="text-white w-12 h-12 opacity-80" />
              </div>
            )}
          </div>
        )}
        
        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm text-gray-800 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm text-gray-800 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {slides.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all ${currentSlide === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
        {/* Permanent gradient overlay for price and bottom icons */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5 items-start">
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
