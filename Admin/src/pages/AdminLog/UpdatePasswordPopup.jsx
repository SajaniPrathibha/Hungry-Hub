import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdatePasswordPopup = ({ onClose, adminEmail }) => {
    const [email, setEmail] = useState(adminEmail || "");
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
                { email, currentPassword, newPassword }
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
        <div className="fixed inset-0 bg-[#b5c8f4] bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-white p-10 sm:p-8 rounded-lg w-[90%] max-w-[320px] shadow-lg text-center">
                <h2 className="text-2xl p-4! font-semibold mb-5 text-gray-800">Change Password</h2>
                <form onSubmit={handlePasswordUpdate} className="flex flex-col p-10!">
                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 pl-2! mb-5! border border-[#b5c8f4] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full p-3 pl-2! mb-5! border border-[#b5c8f4] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full p-3 pl-2! mb-5! border border-[#b5c8f4] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full p-3 pl-2! mb-5! border border-[#b5c8f4] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-2/4 p-3 bg-[#438ddd] text-white rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-blue-700 block mx-auto!"
                    >
                        Update Password
                    </button>
                </form>
                <span
                    className="block mt-3 mb-5! text-sm text-blue-600 cursor-pointer underline hover:text-blue-700 transition-colors duration-300"
                    onClick={onClose}
                >
                    Close
                </span>
            </div>
        </div>
    );
};

export default UpdatePasswordPopup;