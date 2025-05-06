import express from "express";
import {
  addAdv,
  listAdv,
  removeAdv,
  updateAdv,
  listAdvByUserPoints
} from "../controllers/advController.js";
import multer from "multer";
import advModel from "../models/advModel.js"
import authMiddleware from "../middleware/auth.js";

const advRouter = express.Router();

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
advRouter.post("/add", upload.single("image"), addAdv);
advRouter.get("/list", listAdv);
advRouter.post("/remove", removeAdv);
advRouter.post('/update', upload.single('image'), updateAdv);
advRouter.get("/list-by-points", authMiddleware, listAdvByUserPoints);


export default advRouter;
