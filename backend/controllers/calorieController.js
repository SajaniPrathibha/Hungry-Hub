import { spawn } from 'child_process';
import foodModel from '../models/foodModel.js';
import path from 'path';

const calculateCalories = async (ingredients, weights) => {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = 'F:/4yr/pr/food-del/fooddel/backend/calorie_calculator.py';

        // Use flatMap to pair each ingredient with its corresponding weight
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

//calori fetch
const getFoodWithCalories = async (req, res) => {
    const foodId = req.params.id;
    console.log(`Fetching calories for food ID: ${foodId}`);
    try {
        const food = await foodModel.findById(foodId); // Get food by ID
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }
        const ingredients = food.ingredients.map(ing => ing.name);
        const weights = food.ingredients.map(ing => ing.weight);

        // Call Python script to calculate calories
        const calorieData = await calculateCalories(ingredients, weights);

        res.json({ success: true, data: { ...food._doc, calorieData } });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error calculating calories' });
    }
};


export { getFoodWithCalories };
