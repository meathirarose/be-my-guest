import React from "react";

const AddPropertyStep1: React.FC = () => {
  return (
    <div className="flex items-start justify-start  px-4 py-8">
      <div className="w-full max-w-6xl bg-white p-12 rounded-2xl shadow-lg flex">
        {/* Left Section */}
        <div className="w-1/2 pr-10">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Start hosting with ease — list your property in minutes!
          </h1>
        </div>

        {/* Right Section */}
        <div className="w-1/2">
          <div className="text-lg font-semibold">
            <span className="text-purple-700">Be My</span> Guest
          </div>

          <div className="text-gray-700 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">
                Tell us about your place
              </h3>
              <p className="text-gray-600">
                Start by providing key details about your property — its
                location, size, and the number of guests it can accommodate.
                This helps us match it to the right travelers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Make it shine</h3>
              <p className="text-gray-600">
                Highlight your property’s charm with at least 5 eye-catching
                photos, including interiors, exteriors, and scenic views.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Add Engaging Local Activities
              </h3>
              <p className="text-gray-600">
                Introduce guests to unique experiences that reflect the beauty
                and culture of your location.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Publish & Go Live!
              </h3>
              <p className="text-gray-600">
                Final check: Set your price, confirm your details, and publish
                your listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyStep1;
