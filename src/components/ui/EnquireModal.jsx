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
      const dbEndpoint = import.meta.env.DEV 
        ? 'http://localhost:5000/api/enquiries' 
        : 'https://hi-techserver-zd1d.onrender.com/api/enquiries';

      const endpoint = import.meta.env.DEV 
        ? dbEndpoint 
        : '/api/send-email';
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || 'Not Provided',
          email: formData.email || 'Not Provided',
          phone: formData.phone || 'Not Provided',
          message: 'No message provided', // Enquire modal doesn't have a message field
          interestedIn: formData.requirement || 'Not Provided',
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
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="peer w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Phone Number</label>
              <input
                type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    title="Please enter exactly 10 digits"
                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="peer w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600"
                placeholder="9876543210"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Email Address (Optional)</label>
              <input
                type="email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please provide a valid email address (e.g. @gmail.com, @yahoo.com)"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="peer w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600"
                placeholder="john@gmail.com"
              />
              <p className="hidden peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block text-red-500 text-[11px] font-bold mt-1">Please enter a valid email address.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-widest mb-1">Requirement</label>
              <select
                value={formData.requirement}
                onChange={e => setFormData({ ...formData, requirement: e.target.value })}
                className="peer w-full px-4 py-3 rounded-lg border border-charcoal-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-charcoal-50 font-medium text-charcoal-900 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600"
              >
                <option>Buying a Property</option>
                <option>Renting a Property</option>
                <option>Selling a Property</option>
                <option>Interior Design Services</option>
              </select>
            </div>

            {status === 'success' && <p className="text-green-600 text-sm font-bold text-center">Enquiry sent successfully!</p>}
            {status === 'error' && <p className="text-red-600 text-sm font-bold text-center">Failed to send. Please try again.</p>}

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full py-4 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary-500/30 uppercase tracking-widest text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : <><Send size={18} /> Submit</>}
              </button>

              <a
                href={`https://wa.me/919900000494?text=${encodeURIComponent(`New Enquiry\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nRequirement: ${formData.requirement}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-[#25D366] text-white rounded-lg font-bold hover:bg-[#20bd5a] transition-colors flex justify-center items-center gap-2 shadow-lg shadow-[#25D366]/30 uppercase tracking-widest text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquireModal;
