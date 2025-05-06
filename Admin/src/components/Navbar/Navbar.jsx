import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "../../pages/AdminLog/LogoutPopup"; // Adjust the path as necessary
import AdminLog from "../../pages/AdminLog/AdminLoginPopup"; // Adjust the path as necessary

const Navbar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear the admin token
    setShowAdminLogin(true); // Show admin login popup
    setShowLogoutPopup(false); // Close logout confirmation popup
  };

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />

      {/* Profile Image */}
      <img
        className="profile"
        src={assets.profile_image}
        alt="Profile"
        onClick={() => setShowLogoutPopup(true)} // Show popup on click
      />

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <LogoutPopup
          onConfirm={handleLogout} // Show login popup on confirmation
          onCancel={() => setShowLogoutPopup(false)} // Close popup on cancel
        />
      )}

      {/* Admin Login Popup */}
      {showAdminLogin && <AdminLog setShowAdminLogin={setShowAdminLogin} />} {/* Close login popup on successful login */}
    </div>
  );
};

export default Navbar;
