// backend/controllers/forecastController.js
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import fs from "fs";
import ModelUpload from "../models/modelUploadModel.js";



// ========== Upload model file ==========
export const uploadModel = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const file = req.file;

    if (!file.originalname.endsWith(".pkl")) {
        return res.status(400).send("Only .pkl files are allowed.");
    }

    const savePath = path.join(__dirname, "../modelsPkl", file.originalname);

    try {
        // Save file
        fs.writeFileSync(savePath, file.buffer);

        // Save upload date to DB
        await ModelUpload.findOneAndUpdate(
            { modelName: file.originalname },
            { uploadDate: new Date() },
            { upsert: true, new: true }
        );

        return res.status(200).send("Model uploaded and upload date saved.");
    } catch (err) {
        console.error("Error saving file:", err);
        return res.status(500).send("Failed to save model file.");
    }
};


// Manually create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getForecast = (req, res) => {
    const { model, weeks } = req.body;

    if (!model || !weeks) {
        return res.status(400).send('Model and weeks are required');
    }

    // Assuming the model file has an extension like .pkl
    const modelPath = path.join(__dirname, `../modelsPkl/${model}.pkl`);

    // const modelPath = "F:\\4yr\\pr\\food-del\\fooddel\\backend\\salad_model.pkl";


    const command = `python predict.py "${modelPath}" ${weeks}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error executing Python script');
        }

        try {
            const predictions = JSON.parse(stdout);
            console.log(predictions);
            res.json(predictions);
        } catch (err) {
            res.status(500).send('Error parsing Python script output');
        }
    });
};
