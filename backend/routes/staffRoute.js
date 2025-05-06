import express from "express";

import { listStaff, loginStaff, registerStaff, removeStaff, updateStaff } from "../controllers/staffController.js";

const staffRouter = express.Router();

staffRouter.post("/register", registerStaff);
staffRouter.post("/login", loginStaff);
staffRouter.get('/lists',listStaff);
staffRouter.post('/remove',removeStaff)
staffRouter.post("/update", updateStaff);

export default staffRouter;
