import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";
import contactImage from "../../assets/customer-images/contact-image.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import { RootState } from "../../redux/store";
import { LinkText } from "../../shared/components/ui/LinkText";
import { logoutUser } from "../../api/userAuthApi";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  const userName = user.user?.name || "Guest";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(logout());
      navigate("/customer/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleProfileClick = () => {
    navigate("/customer/profile");
  };

  const handleLogoClick = () => {
    navigate("/customer/home");
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-5 bg-gray-50 shadow-lg z-50">
      <div className="text-2xl font-bold px-6 cursor-pointer" onClick={handleLogoClick}>
        <span className="text-purple-700">Be My</span> Guest
      </div>

      <nav className="flex items-center space-x-4">
        {" "}
        <LinkText to="/customer/home" text="Home" ariaLabel="Home" className="text-purple-700 hover:text-purple-900 transition duration-300" />
        <div className="relative">
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
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg min-w-64 border border-gray-300">
              <ul className="space-y-3 p-5">
                <li className="w-full pb-2 px-4">
                  <span className="w-full font-semibold">
                    Welcome, <span className="text-purple-700">{userName}</span>
                  </span>
                </li>

                <li
                  className="w-full pb-2 px-4 flex items-center space-x-2 cursor-pointer"
                  onClick={handleProfileClick}
                >
                  <FiUser className="text-lg" />
                  <span>Your Profile</span>
                </li>

                <li
                  className="w-full pb-2 px-4 flex items-center space-x-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-lg" />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
