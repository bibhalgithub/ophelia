import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import BrowsePage from './pages/buyer/BrowsePage';
import SellerDashboard from './pages/seller/SellerDashboard';
import NotFound from './pages/NotFound';
import ExplorePage from './pages/explore/explore'; 
import EasyProcessPage from './pages/EasyProcessPage';
import DirectCommunicationPage from './pages/DirectCommunicationPage';
import DiverseSelectionPage from './pages/DiverseSelectionPage';
import AffordablePage from './pages/AffordablePage';
import EarnMoneyPage from './pages/EarnMoneyPage';
import SustainablePage from './pages/SustainablePage';
import VisionPage from './pages/VisionPage';
import MissionPage from './pages/MissionPage';
import ImpactPage from './pages/ImpactPage';
import CommunityPage from './pages/CommunityPage';



// Auth Route Components

const BuyerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthStore();
  return user && user.role === 'buyer' ? (
    <>{children}</>
  ) : user ? (
    <Navigate to="/seller/dashboard" />
  ) : (
    <Navigate to="/signin" />
  );
};

const SellerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthStore();
  return user && user.role === 'seller' ? (
    <>{children}</>
  ) : user ? (
    <Navigate to="/buyer/browse" />
  ) : (
    <Navigate to="/signin" />
  );
};

function App() {
  useEffect(() => {
    // Update the document title
    document.title = 'Ophelia - Thrifted Fashion Marketplace';
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Buyer Routes */}
          <Route 
            path="/buyer/browse" 
            element={
              <BuyerRoute>
                <BrowsePage />
              </BuyerRoute>
            } 
          />
          
          {/* Seller Routes */}
          <Route 
            path="/seller/dashboard" 
            element={
              <SellerRoute>
                <SellerDashboard />
              </SellerRoute>
            } 
          />

          <Route path="/explore" element={<ExplorePage />} />
         


          <Route path="/process-details" element={<EasyProcessPage />} />
          <Route path="/communication-details" element={<DirectCommunicationPage />} />
          <Route path="/selection-details" element={<DiverseSelectionPage />} />
          <Route path="/affordable-details" element={<AffordablePage />} />
          <Route path="/earn-money-details" element={<EarnMoneyPage />} />
          <Route path="/sustainable-details" element={<SustainablePage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/community" element={<CommunityPage />} />



          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;