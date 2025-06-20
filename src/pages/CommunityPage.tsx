// src/pages/CommunityPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, MessageSquare } from 'lucide-react';

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

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-stone-50 min-h-screen"> {/* Light beige background */}
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100  text-center overflow-hidden"> {/* Mauve/beige gradient */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 leading-tight">
            Join Our Vibrant Community: Fashion, Friends, & Future
          </h1>
          <p className="text-lg md:text-xl text-stone-700 max-w-3xl mx-auto mb-8">
            Ophelia is more than a marketplace; it's a growing family of sustainable fashion lovers. Connect, share, and inspire each other towards a more conscious and stylish lifestyle.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              // Add your custom logic here, e.g., analytics or modal
              console.log('Become a Community Member button clicked');
              window.location.href = '/signup'; // Simple navigation, or use useNavigate for SPA navigation
            }}
          >
            Become a Community Member
          </Button>
        </div>
      </section>

      {/* What Makes Our Community Special */}
      <section className="py-16 bg-white"> {/* Pure white for contrast */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-12">
            Why Our Community Thrives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600 mb-4 shadow-md"> {/* Mauve variant */}
                <Users size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Shared Values</h3>
              <p className="text-stone-600 text-center">
                Connect with individuals passionate about sustainability, style, and smart shopping.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4 shadow-md"> {/* Amber accent */}
                <Heart size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Mutual Support</h3>
              <p className="text-stone-600 text-center">
                Share tips, discover trends, and help each other make conscious fashion choices.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 shadow-md"> {/* A blue hint for communication */}
                <MessageSquare size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Direct Interaction</h3>
              <p className="text-stone-600 text-center">
                Our platform fosters direct conversations between buyers and sellers, building trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 bg-stone-100"> {/* Light beige */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Connect and Engage
            </h2>
            <p className="text-lg text-stone-700 mb-6">
              Beyond buying and selling, Ophelia provides avenues for connection. Engage in discussions, discover new styles from other members, and become an active part of the circular fashion movement.
            </p>
            <Button variant="secondary" onClick={() => navigate("/buyer/browse")}>Connect</Button>
          </div>
          <div className="md:w-1/2">
         <img
           src="/n19.png" 
           alt="Awesome product" 
           className="w-full h-auto rounded-lg shadow-xl"
           style={{ maxHeight: '650px' }}
          />
          </div>
        </div>
      </section>

      {/* Testimonials / Community Spotlights */}
      <section className="py-16 bg-white"> {/* Pure white for contrast */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12">
            Voices from Our Community
          </h2>
          <p className="text-lg text-stone-700 mb-8 max-w-3xl mx-auto">
            Hear directly from our members about how Ophelia has enriched their fashion journey and connected them with like-minded individuals.
          </p>
          <img
           src="/n20.png"
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
            Ready to Find Your Sustainable Fashion Family?
          </h2>
          <Button variant="secondary" onClick={() => navigate("/signup")}>Join Ophelia's Community</Button>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;