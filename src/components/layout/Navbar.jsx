import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
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
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Properties', path: '/properties' },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Property Rent', path: '/property-services' },
        { name: 'Property Sell', path: '/property-services' },
        { name: 'Interiors Designs', path: '/interior-designs' },
        { name: 'Home Loan', path: '/home-loan' }
      ]
    },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
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
                className={`px-5 py-2.5 rounded-full text-[14px] font-bold transition-colors duration-300 ${isScrolled ? 'text-primary-900 hover:bg-primary-50' : 'text-charcoal-800 hover:bg-black/5'
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
        className={`lg:hidden fixed inset-0 z-40 bg-charcoal-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Navigation Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white/95 backdrop-blur-2xl shadow-2xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100/50 mt-[80px]">
          {/* spacer for close button which is in navbar */}
          <span className="text-xs font-bold text-charcoal-400 uppercase tracking-[0.2em]">Navigation</span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-3 no-scrollbar">
          {navLinks.map((link, idx) => (
            <div key={link.name} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}>
              {link.dropdown ? (
                <div className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100/50">
                  <button
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-base font-semibold transition-colors ${location.pathname === link.path ? 'text-primary-900' : 'text-charcoal-800'
                      }`}
                  >
                    {link.name}
                    <div
                      className={`p-1.5 rounded-full transition-colors ${openMobileDropdown === link.name ? 'bg-primary-100 text-primary-900' : 'bg-gray-100 text-charcoal-500'
                        }`}
                    >
                      <ChevronDown size={16} className={`transition-transform duration-300 ${openMobileDropdown === link.name ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {/* Mobile Dropdown Options */}
                  <div className={`overflow-hidden transition-all duration-300 ${openMobileDropdown === link.name ? 'max-h-60 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col gap-1 px-4 border-l-2 border-primary-200/50 ml-6">
                      {link.dropdown.map((drop) => (
                        <Link
                          key={drop.name}
                          to={drop.path}
                          className="block px-4 py-2.5 text-sm text-charcoal-600 hover:text-primary-900 hover:bg-primary-50/50 rounded-xl transition-all font-medium"
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
                  className={`block px-5 py-4 text-base font-semibold rounded-2xl transition-all border border-transparent ${location.pathname === link.path
                    ? 'bg-primary-50/80 text-primary-900 border-primary-100'
                    : 'text-charcoal-800 hover:bg-gray-50/80 hover:border-gray-100'
                    }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-100/50 bg-gray-50/30 space-y-3">
          <button
            onClick={() => { setIsListPropertyModalOpen(true); setIsOpen(false); }}
            className="w-full bg-white border border-gray-200 text-charcoal-800 px-6 py-3.5 rounded-xl text-base font-semibold hover:border-primary-900 hover:text-primary-900 transition-all cursor-pointer shadow-sm"
          >
            List Property
          </button>
          <button
            onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
            className="w-full bg-charcoal-900 text-white px-6 py-3.5 rounded-xl text-base font-semibold hover:bg-primary-900 hover:shadow-lg hover:shadow-primary-900/20 transition-all cursor-pointer flex justify-center items-center gap-2"
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
