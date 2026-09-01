import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Paintbrush, LayoutDashboard, Sofa, Ruler, ArrowRight, Star } from 'lucide-react';

const InteriorDesigns = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch('https://hi-techserver-zd1d.onrender.com/api/interiordesigns');
        if (!response.ok) throw new Error('Failed to fetch interior designs');
        const data = await response.json();
        
        let mappedPortfolio = (Array.isArray(data) ? data : []).map(d => ({
          id: d.id,
          img: d.image,
          title: d.title,
          category: d.category
        }));

        // Fallback dummy data if the API has no interior designs yet
        if (mappedPortfolio.length === 0) {
          mappedPortfolio = [
            { id: '1', img: '/assets/gallery/gallery-2.jpg', title: 'Modern Minimalist Living', category: 'Residential' },
            { id: '2', img: '/assets/gallery/kitchen.jpg', title: 'Contemporary Kitchen', category: 'Residential' },
            { id: '3', img: '/assets/gallery/gallery-3.jpg', title: 'Executive Office Space', category: 'Commercial' },
            { id: '4', img: '/assets/gallery/gallery-7.jpg', title: 'Luxury Spa Bathroom', category: 'Residential' },
            { id: '5', img: '/assets/gallery/gallery-8.jpg', title: 'Creative Co-working Hub', category: 'Commercial' },
            { id: '6', img: '/assets/gallery/gallery-1.jpg', title: 'Boutique Retail Store', category: 'Commercial' }
          ];
        }
        
        setPortfolio(mappedPortfolio);
      } catch (err) {
        console.error("Error fetching interior designs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 overflow-hidden">
      <Helmet>
        <title>Interior Designs | Hi-Tech Estates</title>
        <meta name="description" content="Turnkey interior design services for residential and commercial spaces." />
      </Helmet>
      
      {/* Cinematic Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img
            src="/assets/images/img-7.jpg"
            alt="Luxury Interior Design"
            className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_linear_infinite_alternate]"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" }}
          />
          {/* Very Light Overlay */}
          <div className="absolute inset-0 bg-white/20"></div>
          {/* Top white gradient specifically for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        </div>

        <div data-aos="fade-up" className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="inline-block bg-white/30 backdrop-blur-md px-6 md:px-10 py-6 md:py-8 rounded-2xl shadow-lg border border-white/50">
            <div data-aos="fade-up" className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Paintbrush size={24} className="text-primary-600" />
            </div>
            <h2 data-aos="fade-up" className="text-xs md:text-sm font-bold tracking-widest text-primary-700 uppercase mb-2">
              Hi-Tech Interiors
            </h2>
            <h1 data-aos="fade-up" className="text-4xl md:text-5xl font-black text-charcoal-900 mb-6 leading-tight font-serif">
              Transforming Spaces <br className="hidden md:block" /> Into Masterpieces
            </h1>
          </div>
        </div>
      </section>

      {/* Our Process Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">How We Work</h2>
          <h3 className="text-3xl md:text-5xl font-black font-serif text-charcoal-900">The Design Process</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', icon: <Sofa size={28} />, title: 'Consultation', desc: 'Understanding your vision, lifestyle, and spatial requirements.' },
            { step: '02', icon: <LayoutDashboard size={28} />, title: 'Concept & 3D', desc: 'Detailed layouts, material selection, and 3D visualizations.' },
            { step: '03', icon: <Ruler size={28} />, title: 'Execution', desc: 'Precision craftsmanship and on-site project management.' },
            { step: '04', icon: <Star size={28} />, title: 'Handover', desc: 'Final walkthrough and delivery of your dream space.' }
          ].map((item, idx) => (
            <div data-aos="fade-up" 
              key={idx}
              className="relative p-8 bg-white border border-gray-100 shadow-xl rounded-3xl hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="text-6xl font-black text-gray-100 absolute top-4 right-6 group-hover:text-primary-100 transition-colors">{item.step}</div>
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 relative z-10 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 font-serif relative z-10 text-charcoal-900">{item.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design Portfolio */}
      <section className="py-24 bg-white bg-premium-texture text-charcoal-900 relative overflow-hidden">
        {/* Dynamic Blobs */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-building-outline opacity-60 pointer-events-none z-0"></div>
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary-200/40 rounded-full filter blur-[80px] animate-float pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-slate-200/60 rounded-full filter blur-[100px] animate-float pointer-events-none z-0" style={{animationDelay: '4s'}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Our Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-black font-serif">Featured Designs</h3>
            </div>
            <p className="max-w-md text-gray-500 font-medium">
              Explore our curated gallery of residential and commercial spaces transformed by our expert design team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item, idx) => (
              <div data-aos="fade-up" 
                key={item.id}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-2">{item.category}</div>
                  <h4 className="text-2xl font-bold text-white font-serif">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black font-serif mb-6 text-charcoal-900">Ready to Transform Your Space?</h2>
          <p className="text-xl text-gray-600 mb-10">Book a free consultation with our lead interior designers today.</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary-900 text-white font-black rounded-full hover:bg-primary-800 transition-colors shadow-xl hover:shadow-2xl text-lg">
            Schedule a Consultation <ArrowRight size={24} className="text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default InteriorDesigns;
