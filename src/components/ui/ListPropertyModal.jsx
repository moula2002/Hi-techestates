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
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct the message text
    let message = `*List Property Request*\n\n*Name:* ${formData.name || 'Not Provided'}\n*Phone:* ${formData.phone || 'Not Provided'}\n*Intent:* ${formData.intent}\n*Property Type:* ${formData.type}\n*Location:* ${formData.location}\n*Price/Rent:* ${formData.price}`;
    
    if (selectedFile) {
        message += `\n\n*(Note: I have a property image to share, which I will attach to this chat.)*`;
    }
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // Default WhatsApp number
    const whatsappNumber = '919900000494';
    
    // Open WhatsApp URL
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Briefly show success state then close
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', phone: '', intent: 'Sell', type: 'Apartment', location: '', price: '' });
      setSelectedFile(null);
      setImagePreview(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-900/70 backdrop-blur-md animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[100%] animate-fade-in-up"
        style={{ animationDuration: '0.4s' }}
      >
        {/* Header - Fixed */}
        <div className="bg-primary-900 px-6 py-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Home className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white leading-tight">List Your Property</h3>
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

        {/* Form Container - flex-1 min-h-0 allows it to shrink to fit available space */}
        <form className="flex flex-col flex-1 min-h-0 overflow-hidden" onSubmit={handleSubmit}>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Contact Details */}
            <div>
              <h4 className="text-xs font-black text-primary-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-primary-600"></span> Your Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-gray-50 focus:bg-white transition-all text-sm font-medium" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Phone Number</label>
                  <input type="tel" pattern="[0-9]{10}" maxLength="10" title="Please enter exactly 10 digits" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-gray-50 focus:bg-white transition-all text-sm font-medium" placeholder="9876543210" required />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h4 className="text-xs font-black text-primary-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-primary-600"></span> Property Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">I want to</label>
                  <div className="flex gap-3">
                    <label className={`flex-1 flex items-center justify-center p-3 rounded-xl cursor-pointer transition-all border ${formData.intent === 'Sell' ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm' : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50 text-gray-600'}`}>
                      <input type="radio" name="intent" value="Sell" checked={formData.intent === 'Sell'} onChange={e => setFormData({ ...formData, intent: e.target.value })} className="hidden" />
                      <span className="text-sm font-bold">Sell</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center p-3 rounded-xl cursor-pointer transition-all border ${formData.intent === 'Rent Out' ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm' : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50 text-gray-600'}`}>
                      <input type="radio" name="intent" value="Rent Out" checked={formData.intent === 'Rent Out'} onChange={e => setFormData({ ...formData, intent: e.target.value })} className="hidden" />
                      <span className="text-sm font-bold">Rent Out</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Property Type</label>
                  <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-gray-50 focus:bg-white transition-all text-sm font-medium cursor-pointer">
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Independent House</option>
                    <option>Commercial Space</option>
                    <option>Plot / Land</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Location / Area</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-gray-50 focus:bg-white transition-all text-sm font-medium" placeholder="e.g. Indiranagar, Bangalore" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Expected Price / Rent (₹)</label>
                  <input type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-gray-50 focus:bg-white transition-all text-sm font-medium" placeholder="e.g. 1.5 Cr or 45,000/mo" required />
                </div>
              </div>
            </div>

            {/* Photos */}
            <div>
              <h4 className="text-xs font-black text-primary-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-primary-600"></span> Photos (Optional)
              </h4>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-1 w-full min-w-0">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Upload Property Image</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      accept="image/jpeg, image/png"
                      onChange={handleFileChange}
                    />
                    <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between transition-colors group-hover:border-primary-300">
                      <div className="flex items-center gap-3 overflow-hidden min-w-0 mr-3">
                        <UploadCloud className="text-gray-400 shrink-0 group-hover:text-primary-500 transition-colors" size={20} />
                        <span className="text-sm font-medium text-gray-500 truncate block">
                          {selectedFile ? selectedFile.name : 'Choose an image file...'}
                        </span>
                      </div>
                      <span className="shrink-0 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-600 shadow-sm group-hover:text-primary-600 group-hover:border-primary-200 transition-colors">
                        Browse
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium mt-2">JPEG, PNG up to 5MB</p>
                </div>
                
                {imagePreview && (
                  <div className="shrink-0 relative w-20 h-20 rounded-xl border-2 border-gray-100 overflow-hidden shadow-sm sm:mt-6 group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors z-20 opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {status === 'success' && <div className="p-3 bg-green-50 rounded-xl text-green-700 text-sm font-bold text-center border border-green-100 mt-6">Property details sent successfully!</div>}
            {status === 'error' && <div className="p-3 bg-red-50 rounded-xl text-red-700 text-sm font-bold text-center border border-red-100 mt-6">Failed to send. Please try again.</div>}
            
            {/* Safe bottom padding ensures final content clears the footer visually if needed */}
            <div className="h-4 w-full"></div>
          </div>
          
          {/* Footer - Fixed */}
          <div className="shrink-0 p-6 border-t border-gray-100 bg-white">
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-4 bg-primary-600 text-white rounded-xl font-black hover:bg-primary-700 transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary-500/20 uppercase tracking-widest text-sm disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Submitted!' : 'Submit Property Details'}
            </button>
            <p className="text-center text-[11px] text-gray-400 font-medium mt-3">
              By submitting, you agree to our Terms of Service & Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListPropertyModal;
