import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Breadcrumbs */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Contact Us</h1>
          <div className="text-sm text-gray-500 font-medium">
            Home / Contact Us
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-12">
          
          {/* Left Column: Get In Touch Form */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal-900 mb-8">Get In Touch</h2>
            <form className="space-y-6">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-4 border border-gray-200 rounded focus:outline-none focus:border-primary-900 text-charcoal-700 bg-gray-50"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full p-4 border border-gray-200 rounded focus:outline-none focus:border-primary-900 text-charcoal-700 bg-gray-50"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Your Phone" 
                  className="w-full p-4 border border-gray-200 rounded focus:outline-none focus:border-primary-900 text-charcoal-700 bg-gray-50"
                />
              </div>
              <div>
                <textarea 
                  rows="4" 
                  placeholder="Your Message" 
                  className="w-full p-4 border border-gray-200 rounded focus:outline-none focus:border-primary-900 text-charcoal-700 bg-gray-50"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full md:w-auto px-8 py-3 bg-primary-900 text-white font-bold rounded hover:bg-primary-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column: Contact Information */}
          <div className="lg:pl-12">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary-50 p-3 rounded-full text-primary-900">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-1">Address</h4>
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    123, Mettur Road,<br />
                    Erode, Tamil Nadu - 638001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary-50 p-3 rounded-full text-primary-900">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-1">Phone</h4>
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    +91 12345 67890<br />
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary-50 p-3 rounded-full text-primary-900">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-1">Email</h4>
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    info@hitachestates.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary-50 p-3 rounded-full text-primary-900">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-1">Office Time</h4>
                  <p className="text-charcoal-600 text-sm leading-relaxed">
                    Mon - Sat: 9:00 AM - 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-sm border border-gray-100 bg-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m3!1d15632.610582697858!2d77.7051307!3d11.3347915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f4a861d81eb%3A0x6fb2aeb7dbb69f6e!2sErode%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716382023561!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
