import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProperties } from '../../../api/listPropertyApi';

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
  return imageUrls.length > 0 ? imageUrls[0] : '/api/placeholder/400/300';
};

const PropertyCard: React.FC = () => {
  // Using React Query for better caching and data management
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await fetchAllProperties();
      return response.data.data;
    },
    staleTime: 300000, // Data stays fresh for 5 minutes
    gcTime: 3600000, // Cache persists for 1 hour
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    retry: 2, // Retry failed requests twice
  });
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-6 bg-red-50 rounded-lg">
        Unable to load properties. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8 justify-center p-8">
      {properties?.map((property: Property) => (
        <div
          key={property.id}
          className="w-72 bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          {/* Image Section */}
          <div className="relative">
            <img
              src={getFirstImageUrl(property.mediaUrls)}
              alt={property.basicInfo.propertyName}
              className="h-48 w-full object-cover rounded-t-2xl"
              loading="lazy" // Add lazy loading for images
            />
            {property.pricing.availability === 'Available' && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm px-4 py-1.5 rounded-full shadow-lg font-medium">
                Guest favourite
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
              {`${property.location.locality}, ${property.location.state}`}
            </h3>
            
            <p className="text-sm text-gray-600 mb-1">
              Hosted by {property.basicInfo.propertyName}
            </p>
            
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-600">
                {property.roomsAndSpaces.bedrooms} bedrooms • {property.roomsAndSpaces.bathrooms} bathrooms
              </span>
            </div>
            
            <div className="flex items-center mb-3">
              <div className="flex items-center text-sm text-gray-700">
                ⭐ {(4.5 + Math.random() * 0.5).toFixed(1)}
                <span className="ml-2 text-gray-500">• Superhost</span>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <p className="text-lg font-semibold text-gray-900">
                ₹{parseInt(property.pricing.price).toLocaleString('en-IN')}
                <span className="text-sm font-normal text-gray-600"> total before taxes</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCard;