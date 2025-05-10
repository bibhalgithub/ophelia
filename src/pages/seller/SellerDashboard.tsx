import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, PackageOpen } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useProductStore } from '../../store/productStore';
import Button from '../../components/ui/Button';
import SellerProductCard from '../../components/seller/SellerProductCard';
import ListProductModal from '../../components/seller/ListProductModal';

const SellerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { products, fetchProducts, isLoading, error } = useProductStore();
  
  const [showListModal, setShowListModal] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    if (user.role !== 'seller') {
      navigate('/buyer/browse');
      return;
    }
    
    fetchProducts();
  }, [user, navigate, fetchProducts]);
  
  const userProducts = products.filter(product => product.seller_id === user?.id);
  
  const handleCreateListing = () => {
    setShowListModal(true);
  };
  
  const handleListingCreated = () => {
    setShowListModal(false);
    fetchProducts();
  };
  
  if (isLoading && products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
            <p className="text-gray-600">Loading your listings...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Seller Dashboard
          </h1>
          
          <Button
            variant="primary"
            onClick={handleCreateListing}
            className="flex items-center"
          >
            <Plus size={18} className="mr-2" />
            List New Item
          </Button>
        </div>
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Stats</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-700 font-medium">Total Listings</p>
              <p className="text-2xl font-bold text-amber-900">{userProducts.length}</p>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-emerald-700 font-medium">Active Listings</p>
              <p className="text-2xl font-bold text-emerald-900">
                {userProducts.filter(product => !product.sold).length}
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">Sold Items</p>
              <p className="text-2xl font-bold text-blue-900">
                {userProducts.filter(product => product.sold).length}
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
        
        {userProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-12">
            <PackageOpen className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              You haven't listed any clothes for sale yet. Start selling your pre-owned fashion items today!
            </p>
            <Button variant="primary" onClick={handleCreateListing}>
              Create Your First Listing
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userProducts.map((product) => (
              <SellerProductCard 
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
      
      <ListProductModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        onProductListed={handleListingCreated}
      />
    </div>
  );
};

export default SellerDashboard;