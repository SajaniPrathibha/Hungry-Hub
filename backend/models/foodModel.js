// import { type } from "@testing-library/user-event/dist/type";
import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
});
const preferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },  
});

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  cuison: { type: String, required: true },
  ingredients: [ingredientSchema],  // Added ingredients schema
  customerPreference: [preferenceSchema],
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
