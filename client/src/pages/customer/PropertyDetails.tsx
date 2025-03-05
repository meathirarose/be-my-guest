import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { RotateCw } from "lucide-react";
import { PropertyFormData } from "../../interfaces/Property";
import { fetchPropertyById } from "../../api/listPropertyApi";
import Header from "../../components/customer/Header";
import Footer from "../../shared/components/layout/Footer";
import { fetchByUserId } from "../../api/userAuthApi";
import { User } from "../../interfaces/User";


const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const propertyId = id || null;

  const [formData, setFormData] = useState<PropertyFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const hostingSinceYears = formData?.basicInfo?.hostingSince
  ? new Date().getFullYear() - parseInt(formData?.basicInfo?.hostingSince) : 0;

  console.log(formData?.basicInfo.hostingSince, hostingSinceYears, "hostingSinceYears");
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = formData?.userId;
        if(!userId) {
          return;
        }
        const response = await fetchByUserId(userId);
        if(response) setUserData(response.data.data);
      }catch (error) {
        console.error("Error fetching user data:", error);
        message.error("Failed to fetch user details");
      } 
    }
    fetchUserData();
  }, [formData?.userId]);

  
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
        <div className="text-left">
          <h1 className="text-4xl font-bold text-gray-900">
            {formData.basicInfo.propertyName}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            {formData.location.houseName}, {formData.location.city},{" "}
            {formData.location.state}, {formData.location.country}
          </p>
        </div>

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
        {/* heading */}
        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          <div className="lg:w-2/3">
            <h1 className="text-2xl font-semibold text-gray-900">
              {formData.basicInfo.propertyName} in {formData.location.city},{" "}
              {formData.location.country}
            </h1>
            <p className="text-gray-700 mt-1 mb-6">
              {formData.roomsAndSpaces.bedrooms} bedrooms · 1 double bed · Private attached bathroom
            </p>
            {/* host information */}
            <div className="border-t border-b mt-4 py-6">
              <div className="flex items-center gap-3">
                <img
                  src={userData?.profileImage}
                  alt="Host"
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <p className="font-semibold text-gray-800">Hosted by {userData?.name || "Host"}</p>
                  <p className="text-gray-600 text-sm">{hostingSinceYears} years hosting</p>
                </div>
              </div>
            </div>

            {/* features */}
            <div className="mt-5 space-y-5 border-b py-8">
              <div className="flex items-start gap-3">
                🛏️
                <div>
                  <p className="font-semibold">Room in a bed — Your own room with access to shared spaces.</p>
                  <p className="text-sm text-gray-500">Enjoy privacy with shared common areas for a comfortable stay.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                🏠
                <div>
                  <p className="font-semibold">Shared common spaces — Access to shared areas with host and other guests.</p>
                  <p className="text-sm text-gray-500">Relax in living rooms, kitchens, and more with other guests.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                🚿
                <div>
                  <p className="font-semibold">Private attached bathroom — Direct bathroom access.</p>
                  <p className="text-sm text-gray-500">Have the convenience of a bathroom exclusively for you.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                ✅
                <div>
                  <p className="font-semibold">Free cancellation before 27 Mar.</p>
                  <p className="text-sm text-gray-500">Change plans without worries until the cancellation deadline.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                🚖
                <div>
                  <p className="font-semibold">Convenient Airport Taxi Service — Pickup and drop-off included.</p>
                  <p className="text-sm text-gray-500">Book hassle-free transport to and from the airport.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                🍽️
                <div>
                  <p className="font-semibold">Order authentic meals in advance.</p>
                  <p className="text-sm text-gray-500">Taste local flavors with pre-ordered traditional dishes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                🌿
                <div>
                  <p className="font-semibold">Experience local activities like rubber tapping.</p>
                  <p className="text-sm text-gray-500">Join hands-on activities for an authentic cultural experience.</p>
                </div>
              </div>
            </div>

            {/* description about the place */}
            <div className="mt-5 p-1 rounded-lg border-b py-8">
              <h2 className="text-xl font-semibold text-gray-800 pb-2">About this place</h2>
                <p>{formData.basicInfo.propertyDescription}</p>
            </div>

            <div className="mt-5 p-1 rounded-lg border-b py-8">
              <h2 className="text-xl font-semibold text-gray-800 pb-2">Property Details</h2>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li><strong>Build Year:</strong> {formData.basicInfo.buildYear}</li>
                <li><strong>Owner Lives Here:</strong> {formData.basicInfo.liveAtProperty ? "Yes" : "No"}</li>
                <li><strong>Contact Email:</strong> {formData.basicInfo.contactEmail}</li>
                <li><strong>Contact Mobile:</strong> {formData.basicInfo.contactMobile}</li>
              </ul>
            </div>
            
            {/* room details */}
            <div className="mt-5 p-1 rounded-lg border-b py-8">
              <h2 className="text-2xl font-semibold text-gray-800 pb-2">Rooms & Spaces</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {Object.entries(formData.roomsAndSpaces)
                  .filter(([key, value]) => value !== 0 && key!== "kitchenAvailable") 
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between text-gray-700">
                      <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}

                {"kitchenAvailable" in formData.roomsAndSpaces && (
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="capitalize">Kitchen Available</span>
                    {formData.roomsAndSpaces.kitchenAvailable ? (
                      <input type="checkbox" checked readOnly className="w-5 h-5 accent-purple-600 cursor-default" />
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
          {/* box for booking */}
          <div className="lg:w-1/3 sticky top-24 self-start">
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">
                  ₹{formData.pricing.price}
                </h2>
                <span className="text-gray-500 text-sm">(for stay)</span>
              </div>

              <div className="mt-4 border rounded-lg">
                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 text-sm">
                    <p className="text-gray-500">CHECK-IN</p>
                    <p className="font-medium">4/1/2025</p>
                  </div>
                  <div className="p-3 text-sm border-l">
                    <p className="text-gray-500">CHECKOUT</p>
                    <p className="font-medium">4/6/2025</p>
                  </div>
                </div>
                <div className="p-3 text-sm">
                  <p className="text-gray-500">GUESTS</p>
                  <select className="w-full mt-1 border rounded-md p-2">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                  </select>
                </div>
              </div>

              <p className="text-center text-xs text-gray-600 mt-3">
                Craving Local Flavors? Pre-Order Your Meals Now!
              </p>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg mt-3 hover:bg-purple-700 transition">
                Check Your Meals
              </button>

              <p className="text-center text-gray-500 text-xs mt-2">You won’t be charged yet</p>
              <button className="w-full text-gray-500 text-xs mt-4 underline hover:text-gray-600">
                Report this listing
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
