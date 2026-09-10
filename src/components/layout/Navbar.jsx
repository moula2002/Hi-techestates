import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Home, Info, Building, Briefcase, Image as ImageIcon, Phone, Mail, MapPin } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import EnquireModal from '../ui/EnquireModal';
import ListPropertyModal from '../ui/ListPropertyModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListPropertyModalOpen, setIsListPropertyModalOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const location = useLocation();
  const isServicesPage = location.pathname === '/services';
  const showSolidNavbar = isScrolled || isServicesPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Properties', path: '/properties', icon: Building },
    {
      name: 'Services',
      path: '/services',
      icon: Briefcase,
      dropdown: [
        { name: 'Property Rent', path: '/property-services' },
        { name: 'Property Sell', path: '/property-services' },
        { name: 'Interiors Designs', path: '/interior-designs' },
        { name: 'Home Loan', path: '/home-loan' }
      ]
    },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-40 transition-all duration-500 rounded-full ${showSolidNavbar
          ? 'top-4 bg-white/95 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200/60 py-2.5'
          : 'top-2 bg-transparent shadow-none border border-transparent py-4'
          }`}
      >
        <div className="px-5 sm:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center group relative z-50 shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src={logoImg}
                alt="Hi-Tech Estates Logo"
                className={`object-contain transition-all duration-500 drop-shadow-sm group-hover:scale-105 ${isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-28'
                  }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (location.pathname === '/' && link.path === '/');
                return (
                  <div key={link.name} className="relative group py-2">
                    <Link
                      to={link.path}
                      className={`relative px-2 py-1 text-[16px] font-black tracking-wide transition-all duration-300 flex items-center gap-1.5 ${isActive
                        ? 'text-primary-900'
                        : 'text-black hover:text-primary-900'
                        }`}
                    >
                      {link.name}
                      {link.dropdown && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${isActive ? 'text-primary-900' : 'text-charcoal-400 group-hover:text-primary-900'
                            } group-hover:rotate-180`}
                        />
                      )}

                      {/* Animated Underline */}
                      <span className={`absolute -bottom-1 left-0 h-[2px] bg-primary-900 rounded-full transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                    </Link>

                    {/* Dropdown Menu */}
                    {link.dropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                        <div className="bg-white/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl p-2 border border-gray-100">
                          {link.dropdown.map((drop) => (
                            <Link
                              key={drop.name}
                              to={drop.path}
                              className="block px-4 py-2.5 text-sm text-charcoal-700 hover:bg-gray-50 hover:text-primary-900 transition-all duration-200 font-medium rounded-xl hover:translate-x-1"
                            >
                              {drop.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsListPropertyModalOpen(true)}
                className={`px-3 py-1 relative text-[16px] font-black tracking-wide transition-all duration-300 flex items-center gap-1.5 ${isScrolled ? 'text-primary-900' : 'text-black hover:text-primary-900'
                  }`}
              >
                List Property
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-charcoal-900 text-white px-6 py-2.5 rounded-full text-[14px] font-bold hover:bg-primary-900 hover:shadow-[0_4px_20px_rgba(8,42,92,0.3)] transition-all duration-300 flex items-center gap-2 group"
              >
                Enquire Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-50 p-2 rounded-full focus:outline-none text-charcoal-900 hover:bg-gray-100 transition-colors border border-gray-200/50 shadow-sm bg-white/80 backdrop-blur-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-charcoal-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Navigation Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white/95 backdrop-blur-2xl shadow-2xl z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="pt-8 pb-4 px-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-900 shadow-sm">
                <MapPin size={20} />
             </div>
             <div>
                <h3 className="font-black text-gray-900 leading-tight">Hi-Tech Estates</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Premium Real Estate</p>
             </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-3 no-scrollbar">
          {navLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
            <div key={link.name} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}>
              {link.dropdown ? (
                <div className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100/50">
                  <button
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-base font-bold transition-colors ${location.pathname === link.path ? 'text-primary-900' : 'text-charcoal-800'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={location.pathname === link.path ? 'text-primary-900' : 'text-gray-400'} />
                      {link.name}
                    </div>
                    <div
                      className={`p-1.5 rounded-full transition-colors ${openMobileDropdown === link.name ? 'bg-primary-100 text-primary-900' : 'bg-white shadow-sm text-charcoal-500'
                        }`}
                    >
                      <ChevronDown size={16} className={`transition-transform duration-300 ${openMobileDropdown === link.name ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {/* Mobile Dropdown Options */}
                  <div className={`overflow-hidden transition-all duration-300 ${openMobileDropdown === link.name ? 'max-h-64 opacity-100 pb-2' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col gap-1.5 px-3 pt-1 pb-3">
                      {link.dropdown.map((drop) => (
                        <Link
                          key={drop.name}
                          to={drop.path}
                          className="block pl-14 pr-4 py-3 text-[15px] text-charcoal-600 hover:text-primary-900 hover:bg-white rounded-xl transition-all font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-transparent hover:border-gray-100"
                        >
                          {drop.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-5 py-4 text-base font-bold rounded-2xl transition-all border border-transparent ${location.pathname === link.path
                    ? 'bg-primary-50/80 text-primary-900 border-primary-100 shadow-sm'
                    : 'text-charcoal-800 hover:bg-gray-50/80 hover:border-gray-100'
                    }`}
                >
                  <Icon size={20} className={location.pathname === link.path ? 'text-primary-900' : 'text-gray-400'} />
                  {link.name}
                </Link>
              )}
            </div>
          )})}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
          <div className="flex flex-col gap-3 mb-2 px-2">
            <a href="mailto:info@hi-techestates.com" className="flex items-center gap-3 text-[13px] text-gray-500 font-bold hover:text-primary-900 transition-colors">
               <Mail size={16} className="text-gray-400" /> info@hi-techestates.com
            </a>
            <a href="tel:+919900000494" className="flex items-center gap-3 text-[13px] text-gray-500 font-bold hover:text-primary-900 transition-colors">
               <Phone size={16} className="text-gray-400" /> +91 99000 00494
            </a>
          </div>
          <button
            onClick={() => { setIsListPropertyModalOpen(true); setIsOpen(false); }}
            className="w-full bg-white border border-gray-200 text-charcoal-800 px-6 py-3.5 rounded-xl text-base font-bold hover:border-primary-900 hover:text-primary-900 transition-all cursor-pointer shadow-sm"
          >
            List Property
          </button>
          <button
            onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
            className="w-full bg-charcoal-900 text-white px-6 py-3.5 rounded-xl text-base font-bold hover:bg-primary-900 hover:shadow-lg hover:shadow-primary-900/20 transition-all cursor-pointer flex justify-center items-center gap-2"
          >
            Enquire Now
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Modals */}
      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ListPropertyModal isOpen={isListPropertyModalOpen} onClose={() => setIsListPropertyModalOpen(false)} />
    </>
  );
};

export default Navbar;
