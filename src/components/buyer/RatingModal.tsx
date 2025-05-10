import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useRatingStore } from '../../store/ratingStore';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface RatingModalProps {
  isOpen: boolean;
  productId: string;
  onClose: () => void;
  onComplete: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  productId,
  onClose,
  onComplete,
}) => {
  const { user } = useAuthStore();
  const { addRating, isLoading } = useRatingStore();
  
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const handleRating = async () => {
    if (!user || !rating) return;
    
    await addRating(user.id, productId, rating);
    onComplete();
  };
  
  const handleStarClick = (value: number) => {
    setRating(value);
  };
  
  const handleStarHover = (value: number) => {
    setHoveredRating(value);
  };
  
  const handleStarLeave = () => {
    setHoveredRating(0);
  };
  
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      const filled = i <= (hoveredRating || rating);
      
      stars.push(
        <Star
          key={i}
          size={32}
          className={`cursor-pointer transition-colors ${
            filled ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
          }`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        />
      );
    }
    
    return stars;
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rate Your Experience"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Skip
          </Button>
          <Button 
            variant="primary" 
            onClick={handleRating}
            disabled={!rating || isLoading}
            isLoading={isLoading}
          >
            Submit Rating
          </Button>
        </>
      }
    >
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          How would you rate your experience with this purchase?
        </p>
        
        <div className="flex justify-center items-center space-x-2 mb-4">
          {renderStars()}
        </div>
        
        <p className="text-sm text-gray-500">
          Your feedback helps us improve the platform for everyone.
        </p>
      </div>
    </Modal>
  );
};

export default RatingModal;