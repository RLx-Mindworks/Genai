import React, { useState } from 'react';
import Link from 'next/link';

// --- Interfaces ---

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: string;
  features: PricingFeature[];
  buttonText: string;
  buttonStyle: 'primary' | 'secondary' | 'highlight';
  highlighted?: boolean;
}

// --- Design System Colors & Components Mapping ---
// Note: In a real Next.js/Tailwind project, custom colors would be defined in tailwind.config.ts
// and component styles might be extracted into separate utility classes or helper functions.
// For a self-contained, copy-pasteable component without modifying tailwind.config.ts,
// we're using direct hex values and full Tailwind class strings as provided by the design system.

const DS_COLORS = {
  primary: '#4A90E2',
  secondary: '#6A789C',
  background: '#FFFFFF',
  text_primary: '#1A1A1A',
  text_secondary: '#888888',
  section_background: '#E8EBF2',
  button_highlight_color: '#50E3C2',
  // Specific hover colors for buttons from design system
  button_primary_hover: '#3D77FD',
  button_secondary_hover: '#586483',
  button_highlight_hover: '#43C2A9',
};

const DS_COMPONENTS = {
  button_primary: `bg-[${DS_COLORS.primary}] text-white rounded-md px-6 py-3 text-base font-semibold whitespace-nowrap hover:bg-[${DS_COLORS.button_primary_hover}]`,
  button_secondary: `bg-[${DS_COLORS.secondary}] text-white rounded-md px-6 py-3 text-base font-semibold whitespace-nowrap hover:bg-[${DS_COLORS.button_secondary_hover}]`,
  button_highlight: `bg-[${DS_COLORS.button_highlight_color}] text-white rounded-md px-6 py-3 text-base font-semibold whitespace-nowrap hover:bg-[${DS_COLORS.button_highlight_hover}]`,
  card_default: `bg-[${DS_COLORS.background}] rounded-xl shadow-md p-8 flex flex-col items-center text-center text-[${DS_COLORS.text_primary}]`,
  card_highlighted: `bg-[${DS_COLORS.primary}] text-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center`,
  input_text: `bg-white border border-gray-300 rounded-md px-4 py-2 text-base text-[${DS_COLORS.text_primary}] placeholder-[${DS_COLORS.text_secondary}] focus:outline-none focus:ring-2 focus:ring-[${DS_COLORS.primary}] focus:border-transparent`,
  heading_1: `text-5xl lg:text-6xl font-extrabold text-[${DS_COLORS.text_primary}] text-center leading-tight`,
  heading_2: `text-3xl lg:text-4xl font-semibold text-[${DS_COLORS.text_primary}] leading-tight`,
  body_text: `text-base lg:text-lg font-normal text-[${DS_COLORS.text_primary}] leading-relaxed`,
  pricing_figure: `text-4xl lg:text-5xl font-extrabold text-[${DS_COLORS.text_primary}] leading-none`,
  pricing_period: `text-xs lg:text-sm font-normal text-[${DS_COLORS.text_secondary}]`,
  feature_list_item: `text-sm lg:text-base font-normal text-[${DS_COLORS.text_primary}]`,
  section_background: `bg-[${DS_COLORS.section_background}]`,
  text_primary_color: `text-[${DS_COLORS.text_primary}]`,
  text_secondary_color: `text-[${DS_COLORS.text_secondary}]`,
};

