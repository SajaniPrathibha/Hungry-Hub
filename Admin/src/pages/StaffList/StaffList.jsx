import React, { useEffect, useState } from "react";
import "./StaffList.css";
import axios from "axios";
import { toast } from "react-toastify";
import ReactModal from "react-modal";

const StaffList = ({ url }) => {
  const [list, setList] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({});

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/staff/lists`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeStaff = async (staffId) => {
    const response = await axios.post(`${url}/api/staff/remove`, { id: staffId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const openEditModal = (staff) => {
    setCurrentStaff({ ...staff, id: staff._id }); // Ensure 'id' is included
    setEditModal(true);
  };

  const updateStaff = async () => {
    const response = await axios.post(`${url}/api/staff/update`, currentStaff);
    if (response.data.success) {
      toast.success(response.data.message);
      setEditModal(false);
      fetchList();
    } else {
      toast.error("Error updating staff");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="adv-add flex-col">
      <h4>Staff List</h4>
      <div className="list-table">
        <div className="adv-table-format title">
          <b>Name</b>
          <b>E-mail</b>
          <b>Address</b>
          <b>Telephone</b>
          <b>Id</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="adv-table-format">
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.address}</p>
              <p>{item.numb}</p>
              <p>{item.ID}</p>
              {/* <button onClick={() => openEditModal(item)} className="edits">Edit</button>
              <button onClick={() => removeStaff(item._id)} className="cursor">
                X
              </button> */}
              <p onClick={() => openEditModal(item)} className="edits">
                Edit
              </p>
              <p onClick={() => removeStaff(item._id)} className="cursor">
                X
              </p>
              
            </div>
          );
        })}
      </div>

      <ReactModal isOpen={editModal} onRequestClose={() => setEditModal(false)}>
        <h4>Edit Staff</h4>
        <div className="edit-form">
          <label>Name</label>
          <input
            type="text"
            value={currentStaff.name}
            onChange={(e) => setCurrentStaff({ ...currentStaff, name: e.target.value })}
          />
          <label>Email</label>
          <input
            type="email"
            value={currentStaff.email}
            onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
          />
          <label>Address</label>
          <input
            type="text"
            value={currentStaff.address}
            onChange={(e) => setCurrentStaff({ ...currentStaff, address: e.target.value })}
          />
          <label>Telephone</label>
          <input
            type="number"
            value={currentStaff.numb}
            onChange={(e) => setCurrentStaff({ ...currentStaff, numb: e.target.value })}
          />
          <label>ID</label>
          <input
            type="text"
            value={currentStaff.ID}
            onChange={(e) => setCurrentStaff({ ...currentStaff, ID: e.target.value })}
          />
          <button onClick={updateStaff}>Save</button>
          <button onClick={() => setEditModal(false)}>Cancel</button>
        </div>
      </ReactModal>
    </div>
  );
};

export default StaffList;
