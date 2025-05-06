import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  // Store uploaded file name in this variable
  let image_filename = `${req.file.filename}`;

  // Parse ingredients from the request body (expected to be sent as a JSON string)
  const ingredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];
  const customerPreference = req.body.customerPreference ? JSON.parse(req.body.customerPreference) : [];


  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
    cuison: req.body.cuison,
    ingredients, // Include the parsed ingredients
    customerPreference,
  });
  try {
    await food.save();
    res.json({
      success: true,
      message: "food Added",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};
//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {}); //delete from folder

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category, cuison, ingredients, customerPreference } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { name, description, price, category, cuison, ingredients, customerPreference },
      { new: true }
    );
    res.json({ success: true, message: "Food Updated", data: updatedFood });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating food" });
  }
};


export { addFood, listFood, removeFood, updateFood };
