import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, Lightbulb, CheckCircle, MapPin, Building2, Star } from 'lucide-react';
import { locations } from '../data/properties';
import { Link } from 'react-router-dom';
import aboutImage from '../assets/image.png';

const About = () => {
  return (
    <div className="w-full font-sans bg-white pb-24">
      <Helmet>
        <title>About Us | Hi-Tech Estates & Interiors</title>
        <meta name="description" content="Learn more about Hi-Tech Estates & Interiors, our 10+ years of experience, mission, and the expert team helping you find the best properties." />
      </Helmet>

      {/* Premium Hero Section */}
      <div className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="About Hi-Tech Estates" 
            className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_linear_infinite_alternate]"
          />
          {/* Very Light Overlay */}
          <div className="absolute inset-0 bg-white/20"></div>
          {/* Top white gradient specifically for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 pt-8" data-aos="fade-up">
          <div className="inline-block bg-white/30 backdrop-blur-md px-6 md:px-10 py-6 rounded-2xl shadow-lg border border-white/50">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal-900 mb-4 tracking-tight">
              About Us
            </h1>
            <div className="flex items-center justify-center gap-3 text-charcoal-800 text-xs md:text-sm font-bold tracking-wide uppercase">
              <span className="hover:text-primary-600 transition-colors cursor-pointer" onClick={() => window.location.href = '/'}>Home</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-sm"></span>
              <span className="text-primary-900 font-black">About Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Intro Section */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1" data-aos="fade-right">
              <h1 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Who We Are</h1>
              <h2 className="text-4xl md:text-5xl font-black text-charcoal-900 mb-6 leading-tight">
                Building Trust,<br />Creating Landmarks
              </h2>
              <p className="text-charcoal-700 mb-6 leading-relaxed text-lg">
                Hi-Tech Estates & Interiors is a premier real estate consultancy and interior design firm based in Bangalore. With over a decade of industry experience, we specialize in helping clients navigate the complex real estate market with ease and confidence.
              </p>
              <p className="text-charcoal-700 mb-6 leading-relaxed text-lg">
                Whether you are buying your first home, looking for a lucrative investment, or designing your dream interior, our team of experts provides end-to-end solutions tailored to your unique needs.
              </p>
              <p className="text-charcoal-700 mb-8 leading-relaxed text-lg">
                Our philosophy is built on transparency, innovation, and an unwavering commitment to quality. From conceptualizing modern living spaces to closing high-value commercial deals, we pride ourselves on delivering excellence and forging relationships that last generations.
              </p>
            </div>
            <div className="flex-1" data-aos="fade-left">
              <img
                src={aboutImage}
                alt="Building"
                className="w-full h-auto object-cover rounded-2xl shadow-xl border-4 border-white"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section (Experience) */}
      <section className="py-12 border-y border-gray-100 bg-gray-50" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center text-center gap-6">
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-4xl font-black text-primary-900 mb-2">10+</h3>
              <p className="text-sm font-bold text-charcoal-700 uppercase tracking-wider">Years Experience</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-4xl font-black text-primary-900 mb-2">250+</h3>
              <p className="text-sm font-bold text-charcoal-700 uppercase tracking-wider">Successful Transactions</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <h3 className="text-4xl font-black text-primary-900 mb-2">500+</h3>
              <p className="text-sm font-bold text-charcoal-700 uppercase tracking-wider">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Areas We Specialise In */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Our Territory</h2>
          <h3 className="text-3xl font-black text-charcoal-900 mb-12">Areas We Specialise In</h3>
          <p className="max-w-3xl mx-auto text-charcoal-700 mb-10 text-lg">
            We have deep-rooted knowledge and extensive networks across South Bangalore's most sought-after neighborhoods. Our hyper-local expertise ensures you get the best properties at the right price.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {locations.map((loc) => (
              <div key={loc} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg font-bold text-charcoal-900 flex items-center gap-2">
                <MapPin size={18} className="text-primary-500" />
                {loc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Our Advantage</h2>
            <h3 className="text-3xl font-black text-charcoal-900">Why Clients Choose Us</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Local Expertise', desc: 'Unmatched knowledge of the local real estate market trends and property values.' },
              { title: 'Verified Properties', desc: 'Every property goes through a rigorous legal and quality check before listing.' },
              { title: 'End-to-End Service', desc: 'From property search to registration and interior design, we handle everything.' },
              { title: 'Transparent Dealings', desc: '100% transparency in pricing and legal processes. No hidden charges.' },
              { title: 'Dedicated Support', desc: 'A dedicated relationship manager for personalized assistance throughout.' },
              { title: 'Vast Network', desc: 'Access to off-market properties and exclusive pre-launch offers.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-start">
                <CheckCircle className="text-primary-600 shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-xl font-bold text-charcoal-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Reviews</h2>
          <h3 className="text-3xl font-black text-charcoal-900 mb-12">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", text: "Hi-Tech Estates helped me find the perfect apartment in JP Nagar. Very professional team!", area: "JP Nagar" },
              { name: "Priya Desai", text: "Sold my plot in Begur within a month at a great price. Excellent marketing and fast process.", area: "Begur" },
              { name: "Anil Kumar", text: "Their interior design service completely transformed my new villa. Highly recommended.", area: "Koramangala" }
            ].map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-100 relative text-left">
                <div className="flex mb-4 text-yellow-400">
                  <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
                </div>
                <p className="text-charcoal-700 italic mb-6">"{review.text}"</p>
                <div className="mt-auto">
                  <h4 className="font-bold text-charcoal-900">{review.name}</h4>
                  <p className="text-sm text-gray-500">Property in {review.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
