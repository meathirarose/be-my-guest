import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

interface Property {
  id: number;
  name: string;
  description: string;
  dateAdded: string;
}

interface PropertyListProps {
  properties: Property[];
  onDelete: (id: number) => void;
  searchQuery: string;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onDelete, searchQuery }) => {
  return (
    <ul className="space-y-4">
      {properties
        .filter((property) =>
          property.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((property) => (
          <li
            key={property.id}
            className="flex justify-between items-center p-4 bg-white shadow rounded-lg border-l-4 border-purple-600"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 flex items-center justify-center text-purple-950 font-bold text-xl rounded-lg">
                📄
              </div>
              <div>
                <h5 className="font-bold text-purple-950">{property.name}</h5>
                <p className="text-sm text-purple-700">{property.description}</p>
                <p className="text-xs text-purple-400">{property.dateAdded}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <AiOutlineEdit className="text-xl text-purple-900 cursor-pointer hover:text-purple-500" />
              <AiOutlineDelete
                className="text-xl text-purple-900 cursor-pointer hover:text-red-600"
                onClick={() => onDelete(property.id)}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default PropertyList;
