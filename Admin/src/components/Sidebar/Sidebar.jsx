import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders </p>
        </NavLink>
        <NavLink to="/staff" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Staff </p>
        </NavLink>
        <NavLink to="/StaffList" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Staff List </p>
        </NavLink>
        <NavLink to="/prediction" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Item prediction </p>
        </NavLink>
        <NavLink to="/customers" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Customers </p>
        </NavLink>
        <NavLink to="/homeAdv" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Home advertising </p>
        </NavLink>
        <NavLink to="/advList" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Adverticing list </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
