import React from "react";

interface Step1Props {
  isEditMode?: boolean;  
}

const AddPropertyStep1: React.FC<Step1Props> = ({isEditMode}) => {
  return (
    <div className="flex items-start justify-start px-4 py-8">
      <div className="w-full max-w-6xl bg-white p-12 rounded-2xl shadow-lg flex">
        {/* Left Section */}
        <div className="w-1/2 pr-10">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {isEditMode 
              ? "Update your property listing with ease!"
              : "Start hosting with ease — list your property in minutes!"}
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
                {isEditMode ? "Review your place" : "Tell us about your place"}
              </h3>
              <p className="text-gray-600">
                {isEditMode 
                  ? "Review and update the key details about your property — its location, size, and guest capacity."
                  : "Start by providing key details about your property — its location, size, and the number of guests it can accommodate."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Make it shine</h3>
              <p className="text-gray-600">
                {isEditMode
                  ? "Update your property photos to keep them current and appealing."
                  : "Highlight your property's charm with at least 5 eye-catching photos, including interiors, exteriors, and scenic views."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Add Engaging Local Activities
              </h3>
              <p className="text-gray-600">
                {isEditMode
                  ? "Update available local experiences to keep your listing fresh and appealing."
                  : "Introduce guests to unique experiences that reflect the beauty and culture of your location."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                {isEditMode ? "Review & Update!" : "Publish & Go Live!"}
              </h3>
              <p className="text-gray-600">
                {isEditMode
                  ? "Final check: Review your changes and update your listing."
                  : "Final check: Set your price, confirm your details, and publish your listing."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyStep1;