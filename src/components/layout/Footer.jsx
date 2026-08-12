import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Building2, ShieldCheck, Award } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-charcoal-600 pt-16 pb-8 border-t-4 border-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pb-12 border-b border-charcoal-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="text-primary-600" size={24} />
            </div>
            <div>
              <h4 className="text-charcoal-900 font-bold text-lg">Verified Properties</h4>
              <p className="text-sm text-charcoal-500">100% legal & RERA checked</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
              <Building2 className="text-primary-600" size={24} />
            </div>
            <div>
              <h4 className="text-charcoal-900 font-bold text-lg">Premium Portfolio</h4>
              <p className="text-sm text-charcoal-500">Exclusive luxury listings</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
              <Award className="text-primary-600" size={24} />
            </div>
            <div>
              <h4 className="text-charcoal-900 font-bold text-lg">15+ Years Experience</h4>
              <p className="text-sm text-charcoal-500">Trusted by 10,000+ clients</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <img 
              src={logoImg} 
              alt="Hi-Tech Estates Logo" 
              className="h-16" 
            />
            <p className="text-sm leading-relaxed text-charcoal-600">
              We provide premium real estate and bespoke interior design services. 
              Transforming spaces into extraordinary experiences. Design Your Dreams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-charcoal-900 font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary-600 transition-colors font-medium">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary-600 transition-colors font-medium">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary-600 transition-colors font-medium">Services</Link></li>
              <li><Link to="/properties" className="hover:text-primary-600 transition-colors font-medium">Properties</Link></li>
              <li><Link to="/career" className="hover:text-primary-600 transition-colors font-medium">Career</Link></li>
            </ul>
          </div>

          {/* Top Localities */}
          <div>
            <h3 className="text-charcoal-900 font-bold text-lg mb-6 relative inline-block">
              Top Localities
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link to="/locality/bannerghatta-road" className="hover:text-primary-600 transition-colors font-medium">Bannerghatta Road</Link></li>
              <li><Link to="/locality/koramangala" className="hover:text-primary-600 transition-colors font-medium">Koramangala</Link></li>
              <li><Link to="/locality/jp-nagar" className="hover:text-primary-600 transition-colors font-medium">JP Nagar</Link></li>
              <li><Link to="/locality/electronic-city" className="hover:text-primary-600 transition-colors font-medium">Electronic City</Link></li>
              <li><Link to="/locality/begur" className="hover:text-primary-600 transition-colors font-medium">Begur</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-charcoal-900 font-bold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-600 shrink-0 mt-1" size={18} />
                <span className="text-sm">123 Tech Boulevard, Innovation City, 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-600 shrink-0" size={18} />
                <span className="text-sm">+91 99000 00494</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-600 shrink-0" size={18} />
                <span className="text-sm">info@hitech-estates.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-charcoal-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-charcoal-500">
          <p>&copy; {currentYear} HI-TECH Estates & Interiors. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-primary-600 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
