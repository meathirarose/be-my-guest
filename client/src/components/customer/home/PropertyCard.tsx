import React, { useEffect, useState } from "react";
import { fetchAllProperties } from "../../../api/listPropertyApi";
import { PropertyFormData } from "../../../interfaces/ListPropertyDetails";
import { Pagination } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Heart } from "lucide-react";

const isImageUrl = (url: string): boolean => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff"];
  return imageExtensions.some((ext) => url.toLowerCase().includes(ext));
};

const getFirstImageUrl = (mediaUrls: string[]): string =>
  mediaUrls.find(isImageUrl) ?? "/api/placeholder/400/300";

interface PropertyCardProps {
  onPropertyClick: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ onPropertyClick }) => {
  const user = useSelector((state: RootState) => state?.user?.user);
  const [properties, setProperties] = useState<PropertyFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [favorites, setFavorites] = useState<string[]>([]);

  const propertiesPerPage = 9;

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetchAllProperties();
      const filteredProperties = response.data?.data?.filter((property: PropertyFormData) => !property.isBlocked);
      setProperties(filteredProperties);
    } catch (err) {
      console.log(err);
      setError('Unable to load properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  fetchProperties(); 
  
  const toggleFavorite = (propertyId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(propertyId)
        ? prevFavorites.filter((id) => id !== propertyId)
        : [...prevFavorites, propertyId]
    );
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = properties.slice(startIndex, startIndex + propertiesPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-6 bg-red-50 rounded-lg">{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 px-40 max-w-7xl mx-auto">
        {currentProperties.map((property) => (
          <div
            key={property?.id}
            onClick={() => onPropertyClick(property?.id)}
            className="w-80 bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer relative"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              className="absolute top-3 right-3 p-1 z-10 bg-transparent rounded-full transition-colors"
            >
              {favorites.includes(property.id) ? (
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              ) : (
                <Heart className="w-6 h-6 text-gray-200 fill-gray-600" />
              )}
            </div>
            <img
              src={getFirstImageUrl(property?.mediaUrls)}
              alt={property?.basicInfo?.propertyName}
              className="h-64 w-full object-cover rounded-t-2xl"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {property?.basicInfo?.propertyName}
              </h3>
              <h6 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-1">
                {`${property?.location?.locality}, ${property?.location?.state}`}
              </h6>
              <p className="text-sm text-gray-600 mb-1">Hosted by {user?.name ?? "N/A"}</p>
              <span className="text-sm text-gray-600">
                {property?.roomsAndSpaces?.bedrooms} bedrooms • {property?.roomsAndSpaces?.bathrooms} bathrooms
              </span>
              <div className="flex items-center mt-2 text-sm text-gray-700">
                ⭐ 4.7 <span className="ml-2 text-gray-500">• Superhost</span>
              </div>
              <div className="border-t pt-3">
                <p className="text-lg font-semibold text-gray-900">
                  ₹{parseInt(property?.pricing?.price).toLocaleString("en-IN")}
                  <span className="text-sm font-normal text-gray-600"> total before taxes</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {properties.length > propertiesPerPage && (
        <div className="flex justify-center my-8">
          <Pagination
            current={currentPage}
            total={properties.length}
            pageSize={propertiesPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
