import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Buy and Sell Pre-owned Fashion with Ease
      </h1>
      <p className="text-lg md:text-xl opacity-90 mb-8">
        Ophelia is India's premier marketplace for quality thrifted clothes.
        Join our sustainable fashion movement today.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {user ? (
          <>
            <Link to={user.role === 'buyer' ? '/buyer/browse' : '/seller/dashboard'}>
              <Button variant="secondary" size="lg">
                {user.role === 'buyer' ? 'Browse Clothes' : 'Sell Your Clothes'}
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">
              <Button variant="secondary" size="lg">
                Create Account
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  </div>
</section>



{/* How It Works */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">How Ophelia Works</h2>
      <p className="mt-4 text-lg text-gray-600">Simple steps to buy or sell pre-owned fashion</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
        <p className="text-gray-600">Sign up with your email and choose your role as a buyer or seller.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <Tag className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">List or Browse</h3>
        <p className="text-gray-600">Sellers list their items with photos and details. Buyers browse by category.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Connect & Exchange</h3>
        <p className="text-gray-600">Contact via WhatsApp to arrange payment and delivery of your thrifted finds.</p>
      </div>
    </div>

    <div className="mt-12 text-center">
      <Link to="/signup">
        <Button variant="primary" size="lg" className="inline-flex items-center">
          Get Started <ArrowRight size={16} className="ml-2" />
        </Button>
      </Link>
    </div>
  </div>
</section>

{/* Image Section */}
<section className="bg-white py-10">
  <div className="max-w-full h-[600px]">
    <img
      src="/f.png"
      alt="Ophelia Banner"
      className="w-full h-full object-cover rounded-lg shadow-md fade-in"
    />
  </div>
</section>


{/* Benefits Section */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">Why Choose Ophelia?</h2>
      <p className="mt-4 text-lg text-gray-600">Making sustainable fashion accessible for everyone</p>
    </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">For Buyers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-emerald-500">✓</span>
                  <span>Access to quality pre-owned clothing at affordable prices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-emerald-500">✓</span>
                  <span>Direct communication with sellers via WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-emerald-500">✓</span>
                  <span>Easy browsing by gender and clothing categories</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-emerald-500">✓</span>
                  <span>Contribute to sustainable fashion and reduce waste</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-amber-700">For Sellers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-amber-500">✓</span>
                  <span>Simple listing process with multiple image uploads</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-amber-500">✓</span>
                  <span>Sell directly to interested buyers without intermediaries</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-amber-500">✓</span>
                  <span>Make money from clothes you no longer need</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-amber-500">✓</span>
                  <span>Support the circular economy and environmental sustainability</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/signup">
              <Button variant="secondary" size="lg">Join Ophelia Today</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;