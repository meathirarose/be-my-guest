import React, { useState } from "react";
import InputField from "../../../shared/components/ui/InputField";

const AddPropertyStep2: React.FC = () => {
  const [propertyType, setPropertyType] = useState("");
  const [placeType, setPlaceType] = useState("");

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyType(e.target.value);
  };

  const handlePlaceTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceType(e.target.value);
  };

  return (
    <div>
      <h2>Step 1: Welcome</h2>
      <p>Welcome to the Add Property process. Let’s get started!</p>

      <div className="mb-4 mt-6">
        <label htmlFor="propertyType" className="block text-sm font-medium mb-6">
          What type of property are you listing?
        </label>
        <InputField
          type="text"
          name="propertyType"
          placeholder="e.g., Apartment, House, Villa"
          value={propertyType}
          onChange={handlePropertyTypeChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="placeType" className="block text-sm font-medium mb-6">
          What type of place will guests have?
        </label>
        <InputField
          type="text"
          name="placeType"
          placeholder="e.g., Private Room, Entire House, Shared Space"
          value={placeType}
          onChange={handlePlaceTypeChange}
        />
      </div>
    </div>
  );
};

export default AddPropertyStep2;
