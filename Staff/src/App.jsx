import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, Navigate  } from "react-router-dom";
import List from "./pages/List/List";
import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";

import ProtectedRoute from "./components/ProtectedRoute"
import Customers from "./pages/Customers/Customers";
import HomeAdv from "./pages/HomeAdv/HomeAdv";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdvList from "./pages/AdvList/AdvList";
import StaffLog from "./pages/StaffLog/StaffLog";

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          
          <Route path="*" element={<Navigate to="/staffLog" />} />
          <Route path="/customers" element={<Customers url={url} />} />
          <Route path="/homeAdv" element={<HomeAdv url={url} />} />
          <Route path="/advList" element={<AdvList url={url} />} />
          <Route path="/staffLog" element={<StaffLog url={url} />} />
          <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </div>
  );
};

export default App;
