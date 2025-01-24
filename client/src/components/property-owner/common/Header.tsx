import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../../../shared/components/ui/ProfileMenu";
import { logoutUser } from "../../../api/userAuthApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/user/userSlice";
import { RootState } from "../../../redux/store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.user;

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
          username={userInfo!.name}
          profilePic={userInfo?.profileImage}
          onLogout={handleLogout}
          onProfile={() => {
            navigate("/host/profile"); 
          }}
        />
      </div>
    </header>
  );
};

export default Header;
