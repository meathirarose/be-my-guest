import React, { useState } from "react";
import InputField from "../../../shared/components/ui/InputField";

type LocationType = {
  country: string;
  house: string;
  landmark: string;
  district: string;
  city: string;
  state: string;
  pincode: string;
};

const AddPropertyStep2: React.FC = () => {
  const [propertyType, setPropertyType] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [locationType, setLocationType] = useState<LocationType>({
    country: "",
    house: "",
    landmark: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyType(e.target.value);
  };

  const handlePlaceTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceType(e.target.value);
  };

  const handleLocationTypeChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof LocationType) => {
    setLocationType((prevDetails) => ({
      ...prevDetails,
      [field]: e.target.value,
    }));
  };

  const locationInputs = [
    { name: "country", placeholder: "Country or Region" },
    { name: "house", placeholder: "Flat or house..etc (if applicable)" },
    { name: "landmark", placeholder: "Nearby landmark (if applicable)" },
    { name: "district", placeholder: "District or locality (if applicable)" },
    { name: "city", placeholder: "City or town (if applicable)" },
    { name: "state", placeholder: "State/Union Territory" },
    { name: "pincode", placeholder: "Pincode" },
  ];

  return (
    <div className="mx-10 mt-5">
      {/* Heading Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Start Listing Your Property
        </h2>
        <p className="text-base text-gray-600 mt-2">
          Let's go step by step through the process and get your property ready
          for guests!
        </p>
      </div>

      {/* Property Type Section */}
      <div className="mb-4 mt-6">
        <label htmlFor="propertyType" className="block text-sm font-medium mb-2">
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

      {/* Place Type Section */}
      <div className="mb-4">
        <label htmlFor="placeType" className="block text-sm font-medium mb-2">
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

      {/* Location Section */}
      <div className="mb-4">
        <label htmlFor="placeType" className="block text-sm font-medium mb-2">
          Tell us about your location:
        </label>
        {locationInputs.map((input) => (
          <InputField
            key={input.name}
            type="text"
            name={input.name}
            placeholder={input.placeholder}
            value={locationType[input.name as keyof LocationType]}
            onChange={(e) => handleLocationTypeChange(e, input.name as keyof LocationType)}
          />
        ))}
      </div>
    </div>
  );
};

export default AddPropertyStep2;
