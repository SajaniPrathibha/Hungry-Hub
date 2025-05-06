import foodModel from "../models/foodModel.js";
import { spawn } from 'child_process';

// Helper function to calculate calories using the Python script
const calculateCalories = async (ingredients, weights) => {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = 'F:/4yr/pr/food-del/fooddel/backend/calorie_calculator.py'; // Your provided path

        const python = spawn('python', [pythonScriptPath, ...ingredients.flatMap((ing, i) => [ing, weights[i]])]);

        let data = '';
        python.stdout.on('data', (chunk) => {
            data += chunk.toString();
        });

        python.stderr.on('data', (error) => {
            reject(error.toString());
        });

        python.on('close', (code) => {
            if (code === 0) {
                resolve(JSON.parse(data));
            } else {
                reject(`Process exited with code ${code}`);
            }
        });
    });
};

// Get preferences for a specific food item
const getPreferencesForFood = async (req, res) => {
    const foodId = req.params.id;
    console.log(`Fetching calories for food ID: ${foodId}`);
    try {
        const food = await foodModel.findById(foodId); // Get food by ID
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }
        const ingredients = food.customerPreference.map(ing => ing.name);
        const weights = food.customerPreference.map(ing => ing.weight);

        // Call Python script to calculate calories
        const calorieDatas = await calculateCalories(ingredients, weights);

        res.json({ success: true, data: { ...food._doc, calorieDatas } });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error calculating calories' });
    }
};

// Select ingredients based on customer preferences and calculate calories
const selectIngredientsBasedOnPreferences = async (req, res) => {
    const { foodId, selectedPreferences } = req.body; // Assuming selectedPreferences is an array of preference names
    try {
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        // Filter ingredients based on selected preferences
        const filteredIngredients = food.ingredients.filter(ingredient =>
            selectedPreferences.includes(ingredient.name) // or any other logic based on preferences
        );

        // Prepare ingredients and weights for calorie calculation
        const ingredients = filteredIngredients.map(ingredient => ingredient.name);
        const weights = filteredIngredients.map(ingredient => ingredient.weight);

        // Call the Python script to calculate calories
        const calorieResults = await calculateCalories(ingredients, weights);

        res.json({ success: true, data: filteredIngredients, calories: calorieResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error selecting ingredients' });
    }
};
export { getPreferencesForFood, selectIngredientsBasedOnPreferences };
