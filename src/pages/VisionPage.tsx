// src/pages/VisionPage.tsx
import React from 'react';
import {Lightbulb, TrendingUp, Sparkles } from 'lucide-react';

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

const VisionPage: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen"> {/* Light beige background */}
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100  text-center overflow-hidden"> {/* Beige/light amber gradient */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 leading-tight"> {/* Darker text */}
            Our Vision: Reshaping the Future of Fashion
          </h1>
          <p className="text-lg md:text-xl text-stone-700 max-w-3xl mx-auto mb-8"> {/* Muted text */}
            At Ophelia, we envision a world where sustainable fashion is not just a choice, but the norm. We're building a future where every garment has a prolonged life and every style choice supports a healthier planet.
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.href = "/mission"}
          >
            See Our Mission in Action
          </Button>
        </div>
      </section>

      {/* Core Pillars of Our Vision */}
      <section className="py-16 bg-white"> {/* Pure white for contrast */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-12">
            A Glimpse into Tomorrow's Wardrobe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600 mb-4 shadow-md"> {/* Mauve variant */}
                <Lightbulb size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Innovative Circularity</h3>
              <p className="text-stone-600 text-center">
                Leading the charge in making the circular economy accessible and appealing for fashion.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4 shadow-md"> {/* Amber accent */}
                <TrendingUp size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Global Impact</h3>
              <p className="text-stone-600 text-center">
                Expanding our reach to empower sustainable choices worldwide, one garment at a time.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md"> {/* Green for sustainability */}
                <Sparkles size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Empowered Community</h3>
              <p className="text-stone-600 text-center">
                Fostering a vibrant community of conscious buyers and sellers who drive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Path Forward */}
      <section className="py-16 bg-stone-100"> {/* Light beige */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Charting the Course for a Sustainable Future
            </h2>
            <p className="text-lg text-stone-700 mb-6">
              Our vision is more than just a dream; it's a strategic roadmap. We are continuously innovating our platform and expanding our community to make secondhand fashion the easiest and most desirable choice.
            </p>
            <Button
              variant="secondary"
              onClick={() => window.location.href = "/impact"}
            >
              See Our Impact
            </Button>
          </div>
          <div className="md:w-1/2">
            <img
           src="/n13.png" // <-- This is the key part for your image
           alt="Awesome product" // Consider a more descriptive alt text for this specific image context
           className="w-full h-auto rounded-lg shadow-xl"
           style={{ maxHeight: '650px' }} // Inline style to limit max height
          />
          </div>
        </div>
      </section>

      {/* Vision Statement Deep Dive */}
      <section className="py-16 bg-white"> {/* Pure white for contrast */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12">
            Where Fashion Meets Responsibility
          </h2>
          <p className="text-lg text-stone-700 mb-8 max-w-3xl mx-auto">
            We believe in a future where fashion consumption is responsible, ethical, and fun. Our platform is the bridge between aspiration and action, empowering millions to make better choices for their style and our planet.
          </p>
          <img
           src="/n14.png" // <-- This is the key part for your image
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
            Join Us in Building This Vision
          </h2>
          <Button
            variant="secondary"
            onClick={() => window.location.href = "/signup"}
          >
            Become a Part of Ophelia
          </Button>
        </div>
      </section>
    </div>
  );
};

export default VisionPage;