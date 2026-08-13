import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronUp } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8 relative mt-16">
      {/* Unique Floating Scroll to Top Button */}
      <div className="absolute top-8 right-8 md:right-16 z-20">
        <button 
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#E5B95E] to-[#f4d48a] hover:from-white hover:to-white text-charcoal-900 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_35px_-5px_rgba(229,185,94,0.4)] transition-all duration-300 hover:-translate-y-2 group cursor-pointer border-[3px] border-white"
          aria-label="Scroll to top"
          title="Scroll to Top"
        >
          <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <div className="bg-white p-3 rounded-xl inline-block shadow-sm">
              <img
                src={logoImg}
                alt="Hi-Tech Estates Logo"
                className="h-16 object-contain"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              We build more than buildings, we build your dreams. South Bangalore's most trusted real estate consultancy.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:bg-white transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:text-[#E4405F] hover:border-[#E4405F] hover:bg-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-white transition-colors">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/properties" className="text-sm text-gray-300 hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Property Sales</Link></li>
              <li><Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Property Rentals</Link></li>
              <li><Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Buying Assistance</Link></li>
              <li><Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Interior Design</Link></li>
              <li><Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Legal Documentation</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-gray-300 shrink-0 mt-1" size={18} />
                <span className="text-sm text-gray-300"># 1&2, 1st Floor, 4th Main<br />4th Cross, Arekere, B.G Road,<br />Bangalore - 560076</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-gray-300 shrink-0 mt-1" size={18} />
                <div className="flex flex-col">
                  <a href="tel:08041323523" className="text-sm text-gray-300 hover:text-white">080-4132 3523</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-gray-300 shrink-0 mt-1" size={18} />
                <div className="flex flex-col">
                  <a href="mailto:hitechestatesjj@gmail.com" className="text-sm text-gray-300 hover:text-white">hitechestatesjj@gmail.com</a>
                  <a href="mailto:hitechinteriorsjj@gmail.com" className="text-sm text-gray-300 hover:text-white mt-1">hitechinteriorsjj@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer / RERA */}
        <div className="border-t border-primary-800 pt-8 mb-8 text-xs text-gray-400 leading-relaxed text-center md:text-left">
          <p>
            <strong>Disclaimer:</strong> The information provided on this website is for general informational purposes only. All property prices, availability, and specifications are subject to change without prior notice.
            Hi-Tech Estates acts as a consultant/broker and does not guarantee the accuracy of information provided by third-party builders or property owners.
            <br className="hidden md:block" /><strong>RERA Compliance:</strong> We are a RERA registered real estate agency. Our RERA Registration No: PRM/KA/RERA/1251/446/AG/210907/002512.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {currentYear} Hi-Tech Estates & Interiors. All Rights Reserved.</p>
          <div className="flex gap-6 items-center md:mr-32">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
