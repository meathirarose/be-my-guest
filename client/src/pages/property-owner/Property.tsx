import React, { useEffect, useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import AddPropertyButton from "../../components/buttons/AddPropertyButton";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchAllProperties } from "../../api/listPropertyApi";

interface Property {
  id: string;
  basicInfo: {
    propertyName: string;
    contactEmail: string;
    contactMobile: string;
  };
  location: {
    houseName: string;
    locality: string;
    state: string;
    country: string;
  };
  mediaUrls: string[];
  pricing: {
    price: string;
    availability: string;
  };
  roomsAndSpaces: {
    bedrooms: number;
    bathrooms: number;
  };
}

const isImageUrl = (url: string): boolean => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff'];
  return imageExtensions.some(ext => url.toLowerCase().includes(ext));
};

const getFirstImageUrl = (mediaUrls: string[]): string => {
  const imageUrls = mediaUrls.filter(isImageUrl);
  return imageUrls.length > 0 ? imageUrls[0] : '/placeholder-image.jpg';
};

const Properties: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetchAllProperties();
      setProperties(response.data.data);
      console.log(response, "getting the properties or not how")
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleAddProperty = () => {
    navigate("/host/dashboard/properties/add-property-start/step-1");
  };

  const handleViewProperty = (id: string) => {
    navigate(`/host/dashboard/properties/view/${id}`);
  };

  const handleEditProperty = (id: string) => {
    console.log(id, "id from edit property-----------------------------------------------")
    navigate(`/host/dashboard/properties/add-property-start/step-1`,{state:{id:id}});
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <AddPropertyButton onAdd={handleAddProperty} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties
          .filter((property) =>
            property.basicInfo.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((property) => (
            <Card
              key={property.id}
              className="w-full max-w-sm mx-auto overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={getFirstImageUrl(property.mediaUrls)} 
                  alt={property.basicInfo.propertyName}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="p-5 pb-2">
                <CardTitle className="text-xl font-semibold text-purple-700 truncate">
                  {property.basicInfo.propertyName}
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  {property.location.locality}, {property.location.state}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-5 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center text-base text-gray-600">
                    <span>{property.roomsAndSpaces.bedrooms} Bedrooms</span>
                    <span className="mx-2">•</span>
                    <span>{property.roomsAndSpaces.bathrooms} Bathrooms</span>
                  </div>
                  <p className="text-xl font-bold text-purple-700">
                    ₹{parseInt(property.pricing.price).toLocaleString('en-IN')} / day
                  </p>
                  <p className="text-base font-medium text-green-600">
                    {property.pricing.availability}
                  </p>
                </div>
                
                <div className="flex justify-end mt-4 space-x-4 text-purple-600">
                  <EyeOutlined
                    className="text-xl cursor-pointer hover:text-purple-800"
                    onClick={() => handleViewProperty(property.id)}
                    title="View"
                  />
                  <EditOutlined
                    className="text-xl cursor-pointer hover:text-purple-800"
                    onClick={() => handleEditProperty(property.id)}
                    title="Edit"
                  />
                  <DeleteOutlined
                    className="text-xl cursor-pointer hover:text-purple-800"
                    onClick={() => handleDeleteProperty(property.id)}
                    title="Delete"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Properties;