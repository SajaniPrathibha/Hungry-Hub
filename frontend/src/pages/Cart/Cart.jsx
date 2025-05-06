import React, {useContext, useEffect, useState} from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import OrderModal from "./OrderModal"; // Adjust the path as needed
//import useCalorieData from './CalorieParser'; // Import the custom hook

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, addToCart, setTotalCalories } =
    useContext(StoreContext);


  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [selectedItem, setSelectedItem] = useState(null); // State to track selected item for modal
  const [calorieData, setCalorieData] = useState({});
  const [totalCaloriesList, setTotalCaloriesList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setTotalCalories(totalCaloriesList)
  }, [setTotalCaloriesList]);
  
  // const navigate = useNavigate();

  const handleEditClick = async (item) => {
    setSelectedItem(item);
    setCalorieData({});

    try {
      const response = await fetch(`http://localhost:4000/api/calories/${item._id}`); 
      const calorieData = await response.json();

      if (calorieData.success) {
        setCalorieData(calorieData.data.calorieData);  // Access the calorieData correctly from response
      }
      const preferenceResponse = await fetch(`http://localhost:4000/api/preferences/${item._id}`);  
      const preferenceData = await preferenceResponse.json();
      console.log('preferences', preferenceData)
      if (preferenceData.success) {
        // You may want to set the customerPreference data in a separate state
        setSelectedItem((prevItem) => ({
          ...prevItem,
          customerPreference: preferenceData.data.customerPreference || [],
          calorieDatas: preferenceData.data.calorieDatas || {},
        }));
      }
    } catch (error) {
      console.error('Error fetching calorie data', error);
    }
    
    setShowModal(true);

  };

  const proceed = () =>{
    setTotalCalories(totalCaloriesList)
    console.log("totalCaloriesList >>>" , totalCaloriesList)
    navigate("/order");
  }



  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price (RS)</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          <p>Add</p>
          <p>Order Info</p>
        </div>
        <br />
        <hr />
        
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
           
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                  <p onClick={() => addToCart(item._id)} className="cross">+</p>
                  <p onClick={() => handleEditClick(item)} className="cross">Add Preferences</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee(around galle city)</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 200}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}</p>
            </div>
          </div>
          <button onClick={() => proceed()}>PROCEED TO CHECKOUT</button>
        </div>
      </div>

      {/* Modal for order information */}
      {showModal && selectedItem && (
        <OrderModal
          ingredients={selectedItem.ingredients} // Correctly pass the full ingredients array
          calorieData={calorieData}  // Pass the fetched calorie data
          customerPreference={selectedItem.customerPreference || []}
          calorieDatas={selectedItem.calorieDatas || {}}
          setTotalCaloriesList={setTotalCaloriesList}

          onClose={() => setShowModal(false)} // Close the modal
        />
      )}
    </div>
  );
};

export default Cart;
