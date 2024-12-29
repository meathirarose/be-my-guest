import React from "react";
import { Link, useLocation } from "react-router-dom";
import MenuButton from "./MenuButton";

const Header: React.FC = () => {
  const location = useLocation();

  // Determine the login path based on the current pathname
  const loginPath = location.pathname === "/" ? "/login" : "/host-signin";

  // List of landing page paths
  const landingPages = ["/", "/host-landing"];

  // Check if the current path is a landing page
  const isLandingPage = landingPages.includes(location.pathname);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-5 bg-gray-50 shadow-lg z-50">
      {/* Brand Name */}
      <div className="text-2xl font-bold">
        <span className="text-purple-700">Be My</span> Guest
      </div>

      {/* Navigation */}
      <nav>
        {isLandingPage ? (
          <Link to={loginPath}>
            <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition duration-300">
              Get Started
            </button>
          </Link>
        ) : (
          <MenuButton />
        )}
      </nav>
    </header>
  );
};

export default Header;
