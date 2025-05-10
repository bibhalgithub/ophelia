import React, { useState, useCallback } from 'react';
import { X, Upload, Plus, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useProductStore } from '../../store/productStore';
import { Gender, Category, Condition } from '../../types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

interface ListProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductListed: () => void;
}

const ListProductModal: React.FC<ListProductModalProps> = ({
  isOpen,
  onClose,
  onProductListed,
}) => {
  const { user } = useAuthStore();
  const { addProduct, isLoading } = useProductStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as Category,
    gender: '' as Gender,
    size: '',
    price: '',
    condition: '' as Condition,
    seller_phone: '',
    images: [] as File[],
  });
  
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    category: '',
    gender: '',
    size: '',
    price: '',
    condition: '',
    seller_phone: '',
    images: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'price' ? value.replace(/[^0-9]/g, '') : value,
    });
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files].slice(0, 5), // Limit to 5 images
      }));
      setFormErrors(prev => ({ ...prev, images: '' }));
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files].slice(0, 5), // Limit to 5 images
      }));
      setFormErrors(prev => ({ ...prev, images: '' }));
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  
  const validateStep1 = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      valid = false;
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      valid = false;
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const validateStep2 = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    if (!formData.size.trim()) {
      newErrors.size = 'Size is required';
      valid = false;
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
      valid = false;
    } else if (parseInt(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
      valid = false;
    }
    
    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
      valid = false;
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.seller_phone.trim()) {
      newErrors.seller_phone = 'Phone number is required';
      valid = false;
    } else if (!phoneRegex.test(formData.seller_phone)) {
      newErrors.seller_phone = 'Enter a valid 10-digit Indian mobile number';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const validateStep3 = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && validateStep3()) {
      setShowPolicyModal(true);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = async () => {
    if (!user) return;
    if (!acceptedPolicy) return;
    
    try {
      const { title, description, category, gender, size, price, condition, seller_phone, images } = formData;
      
      await addProduct({
        title,
        description,
        category,
        gender,
        size,
        price: parseInt(price),
        condition,
        seller_id: user.id,
        seller_phone,
      }, images);
      
      onProductListed();
      setFormData({
        title: '',
        description: '',
        category: '' as Category,
        gender: '' as Gender,
        size: '',
        price: '',
        condition: '' as Condition,
        seller_phone: '',
        images: [],
      });
      setCurrentStep(1);
      setAcceptedPolicy(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  const genderOptions = [
    { value: 'Men', label: 'Men' },
    { value: 'Women', label: 'Women' },
  ];
  
  const getCategoryOptions = () => {
    if (formData.gender === 'Men') {
      return [
        { value: 'T-shirts', label: 'T-shirts' },
        { value: 'Shirts', label: 'Shirts' },
        { value: 'Pants', label: 'Pants' },
        { value: 'Other', label: 'Other' },
      ];
    } else if (formData.gender === 'Women') {
      return [
        { value: 'T-shirts', label: 'T-shirts' },
        { value: 'Tops', label: 'Tops' },
        { value: 'One-pieces', label: 'One-pieces' },
        { value: 'Sarees', label: 'Sarees' },
        { value: 'Other', label: 'Other' },
      ];
    }
    return [];
  };
  
  const conditionOptions = [
    { value: 'Good', label: 'Good' },
    { value: 'Average', label: 'Average' },
    { value: 'Recently Used', label: 'Recently Used' },
    { value: 'With Tags', label: 'With Tags' },
    { value: 'Without Tags', label: 'Without Tags' },
  ];
  
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`List New Item - Step ${currentStep} of 3`}
        footer={
          <>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            )}
            <Button
              variant="primary"
              onClick={handleNextStep}
              isLoading={isLoading}
            >
              {currentStep === 3 ? 'Review & Finish' : 'Next Step'}
            </Button>
          </>
        }
      >
        <div className="mb-4">
          <div className="mb-6 flex justify-between">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex flex-col items-center ${
                  step < currentStep
                    ? 'text-emerald-600'
                    : step === currentStep
                    ? 'text-amber-600'
                    : 'text-gray-300'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    step < currentStep
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-600'
                      : step === currentStep
                      ? 'bg-amber-100 text-amber-700 border border-amber-600'
                      : 'bg-gray-100 text-gray-400 border border-gray-300'
                  }`}
                >
                  {step}
                </div>
                <span className="text-xs">
                  {step === 1
                    ? 'Basics'
                    : step === 2
                    ? 'Details'
                    : 'Images'}
                </span>
              </div>
            ))}
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                id="title"
                name="title"
                label="Title"
                placeholder="e.g., Men's Black Cotton T-shirt"
                value={formData.title}
                onChange={handleInputChange}
                error={formErrors.title}
                required
                maxLength={60}
              />
              
              <Textarea
                id="description"
                name="description"
                label="Description"
                placeholder="Describe your item including details about fabric, brand, fitting, etc."
                value={formData.description}
                onChange={handleInputChange}
                error={formErrors.description}
                required
                rows={3}
                maxLength={500}
              />
              
              <Select
                id="gender"
                name="gender"
                label="Gender"
                options={genderOptions}
                value={formData.gender}
                onChange={handleInputChange}
                error={formErrors.gender}
                required
              />
              
              {formData.gender && (
                <Select
                  id="category"
                  name="category"
                  label="Category"
                  options={getCategoryOptions()}
                  value={formData.category}
                  onChange={handleInputChange}
                  error={formErrors.category}
                  required
                />
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Input
                id="size"
                name="size"
                label="Size"
                placeholder="e.g., M, L, XL, 32, 34, etc."
                value={formData.size}
                onChange={handleInputChange}
                error={formErrors.size}
                required
              />
              
              <Input
                id="price"
                name="price"
                label="Price (₹)"
                placeholder="Enter amount in INR"
                value={formData.price}
                onChange={handleInputChange}
                error={formErrors.price}
                required
                type="text"
                inputMode="numeric"
              />
              
              <Select
                id="condition"
                name="condition"
                label="Condition"
                options={conditionOptions}
                value={formData.condition}
                onChange={handleInputChange}
                error={formErrors.condition}
                required
              />
              
              <Input
                id="seller_phone"
                name="seller_phone"
                label="WhatsApp Number"
                placeholder="10-digit phone number"
                value={formData.seller_phone}
                onChange={handleInputChange}
                error={formErrors.seller_phone}
                required
                type="tel"
                inputMode="numeric"
                maxLength={10}
              />
              <p className="text-xs text-gray-500">
                Your number will only be shared with interested buyers.
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                
                {formErrors.images && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.images}</p>
                )}
                
                <div
                  className={`mt-2 p-4 border-2 border-dashed rounded-lg ${
                    isDragging
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-emerald-600 hover:text-emerald-500"
                      >
                        <span>Upload images</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          multiple
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5 images
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden h-32">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Product ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md mt-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                  <p className="text-sm text-amber-700">
                    Please add clear images showing the item from different angles. Add any
                    tags, defects, or relevant details.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
      
      {/* No Return Policy Modal */}
      <Modal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        title="No Return Policy"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowPolicyModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!acceptedPolicy}
            >
              I Agree & List Item
            </Button>
          </>
        }
      >
        <div className="mb-4 space-y-4">
          <div className="p-4 bg-amber-50 rounded-md">
            <h4 className="font-medium text-amber-800 mb-3">No Return Policy</h4>
            <p className="text-sm text-amber-700 mb-2">
              By listing your item on Ophelia, you agree to the following terms:
            </p>
            <ul className="list-disc text-sm text-amber-700 ml-5 space-y-1">
              <li>All sales are final and items cannot be returned to the seller.</li>
              <li>Buyers should carefully review all product details and images before purchasing.</li>
              <li>As a seller, you confirm that the item's condition is accurately described.</li>
              <li>Communication between buyers and sellers happens solely via WhatsApp.</li>
              <li>Ophelia is not responsible for any disputes between buyers and sellers.</li>
            </ul>
          </div>
          
          <div className="flex items-start mt-4">
            <input
              id="policy-accept"
              name="policyAccept"
              type="checkbox"
              checked={acceptedPolicy}
              onChange={() => setAcceptedPolicy(!acceptedPolicy)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mt-1"
            />
            <label htmlFor="policy-accept" className="ml-2 block text-sm text-gray-700">
              I understand and accept the No Return Policy and confirm my listing
              details are accurate.
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListProductModal;