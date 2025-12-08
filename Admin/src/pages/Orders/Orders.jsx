import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All"); // Filter state for selected tab

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Use adminToken for authentication
      console.log("admin token", token);
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        `${url}/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  // Filtered orders based on the selected tab
  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      {/* Tabs for filtering */}
      <div className="tabs">
        {["All", "New order", "Food processing", "Out for delivery", "Delivered", "Order is halted", "Order is closed"].map(
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
                    return `${item.name} X ${item.quantity}`;
                  } else {
                    return `${item.name} X ${item.quantity}, `;
                  }
                })}
                <p>preferences : {order.preferences}</p>
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.Street},</p>
                <p>{order.address.City},</p>
                <p>{order.address.Province}</p>
              </div>
              <p className="order-address-message">{order.address.Message}</p>
              <p className="order-item-phone">{order.address.phone}</p>
              <p className="order-item-phone">Gen number: {order.address.numb}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>RS: {order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
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
