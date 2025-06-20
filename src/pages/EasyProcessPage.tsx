// src/pages/EasyProcessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, UploadCloud, MessageSquare, DollarSign } from 'lucide-react';

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

const EasyProcessPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100  text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Effortless Selling & Buying: Our Simple Process
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Ophelia is designed for simplicity. Whether you're decluttering your closet or hunting for unique finds, our streamlined process makes sustainable fashion accessible to everyone.
          </p>
          <Link to="/signup">
            <Button variant="primary">Get Started Now</Button>
          </Link>
        </div>
      </section>

      {/* Selling Process Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Sell Your Clothes in 4 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 shadow-md">
                <Camera size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Snap & Style</h3>
              <p className="text-gray-600 text-center">
                Take clear, well-lit photos of your items. Showcase them beautifully to attract buyers.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-4 shadow-md">
                <UploadCloud size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. List & Describe</h3>
              <p className="text-gray-600 text-center">
                Upload your photos, add a detailed description, and set your desired price in minutes.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4 shadow-md">
                <MessageSquare size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Connect & Transact</h3>
              <p className="text-gray-600 text-center">
                Buyers message you directly on WhatsApp to finalize details. Enjoy direct and clear communication.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md">
                <DollarSign size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Earn & Repeat</h3>
              <p className="text-gray-600 text-center">
                Once sold, enjoy your earnings and the satisfaction of contributing to a circular economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Buying Process Overview */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Buying Made Easy: Find Your Perfect Piece
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Discover unique pre-loved fashion effortlessly. Our intuitive search and direct communication make finding your next favorite outfit a breeze.
            </p>
            <Link to="/buyer/browse">
              <Button variant="secondary">Start Shopping Now</Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
                src="/n1.png" 
                alt="Awesome product"
                className="w-full h-auto rounded-lg shadow-xl"
                style={{ maxHeight: '400px' }}
             />
          </div>
        </div>
      </section>

      {/* Testimonials or Quick Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Tips for a Smooth Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">For Sellers: Detail is Key</h3>
              <p className="text-gray-600">
                Provide accurate measurements and honest descriptions to build buyer trust and speed up sales.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">For Buyers: Ask Away!</h3>
              <p className="text-gray-600">
                Don't hesitate to use direct communication to clarify any doubts before purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-green-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Simplify Your Sustainable Fashion Journey?
          </h2>
          <Link to="/signup">
            <Button variant="secondary">Join Ophelia Today</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EasyProcessPage;