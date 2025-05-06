// routes/preferenceRoutes.js
import express from "express";
import { getPreferencesForFood, selectIngredientsBasedOnPreferences } from "../controllers/preferenceController.js";

const preferenceRouter = express.Router();

preferenceRouter.get('/:id', getPreferencesForFood); // Get preferences for a food item
preferenceRouter.post("/select-ingredients", selectIngredientsBasedOnPreferences); // Select ingredients based on preferences

export default preferenceRouter;
