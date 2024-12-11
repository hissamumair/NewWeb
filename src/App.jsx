// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux"; // To access the Redux state
// import Dashboard from "./screens/Dashboard";
// import UserManagement from "./screens/UserManagement";
// import Sidebar from "./components/sidebar";
// import ExpeditionManagement from "./screens/ExpeditionManagement";
// import BookingManagement from "./screens/BookingManagement";
// import CarBooking from "./screens/CarBooking";
// import Login from "./screens/Auth/Login";
// import AccountSetting from "./screens/AccountSetting";
// import About from "./components/NavBarScreen/About";
// import { setAuthenticated } from "./redux/Reducers/users/userReducer";
// import { useEffect } from "react";

// const App = () => {
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
//   const dispatch = useDispatch();
//   // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard"); // Redirect to dashboard if authenticated
//     } else {
//       navigate("/login"); // Redirect to login if not authenticated
//     }
//   }, [isAuthenticated, navigate]);

//   // const handleLogin = () => {
//   //   dispatch(setAuthenticated(true));
//   // }
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/login"
//           element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
//         />
//         <Route path="/about" element={<About />} />

//         {isAuthenticated ? (
//           <Route
//             path="*"
//             element={
//               <div className="flex">
//                 <Sidebar />
//                 <div className="flex-1 p-6">
//                   <Routes>
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route
//                       path="/user-management"
//                       element={<UserManagement />}
//                     />
//                     <Route
//                       path="/expedition-management"
//                       element={<ExpeditionManagement />}
//                     />
//                     <Route
//                       path="/booking-management"
//                       element={<BookingManagement />}
//                     />
//                     <Route path="/car-booking" element={<CarBooking />} />
//                     <Route
//                       path="/account-setting"
//                       element={<AccountSetting />}
//                     />
//                   </Routes>
//                 </div>
//               </div>
//             }
//           />
//         ) : (
//           <Route path="*" element={<Navigate to="/login" />} />
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux"; // To access the Redux state
import Dashboard from "./screens/Dashboard";
import UserManagement from "./screens/UserManagement";
import Sidebar from "./components/sidebar";
import ExpeditionManagement from "./screens/ExpeditionManagement";
import BookingManagement from "./screens/BookingManagement";
import CarBooking from "./screens/CarBooking";
import AccountSetting from "./screens/AccountSetting";
import About from "./components/NavBarScreen/About";
// import  setAuthenticated  from "./redux/Reducers/users/userReducer";
import { useEffect, useState } from "react";
import Login from "./screens/Auth/Login";

const App = () => {
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect to handle authentication-based redirect
   const [isAuthenticated, setisAuthenticated] = useState("")
  useEffect(() => {
    setisAuthenticated(localStorage.getItem("isLoggedIn"));
    if (isAuthenticated == "okay") {
      console.log("object",isAuthenticated)
      navigate("/dashboard"); // Redirect to dashboard if authenticated
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated == "okay" ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path="/about" element={<About />} />

      {/* Protected Routes */}
      {isAuthenticated == "okay" ? (
        <Route
          path="*"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 p-6">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/user-management" element={<UserManagement />} />
                  <Route
                    path="/expedition-management"
                    element={<ExpeditionManagement />}
                  />
                  <Route
                    path="/booking-management"
                    element={<BookingManagement />}
                  />
                  <Route path="/car-booking" element={<CarBooking />} />
                  <Route path="/account-setting" element={<AccountSetting />} />
                </Routes>
              </div>
            </div>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default App;
