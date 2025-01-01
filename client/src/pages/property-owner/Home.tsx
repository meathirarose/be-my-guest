import React, { useState } from "react";
import {
  FaHome,
  FaTaxi,
  FaMoneyCheck,
  FaComments,
  FaQuestionCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineBell } from "react-icons/ai";

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">Be My Guest</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 cursor-pointer">
            <MdDashboard className="text-xl" />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 cursor-pointer">
            <FaCalendarAlt className="text-xl" />
            <span>Bookings</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 cursor-pointer">
            <FaHome className="text-xl" />
            <span>Properties</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 cursor-pointer">
            <FaTaxi className="text-xl" />
            <span>Taxi Service</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 cursor-pointer">
            <FaMoneyCheck className="text-xl" />
            <span>Payments</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 cursor-pointer">
            <FaComments className="text-xl" />
            <span>Chats</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 cursor-pointer">
            <FaQuestionCircle className="text-xl" />
            <span>Help</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-200 px-6 py-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Hello, Owner</h3>
            <p className="text-sm text-gray-500">Have a nice day</p>
          </div>
          <div className="flex items-center space-x-6">
            <AiOutlineBell className="text-2xl text-gray-700 cursor-pointer" />
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-bold text-gray-800">John Wick</p>
                <p className="text-sm text-gray-500">User</p>
              </div>
            </div>
            <FiLogOut className="text-xl text-gray-700 cursor-pointer" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search properties"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
            />
            <div className="flex items-center space-x-4">
              <select className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-600">
                <option value="dateAdded">Sort by Date</option>
                <option value="name">Sort by Name</option>
              </select>
              <button
                onClick={handleAddProperty}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                + Add Property
              </button>
            </div>
          </div>

          {/* List of Properties */}
          <h4 className="text-lg font-bold text-gray-800 mb-4">List of Properties</h4>
          <ul className="space-y-4">
            {properties
              .filter((property) =>
                property.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((property) => (
                <li
                  key={property.id}
                  className="flex justify-between items-center p-4 bg-white shadow rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-xl rounded-lg">
                      📄
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800">{property.name}</h5>
                      <p className="text-sm text-gray-500">{property.description}</p>
                      <p className="text-xs text-gray-400">{property.dateAdded}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <AiOutlineEdit className="text-xl text-gray-600 cursor-pointer hover:text-blue-600" />
                    <AiOutlineDelete
                      className="text-xl text-gray-600 cursor-pointer hover:text-red-600"
                      onClick={() => handleDeleteProperty(property.id)}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyOwnerDashboard;
