import React from 'react';
import Header from '../../shared/components/Header';
import PropertyCard from '../../components/customer/home/PropertyCard';
import Footer from '../../shared/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 pt-24 pb-2">
      <PropertyCard />
      </div>
      <Footer />
    </div>
  )
}

export default Home;
