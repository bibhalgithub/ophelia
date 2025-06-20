// src/pages/DirectCommunicationPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircleMore, ShieldCheck, PhoneCall, Smile, Users } from 'lucide-react';

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


const DirectCommunicationPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-100 to-blue-100  text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Connect Directly: Seamless Communication on Ophelia
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Experience unparalleled transparency and ease. Ophelia's direct communication feature connects buyers and sellers instantly via WhatsApp for quick questions and confident purchases.
          </p>
          <Link to="/buyer/browse">
            <Button variant="primary">Start Exploring Listings</Button>
          </Link>
        </div>
      </section>

      {/* How Direct Communication Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Your Direct Line to Confidence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 shadow-md">
                <MessageCircleMore size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Connection</h3>
              <p className="text-gray-600 text-center">
                Click a button on any listing to directly open a chat with the seller on WhatsApp.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-4 shadow-md">
                <ShieldCheck size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-center">
                Communicate safely within the familiar WhatsApp environment, keeping your personal details secure.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-white flex flex-col items-center">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 shadow-md">
                <PhoneCall size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Clarifications</h3>
              <p className="text-gray-600 text-center">
                Ask about fit, condition, or shipping directly, getting real-time answers for confident purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Benefits of Going Direct
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-3">
              <li className="flex items-start"><Smile size={20} className="mr-2 mt-1 text-green-500 flex-shrink-0" /> **Build Trust:** Engage in open conversations to ensure mutual satisfaction.</li>
              <li className="flex items-start"><Users size={20} className="mr-2 mt-1 text-blue-500 flex-shrink-0" /> **Personalized Experience:** Get tailored responses and negotiate confidently.</li>
              <li className="flex items-start"><MessageCircleMore size={20} className="mr-2 mt-1 text-purple-500 flex-shrink-0" /> **Faster Transactions:** Resolve queries quickly, leading to quicker sales and purchases.</li>
            </ul>
          </div>
          <div className="md:w-1/2">
           <img
                src="/n2.png" 
                alt="Awesome product"
                className="w-full h-auto rounded-lg shadow-xl"
                style={{ maxHeight: '400px' }}
             />
          </div>
        </div>
      </section>

      {/* Seller & Buyer Perspectives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center lg:text-left">For Sellers: Close Deals Faster</h3>
            <p className="text-lg text-gray-700 mb-6 text-center lg:text-left">
              Answer buyer questions directly, build rapport, and make your selling experience smoother. Direct chat helps clarify details, leading to satisfied customers and quicker transactions.
            </p>
            <img
                src="/n3.png" 
                alt="Awesome product"
                className="w-full h-auto rounded-lg shadow-xl"
                style={{ maxHeight: '400px' }}
             />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center lg:text-left">For Buyers: Shop with Certainty</h3>
            <p className="text-lg text-gray-700 mb-6 text-center lg:text-left">
              Get all the information you need directly from the seller. Inquire about fit, material, or history, ensuring you make the right choice every time.
            </p>
            <img
                src="/n4.png" 
                alt="Awesome product"
                className="w-full h-auto rounded-lg shadow-xl"
                style={{ maxHeight: '400px' }}
             />
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-green-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Connect and Transform Your Shopping?
          </h2>
          <Link to="/signup">
            <Button variant="secondary">Join Ophelia Today</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DirectCommunicationPage;