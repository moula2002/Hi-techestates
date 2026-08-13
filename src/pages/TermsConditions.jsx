import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsConditions = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <Helmet>
        <title>Terms & Conditions | Hi-Tech Estates</title>
        <meta name="description" content="Terms and Conditions for Hi-Tech Estates & Interiors" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-black font-serif text-charcoal-900 mb-8">Terms & Conditions</h1>
          <p className="text-gray-500 mb-8 italic">Last Updated: August 2026</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">1. Agreement to Terms</h2>
              <p>
                These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Hi-Tech Estates & Interiors ("we," "us," or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">2. Real Estate Consulting Disclaimer</h2>
              <p className="mb-3">By using our services, you acknowledge and agree that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hi-Tech Estates acts as a real estate broker and consultant. We do not own the properties listed unless explicitly stated.</li>
                <li>All property prices, availability, and specifications are subject to change without prior notice.</li>
                <li>We do not guarantee the accuracy of information provided by third-party builders or property owners. You are advised to independently verify all details before making a purchase or rental decision.</li>
                <li>Any architectural layouts, 3D renderings, and interior design mockups shown on the website are for representational purposes only.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">3. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">4. User Representations</h2>
              <p className="mb-3">By using the Site, you represent and warrant that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">5. Governing Law</h2>
              <p>
                These Terms shall be governed by and defined following the laws of India. Hi-Tech Estates & Interiors and yourself irrevocably consent that the courts of Bangalore, Karnataka shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">6. Contact Us</h2>
              <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
              </p>
              <p className="mt-4 font-semibold text-charcoal-900">
                Hi-Tech Estates & Interiors<br />
                # 1&2, 1st Floor, 4th Main<br />
                4th Cross, Arekere, B.G Road,<br />
                Bangalore - 560076<br />
                Phone: 080-4132 3523
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
