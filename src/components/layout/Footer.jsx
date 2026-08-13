import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <img
              src={logoImg}
              alt="Hi-Tech Estates Logo"
              className="h-20 brightness-0 invert"
            />
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              We build more than buildings, we build your dreams. South Bangalore's most trusted real estate consultancy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors text-xs font-bold">
                Fb
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors text-xs font-bold">
                Tw
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors text-xs font-bold">
                Ig
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors text-xs font-bold">
                Li
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
                <span className="text-sm text-gray-300">#45, 1st Main Road, JP Nagar 7th Phase,<br />Bangalore - 560078</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-gray-300 shrink-0 mt-1" size={18} />
                <div className="flex flex-col">
                  <a href="tel:+919900000494" className="text-sm text-gray-300 hover:text-white">+91 99000 00494</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gray-300 shrink-0" size={18} />
                <a href="mailto:info@hitachestates.com" className="text-sm text-gray-300 hover:text-white">info@hitachestates.com</a>
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
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
