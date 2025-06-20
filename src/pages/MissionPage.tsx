// src/pages/MissionPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  Leaf, Users, Zap,  } from 'lucide-react';

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

const MissionPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-stone-50 min-h-screen"> {/* Light beige background */}
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100  text-center overflow-hidden"> {/* Mauve/beige gradient */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 leading-tight">
            Our Mission: Driving Sustainable Fashion Forward
          </h1>
          <p className="text-lg md:text-xl text-stone-700 max-w-3xl mx-auto mb-8">
            Ophelia's mission is to revolutionize fashion by creating an intuitive, community-driven platform that empowers individuals to buy, sell, and re-wear clothes effortlessly, reducing waste and fostering a more sustainable planet.
          </p>
          <Button variant="primary" onClick={() => navigate('/vision')}>Explore Our Vision</Button>
        </div>
      </section>

      {/* Core Tenets of Our Mission */}
      <section className="py-16 bg-white"> {/* Pure white for contrast */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-12">
            How We Achieve Our Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md"> {/* Green for sustainability */}
                <Leaf size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Promote Circularity</h3>
              <p className="text-stone-600 text-center">
                Extend the life cycle of garments, keeping them out of landfills and reducing new production.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600 mb-4 shadow-md"> {/* Mauve variant */}
                <Users size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Empower Individuals</h3>
              <p className="text-stone-600 text-center">
                Give users the tools to easily sell unused items and find unique, affordable fashion.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4 shadow-md"> {/* Amber accent */}
                <Zap size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Foster Community</h3>
              <p className="text-stone-600 text-center">
                Build a vibrant network of conscious consumers passionate about sustainable living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-stone-100"> {/* Light beige */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Committed to a Better Fashion Future
            </h2>
            <p className="text-lg text-stone-700 mb-6">
              Every feature, every design choice, and every partnership at Ophelia is driven by our core mission to make sustainable fashion not just an option, but the preferred choice for everyone.
            </p>
            <Button variant="secondary" onClick={() => navigate('/community')}>Meet Our Community</Button>
          </div>
          <div className="md:w-1/2">
          <img
           src="/n15.png" 
           alt="Awesome product" 
           className="w-full h-auto rounded-lg shadow-xl"
           style={{ maxHeight: '650px' }} 
          />
          </div>
        </div>
      </section>

      {/* Impact & Future */}
      <section className="py-16 bg-white"> {/* Pure white for contrast */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12">
            Mission-Driven Innovation
          </h2>
          <p className="text-lg text-stone-700 mb-8 max-w-3xl mx-auto">
            We constantly innovate to remove barriers to sustainable consumption, from simplifying listing processes to enhancing direct communication, ensuring our mission translates into real-world positive change.
          </p>
          <img
           src="/n16.png" 
           alt="Awesome product" 
           className="w-full h-auto rounded-lg shadow-xl"
           style={{ maxHeight: '650px' }} 
          />
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-green-500 text-white text-center"> {/* Deep Mauve background */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission to Transform Fashion
          </h2>
          <Button variant="secondary" onClick={() => navigate('/signup')}>Start Your Journey with Ophelia</Button>
          
        </div>
      </section>
    </div>
  );
};

export default MissionPage;