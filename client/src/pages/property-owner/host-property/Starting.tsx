import React from "react";
import Header from "../../../components/property-owner/common/Header";
import { useNavigate } from "react-router-dom";

const HostPropertyStarting: React.FC = () => {
    const navigate = useNavigate();

    const handleStarting = () => {
        navigate("/host/host-property-step1");
    }
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row items-start gap-9 font-sans px-16 py-[130px]">
      {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mt-36">
            Start hosting with ease — list your property in minutes!
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Info Blocks */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Tell us about your place
            </h3>
            <p className="text-gray-700">
              Start by providing key details about your property — <br /> its location,
              size, and the number of guests it can accommodate. <br /> This helps us
              match it to the right travelers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Make it shine
            </h3>
            <p className="text-gray-700">
              Highlight your property's charm with at least 5 eye-catching
              photos,<br /> including interiors, exteriors, and scenic views.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Add Engaging Local Activities
            </h3>
            <p className="text-gray-700">
              Introduce guests to unique experiences that reflect the beauty <br /> and
              culture of your location.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Publish & Go Live!
            </h3>
            <p className="text-gray-700">
              Final check: Set your price, confirm your details, and publish
              your listing.
            </p>
          </div>

          {/* Get Started Button */}
          <button className="self-start px-6 py-3 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800"
          onClick={handleStarting}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostPropertyStarting;
