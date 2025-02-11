import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertyById } from "../../../api/listPropertyApi";
import { PropertyFormData } from "../../../interfaces/ListPropertyDetails";
import { message } from "antd";
import { RotateCw } from "lucide-react";

const PropertyDetails: React.FC = () => {
    const { id } = useParams();
    const propertyId = id || null; 
    
    console.log("Property ID:", propertyId);

    const [formData, setFormData] = useState<PropertyFormData>({
    basicInfo: {
        propertyName: "",
        buildYear: "",
        liveAtProperty: false,
        contactEmail: "",
        contactMobile: "",
        contactLandline: "",
    },
    location: {
        houseName: "",
        locality: "",
        pincode: "",
        country: "",
        state: "",
        district: "",
        city: "",
    },
    roomsAndSpaces: {
        bedrooms: 0,
        bathrooms: 0,
        livingRoom: 0,
        lobbyLounge: 0,
        helpersRoom: 0,
        swimmingPool: 0,
        parking: 0,
        driversRoom: 0,
        terrace: 0,
        garden: 0,
        diningArea: 0,
        kitchenAvailable: false,
    },
    mediaUrls: [],
    pricing: {
        price: "",
        availability: "",
    },
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!propertyId) {
                setLoading(false); 
                return;
            }
    
            try {
                setLoading(true);
                const response = await fetchPropertyById(propertyId);
                if (response.data) setFormData(response.data.data);
            } catch (error) {
                console.error("Error fetching property data:", error);
                message.error("Failed to fetch property details");
            } finally {
                setLoading(false); 
            }
        };
    
        fetchPropertyData();
    }, [propertyId]);
    

    if (loading)
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <RotateCw color="#9333ea" />{" "}
          </div>
        );
    
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Property Title */}
      <h1 className="text-3xl font-bold">{formData.basicInfo.propertyName}</h1>
      
      {/* Images */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <img src={formData.mediaUrls[0]} alt="Property" className="rounded-lg" />
        <div className="grid grid-cols-2 gap-2">
          <img src={formData.mediaUrls[1]} alt="Property" className="rounded-lg" />
          <img src={formData.mediaUrls[2]} alt="Property" className="rounded-lg" />
        </div>
      </div>
      
      {/* Property Location */}
      <p className="text-gray-600 mt-4">Room in {formData.location.city}, India</p>
      
      {/* Property Features */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">What this place offers</h2>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>Private entrance</li>
          <li>Air conditioning</li>
          <li>Free Wi-Fi</li>
          <li>Breakfast included</li>
        </ul>
      </div>
      
      {/* Pricing Section */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-bold">₹10,000 per night</h3>
        <button className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg">Book Now</button>
      </div>
    </div>
  );
};

export default PropertyDetails;