import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from "../../components/common/SideBar";
import Header from "../../components/common/Header";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  // Dummy data for stats
  const totalUsers = 120;
  const totalPropertyOwners = 45;
  const totalBookings = 340;
  const totalPayments = "$50,200";

  // Pie chart data
  const data = {
    labels: ["Users", "Property Owners"],
    datasets: [
      {
        data: [totalUsers, totalPropertyOwners],
        backgroundColor: ["#6366f1", "#6b7280"], 
        hoverBackgroundColor: ["#4f46e5", "#4b5563"],
      },
    ],
  };

  // ChartJS options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="p-6 mt-24"> 
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">
            Admin Dashboard
          </h2>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Users */}
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-lg text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-purple-700">{totalUsers}</p>
            </div>

            {/* Total Property Owners */}
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-lg text-gray-600">Total Property Owners</p>
              <p className="text-3xl font-bold text-purple-700">
                {totalPropertyOwners}
              </p>
            </div>

            {/* Total Bookings */}
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-lg text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-purple-700">
                {totalBookings}
              </p>
            </div>

            {/* Total Payments */}
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-lg text-gray-600">Total Payments</p>
              <p className="text-3xl font-bold text-purple-700">
                {totalPayments}
              </p>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="bg-white shadow rounded-lg p-6 flex items-center">
            <div className="w-60 h-60 mx-auto">
              <Pie data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
