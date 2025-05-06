// backend/routes/forecastRoute.js
import express from "express";
import multer from "multer";
import { getForecast, uploadModel } from "../controllers/forecastController.js";
import ModelUpload from "../models/modelUploadModel.js";


const forecastRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

forecastRouter.post("/", getForecast);
forecastRouter.post("/upload", upload.single("modelFile"), uploadModel);

forecastRouter.get("/last-upload", async (req, res) => {
    try {
        const data = await ModelUpload.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Failed to fetch upload date" });
    }
});
export default forecastRouter;
