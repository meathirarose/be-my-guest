import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertyById } from "../../../api/listPropertyApi";
import { PropertyFormData } from "../../../interfaces/ListPropertyDetails";
import { message } from "antd";
import { RotateCw } from "lucide-react";
import Header from "../../common/Header";

const PropertyDetails: React.FC = () => {
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

    if (loading)
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                <RotateCw color="#9333ea" size={32} className="animate-spin" />
            </div>
        );

    if (!formData) return <p className="text-center text-gray-600">No property details available.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <Header />
            <h1 className="text-4xl font-bold text-gray-800">{formData.basicInfo.propertyName}</h1>
            <p className="text-gray-600 text-lg mt-1">{formData.location.houseName}, {formData.location.city}, {formData.location.state}, {formData.location.country}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {formData.mediaUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Property Image ${index + 1}`} className="rounded-lg w-full h-48 object-cover shadow-md" />
                ))}
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">Property Details</h2>
                <ul className="mt-2 text-gray-600 space-y-1">
                    <li><strong>Build Year:</strong> {formData.basicInfo.buildYear}</li>
                    <li><strong>Owner Lives Here:</strong> {formData.basicInfo.liveAtProperty ? "Yes" : "No"}</li>
                    <li><strong>Contact Email:</strong> {formData.basicInfo.contactEmail}</li>
                    <li><strong>Contact Mobile:</strong> {formData.basicInfo.contactMobile}</li>
                </ul>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">Rooms & Spaces</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-gray-600">
                    {Object.entries(formData.roomsAndSpaces).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                            <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                            <span className="text-lg font-semibold text-gray-800">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing & Availability */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Price</h3>
                    <p className="text-lg text-gray-600">₹{formData.pricing.price} per night</p>
                    <p className={`text-md ${formData.pricing.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                        {formData.pricing.availability}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PropertyDetails;
