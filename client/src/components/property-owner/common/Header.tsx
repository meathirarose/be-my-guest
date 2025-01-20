import React from "react";

const Header: React.FC = () => {

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-gray-50 shadow-lg z-50">
      <div className="text-2xl font-bold px-6">
        <span className="text-purple-700">Be My</span> Guest
      </div>
    </header>
  );
};

export default Header;
