import React from "react";
import { FaUsers, FaDollarSign, FaCar, FaClipboardList, FaRocket, FaChartBar } from "react-icons/fa";
import Navbar from "../components/navbar";
import { useGetDashboardStatQuery } from "../redux/reducers/user/userThunk";

// Loader component for when data is being fetched
const Loader = () => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
  </div>
);

// DashboardCard component
const DashboardCard = ({ icon: Icon, title, value, gradient }) => (
  <div
    className={`w-62 h-40 ${gradient} p-14 rounded-lg shadow-lg text-black hover:scale-105 transition-transform duration-300 bg-red-300`}
  >
    <div className="flex items-center mb-2">
      {/* <Icon className="text-xl mr-2" /> */}
      <h2 className="text-md font-semibold">{title}</h2>
    </div>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const Dashboard = () => {
  // Fetch dashboard data using the redux thunk query
  const { data, error, isLoading } = useGetDashboardStatQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-100 p-16 overflow-x-hidden">
        <Navbar />
        <h1 className="pt-4 text-3xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-100 p-16 overflow-x-hidden">
        <Navbar />
        <h1 className="pt-4 text-3xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex justify-center items-center w-full h-full text-red-500">
          <p>Failed to load dashboard data. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Destructure dashboard data from the API response
  const dashboardData = data || [];

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 p-16 overflow-x-hidden">
      <Navbar />
      <h1 className="pt-4 text-3xl font-semibold text-gray-800">Dashboard</h1>

      {/* Container for all cards */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {dashboardData.map((card, index) => (
          <DashboardCard
            key={index}
            icon={FaUsers} // Update as per your requirement (e.g., dynamic icon selection)
            title={card.title}
            value={card.value}
            gradient={card.gradient}
          />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
