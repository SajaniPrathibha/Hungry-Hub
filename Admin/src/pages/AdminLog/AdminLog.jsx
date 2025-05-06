// src/pages/AdminLog/AdminLog.jsx
import React, { useState } from "react";
import axios from "axios";
// import "./AdminLog.css";  // Optional: Add your custom styles

const AdminLog = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/admin/login", { email, password });
            if (response.data.success) {
                localStorage.setItem("adminToken", response.data.token);
                // Navigate to another page, for example, the dashboard, after successful login
                window.location.href = "/admin-dashboard";  // Redirect after successful login
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLog;
