import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="logo">
            <img src={assets.logo} alt="" />
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
            sed voluptates explicabo modi, corporis praesentium incidunt odit
            dolore consequatur ut, ipsa asperiores aperiam nam officiis
            perferendis rem quia molestias magnam.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivary</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>085 5562 598</li>
            <li>HungyHub@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copppywright">Copyright 2024 All right recived.</p>
    </div>
  );
};

export default Footer;
