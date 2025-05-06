import React, {useContext, useEffect, useState} from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, selectedPreferences, url, totalCalories} = useContext(StoreContext);

  const [userProfile, setUserProfile] = useState(null);

  console.log("oooookaay ---->>>>>>",totalCalories[0])
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    Street:"",
    City:"Galle",
    Province:"",
    phone:"",
    Message:"",
    numb:"",
  })
   useEffect(() => {
    // Generate a random number between 100 and 999999
    const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Set the auto-generated number in the state
    setData((prevData) => ({
      ...prevData,
      numb: generateRandomNumber(100, 999999).toString()
    }));

     console.log("selectedPreferences", selectedPreferences);
    
  }, []); // Empty dependency array ensures this runs only once

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))

  }
  const placeOrder = async (event) =>{
    console.log("placeOrder endpoint hit");
    event.preventDefault();

    // Prepare only selected preferences for order data
    const filteredPreferences = Object.keys(selectedPreferences).filter(
      (key) => selectedPreferences[key]
    );

    console.log('Filtered Preferences:', filteredPreferences);
    console.log("calories list", totalCalories);

    let orderItems = [];
    let count = 0;
    food_list.forEach((item, index) => {
      console.log("counter   ????", cartItems[item._id]);
      if (cartItems[item._id] > 0) {
        console.log("check index", index)
        console.log("check count", count)
        let itemInfo = {
          ...item,
          _id: item._id, // ID of the food item
          name: item.name,
          quantity: cartItems[item._id],
          calories: totalCalories[count] || 0,
        };
        console.log(`Item: ${item.name}, Calories: ${totalCalories[index-15]}`);
        
        orderItems.push(itemInfo);
        count++;
      }
    });
    console.log('orderItems >>>>>>', orderItems);
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+200,
      Message:data,
      numb: data.numb,
      preferences: filteredPreferences,
      // totalCalories: totalCalories,
           
    }
    console.log("orderData", orderData);

    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const{session_url} = response.data;
      window.location.replace(session_url)
      console.log("save response", response)
    }
    else{

      alert("first logging to the system")
    }
  }
  const navigate = useNavigate()
  
 
  useEffect(()=>{
    if (getTotalCartAmount()===0) {
      navigate('/cart')
    }
  },[token])
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("userToken", token);
        
        const response = await axios.get(url + '/api/user/profile', {
          headers: { token }
        });

        if (response.data.success) {
          setUserProfile(response.data.data); // Store user data in state
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAutoFill = () => {
    if (userProfile) {
      const nameParts = userProfile.name.split(' '); // Split name to extract first and last
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' '); // Join the remaining name parts

      // Autofill the fields with the user data
      setData({
        ...data,
        firstName,
        lastName,
        email: userProfile.email,
        Street: userProfile.address,
        phone: userProfile.number,
      });
    }
  };



  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivary Information</p>
        <button type="button" onClick={handleAutoFill}>Auto-fill User Details</button>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="Street" onChange={onChangeHandler} value={data.Street} type="text" placeholder="Address" />
        <div className="multi-fields">
          <input required name="Province" onChange={onChangeHandler} value={data.Province} type="hidden" placeholder="NO XX/XXX" />
          <input required name="City" onChange={onChangeHandler} value={"Galle"} type="text" readOnly />
          
        </div>
        {/* <div className="multi-fields">
          <input type="text" placeholder="Date" />
          <input type="text" placeholder="Time" />
        </div> */}
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Mobile Number" />
        <input required name="Message" onChange={onChangeHandler} value={data.Message} type="text" placeholder="Message" />
        <input required name="numb" onChange={onChangeHandler} value={data.numb} type="text" placeholder="numb" disabled/>
        <p>The number that generated for your order</p>
      </div>
      
      
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivary Fee(around Galle city)</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 200}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}
              </p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
