// adminRouter.js
import express from "express";
import { loginAdmin, updatePasswordDirect } from "../controllers/adminController.js";
// import authMiddleware from "../middleware/auth.js"

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.put("/update-password-direct", updatePasswordDirect);


export default adminRouter;
