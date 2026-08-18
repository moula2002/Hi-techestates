import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useLocation, useNavigationType } from 'react-router-dom';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();
  const navType = useNavigationType();

  // Initialize Lenis ONCE for the entire application to prevent lag/stutter on route changes
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Fast and responsive smoothing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      wheelMultiplier: 1.2, // Balanced wheel speed
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: true, // Let Lenis manage its own performant RAF loop natively
    });

    lenisRef.current = lenis;

    // Expose a global scrollToTop function for the floating button
    window.scrollToTop = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return () => {
      delete window.scrollToTop;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // Empty dependency array ensures initialization happens exactly once!

  // Save scroll position independently of Lenis initialization
  useEffect(() => {
    if (!lenisRef.current) return;
    
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-pos-${location.key}`, window.scrollY.toString());
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.key]);

  // Handle scroll restoration and hash navigation on route change
  useEffect(() => {
    if (!lenisRef.current) return;

    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.replace('#', ''));
        if (element) {
          lenisRef.current.scrollTo(element, { immediate: false });
        }
      }, 100);
    } else if (navType === 'POP') {
      const savedPosition = sessionStorage.getItem(`scroll-pos-${location.key}`);
      if (savedPosition !== null) {
        setTimeout(() => {
          lenisRef.current.scrollTo(parseInt(savedPosition, 10), { immediate: true });
        }, 150);
      }
    } else {
      setTimeout(() => {
        lenisRef.current.scrollTo(0, { immediate: true });
      }, 50);
    }
  }, [location.pathname, location.hash, location.key, navType]);

  return <>{children}</>;
};

export default SmoothScroll;
