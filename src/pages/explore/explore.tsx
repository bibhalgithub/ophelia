import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, MessageSquare, DollarSign,  } from 'lucide-react'; // Import Lucide icons

// Assuming a basic Button component similar to the one we discussed
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


const ExplorePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero/Intro Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'url(/path-to-subtle-pattern-or-texture.png)' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Explore Ophelia: Your Journey to Sustainable Style
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Welcome to Ophelia – your gateway to sustainable fashion. Discover how easy it is to embrace circular style, sell pre-loved clothes, and find unique treasures, all while helping our planet.
          </p>
          <Link to="/signup">
            <Button variant="primary">Start Your Sustainable Journey</Button>
          </Link>
        </div>
      </section>

      {/* How It Works - Selling on Ophelia */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Selling on Ophelia: Simple Steps to Sustainable Earnings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1: Click & Curate */}
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md">
                <Camera size={64} strokeWidth={1.5} /> {/* Lucide Camera Icon */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Click & Curate</h3>
              <p className="text-gray-600 text-center">
                Simply snap high-quality photos of your pre-loved items. Show off every detail, angle, and unique feature to attract buyers.
              </p>
            </div>
            {/* Step 2: Upload & Describe */}
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 shadow-md">
                <Upload size={64} strokeWidth={1.5} /> {/* Lucide Upload Icon */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Upload & Describe</h3>
              <p className="text-gray-600 text-center">
                Quickly upload your photos to your Ophelia listing. Add a clear, honest description, set your price, and list effortlessly.
              </p>
            </div>
            {/* Step 3: Connect & Sell Directly */}
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-4 shadow-md">
                <MessageSquare size={64} strokeWidth={1.5} /> {/* Lucide MessageSquare Icon */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Connect & Sell Directly</h3>
              <p className="text-gray-600 text-center">
                Buyers can message you directly via WhatsApp for inquiries and purchases. Enjoy seamless, transparent communication from offer to sale.
              </p>
            </div>
            {/* Step 4: Earn & Empower */}
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4 shadow-md">
                <DollarSign size={64} strokeWidth={1.5} /> {/* Lucide DollarSign Icon */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Earn & Empower</h3>
              <p className="text-gray-600 text-center">
                Once your item sells, you earn money from clothes you no longer need. Contribute to a sustainable cycle and empower others' style.
              </p>
            </div>
          </div>
        </div>
      </section>
      

      {/* How It Works - Buying on Ophelia */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Buying on Ophelia: Your Sustainable Style Awaits
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Explore Ophelia's diverse marketplace for unique, sustainable fashion finds. Browse by category, style, or brand to discover exactly what you want, at a fraction of retail price. Each purchase extends a garment's life, supporting a greener planet.
            </p>
            <Link to="/signin"> {/* Link to your actual product listing page */}
              <Button variant="secondary">Start Shopping</Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            {/* Original image restored */}
            <img src="/sh18.jpg" alt="Buying on Ophelia" className="rounded-lg shadow-xl w-full h-auto"/>
          </div>
        </div>
      </section>

      {/* Why Ophelia Section with Video */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose Ophelia?
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-700 mb-6">
                Why Ophelia? We transform fashion by uniting buyers and sellers under one roof. Easily earn from your pre-loved clothes, discover unique styles, and actively help nature by reducing waste. Join our vibrant community for smart, sustainable, and impactful style choices.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Beyond just transactions, Ophelia fosters a movement. We're committed to making circular fashion the first choice, promoting conscious consumption and environmental responsibility.
              </p>
            </div>
            <div className="lg:w-1/2">
              {/* Actual Video Element */}
              <video
                controls // Adds playback controls (play/pause, volume, fullscreen)
                className="aspect-video w-full rounded-lg shadow-xl overflow-hidden bg-gray-200"
              >
                <source src="/logoo.mp4" type="video/mp4" /> {/* Your video file path */}
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-green-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Embrace Sustainable Fashion?
          </h2>
          <Link to="/signup">
            <Button variant="secondary">Join Ophelia Today</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;