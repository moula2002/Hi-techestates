import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const EnquireModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: 'Buying a Property'
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
          ...formData,
          interestedIn: formData.requirement,
          formSource: 'Enquire Modal'
        })
      });
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', phone: '', email: '', requirement: 'Buying a Property' });
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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900" 
                placeholder="John Doe" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900" 
                placeholder="+91 98765 43210" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Email Address (Optional)</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900" 
                placeholder="john@example.com" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Requirement</label>
              <select 
                value={formData.requirement}
                onChange={e => setFormData({...formData, requirement: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900"
              >
                <option>Buying a Property</option>
                <option>Renting a Property</option>
                <option>Selling a Property</option>
                <option>Interior Design Services</option>
              </select>
            </div>
            
            {status === 'success' && <p className="text-green-600 text-sm font-bold text-center">Enquiry sent successfully!</p>}
            {status === 'error' && <p className="text-red-600 text-sm font-bold text-center">Failed to send. Please try again.</p>}
            
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className="w-full mt-4 py-4 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary-500/30 uppercase tracking-widest text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : <><Send size={18} /> Submit Enquiry</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquireModal;
