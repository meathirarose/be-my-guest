import React from "react";
import Header from "../../components/customer/Header";
import Footer from "../../shared/components/layout/Footer";
import Sidebar from "../../components/common/SideBar";
import { Tabs } from "antd";
import ProfileInfo from "../../components/customer/profile/ProfileInfoTab";
import PasswordChange from "../../components/customer/profile/ChangePasswordTab";
import AddressManager from "../../components/customer/profile/AddAddressTab";


const Profile: React.FC = () => {


  const items = [
    {
      key: '1',
      label: 'Profile Info',
      children: <ProfileInfo />,
    },
    {
      key: '2',
      label: 'Change Password',
      children: <PasswordChange />,
    },
    {
      key: '3',
      label: 'Addresses',
      children: <AddressManager />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1 pt-24 pb-4">
        <Sidebar />

        <main className="flex-1 bg-white p-8 rounded-lg shadow-md">
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-800">Your Profile</h3>
          </div>

          <Tabs
            defaultActiveKey="1"
            items={items}
            className="w-full"
          />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;