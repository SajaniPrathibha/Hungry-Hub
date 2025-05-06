import React, { useState, useContext } from "react";
import axios from "axios";
import "./ChangePasswordPopup.css";
import { StoreContext } from "../../context/StoreContext";

const ChangePasswordPopup = ({ setShowChangePassword }) => {

    const { url } = useContext(StoreContext);
    const [data, setData] = useState({ email: "", number: "", newPassword: "" });
    const [message, setMessage] = useState("");

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(url+"/api/user/change-password", data);
            if (response.data.success) {
                setMessage("Password changed successfully!");
            } else {
                setMessage(response.data.message || "Failed to change password");
            }
        } catch (error) {
            setMessage("Error occurred while changing password");
        }
    };

    return (
        <div className="change-password-popup">
            <form onSubmit={onSubmitHandler} className="change-password-container">
                <div className="change-password-title">
                    <h2>Change Password</h2>
                    <button onClick={() => setShowChangePassword(false)}>Close</button>
                </div>
                <div className="change-password-inputs">
                    <input
                        name="email"
                        type="email"
                        placeholder="Your email"
                        onChange={onChangeHandler}
                        value={data.email}
                        required
                    />
                    <input
                        name="number"
                        type="text"
                        placeholder="Your phone number"
                        onChange={onChangeHandler}
                        value={data.number}
                        required
                    />
                    <input
                        name="newPassword"
                        type="password"
                        placeholder="New password"
                        onChange={onChangeHandler}
                        value={data.newPassword}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default ChangePasswordPopup;
