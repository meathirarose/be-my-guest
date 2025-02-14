import React, { useEffect, useState } from 'react';
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

interface PropertyCardProps {
  onPropertyClick: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ onPropertyClick }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetchAllProperties();
        setProperties(response.data.data);
      } catch (err) {
        console.log(err);
        setError('Unable to load properties. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-6 bg-red-50 rounded-lg">{error}</div>
    );
  }

  return (
    <div className="flex flex-wrap gap-8 justify-center p-8">
      {properties.map((property) => (
        <div
          key={property.id}
          onClick={() => onPropertyClick(property.id)}
          className="w-72 bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <div className="relative">
            <img
              src={getFirstImageUrl(property.mediaUrls)}
              alt={property.basicInfo.propertyName}
              className="h-48 w-full object-cover rounded-t-2xl"
              loading="lazy"
            />
             
          </div>
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
              {`${property.location.locality}, ${property.location.state}`}
            </h3>
            <p className="text-sm text-gray-600 mb-1">Hosted by {property.basicInfo.propertyName}</p>
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