// --- Component Data ---

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'For individuals and small teams',
    price: 0,
    period: 'Forever',
    features: [
      { text: '10,000 requests/month', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Community support', included: true },
      { text: 'Limited integrations', included: false },
      { text: 'No custom domains', included: false },
    ],
    buttonText: 'Get Started',
    buttonStyle: 'secondary',
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    tagline: 'For growing businesses and startups',
    price: 12,
    period: 'month',
    features: [
      { text: '1,000,000 requests/month', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority email support', included: true },
      { text: '50+ integrations', included: true },
      { text: 'Custom domains', included: true },
    ],
    buttonText: 'Upgrade Now',
    buttonStyle: 'highlight', // This button's style is also explicitly 'highlight'
    highlighted: true,
  },
  {
    id: 'business',
    name: 'Business Plan',
    tagline: 'For large teams and enterprises',
    price: 49,
    period: 'month',
    features: [
      { text: 'Unlimited requests', included: true },
      { text: 'Real-time analytics', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'All integrations', included: true },
      { text: 'SLA guarantee', included: true },
    ],
    buttonText: 'Start Business Plan',
    buttonStyle: 'secondary',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Custom solutions for your needs',
    price: 99, // Placeholder, usually requires contact
    period: 'month',
    features: [
      { text: 'On-premise deployment', included: true },
      { text: '24/7 premium support', included: true },
      { text: 'Custom feature development', included: true },
      { text: 'Security audits', included: true },
      { text: 'Dedicated infrastructure', included: true },
    ],
    buttonText: 'Contact Us',
    buttonStyle: 'secondary',
  },
];

