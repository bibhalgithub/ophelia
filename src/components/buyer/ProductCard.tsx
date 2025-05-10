import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Tag, Phone } from 'lucide-react';
import { Product } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';

interface ProductCardProps {
  product: Product;
  currentUserId: string;
  onBuyNow: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  currentUserId,
  onBuyNow 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [buyerPhone, setBuyerPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  
  const isOwner = product.seller_id === currentUserId;
  
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
  
  const handleBuyNow = () => {
    if (isOwner) return;
    setShowContactModal(true);
  };
  
  const validatePhone = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!buyerPhone) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (!phoneRegex.test(buyerPhone)) {
      setPhoneError('Enter a valid 10-digit Indian mobile number');
      return false;
    }
    setPhoneError('');
    return true;
  };
  
  const handleContactSeller = () => {
    if (!validatePhone()) return;
    
    const message = encodeURIComponent(
      `Hi, I'm interested in your product "${product.title}" listed on Ophelia for ₹${product.price}.`
    );
    
    const whatsappUrl = `https://wa.me/${product.seller_phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    onBuyNow(product.id);
    setShowContactModal(false);
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

    return (
      <div onClick={() => setIsZoomOpen(true)} className="cursor-zoom-in h-full w-full">
      <img
        src={product.images[currentImageIndex]}
        alt={product.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/400x300?text=Image+Not+Found';
        }}
      />
      </div>
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
          <Button 
            variant={isOwner || product.sold ? "outline" : "primary"}
            fullWidth
            disabled={isOwner || product.sold}
            onClick={handleBuyNow}
          >
            {isOwner 
              ? "Your Listing" 
              : product.sold 
                ? "Sold Out" 
                : "Contact Seller"}
          </Button>
        </div>
      </div>
      
      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Contact Seller"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowContactModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleContactSeller}>
              Continue to WhatsApp
            </Button>
          </>
        }
      >
        <div className="mb-4">
          <p className="text-gray-600 mb-4">
            To contact the seller, we need your WhatsApp number. When you continue, you'll be taken to WhatsApp to message the seller directly.
          </p>
          
          <div className="p-4 bg-amber-50 text-amber-800 rounded-md mb-6">
            <h4 className="font-medium mb-2">No Return Policy</h4>
            <p className="text-sm">
              By contacting the seller for this item, you acknowledge that:
            </p>
            <ul className="list-disc text-sm ml-5 mt-1 space-y-1">
              <li>All sales are final and items cannot be returned to the seller.</li>
              <li>You have reviewed all product details and images carefully.</li>
              <li>Communication and transactions happen solely via WhatsApp.</li>
              <li>Ophelia is not responsible for any disputes between buyers and sellers.</li>
            </ul>
          </div>
          
          <Input
            id="buyerPhone"
            label="Your WhatsApp Number"
            placeholder="e.g., 9876543210"
            value={buyerPhone}
            onChange={(e) => {
              setBuyerPhone(e.target.value);
              if (phoneError) setPhoneError('');
            }}
            error={phoneError}
            fullWidth
          />
          <p className="text-xs text-gray-500 mt-1">
            <Phone size={12} className="inline mr-1" />
            Enter a 10-digit Indian mobile number without country code
          </p>
        </div>
      </Modal>
      
       {/* Zoom Modal */}
<Modal
  isOpen={isZoomOpen}
  onClose={() => setIsZoomOpen(false)}
  title={product.title}
  footer={
    <Button variant="outline" onClick={() => setIsZoomOpen(false)}>
      Close
    </Button>
  }
>
  <img
    src={product.images[currentImageIndex]}
    alt={product.title}
    className="w-full h-auto rounded-md"
  />
</Modal>

    </div>
  );
};

export default ProductCard;