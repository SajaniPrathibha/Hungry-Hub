import { useState } from "react";
import axios from "axios";
import UpdatePasswordPopup from "./UpdatePasswordPopup";
import PropTypes from "prop-types";

const AdminLoginPopup = ({ setShowLogin, onSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/admin/login", { email, password });
            if (response.data.success) {
                localStorage.setItem("adminToken", response.data.token);
                setShowLogin(false);
                onSuccess();
                setShowUpdatePassword(true);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-[#b5c8f4] bg-opacity-50 flex items-center justify-center z-[1000]">
            {showUpdatePassword ? (
                <UpdatePasswordPopup onClose={() => setShowUpdatePassword(false)} />
            ) : (
                <div className="bg-white p-10 sm:p-8 rounded-lg w-[90%] max-w-[320px] shadow-lg text-center">
                    <h2 className="text-2xl p-4! font-semibold mb-5 text-gray-800">Admin Login</h2>
                    <form onSubmit={handleLogin} className="flex flex-col p-10!">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                                className="w-full p-3 pl-2! mb-5!  border border-[#b5c8f4] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                                className="w-full p-3 pl-2! mb-5! border border-[#b5c8f4] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
                        <button
                            type="submit"
                                className="w-2/4 p-3 bg-[#438ddd] text-white rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-blue-700 block mx-auto!"
                        >
                            Login
                        </button>
                    </form>
                    <span
                        className="block mt-3 mb-5! text-sm text-blue-600 cursor-pointer underline hover:text-blue-700 transition-colors duration-300"
                        onClick={() => setShowUpdatePassword(true)}
                    >
                        Change Password
                    </span>
                </div>
            )}
        </div>
    );
};

AdminLoginPopup.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default AdminLoginPopup;