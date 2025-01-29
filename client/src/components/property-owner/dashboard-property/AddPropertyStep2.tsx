import React, { useState } from "react";
import { Select } from "antd";
import InputField from "../../../shared/components/ui/InputField";

const AddPropertyStep2: React.FC = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    propertyName: "",
    buildYear: "",
    bookingSince: "",
    hostingType: "individually",
    liveAtProperty: false,
    email: "",
    mobile: "",
    whatsapp: false,
    landline: "",
  });

  const years = Array.from({ length: 74 }, (_, i) => (2024 - i).toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Basic Info Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-400">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Property Details
          </h2>
          <p className="text-sm text-gray-600">
            Update your property details here
          </p>
          <div className="border-b border-gray-200 my-4"></div>
        </div>

        {/* Property Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name of the Property
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Enter the name of the property which will be displayed to Guests
          </p>
          <InputField
            type="text"
            name="propertyName"
            placeholder="Enter property name"
            value={propertyDetails.propertyName}
            onChange={handleInputChange}
          />
        </div>

        {/* Build Year */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            When was the property built?
          </label>
          <Select
            className="w-full max-w-xl p-0 border rounded-xl focus:ring-2 focus:ring-purple-500"
            value={propertyDetails.buildYear}
            onChange={(value) =>
              setPropertyDetails((prev) => ({ ...prev, buildYear: value }))
            }
            options={years.map((year) => ({ value: year, label: year }))}
            popupClassName="rounded-xl border border-gray-300 shadow-lg"
            bordered={false}
          />
        </div>

        {/* Live at Property */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you (host) live at this property?
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={!propertyDetails.liveAtProperty}
                onChange={() =>
                  setPropertyDetails((prev) => ({
                    ...prev,
                    liveAtProperty: false,
                  }))
                }
                className="mr-2"
              />
              <span className="text-sm">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={propertyDetails.liveAtProperty}
                onChange={() =>
                  setPropertyDetails((prev) => ({
                    ...prev,
                    liveAtProperty: true,
                  }))
                }
                className="mr-2"
              />
              <span className="text-sm">Yes</span>
            </label>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Contact details to be shared with guests
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            These contact details will be shared with the guests when they make
            a booking
          </p>

          {/* Email */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">Email ID</label>
              <span className="text-xs text-blue-500 cursor-pointer">
                Change
              </span>
            </div>
            <InputField
              type="email"
              name="email"
              placeholder="Enter email"
              value={propertyDetails.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">Mobile number</label>
              <span className="text-xs text-blue-500 cursor-pointer">
                Change
              </span>
            </div>
            <div className="flex items-center gap-2">
              <InputField
                type="text"
                name="countryCode"
                placeholder="+91"
                value="+91"
                onChange={() => {}}
              />
              <InputField
                type="tel"
                name="mobile"
                placeholder="Enter mobile number"
                value={propertyDetails.mobile}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Landline */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Landline number <span className="text-gray-400">(Optional)</span>
            </label>
            <InputField
              type="tel"
              name="landline"
              placeholder="Eg: 0124-66573533"
              value={propertyDetails.landline}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyStep2;
