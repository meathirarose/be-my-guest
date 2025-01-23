import React from "react";
import { BellRing, ChevronDown, LogOut, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../../../components/ui/dropdown-menu";

interface ProfileMenuProps {
  username: string;
  profilePic: string;
  onLogout: () => void;
  onProfile: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ username, profilePic, onLogout, onProfile }) => {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-between gap-4 py-2 px-4 text-purple-800 bg-transparent border-none rounded-md cursor-pointer mr-12"> 
            <div className="flex items-center gap-2">
              {/* Notification Icon with Right Border */}
              <BellRing color="#6b21a8" className="mr-7" strokeWidth={1.5} />
              
              {/* Vertical Divider */}
              <div className="border-r-2 border-gray-300 h-8 mr-7" />

              {/* Profile Image */}
              <img
                src={profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <p>Admin</p>
            <ChevronDown className="h-4 w-4 text-purple-800" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-52 mr-12" align="start" side="top">
          {/* Display Welcome Message */}
          <DropdownMenuItem className="cursor-pointer text-gray-700">
            Welcome, {username}!
          </DropdownMenuItem>

          {/* Profile Option */}
          <DropdownMenuItem className="cursor-pointer" onClick={onProfile}>
            <User2 className="h-4 w-4 mr-4 text-purple-800" />
             Profile
          </DropdownMenuItem>

          {/* Logout Option */}
          <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
            <LogOut className="w-4 h-4 text-purple-800 mr-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
