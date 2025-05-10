import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Tag, CheckCircle, XCircle } from 'lucide-react';
import { Product } from '../../types';
import { useProductStore } from '../../store/productStore';
import Button from '../ui/Button';

interface SellerProductCardProps {
  product: Product;
}

const SellerProductCard: React.FC<SellerProductCardProps> = ({ product }) => {
  const { markAsSold, isLoading } = useProductStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfirmSold, setShowConfirmSold] = useState(false);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };
  
  const handleMarkAsSold = async () => {
    if (showConfirmSold) {
      await markAsSold(product.id);
      setShowConfirmSold(false);
    } else {
      setShowConfirmSold(true);
    }
  };
  
  const getConditionColor = () => {
    switch (product.condition) {
      case 'With Tags':
        return 'bg-green-100 text-green-800';
      case 'Without Tags':
        return 'bg-blue-100 text-blue-800';
      case 'Good':
        return 'bg-emerald-100 text-emerald-800';
      case 'Average':
        return 'bg-yellow-100 text-yellow-800';
      case 'Recently Used':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderImage = () => {
  if (!product.images || product.images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Tag className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  // Parse JSON string if necessary
  const imageList = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  const imageUrl = imageList[currentImageIndex] || imageList[0]; // default to first image if index is off

  return (
    <img
      src={imageUrl}
      alt={product.title}
      className="w-full h-full object-cover"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = 'https://placehold.co/400x300?text=Image+Not+Found';
      }}
    />
  );
};

  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
      {/* Image section */}
      <div className="relative h-60 bg-gray-200">
        {renderImage()}
        
        {product.images && product.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow-sm hover:bg-opacity-100 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow-sm hover:bg-opacity-100 transition-all"
            >
              <ChevronRight size={20} />
            </button>
            
            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
              {product.images.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Condition badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getConditionColor()}`}>
          {product.condition}
        </div>
        
        {/* Gender & Category badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-white bg-opacity-70 rounded-full text-xs font-medium text-gray-700">
          {product.gender} • {product.category}
        </div>
        
        {/* Sold overlay */}
        {product.sold && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-red-600 text-white px-4 py-2 rounded-md font-bold transform -rotate-12">
              SOLD
            </div>
          </div>
        )}
      </div>
      
      {/* Product details */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.title}</h3>
        
        <div className="mt-1 flex justify-between items-center">
          <p className="text-xl font-bold text-emerald-600">₹{product.price}</p>
          <p className="text-sm text-gray-500">Size: {product.size}</p>
        </div>
        
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        
        <div className="mt-4">
          {product.sold ? (
            <div className="bg-gray-100 p-2 rounded text-center text-gray-600 text-sm">
              This item has been sold
            </div>
          ) : showConfirmSold ? (
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                size="sm" 
                fullWidth
                onClick={() => setShowConfirmSold(false)}
                className="flex items-center justify-center"
              >
                <XCircle size={16} className="mr-1" /> Cancel
              </Button>
              <Button 
                variant="danger"
                size="sm" 
                fullWidth
                onClick={handleMarkAsSold}
                isLoading={isLoading}
                className="flex items-center justify-center"
              >
                <CheckCircle size={16} className="mr-1" /> Confirm
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline"
              fullWidth
              onClick={handleMarkAsSold}
            >
              Mark as Sold
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;