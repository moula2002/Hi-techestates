import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, PhoneCall, Home as HomeIcon } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import EnquireModal from '../ui/EnquireModal';
import ListPropertyModal from '../ui/ListPropertyModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const location = useLocation();

  const isTransparent = !isScrolled;

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
    setActiveDropdown(null);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Property Sales', path: '/services#sales' },
        { name: 'Property Rentals', path: '/services#rentals' },
        { name: 'Interior Designs', path: '/services#interiors' },
      ]
    },
    { name: 'Properties', path: '/properties' },
    { name: 'Career', path: '/career' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleDropdownEnter = (name) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isTransparent
          ? 'bg-transparent py-6 border-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-md py-3 border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="Hi-Tech Estates Logo"
              className={`transition-all duration-300 object-contain ${
                isTransparent ? 'h-20' : 'h-16'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group px-3 py-2"
                onMouseEnter={() => link.dropdown && handleDropdownEnter(link.name)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 text-sm font-bold transition-colors duration-200 ${
                    location.pathname === link.path 
                      ? 'text-primary-500' 
                      : (isTransparent ? 'text-white hover:text-black' : 'text-charcoal-800 hover:text-black')
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-left ${activeDropdown === link.name ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                    }`}>
                    <div className="py-2">
                      {link.dropdown.map((dropLink) => (
                        <Link
                          key={dropLink.name}
                          to={dropLink.path}
                          className="block px-4 py-3 text-sm font-medium text-charcoal-700 hover:bg-primary-500/10 hover:text-primary-600 transition-colors"
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsListModalOpen(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border ${
                isTransparent 
                  ? 'border-white text-white hover:bg-white hover:text-charcoal-900' 
                  : 'border-primary-500 text-primary-600 hover:bg-primary-50'
              }`}
            >
              <HomeIcon size={16} />
              <span>List Property</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer ${
                isTransparent 
                  ? 'bg-transparent border border-white text-white hover:bg-white hover:text-charcoal-900' 
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              <PhoneCall size={18} />
              <span>Enquiry Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={isTransparent ? 'text-white' : 'text-charcoal-900'} size={28} />
            ) : (
              <Menu className={isTransparent ? 'text-white' : 'text-charcoal-900'} size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 visible bg-white shadow-2xl border-t border-gray-100' : 'max-h-0 opacity-0 invisible'
        }`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                to={link.path}
                className="block px-4 py-3 text-base font-bold text-charcoal-800 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
              {link.dropdown && (
                <div className="pl-8 space-y-1 bg-gray-50 py-2 rounded-lg border-l-2 border-primary-500">
                  {link.dropdown.map((dropLink) => (
                    <Link
                      key={dropLink.name}
                      to={dropLink.path}
                      className="block px-4 py-2 text-sm font-medium text-charcoal-600 hover:text-primary-600 transition-colors"
                    >
                      {dropLink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 px-4 space-y-3">
            <button
              onClick={() => setIsListModalOpen(true)}
              className="flex justify-center items-center gap-2 w-full px-6 py-3 rounded-full font-bold border-2 border-primary-500 text-primary-600 hover:bg-primary-50 cursor-pointer"
            >
              <HomeIcon size={18} />
              <span>List Property</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex justify-center items-center gap-2 w-full px-6 py-3 rounded-full font-bold bg-primary-500 text-white shadow-md hover:bg-primary-600 cursor-pointer"
            >
              <PhoneCall size={18} />
              <span>Enquiry Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ListPropertyModal isOpen={isListModalOpen} onClose={() => setIsListModalOpen(false)} />
    </header>
  );
};

export default Navbar;
