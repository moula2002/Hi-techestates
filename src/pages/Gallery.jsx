import React, { useState } from 'react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Exteriors', 'Interiors', 'Commercial', 'Ongoing Projects'];

  const galleryImages = [
    { id: 1, category: 'Exteriors', url: '/assets/gallery/gallery-1.jpg', alt: 'Modern Villa Exterior' },
    { id: 2, category: 'Interiors', url: '/assets/gallery/gallery-2.jpg', alt: 'Luxury Living Room' },
    { id: 3, category: 'Commercial', url: '/assets/gallery/gallery-3.jpg', alt: 'Premium Office Space' },
    { id: 4, category: 'Exteriors', url: '/assets/gallery/gallery-4.jpg', alt: 'Contemporary Home' },
    { id: 5, category: 'Interiors', url: '/assets/gallery/gallery-5.jpg', alt: 'Modern Kitchen' },
    { id: 6, category: 'Ongoing Projects', url: '/assets/gallery/gallery-6.jpg', alt: 'Construction Site' },
    { id: 7, category: 'Interiors', url: '/assets/gallery/gallery-7.jpg', alt: 'Elegant Bathroom' },
    { id: 8, category: 'Commercial', url: '/assets/gallery/gallery-8.jpg', alt: 'Co-working Space' },
    { id: 9, category: 'Ongoing Projects', url: '/assets/gallery/gallery-9.jpg', alt: 'Architecture Planning' },
  ];

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/80 z-10"></div>
          <img
            src="/assets/gallery/gallery-hero.jpg"
            alt="Gallery"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" }}
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto" data-aos="zoom-in">
          <p className="text-primary-700 font-bold tracking-widest uppercase mb-4 text-sm">Visual Showcase</p>
          <h1 className="text-4xl md:text-6xl font-black text-charcoal-900 mb-6 font-serif">Our Gallery</h1>
          <div className="w-24 h-1.5 bg-primary-600 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-charcoal-700 leading-relaxed font-medium">
            Explore our diverse portfolio of residential properties, commercial spaces, and bespoke interior designs.
          </p>
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
