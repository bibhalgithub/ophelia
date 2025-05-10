import React from 'react';
import { ShoppingBag, Mail, Phone, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-emerald-400" />
              <span className="ml-2 text-xl font-bold">Ophelia</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Your destination for pre-owned fashion in India.
              Buy and sell quality second-hand clothing with ease.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/buyer/browse" className="text-gray-300 hover:text-white transition-colors">
                  Browse Clothes
                </Link>
              </li>
              <li>
                <Link to="/seller/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Sell Your Clothes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/buyer/browse?gender=Men" className="text-gray-300 hover:text-white transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link to="/buyer/browse?gender=Women" className="text-gray-300 hover:text-white transition-colors">
                  Women's Collection
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-emerald-400" />
                <span className="text-gray-300">ailehpo26@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ophelia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;