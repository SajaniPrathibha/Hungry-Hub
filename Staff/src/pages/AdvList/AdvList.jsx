import React, { useEffect, useState } from "react";
import "./AdvList.css";
import axios from "axios";
import { toast } from "react-toastify";

const AdvList = ({ url }) => {
  const [list, setList] = useState([]);
  const [editingAdv, setEditingAdv] = useState(null); // Track currently editing adv
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    image: null,
  });

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/adv/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching advertisements");
    }
  };

  const removeAdv = async (advId) => {
    const response = await axios.post(`${url}/api/adv/remove`, { id: advId });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error("Error removing advertisement");
    }
  };

  const startEdit = (adv) => {
    setEditingAdv(adv._id);
    setFormData({ description: adv.description, category: adv.category });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("id", editingAdv);
    formDataObj.append("description", formData.description);
    formDataObj.append("category", formData.category);
    if (formData.image) formDataObj.append("image", formData.image);

    try {
      const response = await axios.post(`${url}/api/adv/update`, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setEditingAdv(null);
        setFormData({ description: "", category: "", image: null });
        fetchList();
      } else {
        toast.error("Error updating advertisement");
      }
    } catch (error) {
      console.error("Error in handleUpdate:", error);
      toast.error("Error updating advertisement");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="adv-add flex-col">
      <h4>Advertisements</h4>
      <div className="list-tables">
        <div className="adv-table-formats title">
          <b>Image</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="adv-table-formats">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.category}</p>
            <p onClick={() => startEdit(item)} className="edi">
              Edit
            </p>
            <p onClick={() => removeAdv(item._id)} className="curser">
              X
            </p>
            {/* <button onClick={() => startEdit(item)} className="upadate">Edit</button>
            <button onClick={() => removeAdv(item._id)} className="cursore">
              X
            </button> */}

          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editingAdv && (
        <div className="overlay">
          <div className="edit-form">
            <h4>Edit Advertisement</h4>
            <form onSubmit={handleUpdate}>
              <label>
                Description:
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </label>
              <label>
                Category:
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >

                  <option value="Salad">Salad</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Rice">Rice</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Image:
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                />
              </label>
              <div className="modal-buttons">
                <button type="submit">Update</button>
                <button onClick={() => setEditingAdv(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvList;
