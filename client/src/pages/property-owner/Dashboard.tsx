import React, { useState } from "react";
import Sidebar from "../../components/property-owner/common/SideBar";
import Header from "../../components/property-owner/common/Header";
import SearchBar from "../../components/property-owner/dashboard/SearchBar";
import PropertyList from "../../components/property-owner/dashboard/PropertyList";
import AddProperty from "../../components/property-owner/dashboard/AddProperty";

const PropertyOwnerDashboard: React.FC = () => {
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


  const handleAddProperty = () => {
    const newProperty = {
      id: properties.length + 1,
      name: `New Property ${properties.length + 1}`,
      description: "Description of the new property.",
      dateAdded: new Date().toLocaleDateString(),
    };
    setProperties([...properties, newProperty]);
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 bg-gray-50 px-6 py-28">
          <div className="flex justify-between items-center mb-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <AddProperty onAdd={handleAddProperty} />
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

export default PropertyOwnerDashboard;
