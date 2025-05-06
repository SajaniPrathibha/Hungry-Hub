import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    cuison: "",
    ingredients: [],
    customerPreference: [],
  });

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error removing food item");
    }
  };

  const openEditModal = (food) => {
    setIsEditing(true);
    setEditData({
      id: food._id,
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      cuison: food.cuison,
      ingredients: food.ingredients || [],
      customerPreference: food.customerPreference || [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...editData.ingredients];
    updatedIngredients[index][field] = value;
    setEditData({ ...editData, ingredients: updatedIngredients });
  };

  const handleCustomerPreferenceChange = (index, field, value) => {
    const updatedPreferences = [...editData.customerPreference];
    updatedPreferences[index][field] = value;
    setEditData({ ...editData, customerPreference: updatedPreferences });
  };

  const updateFood = async () => {
    const response = await axios.post(`${url}/api/food/update`, editData);
    if (response.data.success) {
      toast.success(response.data.message);
      setIsEditing(false);
      fetchList();
    } else {
      toast.error("Error updating food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All food list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Cuisine</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.cuison}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => openEditModal(item)} className="edit">
              Edit
            </p>
            <p onClick={() => removeFood(item._id)} className="cursors">
              X
            </p>
            {/* <button onClick={() => openEditModal(item)} className="edit">Edit</button>
              <button onClick={() => removeFood(item._id)} className="cursors">
                X
              </button> */}


          </div>
        ))}
      </div>

      {/* Popup Modal for Editing */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Food Item</h3>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="description"
              value={editData.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={handleInputChange}
              placeholder="Price"
            />

            {/* Cuisine Select */}
            <select
              name="cuison"
              value={editData.cuison}
              onChange={handleInputChange}
            >
              <option value="">Select Cuisine</option>
              <option value="Thai">Thai</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Italian">Italian</option>
              <option value="Other">Other</option>
            </select>

            {/* Category Select */}
            <select
              name="category"
              value={editData.category}
              onChange={handleInputChange}
            >

              <option value="Salad">Salad</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Beverages">Beverages</option>
              <option value="Rice">Rice</option>
              <option value="Pasta">Pasta</option>
              <option value="Other">Other</option>
            </select>

            {/* Ingredients Editing */}
            <h4>Ingredients</h4>
            {editData.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  placeholder="Ingredient Name"
                />
                <input
                  type="number"
                  value={ingredient.weight}
                  onChange={(e) =>
                    handleIngredientChange(index, "weight", e.target.value)
                  }
                  placeholder="Weight"
                />
              </div>
            ))}

            {/* Customer Preferences Editing */}
            <h4>Customer Preferences</h4>
            {editData.customerPreference.map((preference, index) => (
              <div key={index} className="preference-item">
                <input
                  type="text"
                  value={preference.name}
                  onChange={(e) =>
                    handleCustomerPreferenceChange(index, "name", e.target.value)
                  }
                  placeholder="Preference Name"
                />
                <input
                  type="number"
                  value={preference.weight}
                  onChange={(e) =>
                    handleCustomerPreferenceChange(index, "weight", e.target.value)
                  }
                  placeholder="Weight"
                />
              </div>
            ))}

            <div className="modal-buttons">
              <button onClick={updateFood}>Save Changes</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
