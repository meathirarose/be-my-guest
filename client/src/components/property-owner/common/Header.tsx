import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../../../shared/components/ui/ProfileMenu";
import { logoutUser } from "../../../api/userAuthApi";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/user/userSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/host/dashboard");
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate("/host/signin");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-50 shadow-lg z-50">
      <div className="text-2xl font-bold px-6" onClick={handleClick}>
        <span className="text-purple-700">Be My</span> Guest
      </div>

      <div className="flex items-center">
        <ProfileMenu
          username="Athira Rose John"
          profilePic="https://i.pinimg.com/736x/f5/2e/90/f52e90f281f04dab12e1f8367db13c80.jpg"
          onLogout={handleLogout}
          onProfile={() => {
            console.log("Go to profile page");
            navigate("/profile"); 
          }}
        />
      </div>
    </header>
  );
};

export default Header;
