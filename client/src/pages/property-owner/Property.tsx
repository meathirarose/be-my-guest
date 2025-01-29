import React, { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import AddPropertyButton from "../../components/buttons/AddPropertyButton";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
    navigate("/host/dashboard/properties/add-property-start/step-1");
  };

  const handleViewProperty = (id: number) => {
    console.log(`Viewing property with ID: ${id}`);
    navigate(`/host/dashboard/properties/view/${id}`);
  };

  const handleEditProperty = (id: number) => {
    console.log(`Editing property with ID: ${id}`);
    navigate(`/host/dashboard/properties/edit/${id}`);
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <AddPropertyButton onAdd={handleAddProperty} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties
          .filter((property) =>
            property.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((property) => (
            <Card
              key={property.id}
              className="border shadow-lg rounded-2xl bg-white hover:shadow-xl transition-shadow "
            >
              <CardHeader>
                <CardTitle className="text-purple-700">{property.name}</CardTitle>
                <CardDescription className="text-gray-500">
                  {property.dateAdded}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{property.description}</p>
                <div className="flex justify-end mt-4 space-x-4 text-purple-700">
                  {/* View Icon */}
                  <EyeOutlined
                    className="cursor-pointer hover:text-purple-500 transition-colors"
                    onClick={() => handleViewProperty(property.id)}
                    title="View"
                  />
                  {/* Edit Icon */}
                  <EditOutlined
                    className="cursor-pointer hover:text-purple-500 transition-colors"
                    onClick={() => handleEditProperty(property.id)}
                    title="Edit"
                  />
                  {/* Delete Icon */}
                  <DeleteOutlined
                    className="cursor-pointer hover:text-purple-500 transition-colors"
                    onClick={() => handleDeleteProperty(property.id)}
                    title="Delete"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Properties;
