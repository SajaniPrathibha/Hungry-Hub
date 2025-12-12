import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Customers = ({ url }) => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const response = await axios.get(url + "/api/user/lists");
    if (response.data.success) {
      setUsers(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeUser = async (userId) => {
    const response = await axios.post(`${url}/api/user/remove`, { id: userId });
    await fetchAllUsers();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-6 w-[80%] max-[600px]:p-4 mt-12! ml-12!">
      <h4 className="mb-6 text-[#6d6d6d] font-normal text-lg max-[600px]:mb-4">
        All Customers list
      </h4>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Header */}
          <div className="grid grid-cols-[1fr_2fr_1fr_1fr] items-center gap-4 lg:gap-[100px] p-[12px_15px] border border-[#cacaca] text-[13px] bg-[#f9f9f9] text-[#6d6d6d] font-semibold">
            <b>Name</b>
            <b>E-mail</b>
            <b>Points</b>
            <b>Action</b>
          </div>

          {/* Data rows */}
          {users.map((user, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr_1fr_1fr] items-center gap-4 lg:gap-[100px] p-[12px_15px] border border-[#cacaca] border-t-0 text-[13px] hover:bg-gray-50"
              >
                <p className="truncate">{user.name}</p>
                <p className="truncate">{user.email}</p>
                <p>{user.points}</p>
                <p
                  onClick={() => removeUser(user._id)}
                  className="cursor-pointer flex justify-center items-center h-full text-[#6d6d6d] hover:text-red-800 text-lg"
                >
                  X
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Customers.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Customers;