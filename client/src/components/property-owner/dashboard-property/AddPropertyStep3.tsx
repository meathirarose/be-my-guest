import React, { useState } from "react";
import InputField from "../../../shared/components/ui/InputField";
import { sendPropertyLocation } from "../../../api/listPropertyApi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AddPropertyStep3: React.FC = () => {
  const navigate = useNavigate();

  const [locationDetails, setLocationDetails] = useState({
    houseName: "",
    locality: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationDetails((prev) => ({ ...prev, [name]: value }));
  };

    // Submit Form Data
    const handleSubmit = async () => {
      try {
        const response = await sendPropertyLocation(locationDetails);
        message.success(response?.data?.message);
        navigate("/host/dashboard/properties/add-property-start/step-4")
      } catch (error) {
        console.error("Failed to submit property details:", error);
        message.error("Failed to submit property details")
      }
    };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Basic Info Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-400">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Property location Details
          </h2>
          <p className="text-sm text-gray-600">
            Please fill the location details of your property
          </p>
          <div className="border-b border-gray-200 my-4"></div>
        </div>

        {/* Property Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            House/Building/Apartment No.
          </label>

          <InputField
            type="text"
            name="houseName"
            placeholder="Please add details"
            value={locationDetails.houseName}
            onChange={handleInputChange}
          />
        </div>

        {/* Property Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Locality/Area/Street/Sector
          </label>

          <InputField
            type="text"
            name="locality"
            placeholder="Enter property name"
            value={locationDetails.locality}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium text-gray-700">Pincode</label>
            <label className="text-sm font-medium text-gray-700">Country</label>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-1">
            <InputField
              type="text"
              name="pincode"
              placeholder="Enter Pincode"
              value={locationDetails.pincode}
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="country"
              placeholder="Enter Country"
              value={locationDetails.country}
              onChange={handleInputChange}
            />
          </div>
        </div>


        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>

          <InputField
            type="text"
            name="state"
            placeholder="Enter property name"
            value={locationDetails.state}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>

          <InputField
            type="text"
            name="city"
            placeholder="Enter property name"
            value={locationDetails.city}
            onChange={handleInputChange}
          />
        </div>
        {/* 🟢 Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyStep3;
