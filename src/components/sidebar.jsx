// import { Link } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn")
    console.log("User signed outasdfsadfasd  adf sd fs d d s");
    navigate("/login"); 
    window.location.reload();

  };

  return (
    <aside className="w-64  mt-20 ml-2 rounded-lg shadow-xl p-10 mt-10 ">
      <div className="text-center mb-8">
        <img
          src="/user.png"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-green-500 shadow-md"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Hissam Umair
        </h2>
        <p className="text-sm text-gray-500">Admin</p>
      </div>
      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className="flex items-center text-gray-700 hover:bg-green-50 p-2 rounded-md transition duration-300 text-sm hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          <span className="mr-3 ">📊</span> Dashboard
        </Link>
        <Link
          to="/user-management"
          className="flex items-center text-sm text-gray-700 hover:bg-green-50 p-2 rounded-md transition duration-300 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          <span className="mr-3 text-sm">👤</span> User Management
        </Link>

        <Link
          to="/booking-management"
          className="flex items-center text-sm text-gray-700 hover:bg-green-50 p-2 rounded-md transition duration-300 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          <span className="mr-3">🗂️</span> Booking Management
        </Link>
        <Link
          to="/chat"
          className="flex items-center text-gray-700 text-sm hover:bg-green-50 p-2 rounded-md transition duration-300 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          <span className="mr-3">📩</span> Inbox
        </Link>

        <button
          onClick={handleSignOut}
          className="flex items-center text-gray-700 hover:bg-red-50 p-2 text-sm rounded-md transition duration-300 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          <span className="mr-3">🚪</span> Sign Out
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
