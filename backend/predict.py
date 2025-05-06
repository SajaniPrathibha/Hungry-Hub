# backend/pythonScripts/predict.py
import sys
import joblib
import json

def load_model(model_path):
    # Load the model from the specified path
    return joblib.load(model_path)

def forecast(model, steps):
    # Forecast next 'steps' time points
    return model.forecast(steps=steps).tolist()

def main():
    if len(sys.argv) != 3:
        print(json.dumps({"error": "Invalid number of arguments"}))
        sys.exit(1)

    model_path = sys.argv[1]
    steps = int(sys.argv[2])

    try:
        model = load_model(model_path)
        predictions = forecast(model, steps)
        print(json.dumps(predictions))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
