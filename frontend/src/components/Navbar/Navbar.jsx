import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Profile from "./Profile"; // Import Profile component for the popup

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showProfile, setShowProfile] = useState(false); // State to control profile popup visibility
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const toggleProfilePopup = () => {
    setShowProfile(!showProfile); // Toggle the profile popup
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#offers"
          onClick={() => setMenu("offers")}
          className={menu === "offers" ? "active" : ""}
        >
          Offers
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("about-us")}
          className={menu === "about-us" ? "active" : ""}
        >
          About Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
              <li onClick={toggleProfilePopup}> {/* On click, show the profile popup */}
                <img src={assets.profile_icon} alt="" />
                <p>Profile</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {showProfile && <Profile closePopup={toggleProfilePopup} />} {/* Render Profile component if showProfile is true */}
    </div>
  );
};

export default Navbar;
