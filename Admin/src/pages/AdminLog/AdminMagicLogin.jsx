import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const AdminMagicLogin = () => {
    const [params] = useSearchParams();
    const token = params.get("token");

    useEffect(() => {
        if (!token) return;

        axios
            .post("http://localhost:4000/api/admin/magic-login", { token })
            .then((res) => {
                localStorage.setItem("adminToken", res.data.token);
                window.location.href = "/orders";
            })
            .catch(() => {
                alert("Login link expired");
            });
    }, [token]);

    return <p>Logging you in...</p>;
};

export default AdminMagicLogin;
