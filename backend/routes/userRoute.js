import express from "express";
import authMiddleware from "../middleware/auth.js"
import { loginUser, registerUser, listUsers, removeUser, addPoints, getUserProfile, changePassword, updateUserProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get('/lists',listUsers);
userRouter.post('/remove',removeUser)
userRouter.post("/add-point", authMiddleware, addPoints);
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.post("/change-password", changePassword);
userRouter.put('/profiles', authMiddleware, updateUserProfile);

export default userRouter;
