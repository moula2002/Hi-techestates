import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-charcoal-900/70 z-10"></div>
          <img
            src="/assets/images/img-9.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary-500 font-bold tracking-widest uppercase mb-4 text-sm">Get in Touch</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-serif">Contact Us</h1>
          <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
            Ready to design your dreams? Get in touch with our experts for property enquiries, interior design consultations, or scheduling a site visit.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info & Quick Actions */}
          <div className="space-y-8">
            <div className="bg-charcoal-900 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-primary-500">Quick Connect</h3>
              
              <div className="space-y-6 mb-8">
                <a href="tel:+919900000494" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors">
                    <Phone className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">Call Now</h4>
                    <p className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors">+91 99000 00494</p>
                  </div>
                </a>
                
                <a href="https://wa.me/919900000494" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#25D366] transition-colors">
                    <MessageCircle className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">WhatsApp</h4>
                    <p className="text-xl font-bold text-white group-hover:text-[#25D366] transition-colors">Message Us</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300">Email</h4>
                    <p className="text-lg font-bold text-white">info@hitech-estates.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
               <h3 className="text-xl font-bold text-charcoal-900 mb-6">Head Office</h3>
               <div className="flex items-start gap-4">
                <MapPin className="text-primary-500 shrink-0 mt-1" size={24} />
                <p className="text-charcoal-600 font-medium text-lg">
                  123 Tech Boulevard,<br/>
                  Innovation City, 10001,<br/>
                  Bangalore, Karnataka
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Enquiry Form */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-charcoal-900 mb-6">Enquiry Form</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-charcoal-700 mb-1">Full Name *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-gray-50 font-medium" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal-700 mb-1">Phone Number *</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-gray-50 font-medium" placeholder="+91 98765 43210" required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-charcoal-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-gray-50 font-medium" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-charcoal-700 mb-1">I am interested in:</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-gray-50 font-medium">
                  <option>Buying a Property</option>
                  <option>Renting a Property</option>
                  <option>Selling a Property</option>
                  <option>Interior Design Services</option>
                  <option>General Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal-700 mb-1">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-gray-50 font-medium" placeholder="Please share your requirements or property preferences..."></textarea>
              </div>
              
              <button type="button" className="w-full py-4 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary-500/30">
                Submit Enquiry <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
