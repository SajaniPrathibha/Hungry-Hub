import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  updateFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//image save engine
//cb = call back
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`); //time stamp added and it will create a unique name for the img
  },
});

const upload = multer({ storage: storage });

//send data on server
// foodRouter.post("/add", addFood);

//upload img using multer package
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/update", updateFood);

export default foodRouter;
