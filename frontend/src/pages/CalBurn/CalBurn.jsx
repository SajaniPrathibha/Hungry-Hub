import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import './CalBurn.css';
import { useLocation } from "react-router-dom";

const CalBurn = () => {
    const location = useLocation();
    const calories = location.state?.calories || [];
    const [exerciseData, setExerciseData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                const response = await fetch("./exercise_dataset.csv");
                const reader = response.body.getReader();
                const result = await reader.read();
                const decoder = new TextDecoder("utf-8");
                const csvData = decoder.decode(result.value);

                Papa.parse(csvData, {
                    header: true,
                    complete: (results) => {
                        setExerciseData(results.data.map(item => ({
                            ...item,
                            "130 lb": parseFloat(item["130 lb"]),
                            "155 lb": parseFloat(item["155 lb"]),
                            "180 lb": parseFloat(item["180 lb"]),
                            "205 lb": parseFloat(item["205 lb"]),
                        })));
                    },
                    error: () => setError("Failed to load exercise data."),
                });
            } catch (err) {
                setError("Error loading CSV file");
            }
        };

        fetchExerciseData();
    }, []);

    const convertToHoursAndMinutes = (decimalHours) => {
        const totalMinutes = Math.round(decimalHours * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours} hr ${minutes} min`;
    };

    const generateSuggestions = () => {
        const selectedSuggestions = calories.map((foodItem) => {
            let remainingCalories = foodItem.calories;
            const exercisesForItem = [];
            const usedCategories = new Set();

            const randomizedExercises = [...exerciseData].sort(() => 0.5 - Math.random());

            for (const exercise of randomizedExercises) {
                const activityName = exercise["Activity, Exercise or Sport (1 hour)"];
                const category = activityName.split(",")[0];

                if (!usedCategories.has(category) && exercisesForItem.length < 5) {
                    const hoursFor130lb = convertToHoursAndMinutes(remainingCalories / exercise["130 lb"]);
                    const hoursFor155lb = convertToHoursAndMinutes(remainingCalories / exercise["155 lb"]);
                    const hoursFor180lb = convertToHoursAndMinutes(remainingCalories / exercise["180 lb"]);
                    const hoursFor205lb = convertToHoursAndMinutes(remainingCalories / exercise["205 lb"]);

                    exercisesForItem.push({
                        activity: activityName,
                        hours: {
                            "130 lb": hoursFor130lb,
                            "155 lb": hoursFor155lb,
                            "180 lb": hoursFor180lb,
                            "205 lb": hoursFor205lb,
                        },
                    });

                    usedCategories.add(category);
                }

                if (exercisesForItem.length === 5) break;
            }

            return {
                foodItemName: foodItem.name,
                exercises: exercisesForItem,
                calory: parseFloat(foodItem.calories).toFixed(2),

            };
        });

        setSuggestions(selectedSuggestions);
    };

    useEffect(() => {
        if (exerciseData.length > 0 && calories.length > 0) {
            generateSuggestions();
            setLoading(false);
        }
    }, [exerciseData, calories]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="exercise-suggestions">
            <h3>Suggested Exercises for Your Order in one food item</h3>
            {suggestions.length === 0 ? (
                <p>No exercise suggestions available at the moment.</p>
            ) : (
                suggestions.map((suggestion, index) => (
                    <div key={index} className="exercise-suggestion">
                        <h4>In one {suggestion.foodItemName} you had {suggestion.calory} calories</h4>
                        <ul>
                            {suggestion.exercises.map((exercise, i) => (
                                <li key={i}>
                                    <strong>{exercise.activity}</strong>
                                    <p>around 130 lb: {exercise.hours["130 lb"]}</p>
                                    <p>around 155 lb: {exercise.hours["155 lb"]}</p>
                                    <p>around 180 lb: {exercise.hours["180 lb"]}</p>
                                    <p>around 205 lb: {exercise.hours["205 lb"]}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default CalBurn;
