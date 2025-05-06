import React, { useState } from "react";
import "./HomeAdv.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const HomeAdv = ({ url }) => {
  // const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
   
    description: "",
    requiredPoints: 0,
    category: "Salad",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append("description", data.description);
    formData.append("requiredPoints", data.requiredPoints);
     formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/adv/add`, formData);
    if (response.data.success) {
      setData({
        
        description: "",
        requiredPoints: 0,
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
      
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              
              <option value="Deserts">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Beverages">Beverages</option>
              <option value="Rice">Rice</option>
              <option value="Pasta">Pasta</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* <div className="add-loyalty-points flex-col">
            <p>Loyalty Points Required</p>
            <input
              type="number"
              name="requiredPoints"
              value={data.requiredPoints}
              onChange={onChangeHandler}
              placeholder="Enter points"
              min="0"
              required
            />
          </div> */}
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default HomeAdv;
