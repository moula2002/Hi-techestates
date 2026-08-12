import React from 'react';
import { X, Home, UploadCloud } from 'lucide-react';

const ListPropertyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal-900/70 backdrop-blur-md animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]"
        style={{ animationDuration: '0.4s' }}
      >
        <div className="bg-primary-900 px-6 py-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Home className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-serif text-white leading-tight">List Your Property</h3>
              <p className="text-primary-200 text-sm font-medium">Connect with thousands of verified buyers and tenants.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form className="space-y-5">
            
            {/* Contact Details */}
            <div>
              <h4 className="text-sm font-black text-charcoal-900 uppercase tracking-widest mb-3 border-b pb-2">1. Your Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">Full Name</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50" placeholder="+91 98765 43210" required />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h4 className="text-sm font-black text-charcoal-900 uppercase tracking-widest mb-3 border-b pb-2">2. Property Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">I want to</label>
                  <div className="flex gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 p-2 border border-charcoal-200 rounded-lg cursor-pointer hover:bg-primary-50 transition-colors">
                      <input type="radio" name="intent" className="text-primary-500" defaultChecked /> <span className="text-sm font-bold">Sell</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-2 p-2 border border-charcoal-200 rounded-lg cursor-pointer hover:bg-primary-50 transition-colors">
                      <input type="radio" name="intent" className="text-primary-500" /> <span className="text-sm font-bold">Rent Out</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">Property Type</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50">
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Independent House</option>
                    <option>Commercial Space</option>
                    <option>Plot / Land</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">Location / Area</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50" placeholder="e.g. Indiranagar, Bangalore" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">Expected Price / Rent (₹)</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50" placeholder="e.g. 1.5 Cr or 45,000/mo" required />
                </div>
              </div>
            </div>

            {/* Photos (Mock) */}
            <div>
               <h4 className="text-sm font-black text-charcoal-900 uppercase tracking-widest mb-3 border-b pb-2">3. Photos (Optional)</h4>
               <div className="border-2 border-dashed border-charcoal-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-charcoal-50 hover:bg-primary-50/50 transition-colors cursor-pointer">
                  <UploadCloud className="text-primary-500 mb-2" size={32} />
                  <p className="text-sm font-bold text-charcoal-800">Click to upload property images</p>
                  <p className="text-xs text-charcoal-500 mt-1">JPEG, PNG up to 5MB</p>
               </div>
            </div>
            
            <button 
              type="button" 
              onClick={onClose}
              className="w-full mt-2 py-4 bg-primary-600 text-white rounded-xl font-black hover:bg-primary-700 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary-500/20 uppercase tracking-widest text-sm"
            >
              Submit Property Details
            </button>
            <p className="text-center text-xs text-charcoal-400 font-medium">
              By submitting, you agree to our Terms of Service & Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListPropertyModal;
