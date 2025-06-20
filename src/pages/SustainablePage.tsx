// src/pages/SustainablePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf,   Droplets, Factory } from 'lucide-react';


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

const SustainablePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100  text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Sustainable Fashion: Style with a Purpose on Ophelia
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Every choice matters. By embracing secondhand fashion with Ophelia, you contribute directly to a healthier planet, reduce waste, and champion ethical consumption.
          </p>
          <Link to="/buyer/browse">
            <Button variant="primary">Shop Sustainably Now</Button>
          </Link>
        </div>
      </section>

      {/* The Impact of Fast Fashion */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            The Hidden Cost of New Clothes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-4 shadow-md">
                <Droplets size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Water Waste</h3>
              <p className="text-gray-600 text-center">
                Thousands of liters of water are used to produce a single new garment.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 mb-4 shadow-md">
                <Factory size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Carbon Emissions</h3>
              <p className="text-gray-600 text-center">
                Manufacturing and transporting new clothing contribute heavily to greenhouse gases.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md">
                <Leaf size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Landfill Overload</h3>
              <p className="text-gray-600 text-center">
                Millions of tons of textile waste end up in landfills each year, slowly decomposing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Ophelia Solution */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How Ophelia Champions Sustainability
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              By giving pre-loved clothes a second life, Ophelia directly combats fashion waste and promotes a **circular economy**. Every purchase and sale reduces demand for new production, conserving resources and minimizing environmental harm.
            </p>
            <Link to="/Mission">
              <Button variant="secondary">Learn More About Our Mission</Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
                src="/n11.jpg" 
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
      Be Part of the Green Fashion Movement
    </h2>
    <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
      Your choice to buy or sell secondhand is a powerful statement. Join the Ophelia community and become an active participant in building a more sustainable and ethical fashion future.
    </p>
    <img
      src="/n12.png" // <-- This is the key part for your image
      alt="Awesome product" // Consider a more descriptive alt text for this specific image context
      className="w-full h-auto rounded-lg shadow-xl"
      style={{ maxHeight: '650px' }} // Inline style to limit max height
    />
  </div>
</section>

      {/* Final Call to Action */}
      <section className="py-16 bg-green-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Sustainable Difference?
          </h2>
          <Link to="/signup">
            <Button variant="secondary">Join Ophelia Today</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SustainablePage;