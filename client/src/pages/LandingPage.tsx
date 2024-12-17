import Header from "../shared/components/Header";
import HeroSection from "../components/landing-page/HeroSection";
import StaySection from "../components/landing-page/StaySection";
import TaxiSection from "../components/landing-page/TaxiSection";
import FeaturesSection from "../components/landing-page/FeaturesSection";
import QuestionSection from "../components/landing-page/QuestionSection";
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
