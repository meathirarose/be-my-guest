import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import contactImage from "../../assets/customer-images/contact-image.png";
import { Link } from 'react-router-dom';

const MenuButton: React.FC = () => {
  // State to toggle the menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        className="flex items-center border-2 border-gray-300 bg-white text-purple-700 px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300"
        onClick={toggleMenu}
      >
        <FaBars className="text-lg mr-2" />
        <img
          src={contactImage}
          alt="Contact"
          className="w-6 h-6 rounded-full"
        />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 border border-gray-300">
          <ul className="space-y-3 p-5">
            {/* Each list item now takes up the full width of the menu */}
            <li className="w-full pb-2">
              <Link to="/login" className="w-full ">Login</Link>
            </li>
            <li className="w-full border-b border-gray-300 pb-4">
              <Link to="/signup" className="w-full ">SignUp</Link>
            </li>
            <li className="w-full pb-2">
              <Link to="/host-landing" className="w-full ">Host an Experience</Link>
            </li>
            <li className="w-full pb">
              <Link to="/" className="w-full ">Landing Page</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
