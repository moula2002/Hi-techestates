import React, { useState } from 'react';
import { X, Home, UploadCloud } from 'lucide-react';

const ListPropertyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    intent: 'Sell',
    type: 'Apartment',
    location: '',
    price: ''
  });
  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          interestedIn: `List Property - ${formData.intent} ${formData.type}`,
          message: `Location: ${formData.location}\nPrice/Rent: ${formData.price}`,
          formSource: 'List Property Modal'
        })
      });
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', phone: '', intent: 'Sell', type: 'Apartment', location: '', price: '' });
          onClose();
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

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
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Contact Details */}
            <div>
              <h4 className="text-sm font-black text-charcoal-900 uppercase tracking-widest mb-3 border-b pb-2">1. Your Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50" placeholder="+91 98765 43210" required />
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
                      <input type="radio" name="intent" value="Sell" checked={formData.intent === 'Sell'} onChange={e => setFormData({...formData, intent: e.target.value})} className="text-primary-500" /> <span className="text-sm font-bold">Sell</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-2 p-2 border border-charcoal-200 rounded-lg cursor-pointer hover:bg-primary-50 transition-colors">
                      <input type="radio" name="intent" value="Rent Out" checked={formData.intent === 'Rent Out'} onChange={e => setFormData({...formData, intent: e.target.value})} className="text-primary-500" /> <span className="text-sm font-bold">Rent Out</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">Property Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50">
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
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50" placeholder="e.g. Indiranagar, Bangalore" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-600 uppercase mb-1">Expected Price / Rent (₹)</label>
                  <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 outline-none bg-charcoal-50" placeholder="e.g. 1.5 Cr or 45,000/mo" required />
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
            
            {status === 'success' && <p className="text-green-600 text-sm font-bold text-center">Property details sent successfully!</p>}
            {status === 'error' && <p className="text-red-600 text-sm font-bold text-center">Failed to send. Please try again.</p>}
            
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className="w-full mt-2 py-4 bg-primary-600 text-white rounded-xl font-black hover:bg-primary-700 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary-500/20 uppercase tracking-widest text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Submitted!' : 'Submit Property Details'}
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
