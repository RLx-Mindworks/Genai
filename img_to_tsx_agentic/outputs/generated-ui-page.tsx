// Generated UI Component - Ready for Next.js deployment
// Place in: app/generated-ui/page.tsx or pages/generated-ui.tsx

'use client'; // This component uses useState, making it a client component.

import React, { useState } from 'react';

// --- Type Definitions ---

interface NavItemProps {
  label: string;
  href: string;
}

interface PricingPlan {
  name: string;
  price: number;
  pricePer: string; // e.g., "/month"
  description: string;
  features: string[];
  isEmphasized?: boolean; // For the 'Pro Plan' style
}

// --- Reusable Icon Components ---
// These are simple SVG icons for visual flair, matching the UI analysis.

const CheckIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-blue-600 flex-shrink-0 mr-2"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const UserIcon: React.FC = () => (
  <svg
    className="w-6 h-6 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 20h-4a2 2 0 01-2-2v-2a4 4 0 00-4-4H7a4 4 0 00-4-4V6a2 2 0 012-2h10a2 2 0 012 2v2a4 4 0 004 4v2a2 2 0 01-2 2z"
    ></path>
  </svg>
);

const EmailIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
  </svg>
);

// --- Main Page Component ---

const PricingPage: React.FC = () => {
  // State for the user count slider, initialized based on the UI analysis
  const [userCount, setUserCount] = useState<number>(250);
  // State for the newsletter email input
  const [email, setEmail] = useState<string>('');

  // Navigation items data
  const navItems: NavItemProps[] = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  // Pricing plan data based on UI analysis
  const pricingPlans: PricingPlan[] = [
    {
      name: 'Basic Plan',
      price: 9,
      pricePer: '/month',
      description: 'Perfect for small teams and individuals.',
      features: ['Up to 10 users', '2GB of storage', 'Email support', 'Basic analytics'],
      isEmphasized: false,
    },
    {
      name: 'Pro Plan',
      price: 29,
      pricePer: '/month',
      description: 'Ideal for growing businesses needing more power.',
      features: [
        'Up to 50 users',
        '10GB of storage',
        'Priority email support',
        'Advanced analytics',
        'Custom reports',
      ],
      isEmphasized: true, // This plan gets the emphasized styling
    },
    {
      name: 'Enterprise Plan',
      price: 79,
      pricePer: '/month',
      description: 'For large organizations with complex needs.',
      features: [
        'Unlimited users',
        'Unlimited storage',
        '24/7 Phone & Email support',
        'Premium analytics',
        'Dedicated account manager',
      ],
      isEmphasized: false,
    },
    {
      name: 'Custom Plan',
      price: 0, // Signifies "Contact Us" pricing
      pricePer: '',
      description: 'Tailored solutions for unique requirements.',
      features: [
        'Scalable user count',
        'Flexible storage',
        'Dedicated support',
        'API access',
        'On-premise option',
      ],
      isEmphasized: false,
    },
  ];

  // Handler for the user count slider
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCount(Number(event.target.value));
  };

  // Handler for the email input
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // Handler for newsletter form submission
  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Subscribing email:', email);
    alert(`Thanks for subscribing, ${email}!`); // Simple alert for demo
    setEmail(''); // Clear input after submission
  };

  return (
    // Main container with global styles from Design System
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header / Navigation Bar */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <div className="text-2xl font-bold text-blue-600">YourLogo</div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          {/* Hamburger menu icon for mobile (no functionality implemented for brevity) */}
          <div className="md:hidden">
            <button className="text-gray-800 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          {/* Desktop CTA Button */}
          <button className="hidden md:block bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section with User Count Slider */}
      <section className="bg-gray-50 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Choose your plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find the perfect plan for your business needs, scalable for teams of all sizes.
          </p>

          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <UserIcon />
              <span className="text-3xl font-bold text-gray-900">{userCount} users</span>
            </div>
            {/* Custom styled slider using an input range */}
            <div className="relative w-full max-w-lg h-2 bg-gray-200 rounded-full">
              {/* This div acts as the filled part of the slider track */}
              <div
                className="absolute top-0 left-0 bg-blue-600 h-2 rounded-full"
                style={{ width: `${(userCount / 1000) * 100}%` }} // Dynamic width based on userCount (max 1000 users)
              ></div>
              <input
                type="range"
                min="1"
                max="1000" // Example max users
                value={userCount}
                onChange={handleSliderChange}
                // Tailwind classes for the input range, targeting pseudo-elements for thumb styling
                className="absolute top-0 left-0 w-full h-full appearance-none bg-transparent cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                           [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md
                           [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600
                           [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
                           [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md
                           [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-600
                           focus:outline-none" // Remove default focus outline
                style={{ zIndex: 1 }} // Ensure thumb is clickable above the track fill
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Adjust user count to see personalized pricing.</p>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                // Apply specific pricing card styles based on isEmphasized flag
                className=
                  {plan.isEmphasized
                    ? 'bg-blue-600 text-white p-8 rounded-lg shadow-xl flex flex-col items-start' // pricing_card_emphasized
                    : 'bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-start' // pricing_card_default
                  }
              >
                <h3
                  className=
                    {plan.isEmphasized
                      ? 'text-3xl font-bold mb-4' // text-3xl font-bold for emphasized
                      : 'text-3xl font-bold text-gray-900 mb-4' // heading_h2 for default
                    }
                >
                  {plan.name}
                </h3>
                {/* Conditional rendering for price vs. "Contact Us" */}
                {plan.price !== 0 ? (
                  <div className="flex items-baseline mb-6">
                    <span
                      className=
                        {plan.isEmphasized
                          ? 'text-5xl font-extrabold' // text-5xl font-extrabold for emphasized
                          : 'text-5xl font-extrabold text-gray-900' // heading_h1 for default
                        }
                    >
                      ${plan.price}
                    </span>
                    <span
                      className=
                        {plan.isEmphasized
                          ? 'text-xl font-medium ml-1'
                          : 'text-xl font-medium text-gray-600 ml-1'
                        }
                    >
                      {plan.pricePer}
                    </span>
                  </div>
                ) : (
                  <p className={plan.isEmphasized ? 'text-xl mb-6' : 'text-xl text-gray-700 mb-6'}>
                    Contact Us
                  </p>
                )}

                <p
                  className=
                    {plan.isEmphasized
                      ? 'text-base mb-6 opacity-90' // body_text for emphasized (with slight opacity)
                      : 'text-base text-gray-800 mb-6' // body_text for default
                    }
                >
                  {plan.description}
                </p>
                <ul className="space-y-3 flex-grow mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckIcon />
                      <span className={plan.isEmphasized ? '' : 'text-gray-800'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* Conditional rendering for button styles */}
                {plan.name === 'Pro Plan' ? (
                  <button className="bg-teal-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:bg-teal-600 w-full text-center">
                    Upgrade Now {/* button_accent_filled */}
                  </button>
                ) : plan.name === 'Custom Plan' ? (
                  <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-md hover:bg-blue-700 w-full text-center">
                    Contact Sales {/* button_primary_filled */}
                  </button>
                ) : (
                  <button className="bg-white text-blue-600 border border-blue-600 font-bold py-3 px-6 rounded-md hover:bg-blue-50 w-full text-center">
                    Get Started {/* button_secondary_outlined */}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <EmailIcon className="mx-auto mb-6 w-12 h-12" />
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2> {/* heading_h2 */}
          <p className="text-xl opacity-90 mb-8">
            Sign up for our newsletter to receive updates, news, and exclusive offers.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-grow text-gray-800" // input_text combined with better focus style
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button
              type="submit"
              className="bg-teal-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:bg-teal-600 flex-shrink-0" // button_accent_filled
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
            <p className="text-sm">Built with Next.js and Tailwind CSS.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
