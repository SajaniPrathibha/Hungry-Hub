import React from "react";
import "./Customers.css";
import { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useEffect } from "react";

const Customers = ({url}) => {
const [users,setUsers] = useState([])

const fetchAllUsers = async()=>{
  const response = await axios.get(url+"/api/user/lists")
  if (response.data.success) {
    setUsers(response.data.data)
    console.log(response.data.data);
    
  }else{
    toast.error("Error")
  }
}
const removeUser = async (userId) => {
    // console.log(foodId);
    const response = await axios.post(`${url}/api/user/remove`, { id: userId });
    await fetchAllUsers();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("error");
    }
  };
useEffect(()=>{
  fetchAllUsers();
},[])

  return(
    <div className="user-list flex-col">
     <h4>All Customers list</h4>
      <div className="user-table">   
        <div className="user-table-format title">
            <b>Name</b>
            <b>E-mail</b>
            <b>Points</b>
            <b>Action</b>
        </div>  
         {users.map((user,index)=>{
           return (
            <div key={index} className="user-table-format">
              
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>0</p>
              <p onClick={() => removeUser(user._id)} className="curser">
                X
              </p>
            </div>
          );
         }
         
         )}  
      </div>


    </div>
  )
   
};

export default Customers;
