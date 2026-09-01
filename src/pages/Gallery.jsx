import React, { useState } from 'react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Exteriors', 'Interiors', 'Commercial', 'Ongoing Projects'];

  const galleryImages = [
    { id: 2, category: 'Interiors', url: '/assets/gallery/gallery-2.jpg', alt: 'Luxury Living Room' },
    { id: 3, category: 'Commercial', url: '/assets/gallery/gallery-3.jpg', alt: 'Premium Office Space' },
    { id: 5, category: 'Interiors', url: '/assets/gallery/kitchen.jpg', alt: 'Modern Kitchen' },
    { id: 6, category: 'Ongoing Projects', url: '/assets/gallery/gallery-6.jpg', alt: 'Construction Site' },
    { id: 7, category: 'Interiors', url: '/assets/gallery/gallery-7.jpg', alt: 'Elegant Bathroom' },
    { id: 8, category: 'Commercial', url: '/assets/gallery/gallery-8.jpg', alt: 'Co-working Space' },
    { id: 9, category: 'Ongoing Projects', url: '/assets/gallery/gallery-9.jpg', alt: 'Architecture Planning' },
    { id: 101, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.00.56 PM.jpeg', alt: 'Exterior Image 1' },
    { id: 102, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.00.57 PM (1).jpeg', alt: 'Exterior Image 2' },
    { id: 103, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.00.57 PM (2).jpeg', alt: 'Exterior Image 3' },
    { id: 104, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.00.57 PM.jpeg', alt: 'Exterior Image 4' },
    { id: 105, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.00.58 PM.jpeg', alt: 'Exterior Image 5' },
    { id: 106, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.00 PM.jpeg', alt: 'Exterior Image 6' },
    { id: 107, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.03 PM (1).jpeg', alt: 'Exterior Image 7' },
    { id: 108, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.03 PM.jpeg', alt: 'Exterior Image 8' },
    { id: 109, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.16 PM (1).jpeg', alt: 'Exterior Image 9' },
    { id: 110, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.16 PM.jpeg', alt: 'Exterior Image 10' },
    { id: 111, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.17 PM (1).jpeg', alt: 'Exterior Image 11' },
    { id: 112, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.17 PM.jpeg', alt: 'Exterior Image 12' },
    { id: 113, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.18 PM.jpeg', alt: 'Exterior Image 13' },
    { id: 114, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.20 PM.jpeg', alt: 'Exterior Image 14' },
    { id: 115, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.21 PM.jpeg', alt: 'Exterior Image 15' },
    { id: 116, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.22 PM (1).jpeg', alt: 'Exterior Image 16' },
    { id: 117, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.22 PM.jpeg', alt: 'Exterior Image 17' },
    { id: 118, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.24 PM (1).jpeg', alt: 'Exterior Image 18' },
    { id: 119, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.24 PM (2).jpeg', alt: 'Exterior Image 19' },
    { id: 120, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.24 PM.jpeg', alt: 'Exterior Image 20' },
    { id: 121, category: 'Exteriors', url: '/assets/images/exterior/WhatsApp Image 2026-09-01 at 12.01.25 PM.jpeg', alt: 'Exterior Image 21' },
  ];

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 bg-premium-texture font-sans pb-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-200/30 rounded-full filter blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 left-0 w-1/2 h-[800px] bg-building-outline opacity-40 pointer-events-none z-0"></div>

      {/* Hero Banner */}
      <section className="relative w-full h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img
            src="/assets/gallery/gallery-hero.jpg"
            alt="Gallery"
            className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_linear_infinite_alternate]"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" }}
          />
          {/* Very Light Overlay */}
          <div className="absolute inset-0 bg-white/20 z-10"></div>
          {/* Top white gradient specifically for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-16 md:pt-24" data-aos="zoom-in">
          <div className="inline-block bg-white/30 backdrop-blur-md px-6 md:px-10 py-6 rounded-2xl shadow-lg border border-white/50">
            <p className="text-primary-700 font-bold tracking-widest uppercase mb-2 text-xs">Visual Showcase</p>
            <h1 className="text-3xl md:text-4xl font-black text-charcoal-900 mb-4 font-serif">Our Gallery</h1>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full mb-4 shadow-sm"></div>
            <p className="text-sm md:text-base text-charcoal-800 leading-relaxed font-bold max-w-xl mx-auto">
              Explore our diverse portfolio of residential properties, commercial spaces, and bespoke interior designs.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md ${activeCategory === cat
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-charcoal-600 hover:bg-charcoal-100'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item, idx) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg group relative h-72" data-aos="zoom-in" data-aos-delay={(idx % 6) * 100}>
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-6">
                <div>
                  <p className="text-primary-400 font-bold text-xs uppercase tracking-wider mb-1">{item.category}</p>
                  <p className="text-white font-bold text-lg">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
