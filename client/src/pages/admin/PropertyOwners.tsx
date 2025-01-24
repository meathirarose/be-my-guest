import React, { useEffect, useState } from "react";
import { Table, Avatar } from "antd";
import Header from "../../components/property-owner/common/Header";
import Sidebar from "../../components/admin/SideBar";
import { fetchAllPropertyOwners } from "../../api/userAuthApi";

const PropertyOwners: React.FC = () => {
  const [host, setHost] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHostData = async () => {
      try {
        setLoading(true);
        const response = await fetchAllPropertyOwners();
        console.log(response, "response from the property page----------------------")
        setHost(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostData();
  }, []);

  const columns = [
    {
      title: "Profile",
      dataIndex: "profileImage",
      key: "profileImage",
      render: (profileImage: string | undefined) => (
        <Avatar
          src={profileImage}
          alt="Profile"
          size="large"
          style={{ backgroundColor: "#f56a00" }}
        >
          {!profileImage && "N/A"}
        </Avatar>
      ),
    },
    {
      title: "Name & Email",
      key: "name",
      render: (_: string, record: { name: string; email: string }) => (
        <div>
          <div className="font-medium text-lg text-purple-700">{record.name}</div>
          <div className="text-gray-500 text-sm">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (country: string) => <span className="text-gray-700">{country}</span>,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 mt-24">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">
            List Customers
          </h2>
          <Table
            dataSource={host}
            columns={columns}
            rowKey="_id"
            pagination={false}
            loading={loading}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyOwners;
