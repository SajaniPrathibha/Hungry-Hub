import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from "../../context/StoreContext";
import './Profile.css';

const Profile = ({ closePopup }) => { // Accept closePopup function as a prop
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: '',
        number: '',
        points: 0
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userData });
    const { url } = useContext(StoreContext);

    useEffect(() => {
        // Fetch the user profile data when the component loads
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Assume token is stored in localStorage
                const response = await axios.get(url + '/api/user/profile', {
                    headers: { token }
                });
                if (response.data.success) {
                    setUserData(response.data.data);
                    setFormData(response.data.data); // Initialize form data
                }
            } catch (error) {
                console.error(error);
                alert('Error fetching profile data');
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(url + '/api/user/profiles', {
                name: formData.name,
                address: formData.address,
                number: formData.number,
            }, {
                headers: { token },
            });

            if (response.data.success) {
                setUserData({ ...userData, ...formData });
                setIsEditing(false);
                alert('Profile updated successfully!');
            } else {
                alert(response.data.message || 'Error updating profile');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating profile');
        }
    };

    return (
        <div className="overlay">
            <div className="profile-container">
                <h1>User Profile</h1>
                <div className="profile-details">
                    <p><strong>Name: </strong>{isEditing ? <input type="text" name="name" value={formData.name} onChange={handleChange} /> : userData.name}</p>
                    <p><strong>Email: </strong>{isEditing ? <input type="email" name="email" value={formData.email} onChange={handleChange} /> : userData.email}</p>
                    <p><strong>Address: </strong>{isEditing ? <input type="text" name="address" value={formData.address} onChange={handleChange} /> : userData.address}</p>
                    <p><strong>Phone Number: </strong>{isEditing ? <input type="text" name="number" value={formData.number} onChange={handleChange} /> : userData.number}</p>
                    <p><strong>Points: </strong>{userData.points}</p>

                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    ) : (
                        <div>
                            <button onClick={handleSave}>Save</button>
                            <button className='cancel' onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    )}
                </div>
                <button className='close' onClick={closePopup}>X</button> {/* Close the popup */}
            </div>
        </div>
    );
};

export default Profile;
