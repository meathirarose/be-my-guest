import Header from "../shared/components/Header";
import HeroSection from "../components/landing/HeroSection";
import StaySection from "../components/landing/StaySection";
import TaxiSection from "../components/landing/TaxiSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import QuestionSection from "../components/landing/QuestionSection";
import Footer from "../shared/components/Footer";

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
