import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminResetPassword = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get("token");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:4000/api/admin/reset-password",
                {
                    token,
                    newPassword: password,
                }
            );

            // ✅ AUTO LOGIN
            localStorage.setItem("adminToken", res.data.token);

            toast.success("Password reset successful");

            // redirect to dashboard
            navigate("/orders"); // or /list, /home etc

        } catch {
            toast.error("Invalid or expired link");
        }
    };

    return (
        <form onSubmit={handleReset}>
            <input
                type="password"
                placeholder="New Password"
                onChange={e => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                onChange={e => setConfirm(e.target.value)}
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default AdminResetPassword;
