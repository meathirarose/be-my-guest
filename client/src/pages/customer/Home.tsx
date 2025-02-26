import React from 'react';
import Header from '../../components/customer/Header';
import PropertyCard from '../../components/customer/home/PropertyCard';
import Footer from '../../shared/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/customer/home/SearchBar';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const handleView = (id: string) => {
    navigate(`/customer/property-details/${id}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 pt-24 pb-2">
        <SearchBar />
        <PropertyCard onPropertyClick={handleView} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
