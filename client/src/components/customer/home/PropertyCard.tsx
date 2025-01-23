import React from "react";

const PropertyCard: React.FC = () => {
  const properties = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200",
      location: "Crescent Lake Junction, Oregon",
      host: "Kimberly",
      nights: "5 nights – 9–14 Mar",
      price: "₹78,412 total before taxes",
      rating: 5.0,
      badge: "",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200",
      location: "Sonora, California, US",
      host: "Parkrye",
      nights: "5 nights – 4–9 Dec",
      price: "₹92,713 total before taxes",
      rating: 4.96,
      badge: "Guest favourite",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200",
      location: "Plymouth, California, US",
      host: "Tracy",
      nights: "5 nights – 3–8 Dec",
      price: "₹17,26,049 total before taxes",
      rating: 5.0,
      badge: "",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300x200",
      location: "Napa, California, US",
      host: "Hennessey",
      nights: "5 nights – 13–18 Mar",
      price: "₹3,86,339 total before taxes",
      rating: 5.0,
      badge: "Guest favourite",
    },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="w-56 bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform"
        >
          {/* Image Section */}
          <div className="relative">
            <img
              src={property.image}
              alt={property.location}
              className="h-32 w-full object-cover"
            />
            {property.badge && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                {property.badge}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="p-2">
            <h3 className="text-lg font-semibold">{property.location}</h3>
            <p className="text-sm text-gray-600">Hosted by {property.host}</p>
            <p className="text-sm text-gray-600">{property.nights}</p>
            <p className="text-base font-semibold mt-2">{property.price}</p>
            <div className="mt-2 text-sm text-gray-700">
              ⭐ {property.rating.toFixed(1)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCard;
