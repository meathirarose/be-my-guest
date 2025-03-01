import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiHeart, FiLogOut, FiUser } from "react-icons/fi";
import contactImage from "../../assets/customer-images/contact-image.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import { RootState } from "../../redux/store";
import { LinkText } from "../../shared/components/ui/LinkText";
import { logoutUser } from "../../api/userAuthApi";
import { resetProperties } from "../../redux/property/propertySlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = useSelector((state: RootState) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(logout());
      dispatch(resetProperties());
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

  const handleWishlistClick = () => {
    navigate("/customer/wishlist");
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if(menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMenuOpen(false);
    }
    if(isMenuOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  },[isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-5 bg-gray-50 shadow-lg z-50">
      <div className="text-2xl font-bold px-6 cursor-pointer" onClick={handleLogoClick}>
        <span className="text-purple-700">Be My</span> Guest
      </div>

      <nav className="flex items-center space-x-4">
        {" "}
        <LinkText to="/customer/home" text="Home" ariaLabel="Home" className="text-purple-700 hover:text-purple-900 transition duration-300" />
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center border-2 border-gray-300 bg-white text-purple-700 px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300"
            onClick={toggleMenu}
          >
            <FaBars className="text-lg mr-2" />
            <img
              src={user.user?.profileImage || contactImage}
              alt="Contact"
              className="w-6 h-6 rounded-full"
            />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl min-w-52 border border-gray-300">
              <ul className="space-y-3 p-5">
                <li
                  className="w-full pb-2 px-4 flex items-center space-x-2 cursor-pointer"
                  onClick={handleProfileClick}
                >
                  <FiUser className="text-lg" />
                  <span>Your Profile</span>
                </li>

                <li
                  className="w-full pb-2 px-4 flex items-center space-x-2 cursor-pointer"
                  onClick={handleWishlistClick}
                >
                  <FiHeart className="text-lg" />
                  <span>Wishlists</span>
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
