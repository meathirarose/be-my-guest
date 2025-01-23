import React from "react";
import verifyEmailImage from "../../../assets/customer-images/signup-image.jpg";
import Header from "../../../components/property-owner/common/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../host-property/Footer";

const HostPropertyStep1: React.FC = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNextClick = () => {
    navigate("/host/host-property-step1.1");
  };

  const handleBackClick = () => {
    navigate("/host/host-property-start"); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Spacer Below Header */}

      {/* Main Content */}
      <div className="flex items-center justify-center flex-grow">
        <div className="relative w-1/2 h-96 bg-purple-100 rounded-2xl overflow-hidden shadow-xl">
          {/* Background Image */}
          <img
            src={verifyEmailImage}
            alt="Email Verification"
            className="absolute bottom-0 top-0 opacity-20 w-full h-full rounded-2xl object-cover"
          />

          {/* Content */}
          <div className="relative z-20 bg-purple-500 bg-opacity-20 border-2 border-purple-100 rounded-2xl p-12 text-black flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold leading-snug text-center mb-4">
              Tell us about your place
            </h2>
            <p className="text-base text-center mb-4">
              Start by providing key features about your property - <br />
              its size, location, and the number of guests it can accommodate.{" "}
              <br />
              This helps us match it to the right travellers.
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer onBack={handleBackClick} onNext={handleNextClick} />
    </div>
  );
};

export default HostPropertyStep1;
