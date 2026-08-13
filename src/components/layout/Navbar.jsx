import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Properties', path: '/properties' },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Property Rent/ Sell', path: '/property-services' },
        { name: 'Interiors Designs', path: '/interior-designs' }
      ]
    },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3 border-b border-gray-200' : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={logoImg}
              alt="Hi-Tech Estates Logo"
              className="h-14 md:h-16 object-contain transition-all duration-300"
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
                    className={`text-sm font-semibold transition-colors duration-200 flex items-center gap-1 ${isActive
                      ? 'border-b-2 pb-1 text-primary-900 border-primary-900'
                      : 'text-charcoal-700 hover:text-primary-900'
                      }`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 transform translate-y-2 group-hover:translate-y-0">
                      {link.dropdown.map(drop => (
                        <Link
                          key={drop.name}
                          to={drop.path}
                          className="block px-4 py-2.5 text-sm text-charcoal-700 hover:bg-primary-50 hover:text-primary-900 transition-colors font-medium"
                        >
                          {drop.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setIsListPropertyModalOpen(true)}
              className="bg-transparent border-2 border-primary-900 text-primary-900 px-6 py-2 rounded text-sm font-bold hover:bg-primary-900 hover:text-white transition-colors cursor-pointer"
            >
              List Property
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-900 text-white px-6 py-2.5 rounded text-sm font-bold hover:bg-primary-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer animate-pulse-shadow"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none text-charcoal-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out absolute w-full bg-white border-b border-gray-200 ${isOpen ? 'max-h-screen opacity-100 visible shadow-xl' : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
      >
        <div className="px-4 py-4 space-y-2 overflow-y-auto max-h-[70vh]">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.dropdown ? (
                <div>
                  <button
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-lg transition-colors ${location.pathname === link.path ? 'bg-primary-50 text-primary-900' : 'text-charcoal-800 hover:bg-gray-50'}`}
                  >
                    {link.name}
                    <ChevronDown size={18} className={`transition-transform duration-300 ${openMobileDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Mobile Dropdown Options */}
                  <div className={`overflow-hidden transition-all duration-300 pl-4 pr-2 ${openMobileDropdown === link.name ? 'max-h-40 mt-1 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {link.dropdown.map(drop => (
                      <Link
                        key={drop.name}
                        to={drop.path}
                        className="block px-4 py-2.5 text-sm text-charcoal-600 hover:text-primary-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                      >
                        {drop.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors ${location.pathname === link.path
                    ? 'bg-primary-50 text-primary-900'
                    : 'text-charcoal-800 hover:bg-gray-50'
                    }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 px-4 pb-4 flex flex-col gap-3">
            <button
              onClick={() => { setIsListPropertyModalOpen(true); setIsOpen(false); }}
              className="w-full bg-transparent border-2 border-primary-900 text-primary-900 px-6 py-3 rounded text-base font-bold hover:bg-primary-50 transition-colors cursor-pointer"
            >
              List Property
            </button>
            <button
              onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
              className="w-full bg-primary-900 text-white px-6 py-3 rounded text-base font-bold hover:bg-primary-800 transition-colors cursor-pointer"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ListPropertyModal isOpen={isListPropertyModalOpen} onClose={() => setIsListPropertyModalOpen(false)} />
    </header>
  );
};

export default Navbar;
