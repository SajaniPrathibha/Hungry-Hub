import {  useContext} from 'react';
import './OrderModal.css';
import { StoreContext } from "../../context/StoreContext";
import PropTypes from "prop-types";


const OrderModal = ({ ingredients = [], calorieData = {}, calorieDatas = {}, customerPreference = [], onClose, setTotalCaloriesList }) => {
    const { selectedPreferences, updateSelectedPreferences,   } = useContext(StoreContext);


    const handleCheckboxChange = (name) => {
        const updatedPreferences = {
            ...selectedPreferences,
            [name]: !selectedPreferences[name],
        };
        updateSelectedPreferences(name, !selectedPreferences[name]); // Update in context
        console.log('Updated Preferences:', updatedPreferences);
    };

    const IngCalories = ingredients.reduce((total, ingredientObj) => {
        const { name, } = ingredientObj;
        const calories = calorieData[name] || 0;

        if (calories) {
            return total + calories;
        }
        return total;
    }, 0);

    const selectedPreferenceCalories = customerPreference.reduce((total, preferenceObj) => {
        const { name } = preferenceObj;
        const cal = calorieDatas[name];
        
        // Add calories only if the preference is selected
        if (cal && selectedPreferences[name]) {
            return total + cal;
        }
        return total;
    }, 0);
    let totalCalos = 0;
    totalCalos = IngCalories + selectedPreferenceCalories;
    const handleSave = () => {
        setTotalCaloriesList((prevState) => {
            // Check if totalCalos already exists in the array
            const isDuplicate = prevState.includes(totalCalos);

            // If it's not a duplicate, add it to the array
            if (!isDuplicate) {
                return [...prevState, totalCalos];
            }

            // If it is a duplicate, return the existing array without changes
            return prevState;
        })
        onClose(); // Close the modal after saving
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Calorie amount for one food item</h2>
                <div className='left-side'>
                    <ul>
                        {ingredients.map((ingredientObj, index) => {
                            const { name, weight } = ingredientObj;
                            const calories = calorieData[name];

                            if (!calories) {
                                return (
                                    <li key={index}>
                                        {name}: Calorie data not available
                                    </li>
                                );
                            }

                            return (
                                <li key={index} className="ingredient-item">
                                    <span>{name} ({weight}g):</span>
                                    <span>{calories ? `${calories} calories` : 'Calorie data not available'}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="preference">
                    <h3>Customer Preferences</h3>
                    <ul>
                        {customerPreference.length > 0 ? (
                            customerPreference.map((preferenceObj, index) => {
                                const { name, weight } = preferenceObj;
                                const calories = calorieDatas[name];

                                return (
                                    <li key={index} className="preference-item">
                                        <input
                                            type="checkbox"
                                            checked={!!selectedPreferences[name]}
                                            onChange={() => handleCheckboxChange(name)}
                                        />
                                        <span>{name} ({weight}g):</span>
                                        <span>{calories !== undefined ? `${calories} calories` : 'Calorie data not available'}</span>
                                    </li>
                                );
                            })
                        ) : (
                            <li>No preferences available</li>
                        )}
                    </ul>
                </div>
                <div className="total-calories">
                    <strong>Total Calories (Ingredients + Selected Preferences): {totalCalos.toFixed(2)} cal</strong>
                </div>
                <div className="right-side">
                    <div className='input-save-section'>
                        <button onClick={handleSave} className="save-btn">ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
OrderModal.propTypes = {
    ingredients: PropTypes.array.isRequired,
    calorieData: PropTypes.object.isRequired,
    calorieDatas: PropTypes.object.isRequired,
    customerPreference: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    setTotalCaloriesList: PropTypes.func.isRequired,
};



export default OrderModal;
