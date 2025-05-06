import express from "express";
import { fetchCalorieData } from "../controllers/calBurnController.js";
import authMiddleware from "../middleware/auth.js";

const calBurnRouter = express.Router();

// Define the route for fetching calorie data
calBurnRouter.get("/calories", authMiddleware, fetchCalorieData);

export default calBurnRouter;
