// Place in app/generated-ui/page.tsx

// GeneratedComponent.tsx
import React from 'react';

const PricingPage: React.FC = () => {
  return (
    <div className="bg-background-DEFAULT font-sans">
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-neutral-darkest">
            Your Logo
          </a>
          <nav className="flex items-center">
            <a href="/" className="text-neutral-dark hover:text-primary-DEFAULT px-3 py-2 rounded-md">
              Home
            </a>
            <a href="/blog" className="text-neutral-dark hover:text-primary-DEFAULT px-3 py-2 rounded-md">
              Blog
            </a>
            <a href="/service" className="text-neutral-dark hover:text-primary-DEFAULT px-3 py-2 rounded-md">
              Service <span className="ml-1">&#x25BE;</span>
            </a>
            <a href="/about" className="text-neutral-dark hover:text-primary-DEFAULT px-3 py-2 rounded-md">
              About
            </a>
            <a href="/contact" className="text-neutral-dark hover:text-primary-DEFAULT px-3 py-2 rounded-md">
              Contact
            </a>
            <button className="bg-primary-DEFAULT text-background-white font-semibold rounded-md py-2 px-4 hover:bg-primary-dark ml-4">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="text-center mb-8">
          <p className="text-sm font-light text-neutral-medium">Pricing plan</p>
          <h1 className="text-4xl font-bold text-neutral-darkest mb-4">Choose the Perfect Plan for Your Needs</h1>
          <p className="text-base font-normal text-neutral-dark">
            Flexible pricing to scale with your business.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex justify-center items-center space-x-4">
            <span className="text-neutral-medium">250 users</span>
            {/* Placeholder for Slider Component */}
            <div className="w-64 h-2 bg-neutral-light rounded-full">
              <div className="h-full bg-primary-DEFAULT rounded-full w-1/4">
                <div className="w-6 h-6 bg-primary-DEFAULT rounded-full absolute -mt-2 ml-auto"></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Basic Plan */}
            <div className="bg-background-white rounded-lg shadow-md p-4">
              <h3 className="text-2xl font-bold text-neutral-darkest mb-2">Basic Plan</h3>
              <h2 className="text-3xl font-bold text-neutral-darkest">$9/month</h2>
              <p className="text-base font-normal text-neutral-dark mb-4">
                Individuals just starting out.
              </p>
              <ul className="list-none pl-0 mb-4">
                <li className="flex items-center text-neutral-dark">
                  <span className="mr-2">&#x2713;</span> 5 Projects
                </li>
                <li className="flex items-center text-neutral-dark">
                  <span className="mr-2">&#x2713;</span> 10 GB Storage
                </li>
                <li className="flex items-center text-neutral-dark">
                  <span className="mr-2">&#x2713;</span> Basic Support
                </li>
              </ul>
              <button className="bg-primary-DEFAULT text-background-white font-semibold rounded-md py-2 px-4 hover:bg-primary-dark">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-primary-dark rounded-lg shadow-md p-4 mt-[-20px]">
              <h3 className="text-2xl font-bold text-background-white mb-2">Pro Plan</h3>
              <h2 className="text-3xl font-bold text-background-white">$19/month</h2>
              <p className="text-base font-normal text-background-white mb-4">
                Freelancers and Small Teams.
              </p>
              <ul className="list-none pl-0 mb-4">
                <li className="flex items-center text-background-white">
                  <span className="mr-2">&#x2713;</span> Unlimited Projects
                </li>
                <li className="flex items-center text-background-white">
                  <span className="mr-2">&#x2713;</span> 50 GB Storage
                </li>
                <li className="flex items-center text-background-white">
                  <span className="mr-2">&#x2713;</span> Priority Support
                </li>
              </ul>
              <button className="bg-accent text-background-white font-semibold rounded-md py-2 px-4 hover:bg-accent-dark">
                Upgrade Now
              </button>
            </div>

            {/* Business Plan */}
            <div className="bg-background-white rounded-lg shadow-md p-4">
              <h3 className="text-2xl font-bold text-neutral-darkest mb-2">Business Plan</h3>
              <h2 className="text-3xl font-bold text-neutral-darkest">$99/month</h2>
              <p className="text-base font-normal text-neutral-dark mb-4">
                Growing Businesses.
              </p>
              <ul className="list-none pl-0 mb-4">
                <li className="flex items-center text-neutral-dark">
                  <span className="mr-2">&#x2713;</span> Unlimited Projects
                </li>
                <li className="flex items-center text-neutral-dark">
                  <span className="mr-2">&#x2713;</span> 1 TB Storage
                </li>
                <li className="flex items-center text-neutral-dark">
                  <span className="mr-2">&#x2713;</span> 24/7 Support
                </li>
              </ul>
              <button className="bg-primary-DEFAULT text-background-white font-semibold rounded-md py-2 px-4 hover:bg-primary-dark">
                Get Started
              </button>
            </div>

             {/* Enterprise Plan */}
             <div className="bg-background-white rounded-lg shadow-md p-4">
              <h3 className="text-2xl font-bold text-neutral-darkest mb-2">Enterprise Plan</h3>
              <h2 className="text-3xl font-bold text-neutral-darkest">Contact Us</h2>
              <p className="text-base font-normal text-neutral-dark mb-4">
                Organizations with Custom Needs
              </p>
              <ul className="list-none pl-0 mb-4">
                <li className="flex items-center text-neutral-dark">
                  <span className="mr-2">&#x2713;</span> Custom Projects
                </li>
                <li className="flex items-center text-neutral-dark">
                  <span className="mr-2">&#x2713;</span> Unlimited Storage
                </li>
                <li className="flex items-center text-neutral-dark">
                  <span className="mr-2">&#x2713;</span> Dedicated Support
                </li>
              </ul>
              <button className="bg-primary-DEFAULT text-background-white font-semibold rounded-md py-2 px-4 hover:bg-primary-dark">
                Contact Us
              </button>
            </div>
          </div>
        </section>

        <section className="bg-primary-dark py-12 mt-12 rounded-md">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-background-white mr-2">&#x2709;</span>
              <h2 className="text-3xl font-bold text-background-white">Newsletter</h2>
            </div>
            <p className="text-base font-normal text-background-white mb-6">
              Subscribe to our newsletter for the latest updates and special offers.
            </p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-background-white border border-neutral-light rounded-md py-2 px-3 text-neutral-darkest w-64 mr-2"
              />
              <button className="bg-primary-DEFAULT text-background-white font-semibold rounded-md py-2 px-4 hover:bg-primary-dark">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-darkest py-8 text-center text-background-white">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PricingPage;
