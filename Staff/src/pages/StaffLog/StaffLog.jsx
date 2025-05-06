import React, { useState } from "react";
import "./StaffLog.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StaffLog = ({ setShowLogin, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate();
  const onLogin = async (event) => {
    event.preventDefault();
    
      const url = "http://localhost:4000";
      const response = await axios.post(`${url}/api/staff/login`, { email, password });

      if (response.data.success) {
        console.log("success");
        toast.success(response.data.message);
        localStorage.setItem("staffToken", response.data.token);
         navigate("/orders");
        
        if (onSuccess) onSuccess(); // Notify the parent component of the successful login
      } else {
        setError(response.data.message); // Show error message if login fails
      }
    

  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.profile_image}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default StaffLog;
