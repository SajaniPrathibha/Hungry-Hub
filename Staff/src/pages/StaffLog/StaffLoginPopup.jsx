// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./StaffLoginPopup.css"; // Styling file
// import { useNavigate } from "react-router-dom";

// const StaffLoginPopup = ({ setShowLogin, onSuccess }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

 
//     useEffect(() => {
//       document.body.classList.add("popup-active");
//       return () => {
//         document.body.classList.remove("popup-active");
//       };
//     }, []);
//   const onLogin = async (event) => {
//     event.preventDefault();
//     const url = "http://localhost:4000";
//     setError(""); // Clear existing error messages
//     setLoading(true); // Show loading state

//     try {
//       const response = await axios.post(`${url}/api/staff/login`, { email, password });

//       if (response.data.success) {
//         toast.success(response.data.message); // Show success message
//         localStorage.setItem("staffToken", response.data.token); // Save token
//         localStorage.setItem("staffName", response.data.name); // Save staff name
//         navigate("/orders"); // Redirect to orders page
//         if (onSuccess) onSuccess(); // Trigger onSuccess callback
//         setShowLogin(false); // Close popup
//       } else {
//         setError(response.data.message); // Set error message
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };


//   return (
//     <div className="login-popup">
//       <div className="login-popup-container">
//         <h2>Staff Login</h2>
//         <form onSubmit={onLogin}>
        
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//             autoComplete="username"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//             autoComplete="current-password"
//           />
//           {error && <p className="error-message">{error}</p>}
//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <button className="close-popup-btn" onClick={() => setShowLogin(false)}>
//           Cancel
//         </button>
//         <button onClick={() => setShowLogin(false)}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default StaffLoginPopup;
