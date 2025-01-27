import React, { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import PropertyList from "../../components/common/PropertyList";
import AddPropertyButton from "../../components/buttons/AddPropertyButton";
import { useNavigate } from "react-router-dom";

const Properties: React.FC = () => {
  const navigate = useNavigate();
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
    console.log('Navigating to Add Property');
    navigate("/host/dashboard/properties/add-property-start");
  };
  
  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  return (
    <div className="flex-1 bg-gray-50 ">
      <div className="flex justify-between items-center mb-6">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <AddPropertyButton onAdd={handleAddProperty} />
      </div>
      <PropertyList
        properties={properties}
        onDelete={handleDeleteProperty}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default Properties;
