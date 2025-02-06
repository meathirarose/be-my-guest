import React from 'react';
import Header from '../../components/customer/Header';
import PropertyCard from '../../components/customer/home/PropertyCard';
import Footer from '../../shared/components/layout/Footer';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate("/customer/property-details");
  }
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 pt-24 pb-2" onClick={handleView}>
      <PropertyCard/>
      </div>
      <Footer />
    </div>
  )
}

export default Home;
