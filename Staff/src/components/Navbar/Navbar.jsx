import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import LoginPopup from "../../pages/StaffLog/StaffLog"; // Adjust the import path as necessary

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("staffToken"); // Make sure this matches the token set during login

    // Redirect to login page
    navigate("/staffLog");
  };
  const handleSuccess = () => {
    setShowLogin(false); // Close the login popup on success
  };
  

  return (
    <>
      <div className={`navbar ${showLogin ? "hidden" : ""}`}>
        <img className="logo" src={assets.logo} alt="Company Logo" />
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {showLogin && <LoginPopup setShowLogin={setShowLogin}
      onSuccess={handleSuccess} />}
    </>
  );
};

export default Navbar;
