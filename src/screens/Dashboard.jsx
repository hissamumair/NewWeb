
import { FaUsers, FaDollarSign, FaCar, FaClipboardList, FaRocket, FaChartBar } from "react-icons/fa";
import Navbar from "../components/navbar";

const DashboardCard = ({ icon: Icon, title, value, gradient }) => (
  <div className={`w-62 h-40 ${gradient} p-14 rounded-lg shadow-lg text-white hover:scale-105 transition-transform duration-300`}>
    <div className="flex items-center mb-2">
      <Icon className="text-xl mr-2" />
      <h2 className="text-md font-semibold">{title}</h2>
    </div>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const Dashboard = () => {
  const dashboardData = [
    {
      icon: FaUsers,
      title: "Total Users",
      value: "1,250",
      gradient: "bg-gradient-to-r from-blue-500 to-indigo-600"
    },
    {
      icon: FaDollarSign,
      title: "Total Revenue",
      value: "$45,000",
      gradient: "bg-gradient-to-r from-green-500 to-teal-500"
    },
    {
      icon: FaRocket,
      title: "Total Expeditions",
      value: "320",
      gradient: "bg-gradient-to-r from-yellow-400 to-orange-500"
    },
    {
      icon: FaClipboardList,
      title: "Total Bookings",
      value: "1,500",
      gradient: "bg-gradient-to-r from-red-500 to-pink-500"
    },
    {
      icon: FaCar,
      title: "Total Car Bookings",
      value: "800",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-600"
    },
    {
      icon: FaClipboardList,
      title: "Trip Bookings",
      value: "1,200",
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-600"
    },
    {
      icon: FaChartBar,
      title: "Statistics",
      value: "80%",
      gradient: "bg-gradient-to-r from-teal-500 to-cyan-500"
    }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 p-16 overflow-x-hidden">
      <Navbar />
      <h1 className="pt-4 text-3xl font-semibold text-gray-800">Dashboard</h1>
      
      {/* Container for all cards */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {dashboardData.map((card, index) => (
          <DashboardCard 
            key={index}
            icon={card.icon}
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
