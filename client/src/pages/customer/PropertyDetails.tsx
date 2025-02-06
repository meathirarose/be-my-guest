import React from 'react';
import { Wifi, Coffee, Utensils, MessageCircle } from 'lucide-react';
import Header from '../../components/customer/Header';

interface PropertyListing {
  title: string;
  price: number;
  location: string;
  description: string;
  images: string[];
  amenities: string[];
}

const PropertyCard: React.FC = () => {
  const property: PropertyListing = {
    title: "Marari Beach Palace - Deluxe",
    price: 69,
    location: "Kattoor, India",
    description: "This is really a good place to find peace compared to the crowded cities. Perfect place for a weekend gateway from the city life and business pressures. Big compound with many facilities by default. Food is available on request for lunch and dinner.",
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/300/200",
      "/api/placeholder/300/200",
      "/api/placeholder/300/200"
    ],
    amenities: ["Wifi", "Coffee maker", "Kitchen", "Free parking"]
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
        <Header />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-24">
        {/* Main Image */}
        <div className="md:col-span-2">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        
        {/* Side Images */}
        <div className="grid grid-cols-1 gap-2">
          {property.images.slice(1, 4).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${property.title} ${idx + 1}`}
              className="w-full h-20 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div className="mt-6">
        <h1 className="text-2xl font-semibold">{property.title}</h1>
        <p className="text-gray-600 mt-2">{property.location}</p>
        
        {/* Amenities */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-gray-600" />
            <span>Free Wifi</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-gray-600" />
            <span>Breakfast included</span>
          </div>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-gray-600" />
            <span>Kitchen facilities</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">About this place</h2>
          <p className="text-gray-600">{property.description}</p>
        </div>

        {/* Price and Booking */}
        <div className="mt-6 border-t pt-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold">${property.price}</span>
              <span className="text-gray-600"> / night</span>
            </div>
            <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors">
              Check availability
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">5 nights in Mararikulam</h2>
          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-7 gap-2 text-center">
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat with Host */}
        <div className="mt-6 border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Chat with Host</h2>
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50">
            <MessageCircle className="w-5 h-5" />
            <span>Get your questions answered instantly</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;