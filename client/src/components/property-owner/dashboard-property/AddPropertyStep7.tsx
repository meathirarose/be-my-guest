import React from "react";
import { PropertyFormData } from "../../../interfaces/ListPropertyDetails";

interface Step7Props {
  data: PropertyFormData;
  onChange: () => Promise<void>;
  isEditMode?: boolean;  
}

const AddPropertyStep7: React.FC<Step7Props> = ({ data, onChange, isEditMode }) => {
  
  const handlePublish = async () => {
    try {
      await onChange();
      console.log(`property ${isEditMode ? 'updated' : 'published'} successfully from the last step`);
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'publishing'} property:`, error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Review and Publish Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-400">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditMode ? 'Review & Update' : 'Review & Publish'}
          </h2>          
          <p className="text-sm text-gray-600">
            {isEditMode 
              ? 'Please review your updated property details before saving changes'
              : 'Please review your property details before publishing'
            }
          </p>
          <div className="border-b border-gray-200 my-4"></div>
        </div>

        {/* Basic Info Review */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700">Basic Information</h3>
          <div className="space-y-2 mt-2">
            <div>
              <strong>Property Name: </strong> {data.basicInfo.propertyName}
            </div>
            <div>
              <strong>Property Description: </strong> {data.basicInfo.propertyDescription}
            </div>
            <div>
              <strong>Build Year: </strong> {data.basicInfo.buildYear}
            </div>
            <div>
              <strong>Contact Email: </strong> {data.basicInfo.contactEmail}
            </div>
            <div>
              <strong>Contact Mobile: </strong> {data.basicInfo.contactMobile}
            </div>
          </div>
        </div>

        {/* Location Details Review */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700">Location Details</h3>
          <div className="space-y-2 mt-2">
            <div>
              <strong>House Name: </strong> {data.location.houseName}
            </div>
            <div>
              <strong>Locality: </strong> {data.location.locality}
            </div>
            <div>
              <strong>Pincode: </strong> {data.location.pincode}
            </div>
            <div>
              <strong>Country: </strong> {data.location.country}
            </div>
            <div>
              <strong>State: </strong> {data.location.state}
            </div>
            <div>
              <strong>City: </strong> {data.location.city}
            </div>
          </div>
        </div>

        {/* Rooms & Spaces Review */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700">Rooms & Spaces</h3>
          <div className="space-y-2 mt-2">
            <div>
              <strong>Bedrooms: </strong> {data.roomsAndSpaces.bedrooms}
            </div>
            <div>
              <strong>Bathrooms: </strong> {data.roomsAndSpaces.bathrooms}
            </div>
            <div>
              <strong>Living Rooms: </strong> {data.roomsAndSpaces.livingRoom}
            </div>
            <div>
              <strong>Maximum Guests: </strong> {data.roomsAndSpaces.guestCapacity}
            </div>
          </div>
        </div>

        {/* Pricing & Availability Review */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700">Pricing & Availability</h3>
          <div className="space-y-2 mt-2">
            <div>
              <strong>Price per Night: </strong> ₹{data.pricing.price}
            </div>
            <div>
              <strong>Availability: </strong> {data.pricing.availability}
            </div>
          </div>
        </div>

        {/* Media Files Review */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700">Media Files</h3>
          <div className="space-y-2 mt-2">
            <div>
              <strong>Number of files: </strong> {data.mediaUrls.length}
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <div className="mt-6">
          <button
            onClick={handlePublish}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            {isEditMode ? 'Update Property' : 'Publish Property'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyStep7;