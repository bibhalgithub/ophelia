// src/pages/ImpactPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout,  Droplets, Recycle } from 'lucide-react';

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

const ImpactPage: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen"> {/* Light beige background */}
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100  text-center overflow-hidden"> {/* Mauve/light amber gradient */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 leading-tight">
            Our Impact: Making a Real Difference, Together
          </h1>
          <p className="text-lg md:text-xl text-stone-700 max-w-3xl mx-auto mb-8">
            Every item bought and sold on Ophelia contributes to a healthier planet and a more equitable fashion industry. See the positive change you're helping to create.
          </p>
          <Link to="/sustainable">
            <Button variant="primary">Learn About Sustainable Fashion</Button>
          </Link>
        </div>
      </section>

      {/* Environmental Impact Metrics */}
      <section className="py-16 bg-white"> {/* Pure white for contrast */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-12">
            Our Environmental Footprint (The Good Kind!)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md"> {/* Green for sustainability */}
                <Sprout size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">XX Tons of CO2 Saved</h3>
              <p className="text-stone-600 text-center">
                Equivalent to removing YYY cars from the road for a year. (Placeholder values)
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 shadow-md"> {/* Blue for water */}
                <Droplets size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">ZZZ Liters of Water Conserved</h3>
              <p className="text-stone-600 text-center">
                Enough to fill AAAA Olympic swimming pools. (Placeholder values)
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600 mb-4 shadow-md"> {/* Mauve variant */}
                <Recycle size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">BBB Kgs of Waste Diverted</h3>
              <p className="text-stone-600 text-center">
                Keeping countless garments out of landfills. (Placeholder values)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Economic Impact */}
      <section className="py-16 bg-stone-100"> {/* Light beige */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Empowering Our Community & Economy
            </h2>
            <p className="text-lg text-stone-700 mb-6">
              Beyond environmental benefits, Ophelia empowers individuals to earn income, access affordable fashion, and connect with like-minded sustainable fashion enthusiasts.
            </p>
            <Link to="/community">
              <Button variant="secondary">Join Our Community</Button>
            </Link>
          </div>
          <div className="md:w-1/2">
          <img
           src="/n17.png" 
           alt="Awesome product" 
           className="w-full h-auto rounded-lg shadow-xl"
           style={{ maxHeight: '650px' }} 
          />
          </div>
        </div>
      </section>

      {/* Our Commitment & Future Impact */}
      <section className="py-16 bg-white"> {/* Pure white for contrast */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12">
            Committed to Greater Change
          </h2>
          <p className="text-lg text-stone-700 mb-8 max-w-3xl mx-auto">
            We are continuously working to expand our positive influence, introducing new initiatives and partnerships to amplify the impact of every sustainable choice made on Ophelia.
          </p>
          <img
           src="/n18.png" 
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
            Be a Part of the Positive Change
          </h2>
          <Link to="/signup">
            <Button variant="secondary">Start Your Impact Today</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage;