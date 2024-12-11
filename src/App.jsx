
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./screens/Dashboard";
import UserManagement from "./screens/UserManagement";
import Sidebar from "./components/sidebar";
import ExpeditionManagement from "./screens/ExpeditionManagement";
import BookingManagement from "./screens/BookingManagement";
import CarBooking from "./screens/CarBooking";
import Login from "./screens/Auth/Login";
import AccountSetting from "./screens/AccountSetting";
import About from "./components/NavBarScreen/About";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              // Redirect authenticated users to the dashboard
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
<Route path="/about" element={<About />} />
        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route
            path="*"
            element={
              <div className="flex">
                {/* Sidebar Layout */}
                <Sidebar />
                <div className="flex-1 p-6">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/expedition-management" element={<ExpeditionManagement />} />
                    <Route path="/booking-management" element={<BookingManagement />} />
                    <Route path="/car-booking" element={<CarBooking />} />
                    <Route path="/account-setting" element={<AccountSetting />} />
                  </Routes>
                </div>
              </div>
            }
          />
        ) : (
          // Redirect to login if not authenticated
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
