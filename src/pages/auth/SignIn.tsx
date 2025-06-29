import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, isLoading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'buyer' as UserRole,
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the error when user starts typing
    if (formErrors[e.target.name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: '',
      });
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      role: e.target.value as UserRole,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signIn(formData.email, formData.password, formData.role);
      navigate(formData.role === 'buyer' ? '/buyer/browse' : '/seller/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      // The `error` state from useAuthStore should handle display
    }
  };

  return (
    // This is the single outermost div for the entire page.
    // It acts as the container for the background video, overlay, and all form content.
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Video Element */}
      <video
        src="/sh23.mp4" // IMPORTANT: Make sure this path is correct for your video file
        className="absolute inset-0 w-full h-full object-cover z-0"
        loop
        autoPlay
        muted
        playsInline
        // Consider adding a poster image here for when the video loads or fails
        // poster="/path/to/your/video-poster.jpg"
      ></video>

      {/* Background Overlay for better text readability */}
      {/* This div sits between the video and your form content */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

      {/* Main content wrapper (logo, title, "Sign up" link) */}
      {/* Needs z-20 to be above the video and overlay */}
      <div className="relative z-20 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ShoppingBag className="h-12 w-12 text-emerald-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black"> {/* Adjusted text color for contrast */}
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-black-200"> {/* Adjusted text color for contrast */}
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-black-300 hover:text-emerald-100"> {/* Adjusted link color */}
            Sign up
          </Link>
        </p>
      </div>

      {/* Form wrapper */}
      {/* Needs z-20 to be above the video and overlay */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-20">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              required
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              required
            />

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Choose your role:
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="buyer"
                    name="role"
                    type="radio"
                    value="buyer"
                    checked={formData.role === 'buyer'}
                    onChange={handleRoleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <label htmlFor="buyer" className="ml-2 block text-sm text-gray-700">
                    Buyer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="seller"
                    name="role"
                    type="radio"
                    value="seller"
                    checked={formData.role === 'seller'}
                    onChange={handleRoleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <label htmlFor="seller" className="ml-2 block text-sm text-gray-700">
                    Seller
                  </label>
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;