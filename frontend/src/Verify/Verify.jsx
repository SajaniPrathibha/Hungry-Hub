import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/verify`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        await addPointToUser();
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
    }
  };

  const addPointToUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }

      const response = await axios.post(
        `${url}/api/user/add-point`,
        { points: 1 }, // Request body
        {
          headers: {
            token: token, // Add token to headers
          },
        }
      );

      if (response.data.success) {
        console.log("Points added successfully:", response.data.points);
      } else {
        console.error("Error adding point:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding point:", error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
