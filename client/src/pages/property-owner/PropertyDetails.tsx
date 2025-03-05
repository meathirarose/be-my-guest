import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { RotateCw, Edit, Trash2, MapPin, Users, Home, Calendar, Mail } from "lucide-react";
import { PropertyFormData } from "../../interfaces/Property";
import { fetchPropertyById } from "../../api/listPropertyApi";
import Footer from "../../shared/components/layout/Footer";
import Header from "../../components/common/Header";

const PropertyDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const propertyId = id || null;
  const [formData, setFormData] = useState<PropertyFormData | null>(null);
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

  const handleEditProperty = async (id: string) => {
    try {
      navigate(`/host/dashboard/properties/add-property-start/step-1`, {
        state: { id: id }
      });
    } catch (error) {
        console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
        <RotateCw color="#9333ea" size={40} className="animate-spin" />
      </div>
    );
  }

  if (!formData) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        No property details available.
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 md:px-8 lg:px-24 py-24">
        {/* Header with Actions */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {formData.basicInfo.propertyName}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <MapPin className="w-4 h-4" />
              <p className="text-lg">
                {formData.location.houseName}, {formData.location.city},{" "}
                {formData.location.state}, {formData.location.country}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center  gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition" 
                onClick={()=>handleEditProperty(formData.id)}
            >
              <Edit className="w-4 h-4 " />
              Edit Property
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <img
                src={formData.mediaUrls[0]}
                alt="Main Property"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {formData.mediaUrls.slice(1, 5).map((url, index) => (
                <div key={index} className="w-full h-44">
                  <img
                    src={url}
                    alt={`Gallery Image ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          <div className="lg:w-2/3">
            {/* Property Overview */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <Home className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <span className="block font-semibold">{formData.roomsAndSpaces.bedrooms}</span>
                  <span className="text-sm text-gray-500">Bedrooms</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <span className="block font-semibold">3</span>
                  <span className="text-sm text-gray-500">Max Guests</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <span className="block font-semibold">{formData.basicInfo.buildYear}</span>
                  <span className="text-sm text-gray-500">Build Year</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <Mail className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <span className="block font-semibold truncate">{formData.basicInfo.contactEmail}</span>
                  <span className="text-sm text-gray-500">Contact</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About this Property</h2>
              <p className="text-gray-600">{formData.basicInfo.propertyDescription}</p>
            </div>

            {/* Rooms & Spaces */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Rooms & Spaces</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.roomsAndSpaces)
                  .filter(([key, value]) => value !== 0 && key !== "kitchenAvailable")
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                {"kitchenAvailable" in formData.roomsAndSpaces && (
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Kitchen Available</span>
                    <span>{formData.roomsAndSpaces.kitchenAvailable ? "Yes" : "No"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Pricing Details</h3>
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-2xl font-bold text-gray-900">₹{formData.pricing.price}</span>
                  <span className="text-gray-500">per night</span>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                  formData.pricing.availability === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {formData.pricing.availability}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                    View Bookings
                  </button>
                  <button className="w-full bg-white border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition">
                    Update Availability
                  </button>
                  <button className="w-full bg-white border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition">
                    Manage Photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;