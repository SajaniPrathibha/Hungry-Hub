import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

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

  // Group orders by date
  const groupOrdersByDate = (orders) => {
    const groups = {};

    orders.forEach((order) => {
      const date = new Date(order.date).toLocaleDateString(); // e.g. "1/20/2025"

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(order);
    });

    return groups;
  };
  const groupedOrders = groupOrdersByDate(filteredOrders);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6 pl-14! mt-12!">
      <h3 className="text-2xl font-bold mb-6">Order Page</h3>

      {/* Tabs for filtering */}
      <div className="flex gap-3.5 mb-8! mt-4! flex-wrap">
        {["All", "New order", "Food processing", "Out for delivery", "Delivered", "Order is halted", "Order is closed"].map(
          (status) => (
            <button
              key={status}
              className={`py-2.5! px-4! border border-[#ccc] rounded-[4px] cursor-pointer ${filter === status
                  ? "bg-[#007bff] text-white font-bold border-[#007bff]"
                  : "bg-[#f9f9f9]"
                }`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Order list */}
      <div className="">
        {Object.keys(groupedOrders).map((date) => (
          <div key={date}>
            <h2 className="text-xl justify-center font-semibold my-4!">{date}</h2>

            {groupedOrders[date].map((order, index) => (
              <div
                key={index}
                className="grid mt-6! grid-cols-[0.5fr_2fr_1fr_1fr_1fr] max-[1000px]:grid-cols-1 items-start gap-[30px] max-[1000px]:gap-4 border border-[#798DC5] p-5 max-[1000px]:p-[15px_8px] my-[30px] text-sm max-[1000px]:text-xs text-[#505050]"
              >
                <img src={assets.parcel_icon} alt="" className="max-[1000px]:w-10" />
                <div>
                  <p className="font-semibold">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return `${item.name} X ${item.quantity}`;
                      } else {
                        return `${item.name} X ${item.quantity}, `;
                      }
                    })}
                  </p>
                  <p className="mt-2">preferences : {order.preferences}</p>
                  <p className="font-semibold mt-[30px] mb-[5px]">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="mb-2.5">
                    <p>{order.address.Street},</p>
                    <p>{order.address.City},</p>
                    <p>{order.address.Province}</p>
                  </div>
                  <p className="mb-2">{order.address.Message}</p>
                  <p>{order.address.phone}</p>
                  <p>Gen number: {order.address.numb}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>RS: {order.amount}</p>
                <div>
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className="bg-[#b5c8f4] border border-[#798DC5] w-[max(10vw,120px)] p-2.5 max-[1000px]:p-[5px] outline-none max-[1000px]:text-xs"
                  >
                    <option value="New order">New order</option>
                    <option value="Food processing">Food processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Order is halted">Order is halted</option>
                    <option value="Order is closed">Order is closed</option>
                  </select>
                  {order.status === "Order is closed" && order.orderClosed && (
                    <p className="mt-2 text-xs">
                      Closed by: {order.orderClosed.closedBy.name} at{" "}
                      {new Date(order.orderClosed.closedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Orders.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Orders;