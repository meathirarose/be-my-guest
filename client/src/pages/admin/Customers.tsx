import React, { useEffect, useState } from "react";
import { Table, Avatar } from "antd";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/SideBar";
import { fetchAllCustomers } from "../../api/userAuthApi";

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        setLoading(true);
        const response = await fetchAllCustomers();
        console.log(response, "response from the customers page----------------------")
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomersData();
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
            dataSource={customers}
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

export default Customers;
