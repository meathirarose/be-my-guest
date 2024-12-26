import Header from "../../shared/components/Header";
import HeroSection from "../../components/customer/landing/HeroSection";
import StaySection from "../../components/customer/landing/StaySection";
import TaxiSection from "../../components/customer/landing/TaxiSection";
import FeaturesSection from "../../components/customer/landing/FeaturesSection";
import QuestionSection from "../../components/customer/landing/QuestionSection";
import Footer from "../../shared/components/Footer";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <StaySection />
      <TaxiSection />
      <FeaturesSection />
      <QuestionSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
