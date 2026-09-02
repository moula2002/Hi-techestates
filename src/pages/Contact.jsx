import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import heroImg from '../assets/image.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          formSource: 'Contact Page'
        })
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage(error.message || 'Failed to send message. Please try again.');
    }

    // Reset status message after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setStatusMessage('');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-premium-texture font-sans pb-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-200/30 rounded-full filter blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 left-0 w-1/2 h-[800px] bg-building-outline opacity-40 pointer-events-none z-0"></div>


      {/* Premium Hero Section */}
      <div className="relative w-full h-[40vh] min-h-[350px] flex flex-col justify-center items-center overflow-hidden mb-12">
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img
            src={heroImg}
            alt="Luxury Real Estate Contact"
            className="w-full h-full object-cover object-center scale-105 animate-[slow-zoom_20s_linear_infinite_alternate]"
          />
          {/* Very Light Overlay */}
          <div className="absolute inset-0 bg-white/20"></div>

          {/* Top white gradient specifically for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-16" data-aos="fade-up">
          <div className="inline-block bg-white/30 backdrop-blur-md px-6 md:px-10 py-6 rounded-2xl shadow-lg border border-white/50">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal-900 mb-4 tracking-tight">
              Let's Start a Conversation
            </h1>
            <div className="flex items-center justify-center gap-3 text-charcoal-700 text-xs md:text-sm font-bold tracking-wide uppercase">
              <span className="hover:text-primary-600 transition-colors cursor-pointer" onClick={() => window.location.href = '/'}>Home</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-sm"></span>
              <span className="text-primary-900 font-black">Contact Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Overlapping Card Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 md:-mt-32">

        <div className="bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100 flex flex-col lg:flex-row" data-aos="fade-up" data-aos-delay="100">

          {/* Left Column: Form (White Background) */}
          <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16">
            <div className="mb-10">
              <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-3 block">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal-900">
                Send us a message
              </h2>
              <p className="text-charcoal-500 mt-4 text-lg leading-relaxed max-w-lg">
                Whether you're looking to buy, sell, or just explore the market, our luxury real estate experts are here to help.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative group">
                  <label className="text-[13px] font-bold text-charcoal-700 uppercase tracking-wide">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 outline-none text-charcoal-900 placeholder:text-gray-400 font-medium"
                  />
                </div>
                <div className="space-y-2 relative group">
                  <label className="text-[13px] font-bold text-charcoal-700 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 outline-none text-charcoal-900 placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-charcoal-700 uppercase tracking-wide">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 00000 00000"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 outline-none text-charcoal-900 placeholder:text-gray-400 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-charcoal-700 uppercase tracking-wide">How can we help you?</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I'm interested in..."
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 outline-none text-charcoal-900 placeholder:text-gray-400 resize-none font-medium"
                ></textarea>
              </div>

              {statusMessage && (
                <div className={`p-4 rounded-lg font-medium text-sm ${status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {statusMessage}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-charcoal-900 text-white font-bold rounded-xl hover:bg-primary-900 hover:shadow-[0_10px_30px_rgba(8,42,92,0.25)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  {status !== 'loading' && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Contact Info (Dark Premium Background) */}
          <div className="w-full lg:w-2/5 bg-charcoal-950 p-8 md:p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Decorative background gradients for luxury feel */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary-900/30 blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary-500/20 blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-10 flex items-center gap-3 tracking-wide">
                Contact Details
              </h3>

              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="mt-1 bg-white/5 p-4 rounded-2xl text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-lg tracking-wide">Corporate Office</h4>
                    <p className="text-gray-400 text-[15px] leading-relaxed font-medium">
                      # 1, 1st Floor, 4th Main & Cross,<br />
                      Arekere, B.G Road,<br />
                      Bangalore - 560076
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="mt-1 bg-white/5 p-4 rounded-2xl text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-lg tracking-wide">Direct Line</h4>
                    <p className="text-gray-400 text-[15px] leading-relaxed font-medium">
                      +91 99000 00494 <br />
                      +91 8550000494
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="mt-1 bg-white/5 p-4 rounded-2xl text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-lg tracking-wide">Email Us</h4>
                    <p className="text-gray-400 text-[15px] leading-relaxed font-medium">
                      hitechestatesjj@gmail.com<br />
                      hitechinteriorsjj@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="mt-1 bg-white/5 p-4 rounded-2xl text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-lg tracking-wide">Office Hours</h4>
                    <p className="text-gray-400 text-[15px] leading-relaxed font-medium">
                      Mon - Sun: 9:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="mt-16 pt-8 border-t border-white/10 relative z-10 flex items-center justify-between">
              <p className="text-gray-400 text-sm font-medium">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Map Section */}
      <section className="py-24 bg-white bg-premium-texture relative overflow-hidden border-t border-gray-100">
        {/* Decorative Background Elements */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-building-outline opacity-60 pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none z-0 shadow-[0_0_100px_rgba(0,0,0,0.05)]"></div>
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-primary-100/40 rounded-full filter blur-[100px] animate-float pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up" data-aos-delay="200">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-bold tracking-widest text-primary-600 uppercase mb-2">Find Us</h2>
            <h3 className="text-3xl md:text-4xl font-black text-charcoal-900 font-serif">Visit Our Office</h3>
          </div>
          <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 bg-white relative group">
            {/* Stylish overlay that disappears on map hover */}
            <div className="absolute inset-0 bg-charcoal-900/5 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none z-10"></div>

            <iframe
              src="https://maps.google.com/maps?q=Arekere,%20B.G%20Road,%20Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
              className="w-full h-full grayscale-[25%] contrast-[1.05] group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
