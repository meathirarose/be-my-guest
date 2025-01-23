import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
const navigate = useNavigate();
const handleClick = () => {
  navigate("/host/dashboard");
}
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-7 bg-gray-50 shadow-lg z-50">
      <div className="text-2xl font-bold px-6" onClick={handleClick}>
        <span className="text-purple-700">Be My</span> Guest
      </div>
    </header>
  );
};

export default Header;
