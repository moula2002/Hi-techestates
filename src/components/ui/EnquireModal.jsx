import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const EnquireModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
        style={{ animationDuration: '0.4s' }}
      >
        <div className="bg-charcoal-900 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-serif text-white">Enquire Now</h3>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-charcoal-500 mb-6 font-medium">
            Leave your details below and our luxury property consultants will get back to you shortly.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Full Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900" 
                placeholder="John Doe" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Phone Number</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900" 
                placeholder="+91 98765 43210" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Email Address (Optional)</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900" 
                placeholder="john@example.com" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Requirement</label>
              <select className="w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900">
                <option>Buying a Property</option>
                <option>Renting a Property</option>
                <option>Selling a Property</option>
                <option>Interior Design Services</option>
              </select>
            </div>
            
            <button 
              type="button" 
              onClick={onClose}
              className="w-full mt-4 py-4 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary-500/30 uppercase tracking-widest text-sm"
            >
              Submit Enquiry <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquireModal;
