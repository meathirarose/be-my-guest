import React, { useState } from "react";
import Header from "../../../components/property-owner/common/Header";
import Footer from "../host-property/Footer";
import Counter from "./Counter";
import { useNavigate } from "react-router-dom";

const HostPropertyStep4: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    guests: 4,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });

  const handleChange = (field: keyof typeof formData) => (value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextClick = () => {
    navigate("/host/host-property-step1.3");
  };

  const handleBackClick = () => {
    navigate("/host/host-property-step1.2");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center px-3 mt-8">
        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">

          <p className="text-gray-600 mb-4 text-center text-lg font-semibold">
            Share some basics about your home?
          </p>
          <p className="text-sm text-gray-500 mb-6 text-center">
            You can add more details later
          </p>

          {/* Counter Section */}
          <div className="space-y-4">
            <Counter
              label="Guests"
              value={formData.guests}
              onChange={handleChange("guests")}
              min={1}
            />
            <Counter
              label="Bedrooms"
              value={formData.bedrooms}
              onChange={handleChange("bedrooms")}
            />
            <Counter
              label="Beds"
              value={formData.beds}
              onChange={handleChange("beds")}
              min={1}
            />
            <Counter
              label="Bathrooms"
              value={formData.bathrooms}
              onChange={handleChange("bathrooms")}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onBack={handleBackClick} onNext={handleNextClick} />
    </div>
  );
};

export default HostPropertyStep4;
