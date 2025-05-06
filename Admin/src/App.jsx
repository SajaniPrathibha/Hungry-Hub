import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import List from "./pages/List/List";
import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";
import Staff from "./pages/Staff/Staff";
import Forecast from "./pages/Forecast/Forecast";
import Customers from "./pages/Customers/Customers";
import HomeAdv from "./pages/HomeAdv/HomeAdv";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdvList from "./pages/AdvList/AdvList";
import StaffList from "./pages/StaffList/StaffList";
import AdminLoginPopup from "./pages/AdminLog/AdminLoginPopup";
import LogoutPopup from "./pages/AdminLog/LogoutPopup"; // Import the LogoutPopup component

const App = () => {
  const url = "http://localhost:4000";
  const [showAdminLogin, setShowAdminLogin] = useState(true);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");  // Debugging log
    localStorage.removeItem("adminToken");
    setShowAdminLogin(true);  // Reset login state
    window.location.href = "/admin/login";  // Ensure redirection works
  };

  return (
    <div>
      <ToastContainer />
      <Navbar onLogout={() => setShowLogoutPopup(true)} /> {/* Pass logout function to Navbar */}
      <hr />

      {showAdminLogin ? (
        <AdminLoginPopup setShowLogin={setShowAdminLogin} onSuccess={() => setShowAdminLogin(false)} />
      ) : (
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/staff" element={<Staff url={url} />} />
            <Route path="/forecast" element={<Forecast url={url} />} />
            <Route path="/customers" element={<Customers url={url} />} />
            <Route path="/homeAdv" element={<HomeAdv url={url} />} />
            <Route path="/advList" element={<AdvList url={url} />} />
            <Route path="/staffList" element={<StaffList url={url} />} />
            <Route path="/prediction" element={<Forecast url={url} />} />
            
          </Routes>
        </div>
      )}

      {/* Conditionally render the LogoutPopup */}
      {showLogoutPopup && (
        <div className="logout-popup show">
          <LogoutPopup
            onConfirm={() => {
              handleLogout();
              setShowLogoutPopup(false);
            }}
            onCancel={() => setShowLogoutPopup(false)}
          />
        </div>
      )}

    </div>
  );
};

export default App;
