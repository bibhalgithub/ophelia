// src/pages/DiverseSelectionPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shirt,  ShoppingBag, Palette, } from 'lucide-react';

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



const DiverseSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100  text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Endless Style, Endless Choices: Ophelia's Diverse Collection
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            From vintage treasures to modern essentials, Ophelia offers a rich tapestry of pre-loved fashion. Explore by category, style, or brand and redefine your wardrobe.
          </p>
          <Button variant="primary" onClick={() => navigate("/products")}>Start Discovering</Button>
        </div>
      </section>

      {/* Explore By Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Browse Through Our Rich Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 shadow-md">
                <Shirt size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Apparel for All</h3>
              <p className="text-gray-600">
                Dresses, shirts, pants, and more across all genders and sizes.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-4 shadow-md">
                <ShoppingBag size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Accessories & More</h3>
              <p className="text-gray-600">
                Bags, shoes, jewelry – complete your look sustainably.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md">
                <Palette size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Styles for Every Mood</h3>
              <p className="text-gray-600">
                From vintage and boho to minimalist and formal, find your unique aesthetic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Search & Filter */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Find Exactly What You're Looking For
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Our advanced search and filtering tools make it easy to narrow down your options. Filter by gender, category, size, brand, color, condition, and price to find your perfect match.
            </p>
            <Button variant="secondary" onClick={() => navigate("/buyer/browse")}>Browse All Items</Button>
    
          </div>
          <div className="md:w-1/2">
           <img
                src="/n6.avif" 
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
      Discover Curated Collections
    </h2>
    <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
     Explore our specially curated collections, hand-picked to inspire your next sustainable outfit. From seasonal trends to timeless classics, there's always something new to love.
    </p>
    <img
      src="/n5.png" // <-- This is the key part for your image
      alt="Awesome product" // Consider a more descriptive alt text for this specific image context
      className="w-full h-auto rounded-lg shadow-xl"
      style={{ maxHeight: '400px' }} // Inline style to limit max height
    />
  </div>
</section>

      {/* Final Call to Action */}
      <section className="py-16 bg-green-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore Your Next Sustainable Look?
          </h2>
          <Link to="/signup">
            <Button variant="secondary">Join Ophelia & Shop</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DiverseSelectionPage;