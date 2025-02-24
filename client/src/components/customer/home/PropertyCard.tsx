import React, { useEffect, useState } from "react";
import { fetchAllProperties } from "../../../api/listPropertyApi";
import { PropertyFormData } from "../../../interfaces/ListPropertyDetails";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { Pagination } from "antd";
import { setProperties } from "../../../redux/property/propertySlice";

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
  const dispatch = useDispatch();
  const properties = useSelector((state: RootState) => state.property.properties);
  const user = useSelector((state: RootState) => state.user.user);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const propertiesPerPage = 9;

  useEffect(() => {
    if (properties.length === 0) {
      fetchProperties();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllProperties();
      const filteredProperties = response.data?.data?.filter((property: PropertyFormData) => !property.isBlocked);
      dispatch(setProperties(filteredProperties)); 
    } catch (err) {
      console.error(err);
      setError("Unable to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-40 max-w-7xl mx-auto">
        {currentProperties.map((property) => (
          <div
            key={property.id}
            onClick={() => onPropertyClick(property.id)}
            className="w-72 bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <img
              src={getFirstImageUrl(property.mediaUrls)}
              alt={property.basicInfo.propertyName}
              className="h-48 w-full object-cover rounded-t-2xl"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {property.basicInfo.propertyName}
              </h3>
              <h6 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-1">
                {`${property.location.locality}, ${property.location.state}`}
              </h6>
              <p className="text-sm text-gray-600 mb-1">Hosted by {user?.name ?? "N/A"}</p>
              <span className="text-sm text-gray-600">
                {property.roomsAndSpaces.bedrooms} bedrooms • {property.roomsAndSpaces.bathrooms} bathrooms
              </span>
              <div className="flex items-center mt-2 text-sm text-gray-700">
                ⭐ 4.7 <span className="ml-2 text-gray-500">• Superhost</span>
              </div>
              <div className="border-t pt-3">
                <p className="text-lg font-semibold text-gray-900">
                  ₹{parseInt(property.pricing.price).toLocaleString("en-IN")}
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
