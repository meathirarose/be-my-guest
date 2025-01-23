import React, { useEffect, useState } from "react";
import { Table, Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Header from "../../components/property-owner/common/Header";
import Sidebar from "../../components/admin/SideBar";

// Define the type for a HotelOwner
interface HotelOwner {
  id: number;
  name: string;
  email: string;
  createDate: string;
  role: string;
  status: "Credited" | "Pending";
}

const HotelOwners: React.FC = () => {
  const [hotelOwners, setHotelOwners] = useState<HotelOwner[]>([]);

  // Dummy data for hotel owners
  const dummyOwners: HotelOwner[] = [
    {
      id: 1,
      name: "David Wagner",
      email: "david_wagner@example.com",
      createDate: "24 Jun, 2023",
      role: "Lorem Ipsum",
      status: "Credited",
    },
    {
      id: 2,
      name: "Ina Hogan",
      email: "windler.warren@runte.net",
      createDate: "24 Aug, 2023",
      role: "Lorem Ipsum",
      status: "Credited",
    },
    {
      id: 3,
      name: "Devin Harmon",
      email: "wintheiser_enos@yahoo.com",
      createDate: "18 Dec, 2023",
      role: "Lorem Ipsum",
      status: "Credited",
    },
    {
      id: 4,
      name: "Lena Page",
      email: "camila_ledner@gmail.com",
      createDate: "8 Oct, 2023",
      role: "Lorem Ipsum",
      status: "Pending",
    },
  ];

  useEffect(() => {
    setHotelOwners(dummyOwners);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: HotelOwner) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Credited" ? "purple" : "gray"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: HotelOwner) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => alert(`Edit ${record.name}`)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => alert(`Delete ${record.name}`)}
          />
        </div>
      ),
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
            dataSource={hotelOwners}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelOwners;
