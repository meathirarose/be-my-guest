import React, { useEffect, useState, useRef } from "react";
import { addToWishlist, fetchAllProperties } from "../../../api/listPropertyApi";
import { PropertyFormData } from "../../../interfaces/Property";
import { Pagination, Carousel } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselRef } from "antd/es/carousel";

const isImageUrl = (url: string): boolean => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff"];
  return imageExtensions.some((ext) => url.toLowerCase().includes(ext));
};

const getImageUrls = (mediaUrls: string[]): string[] => {
  const images = mediaUrls.filter(isImageUrl);
  return images.length > 0 ? images : ["/api/placeholder/400/300"];
};

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
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const carouselRefs = useRef<Record<string, CarouselRef>>({});

  const propertiesPerPage = 9;

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetchAllProperties();
      const filteredProperties = response.data?.data?.filter((property: PropertyFormData) => !property.isBlocked);
      setProperties(filteredProperties);
      
      const initialSlides: Record<string, number> = {};
      filteredProperties.forEach((property: PropertyFormData) => {
        initialSlides[property.id] = 0;
      });
      setCurrentSlides(initialSlides);
    } catch (err) {
      console.log(err);
      setError('Unable to load properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleFavorite = async (propertyId: string) => {
    try {
      if (favorites.includes(propertyId)) {
        setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== propertyId));
      } else {
        setFavorites((prevFavorites) => [...prevFavorites, propertyId]);
        await addToWishlist(propertyId);
      }
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  };

  const handlePrev = (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation();
    if (carouselRefs.current[propertyId]) {
      carouselRefs.current[propertyId].prev();
      setCurrentSlides(prev => ({
        ...prev,
        [propertyId]: Math.max(0, (prev[propertyId] || 0) - 1)
      }));
    }
  };

  const handleNext = (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation();
    if (carouselRefs.current[propertyId]) {
      carouselRefs.current[propertyId].next();
      const totalSlides = getImageUrls(properties.find(p => p.id === propertyId)?.mediaUrls || []).length;
      setCurrentSlides(prev => ({
        ...prev,
        [propertyId]: Math.min(totalSlides - 1, (prev[propertyId] || 0) + 1)
      }));
    }
  };

  const handleSlideChange = (propertyId: string, currentSlide: number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [propertyId]: currentSlide
    }));
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-36 max-w-7xl mx-auto">
        {currentProperties.map((property) => {
          const imageUrls = getImageUrls(property?.mediaUrls);
          const totalSlides = imageUrls.length;
          const currentSlide = currentSlides[property.id] || 0;
          const showPrev = currentSlide > 0;
          const showNext = currentSlide < totalSlides - 1;
          
          return (
            <div
              key={property?.id}
              className="w-80 bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer relative"
              onMouseEnter={() => setHoveredCard(property.id)}
              onMouseLeave={() => setHoveredCard(null)}
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
              
              <div className="relative">
                <Carousel
                  autoplay={false}
                  dots={true}
                  ref={(ref) => {
                    if (ref) {
                      carouselRefs.current[property.id] = ref;
                    }
                  }}
                  afterChange={(current) => handleSlideChange(property.id, current)}
                  className="h-64 rounded-t-2xl overflow-hidden"
                >
                  {imageUrls.map((imageUrl, index) => (
                    <div key={index} onClick={() => onPropertyClick(property?.id)}>
                      <div className="h-64 w-full relative">
                        <img
                          src={imageUrl}
                          alt={`${property?.basicInfo?.propertyName} - Image ${index + 1}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
                
                {hoveredCard === property.id && totalSlides > 1 && (
                  <>
                    {showPrev && (
                      <button
                        onClick={(e) => handlePrev(e, property.id)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-1 rounded-full shadow-md hover:bg-opacity-100 transition-all z-10"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                    )}
                    
                    {showNext && (
                      <button
                        onClick={(e) => handleNext(e, property.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-1 rounded-full shadow-md hover:bg-opacity-100 transition-all z-10"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    )}
                  </>
                )}
              </div>
              
              <div className="p-5" onClick={() => onPropertyClick(property?.id)}>
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
          );
        })}
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