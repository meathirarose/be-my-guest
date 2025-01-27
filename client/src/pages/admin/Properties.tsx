import React, { useState } from "react";
import Sidebar from "../../components/common/SideBar";
import Header from "../../components/common/Header";
import SearchBar from "../../components/common/SearchBar";
import PropertyList from "../../components/common/PropertyList";

const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Blue Origin Farms",
      description: "Beautiful countryside property perfect for relaxation.",
      dateAdded: "June 9, 2023",
    },
    {
      id: 2,
      name: "Green Valley Resort",
      description: "A premium resort with stunning views and facilities.",
      dateAdded: "July 15, 2023",
    },
  ]);

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 bg-gray-50 px-6 py-28">
          <div className="flex justify-between items-center mb-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          <PropertyList
            properties={properties}
            onDelete={handleDeleteProperty}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;