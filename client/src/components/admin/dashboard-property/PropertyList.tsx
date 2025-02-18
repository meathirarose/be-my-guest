import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineStop } from "react-icons/ai";
import { PropertyFormData } from "../../../interfaces/ListPropertyDetails";

interface PropertyListProps {
  properties: PropertyFormData[];
  searchQuery: string;
  onBlockProperty: (id: string, isBlocked: boolean) => Promise<void>;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, searchQuery, onBlockProperty }) => {
  const [blockingStates, setBlockingStates] = useState<{ [key: string]: boolean }>({});
  
  const handleBlock = async (id: string, isBlocked: boolean) => {
    setBlockingStates(prev => ({ ...prev, [id]: true }));
    if(!id) {
      console.log("property id should defined");
      return;
    }
    try {
      await onBlockProperty(id, !isBlocked);
      console.log(id, isBlocked)
    } finally {
      setBlockingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <ul className="space-y-4">
      {properties
        .filter((property) =>
          property?.basicInfo?.propertyName?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((property) => (
          <li
            key={property.id}
            className="flex justify-between items-center p-4 bg-white shadow rounded-lg border-l-4 border-purple-600"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 flex items-center justify-center text-purple-950 font-bold text-xl rounded-lg">
                <img src={property.mediaUrls[0]} 
                alt={property.basicInfo.propertyName} 
                className="w-full h-full object-cover"
              />
              </div>
              <div>
                <h5 className="font-bold text-purple-950">{property.basicInfo.propertyName}</h5>
                <p className="text-sm text-purple-700">{property.basicInfo.propertyDescription}</p>
                <p className="text-xs text-purple-400">
                  {property.location.city}, {property.location.locality}, {property.location.state}
                </p>
                
              </div>
            </div>
            <div className="flex items-center space-x-4">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    property.isBlocked ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
                  }`}
                >
                  {property.isBlocked ? "Blocked" : "Unblocked"}
                </span>
              <AiOutlineEdit className="text-xl text-purple-900 cursor-pointer hover:text-purple-500" />

              <AiOutlineStop
                className={`text-xl cursor-pointer ${
                  property.isBlocked ? "text-red-600 hover:text-red-500" : "text-purple-900 hover:text-red-500"
                }`}
                onClick={() => handleBlock(property.id, property.isBlocked)}
                title={property.isBlocked ? "Unblock Property" : "Block Property"}
                style={{ 
                  opacity: blockingStates[property.id] ? 0.5 : 1, 
                  pointerEvents: blockingStates[property.id] ? "none" : "auto" 
                }}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default PropertyList;