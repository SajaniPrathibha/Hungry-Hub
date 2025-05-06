import sys
import pandas as pd
import json
import os

# Get the current script directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load the Excel dataset using an absolute path
file_path = os.path.join(script_dir, 'calories.xlsx')
calories_data = pd.read_excel(file_path)

def calculate_calories(ingredients, weights, data):
    results = {}
    for ingredient, weight in zip(ingredients, weights):
        # Normalize the ingredient and data for comparison (case insensitive, trim whitespaces)
        ingredient_normalized = ingredient.strip().lower()
        data['Food Name'] = data['Food Name'].str.strip().str.lower()

        # Match the ingredient with the Excel data
        match = data[data['Food Name'] == ingredient_normalized]
        if not match.empty:
            # Extract the calorie value and remove any non-numeric characters if necessary
            try:
                calorie_per_100g = float(str(match['Calorie(per 100g)'].values[0]).replace(' cal', '').strip())
                total_calories = (calorie_per_100g * weight) / 100
                results[ingredient] = round(total_calories, 2)
            except ValueError:
                results[ingredient] = "Invalid calorie data"
        else:
            results[ingredient] = "Not found in dataset"
    return results

def parse_arguments(args):
    ingredients = []
    weights = []
    current_ingredient = []

    for arg in args:
        if arg.isdigit():  # Check if the argument is a weight (number)
            weights.append(int(arg))  # Convert to integer and append to weights
            ingredients.append(' '.join(current_ingredient))  # Join words for the current ingredient
            current_ingredient = []  # Reset for the next ingredient
        else:
            current_ingredient.append(arg)  # Add word to the current ingredient

    return ingredients, weights

if __name__ == "__main__":
    # Extract ingredients and weights from command line arguments
    args = sys.argv[1:]

    # Parse ingredients and weights
    ingredients, weights = parse_arguments(args)

    # Calculate calories using the dataset
    result = calculate_calories(ingredients, weights, calories_data)

    # Output the result as JSON
    print(json.dumps(result))  # Print JSON output
