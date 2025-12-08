import  { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    cuison: "Thai",
    description: "",
    price: "",
    category: "Salad",
    ingredients: [{ name: "", weight: "" }], // Initial ingredient field
    customerPreference: [{ name: "", weight: "" }],
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onIngredientChange = (event, index) => {
    const { name, value } = event.target;
    const newIngredients = [...data.ingredients];
    newIngredients[index][name] = value;
    setData((data) => ({ ...data, ingredients: newIngredients }));
  };
  const onPreferenceChange = (event, index) => {
    const { name, value } = event.target;
    const newPreferences = [...data.customerPreference];
    newPreferences[index][name] = value;
    setData((data) => ({ ...data, customerPreference: newPreferences }));
  };

  const addIngredientField = () => {
    setData((data) => ({
      ...data,
      ingredients: [...data.ingredients, { name: "", weight: "" }],
    }));
  };
  const addPreferenceField = () => {
    setData((data) => ({
      ...data,
      customerPreference: [...data.customerPreference, { name: "", weight: "" }],
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("cuison", data.cuison);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("ingredients", JSON.stringify(data.ingredients)); // Send all ingredients
    formData.append("customerPreference", JSON.stringify(data.customerPreference));

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        cuison: "Thai",
        description: "",
        price: "",
        category: "Salad",
        ingredients: [{ name: "", weight: "" }],
        customerPreference: [{ name: "", weight: "" }],
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
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="type here"
          />
        </div>
        <div className="add-category-cuison flex-col">
          <p>Product Cuisine</p>
          <select onChange={onChangeHandler} name="cuison">
            <option value="Thai">Thai</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Italian">Italian</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
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
              <option value="Deserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Beverages">Beverages</option>
              <option value="Rice">Rice</option>
              <option value="Pasta">Pasta</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="Rs.120"
            />
          </div>
        </div>

        <div className="add-ingredients flex-col">
          <p>Ingredients</p>
          {data.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-inputs flex-row">
            <div className="name">
                <input
                  type="text"
                  name="name"
                  value={ingredient.name}
                  onChange={(event) => onIngredientChange(event, index)}
                  placeholder="Ingredient name"
                />
            </div>
              <div className="value">
                <input
                  type="number"
                  name="weight"
                  value={ingredient.weight}
                  onChange={(event) => onIngredientChange(event, index)}
                  placeholder="Weight (g)"

                />
              </div>
             
            </div>
          ))}
          <button type="button" className="add-ing" onClick={addIngredientField}>
            Add More Ingredients
          </button>
        </div>
        
        {/* Customer Preference Section */}
        <div className="add-preferences flex-col">
          <p>Customer Preferences</p>
          {data.customerPreference.map((preference, index) => (
            <div key={index} className="preference-inputs flex-row">
            <div className="name">
                <input
                  type="text"
                  name="name"
                  value={preference.name}
                  onChange={(event) => onPreferenceChange(event, index)}
                  placeholder="Preference name"
                />
            </div>
             <div className="value">
                <input
                  type="number"
                  name="weight"
                  value={preference.weight}
                  onChange={(event) => onPreferenceChange(event, index)}
                  placeholder="Value"
                />
             </div>
             
            </div>
          ))}
          <button type="button" className="add-pref" onClick={addPreferenceField}>
            Add More Preferences
          </button>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
Add.propTypes = {
  url: PropTypes.string.isRequired,
};
