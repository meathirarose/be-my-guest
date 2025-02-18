import React, { useEffect, useState } from "react";
import Sidebar from "../../components/common/SideBar";
import Header from "../../components/common/Header";
import SearchBar from "../../components/common/SearchBar";
import PropertyList from "../../components/admin/dashboard-property/PropertyList";
import { fetchAllProperties, blockProperty } from "../../api/listPropertyApi";
import { Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { propertyStatus, setProperties } from "../../redux/property/propertySlice";
import { RootState } from "../../redux/store";

const Properties: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  const properties = useSelector((state: RootState) => state.property.properties);

  useEffect(() => {
    fetchProperties();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllProperties();
      const propertiesData = response.data?.data || [];
      dispatch(setProperties(propertiesData));
    } catch (error) {
      setError("Error fetching properties. Please try again later.");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockProperty = async (id: string, newBlockedStatus: boolean) => {
    try {
      setUpdating(true); 
      await blockProperty(id, newBlockedStatus);
      
      dispatch(propertyStatus({ id, isBlocked: newBlockedStatus }));
      
      message.success(`Property ${newBlockedStatus ? "blocked" : "unblocked"} successfully.`);
    } catch (error) {
      message.error("Failed to update the property status");
      console.error("Error updating property status:", error);
    } finally {
      setUpdating(false); 
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {updating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Spin size="small"/>
        </div>
      )}

      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 bg-gray-50 px-6 py-28">
          <div className="flex justify-between items-center mb-6">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {loading ? (
            <div className="text-center text-gray-600"><Spin /></div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : properties.length === 0 ? (
            <div className="text-center text-gray-500">No properties found.</div>
          ) : (
            <PropertyList 
              properties={properties} 
              searchQuery={searchQuery} 
              onBlockProperty={handleBlockProperty}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;