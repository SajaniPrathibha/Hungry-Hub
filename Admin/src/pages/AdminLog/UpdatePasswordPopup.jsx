import React, { useState } from "react";
import axios from "axios";
import "./UpdatePasswordPopup.css";
import { toast } from "react-toastify";

const UpdatePasswordPopup = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        try {
            const response = await axios.put(
                "http://localhost:4000/api/admin/update-password-direct",
                { email: "admin@example.com", currentPassword, newPassword } // Replace with the admin's email
            );

            if (response.data.success) {
                toast.success("Password updated successfully.");
                setTimeout(() => onClose(), 1000); // Close the popup after success
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to update password. Please try again.");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordUpdate}>
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Update Password</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default UpdatePasswordPopup;
