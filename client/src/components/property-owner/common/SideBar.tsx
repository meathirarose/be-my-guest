import React from "react";
import {
  HomeOutlined,
  DashboardOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { SidebarFooter } from "../../ui/sidebar";
import { Button } from "../../ui/button";
import { ChevronUp, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { logoutUser } from "../../../api/userAuthApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/user/userSlice";
import { RootState } from "../../../redux/store";

const Sidebar:React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.user);
    const userInfo = user.user;

    const handleLogout = async () => {
      try {
        await logoutUser();
        dispatch(logout());
        navigate("/signin");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    const handleProfile = () => {
      navigate('/profile');
    }

  return (
    <div className="w-64 bg-gray-200 text-white flex flex-col h-full">
      <div className="text-2xl font-bold py-8 px-9">
        <span className="text-purple-700">Be My</span>{" "}
        <span className="text-black">Guest</span>
      </div>
      <ul className="flex-1 space-y-6 px-6 py-4">
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <DashboardOutlined className="text-2xl" />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <HomeOutlined className="text-2xl" />
          <span>Properties</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <CalendarOutlined className="text-2xl" />
          <span>Bookings</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <DollarCircleOutlined className="text-2xl" />
          <span>Payments</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <MessageOutlined className="text-2xl" />
          <span>Chats</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <QuestionCircleOutlined className="text-2xl" />
          <span>Help</span>
        </li>
      </ul>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <User2 className="h-4 w-4 text-purple-800" />
                <div>
                  <p className="font-semibold text-purple-800">{userInfo?.name}</p>
                </div>
              </div>
              <ChevronUp className="h-4 w-4 text-purple-800" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-60" 
            align="start"
            side="top"
          >
            <DropdownMenuItem className="cursor-pointer" onClick={handleProfile}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </div>
  );
};

export default Sidebar;