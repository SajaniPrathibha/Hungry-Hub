
import express from "express";
import { getFoodWithCalories } from "../controllers/calorieController.js";

const calorieRouter = express.Router();
calorieRouter.get("/:id", getFoodWithCalories);
calorieRouter.post("/add", getFoodWithCalories);
calorieRouter.get("/", getFoodWithCalories);

export default calorieRouter;
