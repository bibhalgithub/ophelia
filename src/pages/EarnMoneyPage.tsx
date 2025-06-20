// src/pages/EarnMoneyPage.tsx
import React from 'react';
import {  useNavigate } from 'react-router-dom';
import {  TrendingUp, HandCoins,  UploadCloud } from 'lucide-react';


const Button: React.FC<{ variant?: string; children: React.ReactNode; onClick?: () => void }> = ({ variant, children, onClick }) => {
    let baseClasses = "font-semibold py-3 px-8 rounded-full transition-colors duration-300";
    let variantClasses = "";

    if (variant === "primary") {
        variantClasses = "bg-green-500 text-white hover:bg-green-600";
    } else if (variant === "secondary") {
        variantClasses = "bg-white text-green-500 border border-green-500 hover:bg-green-50";
    } else {
        variantClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300"; // Default
    }
    return (
        <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
            {children}
        </button>
    );
};

const EarnMoneyPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100  text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Unlock Your Wardrobe's Value: Earn Money with Ophelia
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Transform your unused clothes into income. Ophelia provides a seamless platform for you to sell pre-loved fashion and generate cash, all while contributing to a circular economy.
          </p>
          <Button variant="primary" onClick={() => navigate('/seller/dashboard')}>Start Earning Now</Button>
        </div>
      </section>

      {/* How to Earn */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Your Path to Passive Income
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md">
                <UploadCloud size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">List Easily</h3>
              <p className="text-gray-600 text-center">
                Quickly upload photos and descriptions of your items. Our intuitive interface makes it a breeze.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 shadow-md">
                <HandCoins size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Set Your Price</h3>
              <p className="text-gray-600 text-center">
                You control your pricing. Get fair value for your quality, pre-loved garments.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4 shadow-md">
                <TrendingUp size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sell & Profit</h3>
              <p className="text-gray-600 text-center">
                Connect with eager buyers, complete your sale, and receive your earnings directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sell with Ophelia */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Maximize Your Earnings
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Ophelia provides a wide audience of conscious consumers looking for unique and affordable fashion. Our platform is designed to connect you efficiently with buyers, ensuring your items find new homes quickly.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
                src="/n9.png" 
                alt="Awesome product"
                className="w-full h-auto rounded-lg shadow-xl"
                style={{ maxHeight: '400px' }}
             />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
      Simple Payments, Happy Sellers
    </h2>
    <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
      We ensure a straightforward payment process, so your earnings are transferred securely and efficiently. Join thousands of sellers who are making money and a difference.
    </p>
    <img
      src="/n10.png" // <-- This is the key part for your image
      alt="Awesome product" // Consider a more descriptive alt text for this specific image context
      className="w-full h-auto rounded-lg shadow-xl"
      style={{ maxHeight: '600px' }} // Inline style to limit max height
    />
  </div>
</section>

      {/* Final Call to Action */}
      <section className="py-16 bg-green-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Turn Your Closet into Cash?
          </h2>
          <Button variant="secondary" onClick={() => navigate('/signup')}>Start Selling Now</Button>
        </div>
      </section>
    </div>
  );
};

export default EarnMoneyPage;