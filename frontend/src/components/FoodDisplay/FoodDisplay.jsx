import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodIteam from "../FoodIteam/FoodIteam";
import AdvertisementItem from "../advDisplay/AdvertisementItem";
import axios from "axios";
// import { toast } from "react-toastify";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [advertisements, setAdvertisements] = useState([]);

   useEffect(() => {
    // Fetch advertisement data from the backend
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/adv/list"); 
        if (response.data.success) {
          setAdvertisements(response.data.data);
        } else {
          console.error("Failed to fetch advertisements");
        }
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, []);
  return (
    <div className="food-display" id="food-display">
      <h2></h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodIteam
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
      <br /><hr />
      <br />
       <h2>offers and promotions</h2>
      <div className="advertisement-list">
        {advertisements.map((ad, index) => (
          <AdvertisementItem
            key={index}
            id={ad._id}
            description={ad.description}
            image={ad.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
