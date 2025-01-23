import React from "react";
import Header from "../../../components/property-owner/common/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../host-property/Footer";

const HostPropertyStep2: React.FC = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNextClick = () => {
    navigate("/host/host-property-step1.2");
  };

  const handleBackClick = () => {
    navigate("/host/host-property-step1");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow px-8 md:px-10 py-32 space-y-12">
        {/* Section 1 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Where is your place located?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="house"
                className="w-5 h-5 accent-purple-600"
              />
              <label htmlFor="house" className="text-gray-700">
                a house
              </label>
            </li>
            <li className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="villa"
                className="w-5 h-5 accent-purple-600"
              />
              <label htmlFor="villa" className="text-gray-700">
                a villa
              </label>
            </li>
            <li className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="cottage"
                className="w-5 h-5 accent-purple-600"
              />
              <label htmlFor="cottage" className="text-gray-700">
                a cottage
              </label>
            </li>
            <li className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="unique"
                className="w-5 h-5 accent-purple-600"
              />
              <label htmlFor="unique" className="text-gray-700">
                any other unique type of accommodation
              </label>
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            What type of place will guests have?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="entireHome"
                className="w-5 h-5 accent-purple-600"
              />
              <label htmlFor="entireHome" className="text-gray-700">
                Entire home or apartment - Guests will have full access to the
                entire space, including all rooms and amenities.
              </label>
            </li>
            <li className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privateRoom"
                className="w-5 h-5 accent-purple-600"
              />
              <label htmlFor="privateRoom" className="text-gray-700">
                Private room – Guests have a private room but will share common
                areas like the kitchen or living room with others.
              </label>
            </li>
            <li className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="guestHouse"
                className="w-5 h-5 accent-purple-600"
              />
              <label htmlFor="guestHouse" className="text-gray-700">
                Guest house or cabin – A separate unit with full privacy,
                usually located on the same property as the main house.
              </label>
            </li>
            <li className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="studioApartment"
                className="w-5 h-5 accent-purple-600"
              />
              <label htmlFor="studioApartment" className="text-gray-700">
                Studio apartment – A single open-plan room that combines living,
                dining, and sleeping areas, typically with a private bathroom.
              </label>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer onBack={handleBackClick} onNext={handleNextClick} />
    </div>
  );
};

export default HostPropertyStep2;
