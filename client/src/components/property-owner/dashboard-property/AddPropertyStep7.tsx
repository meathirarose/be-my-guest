import React from "react";

const AddPropertyStep7: React.FC = () => {
  // Assuming you are passing the data as props, or it could be fetched from a global state (e.g., Redux)
  const locationDetails = {
    houseName: "Sample House",
    locality: "Sample Locality",
    pincode: "123456",
    country: "Country Name",
    state: "State Name",
    city: "City Name",
  };

  const pricingDetails = {
    price: "1000",
    availability: "Available",
  };

  const handlePublish = () => {
    // Handle the publish logic here
    alert("Property details published!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Review and Publish Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-400">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Review & Publish</h2>
          <p className="text-sm text-gray-600">
            Please review your property details before publishing
          </p>
          <div className="border-b border-gray-200 my-4"></div>
        </div>

        {/* Location Details Review */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700">Location Details</h3>
          <div className="space-y-2 mt-2">
            <div>
              <strong>House Name: </strong> {locationDetails.houseName}
            </div>
            <div>
              <strong>Locality: </strong> {locationDetails.locality}
            </div>
            <div>
              <strong>Pincode: </strong> {locationDetails.pincode}
            </div>
            <div>
              <strong>Country: </strong> {locationDetails.country}
            </div>
            <div>
              <strong>State: </strong> {locationDetails.state}
            </div>
            <div>
              <strong>City: </strong> {locationDetails.city}
            </div>
          </div>
        </div>

        {/* Pricing & Availability Review */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700">Pricing & Availability</h3>
          <div className="space-y-2 mt-2">
            <div>
              <strong>Price per Night: </strong> ₹{pricingDetails.price}
            </div>
            <div>
              <strong>Availability: </strong> {pricingDetails.availability}
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <div className="mt-6">
          <button
            onClick={handlePublish}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Publish Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyStep7;
