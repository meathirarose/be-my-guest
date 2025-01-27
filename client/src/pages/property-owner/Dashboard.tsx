import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PropertyOwnerDashboard: React.FC = () => {
  const bookingsData = [
    { month: "Jan", bookings: 40 },
    { month: "Feb", bookings: 30 },
    { month: "Mar", bookings: 50 },
    { month: "Apr", bookings: 70 },
    { month: "May", bookings: 90 },
    { month: "Jun", bookings: 60 },
  ];

  const revenueData = [
    { name: "Cottages", value: 40000 },
    { name: "Villas", value: 30000 },
    { name: "Homestays", value: 20000 },
    { name: "Others", value: 10000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex flex-col">
      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-gray-600 text-sm font-medium">Total Properties</h3>
          <p className="text-2xl font-bold mt-2">24</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-gray-600 text-sm font-medium">Monthly Bookings</h3>
          <p className="text-2xl font-bold mt-2">250</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-gray-600 text-sm font-medium">Revenue (This Month)</h3>
          <p className="text-2xl font-bold mt-2">₹ 1,20,000</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-gray-600 text-sm font-medium">Pending Requests</h3>
          <p className="text-2xl font-bold mt-2">8</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Bookings Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
          <h3 className="text-gray-600 text-lg font-semibold mb-4">Monthly Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-gray-600 text-lg font-semibold mb-4">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {revenueData.map((_entry, index) => {
                  return (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  );
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-gray-600 text-lg font-semibold mb-4">Recent Bookings</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">Customer</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Property</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Check-In</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Check-Out</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Add your dynamic rows here */}
            <tr>
              <td className="border border-gray-200 px-4 py-2">John Doe</td>
              <td className="border border-gray-200 px-4 py-2">Cozy Cottage</td>
              <td className="border border-gray-200 px-4 py-2">2024-01-10</td>
              <td className="border border-gray-200 px-4 py-2">2024-01-15</td>
              <td className="border border-gray-200 px-4 py-2">₹ 12,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyOwnerDashboard;
