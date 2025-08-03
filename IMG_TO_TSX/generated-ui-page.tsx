
import React, { useState } from 'react';

// TypeScript Interfaces for data structure
interface Feature {
  id: number;
  text: string;
}

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  isHighlighted?: boolean;
  buttonText: string;
  buttonClasses?: string; // Optional custom classes for the button
}

// Inline SVG Checkmark Icon Component
const CheckIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-[#20C997] mr-2 flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<number>(10);

  // Pricing plan data
  const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      name: 'Basic Plan',
      price: '$19',
      period: '/month',
      description: 'Ideal for individuals and small teams getting started.',
      features: [
        { id: 1, text: 'Unlimited Projects' },
        { id: 2, text: '5 GB Storage' },
        { id: 3, text: 'Basic Analytics' },
        { id: 4, text: 'Email Support' },
      ],
      buttonText: 'Get Started',
    },
    {
      id: 2,
      name: 'Pro Plan',
      price: '$49',
      period: '/month',
      description: 'Perfect for growing teams needing more power.',
      features: [
        { id: 1, text: 'All Basic features' },
        { id: 2, text: '50 GB Storage' },
        { id: 3, text: 'Advanced Analytics' },
        { id: 4, text: 'Priority Email Support' },
        { id: 5, text: 'Customizable Dashboards' },
      ],
      isHighlighted: true,
      buttonText: 'Upgrade Now',
      buttonClasses: 'bg-[#20C997] hover:bg-[#1DAA80] focus:ring-[#1DAA80]', // Secondary accent color
    },
    {
      id: 3,
      name: 'Enterprise Plan',
      price: '$99',
      period: '/month',
      description: 'For large organizations requiring comprehensive solutions.',
      features: [
        { id: 1, text: 'All Pro features' },
        { id: 2, text: 'Unlimited Storage' },
        { id: 3, text: 'Real-time Analytics' },
        { id: 4, text: '24/7 Phone Support' },
        { id: 5, text: 'Dedicated Account Manager' },
        { id: 6, text: 'SSO & Advanced Security' },
      ],
      buttonText: 'Get Started',
    },
    {
      id: 4,
      name: 'Custom Plan',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for unique business needs.',
      features: [
        { id: 1, text: 'Scalable Features' },
        { id: 2, text: 'Dedicated Infrastructure' },
        { id: 3, text: 'Custom Integrations' },
        { id: 4, text: 'On-site Training' },
        { id: 5, text: 'Premium Support SLAs' },
      ],
      buttonText: 'Contact Us',
    },
  ];

  // Design System Button Class
  const defaultButtonClass = "bg-[#2F80ED] text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200 shadow-md";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* Header Section */}
      <header className="py-6 px-4 md:px-8 lg:px-16 border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">Acme Inc.</div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <li><a href="#features" className="hover:text-[#2F80ED] transition-colors duration-200">Features</a></li>
            <li><a href="#pricing" className="hover:text-[#2F80ED] transition-colors duration-200">Pricing</a></li>
            <li><a href="#blog" className="hover:text-[#2F80ED] transition-colors duration-200">Blog</a></li>
          </ul>

          {/* Header Button */}
          <div>
            <button className={defaultButtonClass}>Sign In</button>
          </div>
        </nav>
      </header>

      <main>
        {/* Pricing Section */}
        <section id="pricing" className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Simple, transparent pricing.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              No hidden fees. No surprises. Just great service that scales with your needs.
            </p>

            {/* Slider / Toggle */}
            <div className="flex flex-col items-center justify-center space-y-4 mb-12">
              <span className="text-xl font-semibold text-[#2F80ED] tracking-wide">
                Users: {users}
              </span>
              <input
                type="range"
                min="1"
                max="100"
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="w-full max-w-md h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:bg-[#2F80ED] [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg
                           [&::-moz-range-thumb]:bg-[#2F80ED] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg
                           [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-gray-200
                           [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:bg-gray-200"
              />
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between
                  ${plan.isHighlighted ? 'border-2 border-[#2F80ED] transform scale-105 transition-transform duration-300' : 'border border-gray-200'}`}
              >
                {plan.isHighlighted && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2F80ED] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="text-5xl font-extrabold text-gray-900 mb-6">
                    {plan.price}
                    <span className="text-xl text-gray-500 font-medium">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-gray-700">
                    {plan.features.map((feature) => (
                      <li key={feature.id} className="flex items-start">
                        <CheckIcon />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`${defaultButtonClass} w-full mt-auto ${plan.buttonClasses || ''}`}
                  onClick={() => alert(`Starting with ${plan.name}!`)}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-[#2F80ED] text-white py-16 px-4 md:px-8 lg:px-16 mt-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Newsletter Icon (optional, for visual flair) */}
            <svg
              className="mx-auto h-16 w-16 text-white mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 12H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2z"
              ></path>
            </svg>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay up to date with our newsletter
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Get the latest news, updates, and special offers delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-80 px-5 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-shadow duration-200 shadow-sm"
              />
              <button
                type="submit"
                className="bg-[#20C997] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#1DAA80] focus:outline-none focus:ring-2 focus:ring-[#1DAA80] focus:ring-opacity-75 transition-colors duration-200 shadow-md w-full sm:w-auto"
                onClick={(e) => { e.preventDefault(); alert('Subscribed!'); }}
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm mt-4 opacity-80">
              By subscribing, you agree to our <a href="#" className="underline hover:text-white/80">Privacy Policy</a>.
            </p>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="py-8 px-4 md:px-8 lg:px-16 text-center text-gray-500 bg-gray-50 border-t border-gray-100">
        <p>&copy; {new Date().getFullYear()} Acme Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
