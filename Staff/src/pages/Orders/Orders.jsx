import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [staffName, setStaffName] = useState("");
  const [filter, setFilter] = useState("All"); // State to track the selected filter

  // Fetch all orders from the server
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders.");
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    const status = event.target.value;

    try {
      const token = localStorage.getItem("staffToken");
      const response = await axios.post(
        url + "/api/order/status",
        { orderId, status },
        { headers: { token } }
      );

      if (response.data.success) {
        const updatedOrder = response.data.data;
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
        toast.success("Order status updated successfully.");
      } else {
        toast.error("Error updating order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status.");
    }
  };

  // Fetch the staff's name from localStorage
  useEffect(() => {
    const token = localStorage.getItem("staffToken");
    if (token) {
      const { name } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      setStaffName(name);
    }
    fetchAllOrders();
  }, []);

  // Filter orders based on the selected tab
  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      {/* Tabs for filtering */}
      <div className="tabs">
        {["All", "Food processing", "Out for delivery", "Delivered", "Order is halted", "Order is closed"].map(
          (status) => (
            <button
              key={status}
              className={`tab ${filter === status ? "active" : ""}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Order list */}
      <div className="order-list">
        {filteredOrders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
                <p>preferences : {order.preferences}</p>
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.Street + ","}</p>
                <p>{order.address.City + ","}</p>
                <p>{order.address.Province}</p>
              </div>
              <p className="order-address-message">{order.address.Message}</p>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>RS: {order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="New order">New order</option>
              <option value="Food processing">Food processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Order is halted">Order is halted</option>
              <option value="Order is closed">Order is closed</option>
            </select>
            {order.status === "Order is closed" && order.orderClosed && (
              <p className="closed-by">
                Closed by: {order.orderClosed.closedBy.name} at{" "}
                {new Date(order.orderClosed.closedAt).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
