import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ShoppingBag } from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { useAuthStore } from '../../store/authStore';
import { Gender, Category } from '../../types';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import ProductCard from '../../components/buyer/ProductCard';
import RatingModal from '../../components/buyer/RatingModal';

const BrowsePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    fetchProducts, 
    filteredProducts, 
    isLoading, 
    error,
    selectedGender,
    selectedCategory,
    filterProducts
  } = useProductStore();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    gender: selectedGender as Gender | '',
    category: selectedCategory as Category | '',
  });
  
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    if (user.role !== 'buyer') {
      navigate('/seller/dashboard');
      return;
    }
    
    fetchProducts();
  }, [user, navigate, fetchProducts]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  
  const applyFilters = () => {
    filterProducts(
      filters.gender ? filters.gender as Gender : null, 
      filters.category ? filters.category as Category : null
    );
    setIsFilterOpen(false);
  };
  
  const resetFilters = () => {
    setFilters({
      gender: '',
      category: '',
    });
    filterProducts(null, null);
  };
  
  const handleBuyNow = (productId: string) => {
    setSelectedProductId(productId);
    setShowRatingModal(true);
  };
  
  const handleRatingComplete = () => {
    setShowRatingModal(false);
    setSelectedProductId(null);
  };
  
  const genderOptions = [
    { value: '', label: 'All Genders' },
    { value: 'Men', label: 'Men' },
    { value: 'Women', label: 'Women' },
  ];
  
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'T-shirts', label: 'T-shirts' },
    { value: 'Shirts', label: 'Shirts' },
    { value: 'Pants', label: 'Pants' },
    { value: 'Tops', label: 'Tops' },
    { value: 'One-pieces', label: 'One-pieces' },
    { value: 'Sarees', label: 'Sarees' },
    { value: 'Other', label: 'Other' },
  ];
  
  if (isLoading && filteredProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
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
            Browse Thrifted Clothes
          </h1>
          
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center"
          >
            <Filter size={18} className="mr-2" />
            Filter Products
          </Button>
        </div>
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {isFilterOpen && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                name="gender"
                label="Gender"
                options={genderOptions}
                value={filters.gender}
                onChange={handleFilterChange}
              />
              
              <Select
                name="category"
                label="Category"
                options={categoryOptions}
                value={filters.category}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button variant="primary" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-500 text-center max-w-md mb-6">
              {selectedGender || selectedCategory
                ? 'No products match your current filters. Try changing your filters or check back later.'
                : 'No products are available right now. Check back later or be the first to list your items!'}
            </p>
            {(selectedGender || selectedCategory) && (
              <Button variant="outline" onClick={resetFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                currentUserId={user?.id || ''}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        )}
      </div>
      
      {showRatingModal && selectedProductId && (
        <RatingModal
          isOpen={showRatingModal}
          productId={selectedProductId}
          onClose={() => setShowRatingModal(false)}
          onComplete={handleRatingComplete}
        />
      )}
    </div>
  );
};

export default BrowsePage;