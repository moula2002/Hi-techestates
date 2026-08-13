import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <Helmet>
        <title>Privacy Policy | Hi-Tech Estates</title>
        <meta name="description" content="Privacy Policy for Hi-Tech Estates & Interiors" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-black font-serif text-charcoal-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-500 mb-8 italic">Last Updated: August 2026</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">1. Introduction</h2>
              <p>
                Welcome to Hi-Tech Estates & Interiors ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at info@hitachestates.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">2. Information We Collect</h2>
              <p className="mb-3">We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the Website, or otherwise contacting us.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information Provided by You:</strong> We collect names; phone numbers; email addresses; mailing addresses; and other similar information.</li>
                <li><strong>Automatically Collected Information:</strong> We automatically collect certain information when you visit, use or navigate the Website. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">3. How We Use Your Information</h2>
              <p className="mb-3">We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To facilitate account creation and logon process.</li>
                <li>To send you marketing and promotional communications regarding properties.</li>
                <li>To fulfill and manage your property inquiries.</li>
                <li>To post testimonials with your consent.</li>
                <li>To protect our Website and enforce our terms, conditions, and policies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">4. Will Your Information Be Shared With Anyone?</h2>
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may disclose your information to third-party service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., legal advisors, property developers).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">5. How Long Do We Keep Your Information?</h2>
              <p>
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">6. Contact Us</h2>
              <p>
                If you have questions or comments about this policy, you may email us at <strong>info@hitachestates.com</strong> or by post to:
              </p>
              <p className="mt-4 font-semibold text-charcoal-900">
                Hi-Tech Estates & Interiors<br />
                #45, 1st Main Road, JP Nagar 7th Phase,<br />
                Bangalore - 560078
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
