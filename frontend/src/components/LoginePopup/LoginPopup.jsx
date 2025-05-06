import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import ChangePasswordPopup from "../LoginePopup/ChangePasswordPopup ";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    number: "",
  });
  const [showChangePassword, setShowChangePassword] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      {showChangePassword ? (
        <ChangePasswordPopup setShowChangePassword={setShowChangePassword} />
      ) : (
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-popup-inputs">
            {currentState === "Sign Up" && (
              <>
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder="Your name"
                  required
                />
                <input
                  name="address"
                  onChange={onChangeHandler}
                  value={data.address}
                  type="text"
                  placeholder="address (ex: No 00/1 XXX Road,)"
                  required
                />
                <input
                  name="number"
                  onChange={onChangeHandler}
                  value={data.number}
                  type="number"
                  placeholder="mobile number"
                  required
                />
              </>
            )}
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="text"
              placeholder="Your email"
              required
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Your password"
              required
            />
          </div>
          <button type="submit">
            {currentState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
          {currentState === "Login" ? (
            <>
              <p>
                Forgot your password?{" "}
                <span onClick={() => setShowChangePassword(true)}>
                  Change it here
                </span>
              </p>
              <p>
                Create a new account?{" "}
                <span onClick={() => setCurrState("Sign Up")}>Click here</span>
              </p>
            </>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginPopup;
