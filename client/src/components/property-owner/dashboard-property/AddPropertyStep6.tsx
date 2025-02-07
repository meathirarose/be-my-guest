import React from "react";
import InputField from "../../../shared/components/ui/InputField";
import { PropertyPricing } from "../../../interfaces/ListPropertyDetails";

interface Step6Props {
  data: PropertyPricing;
  onChange: (data: Partial<PropertyPricing>) => void;
}

const AddPropertyStep6: React.FC<Step6Props> = ({ data, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Pricing & Availability Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-400">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Property Pricing and Availability
          </h2>
          <p className="text-sm text-gray-600">
            Please provide the pricing details and availability of your property.
          </p>
          <div className="border-b border-gray-200 my-4"></div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price per Night
          </label>
          <InputField
            type="text"
            name="price"
            placeholder="Enter price"
            value={data.price}
            onChange={handleInputChange}
          />
        </div>

        {/* Availability Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability Status
          </label>
          <select
            name="availability"
            value={data.availability}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-200"
          >
            <option value="">Select availability</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyStep6;
