import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Staff.css'
import { toast } from "react-toastify";
// import { StoreContext } from "../../context/StoreContext";

const Staff = ({ url }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    numb: '',
    ID: '',
  });

  const handleRegister = async (e) => {
    try {
      handleChange(e);
      const response = await axios.post(`${url}/api/staff/register`, formData);
      if (response.data.success) {
        // alert("success")
        toast.success(response.data.message);
        setFormData({
        name: '',
        email: '',
        password: '',
        address: '',
        numb: '',
        ID: '',
      });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [staffList, setStaffList] = useState([]); // State to hold fetched staff data
  const [staffId, setStaffId] = useState("");

  // Fetch the staff list
  // const fetchStaffList = async () => {
  //   try {
  //     const response = await axios.get(`${url}/api/staff/lists`);
  //     if (response.data.success) {
  //       setStaffList(response.data.data);
  //       console.log("response", response);
        
  //     } else {
  //       toast.error("Failed to fetch staff data.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching staff data:", error);
  //     toast.error("Error fetching staff data.");
  //   }
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   try {
  //     const response = await axios.get(`${url}/api/staff/lists`);
  //     if (response.data.success) {
  //       console.log("response.data.data", response.data.data);
        
  //       setStaffList(response.data.data);
  //       if (response) {
  //         console.log("laste staff", response.data.data[response.data.data.length - 1].ID);
  //         let prevId = response.data.data[response.data.data.length - 1].ID;
  //         console.log("laste staff id number", prevId.split("N")[1]);
  //         let counter = parseInt(prevId.split("N")[1]) + 1;
  //         setStaffId(prevId.split("N")[0] + "N00" + counter);
  //       }

  //     } else {
  //       toast.error("Failed to fetch staff data.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching staff data:", error);
  //     toast.error("Error fetching staff data.");
  //   }
    
  // }, [])
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`${url}/api/staff/lists`);
        if (response.data.success) {
          console.log("response.data.data", response.data.data);

          setStaffList(response.data.data);
          if (response.data.data.length > 0) {
            const lastStaff = response.data.data[response.data.data.length - 1];
            console.log("last staff", lastStaff.ID);

            let prevId = lastStaff.ID;
            console.log("last staff id number", prevId.split("N")[1]);

            let counter = parseInt(prevId.split("N")[1]) + 1;
            const newStaffId = prevId.split("N")[0] + "N00" + counter;
            setStaffId(newStaffId);

            setFormData((prevData) => ({ ...prevData, ID: newStaffId }));
          }
        } else {
          toast.error("Failed to fetch staff data.");
        }
      } catch (error) {
        console.error("Error fetching staff data:", error);
        toast.error("Error fetching staff data.");
      }
    };

    fetchStaffData();
  }, []);

  

  return (
    <div className="register-container">
      <h1>Register Staff</h1>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <input name="numb" value={formData.numb} onChange={handleChange} placeholder="Number" />
      <input name="ID" value={staffId} placeholder={staffId} disabled />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Staff;