const PricingPage: React.FC = () => {
  const [users, setUsers] = useState<number>(10);
  const [email, setEmail] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Helper to get button classes based on style and highlight state
  const getButtonClass = (style: 'primary' | 'secondary' | 'highlight') => {
    switch (style) {
      case 'primary':
        return DS_COMPONENTS.button_primary;
      case 'secondary':
        return DS_COMPONENTS.button_secondary;
      case 'highlight':
        return DS_COMPONENTS.button_highlight;
      default:
        return DS_COMPONENTS.button_secondary; // Fallback
    }
  };

  return (
    <div className={`min-h-screen bg-[${DS_COLORS.background}] flex flex-col`}>
      {/* Header */}
      <header className={`py-4 px-6 md:px-12 flex items-center justify-between shadow-sm bg-white z-20`}>
        <div className="flex items-center">
          <Link href="/" className={`text-2xl font-bold text-[${DS_COLORS.primary}]`}>
            YourLogo
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" className={`text-[${DS_COLORS.text_primary}] font-semibold hover:text-[${DS_COLORS.primary}]`}>
            Home
          </Link>
          <Link href="#" className={`text-[${DS_COLORS.text_primary}] font-semibold hover:text-[${DS_COLORS.primary}]`}>
            Features
          </Link>
          <Link href="#" className={`text-[${DS_COLORS.primary}] font-semibold hover:text-[${DS_COLORS.primary}]`}>
            Pricing
          </Link>
          <Link href="#" className={`text-[${DS_COLORS.text_primary}] font-semibold hover:text-[${DS_COLORS.primary}]`}>
            About
          </Link>
          <button className={DS_COMPONENTS.button_secondary}>
            Get Started
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`text-[${DS_COLORS.text_primary}] focus:outline-none`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-white z-30 flex flex-col items-center py-8 space-y-6"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className={`absolute top-4 right-6 text-[${DS_COLORS.text_primary}] focus:outline-none`}
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <Link href="#" className={`text-2xl text-[${DS_COLORS.text_primary}] font-semibold hover:text-[${DS_COLORS.primary}]`} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="#" className={`text-2xl text-[${DS_COLORS.text_primary}] font-semibold hover:text-[${DS_COLORS.primary}]`} onClick={() => setMobileMenuOpen(false)}>
            Features
          </Link>
          <Link href="#" className={`text-2xl text-[${DS_COLORS.primary}] font-semibold hover:text-[${DS_COLORS.primary}]`} onClick={() => setMobileMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="#" className={`text-2xl text-[${DS_COLORS.text_primary}] font-semibold hover:text-[${DS_COLORS.primary}]`} onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <button className={DS_COMPONENTS.button_secondary} onClick={() => setMobileMenuOpen(false)}>
            Get Started
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        {/* Hero / Intro Section */}
        <section className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <h1 className={`${DS_COMPONENTS.heading_1} mb-4`}>
            Choose Your Plan
          </h1>
          <p className={`${DS_COMPONENTS.body_text} ${DS_COMPONENTS.text_secondary_color} mb-8 max-w-2xl mx-auto`}>
            Find the perfect plan for your needs. Scale up or down as your business grows.
          </p>

          {/* User Count Slider */}
          <div className="flex flex-col items-center mb-12">
            <div className={`text-xl font-semibold mb-4 text-[${DS_COLORS.text_primary}]`}>
              <label htmlFor="user-range-slider" className="sr-only">Number of users:</label>
              {users === 50 ? '50+ Users' : `${users} Users`}
            </div>
            <input
              id="user-range-slider"
              type="range"
              min="1"
              max="50"
              value={users}
              onChange={(e) => setUsers(parseInt(e.target.value))}
              className={`w-full md:w-3/4 lg:w-1/2 h-2 rounded-lg appearance-none cursor-pointer accent-[${DS_COLORS.primary}]`}
              style={{
                // Custom background for the range input track to mimic the UI design
                background: `linear-gradient(to right, ${DS_COLORS.primary} ${((users - 1) / 49) * 100}%, #ddd ${((users - 1) / 49) * 100}%)`
              }}
              aria-valuemin={1}
              aria-valuemax={50}
              aria-valuenow={users}
              aria-valuetext={users === 50 ? '50 or more users' : `${users} users`}
            />
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`${plan.highlighted ? DS_COMPONENTS.card_highlighted : DS_COMPONENTS.card_default} 
                p-8 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 w-full max-w-sm`}
              role="region"
              aria-labelledby={`${plan.id}-plan-title`}
            >
              <h2 id={`${plan.id}-plan-title`} className={`${DS_COMPONENTS.heading_2} ${plan.highlighted ? 'text-white' : DS_COMPONENTS.text_primary_color} mb-2`}>
                {plan.name}
              </h2>
              <p className={`${DS_COMPONENTS.body_text} ${plan.highlighted ? 'text-white' : DS_COMPONENTS.text_secondary_color} mb-6 text-sm`}>
                {plan.tagline}
              </p>

              <div className="flex items-baseline mb-6">
                <span className={`${DS_COMPONENTS.pricing_figure} ${plan.highlighted ? 'text-white' : DS_COMPONENTS.text_primary_color}`}>
                  ${plan.price}
                </span>
                <span className={`${DS_COMPONENTS.pricing_period} ${plan.highlighted ? 'text-white/70' : DS_COLORS.text_secondary} ml-1`}>
                  /{plan.period}
                </span>
              </div>

              <ul className="mb-8 space-y-3 w-full text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className={`flex items-center ${DS_COMPONENTS.feature_list_item} ${plan.highlighted ? 'text-white' : DS_COMPONENTS.text_primary_color}`}>
                    <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.highlighted ? `text-[${DS_COLORS.button_highlight_color}]` : DS_COMPONENTS.text_primary_color}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    {feature.text}
                  </li>
                ))}
              </ul>

              <button className={getButtonClass(plan.buttonStyle)}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </section>
      </main>

      {/* Newsletter Section */}
      <section className={`${DS_COMPONENTS.section_background} py-16 px-4 md:py-24 text-center`}>
        <div className="max-w-3xl mx-auto">
          <h2 className={`${DS_COMPONENTS.heading_2} text-[${DS_COLORS.text_primary}] mb-6`}>
            Get our weekly updates
          </h2>
          <p className={`${DS_COMPONENTS.body_text} text-[${DS_COLORS.text_secondary}] mb-8`}>
            Join our newsletter and stay up-to-date with our latest features, pricing, and offers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
            <label htmlFor="email-input" className="sr-only">Your Email</label>
            <input
              id="email-input"
              type="email"
              placeholder="Your Email"
              className={`flex-grow w-full sm:w-auto ${DS_COMPONENTS.input_text}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Enter your email for newsletter"
            />
            <button className={`${DS_COMPONENTS.button_primary} w-full sm:w-auto`}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer (Simple Placeholder) */}
      <footer className="bg-white py-8 px-4 text-center text-[${DS_COLORS.text_secondary}]">
        <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="#" className={`hover:text-[${DS_COLORS.primary}]`}>Privacy Policy</Link>
          <Link href="#" className={`hover:text-[${DS_COLORS.primary}]`}>Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;