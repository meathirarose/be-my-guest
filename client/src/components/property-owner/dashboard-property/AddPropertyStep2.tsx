import React, { useState } from "react";
import InputField from "../../../shared/components/ui/InputField";

// Define the data interface separately
interface PropertyData {
  propertyName: string;
  buildYear: string;
  liveAtProperty: boolean;
  contactEmail: string;
  contactMobile: string;
  contactLandline: string;
}

interface Step2Props {
  data: PropertyData;
  onChange: (data: Partial<PropertyData>) => void;
}

// Generate array of years from 1900 to current year
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1899 },
  (_, i) => (currentYear - i).toString()
);

const AddPropertyStep2: React.FC<Step2Props> = ({ data, onChange }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Rest of the component remains exactly the same */}
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
            value={data.propertyName}
            onChange={handleInputChange}
          />
          {errors.propertyName && (
            <p className="text-red-500 text-xs">{errors.propertyName}</p>
          )}
        </div>

        {/* Build Year */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            When was the property built?
          </label>
          <select
            className="w-full max-w-xl p-2 border rounded-xl focus:ring-2 focus:ring-purple-500"
            value={data.buildYear}
            onChange={(e) => onChange({ buildYear: e.target.value })}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.buildYear && (
            <p className="text-red-500 text-xs">{errors.buildYear}</p>
          )}
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
                checked={!data.liveAtProperty}
                onChange={() => onChange({ liveAtProperty: false })}
                className="mr-2"
              />
              <span className="text-sm">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.liveAtProperty}
                onChange={() => onChange({ liveAtProperty: true })}
                className="mr-2"
              />
              <span className="text-sm">Yes</span>
            </label>
          </div>
          {errors.liveAtProperty && (
            <p className="text-red-500 text-xs">{errors.liveAtProperty}</p>
          )}
        </div>

        {/* Contact Details */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Contact details to be shared with guests
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            These contact details will be shared with the guests when they make a
            booking
          </p>

          {/* Email */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">Email ID</label>
              <span className="text-xs text-blue-500 cursor-pointer">Change</span>
            </div>
            <InputField
              type="email"
              name="contactEmail"
              placeholder="Enter email"
              value={data.contactEmail}
              onChange={handleInputChange}
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-xs">{errors.contactEmail}</p>
            )}
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">Mobile number</label>
              <span className="text-xs text-blue-500 cursor-pointer">Change</span>
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
                name="contactMobile"
                placeholder="Enter mobile number"
                value={data.contactMobile}
                onChange={handleInputChange}
              />
            </div>
            {errors.contactMobile && (
              <p className="text-red-500 text-xs">{errors.contactMobile}</p>
            )}
          </div>

          {/* Landline */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Landline number <span className="text-gray-400">(Optional)</span>
            </label>
            <InputField
              type="tel"
              name="contactLandline"
              placeholder="Eg: 0124-66573533"
              value={data.contactLandline}
              onChange={handleInputChange}
            />
            {errors.contactLandline && (
              <p className="text-red-500 text-xs">{errors.contactLandline}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyStep2;