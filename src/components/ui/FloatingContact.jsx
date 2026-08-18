import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, X } from 'lucide-react';

const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (window.scrollToTop) {
      window.scrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 md:w-14 md:h-14 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-500 transition-all duration-300 hover:scale-110 group relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Scroll to Top"
      >
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
        <span className="absolute right-full mr-4 bg-charcoal-900 text-white px-3 py-1 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Scroll to Top
        </span>
      </button>
      
      <a
        href="tel:+919900000494"
        className="w-14 h-14 md:w-16 md:h-16 bg-charcoal-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-500 transition-all hover:scale-110 group relative"
        aria-label="Call Us"
      >
        <Phone className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-pulse" />
        <span className="absolute right-full mr-4 bg-charcoal-900 text-white px-3 py-1 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Call Now
        </span>
      </a>

      {/* WhatsApp Floating Button */}
      <div className="relative group">
        <a
          href="https://wa.me/919900000494"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebd5a] transition-all hover:scale-110 relative z-10"
          aria-label="WhatsApp Us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 md:w-9 md:h-9" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Rich Hover Popup - Matching the Design */}
        <div className="absolute bottom-[110%] right-0 mb-2 w-80 bg-white rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 cursor-default pointer-events-none group-hover:pointer-events-auto origin-bottom-right z-50 overflow-hidden border border-gray-100 flex flex-col">
          
          {/* Header */}
          <div className="bg-[#21c05b] px-5 py-4 flex items-center justify-between text-white shadow-sm">
            <div className="flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="font-bold text-[17px] tracking-wide">WhatsApp</span>
            </div>
            <button className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 bg-gray-50 flex flex-col gap-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative">
            <div className="absolute inset-0 bg-gray-50/90 z-0"></div>
            
            {/* Chat Bubble */}
            <div className="relative z-10 bg-white p-4 rounded-[1.25rem] rounded-tl-sm shadow-md border border-gray-100 text-charcoal-700 text-[15px] font-medium leading-relaxed max-w-[95%]">
              <div className="absolute top-0 -left-2 w-0 h-0 border-t-[0px] border-t-transparent border-r-[12px] border-r-white border-b-[12px] border-b-transparent drop-shadow-sm"></div>
              🏠 Looking for a Property in Bangalore? Chat with us NOW!
            </div>

            {/* Chat Now Button */}
            <a 
              href="https://wa.me/919900000494"
              target="_blank"
              rel="noreferrer"
              className="relative z-10 inline-flex items-center gap-2 bg-[#21c05b] text-white px-6 py-2.5 rounded-full font-bold shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:bg-[#1ebd5a] transition-all hover:scale-105 self-start"
            >
              Chat Now
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingContact;
