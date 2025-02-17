import React, { useEffect, useState } from "react";
import Sidebar from "../../components/common/SideBar";
import Header from "../../components/common/Header";
import SearchBar from "../../components/common/SearchBar";
import PropertyList from "../../components/common/PropertyList";
import { fetchAllProperties } from "../../api/listPropertyApi";
import { PropertyFormData } from "../../interfaces/ListPropertyDetails";
import { Spin } from "antd";

const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<PropertyFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllProperties();
      setProperties(response.data?.data || []); 
    } catch (error) {
      setError("Error fetching properties. Please try again later.");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = (id?: string | "") => {
    setProperties(properties.filter((property) => property.id !== String(id)));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 bg-gray-50 px-6 py-28">
          <div className="flex justify-between items-center mb-6">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {/* Loading and Error States */}
          {loading ? (
            <div className="text-center text-gray-600"><Spin /></div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : properties.length === 0 ? (
            <div className="text-center text-gray-500">No properties found.</div>
          ) : (
            <PropertyList properties={properties} onDelete={handleDeleteProperty} searchQuery={searchQuery} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
