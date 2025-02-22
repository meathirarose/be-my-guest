import React, { useEffect, useState } from "react";
import { Table, Switch, message } from "antd";
import { Avatar } from "antd";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/SideBar";
import { fetchAllCustomers, updateUserStatus } from "../../api/userAuthApi";
import { useDispatch } from "react-redux";
import { userStatus } from "../../redux/user/userSlice";
import Footer from "../../shared/components/layout/Footer";

interface Customer {
  id: string;
  name: string;
  email: string;
  country: string;
  profileImage?: string;
  isBlocked: boolean;
}

const Customers: React.FC = () => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const fetchCustomersData = async () => {
    try {
      setLoading(true);
      const response = await fetchAllCustomers();
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      message.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: boolean) => {
    try {
      setLoading(true);
      await updateUserStatus(userId, newStatus);
      setCustomers(prevCustomers =>
        prevCustomers.map(customer =>
          customer.id === userId
            ? { ...customer, isBlocked: newStatus }
            : customer
        )
      );
      dispatch(userStatus({ isBlocked: newStatus }));      
      message.success(`User ${newStatus ? 'blocked' : 'unblocked'} successfully`);
    } catch (error) {
      console.error("Error updating user status: ", error);
      message.error("Failed to update user status");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Profile",
      dataIndex: "profileImage",
      key: "profileImage",
      render: (profileImage: string | undefined) => (
        <Avatar
          className="h-10 w-10"
          src={profileImage}
          alt="Profile"
        >
          {!profileImage && "N/A"}
        </Avatar>
      ),
    },
    {
      title: "Name & Email",
      key: "name",
      render: (_: string, record: Customer) => (
        <div className="flex flex-col">
          <span className="font-medium">{record.name}</span>
          <span className="text-sm text-gray-500">{record.email}</span>
        </div>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (country: string) => country,
    },
    {
      title: "Status",
      key: "status",
      render: (_: string, record: Customer) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          record.isBlocked 
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {record.isBlocked ? 'Blocked' : 'Active'}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: string, record: Customer) => (
        <Switch
          checked={!record.isBlocked}
          onChange={(checked: boolean) => handleStatusChange(record.id, !checked)}
          className={`${!record.isBlocked ? 'bg-green-500' : 'bg-red-500'}`}
        />
      ),
    },
  ];

  return (
    <div>
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 mt-24 py-8">
            <h3 className="text-gray-700 text-3xl font-medium mb-6">
              List Customers
            </h3>
            <div className="bg-white rounded-2xl shadow">
              <Table
                columns={columns}
                dataSource={customers}
                loading={loading}
                rowKey="id"
                className="w-full"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default Customers;