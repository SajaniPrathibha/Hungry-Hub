import React, { useState } from "react";
import axios from "axios";
import "./AdminLoginPopup.css"; // Add your CSS file for styling
import UpdatePasswordPopup from "./UpdatePasswordPopup"; // Import the update password popup

const AdminLoginPopup = ({ setShowLogin, onSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showUpdatePassword, setShowUpdatePassword] = useState(false); // State to toggle password update

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/admin/login", { email, password });
            if (response.data.success) {
                localStorage.setItem("adminToken", response.data.token);
                setShowLogin(false);  // Close login popup
                onSuccess();  // Trigger successful login handling
                setShowUpdatePassword(true);  // Toggle to show update password popup
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="login-popup">
            {showUpdatePassword ? (
                <UpdatePasswordPopup onClose={() => setShowUpdatePassword(false)} />
            ) : (
                <div className="login-popup-container">
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
                        <span
                            className="change-password-text"
                            onClick={() => setShowUpdatePassword(true)}
                        >
                            Change Password
                        </span>
                </div>
            )}
        </div>
    );
};

export default AdminLoginPopup;
