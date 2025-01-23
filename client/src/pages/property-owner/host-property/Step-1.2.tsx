import React from "react";
import Header from "../../../components/property-owner/common/Header";
import { useNavigate } from "react-router-dom";
import InputField from "../../../shared/components/ui/InputField";
import Footer from "../host-property/Footer";


const HostPropertyStep3: React.FC = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNextClick = () => {
    navigate("/host/host-property-step1.3");
  };

  const handleBackClick = () => {
    navigate("/host/host-property-step1.1");
  };

  const handleInputChange = () => {
    console.log("handleInputChange");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center px-3 mt-3">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
            Tell us about your property
          </h2>

          {/* Input Fields */}
          <div className="space-y-2">
            <InputField
              type="text"
              name="country"
              placeholder="Country/Region"
              value=""
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="house"
              placeholder="Flat, House, etc. (if applicable)"
              value=""
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="landmark"
              placeholder="Nearby Landmark (if applicable)"
              value=""
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="district"
              placeholder="District/Locality (if applicable)"
              value=""
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="city"
              placeholder="City/Town (if applicable)"
              value=""
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="state"
              placeholder="State/Union Territory (if applicable)"
              value=""
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="zipcode"
              placeholder="Pin code"
              value=""
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onBack={handleBackClick} onNext={handleNextClick} />
    </div>
  );
};

export default HostPropertyStep3;
