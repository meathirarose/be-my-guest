import React from 'react'
import Header from '../../shared/components/Header';
import FirstSection from '../../components/property-owner/landing/FirstSection';
import SecondSection from '../../components/property-owner/landing/SecondSection';
import Footer from '../../shared/components/Footer';

const LandingPage:React.FC = () => {
  return (
    <div>
      <Header />
      <FirstSection />
      <SecondSection />
      <Footer />
    </div>
  )
}

export default LandingPage;