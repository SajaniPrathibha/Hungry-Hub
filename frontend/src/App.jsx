import  { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginePopup/LoginPopup";
import Verify from "./Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import CalBurn from "./pages/CalBurn/CalBurn";
// import Profile from "./components/Navbar/Profile";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>
          <Route path="/calburner" element={<CalBurn/>} />
          {/* <Route path="/profile" element={<Profile/>} /> */}

        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
