import React, { useState } from "react"; 
import Sidebar from "../../components/common/SideBar"; 
import Header from "../../components/common/Header"; 
import { Tabs } from "antd"; 
import { AndroidOutlined } from "@ant-design/icons"; 
import { User2 } from "lucide-react"; 
import ProfileTab from "../../components/admin/dashboard-settings/Profile"; 
import PasswordTab from "../../components/admin/dashboard-settings/Password"; 
 
const AdminSettings: React.FC = () => { 
  const [activeTab, setActiveTab] = useState("1"); 
 
  const handleTabChange = (key: string) => { 
    setActiveTab(key); 
  }; 
 
  const tabs = [ 
    { 
      key: "1", 
      label: "Profile", 
      icon: <User2 className="inline-block align-middle mr-4" size={16} />,  
      component: <ProfileTab />, 
    }, 
    { 
      key: "2", 
      label: "Password", 
      icon: <AndroidOutlined className="inline-block align-middle mr-4" style={{ fontSize: 16 }} />,  
      component: <PasswordTab />, 
    }, 
  ]; 
 
  return ( 
    <div className="flex h-screen bg-gray-50"> 
      <Sidebar /> 
      <div className="flex-1 flex flex-col"> 
        <Header /> 
        <div className="flex-1 bg-gray-50 px-10 py-28"> 
          <h1 className="text-2xl font-bold mb-6 ">Settings</h1> 
          <Tabs 
            activeKey={activeTab} 
            onChange={handleTabChange} 
            items={tabs.map((tab) => ({ 
              key: tab.key, 
              label: (
                <span className="flex items-center">
                  {tab.icon}
                  {tab.label}
                </span>
              ), 
              children: tab.component, 
            }))} 
          /> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default AdminSettings;