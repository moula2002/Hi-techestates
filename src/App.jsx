import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SmoothScroll from './components/layout/SmoothScroll';
import Layout from './components/layout/Layout';
import UniqueLoader from './components/ui/UniqueLoader';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const PropertyServices = lazy(() => import('./pages/PropertyServices'));
const InteriorDesigns = lazy(() => import('./pages/InteriorDesigns'));
const HomeLoanServices = lazy(() => import('./pages/HomeLoanServices'));
const Properties = lazy(() => import('./pages/Properties'));
const Career = lazy(() => import('./pages/Career'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Locality = lazy(() => import('./pages/Locality'));
const Projects = lazy(() => import('./pages/Projects'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));

// Fallback loader for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
    <UniqueLoader />
  </div>
);



function App() {
  useEffect(() => {
    AOS.init({
      duration: 400, // Faster animations for a snappier feel
      once: true, // Only animate once to reduce visual clutter on scroll up
      offset: 50, // Trigger animations slightly earlier
    });
  }, []);

  return (
    <>
      <SmoothScroll>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/property-services" element={<PropertyServices />} />
              <Route path="/interior-designs" element={<InteriorDesigns />} />
              <Route path="/home-loan" element={<HomeLoanServices />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/career" element={<Career />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/locality/:areaName" element={<Locality />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
            </Routes>
          </Suspense>
        </Layout>
      </SmoothScroll>
    </>
  );
}

export default App;
